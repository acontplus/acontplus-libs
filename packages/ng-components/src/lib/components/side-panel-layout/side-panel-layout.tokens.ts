import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import type { AcpSidePanelConfig } from './side-panel-layout.types';

/**
 * Defaults for every `acp-side-panel-layout` in the injector tree. Can also be provided at
 * component level: `providers: [{ provide: ACP_SIDE_PANEL_DEFAULT_OPTIONS, useValue }]`.
 */
export const ACP_SIDE_PANEL_DEFAULT_OPTIONS = new InjectionToken<AcpSidePanelConfig>(
  'ACP_SIDE_PANEL_DEFAULT_OPTIONS',
);

/** Registers application-wide defaults, e.g. `provideAcpSidePanelDefaults({ panelWidth: '18rem' })`. */
export function provideAcpSidePanelDefaults(defaults: AcpSidePanelConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ACP_SIDE_PANEL_DEFAULT_OPTIONS, useValue: defaults },
  ]);
}
