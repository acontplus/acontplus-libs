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
import { ApiResponse } from '@acontplus/core';
import { NotificationService } from '@acontplus/ng-notifications';
import { AUTH_TOKEN } from '@acontplus/ng-config';

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
        const standardized = standardizeApiResponse(event.body);
        handleToastNotifications(standardized, toastr, req);

        if (standardized.status === 'error') {
          handleApiResponseError(standardized, toastr, req);
          return throwError(() => standardized);
        }

        return of(transformResponseForConsumers(standardized, event));
      }
      return of(event);
    }),

    // Handle HTTP-level errors — show notification for critical errors, always re-throw.
    catchError((error: HttpErrorResponse) => {
      return handleHttpError(error, toastr);
    }),
  );
};

// ---------------------------------------------------------------------------
// Standardisation
// ---------------------------------------------------------------------------

function standardizeApiResponse(body: unknown): ApiResponse<unknown> {
  if (isValidApiResponse(body)) return body;

  // Wrap any non-null/undefined body (including objects with non-standard status fields)
  if (body !== null && body !== undefined) {
    return wrapSuccess(body);
  }

  return wrapSuccess(undefined);
}

function wrapSuccess(data: unknown): ApiResponse<unknown> {
  return {
    status: 'success',
    code: '200',
    message: 'Operation completed successfully',
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
      notificationService.show({ type: 'warning', message: w.message }),
    );
  }

  // Secondary: show individual errors only when no primary message covered them
  if (response.status === 'error' && response.errors?.length && response.message) {
    response.errors.forEach((e) => notificationService.show({ type: 'error', message: e.message }));
  }
}

function handleApiResponseError(
  response: ApiResponse<unknown>,
  notificationService: NotificationService,
  req: HttpRequest<unknown>,
): void {
  if (req.context.get(SKIP_NOTIFICATION)) return;

  const message =
    response.message || response.errors?.[0]?.message || 'An unexpected error occurred';

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
): Observable<never> {
  if (shouldShowCriticalErrorNotification(error.status)) {
    notificationService.error({
      message: getCriticalErrorMessage(error),
      title: getErrorTitle(error.status),
      config: { duration: 5000 },
    });
  }
  return throwError(() => error);
}

function shouldShowCriticalErrorNotification(status: number): boolean {
  return status === 0 || (status >= 500 && status < 600);
}

function getErrorTitle(status: number): string {
  if (status === 0) return 'Connection Error';
  if (status >= 500) return 'Server Error';
  return 'Error';
}

function getCriticalErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Unable to connect to the server. Please check your network connection.';
  }
  if (error.status >= 500) {
    return (
      error.error?.message ?? error.message ?? 'A server error occurred. Please try again later.'
    );
  }
  return error.error?.message ?? error.message ?? 'An unexpected error occurred';
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
