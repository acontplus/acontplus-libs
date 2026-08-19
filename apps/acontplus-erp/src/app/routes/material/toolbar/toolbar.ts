import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AcpHeader,
  AcpHeaderStart,
  AcpHeaderBranding,
  AcpHeaderCenter,
  AcpHeaderEnd,
  AcpHeaderBrandingContent,
  AcpHeaderSearch,
  AcpHeaderBreadcrumb,
  type AcpBreadcrumbItem,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    AcpHeader,
    AcpHeaderStart,
    AcpHeaderBranding,
    AcpHeaderCenter,
    AcpHeaderEnd,
    AcpHeaderBrandingContent,
    AcpHeaderSearch,
    AcpHeaderBreadcrumb,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  title = 'Toolbar';

  // Basic toolbar example
  basicToolbarTitle = 'My Application';

  // Toolbar with actions
  toolbarActions = [
    { icon: 'search', tooltip: 'Search' },
    { icon: 'notifications', tooltip: 'Notifications' },
    { icon: 'account_circle', tooltip: 'Account' },
  ];

  // Toolbar with menu
  menuItems = [
    { label: 'Settings', icon: 'settings' },
    { label: 'Help', icon: 'help' },
    { label: 'Logout', icon: 'logout' },
  ];

  // Toolbar with spacer
  leftActions = [{ icon: 'menu', tooltip: 'Menu' }];

  rightActions = [
    { icon: 'search', tooltip: 'Search' },
    { icon: 'more_vert', tooltip: 'More' },
  ];

  // Event handlers
  onActionClick(action: any) {
    console.log('Action clicked:', action);
  }

  onMenuClick(action: string) {
    console.log('Menu item clicked:', action);
  }

  onSearch(query: string) {
    console.log('Search:', query);
  }

  // Breadcrumb items
  breadcrumbItems: AcpBreadcrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Analytics', link: '/dashboard/analytics' },
  ];

  userMenuItems: any[] = [
    { icon: 'account_circle', label: 'Profile', routerLink: '/profile' },
    { icon: 'settings', label: 'Settings', routerLink: '/settings' },
    { icon: 'exit_to_app', label: 'Logout', routerLink: '/logout' },
  ];
}
