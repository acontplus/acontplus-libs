import { Injectable, inject, computed, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import type { AppSettings, AppTheme, AppThemeColor } from './settings';
import { defaults } from './settings';

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
        return JSON.parse(stored) as AppSettings;
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
    return defaults;
  }

  private saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.options()));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }

  private applyTheme() {
    const html = this.document.documentElement;
    const { theme, themeColor } = this.options();

    // Apply theme color class
    html.classList.remove(
      'theme-blue',
      'theme-aqua',
      'theme-purple',
      'theme-green',
      'theme-cyan',
      'theme-orange',
      'theme-pink',
      'theme-rose',
    );
    html.classList.add(`theme-${themeColor}`);

    // Apply dark mode
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.toggle('docs-theme-dark', prefersDark);
    } else {
      html.classList.toggle('docs-theme-dark', theme === 'dark');
    }
  }
}
