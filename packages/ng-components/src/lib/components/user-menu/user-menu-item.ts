import { Component, input,   ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AcpButton } from '../button/v2';
import type { UserMenuItem } from './user-menu.types';

@Component({
  selector: 'acp-user-menu-item',
  templateUrl: './user-menu-item.html',
  styleUrl: './user-menu-item.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterModule, MatIconModule, AcpButton],
  host: {
    class: 'acp-user-menu-item',
    role: 'menuitem',
    '[attr.aria-label]': 'item().label',
  },
})
export class UserMenuItemComponent {
  /**
   * The menu item data.
   */
  readonly item = input.required<UserMenuItem>();
 
}
