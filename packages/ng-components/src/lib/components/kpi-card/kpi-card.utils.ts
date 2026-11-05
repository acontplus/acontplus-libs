import { AcpKpiCardTrend, AcpKpiCardTrendConfig } from './kpi-card.types';

export const KPI_CARD_TREND_CONFIGS: Record<AcpKpiCardTrend, AcpKpiCardTrendConfig> = {
  up: { icon: 'trending_up', ariaLabel: 'Increase' },
  down: { icon: 'trending_down', ariaLabel: 'Decrease' },
  neutral: { icon: 'trending_flat', ariaLabel: 'No change' },
  none: { icon: '', ariaLabel: '' },
};

/** Infers the trend direction from a numeric or numeric-string delta (`'+12.5'`, `-3`). */
export function inferKpiTrend(delta: number | string | null | undefined): AcpKpiCardTrend {
  const n = typeof delta === 'number' ? delta : Number.parseFloat(String(delta ?? ''));
  if (Number.isNaN(n)) return 'none';
  return n > 0 ? 'up' : n < 0 ? 'down' : 'neutral';
}
