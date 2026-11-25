import {
  ACP_LAYOUT_DEFAULTS,
  type AcpFieldAppearance,
  type AcpControlSize,
} from '@acontplus/ng-components';

export type AppTheme = 'light' | 'dark' | 'auto';
export type AppThemeColor =
  'blue' | 'aqua' | 'purple' | 'green' | 'cyan' | 'orange' | 'pink' | 'rose';
export type AppDirection = 'ltr' | 'rtl';
export type AppContainer = 'full' | 'boxed';
export type AppCardStyle = 'shadow' | 'border';

export interface AppSettings {
  theme: AppTheme;
  themeColor: AppThemeColor;
  dir: AppDirection;
  container: AppContainer;
  cardStyle: AppCardStyle;
  /** Theme border radius in px (`--acp-skin-radius`). */
  radius: number;
  /** Default `mat-form-field` appearance (`MAT_FORM_FIELD_DEFAULT_OPTIONS`). */
  fieldAppearance: AcpFieldAppearance;
  /** `mat-form-field` height (`acp-control-<size>` on `<html>`). */
  controlSize: AcpControlSize;
}

export const THEME_COLORS: AppThemeColor[] = [
  'blue',
  'aqua',
  'purple',
  'green',
  'cyan',
  'orange',
  'pink',
  'rose',
];

export const defaults: AppSettings = {
  theme: 'auto',
  themeColor: 'blue',
  dir: 'ltr',
  container: 'full',
  cardStyle: 'shadow',
  radius: ACP_LAYOUT_DEFAULTS.radius,
  fieldAppearance: ACP_LAYOUT_DEFAULTS.fieldAppearance,
  controlSize: ACP_LAYOUT_DEFAULTS.controlSize,
};
