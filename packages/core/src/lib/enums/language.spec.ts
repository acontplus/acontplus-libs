import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import {
  Language,
  languageToBcp47,
  bcp47ToLanguage,
  detectBrowserLanguages,
  detectBrowserLanguage,
} from './language';

describe('Language enum', () => {
  it('has 20 languages matching the .NET backend', () => {
    const count = Object.keys(Language).filter(k => isNaN(Number(k))).length;
    expect(count).toBe(20);
  });

  it('starts with English = 1 and ends with SpanishLatinAmerica = 20', () => {
    expect(Language.English).toBe(1);
    expect(Language.SpanishLatinAmerica).toBe(20);
  });
});

describe('languageToBcp47', () => {
  it('maps all defined languages to valid BCP47 tags', () => {
    expect(languageToBcp47(Language.English)).toBe('en');
    expect(languageToBcp47(Language.Spanish)).toBe('es');
    expect(languageToBcp47(Language.SpanishLatinAmerica)).toBe('es-419');
    expect(languageToBcp47(Language.Portuguese)).toBe('pt');
    expect(languageToBcp47(Language.ChineseSimplified)).toBe('zh-Hans');
    expect(languageToBcp47(Language.ChineseTraditional)).toBe('zh-Hant');
    expect(languageToBcp47(Language.Japanese)).toBe('ja');
    expect(languageToBcp47(Language.Korean)).toBe('ko');
    expect(languageToBcp47(Language.French)).toBe('fr');
    expect(languageToBcp47(Language.German)).toBe('de');
    expect(languageToBcp47(Language.Italian)).toBe('it');
    expect(languageToBcp47(Language.Russian)).toBe('ru');
    expect(languageToBcp47(Language.Arabic)).toBe('ar');
    expect(languageToBcp47(Language.Dutch)).toBe('nl');
    expect(languageToBcp47(Language.Swedish)).toBe('sv');
    expect(languageToBcp47(Language.Norwegian)).toBe('nb');
    expect(languageToBcp47(Language.Danish)).toBe('da');
    expect(languageToBcp47(Language.Finnish)).toBe('fi');
    expect(languageToBcp47(Language.Polish)).toBe('pl');
    expect(languageToBcp47(Language.Hindi)).toBe('hi');
  });

  it('returns "en" for an unknown language', () => {
    expect(languageToBcp47(999 as Language)).toBe('en');
  });

  it('is the inverse of bcp47ToLanguage for all defined languages', () => {
    const languages = Object.values(Language).filter(v => typeof v === 'number') as Language[];
    for (const lang of languages) {
      const bcp47 = languageToBcp47(lang);
      const mapped = bcp47ToLanguage(bcp47);
      expect(mapped).toBe(lang);
    }
  });
});

describe('bcp47ToLanguage', () => {
  it('maps exact BCP47 tags', () => {
    expect(bcp47ToLanguage('en')).toBe(Language.English);
    expect(bcp47ToLanguage('es')).toBe(Language.Spanish);
    expect(bcp47ToLanguage('fr')).toBe(Language.French);
    expect(bcp47ToLanguage('ja')).toBe(Language.Japanese);
    expect(bcp47ToLanguage('zh-Hans')).toBe(Language.ChineseSimplified);
    expect(bcp47ToLanguage('zh-Hant')).toBe(Language.ChineseTraditional);
  });

  it('falls back to primary tag matching (e.g. en-US -> en -> English)', () => {
    expect(bcp47ToLanguage('en-US')).toBe(Language.English);
    expect(bcp47ToLanguage('es-EC')).toBe(Language.Spanish);
    expect(bcp47ToLanguage('fr-CA')).toBe(Language.French);
    expect(bcp47ToLanguage('pt-BR')).toBe(Language.Portuguese);
    expect(bcp47ToLanguage('de-DE')).toBe(Language.German);
    expect(bcp47ToLanguage('it-IT')).toBe(Language.Italian);
    expect(bcp47ToLanguage('ru-RU')).toBe(Language.Russian);
    expect(bcp47ToLanguage('ja-JP')).toBe(Language.Japanese);
    expect(bcp47ToLanguage('ko-KR')).toBe(Language.Korean);
    expect(bcp47ToLanguage('ar-SA')).toBe(Language.Arabic);
    expect(bcp47ToLanguage('zh-CN')).toBe(Language.ChineseSimplified);
    expect(bcp47ToLanguage('zh-TW')).toBe(Language.ChineseTraditional);
    expect(bcp47ToLanguage('zh-HK')).toBe(Language.ChineseTraditional);
  });

  it('falls back to English for unknown locale', () => {
    expect(bcp47ToLanguage('xx-XX')).toBe(Language.English);
    expect(bcp47ToLanguage('zz')).toBe(Language.English);
  });
});

describe('detectBrowserLanguages', () => {
  it('returns empty array when navigator is undefined', () => {
    const originalNavigator = globalThis.navigator as unknown;
    vi.stubGlobal('navigator', undefined);
    expect(detectBrowserLanguages()).toEqual([]);
    vi.unstubAllGlobals();
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('returns navigator.languages when available', () => {
    const originalNavigator = globalThis.navigator as unknown;
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        languages: ['es-EC', 'en-US', 'fr'],
        language: 'es-EC',
      },
      writable: true,
      configurable: true,
    });

    expect(detectBrowserLanguages()).toEqual(['es-EC', 'en-US', 'fr']);

    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('falls back to navigator.language when languages is empty', () => {
    const originalNavigator = globalThis.navigator as unknown;
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        languages: [],
        language: 'de-DE',
      },
      writable: true,
      configurable: true,
    });

    expect(detectBrowserLanguages()).toEqual(['de-DE']);

    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });
});

describe('detectBrowserLanguage', () => {
  it('returns English when navigator is undefined', () => {
    expect(detectBrowserLanguage()).toBe(Language.English);
  });

  it('detects Spanish from es-EC locale', () => {
    const originalNavigator = globalThis.navigator as unknown;
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        languages: ['es-EC', 'en'],
        language: 'es-EC',
      },
      writable: true,
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe(Language.Spanish);

    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('detects French from fr-CA locale', () => {
    const originalNavigator = globalThis.navigator as unknown;
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        languages: ['fr-CA'],
        language: 'fr-CA',
      },
      writable: true,
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe(Language.French);

    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('returns English when browser has only English locale', () => {
    const originalNavigator = globalThis.navigator as unknown;
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        languages: ['en-US'],
        language: 'en-US',
      },
      writable: true,
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe(Language.English);

    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });
});
