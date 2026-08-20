import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Notification item interface
 */
export interface AcpNotificationItem {
  id: string;
  title: string;
  message?: string;
  timestamp?: Date;
  read?: boolean;
  icon?: string;
}

/**
 * AcpHeaderNotifications Component
 *
 * Notification center for the header with badge and dropdown menu.
 *
 * @example
 * ```html
 * <acp-header-notifications
 *   [notifications]="notifications"
 *   [unreadCount]="unreadCount"
 *   (notificationClick)="onNotificationClick($event)"
 * />
 * ```
 */
@Component({
  selector: 'acp-header-notifications',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" class="acp-header__notifications-button">
      <mat-icon>notifications</mat-icon>
      @if (unreadCount() > 0) {
        <span class="acp-header__notifications-badge">
          {{ unreadCount() > 99 ? '99+' : unreadCount() }}
        </span>
      }
    </button>

    <mat-menu #menu="matMenu" class="acp-header__notifications-menu">
      @if (notifications().length === 0) {
        <div class="acp-header__notifications-empty">
          <mat-icon>notifications_none</mat-icon>
          <span>No notifications</span>
        </div>
      } @else {
        @for (notification of notifications(); track notification.id) {
          <button
            mat-menu-item
            [class.acp-header__notification-item--unread]="!notification.read"
            (click)="handleNotificationClick(notification)"
          >
            @if (notification.icon) {
              <mat-icon class="acp-header__notification-icon">{{ notification.icon }}</mat-icon>
            }
            <div class="acp-header__notification-content">
              <span class="acp-header__notification-title">{{ notification.title }}</span>
              @if (notification.message) {
                <span class="acp-header__notification-message">{{ notification.message }}</span>
              }
            </div>
          </button>
        }
      }
    </mat-menu>
  `,
  host: { class: 'acp-header-notifications' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatBadgeModule, MatMenuModule],
})
export class AcpHeaderNotifications {
  /**
   * Array of notification items.
   */
  readonly notifications = input<AcpNotificationItem[]>([]);

  /**
   * Number of unread notifications.
   */
  readonly unreadCount = input(0);

  /**
   * Event emitted when a notification is clicked.
   */
  readonly notificationClick = output<AcpNotificationItem>();

  handleNotificationClick(notification: AcpNotificationItem) {
    this.notificationClick.emit(notification);
  }
}
