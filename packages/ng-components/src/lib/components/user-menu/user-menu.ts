import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserMenuHeaderComponent } from './user-menu-header';
import { UserMenuItemComponent } from './user-menu-item';
import type { UserProfile, UserMenuItem } from './user-menu.types';

@Component({
  selector: 'acp-user-menu',
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    UserMenuHeaderComponent,
    UserMenuItemComponent,
  ],
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
}
