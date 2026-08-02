import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  ViewEncapsulation,
  inject,
  viewChild,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { Subscription, filter, map } from 'rxjs';

import { AppSettings, SettingsService, MenuService, Menu } from '@core';
import { Customizer } from '../customizer/customizer';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { SidebarNotice } from '../sidebar-notice/sidebar-notice';
import { Topmenu } from '../topmenu/topmenu';
import {
  AcpShellLayout,
  AcpShellSlotHeader,
  AcpShellSlotSidebar,
  AcpDrawer,
  type MenuItem,
} from '@acontplus/ng-components';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 600px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    NgProgressbar,
    NgProgressRouter,
    // Shell layout + slot directives
    AcpShellLayout,
    AcpShellSlotHeader,
    AcpShellSlotSidebar,
    // App-specific sub-components projected into slots
    Header,
    Sidebar,
    Topmenu,
    Customizer,
  ],
})
export class AdminLayout implements OnDestroy {
  // ── Template refs ──────────────────────────────────────────────────────────

  /** Reference to the AcpShellLayout so we can call toggleSidenav() etc. */
  readonly shell = viewChild.required<AcpShellLayout>('shell');

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly settings = inject(SettingsService);
  private readonly menuService = inject(MenuService);
  private readonly drawer = inject(AcpDrawer);

  // ── State ──────────────────────────────────────────────────────────────────

  readonly options = this.settings.options;

  readonly isMobile = toSignal(
    this.breakpointObserver.observe(MOBILE_MEDIAQUERY).pipe(map((r) => r.matches)),
    { initialValue: false },
  );

  readonly menuItemsSafe = computed<MenuItem[]>(() => {
    const menus = this.menuService.getAll() as unknown as Menu[] | undefined;
    if (!menus) return [];
    return menus.map(
      (menu): MenuItem => ({
        route: menu.route,
        name: menu.name,
        type: menu.type,
        icon: menu.icon,
        label: menu.label,
        badge: menu.badge,
        permissions: menu.permissions,
        children: menu.children?.map(
          (child): MenuItem => ({
            route: child.route,
            name: child.name,
            type: child.type,
            children: child.children?.map(
              (grandchild): MenuItem => ({
                route: grandchild.route,
                name: grandchild.name,
                type: grandchild.type,
                children: grandchild.children?.map((ggchild) => ({
                  route: ggchild.route,
                  name: ggchild.name,
                  type: ggchild.type,
                })),
              }),
            ),
          }),
        ),
      }),
    );
  });

  private isMobileScreen = false;
  private layoutChangesSub = Subscription.EMPTY;

  constructor() {
    this.layoutChangesSub = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe((state) => {
        if (state.breakpoints[MOBILE_MEDIAQUERY]) {
          this.isMobileScreen = true;
          this.settings.setOptions({ sidenavCollapsed: false });
        } else {
          this.isMobileScreen = false;
        }
      });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.isMobileScreen) {
        this.shell().closeSidenav();
      }
      this.shell().scrollToTop();
    });
  }

  ngOnDestroy() {
    this.layoutChangesSub.unsubscribe();
  }

  // ── Layout event handlers ──────────────────────────────────────────────────

  onSidenavOpenedChange(isOpened: boolean) {
    this.settings.setOptions({ sidenavOpened: isOpened });
  }

  toggleCollapsed() {
    const current = this.options().sidenavCollapsed;
    this.settings.setOptions({ sidenavCollapsed: !current });
    setTimeout(() => this.settings.setOptions(this.options()), 400);
  }

  toggleNotice() {
    this.drawer.open(SidebarNotice, {
      id: 'shell-notices',
      position: 'right',
      width: '320px',
      hasBackdrop: true,
    });
  }

  updateOptions(options: AppSettings) {
    this.settings.setOptions(options);
    this.settings.setDirection();
    this.settings.setTheme();
    this.settings.setThemeColor();
  }
}
