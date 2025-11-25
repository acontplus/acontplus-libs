/**
 * Button types for HTML button elements
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button variant/color schemes
 * Framework-agnostic color variants for button styling
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark';

/**
 * Material Design button styles
 * Based on Material Design 3 specifications
 */
export type MaterialButtonStyle =
  | 'text'
  | 'elevated'
  | 'outlined'
  | 'filled'
  | 'tonal'
  | 'icon'
  | 'fab'
  | 'mini-fab'
  | 'extended-fab';
