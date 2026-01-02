import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeSwitcher } from '../../services';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * A theme toggle button component that allows users to switch between
 * light and dark modes. Follows WAI-ARIA best practices for toggle buttons.
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
  private readonly themeSwitcher = inject(ThemeSwitcher);

  /** Icon to display when in dark mode (clicking will switch to light) */
  readonly lightModeIcon = input<string>('light_mode');

  /** Icon to display when in light mode (clicking will switch to dark) */
  readonly darkModeIcon = input<string>('dark_mode');

  /** Accessible label for when in dark mode */
  readonly lightModeLabel = input<string>('Switch to light mode');

  /** Accessible label for when in light mode */
  readonly darkModeLabel = input<string>('Switch to dark mode');

  /** Test ID for automated testing */
  readonly testId = input<string>('');

  /** Current dark mode state as a signal */
  protected readonly isDarkMode = toSignal(this.themeSwitcher.isDarkMode$, {
    initialValue: false,
  });

  /** Computed icon based on current theme */
  protected readonly currentIcon = computed(() =>
    this.isDarkMode() ? this.lightModeIcon() : this.darkModeIcon(),
  );

  /** Computed accessible label based on current theme */
  protected readonly currentLabel = computed(() =>
    this.isDarkMode() ? this.lightModeLabel() : this.darkModeLabel(),
  );

  /** Toggle between dark and light mode */
  toggleDarkMode(): void {
    this.themeSwitcher.toggleDarkMode();
  }
}
