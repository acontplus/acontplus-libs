import { BidiModule } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  ViewEncapsulation,
  inject,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { Subscription, filter } from 'rxjs';

import { AppSettings, SettingsService, AuthService, MenuService } from '@core';
import { Customizer } from '../customizer/customizer';
import { Header, UserMenuItem, Sidebar } from '@acontplus/ng-components';
import { SidebarNotice } from '../sidebar-notice/sidebar-notice';
import { Topmenu } from '../topmenu/topmenu';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 600px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterOutlet,
    BidiModule,
    MatSidenavModule,
    NgProgressbar,
    NgProgressRouter,
    Header,
    Topmenu,
    Sidebar,
    SidebarNotice,
    Customizer,
  ],
})
export class AdminLayout implements OnDestroy {
  readonly sidenav = viewChild.required<MatSidenav>('sidenav');
  readonly content = viewChild.required<MatSidenavContent>('content');

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly settings = inject(SettingsService);
  private readonly auth = inject(AuthService);
  private readonly menuService = inject(MenuService);

  options = this.settings.options;
  user = toSignal(this.auth.user());

  userMenuItems: UserMenuItem[] = [
    {
      icon: 'account_circle',
      label: 'Profile',
      action: 'profile',
      routerLink: '/profile/overview',
    },
    { icon: 'edit', label: 'Edit Profile', action: 'edit', routerLink: '/profile/settings' },
    { icon: 'restore', label: 'Restore Defaults', action: 'restore' },
    { icon: 'exit_to_app', label: 'Logout', action: 'logout' },
  ];

  brandingLogo = 'images/acontplus.png';
  brandingName = 'ACONTPLUS';

  menuItems = toSignal(this.menuService.getAll());

  get themeColor() {
    return this.settings.getThemeColor();
  }

  get isOver() {
    return this.isMobileScreen;
  }
  private isMobileScreen = false;

  private layoutChangesSub = Subscription.EMPTY;

  constructor() {
    this.layoutChangesSub = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe((state) => {
        if (state.breakpoints[MOBILE_MEDIAQUERY]) {
          this.isMobileScreen = true;
          this.options.sidenavCollapsed = false;
        } else {
          this.isMobileScreen = false;
        }
      });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.isOver) {
        this.sidenav().close();
      }
      this.content().scrollTo({ top: 0 });
    });
  }

  ngOnDestroy() {
    this.layoutChangesSub.unsubscribe();
  }

  toggleCollapsed() {
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  // TODO: Trigger when transition end
  resetCollapsedState(delay = 400) {
    setTimeout(() => this.settings.setOptions(this.options), delay);
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  updateOptions(options: AppSettings) {
    this.options = options;
    this.settings.setOptions(options);
    this.settings.setDirection();
    this.settings.setTheme();
    this.settings.setThemeColor();
  }

  onUserAction(action: string) {
    switch (action) {
      case 'logout':
        this.auth.logout().subscribe(() => {
          this.router.navigateByUrl('/auth/login');
        });
        break;
      case 'restore':
        this.settings.reset();
        window.location.reload();
        break;
      case 'profile':
      case 'edit':
        // Navigation handled by routerLink
        break;
    }
  }
}
