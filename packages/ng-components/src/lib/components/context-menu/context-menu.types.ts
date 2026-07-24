/**
 * Context Menu Types and Interfaces
 * Defines the API contract for the ContextMenu component
 */

/**
 * Represents a single item in the context menu
 */
export interface AcpContextMenuItem {
  /** Unique identifier for the menu item */
  id?: string;

  /** Display label for the menu item (not required for separators) */
  label?: string;

  /** Material Icon name or SVG icon identifier */
  icon?: string;

  /** Badge text or number to display */
  badge?: string | number;

  /** Keyboard shortcut text to display (e.g., 'Ctrl+S') */
  shortcut?: string;

  /** Whether the menu item is disabled */
  disabled?: boolean;

  /** Whether the menu item is visible */
  visible?: boolean;

  /** Whether this is a separator line (ignores other properties) */
  separator?: boolean;

  /** Nested menu items for submenu support */
  children?: AcpContextMenuItem[];

  /** Callback function when item is clicked */
  command?: (context: AcpContextMenuItemContext) => void;

  /** Router link for navigation */
  routerLink?: any;

  /** External URL to navigate to */
  url?: string;

  /** Target for URL navigation (_blank, _self, etc) */
  target?: string;

  /** Whether this is a dangerous action (e.g., delete) */
  danger?: boolean;

  /** Whether the item is in loading state */
  loading?: boolean;

  /** Tooltip text for the menu item */
  tooltip?: string;

  /** Custom data associated with the menu item */
  data?: unknown;

  /** CSS class to apply to the menu item */
  class?: string;

  /** Whether to close menu after executing command */
  closeOnClick?: boolean;
}

/**
 * Context passed to the command callback
 */
export interface AcpContextMenuItemContext {
  /** The menu item that was clicked */
  item: AcpContextMenuItem;

  /** The event that triggered the action */
  event: MouseEvent | KeyboardEvent;

  /** The element that triggered the context menu */
  element?: HTMLElement;

  /** Custom data passed to the context menu */
  data?: unknown;

  /** Row data (for DataGrid integration) */
  row?: unknown;

  /** Column data (for DataGrid integration) */
  column?: unknown;

  /** Row index (for DataGrid integration) */
  index?: number;
}

/**
 * Configuration for opening a context menu
 */
export interface AcpContextMenuOpenConfig {
  /** X coordinate for menu position */
  x: number;

  /** Y coordinate for menu position */
  y: number;

  /** Element to position relative to (if not using x/y) */
  element?: HTMLElement;

  /** Custom data to pass to menu items */
  data?: unknown;

  /** Close menu when clicking outside */
  closeOnOutsideClick?: boolean;

  /** Close menu when pressing Escape */
  closeOnEscape?: boolean;

  /** Custom CSS classes for the menu panel */
  panelClass?: string | string[];

  /** Z-index for the menu overlay */
  zIndex?: number;
}

/**
 * Configuration for the context menu trigger
 */
export interface AcpContextMenuTriggerConfig {
  /** Trigger on right-click (contextmenu event) */
  rightClick?: boolean;

  /** Trigger on left-click */
  leftClick?: boolean;

  /** Trigger on hover */
  hover?: boolean;

  /** Delay before opening on hover (ms) */
  hoverDelay?: number;

  /** Delay before closing on hover leave (ms) */
  hoverLeaveDelay?: number;

  /** Custom data to pass to menu items */
  data?: unknown;

  /** Close menu when clicking outside */
  closeOnOutsideClick?: boolean;

  /** Close menu when pressing Escape */
  closeOnEscape?: boolean;
}

/**
 * Position strategy for the context menu
 */
export type AcpContextMenuPosition = 'auto' | 'above' | 'below' | 'left' | 'right';

/**
 * Reference to an open context menu
 */
export interface AcpContextMenuRef {
  /** Close the context menu */
  close(): void;

  /** Update menu items */
  updateItems(items: AcpContextMenuItem[]): void;

  /** Get current menu items */
  getItems(): AcpContextMenuItem[];

  /** Update context data */
  updateData(data: unknown): void;

  /** Get current context data */
  getData(): unknown;

  /** Check if menu is open */
  isOpen(): boolean;
}
