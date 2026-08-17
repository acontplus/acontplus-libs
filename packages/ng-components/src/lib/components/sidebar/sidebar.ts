import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

/**
 * AcpSidebar Component
 *
 * Enterprise-grade sidebar component following compound components pattern.
 * This is a layout-only component that provides structure for sidebar regions.
 *
 * @example
 * ```html
 * <acp-sidebar [collapsed]="collapsed" [mode]="mode">
 *   <acp-sidebar-header>
 *     <acp-sidebar-branding>
 *       <acp-sidebar-branding-content [logo]="logo" [name]="name" />
 *     </acp-sidebar-branding>
 *     <button mat-icon-button (click)="toggle()">menu</button>
 *   </acp-sidebar-header>
 *
 *   <acp-sidebar-user>
 *     <acp-sidebar-user-content [avatar]="avatar" [name]="name" [email]="email" />
 *   </acp-sidebar-user>
 *
 *   <acp-sidebar-content>
 *     <acp-sidemenu [menuItems]="menuItems" />
 *   </acp-sidebar-content>
 * </acp-sidebar>
 * ```
 */
@Component({
  selector: 'acp-sidebar',
  template: `
    <ng-content select="acp-sidebar-header" />
    <ng-content select="acp-sidebar-user" />
    <ng-content select="acp-sidebar-content" />
  `,
  styleUrl: './sidebar.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcpSidebar {}
