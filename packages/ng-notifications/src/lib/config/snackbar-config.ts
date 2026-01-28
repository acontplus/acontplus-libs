import { InjectionToken } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface SnackbarConfig extends MatSnackBarConfig {
  readonly defaultAction?: string;
  readonly iconEnabled?: boolean;
  readonly titleEnabled?: boolean;
  readonly accessibilityEnabled?: boolean;
  readonly showCloseIcon?: boolean;
  readonly progressBarEnabled?: boolean;
}

export const DEFAULT_SNACKBAR_CONFIG: SnackbarConfig = {
  duration: 5000, // Restauro el valor original
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  panelClass: [],
  defaultAction: 'Close',
  iconEnabled: true,
  titleEnabled: true,
  accessibilityEnabled: true,
  showCloseIcon: true,
  progressBarEnabled: true,
  // Default politeness will be set dynamically based on type
  politeness: 'polite',
};

export const SNACKBAR_CONFIG = new InjectionToken<SnackbarConfig>('acontplus-snackbar-config', {
  providedIn: 'root',
  factory: () => DEFAULT_SNACKBAR_CONFIG,
});
