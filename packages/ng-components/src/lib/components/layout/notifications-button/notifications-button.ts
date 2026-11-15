import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, type Params } from '@angular/router';

export type AcpNotificationTone = 'primary' | 'success' | 'warning' | 'error';

export interface AcpNotificationItem {
  icon: string;
  /** Color of the icon tile. @default 'primary' */
  tone?: AcpNotificationTone;
  title: string;
  text?: string;
  /** Internal route; external links use `href` (opened in a new tab). */
  route?: string;
  queryParams?: Params;
  href?: string;
}

export interface AcpNotificationsLabels {
  title: string;
  /** Summary under the title for `count` notifications. */
  summary: (count: number) => string;
}

export const ACP_NOTIFICATIONS_LABELS: AcpNotificationsLabels = {
  title: 'Notificaciones',
  summary: count =>
    count === 0
      ? 'No tienes notificaciones'
      : count === 1
        ? 'Tienes 1 notificación'
        : `Tienes ${count} notificaciones`,
};

/** Header bell with a pulsing dot and a dropdown of notices (MaterialPro notifications). */
@Component({
  selector: 'acp-notifications-button',
  template: `
    <button
      type="button"
      matIconButton
      class="acp-notifications-button"
      [attr.aria-label]="text().title + ': ' + text().summary(items().length)"
      [matMenuTriggerFor]="menu"
    >
      <mat-icon>{{ icon() }}</mat-icon>
      @if (items().length) {
        <span class="acp-notify" aria-hidden="true">
          <span class="acp-notify__ring"></span>
          <span class="acp-notify__point"></span>
        </span>
      }
    </button>

    <mat-menu #menu="matMenu" xPosition="before" class="acp-notifications-menu">
      <div class="acp-notifications-menu__header">
        <h6 class="acp-notifications-menu__heading">{{ text().title }}</h6>
        <p class="acp-notifications-menu__summary">{{ text().summary(items().length) }}</p>
      </div>

      @for (item of items(); track $index) {
        @if (item.href) {
          <a
            mat-menu-item
            class="acp-notifications-menu__item"
            target="_blank"
            rel="noopener"
            [href]="item.href"
          >
            <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ item }" />
          </a>
        } @else {
          <a
            mat-menu-item
            class="acp-notifications-menu__item"
            [routerLink]="item.route"
            [queryParams]="item.queryParams"
          >
            <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ item }" />
          </a>
        }
      }

      @if (footerLabel()) {
        <div class="acp-notifications-menu__footer">
          <a mat-flat-button [routerLink]="footerRoute()">{{ footerLabel() }}</a>
        </div>
      }
    </mat-menu>

    <ng-template #content let-item="item">
      <span
        class="acp-notifications-menu__icon acp-notifications-menu__icon--{{
          item.tone ?? 'primary'
        }}"
      >
        <mat-icon>{{ item.icon }}</mat-icon>
      </span>
      <span class="acp-notifications-menu__text">
        <span class="acp-notifications-menu__title">{{ item.title }}</span>
        @if (item.text) {
          <span class="acp-notifications-menu__subtitle">{{ item.text }}</span>
        }
      </span>
    </ng-template>
  `,
  styleUrl: './notifications-button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
})
export class AcpNotificationsButton {
  /** Notices, most urgent first. The dot shows while there is at least one. */
  readonly items = input<AcpNotificationItem[]>([]);
  readonly icon = input('notifications');
  /** Text of the footer link; without it the footer is hidden. */
  readonly footerLabel = input<string>();
  readonly footerRoute = input<string>('/');
  /** Texts of the dropdown; Spanish by default. */
  readonly labels = input<Partial<AcpNotificationsLabels>>({});

  protected readonly text = computed(() => ({ ...ACP_NOTIFICATIONS_LABELS, ...this.labels() }));
}
