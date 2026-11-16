import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface AcpLogoConfig {
  /** Image URL used when `acp-logo` has no `src`. SVG files are inlined to follow `--acp-logo-color`. */
  src?: string;
  /** Accessible name used when `acp-logo` has no `label`. */
  label?: string;
}

export const ACP_LOGO_CONFIG = new InjectionToken<AcpLogoConfig>('ACP_LOGO_CONFIG', {
  factory: () => ({}),
});

/** App-wide logo, e.g. `provideAcpLogo({ src: '/images/logo.svg', label: 'AcontPlus' })`. */
export function provideAcpLogo(config: AcpLogoConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ACP_LOGO_CONFIG, useValue: config }]);
}
