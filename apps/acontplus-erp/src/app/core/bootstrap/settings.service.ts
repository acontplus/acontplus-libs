import { Direction } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, inject, DOCUMENT, signal } from '@angular/core';
import { AppDirectionality, LocalStorageService } from '@shared';
import { AppSettings, AppTheme, AppThemeColor, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly key = 'ng-acontplus-settings';

  private readonly document = inject(DOCUMENT);
  private readonly store = inject(LocalStorageService);
  private readonly mediaMatcher = inject(MediaMatcher);
  private readonly dir = inject(AppDirectionality);

  private htmlElement = this.document.querySelector('html')!;

  private storedOptions: AppSettings = this.store.get(this.key);

  private readonly _options = signal<AppSettings>(Object.assign(defaults, this.storedOptions));

  readonly options = this._options.asReadonly();

  languages = ['en-US', 'zh-CN', 'zh-TW'];

  constructor() {
    // this.translate.addLangs(this.languages);
  }

  reset() {
    this.store.remove(this.key);
    this._options.set(Object.assign(defaults, {}));
  }

  setOptions(options?: Partial<AppSettings>) {
    const newOptions = Object.assign(defaults, this._options(), options);
    this._options.set(newOptions);
    this.store.set(this.key, newOptions);
  }

  setDirection(dir?: Direction) {
    if (dir) {
      this.setOptions({ dir });
    }
    this.dir.value = this.options().dir;
    this.htmlElement.dir = this.options().dir;
  }

  getThemeColor() {
    // Check whether the browser support `prefers-color-scheme`
    if (
      this.options().theme === 'auto' &&
      this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      return isSystemDark ? 'dark' : 'light';
    } else {
      return this.options().theme as Exclude<AppTheme, 'auto'>;
    }
  }

  setTheme(theme?: AppTheme) {
    if (theme) {
      this.setOptions({ theme });
    }
    if (this.getThemeColor() === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  }

  setThemeColor(themeColor?: AppThemeColor) {
    if (themeColor) {
      this.setOptions({ themeColor });
    }
    // Remover todas las clases de color de tema
    this.htmlElement.classList.remove(
      'theme-blue',
      'theme-aqua',
      'theme-purple',
      'theme-green',
      'theme-cyan',
      'theme-orange',
      'theme-pink',
      'theme-rose',
    );
    // Agregar la clase del color seleccionado
    this.htmlElement.classList.add(`theme-${this.options().themeColor}`);
  }

  getTranslateLang() {
    if (this.options().language === 'auto') {
      const browserLang = navigator.language;
      return this.languages.includes(browserLang) ? browserLang : 'en-US';
    }
    return this.options().language;
  }

  setLanguage(language?: string) {
    if (language) {
      this.setOptions({ language });
    }
    // this.translate.use(this.getTranslateLang());
  }

  getLocale() {
    // return this.localeMap[this.getTranslateLang()];
    return null;
  }
}
