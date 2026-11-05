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
  | 'surface'
  | 'custom';

export type AcpKpiCardVariant = 'default' | 'elevated' | 'outlined' | 'filled' | 'tonal';

export type AcpKpiCardSize = 'xs' | 'sm' | 'md' | 'lg';

/** Horizontal alignment of header, value and text. */
export type AcpKpiCardAlign = 'start' | 'center' | 'end';

/** Direction of the change. `none` hides the trend icon. */
export type AcpKpiCardTrend = 'up' | 'down' | 'neutral' | 'none';

/** Whether the change is good or bad for the business; drives the delta badge color. */
export type AcpKpiCardTrendSentiment = 'positive' | 'negative' | 'neutral';

export interface AcpKpiCardTrendConfig {
  icon: string;
  ariaLabel: string;
}
