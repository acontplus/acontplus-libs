import { Component, input, output, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
      matIconButton
      type="button"
      class="acp-header__theme-button"
      [attr.aria-label]="'Change theme, current: ' + currentTheme()"
      (click)="toggleTheme()"
    >
      <mat-icon>{{ getThemeIcon() }}</mat-icon>
    </button>
  `,
  host: { class: 'acp-header-theme' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
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

  private readonly themeCycle: AcpThemeVariant[] = ['light', 'dark'];

  getThemeIcon = computed(() => {
    switch (this.currentTheme()) {
      case 'light':
        return 'light_mode';
      case 'dark':
        return 'dark_mode';
      default:
        return 'contrast';
    }
  });

  toggleTheme() {
    const current = this.currentTheme();
    const index = this.themeCycle.indexOf(current);
    const nextIndex = index === -1 ? 0 : (index + 1) % this.themeCycle.length;
    const next = this.themeCycle[nextIndex];
    this.themeChange.emit(next);
  }
}
