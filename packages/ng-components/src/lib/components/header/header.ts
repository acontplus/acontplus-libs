import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import screenfull from 'screenfull';

import { Branding } from '../branding';
import { UserMenu } from '../user-menu';

@Component({
  selector: 'acp-header',
  template: `
    <mat-toolbar>
      @if (showToggle()) {
        <button matIconButton (click)="toggleSidenav.emit()">
          <mat-icon>menu</mat-icon>
        </button>
      }

      @if (showBranding()) {
        <ng-content select="[slot-branding]" />
        @if (!hasBrandingSlot()) {
          <acp-branding
            [logo]="brandingLogo()"
            [name]="brandingName()"
            [showName]="showBrandingName()"
            [link]="brandingLink()"
          />
        }
      }

      <span class="flex-fill"></span>

      @if (showSearch()) {
        <button matIconButton (click)="searchClick.emit()">
          <mat-icon>search</mat-icon>
        </button>
      }

      @if (showFullscreen()) {
        <button matIconButton class="hide-small" (click)="toggleFullscreen()">
          <mat-icon>fullscreen</mat-icon>
        </button>
      }

      @if (showUserMenu()) {
        <ng-content select="[slot-user-menu]" />
        @if (!hasUserMenuSlot()) {
          <acp-user-menu
            [avatar]="userAvatar()"
            [menuItems]="userMenuItems()"
            (menuItemClick)="userMenuItemClick.emit($event)"
          />
        }
      }

      @if (showNoticeToggle()) {
        <button matIconButton class="hide-small" (click)="toggleSidenavNotice.emit()">
          <mat-icon>list</mat-icon>
        </button>
      }

      <ng-content select="[slot-right]" />
    </mat-toolbar>
  `,
  styleUrl: './header.scss',
  host: {
    class: 'acp-acontplus-header',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,

  imports: [MatToolbarModule, MatButtonModule, MatIconModule, Branding, UserMenu],
})
export class Header {
  readonly showToggle = input(true);
  readonly showBranding = input(true);
  readonly showSearch = input(true);
  readonly showFullscreen = input(true);
  readonly showUserMenu = input(true);
  readonly showNoticeToggle = input(true);

  readonly brandingLogo = input<string | null>(null);
  readonly brandingName = input<string | null>(null);
  readonly showBrandingName = input(true);
  readonly brandingLink = input('/');

  readonly userAvatar = input<string | null>(null);
  readonly userMenuItems = input<any[]>([]);

  readonly toggleSidenav = output<void>();
  readonly toggleSidenavNotice = output<void>();
  readonly searchClick = output<void>();
  readonly userMenuItemClick = output<string>();

  hasBrandingSlot(): boolean {
    return false; // This would need ng-content projection check
  }

  hasUserMenuSlot(): boolean {
    return false; // This would need ng-content projection check
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
