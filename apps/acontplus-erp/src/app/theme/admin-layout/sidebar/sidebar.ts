import { Component, input, output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AcpSidebar,
  AcpSidebarHeader,
  AcpSidebarBranding,
  AcpSidebarContent,
  SidemenuComponent,
  AcpSidebarToggle,
  AcpSidebarUserPanel,
} from '@acontplus/ng-components';
import { SettingsService, AuthService, MenuService } from '@core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    AcpSidebar,
    AcpSidebarHeader,
    AcpSidebarBranding,
    AcpSidebarUserPanel,
    AcpSidebarContent,
    SidemenuComponent,
    AcpSidebarToggle,
  ],
})
export class Sidebar {
  private readonly router = inject(Router);
  private readonly settings = inject(SettingsService);
  private readonly auth = inject(AuthService);
  private readonly menuService = inject(MenuService);

  /**
   * Whether to show the toggle button.
   */
  readonly showToggle = input(true);

  /**
   * Whether to show the user panel.
   */
  readonly showUser = input(true);

  /**
   * Whether to show the header.
   */
  readonly showHeader = input(true);

  /**
   * Whether the sidebar is collapsed.
   */
  readonly toggleChecked = input(false);

  /**
   * Whether the sidebar is in over mode (mobile).
   */
  readonly isOver = input(false);

  /**
   * Event emitted when sidebar toggle is requested.
   */
  readonly toggleCollapsed = output<void>();

  /**
   * Event emitted when sidenav close is requested.
   */
  readonly closeSidenav = output<void>();

  // Internal data from services
  readonly options = this.settings.options;
  readonly brandingLogo = 'images/acontplus.png';
  readonly brandingName = 'ACONTPLUS';
  readonly sidenavCollapsed = this.options().sidenavCollapsed;
  readonly showUserPanel = this.options().showUserPanel;
  readonly headerPos = this.options().headerPos;

  readonly userAvatar = '';
  readonly userName = this.auth.user?.name || '';
  readonly userEmail = 'user@example.com';

  readonly menuItems = toSignal(this.menuService.getAll(), { initialValue: [] });

  brandingClick() {
    this.router.navigate(['/']);
  }
}
