import { Component } from '@angular/core';

/**
 * AcpHeaderBranding Component
 *
 * Branding region of the header. Contains logo, app name, or custom branding.
 *
 * @example
 * ```html
 * <acp-header-branding>
 *   <acp-header-branding-content [logo]="logo" [name]="appName" />
 * </acp-header-branding>
 * ```
 */
@Component({
  selector: 'acp-header-branding',
  template: `<ng-content />`,
  host: { class: 'acp-header__region acp-header__region--branding' },
  standalone: true,
})
export class AcpHeaderBranding {}
