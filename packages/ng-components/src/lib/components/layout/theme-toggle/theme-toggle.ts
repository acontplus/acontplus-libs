import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AcpLayoutSettings } from '../layout/layout-settings';

/**
 * Button that switches between light and dark mode. Shares its state with `acp-layout` and
 * `acp-customizer` through `AcpLayoutSettings` (persisted; from `auto` it switches to the
 * opposite of the effective mode). Follows WAI-ARIA best practices for toggle buttons.
 */
@Component({
  selector: 'acp-theme-toggle',
  imports: [MatIconButton, MatIcon, MatTooltip],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'acp-theme-toggle',
  },
})
export class ThemeToggle {
  readonly #settings = inject(AcpLayoutSettings);

  /** Icon to display when in dark mode (clicking will switch to light) */
  readonly lightModeIcon = input<string>('light_mode');

  /** Icon to display when in light mode (clicking will switch to dark) */
  readonly darkModeIcon = input<string>('dark_mode');

  /** Accessible label for when in dark mode */
  readonly lightModeLabel = input<string>('Modo claro');

  /** Accessible label for when in light mode */
  readonly darkModeLabel = input<string>('Modo oscuro');

  /** Test ID for automated testing */
  readonly testId = input<string>('');

  /** Effective dark mode (`dark`, or `auto` with a dark system preference) */
  protected readonly isDarkMode = this.#settings.isDark;

  protected readonly currentIcon = computed(() =>
    this.isDarkMode() ? this.lightModeIcon() : this.darkModeIcon(),
  );

  protected readonly currentLabel = computed(() =>
    this.isDarkMode() ? this.lightModeLabel() : this.darkModeLabel(),
  );

  /** Toggle between dark and light mode */
  toggleDarkMode(): void {
    this.#settings.set({ theme: this.isDarkMode() ? 'light' : 'dark' });
  }
}
