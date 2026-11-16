import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ACP_LAYOUT_CONFIG,
  AcpBrandingDisplay,
  AcpBrandingLogoShape,
} from '../layout/layout.config';

/** Logo and name of the app; defaults to `provideAcpLayout({ branding })`. */
@Component({
  selector: 'acp-branding',
  template: `
    <a class="acp-branding" [routerLink]="href()" [attr.aria-label]="label() || null">
      @if (logoSrc()) {
        <img
          class="acp-branding__logo"
          [class.acp-branding__logo--rectangle]="shape() === 'rectangle'"
          [src]="logoSrc()"
          alt=""
        />
      }
      @if (showLabel()) {
        <span class="acp-branding__name">{{ label() }}</span>
      }
    </a>
  `,
  styles: `
    :host {
      display: flex;
      flex: 0 1 auto;
      min-width: 0;
      max-width: 100%;
    }

    .acp-branding {
      display: flex;
      align-items: center;
      min-width: 0;
      max-width: 100%;
      margin: 0 0.5rem;
      color: inherit;
      text-decoration: none;
      white-space: nowrap;
      border-radius: 50rem;
    }

    .acp-branding__logo {
      flex: none;
      width: 2rem;
      height: 2rem;
      object-fit: cover;
      border-radius: 50rem;
    }

    .acp-branding__logo--rectangle {
      flex: 0 1 auto;
      min-width: 0;
      width: auto;
      max-width: var(--acp-branding-logo-max-width, 10rem);
      height: var(--acp-branding-logo-height, 2rem);
      object-fit: contain;
      object-position: left center;
      border-radius: 0;
    }

    .acp-branding__name {
      min-width: 0;
      margin: 0 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      color: var(--acp-branding-color, var(--acp-theme-primary-color, var(--mat-sys-primary)));
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class AcpBranding {
  readonly #branding = inject(ACP_LAYOUT_CONFIG).branding;

  readonly logo = input<string>();
  readonly name = input<string>();
  readonly link = input<string>();
  readonly display = input<AcpBrandingDisplay>();
  readonly logoShape = input<AcpBrandingLogoShape>();
  /** `false` while the sidebar is collapsed. */
  readonly showName = input(true);

  readonly #display = computed(() => this.display() ?? this.#branding?.display ?? 'logo-name');

  protected readonly shape = computed(
    () => this.logoShape() ?? this.#branding?.logoShape ?? 'circle',
  );
  protected readonly logoSrc = computed(() =>
    this.#display() === 'name' ? undefined : (this.logo() ?? this.#branding?.logo),
  );
  protected readonly label = computed(() => this.name() ?? this.#branding?.name);
  protected readonly showLabel = computed(
    () => this.showName() && this.#display() !== 'logo' && !!this.label(),
  );
  protected readonly href = computed(() => this.link() ?? this.#branding?.link ?? '/');
}
