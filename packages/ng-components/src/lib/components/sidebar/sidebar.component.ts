import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Branding } from '../branding';
import { SidemenuComponent, MenuItem } from '../sidemenu';
import { UserPanel } from '../user-panel';

@Component({
  selector: 'acp-sidebar',
  template: `
    @if (showHeader()) {
      <div class="acp-sidebar-header">
        <mat-toolbar>
          <acp-branding
            [logo]="brandingLogo()"
            [name]="brandingName()"
            [showName]="!toggleChecked()"
            (brandingClick)="brandingClick.emit()"
          />

          <span class="flex-fill"></span>

          @if (showToggle()) {
            <mat-slide-toggle
              hideIcon
              [checked]="toggleChecked()"
              (change)="toggleCollapsed.emit()"
            />
          } @else {
            <button mat-icon-button (click)="closeSidenav.emit()">
              <mat-icon>close</mat-icon>
            </button>
          }
        </mat-toolbar>
      </div>
    }

    <div class="acp-sidebar-main">
      @if (showUser()) {
        <acp-user-panel
          [avatar]="userAvatar()"
          [name]="userName()"
          [email]="userEmail()"
          [profileLink]="userProfileLink()"
        />
      }
      <acp-sidemenu [menuItems]="menuItems()" />
    </div>
  `,
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    Branding,
    SidemenuComponent,
    UserPanel,
  ],
})
export class Sidebar {
  // Visibility controls
  readonly showToggle = input(true);
  readonly showUser = input(true);
  readonly showHeader = input(true);
  readonly toggleChecked = input(false);

  // Events
  readonly toggleCollapsed = output<void>();
  readonly closeSidenav = output<void>();
  readonly brandingClick = output<void>();

  // Branding data
  readonly brandingLogo = input('images/acontplus.png');
  readonly brandingName = input('ACONTPLUS');

  // User panel data
  readonly userAvatar = input<string | null>(null);
  readonly userName = input('');
  readonly userEmail = input('');
  readonly userProfileLink = input('/profile/overview');

  // Sidemenu data
  readonly menuItems = input<MenuItem[]>([]);
}
