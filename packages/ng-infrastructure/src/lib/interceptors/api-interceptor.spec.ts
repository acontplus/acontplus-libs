import { TestBed } from '@angular/core/testing';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpContext,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { apiInterceptor, SKIP_NOTIFICATION, SHOW_NOTIFICATIONS } from './api-interceptor';
import { NotificationService } from '@acontplus/ng-notifications';
import { AUTH_TOKEN } from '@acontplus/ng-config';
import { LanguageInfo } from '../services/language-info';
import { Language } from '@acontplus/core';
import { PLATFORM_ID } from '@angular/core';
import { describe, it, expect, vi } from 'vitest';

function setup(language?: Language, authToken?: string) {
  const notificationSpy = {
    show: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  };

  TestBed.configureTestingModule({
    providers: [
      { provide: NotificationService, useValue: notificationSpy },
      {
        provide: AUTH_TOKEN,
        useValue: authToken ? { getToken: () => authToken } : null,
      },
      { provide: PLATFORM_ID, useValue: 'browser' },
    ],
  });

  const langInfo = TestBed.inject(LanguageInfo);
  if (language !== undefined) {
    langInfo.setLanguage(language);
  }

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiInterceptor(req, next));

  return { notificationSpy, interceptor, langInfo };
}

function makeResponse(status: 'success' | 'error' | 'warning') {
  return new HttpResponse({
    body: {
      status,
      code: status === 'success' ? '200' : '400',
      message:
        status === 'success' ? 'Server ok' : status === 'error' ? 'Server error' : 'Server warning',
      data: status === 'success' ? { id: 1 } : undefined,
      errors: status === 'error' ? [{ code: 'VAL_001', message: 'Field is required' }] : undefined,
      warnings: status === 'warning' ? [{ code: 'WARN_001', message: 'Stock is low' }] : undefined,
      timestamp: new Date().toISOString(),
    },
  });
}

function makeRequest(method: string, url: string, context?: HttpContext) {
  return new HttpRequest<unknown>(method, url, undefined, { context });
}

describe('apiInterceptor', () => {
  describe('standardization', () => {
    it('passes through valid ApiResponse envelopes unchanged', () => {
      const { interceptor } = setup();
      const response = makeResponse('success');
      let received: unknown;
      interceptor(makeRequest('GET', '/api/test'), () => of(response)).subscribe((event) => {
        if (event instanceof HttpResponse) received = event.body;
      });
      expect(received).toEqual({ id: 1 });
    });

    it('unwraps data for consumer on success', () => {
      const { interceptor } = setup();
      const response = makeResponse('success');
      let received: unknown;
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe((event) => {
        if (event instanceof HttpResponse) received = event.body;
      });
      expect(received).toEqual({ id: 1 });
    });

    it('passes full error envelope to consumer', () => {
      const { interceptor } = setup();
      const response = makeResponse('error');
      let received: unknown;
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe({
        error: (err) => {
          received = err;
        },
      });
      expect(received).toHaveProperty('status', 'error');
      expect(received).toHaveProperty('errors');
    });

    it('wraps non-envelope body in success envelope', () => {
      const { interceptor } = setup();
      const response = new HttpResponse({ body: { plain: 'object' } });
      let received: unknown;
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe((event) => {
        if (event instanceof HttpResponse) received = event.body;
      });
      expect(received).toEqual({ plain: 'object' });
    });

    it('handles null body gracefully', () => {
      const { interceptor } = setup();
      const response = new HttpResponse({ body: null });
      let received: unknown;
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe((event) => {
        if (event instanceof HttpResponse) received = event.body;
      });
      expect(received).toHaveProperty('status', 'success');
      expect(received).toHaveProperty('code', '200');
    });
  });

  describe('success messages use localized messages', () => {
    it('generates Spanish success message', () => {
      const { interceptor } = setup(Language.Spanish);
      const response = makeResponse('success');
      let received: unknown;
      interceptor(makeRequest('POST', '/api/create'), () => of(response)).subscribe((event) => {
        received = (event as HttpResponse<unknown>).body;
      });
      expect(received).toEqual({ id: 1 });
    });

    it('generates English success message by default', () => {
      const { interceptor } = setup(Language.English);
      const response = makeResponse('success');
      let received: unknown;
      interceptor(makeRequest('POST', '/api/create'), () => of(response)).subscribe((event) => {
        if (event instanceof HttpResponse) received = event.body;
      });
      expect(received).toEqual({ id: 1 });
    });
  });

  describe('toast notifications', () => {
    it('shows toast for POST success', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('success');
      interceptor(makeRequest('POST', '/api/create'), () => of(response)).subscribe();
      expect(notificationSpy.show).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' }),
      );
    });

    it('shows toast for PUT success', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('success');
      interceptor(makeRequest('PUT', '/api/update'), () => of(response)).subscribe();
      expect(notificationSpy.show).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' }),
      );
    });

    it('skips toast for GET requests', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('success');
      interceptor(makeRequest('GET', '/api/users'), () => of(response)).subscribe();
      expect(notificationSpy.show).not.toHaveBeenCalled();
    });

    it('skips toast for excluded URL patterns', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('success');
      interceptor(makeRequest('POST', '/api/users/list'), () => of(response)).subscribe();
      expect(notificationSpy.show).not.toHaveBeenCalled();
    });

    it('respects SKIP_NOTIFICATION context token', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('success');
      const ctx = new HttpContext().set(SKIP_NOTIFICATION, true);
      interceptor(makeRequest('POST', '/api/create', ctx), () => of(response)).subscribe();
      expect(notificationSpy.show).not.toHaveBeenCalled();
    });

    it('forces notification with SHOW_NOTIFICATIONS context token', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('success');
      const ctx = new HttpContext().set(SHOW_NOTIFICATIONS, true);
      interceptor(makeRequest('GET', '/api/health', ctx), () => of(response)).subscribe();
      const calls = notificationSpy.show.mock.calls as [Record<string, string>][];
      const successCalls = calls.filter((c) => c[0]['type'] === 'success');
      expect(successCalls.length).toBeGreaterThan(0);
    });

    it('shows individual warning messages in toasts', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('warning');
      interceptor(makeRequest('POST', '/api/create'), () => of(response)).subscribe();
      const calls = notificationSpy.show.mock.calls as [Record<string, string>][];
      const warningMessages = calls
        .filter((c) => c[0]['type'] === 'warning')
        .map((c) => c[0]['message']);
      expect(warningMessages).toContain('Stock is low');
    });

    it('shows individual error messages in toasts', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('error');
      interceptor(makeRequest('POST', '/api/create'), () => of(response)).subscribe({
        error: vi.fn(),
      });
      const calls = notificationSpy.show.mock.calls as [Record<string, string>][];
      const errorMessages = calls
        .filter((c) => c[0]['type'] === 'error')
        .map((c) => c[0]['message']);
      expect(errorMessages).toContain('Field is required');
    });

    it('does not show toast when response has no message', () => {
      const { interceptor, notificationSpy } = setup();
      const response = new HttpResponse({
        body: { status: 'success', code: '200', timestamp: new Date().toISOString() },
      });
      interceptor(makeRequest('POST', '/api/create'), () => of(response)).subscribe();
      expect(notificationSpy.show).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('throws error into RxJS stream for error responses', () => {
      const { interceptor } = setup();
      const response = makeResponse('error');
      let caught = false;
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe({
        error: () => {
          caught = true;
        },
      });
      expect(caught).toBe(true);
    });

    it('shows error toast for error responses even when SKIP_NOTIFICATION is false', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('error');
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe({
        error: vi.fn(),
      });
      expect(notificationSpy.error).toHaveBeenCalled();
    });

    it('skips error toast with SKIP_NOTIFICATION', () => {
      const { interceptor, notificationSpy } = setup();
      const response = makeResponse('error');
      const ctx = new HttpContext().set(SKIP_NOTIFICATION, true);
      interceptor(makeRequest('POST', '/api/test', ctx), () => of(response)).subscribe({
        error: vi.fn(),
      });
      expect(notificationSpy.error).not.toHaveBeenCalled();
    });

    it('re-throws HTTP network errors', () => {
      const { interceptor, notificationSpy } = setup();
      const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error' });
      let status = 0;
      interceptor(makeRequest('GET', '/api/test'), () => throwError(() => error)).subscribe({
        error: (err: HttpErrorResponse) => {
          status = err.status;
        },
      });
      expect(status).toBe(0);
      expect(notificationSpy.error).toHaveBeenCalled();
    });

    it('re-throws HTTP 500 errors', () => {
      const { interceptor, notificationSpy } = setup();
      const error = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
      let status = 0;
      interceptor(makeRequest('GET', '/api/test'), () => throwError(() => error)).subscribe({
        error: (err: HttpErrorResponse) => {
          status = err.status;
        },
      });
      expect(status).toBe(500);
      expect(notificationSpy.error).toHaveBeenCalled();
    });
  });

  describe('language-based messages', () => {
    it('uses Spanish error title for network errors', () => {
      const { interceptor, notificationSpy } = setup(Language.Spanish);
      const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error' });
      interceptor(makeRequest('GET', '/api/test'), () => throwError(() => error)).subscribe({
        error: vi.fn(),
      });
      expect(notificationSpy.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringMatching(/Error|conexión/i),
        }),
      );
    });

    it('uses Spanish error message for 500 errors', () => {
      const { interceptor, notificationSpy } = setup(Language.Spanish);
      const error = new HttpErrorResponse({ status: 500, statusText: 'Error' });
      interceptor(makeRequest('GET', '/api/test'), () => throwError(() => error)).subscribe({
        error: vi.fn(),
      });
      expect(notificationSpy.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringMatching(/Error|servidor/i),
        }),
      );
    });

    it('localizes individual error messages using error code', () => {
      const { interceptor, notificationSpy } = setup(Language.Spanish);
      const body = {
        status: 'error',
        code: '400',
        message: 'Validation failed',
        errors: [{ code: 'BAD_REQUEST', message: 'Original English' }],
        timestamp: new Date().toISOString(),
      };
      const response = new HttpResponse({ body });
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe({
        error: vi.fn(),
      });
      const calls = notificationSpy.show.mock.calls as [Record<string, string>][];
      const errorMessages = calls
        .filter((c) => c[0]['type'] === 'error')
        .map((c) => c[0]['message']);
      expect(errorMessages).toContain('Solicitud inválida');
    });

    it('falls back to server message when no localized error code matches', () => {
      const { interceptor, notificationSpy } = setup(Language.Spanish);
      const body = {
        status: 'error',
        code: '400',
        message: 'Custom error from server',
        errors: [{ code: 'CUSTOM_XYZ', message: 'Custom from server' }],
        timestamp: new Date().toISOString(),
      };
      const response = new HttpResponse({ body });
      interceptor(makeRequest('POST', '/api/test'), () => of(response)).subscribe({
        error: vi.fn(),
      });
      const calls = notificationSpy.show.mock.calls as [Record<string, string>][];
      const errorMessages = calls
        .filter((c) => c[0]['type'] === 'error')
        .map((c) => c[0]['message']);
      expect(errorMessages).toContain('Custom error from server');
    });
  });

  describe('authorization header', () => {
    it('attaches Bearer token when available', () => {
      const { interceptor } = setup(Language.English, 'test-jwt-token');
      let authHeader: string | null = null;
      interceptor(makeRequest('GET', '/api/secure'), (req) => {
        authHeader = req.headers.get('Authorization');
        return of(new HttpResponse({ body: { status: 'success', code: '200', timestamp: '' } }));
      }).subscribe();
      expect(authHeader).toBe('Bearer test-jwt-token');
    });

    it('does not attach token when no provider', () => {
      const { interceptor } = setup();
      let authHeader: string | null = null;
      interceptor(makeRequest('GET', '/api/public'), (req) => {
        authHeader = req.headers.get('Authorization');
        return of(new HttpResponse({ body: { status: 'success', code: '200', timestamp: '' } }));
      }).subscribe();
      expect(authHeader).toBeNull();
    });
  });
});
