/**
 * Represents a single item in the user menu.
 */
export interface UserMenuItem {
  /**
   * Unique identifier for the menu item.
   */
  id: string;

  /**
   * Display label for the menu item.
   */
  label: string;

  /**
   * Material Design icon name.
   */
  icon: string;

  /**
   * Optional badge number (e.g., notification count).
   */
  badge?: number;

  /**
   * Optional router link for navigation.
   */
  routerLink?: string;

  /**
   * Whether this item represents a dangerous action (e.g., logout).
   * Affects styling (red color).
   */
  danger?: boolean;

  /**
   * Optional click handler for custom actions.
   */
  click?: (event: MouseEvent, item: UserMenuItem) => void;
}

/**
 * User profile information displayed in the menu header.
 */
export interface UserProfile {
  /**
   * User's full name.
   */
  name: string;

  /**
   * User's email address.
   */
  email: string;

  /**
   * URL to user's avatar image.
   */
  avatar: string;

  /**
   * User's plan/subscription tier (e.g., 'Pro', 'Free').
   */
  plan?: string;
}

/**
 * Event emitted when a menu item is selected.
 */
export interface UserMenuSelectedEvent {
  /**
   * The selected menu item.
   */
  item: UserMenuItem;
}
