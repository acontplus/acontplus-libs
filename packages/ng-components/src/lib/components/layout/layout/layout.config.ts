import { InjectionToken } from '@angular/core';

export type AcpNavPos = 'side' | 'top';
export type AcpHeaderPos = 'fixed' | 'static' | 'above';
export type AcpLayoutDir = 'ltr' | 'rtl';
export type AcpThemeMode = 'light' | 'dark' | 'auto';
export type AcpThemeColor =
  'blue' | 'aqua' | 'purple' | 'green' | 'cyan' | 'orange' | 'pink' | 'rose';

/** Options of `acp-layout`, edited by `acp-customizer` and persisted by `AcpLayoutSettings`. */
export interface AcpLayoutOptions {
  navPos: AcpNavPos;
  dir: AcpLayoutDir;
  theme: AcpThemeMode;
  /** Prebuilt theme applied as `theme-<color>` on `<html>`. */
  themeColor: AcpThemeColor;
  showHeader: boolean;
  headerPos: AcpHeaderPos;
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  /** Cards with border instead of shadow (`acp-card-border` on `<html>`, acontpluspro). */
  cardBorder: boolean;
  /** Page content limited to a centered max width (`acp-boxed` on `<html>`, acontpluspro). */
  boxed: boolean;
  /**
   * Corner radius (px) of cards, menus, fields... (`--acp-skin-radius` on `<html>`,
   * acontpluspro).
   */
  radius: number;
}

export const ACP_LAYOUT_DEFAULTS: AcpLayoutOptions = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'auto',
  themeColor: 'blue',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  cardBorder: false,
  boxed: false,
  radius: 10,
};

/** Range of the theme border radius (px) offered by the customizer. */
export const ACP_LAYOUT_RADIUS_RANGE = { min: 4, max: 24 } as const;

/** Prebuilt themes with the brand color shown by the customizer. */
export const ACP_THEME_COLORS: readonly { value: AcpThemeColor; label: string; color: string }[] = [
  { value: 'blue', label: 'Blue', color: '#1b84ff' },
  { value: 'aqua', label: 'Aqua', color: '#0074ba' },
  { value: 'purple', label: 'Purple', color: '#763ebd' },
  { value: 'green', label: 'Green', color: '#0a7ea4' },
  { value: 'cyan', label: 'Cyan', color: '#01c0c8' },
  { value: 'orange', label: 'Orange', color: '#fa896b' },
  { value: 'pink', label: 'Pink', color: '#d200d2' },
  { value: 'rose', label: 'Rose', color: '#e80074' },
];

export interface AcpLayoutBranding {
  name?: string;
  logo?: string;
  /** @default '/' */
  link?: string;
}

export interface AcpLayoutConfig {
  /** Initial options, merged over `ACP_LAYOUT_DEFAULTS`; the stored options win over them. */
  defaults?: Partial<AcpLayoutOptions>;
  /** `localStorage` key of the options; `null` keeps them in memory. @default 'acp-layout' */
  storageKey?: string | null;
  /** Logo and name shown in the sidebar and, with a top or above header, in the header. */
  branding?: AcpLayoutBranding;
  /** Media query that turns the sidenav into an overlay. @default '(max-width: 599px)' */
  mobileQuery?: string;
  /** Fullscreen button in the header. @default true */
  fullscreenButton?: boolean;
}

export const ACP_LAYOUT_CONFIG = new InjectionToken<AcpLayoutConfig>('ACP_LAYOUT_CONFIG', {
  factory: () => ({}),
});
