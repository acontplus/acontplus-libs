import {
  HttpInterceptorFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, of, throwError } from 'rxjs';
import { NotificationService } from '@acontplus/ng-notifications';
import { AUTH_TOKEN } from '@acontplus/ng-config';
import { LanguageInfo } from '../services/language-info';
import { HTTP_CONTEXT_CONFIG } from './http-context-interceptor';
import { standardizeApiResponse, transformResponseForConsumers } from './api-response';
import {
  handleApiResponseError,
  handleHttpError,
  handleToastNotifications,
} from './api-notifications';

export { SKIP_NOTIFICATION, SHOW_NOTIFICATIONS } from './api-notifications';
export type { NotificationMode } from './api-notifications';

//const RETRY_COUNT = 2;

// ---------------------------------------------------------------------------
// Interceptor
// ---------------------------------------------------------------------------

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(NotificationService);
  const tokenProvider = inject(AUTH_TOKEN, { optional: true });
  const languageInfo = inject(LanguageInfo);
  const notificationMode = inject(HTTP_CONTEXT_CONFIG, { optional: true })?.notifications ?? 'all';

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
    //
    //     // Toast informa al usuario
    //     toastr.warning({
    //       message: `Reintentando solicitud (${attempt} de ${RETRY_COUNT})...`,
    //       title: 'Conexión inestable',
    //       config: { duration: 2500 },
    //     });
    //
    //     return timer(1000 * attempt);
    //   },
    // }),

    // Handle successful responses via switchMap so we can return an Observable
    // (needed to properly throw ApiResponse errors into the RxJS stream).
    switchMap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const standardized = standardizeApiResponse(event.body, languageInfo);

        // Error envelopes get a single error notification path — showing both
        // the generic toast and the error toast would duplicate the message.
        if (standardized.status === 'error') {
          handleApiResponseError(standardized, toastr, req, languageInfo, notificationMode);
          return throwError(() => standardized);
        }

        handleToastNotifications(standardized, toastr, req, languageInfo, notificationMode);
        return of(transformResponseForConsumers(standardized, event));
      }
      return of(event);
    }),

    // Handle HTTP-level errors — show notification for critical errors, always re-throw.
    catchError((error: HttpErrorResponse) => {
      return handleHttpError(error, toastr, languageInfo, req, notificationMode);
    }),
  );
};
