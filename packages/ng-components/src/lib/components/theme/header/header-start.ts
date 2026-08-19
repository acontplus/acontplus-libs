import { Component } from '@angular/core';

/**
 * AcpHeaderStart Component
 *
 * Left region of the header. Typically contains navigation toggle,
 * back button, or other primary actions.
 *
 * @example
 * ```html
 * <acp-header-start>
 *   <button mat-icon-button (click)="toggleSidenav()">
 *     <mat-icon>menu</mat-icon>
 *   </button>
 * </acp-header-start>
 * ```
 */
@Component({
  selector: 'acp-header-start',
  template: `<ng-content />`,
  host: { class: 'acp-header__region acp-header__region--start' },
  standalone: true,
})
export class AcpHeaderStart {}
