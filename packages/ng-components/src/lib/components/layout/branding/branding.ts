import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACP_LAYOUT_CONFIG } from '../layout/layout.config';

/** Logo and name of the app; defaults to `provideAcpLayout({ branding })`. */
@Component({
  selector: 'acp-branding',
  template: `
    <a class="acp-branding" [routerLink]="href()">
      @if (logoSrc()) {
        <img class="acp-branding__logo" [src]="logoSrc()" alt="" />
      }
      @if (showName() && label()) {
        <span class="acp-branding__name">{{ label() }}</span>
      }
    </a>
  `,
  styles: `
    .acp-branding {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      color: inherit;
      text-decoration: none;
      white-space: nowrap;
      border-radius: 50rem;
    }

    .acp-branding__logo {
      width: 2rem;
      height: 2rem;
      border-radius: 50rem;
    }

    .acp-branding__name {
      margin: 0 0.5rem;
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
  readonly showName = input(true);

  protected readonly logoSrc = computed(() => this.logo() ?? this.#branding?.logo);
  protected readonly label = computed(() => this.name() ?? this.#branding?.name);
  protected readonly href = computed(() => this.link() ?? this.#branding?.link ?? '/');
}
