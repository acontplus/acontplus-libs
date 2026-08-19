import { Component } from '@angular/core';

/**
 * AcpHeaderCenter Component
 *
 * Center region of the header. Typically contains breadcrumb,
 * workspace selector, or page title.
 *
 * @example
 * ```html
 * <acp-header-center>
 *   <acp-header-breadcrumb [items]="breadcrumbs" />
 * </acp-header-center>
 * ```
 */
@Component({
  selector: 'acp-header-center',
  template: `<ng-content />`,
  host: { class: 'acp-header__region acp-header__region--center' },
  standalone: true,
})
export class AcpHeaderCenter {}
