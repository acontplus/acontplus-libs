import {
  HttpInterceptorFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpRequest,
  HttpContextToken,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, of, throwError, Observable } from 'rxjs';
import {
  ApiResponse,
  getLocalizedErrorMessage,
  getLocalizedAppMessage,
  AppMessageKey,
} from '@acontplus/core';
import { NotificationService } from '@acontplus/ng-notifications';
import { AUTH_TOKEN } from '@acontplus/ng-config';
import { LanguageInfo } from '../services/language-info';

//const RETRY_COUNT = 2;

// ---------------------------------------------------------------------------
// HTTP Context Tokens
// ---------------------------------------------------------------------------

/**
 * Skip all toast notifications for a specific request.
 * Usage: new HttpContext().set(SKIP_NOTIFICATION, true)
 */
export const SKIP_NOTIFICATION = new HttpContextToken<boolean>(() => false);

/**
 * Force-show or force-hide notifications, overriding URL/method exclusion logic.
 * Usage: new HttpContext().set(SHOW_NOTIFICATIONS, true)
 */
export const SHOW_NOTIFICATIONS = new HttpContextToken<boolean | undefined>(() => undefined);

// ---------------------------------------------------------------------------
// Interceptor
// ---------------------------------------------------------------------------

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(NotificationService);
  const tokenProvider = inject(AUTH_TOKEN, { optional: true });
  const languageInfo = inject(LanguageInfo);

  // Attach Bearer token when available
  const token = tokenProvider?.getToken();
  const modifiedReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(modifiedReq).pipe(
    // Retry only on network errors or 5xx — never on 4xx client errors.
    // Shows toast + updates spinner message so the user knows what is happening.
    // retry({
    //   count: RETRY_COUNT,
    //   delay: (error: HttpErrorResponse, attempt) => {
    //     const isRetryable = error.status === 0 || (error.status >= 500 && error.status < 600);
    //     if (!isRetryable) throw error; // 4xx — bubble up immediately, no retry

    //     // Toast informa al usuario
    //     toastr.warning({
    //       message: `Reintentando solicitud (${attempt} de ${RETRY_COUNT})...`,
    //       title: 'Conexión inestable',
    //       config: { duration: 2500 },
    //     });

    //     return timer(1000 * attempt);
    //   },
    // }),

    // Handle successful responses via switchMap so we can return an Observable
    // (needed to properly throw ApiResponse errors into the RxJS stream).
    switchMap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const standardized = standardizeApiResponse(event.body, languageInfo);
        handleToastNotifications(standardized, toastr, req, languageInfo);

        if (standardized.status === 'error') {
          handleApiResponseError(standardized, toastr, req, languageInfo);
          return throwError(() => standardized);
        }

        return of(transformResponseForConsumers(standardized, event));
      }
      return of(event);
    }),

    // Handle HTTP-level errors — show notification for critical errors, always re-throw.
    catchError((error: HttpErrorResponse) => {
      return handleHttpError(error, toastr, languageInfo);
    }),
  );
};

// ---------------------------------------------------------------------------
// Standardisation
// ---------------------------------------------------------------------------

function standardizeApiResponse(body: unknown, languageInfo: LanguageInfo): ApiResponse<unknown> {
  if (isValidApiResponse(body)) return body;

  if (body !== null && body !== undefined) {
    return wrapSuccess(body, languageInfo);
  }

  return wrapSuccess(undefined, languageInfo);
}

function wrapSuccess(data: unknown, languageInfo: LanguageInfo): ApiResponse<unknown> {
  return {
    status: 'success',
    code: '200',
    message: getLocalizedAppMessage(
      AppMessageKey.OPERATION_COMPLETED,
      languageInfo.getCurrentLanguage(),
    ),
    data,
    timestamp: new Date().toISOString(),
  };
}

function isValidApiResponse(response: unknown): response is ApiResponse<unknown> {
  if (response === null || typeof response !== 'object') return false;
  const r = response as Record<string, unknown>;
  return (
    'status' in r &&
    'code' in r &&
    typeof r['status'] === 'string' &&
    ['success', 'error', 'warning'].includes(r['status'] as string)
  );
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

function handleToastNotifications(
  response: ApiResponse<unknown>,
  notificationService: NotificationService,
  req: HttpRequest<unknown>,
  languageInfo: LanguageInfo,
): void {
  // SKIP_NOTIFICATION always wins — even over SHOW_NOTIFICATIONS
  if (req.context.get(SKIP_NOTIFICATION)) return;

  const forceShow = req.context.get(SHOW_NOTIFICATIONS);
  const autoShow = shouldShowSuccessToast(req);
  const showNotifications = forceShow !== undefined ? forceShow : autoShow;

  if (!showNotifications) return;
  if (!response.message) return;
  if (!(['success', 'warning', 'error'] as string[]).includes(response.status)) return;

  // Primary notification — show main message once
  notificationService.show({
    type: response.status as 'success' | 'warning' | 'error',
    message: response.message,
  });

  // Secondary: show individual warnings only when no primary message covered them
  if (response.status === 'warning' && response.warnings?.length && response.message) {
    response.warnings.forEach((w) =>
      notificationService.show({
        type: 'warning',
        message: getLocalizedErrorMessage(w.code, languageInfo.getCurrentLanguage(), w.message),
      }),
    );
  }

  // Secondary: show individual errors only when no primary message covered them
  if (response.status === 'error' && response.errors?.length && response.message) {
    response.errors.forEach((e) =>
      notificationService.show({
        type: 'error',
        message: getLocalizedErrorMessage(e.code, languageInfo.getCurrentLanguage(), e.message),
      }),
    );
  }
}

function handleApiResponseError(
  response: ApiResponse<unknown>,
  notificationService: NotificationService,
  req: HttpRequest<unknown>,
  languageInfo: LanguageInfo,
): void {
  if (req.context.get(SKIP_NOTIFICATION)) return;

  const language = languageInfo.getCurrentLanguage();
  const serverMessage = response.message || response.errors?.[0]?.message;
  const errorCode = response.errors?.[0]?.code ?? '';
  const message =
    serverMessage ||
    getLocalizedErrorMessage(errorCode, language) ||
    getLocalizedAppMessage(AppMessageKey.UNEXPECTED_ERROR, language);

  notificationService.error({ message, config: { duration: 5000 } });
}

// ---------------------------------------------------------------------------
// Response transformation
// ---------------------------------------------------------------------------

function transformResponseForConsumers(
  response: ApiResponse<unknown>,
  originalEvent: HttpResponse<unknown>,
): HttpResponse<unknown> {
  switch (response.status) {
    case 'success':
    case 'warning':
      // Unwrap data for consumers; fall back to full envelope when no data
      return response.data !== undefined && response.data !== null
        ? originalEvent.clone({ body: response.data })
        : originalEvent.clone({ body: response });

    case 'error':
    default:
      return originalEvent.clone({ body: response });
  }
}

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

function handleHttpError(
  error: HttpErrorResponse,
  notificationService: NotificationService,
  languageInfo: LanguageInfo,
): Observable<never> {
  if (shouldShowCriticalErrorNotification(error.status)) {
    notificationService.error({
      message: getCriticalErrorMessage(error, languageInfo),
      title: getErrorTitle(error.status, languageInfo),
      config: { duration: 5000 },
    });
  }
  return throwError(() => error);
}

function shouldShowCriticalErrorNotification(status: number): boolean {
  return status === 0 || (status >= 500 && status < 600);
}

function getErrorTitle(status: number, languageInfo: LanguageInfo): string {
  const lang = languageInfo.getCurrentLanguage();
  if (status === 0) return getLocalizedAppMessage(AppMessageKey.CONNECTION_ERROR, lang);
  if (status >= 500) return getLocalizedAppMessage(AppMessageKey.SERVER_ERROR, lang);
  return getLocalizedAppMessage(AppMessageKey.ERROR, lang);
}

function getCriticalErrorMessage(error: HttpErrorResponse, languageInfo: LanguageInfo): string {
  const lang = languageInfo.getCurrentLanguage();
  if (error.status === 0) {
    return (
      getLocalizedErrorMessage('NETWORK_ERROR', lang) ||
      getLocalizedAppMessage(AppMessageKey.NETWORK_UNAVAILABLE, lang)
    );
  }
  if (error.status >= 500) {
    return (
      error.error?.message ??
      getLocalizedErrorMessage('INTERNAL_ERROR', lang) ??
      error.message ??
      getLocalizedAppMessage(AppMessageKey.UNEXPECTED_ERROR, lang)
    );
  }
  return (
    error.error?.message ??
    getLocalizedErrorMessage('UNHANDLED_ERROR', lang) ??
    error.message ??
    getLocalizedAppMessage(AppMessageKey.UNEXPECTED_ERROR, lang)
  );
}

// ---------------------------------------------------------------------------
// Utility: decide whether to auto-show toast
// ---------------------------------------------------------------------------

const MUTABLE_METHODS = new Set(['post', 'put', 'patch', 'delete']);

const EXCLUDED_URL_PATTERNS = [
  '/list',
  '/search',
  '/query',
  '/page',
  '/paginated',
  '/health',
  '/status',
  '/ping',
];

function shouldShowSuccessToast(req: HttpRequest<unknown>): boolean {
  const method = req.method.toLowerCase();
  const url = req.url.toLowerCase();

  if (!MUTABLE_METHODS.has(method)) return false;
  if (EXCLUDED_URL_PATTERNS.some((p) => url.includes(p))) return false;

  return true;
}
