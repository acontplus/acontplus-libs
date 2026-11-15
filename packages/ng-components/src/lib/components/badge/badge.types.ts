/** Colors, M3 roles plus semantic status colors. */
export const ACP_BADGE_COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
  'custom',
] as const;
export type AcpBadgeColor = (typeof ACP_BADGE_COLORS)[number];

/** `tonal` (default, 15% tint as in MaterialPro), `filled`, `outlined` or `text`. */
export const ACP_BADGE_VARIANTS = ['tonal', 'filled', 'outlined', 'text'] as const;
export type AcpBadgeVariant = (typeof ACP_BADGE_VARIANTS)[number];

/** Density, same scale as `acp-data-grid` and `acp-kpi-card`. */
export const ACP_BADGE_SIZES = ['xs-small', 'small', 'medium', 'large'] as const;
export type AcpBadgeSize = (typeof ACP_BADGE_SIZES)[number];

export const ACP_BADGE_SHAPES = ['pill', 'rounded', 'square'] as const;
export type AcpBadgeShape = (typeof ACP_BADGE_SHAPES)[number];

/** Direction of a change. Sets the trend icon and, with `lowerIsBetter`, the color. */
export type AcpBadgeTrend = 'up' | 'down' | 'neutral';

/** Texts read by screen readers. */
export interface AcpBadgeLabels {
  /** Remove button; `{label}` is replaced with the badge label. */
  remove: string;
  increase: string;
  decrease: string;
  noChange: string;
}

/**
 * Application-wide or subtree defaults for `acp-badge`.
 * Provide them with `provideAcpBadgeDefaults()` or `ACP_BADGE_DEFAULT_OPTIONS`.
 * Inputs set on an individual badge always win.
 */
export interface AcpBadgeConfig {
  variant?: AcpBadgeVariant;
  color?: AcpBadgeColor;
  size?: AcpBadgeSize;
  shape?: AcpBadgeShape;
  labels?: Partial<AcpBadgeLabels>;
}
