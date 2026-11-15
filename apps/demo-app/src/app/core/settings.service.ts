import { Injectable, inject, computed, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import type { AppSettings, AppTheme, AppThemeColor } from './settings';
import { THEME_COLORS, defaults } from './settings';

const STORAGE_KEY = 'demo-app-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private document = inject(DOCUMENT);

  private _options = signal<AppSettings>(this.loadSettings());

  options = computed(() => this._options());

  constructor() {
    this.applyTheme();
  }

  setOptions(newOptions: Partial<AppSettings>) {
    this._options.update(current => ({ ...current, ...newOptions }));
    this.saveSettings();
    this.applyTheme();
  }

  setTheme(theme: AppTheme) {
    this.setOptions({ theme });
  }

  setThemeColor(themeColor: AppThemeColor) {
    this.setOptions({ themeColor });
  }

  private loadSettings(): AppSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaults, ...(JSON.parse(stored) as Partial<AppSettings>) };
      }
    } catch {
      // Silently fail and return defaults
    }
    return defaults;
  }

  private saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.options()));
    } catch {
      // Silently fail on save error
    }
  }

  private applyTheme() {
    const html = this.document.documentElement;
    const { theme, themeColor, dir, container, cardStyle } = this.options();

    html.classList.remove(...THEME_COLORS.map(color => `theme-${color}`));
    html.classList.add(`theme-${themeColor}`);
    html.dir = dir;
    html.classList.toggle('acp-boxed', container === 'boxed');
    html.classList.toggle('acp-card-border', cardStyle === 'border');

    // Apply dark mode
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.toggle('docs-theme-dark', prefersDark);
    } else {
      html.classList.toggle('docs-theme-dark', theme === 'dark');
    }
  }
}
