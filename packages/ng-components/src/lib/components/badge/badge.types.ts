export type AcpBadgeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'custom';

export type AcpBadgeVariant = 'filled' | 'outlined' | 'soft' | 'tonal' | 'text';

export type AcpBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export type AcpBadgeShape = 'rounded' | 'pill' | 'square';

export type AcpBadgeTrend = 'up' | 'down' | 'neutral' | 'none';

export interface AcpBadgeTrendConfig {
  value: string;
  icon: string;
  color: AcpBadgeColor;
}
