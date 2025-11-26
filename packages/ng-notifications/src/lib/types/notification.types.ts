import type { BaseNotificationConfig } from '@acontplus/ui-kit';

// Angular-specific notification types

export interface NotificationCallProps extends BaseNotificationConfig {
  readonly config?: unknown;
}

export interface SweetAlertConfig extends BaseNotificationConfig {
  readonly html?: string;
  readonly confirmButtonText?: string;
  readonly cancelButtonText?: string;
  readonly showCancelButton?: boolean;
  readonly allowOutsideClick?: boolean;
  readonly customClass?: string;
}
