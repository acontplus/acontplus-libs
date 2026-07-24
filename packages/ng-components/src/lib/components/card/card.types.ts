/**
 * Card appearance variants
 */
export type AcpCardAppearance =
  | 'default'
  | 'outlined'
  | 'elevated'
  | 'filled'
  | 'interactive'
  | 'compact';

/**
 * Card elevation levels (Material Design)
 */
export type AcpCardElevation = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Card padding options
 */
export type AcpCardPadding = 'none' | 'small' | 'medium' | 'large';

/**
 * Card image aspect ratio
 */
export type AcpCardImageRatio = '1:1' | '4:3' | '16:9' | '21:9' | '3:2' | '3:4';

/**
 * Card configuration interface
 */
export interface AcpCardConfig {
  appearance?: AcpCardAppearance;
  elevation?: AcpCardElevation;
  rounded?: boolean | number;
  hover?: boolean;
  clickable?: boolean;
  outlined?: boolean;
  loading?: boolean;
  disabled?: boolean;
  padding?: AcpCardPadding;
  imageRatio?: AcpCardImageRatio;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

/**
 * Card badge configuration
 */
export interface AcpCardBadge {
  content: string | number;
  color?: 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning' | 'info';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
