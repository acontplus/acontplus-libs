import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { AcpCardConfig } from './card.types';

/**
 * Defaults for every `acp-card` in the injector tree. Mirrors `MAT_CARD_CONFIG`.
 * Can also be provided at component level: `providers: [{ provide: ACP_CARD_DEFAULT_OPTIONS, useValue }]`.
 */
export const ACP_CARD_DEFAULT_OPTIONS = new InjectionToken<AcpCardConfig>(
  'ACP_CARD_DEFAULT_OPTIONS',
);

/**
 * Registers application-wide card defaults, e.g.:
 * `provideAcpCardDefaults({ appearance: 'outlined', rounded: 16 })`.
 */
export function provideAcpCardDefaults(defaults: AcpCardConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ACP_CARD_DEFAULT_OPTIONS, useValue: defaults }]);
}
