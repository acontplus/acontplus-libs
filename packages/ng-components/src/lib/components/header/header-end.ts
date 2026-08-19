import { Component } from '@angular/core';

/**
 * AcpHeaderEnd Component
 *
 * Right region of the header. Typically contains search, notifications,
 * user menu, theme switcher, and other secondary actions.
 *
 * @example
 * ```html
 * <acp-header-end>
 *   <acp-header-search (search)="onSearch($event)" />
 *   <acp-header-actions [actions]="actions" />
 *   <acp-header-user-menu [user]="user" />
 * </acp-header-end>
 * ```
 */
@Component({
  selector: 'acp-header-end',
  template: `<ng-content />`,
  host: { class: 'acp-header__region acp-header__region--end' },
  standalone: true,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 0 0 auto;
        margin-left: auto;
      }
    `,
  ],
})
export class AcpHeaderEnd {}
