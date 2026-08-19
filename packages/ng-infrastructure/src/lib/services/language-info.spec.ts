import { describe, it, expect, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { LanguageInfo } from './language-info';
import { AUTH_TOKEN } from '@acontplus/ng-config';
import { Language } from '@acontplus/core';

function setNavigatorLanguages(languages: string[]) {
  Object.defineProperty(globalThis, 'navigator', {
    value: { languages, language: languages[0] ?? 'en' },
    writable: true,
    configurable: true,
  });
}

function resetNavigator() {
  Object.defineProperty(globalThis, 'navigator', {
    value: undefined,
    writable: true,
    configurable: true,
  });
}

function createAuthTokenProvider(userLocale?: string) {
  const getUserData = userLocale
    ? () => ({ locale: userLocale, email: 'test@test.com', displayName: 'Test' })
    : () => null;

  return {
    getToken: () => 'mock-token',
    isAuthenticated: () => true,
    getUserData,
  };
}

afterEach(() => {
  resetNavigator();
  sessionStorage.clear();
});

describe('LanguageInfo', () => {
  describe('getCurrentLanguage', () => {
    it('defaults to English when platform is not browser', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getCurrentLanguage()).toBe(Language.English);
    });

    it('detects language from browser when no JWT locale', () => {
      setNavigatorLanguages(['es-EC', 'en']);

      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getCurrentLanguage()).toBe(Language.Spanish);
    });

    it('uses JWT locale claim when available', () => {
      setNavigatorLanguages(['fr-FR', 'en']);

      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: createAuthTokenProvider('de') },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getCurrentLanguage()).toBe(Language.German);
    });

    it('falls back to browser when JWT has no locale', () => {
      setNavigatorLanguages(['it-IT', 'en']);

      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: createAuthTokenProvider(undefined) },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getCurrentLanguage()).toBe(Language.Italian);
    });

    it('uses sessionStorage cache across instances', () => {
      setNavigatorLanguages(['pt-BR']);
      sessionStorage.setItem('acontplus-language', '1');

      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getCurrentLanguage()).toBe(Language.English);
    });
  });

  describe('getBcp47Tag', () => {
    it('returns "en" for English', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getBcp47Tag()).toBe('en');
    });

    it('returns correct BCP47 for browser-detected language', () => {
      setNavigatorLanguages(['ja-JP']);
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getBcp47Tag()).toBe('ja');
    });

    it('returns correct BCP47 when set programmatically', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      service.setLanguage(Language.Russian);
      expect(service.getBcp47Tag()).toBe('ru');
    });
  });

  describe('setLanguage', () => {
    it('updates language and BCP47 tag', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      service.setLanguage(Language.Italian);
      expect(service.getCurrentLanguage()).toBe(Language.Italian);
      expect(service.getBcp47Tag()).toBe('it');
    });

    it('persists to sessionStorage', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      service.setLanguage(Language.Portuguese);
      expect(sessionStorage.getItem('acontplus-language')).toBe('6');
    });

    it('does not persist when on server', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      });
      const service = TestBed.inject(LanguageInfo);
      service.setLanguage(Language.French);
      expect(sessionStorage.getItem('acontplus-language')).toBeNull();
    });
  });

  describe('getBrowserLanguages', () => {
    it('returns browser languages', () => {
      setNavigatorLanguages(['es-EC', 'en-US', 'fr']);
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      const langs = service.getBrowserLanguages();
      expect(langs).toEqual(['es-EC', 'en-US', 'fr']);
    });

    it('returns empty array on server', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getBrowserLanguages()).toEqual([]);
    });
  });

  describe('signals', () => {
    it('language signal tracks current language', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.language()).toBe(Language.English);
      service.setLanguage(Language.SpanishLatinAmerica);
      expect(service.language()).toBe(Language.SpanishLatinAmerica);
    });

    it('bcp47Tag signal tracks BCP47 tag', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.bcp47Tag()).toBe('en');
      service.setLanguage(Language.ChineseSimplified);
      expect(service.bcp47Tag()).toBe('zh-Hans');
    });
  });

  describe('priority order (JWT > session > browser)', () => {
    it('JWT locale takes highest priority', () => {
      setNavigatorLanguages(['fr-FR']);
      sessionStorage.setItem('acontplus-language', '3');

      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: createAuthTokenProvider('ja') },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getCurrentLanguage()).toBe(Language.Japanese);
    });

    it('sessionStorage takes priority over browser', () => {
      setNavigatorLanguages(['pt-BR']);
      sessionStorage.setItem('acontplus-language', '7');

      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AUTH_TOKEN, useValue: null },
        ],
      });
      const service = TestBed.inject(LanguageInfo);
      expect(service.getCurrentLanguage()).toBe(Language.ChineseSimplified);
    });
  });
});
