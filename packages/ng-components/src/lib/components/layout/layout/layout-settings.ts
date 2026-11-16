import { isPlatformBrowser } from '@angular/common';
import {
  DOCUMENT,
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  ACP_LAYOUT_CONFIG,
  ACP_LAYOUT_DEFAULTS,
  ACP_THEME_COLORS,
  type AcpLayoutOptions,
} from './layout.config';

const DEFAULT_STORAGE_KEY = 'acp-layout';

/**
 * Layout options as a signal. Persists them in `localStorage` and reflects them on `<html>`:
 * `color-scheme` and `theme-dark` (theme), `theme-<color>`, `dir`, `acp-card-border`,
 * `acp-boxed` and `--acp-skin-radius`.
 */
@Injectable({ providedIn: 'root' })
export class AcpLayoutSettings {
  readonly #config = inject(ACP_LAYOUT_CONFIG);
  readonly #document = inject(DOCUMENT);
  readonly #browser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly #storageKey =
    this.#config.storageKey === undefined ? DEFAULT_STORAGE_KEY : this.#config.storageKey;
  readonly #defaults: AcpLayoutOptions = { ...ACP_LAYOUT_DEFAULTS, ...this.#config.defaults };

  readonly #options = signal<AcpLayoutOptions>({ ...this.#defaults, ...this.#read() });
  readonly #prefersDark = signal(false);

  readonly options = this.#options.asReadonly();
  /** Effective dark mode: the `dark` theme, or `auto` with a dark system preference. */
  readonly isDark = computed(() => {
    const theme = this.#options().theme;
    return theme === 'dark' || (theme === 'auto' && this.#prefersDark());
  });

  constructor() {
    if (this.#browser) {
      const query = this.#document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
      if (query) {
        this.#prefersDark.set(query.matches);
        const listener = (event: MediaQueryListEvent) => this.#prefersDark.set(event.matches);
        query.addEventListener('change', listener);
        inject(DestroyRef).onDestroy(() => query.removeEventListener('change', listener));
      }
    }
    effect(() => this.#apply(this.#options(), this.isDark()));
  }

  /** Merges `changes` into the options and persists them. */
  set(changes: Partial<AcpLayoutOptions>): void {
    const next: AcpLayoutOptions = { ...this.#options(), ...changes };
    this.#options.set(next);
    this.#write(next);
  }

  /** Restores the configured defaults and clears the stored options. */
  reset(): void {
    this.#options.set({ ...this.#defaults });
    if (this.#browser && this.#storageKey) {
      try {
        localStorage.removeItem(this.#storageKey);
      } catch {
        // Storage unavailable: the options stay in memory.
      }
    }
  }

  #apply(options: AcpLayoutOptions, dark: boolean): void {
    const html = this.#document.documentElement;
    html.style.colorScheme = dark ? 'dark' : 'light';
    html.classList.toggle('theme-dark', dark);
    for (const { value } of ACP_THEME_COLORS) {
      html.classList.toggle(`theme-${value}`, value === options.themeColor);
    }
    html.classList.toggle('acp-card-border', options.cardBorder);
    html.classList.toggle('acp-boxed', options.boxed);
    html.style.setProperty('--acp-skin-radius', `${options.radius}px`);
    html.dir = options.dir;
  }

  #read(): Partial<AcpLayoutOptions> {
    if (!this.#browser || !this.#storageKey) return {};
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(this.#storageKey) ?? 'null');
      if (!stored || typeof stored !== 'object') return {};
      // Only known options: the key may be shared with older app settings.
      return Object.fromEntries(
        Object.entries(stored).filter(([key]) => key in ACP_LAYOUT_DEFAULTS),
      ) as Partial<AcpLayoutOptions>;
    } catch {
      return {};
    }
  }

  #write(options: AcpLayoutOptions): void {
    if (!this.#browser || !this.#storageKey) return;
    try {
      localStorage.setItem(this.#storageKey, JSON.stringify(options));
    } catch {
      // Storage unavailable or full: the options stay in memory.
    }
  }
}
