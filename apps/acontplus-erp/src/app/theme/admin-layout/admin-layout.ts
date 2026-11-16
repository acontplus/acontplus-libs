import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import {
  AcpAppsButton,
  AcpCustomizer,
  AcpLayout,
  ThemeToggle,
  AcpNotificationsButton,
  AcpUserPanel,
  AcpUserMenu,
  type AcpAppShortcut,
  type AcpNotificationItem,
  type AcpUserMenuItem,
  type AcpUserMenuUser,
} from '@acontplus/ng-components';

import { AuthService, MenuService, type User } from '@core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    NgProgressbar,
    NgProgressRouter,
    AcpLayout,
    ThemeToggle,
    AcpCustomizer,
    AcpAppsButton,
    AcpNotificationsButton,
    AcpUserPanel,
    AcpUserMenu,
  ],
})
export class AdminLayout {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  readonly menu = toSignal(inject(MenuService).getAll(), { initialValue: [] });

  private readonly user = toSignal(this.auth.user(), { initialValue: {} as User });
  readonly userProfile = computed<AcpUserMenuUser>(() => ({
    name: this.user().name ?? '',
    subtitle: this.user().email,
    avatar: this.user().avatar ?? '/images/profile/user-1.jpg',
  }));

  readonly userMenuItems: AcpUserMenuItem[] = [
    { id: 'profile', label: 'Profile', icon: 'person', route: '/profile/overview' },
    { id: 'settings', label: 'Settings', icon: 'settings', route: '/settings' },
    { id: 'logout', label: 'Logout', icon: 'logout', danger: true },
  ];

  onUserMenu(item: AcpUserMenuItem): void {
    if (item.id === 'logout') {
      this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
    }
  }

  readonly apps: AcpAppShortcut[] = [
    {
      title: 'Tables',
      subtitle: 'Data grid examples',
      icon: 'table_chart',
      route: '/tables',
    },
    {
      title: 'Material',
      subtitle: 'Component examples',
      icon: 'widgets',
      color: '#fa896b',
      route: '/material',
    },
  ];

  readonly notifications: AcpNotificationItem[] = [
    {
      icon: 'event_busy',
      tone: 'warning',
      title: 'Subscription',
      text: 'Your plan expires in 5 days',
      route: '/tables',
    },
    { icon: 'new_releases', title: 'Releases', text: '2 unread releases', route: '/tables' },
  ];
}
