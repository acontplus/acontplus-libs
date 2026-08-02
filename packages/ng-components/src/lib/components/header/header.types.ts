/**
 * AcpHeader Component Types
 *
 * Type definitions for the AcpHeader component following SOLID principles
 * and Clean Architecture for enterprise-grade component libraries.
 */

/**
 * Main configuration object for the AcpHeader component.
 * All configuration is centralized in this single interface to follow
 * Interface Segregation Principle and keep the API small and scalable.
 */
export interface AcpHeaderConfig {
  /**
   * Array of actions to display in the header.
   * Actions are rendered in their specified position (left or right).
   */
  actions?: AcpHeaderAction[];

  /**
   * Branding configuration for the header.
   * If not provided, no branding is displayed.
   */
  branding?: AcpHeaderBrandingConfig;

  /**
   * User menu configuration.
   * If not provided, no user menu is displayed.
   */
  userMenu?: AcpHeaderUserMenuConfig;

  /**
   * Whether to show elevation/shadow on the header.
   * @default false
   */
  elevation?: boolean;

  /**
   * Whether the header should stick to the top of the viewport.
   * @default false
   */
  sticky?: boolean;

  /**
   * Theme variant for the header.
   * @default 'auto'
   */
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Represents an action button in the header.
 * Actions can be placed in the left or right region of the header.
 */
export interface AcpHeaderAction {
  /**
   * Unique identifier for the action.
   * Used in event emissions to identify which action was clicked.
   */
  id: string;

  /**
   * Material Design icon name to display.
   * If not provided, the label is used instead.
   */
  icon?: string;

  /**
   * Text label for the action.
   * Used when icon is not provided or for accessibility.
   */
  label?: string;

  /**
   * Tooltip text to display on hover.
   */
  tooltip?: string;

  /**
   * Position where the action should be rendered.
   * @default 'right'
   */
  position?: 'left' | 'right';

  /**
   * Whether the action is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the action is visible.
   * @default true
   */
  visible?: boolean;

  /**
   * Optional badge to display on the action button.
   * Can be a number (for notification count) or a string.
   */
  badge?: number | string;
 

  click?: ( $event?: MouseEvent, action?: AcpHeaderAction ) => void;
}

/**
 * Configuration for the branding section of the header.
 */
export interface AcpHeaderBrandingConfig {
  /**
   * URL or path to the logo image.
   */
  logo?: string;

  /**
   * Brand name to display.
   */
  name?: string;

  /**
   * Whether to show the brand name.
   * @default true
   */
  showName?: boolean;

  /**
   * URL to navigate to when branding is clicked.
   * @default '/'
   */
  link?: string;
}

/**
 * Configuration for the user menu section of the header.
 */
export interface AcpHeaderUserMenuConfig {
  /**
   * URL or path to the user avatar image.
   */
  avatar?: string;

  /**
   * User's display name.
   */
  name?: string;

  /**
   * User's email address.
   */
  email?: string;

  /**
   * Menu items to display in the user menu dropdown.
   */
  items?: AcpHeaderUserMenuItem[];
}

/**
 * Represents a single item in the user menu.
 */
export interface AcpHeaderUserMenuItem {
  /**
   * Unique identifier for the menu item.
   */
  id: string;

  /**
   * Display label for the menu item.
   */
  label: string;

  /**
   * Material Design icon name to display.
   */
  icon?: string;

  /**
   * Whether the menu item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to display a divider below this item.
   * @default false
   */
  divider?: boolean;

  /**
   * Callback function to execute when the item is clicked.
   * If provided, the item click event is not emitted.
   */
  action?: () => void;
}

/**
 * Event payload emitted when a header action is clicked.
 */
export interface AcpHeaderActionEvent {
  /**
   * The ID of the action that was clicked.
   */
  actionId: string;

  /**
   * The event name associated with the action.
   */
  event: string;

  /**
   * Optional data associated with the action.
   */
  data?: any;
}

/**
 * Event payload emitted when a user menu item is clicked.
 */
export interface AcpHeaderUserMenuItemEvent {
  /**
   * The ID of the menu item that was clicked.
   */
  itemId: string;

  /**
   * The menu item that was clicked.
   */
  item: AcpHeaderUserMenuItem;
}
