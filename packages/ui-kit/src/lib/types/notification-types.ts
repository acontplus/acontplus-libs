/**
 * Framework-agnostic notification type definitions
 * These types can be used across any JavaScript framework
 */

/**
 * Types of notifications that can be displayed
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Position options for notification placement on screen
 */
export type NotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

/**
 * Available notification provider implementations
 */
export type NotificationProvider = 'toastr' | 'snackbar' | 'sweetalert';

/**
 * Base configuration for all notification types
 */
export interface BaseNotificationConfig {
  readonly message: string;
  readonly title?: string;
  readonly type?: NotificationType;
}

/**
 * Result returned from notification interactions (e.g., confirmation dialogs)
 */
export interface NotificationResult {
  isConfirmed?: boolean;
  isDenied?: boolean;
  isDismissed?: boolean;
  value?: unknown;
}
