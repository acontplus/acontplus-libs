import { BidiModule } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ViewEncapsulation,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AcpBranding } from '../branding';
import type { AcpMenuItem } from '../menu';
import { AcpSidemenu } from '../sidemenu';
import { AcpTopmenu } from '../topmenu';
import { ACP_LAYOUT_CONFIG } from './layout.config';
import { AcpLayoutSettings } from './layout-settings';

const DEFAULT_MOBILE_QUERY = '(max-width: 599px)';

/**
 * Admin layout: header, collapsible sidebar with side menu, optional top menu and page content.
 * Reads its options from `AcpLayoutSettings`; the app only provides the menu and its own widgets.
 *
 * Slots (attribute on the projected element):
 * - `acpHeaderStart`: after the branding in the header (e.g. apps shortcut).
 * - `acpHeaderEnd`: right side of the header (notifications, user menu...).
 * - `acpSidebarUser`: top of the sidebar, hidden with `showUserPanel: false`.
 * - `acpSidebarFooter`: bottom of the sidebar.
 * - default: the page (`<router-outlet />`).
 *
 * @example
 * <acp-layout [menu]="menu()">
 *   <app-user-menu acpHeaderEnd />
 *   <router-outlet />
 * </acp-layout>
 */
@Component({
  selector: 'acp-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  host: { class: 'acp-layout-host' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BidiModule,
    NgTemplateOutlet,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    AcpBranding,
    AcpSidemenu,
    AcpTopmenu,
  ],
})
export class AcpLayout {
  readonly #config = inject(ACP_LAYOUT_CONFIG);
  readonly #document = inject(DOCUMENT);
  readonly #settings = inject(AcpLayoutSettings);

  /** Items of the side and top menus, already filtered by permission. */
  readonly menu = input<AcpMenuItem[]>([]);

  readonly sidenav = viewChild.required<MatSidenav>('sidenav');
  readonly content = viewChild.required<MatSidenavContent>('content');

  protected readonly options = this.#settings.options;
  readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe(this.#config.mobileQuery ?? DEFAULT_MOBILE_QUERY)
      .pipe(map(state => state.matches)),
    { initialValue: false },
  );

  protected readonly navTop = computed(() => this.options().navPos === 'top');
  protected readonly headerAbove = computed(
    () => this.options().showHeader && this.options().headerPos === 'above',
  );
  protected readonly headerInContent = computed(
    () => this.options().showHeader && this.options().headerPos !== 'above',
  );
  /** Collapsed rail: only on desktop with the side menu. */
  protected readonly collapsed = computed(
    () => this.options().sidenavCollapsed && !this.isMobile() && !this.navTop(),
  );
  protected readonly sidenavOpened = computed(
    () => !this.navTop() && this.options().sidenavOpened && !this.isMobile(),
  );
  protected readonly fullscreenButton =
    this.#config.fullscreenButton !== false && !!this.#document.fullscreenEnabled;

  constructor() {
    inject(Router)
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (this.isMobile()) this.sidenav().close();
        this.content().scrollTo({ top: 0 });
      });
  }

  toggleSidenav(): void {
    this.sidenav().toggle();
  }

  toggleCollapsed(): void {
    this.#settings.set({ sidenavCollapsed: !this.options().sidenavCollapsed });
  }

  protected onSidenavOpenedChange(opened: boolean): void {
    // On mobile the sidenav is an overlay; keep the desktop preference.
    if (!this.isMobile()) this.#settings.set({ sidenavOpened: opened });
  }

  protected toggleFullscreen(): void {
    if (this.#document.fullscreenElement) {
      void this.#document.exitFullscreen();
    } else {
      void this.#document.documentElement.requestFullscreen();
    }
  }
}
