import { inject, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpContextToken,
  HttpContext,
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError, switchMap, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AUTH_TOKEN, ENVIRONMENT } from '@acontplus/ng-config';
import { TenantInfo } from '../services/tenant-info';
import { CorrelationInfo } from '../services/correlation-info';
import { LoggingService } from '../services/logging-service';

// ---------------------------------------------------------------------------
// HTTP Context Tokens & helpers
// ---------------------------------------------------------------------------

/** Mark a request as using an absolute URL (skip base-URL injection). */
const CUSTOM_URL = new HttpContextToken<boolean>(() => false);

/** Skip all context headers (correlation, tenant, etc.) for this request. */
const SKIP_CONTEXT_HEADERS = new HttpContextToken<boolean>(() => false);

/** Merge additional headers into the request at call-site. */
const CUSTOM_HEADERS = new HttpContextToken<Record<string, string>>(() => ({}));

export function customUrl(): HttpContext {
  return new HttpContext().set(CUSTOM_URL, true);
}

export function skipContextHeaders(): HttpContext {
  return new HttpContext().set(SKIP_CONTEXT_HEADERS, true);
}

export function withCustomHeaders(headers: Record<string, string>): HttpContext {
  return new HttpContext().set(CUSTOM_HEADERS, headers);
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

export interface HttpContextConfig {
  enableCorrelationTracking?: boolean;
  enableRequestLogging?: boolean;
  enableErrorLogging?: boolean;
  customHeaders?: Record<string, string | (() => string)>;
  clientVersion?: string;
  tenantIdHeader?: string;
  correlationIdHeader?: string;
  requestIdHeader?: string;
  timestampHeader?: string;
  /** URL substrings or regex patterns to exclude from header injection. */
  excludeUrls?: string[];
  /** URL substrings that should NOT receive an Authorization header. */
  skipAuthUrls?: string[];
  includeAuthToken?: boolean;
  baseUrlInjection?: boolean;
  /** Called when a 401 is received and a refresh token is available. */
  refreshTokenCallback?: () => Observable<{ token: string; refreshToken?: string }>;
  /** Called after a failed token refresh — should clear auth state. */
  logoutCallback?: () => void;
}

const DEFAULT_CONFIG: Required<HttpContextConfig> = {
  enableCorrelationTracking: true,
  enableRequestLogging: false,
  enableErrorLogging: true,
  customHeaders: {},
  clientVersion: '1.0.0',
  tenantIdHeader: 'Tenant-Id',
  correlationIdHeader: 'Correlation-Id',
  requestIdHeader: 'Request-Id',
  timestampHeader: 'Timestamp',
  excludeUrls: [],
  skipAuthUrls: ['/login', '/register', '/refresh'],
  includeAuthToken: true,
  baseUrlInjection: true,
  refreshTokenCallback: undefined as any,
  logoutCallback: undefined as any,
};

export const HTTP_CONTEXT_CONFIG = new InjectionToken<HttpContextConfig>('HTTP_CONTEXT_CONFIG', {
  factory: () => DEFAULT_CONFIG,
});

// ---------------------------------------------------------------------------
// Interceptor
// ---------------------------------------------------------------------------

export const httpContextInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenProvider = inject(AUTH_TOKEN, { optional: true });
  const router = inject(Router);
  const tenantService = inject(TenantInfo);
  const correlationService = inject(CorrelationInfo);
  const loggingService = inject(LoggingService);
  const environment = inject(ENVIRONMENT);

  const config: Required<HttpContextConfig> = {
    ...DEFAULT_CONFIG,
    enableRequestLogging: !environment.isProduction,
    ...inject(HTTP_CONTEXT_CONFIG, { optional: true }),
  };

  // ── Context token flags ──────────────────────────────────────────────────
  const isCustomUrl = req.context.get(CUSTOM_URL);
  const skipHeaders = req.context.get(SKIP_CONTEXT_HEADERS);
  const contextHeaders = req.context.get(CUSTOM_HEADERS);

  if (skipHeaders) return next(req);

  // ── URL exclusion (with ReDoS protection) ────────────────────────────────
  if (shouldExcludeUrl(req.url, config.excludeUrls)) return next(req);

  // ── Auth skip check ──────────────────────────────────────────────────────
  const skipAuth = shouldSkipAuth(req.url, config.skipAuthUrls);

  // ── URL resolution ───────────────────────────────────────────────────────
  const finalUrl = resolveFinalUrl(
    req.url,
    isCustomUrl,
    config.baseUrlInjection,
    environment.apiBaseUrl,
  );

  // ── Header construction ──────────────────────────────────────────────────
  const headers = buildHeaders(
    config,
    tokenProvider,
    correlationService,
    tenantService,
    environment,
    skipAuth,
    contextHeaders,
    req,
  );

  // ── Clone request ────────────────────────────────────────────────────────
  const enhancedReq = req.clone({ url: finalUrl, setHeaders: headers });

  // ── Request logging ──────────────────────────────────────────────────────
  if (config.enableRequestLogging) {
    logRequest(loggingService, req, finalUrl, headers, {
      requestId: headers[config.requestIdHeader],
      correlationId: headers[config.correlationIdHeader],
      tenantId: headers[config.tenantIdHeader],
      isCustomUrl,
    });
  }

  // ── Execute request with unified error handling ──────────────────────────
  const hasAuth = !!headers['Authorization'];

  // Shared error context for both handlers below
  const errorCtx = {
    req,
    finalUrl,
    requestId: headers[config.requestIdHeader],
    correlationId: headers[config.correlationIdHeader],
    tenantId: headers[config.tenantIdHeader],
    isCustomUrl,
    hasAuth,
    config,
    router,
    loggingService,
    tenantService,
    tokenProvider,
    environment,
  };

  // Base pipeline — always present
  const base$ = next(enhancedReq).pipe(
    catchError((error: HttpErrorResponse) => handleContextError(error, errorCtx)),
  );

  // When auth + refresh callback are available, prepend a 401-refresh layer
  if (!hasAuth || !config.refreshTokenCallback) {
    return base$;
  }

  return next(enhancedReq).pipe(
    // Intercept 401 first — attempt token refresh before general error handling
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) return throwError(() => error);

      const refreshToken = tokenProvider?.getRefreshToken?.();
      if (!refreshToken?.trim()) return throwError(() => error);

      return config.refreshTokenCallback!().pipe(
        switchMap(({ token }) =>
          next(
            req.clone({
              url: finalUrl,
              setHeaders: { ...headers, Authorization: `Bearer ${token}` },
            }),
          ),
        ),
        catchError((refreshError) => {
          config.logoutCallback?.();
          return throwError(() => refreshError);
        }),
      );
    }),
    // General error handling (logs, redirects, tenant, rate-limit, etc.)
    catchError((error: HttpErrorResponse) => handleContextError(error, errorCtx)),
  );
};

// ---------------------------------------------------------------------------
// Helper functions to reduce cognitive complexity
// ---------------------------------------------------------------------------

function shouldExcludeUrl(url: string, excludeUrls: string[]): boolean {
  return excludeUrls.some((pattern) => {
    try {
      return url.includes(pattern) || new RegExp(pattern).test(url);
    } catch {
      return false; // malformed regex — skip safely
    }
  });
}

function shouldSkipAuth(url: string, skipAuthUrls: string[]): boolean {
  return skipAuthUrls.some((u) => url.includes(u));
}

function resolveFinalUrl(
  url: string,
  isCustomUrl: boolean,
  baseUrlInjection: boolean,
  apiBaseUrl: string,
): string {
  return isCustomUrl || !baseUrlInjection ? url : `${apiBaseUrl}${url}`;
}

function buildHeaders(
  config: Required<HttpContextConfig>,
  tokenProvider: any,
  correlationService: CorrelationInfo,
  tenantService: TenantInfo,
  environment: any,
  skipAuth: boolean,
  contextHeaders: Record<string, string>,
  req: HttpRequest<unknown>,
): Record<string, string> {
  const correlationId = config.enableCorrelationTracking
    ? correlationService.getOrCreateCorrelationId()
    : uuidv4();
  const tenantId = tenantService.getTenantId();
  const requestId = uuidv4();

  const headers: Record<string, string> = {
    [config.requestIdHeader]: requestId,
    [config.timestampHeader]: new Date().toISOString(),
  };

  if (config.enableCorrelationTracking) {
    headers[config.correlationIdHeader] = correlationId;
  }

  if (tenantId) {
    headers[config.tenantIdHeader] = tenantId;
  }

  if (config.clientVersion) {
    headers['Client-Version'] = config.clientVersion;
  }

  if (environment.clientId) {
    headers['Client-Id'] = environment.clientId;
  }

  if (config.includeAuthToken && !skipAuth) {
    const authToken = tokenProvider?.getToken();
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Static and dynamic custom headers from config
  Object.entries(config.customHeaders).forEach(([key, value]) => {
    headers[key] = typeof value === 'function' ? value() : value;
  });

  // Per-request headers from HttpContext
  Object.entries(contextHeaders).forEach(([key, value]) => {
    headers[key] = value;
  });

  // Content-Type for mutation requests (do not override if already set).
  // Only set application/json when the body is JSON-serializable.
  // Binary types (FormData, Blob, ArrayBuffer, etc.) need the browser to set Content-Type.
  if (
    ['POST', 'PUT', 'PATCH'].includes(req.method) &&
    !req.headers.has('Content-Type') &&
    isJsonBody(req.body)
  ) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

function logRequest(
  loggingService: LoggingService,
  req: HttpRequest<unknown>,
  finalUrl: string,
  headers: Record<string, string>,
  logData: { requestId: string; correlationId: string; tenantId: string; isCustomUrl: boolean },
): void {
  loggingService.logHttpRequest({
    method: req.method,
    url: finalUrl,
    originalUrl: req.url,
    requestId: logData.requestId,
    correlationId: logData.correlationId,
    tenantId: logData.tenantId,
    timestamp: new Date().toISOString(),
    headers: Object.keys(headers),
    isCustomUrl: logData.isCustomUrl,
  });
}

// ---------------------------------------------------------------------------
// Unified error handler (eliminates duplicated catchError blocks)
// ---------------------------------------------------------------------------

interface ErrorContext {
  req: HttpRequest<unknown>;
  finalUrl: string;
  requestId: string;
  correlationId: string;
  tenantId: string;
  isCustomUrl: boolean;
  hasAuth: boolean;
  config: Required<HttpContextConfig>;
  router: Router;
  loggingService: LoggingService;
  tenantService: TenantInfo;
  tokenProvider: any;
  environment: any;
}

function handleContextError(error: HttpErrorResponse, ctx: ErrorContext) {
  const {
    req,
    finalUrl,
    requestId,
    correlationId,
    tenantId,
    isCustomUrl,
    config,
    router,
    loggingService,
    tenantService,
    environment,
  } = ctx;

  if (config.enableErrorLogging) {
    loggingService.logHttpError({
      method: req.method,
      url: finalUrl,
      originalUrl: req.url,
      requestId,
      correlationId,
      tenantId,
      status: error.status,
      statusText: error.statusText,
      message: error.message,
      timestamp: new Date().toISOString(),
      errorDetails: error.error,
      environment: environment.clientId,
      isCustomUrl,
      headers: [],
    });
  }

  switch (error.status) {
    case 401:
      loggingService.error('Unauthorized — redirecting to login');
      // Let auth service clear tokens before navigation
      config.logoutCallback?.();
      router.navigate([`/${environment.loginRoute}`]);
      break;
    case 403:
      tenantService.handleForbidden();
      break;
    case 0:
      loggingService.logNetworkError(correlationId);
      break;
    case 429:
      loggingService.logRateLimitError(correlationId, finalUrl);
      break;
  }

  return throwError(() => error);
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

function isJsonBody(body: unknown): boolean {
  if (body === null || body === undefined) return true;
  if (typeof body === 'string' || typeof body === 'number' || typeof body === 'boolean')
    return true;
  if (Array.isArray(body)) return true;
  if (
    typeof body === 'object' &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(body instanceof URLSearchParams)
  )
    return true;
  return false;
}

export interface HttpRequestLog {
  method: string;
  url: string;
  originalUrl: string;
  requestId: string;
  correlationId: string;
  tenantId: string;
  timestamp: string;
  headers: string[];
  isCustomUrl: boolean;
}

export interface HttpErrorLog extends HttpRequestLog {
  status: number;
  statusText: string;
  message: string;
  errorDetails: unknown;
  environment: string;
}

// ---------------------------------------------------------------------------
// Public helpers for library consumers
// ---------------------------------------------------------------------------

export function createHttpContextConfig(
  overrides: Partial<HttpContextConfig> = {},
): HttpContextConfig {
  return { ...DEFAULT_CONFIG, ...overrides };
}

/**
 * Register the interceptor configuration in your app providers.
 *
 * @example
 * // app.config.ts
 * provideHttpClient(
 *   withInterceptors([
 *     httpContextInterceptor,  // 1st — adds headers, handles 401 refresh
 *     apiInterceptor,          // 2nd — normalises response, shows toasts
 *   ])
 * ),
 * ...provideHttpContext({ clientVersion: '2.0.0' }),
 */
export function provideHttpContext(config: Partial<HttpContextConfig> = {}) {
  return [
    {
      provide: HTTP_CONTEXT_CONFIG,
      useValue: createHttpContextConfig(config),
    },
  ];
}
