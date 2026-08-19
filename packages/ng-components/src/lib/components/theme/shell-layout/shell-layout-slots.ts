import { Directive, InjectionToken, TemplateRef, inject } from '@angular/core';

/**
 * Slot tokens — used internally by AcpShellLayout to detect
 * whether the host app has provided a custom projection for each region.
 */
export const ACP_SHELL_SLOT_HEADER = new InjectionToken<AcpShellSlotHeader>('AcpShellSlotHeader');
export const ACP_SHELL_SLOT_SIDEBAR = new InjectionToken<AcpShellSlotSidebar>(
  'AcpShellSlotSidebar',
);
export const ACP_SHELL_SLOT_SIDEBAR_FOOTER = new InjectionToken<AcpShellSlotSidebarFooter>(
  'AcpShellSlotSidebarFooter',
);
export const ACP_SHELL_SLOT_TOOLBAR = new InjectionToken<AcpShellSlotToolbar>(
  'AcpShellSlotToolbar',
);
export const ACP_SHELL_SLOT_TOPMENU = new InjectionToken<AcpShellSlotTopmenu>(
  'AcpShellSlotTopmenu',
);

/**
 * `acpShellHeader` — replaces the entire header region.
 *
 * @example
 * ```html
 * <acp-shell-layout>
 *   <ng-template acpShellHeader>
 *     <app-custom-header />
 *   </ng-template>
 * </acp-shell-layout>
 * ```
 */
@Directive({
  selector: 'ng-template[acpShellHeader]',
  standalone: true,
  providers: [{ provide: ACP_SHELL_SLOT_HEADER, useExisting: AcpShellSlotHeader }],
})
export class AcpShellSlotHeader {
  readonly templateRef = inject(TemplateRef);
}

/**
 * `acpShellSidebar` — replaces the entire sidebar region.
 *
 * @example
 * ```html
 * <acp-shell-layout>
 *   <ng-template acpShellSidebar>
 *     <app-custom-sidebar />
 *   </ng-template>
 * </acp-shell-layout>
 * ```
 */
@Directive({
  selector: 'ng-template[acpShellSidebar]',
  standalone: true,
  providers: [{ provide: ACP_SHELL_SLOT_SIDEBAR, useExisting: AcpShellSlotSidebar }],
})
export class AcpShellSlotSidebar {
  readonly templateRef = inject(TemplateRef);
}

/**
 * `acpShellSidebarFooter` — projects content at the bottom of the sidebar
 * without replacing the whole sidebar (e.g. version badge, help link).
 *
 * @example
 * ```html
 * <acp-shell-layout>
 *   <ng-template acpShellSidebarFooter>
 *     <app-version-badge />
 *   </ng-template>
 * </acp-shell-layout>
 * ```
 */
@Directive({
  selector: 'ng-template[acpShellSidebarFooter]',
  standalone: true,
  providers: [{ provide: ACP_SHELL_SLOT_SIDEBAR_FOOTER, useExisting: AcpShellSlotSidebarFooter }],
})
export class AcpShellSlotSidebarFooter {
  readonly templateRef = inject(TemplateRef);
}

/**
 * `acpShellToolbar` — projects extra content into the header toolbar
 * alongside the default actions (e.g. breadcrumb, search bar).
 *
 * @example
 * ```html
 * <acp-shell-layout>
 *   <ng-template acpShellToolbar>
 *     <app-breadcrumb />
 *   </ng-template>
 * </acp-shell-layout>
 * ```
 */
@Directive({
  selector: 'ng-template[acpShellToolbar]',
  standalone: true,
  providers: [{ provide: ACP_SHELL_SLOT_TOOLBAR, useExisting: AcpShellSlotToolbar }],
})
export class AcpShellSlotToolbar {
  readonly templateRef = inject(TemplateRef);
}

/**
 * `acpShellTopmenu` — projects horizontal top navigation into the page content.
 *
 * @example
 * ```html
 * <acp-shell-layout>
 *   <ng-template acpShellTopmenu>
 *     <app-topmenu />
 *   </ng-template>
 * </acp-shell-layout>
 * ```
 */
@Directive({
  selector: 'ng-template[acpShellTopmenu]',
  standalone: true,
  providers: [{ provide: ACP_SHELL_SLOT_TOPMENU, useExisting: AcpShellSlotTopmenu }],
})
export class AcpShellSlotTopmenu {
  readonly templateRef = inject(TemplateRef);
}
