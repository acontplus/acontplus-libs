import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import {
  AcpDialogActionsOutlet,
  AcpDialogConfig,
  AcpDialogTitlebarOutlet,
} from './dialog.interfaces';

/**
 * Token used to deliver `AcpDialogConfig.data` to the content component.
 * Content components read it with `inject(ACP_DIALOG_DATA)` (typed as `D`).
 * This is the single data channel, used identically for bare and shell dialogs.
 */
export const ACP_DIALOG_DATA = new InjectionToken<unknown>('ACP_DIALOG_DATA', {
  factory: () => null,
});

/**
 * Application-wide defaults for every dialog opened through `AcpDialogService`.
 * Mirrors `MAT_DIALOG_DEFAULT_OPTIONS` from Angular Material.
 * Per-call config always wins over these defaults.
 */
export const ACP_DIALOG_DEFAULT_OPTIONS = new InjectionToken<AcpDialogConfig>(
  'ACP_DIALOG_DEFAULT_OPTIONS',
);

/**
 * Token used by the declarative `<acp-dialog-actions>` component to register
 * its action buttons with the hosting `AcpDialogContainer`.
 */
export const ACP_DIALOG_ACTIONS = new InjectionToken<AcpDialogActionsOutlet>('ACP_DIALOG_ACTIONS');

/**
 * Token used by the declarative `<acp-dialog-titlebar>` component to register
 * its template with the hosting `AcpDialogContainer`.
 */
export const ACP_DIALOG_TITLEBAR = new InjectionToken<AcpDialogTitlebarOutlet>(
  'ACP_DIALOG_TITLEBAR',
);

/**
 * Registers application-wide dialog defaults, e.g.:
 * `provideAcpDialogDefaults({ fullScreenOnMobile: true })`.
 */
export function provideAcpDialogDefaults(defaults: AcpDialogConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ACP_DIALOG_DEFAULT_OPTIONS, useValue: defaults }]);
}
