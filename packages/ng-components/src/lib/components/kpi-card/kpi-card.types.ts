/** Accent color of the card: icon tile, progress and, with `variant="filled"`, the container. */
export type AcpKpiCardColor =
  'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'custom';

/**
 * `default` raised surface with a soft shadow, `elevated` raised shadow, `outlined` border,
 * `tonal` 15% tint of `color`, `filled` solid `color` container.
 */
export type AcpKpiCardVariant = 'default' | 'elevated' | 'outlined' | 'tonal' | 'filled';

/** Density, same scale as `acp-data-grid`. */
export type AcpKpiCardSize = 'xs-small' | 'small' | 'medium' | 'large';

/** Horizontal alignment of header, value and text. */
export type AcpKpiCardAlign = 'start' | 'center' | 'end';

/** Direction of the change. `none` hides the trend icon. */
export type AcpKpiCardTrend = 'up' | 'down' | 'neutral' | 'none';

/** Whether the change is good or bad for the business; drives the delta badge color. */
export type AcpKpiCardTrendSentiment = 'positive' | 'negative' | 'neutral';

/** `percent`: `delta` is a percentage (`12.5` → `+12.5%`); `number`: a plain amount. */
export type AcpKpiCardDeltaFormat = 'percent' | 'number';

/** Heading level of the title. Without it the title is not a heading. */
export type AcpKpiCardHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Texts read by screen readers. */
export interface AcpKpiCardLabels {
  increase: string;
  decrease: string;
  noChange: string;
  moreOptions: string;
}

/**
 * Application-wide or subtree defaults for `acp-kpi-card`.
 * Provide them with `provideAcpKpiCardDefaults()` or `ACP_KPI_CARD_DEFAULT_OPTIONS`.
 * Inputs set on an individual card always win.
 */
export interface AcpKpiCardConfig {
  variant?: AcpKpiCardVariant;
  color?: AcpKpiCardColor;
  size?: AcpKpiCardSize;
  align?: AcpKpiCardAlign;
  deltaFormat?: AcpKpiCardDeltaFormat;
  showTrendIcon?: boolean;
  labels?: Partial<AcpKpiCardLabels>;
}
