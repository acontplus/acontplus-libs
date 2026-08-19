import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { httpContextInterceptor } from './http-context-interceptor';
import { AUTH_TOKEN, ENVIRONMENT } from '@acontplus/ng-config';
import { LanguageInfo } from '../services/language-info';
import { Language } from '@acontplus/core';
import { LoggingService } from '../services/logging-service';
import { TenantInfo } from '../services/tenant-info';
import { CorrelationInfo } from '../services/correlation-info';
import { describe, it, expect, vi } from 'vitest';

function setup(language?: Language) {
  const loggingService = {
    logHttpRequest: vi.fn(),
    logHttpError: vi.fn(),
    logNetworkError: vi.fn(),
    logRateLimitError: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  };

  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'browser' },
      { provide: AUTH_TOKEN, useValue: null },
      {
        provide: ENVIRONMENT,
        useValue: {
          isProduction: false,
          apiBaseUrl: 'https://api.example.com',
          loginRoute: 'login',
          clientId: 'test-client',
        },
      },
      { provide: LoggingService, useValue: loggingService },
      {
        provide: TenantInfo,
        useValue: { getTenantId: () => 'tenant-1', handleForbidden: vi.fn() },
      },
      { provide: CorrelationInfo, useValue: { getOrCreateCorrelationId: () => 'corr-123' } },
    ],
  });

  const langInfo = TestBed.inject(LanguageInfo);
  if (language !== undefined) {
    langInfo.setLanguage(language);
  }

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => httpContextInterceptor(req, next));

  return { interceptor, langInfo, loggingService };
}

describe('httpContextInterceptor', () => {
  describe('Accept-Language header', () => {
    it('sends Accept-Language header with default English BCP47 tag', () => {
      const { interceptor } = setup();
      let acceptLanguage: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        acceptLanguage = req.headers.get('Accept-Language');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(acceptLanguage).toBe('en');
    });

    it('sends correct BCP47 for Spanish', () => {
      const { interceptor } = setup(Language.Spanish);
      let acceptLanguage: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        acceptLanguage = req.headers.get('Accept-Language');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(acceptLanguage).toBe('es');
    });

    it('sends correct BCP47 for French', () => {
      const { interceptor } = setup(Language.French);
      let acceptLanguage: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        acceptLanguage = req.headers.get('Accept-Language');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(acceptLanguage).toBe('fr');
    });

    it('sends correct BCP47 for ChineseSimplified', () => {
      const { interceptor } = setup(Language.ChineseSimplified);
      let acceptLanguage: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        acceptLanguage = req.headers.get('Accept-Language');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(acceptLanguage).toBe('zh-Hans');
    });

    it('sends correct BCP47 for SpanishLatinAmerica', () => {
      const { interceptor } = setup(Language.SpanishLatinAmerica);
      let acceptLanguage: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        acceptLanguage = req.headers.get('Accept-Language');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(acceptLanguage).toBe('es-419');
    });
  });

  describe('other headers', () => {
    it('includes Request-Id header', () => {
      const { interceptor } = setup();
      let requestId: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        requestId = req.headers.get('Request-Id');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(requestId).toBeTruthy();
    });

    it('includes Correlation-Id header', () => {
      const { interceptor } = setup();
      let correlationId: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        correlationId = req.headers.get('Correlation-Id');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(correlationId).toBe('corr-123');
    });

    it('includes Tenant-Id when tenant is set', () => {
      const { interceptor } = setup();
      let tenantId: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        tenantId = req.headers.get('Tenant-Id');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(tenantId).toBe('tenant-1');
    });

    it('includes Client-Version header', () => {
      const { interceptor } = setup();
      let clientVersion: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        clientVersion = req.headers.get('Client-Version');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(clientVersion).toBe('1.0.0');
    });

    it('includes Client-Id header', () => {
      const { interceptor } = setup();
      let clientId: string | null = null;
      interceptor(new HttpRequest('GET', '/api/test'), (req) => {
        clientId = req.headers.get('Client-Id');
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(clientId).toBe('test-client');
    });

    it('resolves URLs against apiBaseUrl', () => {
      const { interceptor } = setup();
      let resolvedUrl: string | undefined;
      interceptor(new HttpRequest('GET', 'users/list'), (req) => {
        resolvedUrl = req.url;
        return of(new HttpResponse({ body: null }));
      }).subscribe();
      expect(resolvedUrl).toBe('https://api.example.com/users/list');
    });
  });
});
