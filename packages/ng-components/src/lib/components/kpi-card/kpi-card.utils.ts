import { AcpKpiCardLabels, AcpKpiCardTrend } from './kpi-card.types';

/** @internal */
export const TREND_ICONS: Record<AcpKpiCardTrend, string> = {
  up: 'trending_up',
  down: 'trending_down',
  neutral: 'trending_flat',
  none: '',
};

/** @internal */
export const DEFAULT_LABELS: AcpKpiCardLabels = {
  increase: 'Increase',
  decrease: 'Decrease',
  noChange: 'No change',
  moreOptions: 'More options',
};

/** @internal Infers the trend direction from a numeric or numeric-string delta (`'+12.5'`, `-3`). */
export function inferTrend(delta: number | string | null | undefined): AcpKpiCardTrend {
  const n = typeof delta === 'number' ? delta : Number.parseFloat(String(delta ?? ''));
  if (Number.isNaN(n)) return 'none';
  return n > 0 ? 'up' : n < 0 ? 'down' : 'neutral';
}
