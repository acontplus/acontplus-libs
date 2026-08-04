export enum Language {
  English = 1,
  Spanish = 2,
  French = 3,
  German = 4,
  Italian = 5,
  Portuguese = 6,
  ChineseSimplified = 7,
  ChineseTraditional = 8,
  Japanese = 9,
  Korean = 10,
  Russian = 11,
  Arabic = 12,
  Dutch = 13,
  Swedish = 14,
  Norwegian = 15,
  Danish = 16,
  Finnish = 17,
  Polish = 18,
  Hindi = 19,
  SpanishLatinAmerica = 20,
}

const LANGUAGE_TO_BCP47: Record<Language, string> = {
  [Language.English]: 'en',
  [Language.Spanish]: 'es',
  [Language.French]: 'fr',
  [Language.German]: 'de',
  [Language.Italian]: 'it',
  [Language.Portuguese]: 'pt',
  [Language.ChineseSimplified]: 'zh-Hans',
  [Language.ChineseTraditional]: 'zh-Hant',
  [Language.Japanese]: 'ja',
  [Language.Korean]: 'ko',
  [Language.Russian]: 'ru',
  [Language.Arabic]: 'ar',
  [Language.Dutch]: 'nl',
  [Language.Swedish]: 'sv',
  [Language.Norwegian]: 'nb',
  [Language.Danish]: 'da',
  [Language.Finnish]: 'fi',
  [Language.Polish]: 'pl',
  [Language.Hindi]: 'hi',
  [Language.SpanishLatinAmerica]: 'es-419',
};

const BCP47_TO_LANGUAGE: Record<string, Language> = Object.fromEntries(
  Object.entries(LANGUAGE_TO_BCP47).map(([key, value]) => [value, Number(key) as Language]),
);

export function languageToBcp47(language: Language): string {
  return LANGUAGE_TO_BCP47[language] ?? 'en';
}

const ZH_TRADITIONAL_REGIONS = ['hk', 'tw', 'mo'];

export function bcp47ToLanguage(bcp47: string): Language {
  const primary = BCP47_TO_LANGUAGE[bcp47];
  if (primary !== undefined) return primary;

  const parts = bcp47.split('-');
  const shortCode = parts[0];

  if (shortCode === 'zh' && parts.length > 1) {
    const region = parts[1].toLowerCase();
    if (region === 'hant' || ZH_TRADITIONAL_REGIONS.includes(region)) {
      return Language.ChineseTraditional;
    }
    if (region === 'hans' || region === 'cn' || region === 'sg') {
      return Language.ChineseSimplified;
    }
    return Language.ChineseSimplified;
  }

  const matched = BCP47_TO_LANGUAGE[shortCode];
  if (matched !== undefined) return matched;

  const fallback = Object.entries(LANGUAGE_TO_BCP47).find(([, v]) => v.split('-')[0] === shortCode);
  return fallback ? (Number(fallback[0]) as Language) : Language.English;
}

export function detectBrowserLanguages(): string[] {
  if (typeof navigator === 'undefined') return [];
  const languages = navigator.languages?.length ? [...navigator.languages] : [];
  if (!languages.length && navigator.language) {
    languages.push(navigator.language);
  }
  return languages;
}

export function detectBrowserLanguage(): Language {
  const browserLangs = detectBrowserLanguages();
  for (const lang of browserLangs) {
    const mapped = bcp47ToLanguage(lang);
    if (mapped !== Language.English || lang.startsWith('en')) return mapped;
  }
  return Language.English;
}
