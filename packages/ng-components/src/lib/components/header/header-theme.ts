import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Theme variant
 */
export type AcpThemeVariant = 'light' | 'dark' | 'auto';

/**
 * AcpHeaderTheme Component
 *
 * Theme switcher for the header.
 *
 * @example
 * ```html
 * <acp-header-theme
 *   [currentTheme]="currentTheme"
 *   (themeChange)="onThemeChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'acp-header-theme',
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="menu"
      class="acp-header__theme-button"
    >
      <mat-icon>{{ getThemeIcon() }}</mat-icon>
    </button>

    <mat-menu #menu="matMenu" class="acp-header__theme-menu">
      <button
        mat-menu-item
        [class.acp-header__theme-item--active]="currentTheme() === 'light'"
        (click)="handleThemeChange('light')"
      >
        <mat-icon>light_mode</mat-icon>
        <span>Light</span>
        @if (currentTheme() === 'light') {
          <mat-icon class="acp-header__theme-check">check</mat-icon>
        }
      </button>
      <button
        mat-menu-item
        [class.acp-header__theme-item--active]="currentTheme() === 'dark'"
        (click)="handleThemeChange('dark')"
      >
        <mat-icon>dark_mode</mat-icon>
        <span>Dark</span>
        @if (currentTheme() === 'dark') {
          <mat-icon class="acp-header__theme-check">check</mat-icon>
        }
      </button>
      <button
        mat-menu-item
        [class.acp-header__theme-item--active]="currentTheme() === 'auto'"
        (click)="handleThemeChange('auto')"
      >
        <mat-icon>contrast</mat-icon>
        <span>Auto</span>
        @if (currentTheme() === 'auto') {
          <mat-icon class="acp-header__theme-check">check</mat-icon>
        }
      </button>
    </mat-menu>
  `,
  host: { class: 'acp-header-theme' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class AcpHeaderTheme {
  /**
   * Currently selected theme.
   */
  readonly currentTheme = input<AcpThemeVariant>('auto');

  /**
   * Event emitted when theme is changed.
   */
  readonly themeChange = output<AcpThemeVariant>();

  getThemeIcon(): string {
    switch (this.currentTheme()) {
      case 'light':
        return 'light_mode';
      case 'dark':
        return 'dark_mode';
      default:
        return 'contrast';
    }
  }

  handleThemeChange(theme: AcpThemeVariant) {
    this.themeChange.emit(theme);
  }
}
