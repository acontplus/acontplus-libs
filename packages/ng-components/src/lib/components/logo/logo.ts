import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  resource,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ACP_LAYOUT_CONFIG } from '../layout/layout/layout.config';
import { ACP_LOGO_CONFIG } from './logo.tokens';

const SVG_URL = /\.svg(?:[?#]|$)/i;
const UNSAFE_NODES = 'script, foreignObject, iframe, object, embed';

/** Parses SVG markup, drops scripts and event handlers, and lets CSS size it. */
function toInlineSvg(markup: string): string | null {
  if (typeof DOMParser === 'undefined') return null;
  const svg = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement;
  if (svg.nodeName !== 'svg') return null;
  svg.querySelectorAll(UNSAFE_NODES).forEach(node => node.remove());
  for (const el of [svg, ...Array.from(svg.querySelectorAll('*'))]) {
    for (const { name, value } of Array.from(el.attributes)) {
      if (/^on/i.test(name) || /^\s*javascript:/i.test(value)) el.removeAttribute(name);
    }
  }
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  return svg.outerHTML;
}

/**
 * App logo from an image URL (`src` or `provideAcpLogo`), so changing it only means replacing the
 * file. SVG files are inlined: their `currentColor` or `var(--acp-logo-color)` fills follow the
 * theme. Other formats render as `<img>`. Without an image, or when it fails to load, it shows the
 * name as text (`label`,
 * `provideAcpLogo` or `provideAcpLayout({ branding: { name } })`). Size it with `height`.
 */
@Component({
  selector: 'acp-logo',
  template: `
    @if (svg(); as markup) {
      <span class="acp-logo__svg" [innerHTML]="markup"></span>
    } @else if (showImage()) {
      <img class="acp-logo__img" [src]="url()" alt="" (error)="imageFailed.set(true)" />
    } @else if (!url() || imageFailed()) {
      <span class="acp-logo__text" aria-hidden="true">{{ name() }}</span>
    }
  `,
  styleUrl: './logo.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'acp-logo',
    role: 'img',
    '[attr.aria-label]': 'name()',
  },
})
export class AcpLogo {
  readonly #config = inject(ACP_LOGO_CONFIG);
  readonly #brandName = inject(ACP_LAYOUT_CONFIG).branding?.name;
  readonly #sanitizer = inject(DomSanitizer);

  readonly src = input<string>();
  readonly label = input<string>();

  protected readonly url = computed(() => this.src() ?? this.#config.src);
  protected readonly name = computed(
    () => this.label() ?? this.#config.label ?? this.#brandName ?? null,
  );

  readonly #markup = resource({
    params: () => {
      const url = this.url();
      return url && SVG_URL.test(url) ? url : undefined;
    },
    loader: async ({ params, abortSignal }) => {
      const response = await fetch(params, { signal: abortSignal });
      if (!response.ok) throw new Error(`acp-logo: ${response.status} ${params}`);
      return toInlineSvg(await response.text());
    },
  });

  protected readonly svg = computed<SafeHtml | null>(() => {
    const markup = this.#markup.hasValue() ? this.#markup.value() : null;
    return markup ? this.#sanitizer.bypassSecurityTrustHtml(markup) : null;
  });

  protected readonly imageFailed = linkedSignal({ source: this.url, computation: () => false });

  protected readonly showImage = computed(() => {
    const url = this.url();
    if (!url || this.imageFailed()) return false;
    return !SVG_URL.test(url) || this.#markup.status() === 'error' || this.#markup.value() === null;
  });
}
