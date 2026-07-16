export type AppTheme = 'light' | 'dark' | 'auto';
export type AppThemeColor =
  | 'blue'
  | 'aqua'
  | 'purple'
  | 'green'
  | 'cyan'
  | 'orange'
  | 'pink'
  | 'rose';

export interface AppSettings {
  theme: AppTheme;
  themeColor: AppThemeColor;
}

export const defaults: AppSettings = {
  theme: 'auto',
  themeColor: 'blue',
};
