export type AcpKpiCardColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'success-light'
  | 'warning'
  | 'warning-light'
  | 'error'
  | 'error-light'
  | 'info'
  | 'info-light'
  | 'neutral'
  | 'white'
  | 'custom';

export type AcpKpiCardVariant = 'default' | 'elevated' | 'outlined' | 'filled' | 'tonal';

export type AcpKpiCardSize = 'xs' | 'sm' | 'md' | 'lg';

export type AcpKpiCardTrend = 'up' | 'down' | 'neutral' | 'none';

export interface AcpKpiCardTrendConfig {
  icon: string;
  color: AcpKpiCardColor;
  ariaLabel: string;
}

export interface AcpKpiCardLayout {
  title: boolean;
  subtitle: boolean;
  value: boolean;
  description: boolean;
  trend: boolean;
  percentage: boolean;
  icon: boolean;
  avatar: boolean;
  actions: boolean;
  footer: boolean;
  progress: boolean;
}
