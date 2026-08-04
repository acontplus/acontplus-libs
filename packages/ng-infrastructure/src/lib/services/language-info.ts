import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Language,
  bcp47ToLanguage,
  detectBrowserLanguage,
  detectBrowserLanguages,
  languageToBcp47,
} from '@acontplus/core';
import { AUTH_TOKEN } from '@acontplus/ng-config';

const LANGUAGE_STORAGE_KEY = 'acontplus-language';

@Injectable({
  providedIn: 'root',
})
export class LanguageInfo {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authToken = inject(AUTH_TOKEN, { optional: true });
  private readonly _language = signal<Language>(Language.English);
  private readonly _bcp47 = signal<string>('en');
  private initialized = false;

  readonly language = computed(() => this._language());
  readonly bcp47Tag = computed(() => this._bcp47());

  getCurrentLanguage(): Language {
    this.ensureInitialized();
    return this._language();
  }

  getBcp47Tag(): string {
    this.ensureInitialized();
    return this._bcp47();
  }

  getBrowserLanguages(): string[] {
    return detectBrowserLanguages();
  }

  setLanguage(language: Language): void {
    this._language.set(language);
    this._bcp47.set(languageToBcp47(language));
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(LANGUAGE_STORAGE_KEY, language.toString());
    }
  }

  private ensureInitialized(): void {
    if (this.initialized) return;
    this.initialized = true;

    if (!isPlatformBrowser(this.platformId)) {
      this._language.set(Language.English);
      this._bcp47.set('en');
      return;
    }

    const userLocale = this.authToken?.getUserData?.()?.locale;
    if (userLocale) {
      this._language.set(this.resolveLanguage(userLocale));
      this._bcp47.set(languageToBcp47(this._language()));
      return;
    }

    const stored = sessionStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) {
      const parsed = Number(stored) as Language;
      if (parsed > 0) {
        this._language.set(parsed);
        this._bcp47.set(languageToBcp47(parsed));
        return;
      }
    }

    const browserLang = detectBrowserLanguage();
    this._language.set(browserLang);
    this._bcp47.set(languageToBcp47(browserLang));
  }

  private resolveLanguage(locale: string): Language {
    return bcp47ToLanguage(locale);
  }
}
