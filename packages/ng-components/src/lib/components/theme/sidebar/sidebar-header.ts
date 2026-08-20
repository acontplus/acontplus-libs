import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
/**
 * AcpSidebarHeader Component
 *
 * Top region of the sidebar. Typically contains branding, toggle button,
 * and close button for mobile.
 *
 * @example
 * ```html
 * <acp-sidebar-header>
 *   <acp-sidebar-branding>
 *     <acp-sidebar-branding-content [logo]="logo" [name]="name" />
 *   </acp-sidebar-branding>
 *   <button mat-icon-button (click)="toggle()">menu</button>
 * </acp-sidebar-header>
 * ```
 */
@Component({
  selector: 'acp-sidebar-header',
  template: `
    <mat-toolbar>
      <ng-content select="[start]"></ng-content>

      <span class="acp-spacer"></span>

      <ng-content select="[end]"></ng-content>
    </mat-toolbar>
  `,
  host: {
    class: 'acontplus-sidebar-header',
  },
  styles: [
    `
      .acontplus-sidebar-header {
        overflow: hidden;

        mat-toolbar {
          width: var(--acp-sidenav-width);
          padding: 0 0.5rem;
        }

        /* Remove redundant padding in the slide toggle */
        mat-slide-toggle .mdc-label {
          display: none;
        }
      }

      .acp-spacer {
        flex: 1 1 auto !important;
      }
    `,
  ],
  imports: [MatToolbarModule],
})
export class AcpSidebarHeader {}
