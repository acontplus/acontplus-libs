import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

export interface UserMenuItem {
  icon: string;
  label: string;
  action: string;
  routerLink?: string;
}

@Component({
  selector: 'acp-user-menu',
  template: `
    <button matIconButton [matMenuTriggerFor]="menu">
      @if (avatar()) {
        <img class="avatar" [src]="avatar()" width="24" alt="avatar" />
      } @else {
        <mat-icon>account_circle</mat-icon>
      }
    </button>

    <mat-menu #menu="matMenu">
      @for (item of menuItems(); track item.action) {
        @if (item.routerLink) {
          <button
            [routerLink]="item.routerLink"
            mat-menu-item
            (click)="onMenuItemClick(item.action)"
          >
            <mat-icon>{{ item.icon }}</mat-icon>
            <span>{{ item.label }}</span>
          </button>
        } @else {
          <button mat-menu-item (click)="onMenuItemClick(item.action)">
            <mat-icon>{{ item.icon }}</mat-icon>
            <span>{{ item.label }}</span>
          </button>
        }
      }
    </mat-menu>
  `,
  styles: `
    .avatar {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
})
export class UserMenu {
  readonly avatar = input<string | null>(null);
  readonly menuItems = input<UserMenuItem[]>([
    { icon: 'account_circle', label: 'Profile', action: 'profile' },
    { icon: 'edit', label: 'Edit Profile', action: 'edit' },
    { icon: 'restore', label: 'Restore Defaults', action: 'restore' },
    { icon: 'exit_to_app', label: 'Logout', action: 'logout' },
  ]);

  readonly menuItemClick = output<string>();

  onMenuItemClick(action: string) {
    this.menuItemClick.emit(action);
  }
}
