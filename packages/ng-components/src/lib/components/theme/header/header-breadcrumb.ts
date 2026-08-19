import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Breadcrumb item interface
 */
export interface AcpBreadcrumbItem {
  label: string;
  link?: string;
  disabled?: boolean;
}

/**
 * AcpHeaderBreadcrumb Component
 *
 * Breadcrumb navigation for the header.
 *
 * @example
 * ```html
 * <acp-header-breadcrumb [items]="breadcrumbs" />
 * ```
 */
@Component({
  selector: 'acp-header-breadcrumb',
  template: `
    <nav class="acp-header__breadcrumb" aria-label="Breadcrumb">
      <ol class="acp-header__breadcrumb-list">
        @for (item of items(); track $index) {
          <li class="acp-header__breadcrumb-item">
            @if (item.link && !item.disabled) {
              <a
                [routerLink]="item.link"
                routerLinkActive="acp-header__breadcrumb-link--active"
                class="acp-header__breadcrumb-link"
              >
                {{ item.label }}
              </a>
            } @else {
              <span class="acp-header__breadcrumb-label">{{ item.label }}</span>
            }
            @if ($index < items().length - 1) {
              <span class="acp-header__breadcrumb-separator">/</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  host: { class: 'acp-header-breadcrumb' },
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class AcpHeaderBreadcrumb {
  /**
   * Array of breadcrumb items.
   */
  readonly items = input<AcpBreadcrumbItem[]>([]);
}
