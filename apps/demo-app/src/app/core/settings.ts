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
};
