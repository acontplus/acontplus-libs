import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { AcpKpiCardConfig } from './kpi-card.types';

/**
 * Defaults for every `acp-kpi-card` in the injector tree.
 * Can also be provided at component level: `providers: [{ provide: ACP_KPI_CARD_DEFAULT_OPTIONS, useValue }]`.
 */
export const ACP_KPI_CARD_DEFAULT_OPTIONS = new InjectionToken<AcpKpiCardConfig>(
  'ACP_KPI_CARD_DEFAULT_OPTIONS',
);

/**
 * Registers application-wide KPI card defaults, e.g.
 * `provideAcpKpiCardDefaults({ size: 'small', labels: { increase: 'Aumento' } })`.
 */
export function provideAcpKpiCardDefaults(defaults: AcpKpiCardConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ACP_KPI_CARD_DEFAULT_OPTIONS, useValue: defaults }]);
}
