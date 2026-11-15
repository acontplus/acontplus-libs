import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { ACP_LAYOUT_CONFIG, type AcpLayoutConfig } from './layout.config';
import { AcpLayoutSettings } from './layout-settings';

/**
 * Configures `acp-layout`, `acp-customizer` and `AcpLayoutSettings`.
 *
 * @example
 * provideAcpLayout({ branding: { name: 'AcontPlus' }, defaults: { themeColor: 'pink' } })
 */
export function provideAcpLayout(config: AcpLayoutConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ACP_LAYOUT_CONFIG, useValue: config },
    // Applies theme, color and direction on startup, also on pages outside acp-layout (login).
    provideEnvironmentInitializer(() => inject(AcpLayoutSettings)),
  ]);
}
