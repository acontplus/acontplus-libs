import { HttpErrorResponse, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  ApiResponse,
  getLocalizedErrorMessage,
  getLocalizedAppMessage,
  AppMessageKey,
} from '@acontplus/core';
import { NotificationService } from '@acontplus/ng-notifications';
import { LanguageInfo } from '../services/language-info';
import { HttpContextConfig } from './http-context-interceptor';

export type NotificationMode = NonNullable<HttpContextConfig['notifications']>;

// ---------------------------------------------------------------------------
// HTTP Context Tokens
// ---------------------------------------------------------------------------

/**
 * Skip all toast notifications for a specific request.
 * Usage: new HttpContext().set(SKIP_NOTIFICATION, true)
 */
export const SKIP_NOTIFICATION = new HttpContextToken<boolean>(() => false);

/**
 * Force-show or force-hide notifications, overriding URL/method exclusion logic
 * and the global `notifications` mode.
 * Usage: new HttpContext().set(SHOW_NOTIFICATIONS, true)
 */
export const SHOW_NOTIFICATIONS = new HttpContextToken<boolean | undefined>(() => undefined);

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export function handleToastNotifications(
  response: ApiResponse<unknown>,
  notificationService: NotificationService,
  req: HttpRequest<unknown>,
  languageInfo: LanguageInfo,
  notificationMode: NotificationMode,
): void {
  if (!(['success', 'warning'] as string[]).includes(response.status)) return;
  if (!shouldNotify(req, notificationMode, response.status as 'success' | 'warning')) return;

  // Primary notification — show main message when the server provided one
  if (response.message) {
    notificationService.show({
      type: response.status as 'success' | 'warning',
      message: response.message,
    });
  }

  // Secondary: show individual warnings even when there is no primary message
  if (response.status === 'warning' && response.warnings?.length) {
    response.warnings.forEach((w) =>
      notificationService.show({
        type: 'warning',
        message: getLocalizedErrorMessage(w.code, languageInfo.getCurrentLanguage(), w.message),
      }),
    );
  }
}

export function handleApiResponseError(
  response: ApiResponse<unknown>,
  notificationService: NotificationService,
  req: HttpRequest<unknown>,
  languageInfo: LanguageInfo,
  notificationMode: NotificationMode,
): void {
  if (!shouldNotify(req, notificationMode, 'error')) return;

  const language = languageInfo.getCurrentLanguage();
  const serverMessage = response.message || response.errors?.[0]?.message;
  const errorCode = response.errors?.[0]?.code ?? '';
  const message =
    serverMessage ||
    getLocalizedErrorMessage(errorCode, language) ||
    getLocalizedAppMessage(AppMessageKey.UNEXPECTED_ERROR, language);

  notificationService.error({ message, config: { duration: 5000 } });

  // Secondary: show individual errors so callers keep the detail list
  response.errors?.forEach((e) =>
    notificationService.show({
      type: 'error',
      message: getLocalizedErrorMessage(e.code, language, e.message),
    }),
  );
}

// ---------------------------------------------------------------------------
// HTTP-level error handling
// ---------------------------------------------------------------------------

export function handleHttpError(
  error: HttpErrorResponse,
  notificationService: NotificationService,
  languageInfo: LanguageInfo,
  req: HttpRequest<unknown>,
  notificationMode: NotificationMode,
): Observable<never> {
  if (
    shouldShowCriticalErrorNotification(error.status) &&
    shouldNotify(req, notificationMode, 'error')
  ) {
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
// Notification policy
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

/**
 * Notification precedence (highest to lowest):
 * 1. `SKIP_NOTIFICATION` context token — always silences.
 * 2. `SHOW_NOTIFICATIONS` context token — `false` silences, `true` forces.
 * 3. Global `notifications` mode from `HTTP_CONTEXT_CONFIG`.
 * 4. Automatic heuristic (mutations only, excluding read-like URLs).
 */
function shouldNotify(
  req: HttpRequest<unknown>,
  mode: NotificationMode,
  kind: 'success' | 'warning' | 'error',
): boolean {
  if (req.context.get(SKIP_NOTIFICATION)) return false;

  const forceShow = req.context.get(SHOW_NOTIFICATIONS);
  if (forceShow === false) return false;
  if (forceShow === true) return true;

  if (mode === 'off') return false;
  if (mode === 'errors-only') return kind === 'error';

  if (kind === 'error') return true;
  return shouldShowSuccessToast(req);
}
