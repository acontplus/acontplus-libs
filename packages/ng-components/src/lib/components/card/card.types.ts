/**
 * Card appearance variants. Mirrors Angular Material's `MatCardAppearance`
 * (`elevated` maps to Material's `raised`).
 *
 * `default`, `interactive` and `compact` are deprecated aliases:
 * - `default` → `elevated`
 * - `interactive` → `elevated` + `hoverable`
 * - `compact` → `elevated` + `padding="small"`
 */
export type AcpCardAppearance =
  | 'elevated'
  | 'outlined'
  | 'filled'
  /** @deprecated Use `elevated`. */
  | 'default'
  /** @deprecated Use `appearance="elevated"` with `hoverable` or `clickable`. */
  | 'interactive'
  /** @deprecated Use `appearance="elevated"` with `padding="small"`. */
  | 'compact';

/**
 * Card elevation levels, mapped to `--mat-sys-level{n}`. Only applies to `elevated` cards.
 */
export type AcpCardElevation = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Content padding options.
 */
export type AcpCardPadding = 'none' | 'small' | 'medium' | 'large';

/**
 * Card color variants based on Material Design 3 system roles.
 */
export type AcpCardColor =
  | 'primary'
  | 'primary-container'
  | 'secondary'
  | 'secondary-container'
  | 'tertiary'
  | 'tertiary-container'
  | 'error'
  | 'error-container'
  | 'surface'
  | 'surface-variant'
  | 'surface-container-highest'
  | 'surface-container-high'
  | 'surface-container'
  | 'surface-container-low'
  | 'surface-container-lowest'
  | 'inverse-surface'
  | 'disabled-bg';

/**
 * @deprecated Use `AcpCardColor`.
 */
export type AcpCardBackgroundColor = AcpCardColor;

/**
 * Media aspect ratio.
 */
export type AcpCardImageRatio = '1:1' | '4:3' | '16:9' | '21:9' | '3:2' | '3:4';

/**
 * Horizontal alignment of the actions slot (same as `mat-card-actions[align]`).
 */
export type AcpCardActionsAlign = 'start' | 'end';

/**
 * Application-wide or subtree defaults for `acp-card`.
 * Provide them with `provideAcpCardDefaults()` or the `ACP_CARD_DEFAULT_OPTIONS` token.
 * Inputs set on an individual card always win.
 */
export interface AcpCardConfig {
  appearance?: AcpCardAppearance;
  elevation?: AcpCardElevation;
  rounded?: boolean | number;
  padding?: AcpCardPadding;
  color?: AcpCardColor;
  hoverable?: boolean;
  actionsAlign?: AcpCardActionsAlign;
  imageRatio?: AcpCardImageRatio;
  /** @deprecated Use `hoverable`. */
  hover?: boolean;
  /** @deprecated Use `appearance: 'outlined'`. */
  outlined?: boolean;
  /** @deprecated Per-instance state; set it on the card. */
  clickable?: boolean;
  /** @deprecated Per-instance state; set it on the card. */
  loading?: boolean;
  /** @deprecated Per-instance state; set it on the card. */
  disabled?: boolean;
  /** @deprecated Per-instance layout; set it on the card. */
  fullHeight?: boolean;
  /** @deprecated Per-instance layout; set it on the card. */
  fullWidth?: boolean;
}

/**
 * Card badge configuration.
 */
export interface AcpCardBadge {
  content: string | number;
  color?: 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning' | 'info';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Pass-through classes and styles for a single card section.
 */
export interface AcpCardPassThroughSection {
  class?: string | string[] | Record<string, boolean>;
  style?: Record<string, string>;
  [key: string]: any;
}

export interface AcpCardPassThroughOptions {
  root?: AcpCardPassThroughSection | undefined;
  header?: AcpCardPassThroughSection | undefined;
  media?: AcpCardPassThroughSection | undefined;
  avatar?: AcpCardPassThroughSection | undefined;
  title?: AcpCardPassThroughSection | undefined;
  subtitle?: AcpCardPassThroughSection | undefined;
  content?: AcpCardPassThroughSection | undefined;
  actions?: AcpCardPassThroughSection | undefined;
  footer?: AcpCardPassThroughSection | undefined;
}
