import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * AcpHeader Component
 *
 * Enterprise-grade header component following compound components pattern.
 * This is a layout-only component that provides structure for header regions.
 *
 * @example
 * ```html
 * <acp-header [elevated]="true" [sticky]="true">
 *   <acp-header-start>
 *     <button mat-icon-button>menu</button>
 *   </acp-header-start>
 *   <acp-header-branding [logo]="logo" [name]="name" />
 *   <acp-header-center>
 *     <span>Center content</span>
 *   </acp-header-center>
 *   <acp-header-end>
 *     <acp-header-actions [actions]="actions" />
 *     <acp-user-menu [user]="user" />
 *   </acp-header-end>
 * </acp-header>
 * ```
 */
@Component({
  selector: 'acp-header',
  template: `
    <mat-toolbar>
      <ng-content select="acp-header-start" />
      <ng-content select="acp-header-branding" />
      <ng-content select="acp-header-center" />
      <div class="acp-header__spacer"></div>
      <ng-content select="acp-header-end" />
    </mat-toolbar>
  `,
  styleUrl: './header.scss',
  host: { class: 'acontplus-header' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule],
  standalone: true,
})
export class AcpHeader {}
