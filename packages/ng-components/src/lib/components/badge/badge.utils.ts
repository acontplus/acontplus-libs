import { AcpBadgeLabels, AcpBadgeTrend } from './badge.types';

/** @internal */
export const TREND_ICONS: Record<AcpBadgeTrend, string> = {
  up: 'trending_up',
  down: 'trending_down',
  neutral: 'trending_flat',
};

/** @internal */
export const DEFAULT_LABELS: AcpBadgeLabels = {
  remove: 'Remove {label}',
  increase: 'Increase',
  decrease: 'Decrease',
  noChange: 'No change',
};
