import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

export interface AcpUserMenuUser {
  name: string;
  /** Second line, e.g. the username or email. */
  subtitle?: string;
  /** Third line, e.g. the company. */
  caption?: string;
  /** Chip next to the name. */
  role?: string;
  /** Image URL; without it the initials of `name` are shown. */
  avatar?: string;
}

export interface AcpUserMenuItem {
  id: string;
  label: string;
  icon?: string;
  /** Navigates to the route; items without route emit `selected`. */
  route?: string;
  danger?: boolean;
}

/** Header avatar with a profile dropdown (MaterialPro profile menu). */
@Component({
  selector: 'acp-user-menu',
  template: `
    <button
      type="button"
      matIconButton
      class="acp-user-menu__trigger"
      [attr.aria-label]="ariaLabel()"
      [matMenuTriggerFor]="menu"
    >
      <ng-container [ngTemplateOutlet]="avatarTpl" />
    </button>

    <mat-menu #menu="matMenu" xPosition="before" class="acp-user-menu-panel">
      <div class="acp-user-menu-panel__header">
        <ng-container [ngTemplateOutlet]="avatarTpl" />
        <div class="acp-user-menu-panel__info">
          <h6 class="acp-user-menu-panel__name">
            {{ user().name }}
            @if (user().role) {
              <span class="acp-user-menu-panel__role">{{ user().role }}</span>
            }
          </h6>
          @if (user().subtitle && user().subtitle !== user().name) {
            <span class="acp-user-menu-panel__muted">{{ user().subtitle }}</span>
          }
          @if (user().caption) {
            <span class="acp-user-menu-panel__muted acp-user-menu-panel__caption">{{
              user().caption
            }}</span>
          }
        </div>
      </div>

      <div class="acp-user-menu-panel__items">
        @for (item of items(); track item.id) {
          @if (item.route) {
            <a
              mat-menu-item
              [routerLink]="item.route"
              [class.acp-user-menu-panel__item--danger]="item.danger"
            >
              <ng-container [ngTemplateOutlet]="itemTpl" [ngTemplateOutletContext]="{ item }" />
            </a>
          } @else {
            <button
              type="button"
              mat-menu-item
              [class.acp-user-menu-panel__item--danger]="item.danger"
              (click)="selected.emit(item)"
            >
              <ng-container [ngTemplateOutlet]="itemTpl" [ngTemplateOutletContext]="{ item }" />
            </button>
          }
        }
      </div>
    </mat-menu>

    <ng-template #avatarTpl>
      @if (user().avatar) {
        <img class="acp-user-menu__avatar" [src]="user().avatar" alt="" />
      } @else {
        <span class="acp-user-menu__avatar" aria-hidden="true">{{ initials() }}</span>
      }
    </ng-template>

    <ng-template #itemTpl let-item="item">
      @if (item.icon) {
        <mat-icon>{{ item.icon }}</mat-icon>
      }
      {{ item.label }}
    </ng-template>
  `,
  styleUrl: './user-menu.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
})
export class AcpUserMenu {
  readonly user = input.required<AcpUserMenuUser>();
  readonly items = input<AcpUserMenuItem[]>([]);
  readonly ariaLabel = input('Perfil');

  /** Item without `route` that was clicked. */
  readonly selected = output<AcpUserMenuItem>();

  protected readonly initials = computed(() =>
    this.user()
      .name.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join(''),
  );
}
