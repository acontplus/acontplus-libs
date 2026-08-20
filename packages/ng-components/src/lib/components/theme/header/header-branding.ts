import { Component, input, output } from '@angular/core';

/**
 * AcpHeaderBranding Component
 *
 * Branding region of the header. Renders logo and/or app name.
 *
 * @example
 * ```html
 * <acp-header-branding
 *   [logo]="logo"
 *   [name]="appName"
 *   [showName]="true"
 *   [link]="'/'"
 *   (selected)="onBrandingClick()"
 * />
 * ```
 */
@Component({
  selector: 'acp-header-branding',
  template: `
    <a
      class="acp-header__branding"
      [href]="link() || '/'"
      (click)="$event.preventDefault(); selected.emit()"
    >
      @if (logo()) {
        <img [src]="logo()" [alt]="name() || 'Logo'" class="acp-header__logo" />
      }
      @if (name() && showName()) {
        <span class="acp-header__brand-name">{{ name() }}</span>
      }
    </a>
  `,
  host: { class: 'acp-header__region acp-header__region--branding' },
  standalone: true,
  styles: `
    .acp-header__brand-name {
      color: #ffffff;
      font: var(--mat-sys-body-large);
    }
  `,
})
export class AcpHeaderBranding {
  /**
   * URL or path to the logo image.
   */
  readonly logo = input<string>();

  /**
   * Brand name to display.
   */
  readonly name = input<string>();

  /**
   * Whether to show the brand name.
   * @default true
   */
  readonly showName = input(true);

  /**
   * URL to navigate to when branding is clicked.
   * @default '/'
   */
  readonly link = input('/');

  /**
   * Event emitted when branding is selected.
   */
  readonly selected = output<void>();
}
