import { AcpKpiCardTrend, AcpKpiCardTrendConfig } from './kpi-card.types';

export const KPI_CARD_TREND_CONFIGS: Record<AcpKpiCardTrend, AcpKpiCardTrendConfig> = {
  up: {
    icon: 'trending_up',
    color: 'success',
    ariaLabel: 'Trending up',
  },
  down: {
    icon: 'trending_down',
    color: 'error',
    ariaLabel: 'Trending down',
  },
  neutral: {
    icon: 'trending_flat',
    color: 'info',
    ariaLabel: 'Neutral trend',
  },
  none: {
    icon: '',
    color: 'neutral',
    ariaLabel: '',
  },
};

export function formatValue(value: number | string, format?: string): string {
  if (typeof value === 'string') return value;

  if (!format) return value.toString();

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'percent':
      return `${value.toFixed(1)}%`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    case 'decimal':
      return value.toFixed(2);
    default:
      return value.toString();
  }
}
