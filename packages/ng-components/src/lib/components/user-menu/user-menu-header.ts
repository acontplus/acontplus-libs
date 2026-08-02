import { Component, input, ViewEncapsulation } from '@angular/core';
import type { UserProfile } from './user-menu.types';

@Component({
  selector: 'acp-user-menu-header',
  templateUrl: './user-menu-header.html',
  styleUrl: './user-menu-header.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'acp-user-menu-header',
  },
})
export class UserMenuHeaderComponent {
  /**
   * User profile information to display.
   */
  readonly user = input.required<UserProfile>();
}
