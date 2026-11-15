import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { AcpBadgeConfig } from './badge.types';

/**
 * Defaults for every `acp-badge` in the injector tree.
 * Can also be provided at component level: `providers: [{ provide: ACP_BADGE_DEFAULT_OPTIONS, useValue }]`.
 */
export const ACP_BADGE_DEFAULT_OPTIONS = new InjectionToken<AcpBadgeConfig>(
  'ACP_BADGE_DEFAULT_OPTIONS',
);

/**
 * Registers application-wide badge defaults, e.g.
 * `provideAcpBadgeDefaults({ size: 'small', labels: { remove: 'Quitar {label}' } })`.
 */
export function provideAcpBadgeDefaults(defaults: AcpBadgeConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ACP_BADGE_DEFAULT_OPTIONS, useValue: defaults }]);
}
