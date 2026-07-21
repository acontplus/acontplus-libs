import { AcpBadgeColor, AcpBadgeTrend, AcpBadgeTrendConfig } from './badge.types';

export const TREND_CONFIGS: Record<AcpBadgeTrend, AcpBadgeTrendConfig> = {
  up: { value: '↑', icon: 'trending_up', color: 'success' as AcpBadgeColor },
  down: { value: '↓', icon: 'trending_down', color: 'danger' as AcpBadgeColor },
  neutral: { value: '→', icon: 'trending_flat', color: 'neutral' as AcpBadgeColor },
  none: { value: '', icon: '', color: 'neutral' as AcpBadgeColor },
};
