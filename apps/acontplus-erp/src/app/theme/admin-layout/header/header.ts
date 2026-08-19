import { Component, input, output, inject, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  AcpHeader,
  AcpHeaderStart,
  AcpHeaderBranding,
  AcpHeaderCenter,
  AcpHeaderEnd,
  AcpHeaderActions,
  UserMenu,
  type AcpHeaderAction,
  type UserMenuItem,
  type UserProfile,
  AcpHeaderTheme,
} from '@acontplus/ng-components';
import { SettingsService, AuthService } from '@core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    AcpHeader,
    AcpHeaderStart,
    AcpHeaderBranding,
    AcpHeaderCenter,
    AcpHeaderEnd,
    AcpHeaderActions,
    UserMenu,
    AcpHeaderTheme,
  ],
})
export class Header {
  private readonly router = inject(Router);
  readonly settings = inject(SettingsService);
  private readonly auth = inject(AuthService);
  readonly showToggle = input(true);
  /**
   * Whether to show branding in the header.
   * @default true
   */
  readonly showBranding = input(true);

  /**
   * Event emitted when sidenav toggle is requested.
   */
  readonly toggleSidenav = output<void>();

  /**
   * Event emitted when sidenav notice toggle is requested.
   */
  readonly toggleSidenavNotice = output<void>();

  // Internal data from services
  readonly options = this.settings.options;
  readonly brandingLogo = 'images/acontplus.png';
  readonly brandingName = 'ACONTPLUS';
  readonly homeLink = '/';

  readonly userProfile: UserProfile = {
    name: 'Markarn Doe',
    email: 'markrarn@wrappixel.com',
    avatar: '/images/profile/user-1.jpg',
    plan: 'Pro',
  };

  readonly leftActions = computed<AcpHeaderAction[]>(() => [
    {
      id: 'toggle-sidenav',
      icon: 'menu',
      tooltip: 'Toggle Sidebar',
      visible: this.showToggle(),
      click: () => {
        this.toggleSidenav.emit();
      },
    },
  ]);

  readonly rightActions: AcpHeaderAction[] = [
    {
      id: 'notifications',
      icon: 'notifications',
      tooltip: 'Notifications',
      click: () => {
        this.toggleSidenavNotice.emit();
      },
    },
  ];

  readonly userMenuItems: UserMenuItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person',
      click: (_item) => {
        this.router.navigate(['/profile/overview']);
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      click: (_item) => {
        this.router.navigate(['/settings']);
      },
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'logout',
      danger: true,
      click: (_item) => {
        this.auth.logout().subscribe(() => {
          this.router.navigateByUrl('/auth/login');
        });
      },
    },
  ];

  onBranding() {
    this.router.navigate(['/']);
  }

  themeChange(theme: 'light' | 'dark' | 'auto') {
    this.settings.setTheme(theme);
  }
}
