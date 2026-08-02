import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * AcpSidebarContent Component
 *
 * Main content region of the sidebar. Typically contains the sidemenu
 * with navigation items.
 *
 * @example
 * ```html
 * <acp-sidebar-content>
 *   <acp-sidemenu [menuItems]="menuItems" />
 * </acp-sidebar-content>
 * ```
 */
@Component({
  selector: 'acp-sidebar-content',
  template: `
    <div class="matero-sidebar-main">
      <ng-content select="[user-panel]" />
      <ng-content select="[sidemenu]" />
    </div>
  `,
  styles: [
    `
      @use '../../../core/style/breakpoints';

      .matero-sidebar-main {
        height: calc(100% - var(--mat-toolbar-standard-height));
        padding: 0 0.5rem 0.5rem;
        overflow: auto;
        scrollbar-width: none;

        @include breakpoints.bp-lt(small) {
          height: calc(100% - var(--mat-toolbar-mobile-height));
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcpSidebarContent {}
