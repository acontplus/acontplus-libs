import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { NotificationProviderBase } from './notification-provider';
import { SNACKBAR_CONFIG, SnackbarConfig } from '../config/snackbar-config';
import type { NotificationResult } from '@acontplus/ui-kit';
import { NotificationCallProps, SweetAlertConfig } from '../types/notification.types';
import { SnackbarProps } from '../models/notification';
import {
  SnackbarTemplateComponent,
  SnackbarTemplateData,
} from '../components/snackbar-template/snackbar-template.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarProvider extends NotificationProviderBase {
  private readonly snackBar = inject(MatSnackBar);
  private readonly config = inject(SNACKBAR_CONFIG);

  /**
   * Display a snackbar with specific type and configuration
   */
  show(props: SnackbarProps): void {
    const {
      type,
      message,
      title,
      action = this.config.defaultAction,
      config: userConfig = {},
    } = props;

    const typeClass = `acontplus-snackbar-${type}`;
    const panelClasses = this.buildPanelClasses(typeClass, userConfig.panelClass);

    // Build accessibility announcement message
    const announcementMessage = this.buildAnnouncementMessage(type, message, title);

    const finalConfig = {
      ...this.config,
      ...userConfig,
      panelClass: panelClasses,
      announcementMessage,
      // Set appropriate politeness based on type
      politeness: this.getPolitenessLevel(type),
    };

    let snackBarRef: MatSnackBarRef<any>;

    // Determine if we should use the custom component
    // Always use custom component to maintain title/message structure and other features
    const useCustomComponent =
      title || // Always use custom component if there's a title
      userConfig.showCloseIcon === true ||
      this.config.showCloseIcon !== false ||
      userConfig.progressBarEnabled === true ||
      this.config.progressBarEnabled !== false;

    if (useCustomComponent) {
      const snackbarData: SnackbarTemplateData = {
        message,
        title,
        type,
        action,
        showIcon: userConfig.iconEnabled ?? this.config.iconEnabled,
        showCloseIcon: userConfig.showCloseIcon ?? this.config.showCloseIcon,
        showProgressBar: userConfig.progressBarEnabled ?? this.config.progressBarEnabled,
        duration: finalConfig.duration || 0,
      };

      snackBarRef = this.snackBar.openFromComponent(SnackbarTemplateComponent, {
        ...finalConfig,
        data: snackbarData,
      });
    } else {
      // Fallback to simple text snackbar
      const displayMessage = this.buildMessage(message, title);
      snackBarRef = this.snackBar.open(displayMessage, action, finalConfig);
    }

    // Handle action clicks if needed
    if (action && snackBarRef) {
      snackBarRef.onAction().subscribe(() => {
        // Action was clicked - can be extended for custom behavior
        snackBarRef.dismiss();
      });
    }
  }

  success(props: NotificationCallProps): void {
    this.show({
      type: 'success',
      message: props.message,
      title: props.title,
      config: props.config as Partial<SnackbarConfig>,
    });
  }

  error(props: NotificationCallProps): void {
    this.show({
      type: 'error',
      message: props.message,
      title: props.title,
      config: props.config as Partial<SnackbarConfig>,
    });
  }

  warning(props: NotificationCallProps): void {
    this.show({
      type: 'warning',
      message: props.message,
      title: props.title,
      config: props.config as Partial<SnackbarConfig>,
    });
  }

  info(props: NotificationCallProps): void {
    this.show({
      type: 'info',
      message: props.message,
      title: props.title,
      config: props.config as Partial<SnackbarConfig>,
    });
  }

  confirm(config: SweetAlertConfig): Observable<NotificationResult> {
    const result = confirm(`${config.title || ''}\n${config.message}`);
    return of({ isConfirmed: result });
  }

  private buildPanelClasses(typeClass: string, userClasses?: string | string[]): string[] {
    const classes = ['acontplus-snackbar', typeClass];

    if (userClasses) {
      const normalizedClasses = Array.isArray(userClasses) ? userClasses : [userClasses];
      classes.push(...normalizedClasses);
    }

    return classes;
  }

  private buildMessage(message: string, title?: string): string {
    if (!this.config.titleEnabled || !title) {
      return message;
    }
    return `${title}: ${message}`;
  }

  /**
   * Build accessibility announcement message based on type and content
   */
  private buildAnnouncementMessage(type: string, message: string, title?: string): string {
    const typeLabel = this.getTypeLabel(type);
    const fullMessage = title ? `${title}: ${message}` : message;
    return `${typeLabel}. ${fullMessage}`;
  }

  /**
   * Get appropriate ARIA politeness level based on notification type
   */
  private getPolitenessLevel(type: string): 'off' | 'polite' | 'assertive' {
    switch (type) {
      case 'error':
        return 'assertive'; // Errors should interrupt
      case 'warning':
        return 'assertive'; // Warnings should interrupt
      case 'success':
      case 'info':
      default:
        return 'polite'; // Success and info can wait
    }
  }

  /**
   * Get human-readable type label for accessibility
   */
  private getTypeLabel(type: string): string {
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return 'Notification';
    }
  }
}
