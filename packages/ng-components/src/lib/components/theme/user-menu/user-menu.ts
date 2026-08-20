import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AcpButton } from '../../button/v2';
import type { UserProfile, UserMenuItem } from './user-menu.types';

@Component({
  selector: 'acp-user-menu',
  template: `
    <button
      mat-icon-button
      class="acp-user-menu__trigger"
      [matMenuTriggerFor]="menu"
      aria-label="User menu"
    >
      @if (user().avatar) {
        <img [src]="imageUrl()" width="32" [alt]="" class="acp-user-menu__avatar" />
      } @else {
        <mat-icon>account_circle</mat-icon>
      }
    </button>

    <mat-menu #menu="matMenu" class="acp-user-menu-panel" panelClass="user-menu-panel">
      <div class="acp-user-menu__content">
        <div class="acp-user-menu-header__content">
          <div class="acp-user-menu-header__avatar">
            <img [src]="imageUrl()" [alt]="" class="acp-user-menu-header__avatar-img" />
          </div>
          <div class="acp-user-menu-header__info">
            <div class="acp-user-menu-header__name-row">
              <h3 class="acp-user-menu-header__name">{{ user().name }}</h3>
              @if (user().plan) {
                <span class="acp-user-menu-header__badge">{{ user().plan }}</span>
              }
            </div>
            <p class="acp-user-menu-header__email">{{ user().email }}</p>
          </div>
        </div>

        <div class="acp-user-menu-header__divider"></div>

        <div class="acp-user-menu__items">
          @for (item of items(); track item.id) {
            @if (item.routerLink) {
              <a
                [routerLink]="item.routerLink"
                class="acp-user-menu-item__link"
                [class.acp-user-menu-item__link--danger]="item.danger"
                (click)="item.click?.($event, item)"
              >
                <mat-icon class="acp-user-menu-item__icon">{{ item.icon }}</mat-icon>
                <span class="acp-user-menu-item__label">{{ item.label }}</span>
                @if (item.badge) {
                  <span class="acp-user-menu-item__badge">{{ item.badge }}</span>
                }
              </a>
            } @else {
              <acp-button
                appearance="text"
                [color]="item.danger ? 'error' : 'primary'"
                (click)="item.click?.($event, item)"
                [block]="true"
                [icon]="item.icon"
                [text]="item.label"
              >
                @if (item.badge) {
                  <span class="acp-user-menu-item__badge">{{ item.badge }}</span>
                }
              </acp-button>
            }
          }
        </div>
      </div>
    </mat-menu>
  `,
  styleUrl: './user-menu.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, AcpButton],
  host: {
    class: 'acp-user-menu',
  },
})
export class UserMenu {
  /**
   * User profile information to display in the menu header.
   */
  readonly user = input.required<UserProfile>();

  /**
   * Menu items to display.
   */
  readonly items = input.required<UserMenuItem[]>();

  imageUrl = computed(() => {
    const avatar = this.user().avatar;
    if (!avatar) return '/images/profile/user-1.jpg';
    return avatar;
  });
}
