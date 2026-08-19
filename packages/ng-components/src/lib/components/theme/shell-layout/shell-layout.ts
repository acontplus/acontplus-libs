import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
  viewChild,
  contentChild,
} from '@angular/core';
import { BidiModule } from '@angular/cdk/bidi';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';

import {
  AcpShellSlotHeader,
  AcpShellSlotSidebar,
  AcpShellSlotSidebarFooter,
  AcpShellSlotToolbar,
  AcpShellSlotTopmenu,
} from './shell-layout-slots';
import type { AcpNavPos, AcpHeaderPos, AcpDir } from './shell-layout.types';
import { RouterOutlet } from '@angular/router';

/**
 * AcpShellLayout
 *
 * Pure structural shell — provides the layout skeleton (header region,
 * sidenav, content area) with named ng-content slots so the host app
 * can project any component into any region without modifying the shell.
 *
 * ## Slot directives
 * - `acpShellHeader`        — replaces the entire header bar
 * - `acpShellSidebar`       — replaces the entire sidebar body
 * - `acpShellSidebarFooter` — appended at the bottom of the sidebar
 * - `acpShellToolbar`       — injected inside the header center region
 *
 * ## Default content slot
 * Plain children (e.g. `<router-outlet />`) are projected into the
 * main page-content area.
 *
 * @example
 * ```html
 * <acp-shell-layout
 *   [navPos]="options().navPos"
 *   [headerPos]="options().headerPos"
 *   [sidenavOpened]="options().sidenavOpened"
 *   [sidenavCollapsed]="options().sidenavCollapsed"
 *   [isMobile]="isMobile()"
 *   [dir]="options().dir"
 *   (sidenavOpenedChange)="onSidenavOpenedChange($event)"
 * >
 *   <!-- header slot -->
 *   <ng-template acpShellHeader>
 *     <app-header (toggleSidenav)="layout.toggleSidenav()" />
 *   </ng-template>
 *
 *   <!-- sidebar slot -->
 *   <ng-template acpShellSidebar>
 *     <app-sidebar />
 *   </ng-template>
 *
 *   <!-- optional: footer inside sidebar -->
 *   <ng-template acpShellSidebarFooter>
 *     <app-version-badge />
 *   </ng-template>
 *
 *   <!-- page content -->
 *   <router-outlet />
 * </acp-shell-layout>
 * ```
 */
@Component({
  selector: 'acp-shell-layout',
  templateUrl: './shell-layout.html',
  styleUrl: './shell-layout.scss',
  host: { class: 'acp-shell-layout-host' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BidiModule, NgClass, NgTemplateOutlet, MatSidenavModule, RouterOutlet],
})
export class AcpShellLayout {
  // ── Internal view refs ─────────────────────────────────────────────────────

  /** Reference to the primary MatSidenav — exposed so the app can toggle it. */
  readonly sidenav = viewChild.required<MatSidenav>('sidenav');
  /** Reference to the MatSidenavContent — exposed for scroll control. */
  readonly content = viewChild.required<MatSidenavContent>('content');

  // ── Slot content children ──────────────────────────────────────────────────

  /** Custom header projected by the app. Falls back to empty when absent. */
  readonly headerSlot = contentChild(AcpShellSlotHeader);
  /** Custom sidebar body projected by the app. Falls back to empty when absent. */
  readonly sidebarSlot = contentChild(AcpShellSlotSidebar);
  /** Optional footer appended inside the sidebar. */
  readonly sidebarFooterSlot = contentChild(AcpShellSlotSidebarFooter);
  /** Optional toolbar content injected into the header center. */
  readonly toolbarSlot = contentChild(AcpShellSlotToolbar);
  /** Optional top navigation projected above the main page content. */
  readonly topmenuSlot = contentChild(AcpShellSlotTopmenu);
  /** Optional secondary sidenav (e.g. notifications panel, position end). */

  // ── Layout inputs ──────────────────────────────────────────────────────────

  /** Navigation position. @default 'side' */
  readonly navPos = input<AcpNavPos>('side');

  /** Header position relative to the sidenav. @default 'fixed' */
  readonly headerPos = input<AcpHeaderPos>('fixed');

  /** Whether the sidenav is open. @default true */
  readonly sidenavOpened = input(true);

  /** Whether the sidenav is in collapsed/narrow mode. @default false */
  readonly sidenavCollapsed = input(false);

  /** Whether the viewport is in mobile mode (switches sidenav to "over"). @default false */
  readonly isMobile = input(false);

  /** Layout direction for RTL support. @default 'ltr' */
  readonly dir = input<AcpDir>('ltr');

  // ── Outputs ────────────────────────────────────────────────────────────────

  /** Emitted when the sidenav opened/closed state changes internally. */
  readonly sidenavOpenedChange = output<boolean>();

  // ── Derived state ──────────────────────────────────────────────────────────

  /** 'over' on mobile so the sidebar floats above content. */
  readonly sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  /**
   * Whether to render the header-above zone.
   * True when `headerPos === 'above'` — spans full width outside the sidenav container.
   */
  readonly showHeaderAbove = computed(() => this.headerPos() === 'above');

  /**
   * Whether to render the header inside the content area.
   * True for 'fixed' and 'below' positions.
   */
  readonly showHeaderInContent = computed(() => this.headerPos() !== 'above');

  /** CSS modifier classes bound to the root container element. */
  readonly containerClasses = computed(() => ({
    'acontplus-sidenav-collapsed': this.sidenavCollapsed() && this.navPos() !== 'top',
    'acontplus-navbar-side': this.navPos() === 'side',
    'acontplus-navbar-top': this.navPos() === 'top',
    'acontplus-header-above': this.headerPos() === 'above',
    'acontplus-header-fixed': this.headerPos() === 'fixed',
  }));

  // ── Public API (for template-variable access) ──────────────────────────────

  /** Toggle the primary sidenav. Callable from parent via template ref. */
  toggleSidenav(): void {
    this.sidenav().toggle();
  }

  /** Close the primary sidenav. */
  closeSidenav(): void {
    console.log('closeSidenav() called');
    this.sidenav().close();
  }

  /** Scroll the content area back to the top. */
  scrollToTop(): void {
    this.content().scrollTo({ top: 0 });
  }
}
