import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

let nextGroupId = 0;

export type AcpRadioCardSize = 'x-small' | 'small' | 'medium' | 'large';
export type AcpRadioCardColor = 'primary' | 'secondary' | 'tertiary' | 'error';
export type AcpRadioCardBackgroundPreset = 'success' | 'warning' | 'info' | 'light' | 'dark';

/** Para inputs booleanos opcionales que deben poder heredar del grupo. */
const optionalBoolean = (v: unknown): boolean | undefined =>
  v === undefined || v === null ? undefined : booleanAttribute(v);

/**
 * Grupo de tarjetas radio. ES el ControlValueAccessor: el formControl va aquí,
 * una sola vez, igual que en `mat-radio-group`.
 *
 * @example
 * ```html
 * <acp-radio-card-group [formControl]="method" aria-label="Método de pago">
 *   <acp-radio-card value="cash" label="Efectivo" icon="payments" />
 *   <acp-radio-card value="card" label="Tarjeta" icon="credit_card">
 *     Visa, Mastercard
 *   </acp-radio-card>
 * </acp-radio-card-group>
 * ```
 */
@Component({
  selector: 'acp-radio-card-group',
  standalone: true,
  template: `<ng-content />`,
  styles: `
    :host {
      --acp-rcg-gap: 12px;
      --acp-rcg-col-min: 200px;
      display: grid;
      gap: var(--acp-rcg-gap);
      grid-template-columns: repeat(auto-fit, minmax(var(--acp-rcg-col-min), 1fr));
    }
    :host([data-size='x-small']) {
      --acp-rcg-gap: 6px;
      --acp-rcg-col-min: 140px;
    }
    :host([data-size='small']) {
      --acp-rcg-gap: 8px;
      --acp-rcg-col-min: 160px;
    }
    :host([data-size='large']) {
      --acp-rcg-gap: 16px;
      --acp-rcg-col-min: 240px;
    }
  `,
  host: {
    role: 'radiogroup',
    class: 'acp-radio-card-group',
    '[attr.data-size]': 'size()',
    '[attr.data-accent-preset]': 'backgroundPreset() ?? null',
    '[attr.aria-disabled]': 'isDisabled()',
    // Las variables CSS se heredan: todas las tarjetas del grupo las reciben
    '[style.--acp-rc-accent]': 'resolvedAccentColor() ?? null',
    '[style.--acp-rc-bg]': 'resolvedBackground() ?? null',
    '[style.--acp-rc-bg-checked]': 'checkedBackground() ?? null',
    '[style.--acp-rc-text]': 'textColor() ?? null',
    '(focusout)': 'markTouched()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcpRadioCardGroup),
      multi: true,
    },
  ],
})
export class AcpRadioCardGroup implements ControlValueAccessor {
  readonly name = input(`acp-radio-card-group-${nextGroupId++}`);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Tamaño por defecto de todas las tarjetas del grupo. */
  readonly size = input<AcpRadioCardSize>('medium');
  /** Color del tema para borde, icono y radio. */
  readonly color = input<AcpRadioCardColor>('primary');
  /** Si es true, la tarjeta seleccionada se rellena con el color *container* del tema. */
  readonly tonal = input(false, { transform: booleanAttribute });
  /** Preset de fondo predefinido: success, warning, info, light, dark. */
  readonly backgroundPreset = input<AcpRadioCardBackgroundPreset>();
  /** Color de acento del preset (borde, icono, radio). Si no se pasa `color`, usa el del preset. */
  readonly resolvedAccentColor = computed(() => {
    if (this.color()) return undefined;
    const preset = this.backgroundPreset();
    if (!preset) return undefined;
    return PRESET_ACCENT[preset];
  });
  /** Fondo de las tarjetas (cualquier color CSS: '#fff', 'rgb(...)', 'var(--x)'). */
  readonly background = input<string>();
  /** Fondo de la tarjeta seleccionada. Tiene prioridad sobre `tonal`. */
  readonly checkedBackground = input<string>();
  /** Color del texto (útil con fondos oscuros). */
  readonly textColor = input<string>();
  /** Para comparar objetos (p. ej. por id) en vez de por referencia. */
  readonly compareWith = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);

  /** Valor seleccionado actualmente (fuente única de verdad). */
  readonly selected = signal<unknown>(null);

  // --- Presets de fondo ---
  readonly resolvedBackground = computed(() => {
    if (this.background()) return this.background();
    const preset = this.backgroundPreset();
    if (!preset) return undefined;
    return BACKGROUND_PRESETS[preset];
  });

  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  // Default no-ops until FormControl registers callbacks via registerOnChange/registerOnTouched
  private onChange: (value: unknown) => void = () => {
    /* no-op */
  };
  private onTouched: () => void = () => {
    /* no-op */
  };

  // --- ControlValueAccessor ---
  writeValue(value: unknown): void {
    this.selected.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  // --- API usada por las tarjetas ---
  isSelected(value: unknown): boolean {
    return this.compareWith()(this.selected(), value);
  }

  select(value: unknown): void {
    if (this.isDisabled() || this.isSelected(value)) return;
    this.selected.set(value); // actualiza TODAS las tarjetas (leen este signal)
    this.onChange(value); // notifica al FormControl
    this.onTouched();
  }

  markTouched(): void {
    this.onTouched();
  }
}

/**
 * Tarjeta seleccionable. Debe usarse dentro de `<acp-radio-card-group>`.
 * No lleva formControl propio.
 */
@Component({
  selector: 'acp-radio-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatRadioModule],
  template: `
    <mat-card
      appearance="outlined"
      class="acp-radio-card"
      [class.acp-radio-card--checked]="checked()"
      [class.acp-radio-card--disabled]="isDisabled()"
    >
      <div class="acp-radio-card__body">
        @if (icon()) {
          <mat-icon class="acp-radio-card__icon">{{ icon() }}</mat-icon>
        }
        <span class="acp-radio-card__content">
          <span class="acp-radio-card__label-text">{{ label() }}</span>
          <span class="acp-radio-card__description"><ng-content /></span>
        </span>
        <!-- Solo visual: el estado y la accesibilidad los maneja el host -->
        <mat-radio-button
          class="acp-radio-card__radio"
          aria-hidden="true"
          [tabIndex]="-1"
          [disableRipple]="true"
          [name]="group.name()"
          [checked]="checked()"
          [disabled]="isDisabled()"
        />
      </div>
    </mat-card>
  `,
  styles: `
    /* ---------- Colores del tema (primary por defecto) ---------- */
    :host {
      --acp-rc-accent: var(--mat-sys-primary, #1976d2);
      --acp-rc-container: var(--mat-sys-primary-container, #d6e3ff);
      --acp-rc-on-container: var(--mat-sys-on-primary-container, #001b3e);
    }
    :host([data-color='secondary']) {
      --acp-rc-accent: var(--mat-sys-secondary, #565e71);
      --acp-rc-container: var(--mat-sys-secondary-container, #dae2f9);
      --acp-rc-on-container: var(--mat-sys-on-secondary-container, #131c2b);
    }
    :host([data-color='tertiary']) {
      --acp-rc-accent: var(--mat-sys-tertiary, #705575);
      --acp-rc-container: var(--mat-sys-tertiary-container, #fad8fd);
      --acp-rc-on-container: var(--mat-sys-on-tertiary-container, #28132e);
    }
    :host([data-color='error']) {
      --acp-rc-accent: var(--mat-sys-error, #ba1a1a);
      --acp-rc-container: var(--mat-sys-error-container, #ffdad6);
      --acp-rc-on-container: var(--mat-sys-on-error-container, #410002);
    }

    /* ---------- Colores de acento por preset ---------- */
    /* Misma paleta que acp-button: colores fijos distinguibles */
    :host([data-accent-preset='success']) {
      --acp-rc-accent: #4caf50;
    }
    :host([data-accent-preset='warning']) {
      --acp-rc-accent: #f59e0b;
    }
    :host([data-accent-preset='info']) {
      --acp-rc-accent: #3b82f6;
    }
    /* light y dark usan primary por defecto, no necesitan override */

    /* ---------- Tamaños (medium por defecto) ---------- */
    :host {
      --acp-rc-padding: 16px;
      --acp-rc-gap: 12px;
      --acp-rc-min-height: 80px;
      --acp-rc-font-size: 0.875rem;
      --acp-rc-desc-font-size: 0.8125rem;
      --acp-rc-icon-size: 24px;
      --acp-rc-radio-scale: 1;
      --acp-rc-radius: var(--acp-skin-radius, 10px);
      display: block;
      outline: none;
    }

    :host([data-size='x-small']) {
      --acp-rc-padding: 6px 10px;
      --acp-rc-gap: 6px;
      --acp-rc-min-height: 40px;
      --acp-rc-font-size: 0.75rem;
      --acp-rc-desc-font-size: 0.6875rem;
      --acp-rc-icon-size: 16px;
      --acp-rc-radio-scale: 0.7;
      --acp-rc-radius: calc(var(--acp-skin-radius, 10px) - 2px);
    }

    :host([data-size='small']) {
      --acp-rc-padding: 10px 12px;
      --acp-rc-gap: 8px;
      --acp-rc-min-height: 56px;
      --acp-rc-font-size: 0.8125rem;
      --acp-rc-desc-font-size: 0.75rem;
      --acp-rc-icon-size: 20px;
      --acp-rc-radio-scale: 0.85;
      --acp-rc-radius: var(--acp-skin-radius, 10px);
    }

    :host([data-size='large']) {
      --acp-rc-padding: 20px 24px;
      --acp-rc-gap: 16px;
      --acp-rc-min-height: 104px;
      --acp-rc-font-size: 1rem;
      --acp-rc-desc-font-size: 0.875rem;
      --acp-rc-icon-size: 32px;
      --acp-rc-radio-scale: 1.15;
      --acp-rc-radius: calc(var(--acp-skin-radius, 10px) + 6px);
    }

    :host(:focus-visible) .acp-radio-card {
      outline: 2px solid var(--acp-rc-accent);
      outline-offset: 2px;
    }

    /* El atributo de encapsulación sube la especificidad a (0,2,0), suficiente
       para ganarle a .mat-mdc-card-outlined sin !important */
    .acp-radio-card {
      cursor: pointer;
      min-height: var(--acp-rc-min-height);
      border-radius: var(--acp-rc-radius);
      border: 1px solid var(--mat-sys-outline-variant, #dee2e6);
      /* --acp-rc-bg / --acp-rc-text vienen de los inputs (tarjeta o grupo) */
      background-color: var(--acp-rc-bg, var(--mat-sys-surface, #fff));
      color: var(--acp-rc-text, var(--mat-sys-on-surface, inherit));
      transition:
        box-shadow 200ms,
        border-color 200ms,
        background-color 200ms;
    }

    .acp-radio-card.acp-radio-card--checked {
      border-color: var(--acp-rc-accent);
      box-shadow: 0 0 0 1px var(--acp-rc-accent);
      background-color: var(--acp-rc-bg-checked, var(--acp-rc-bg, var(--mat-sys-surface, #fff)));
    }

    /* Relleno tonal: usa el "container" del color elegido */
    :host([data-tonal]) .acp-radio-card.acp-radio-card--checked {
      background-color: var(--acp-rc-bg-checked, var(--acp-rc-container));
      color: var(--acp-rc-text, var(--acp-rc-on-container));
    }

    :host([data-tonal]) .acp-radio-card--checked .acp-radio-card__description {
      color: inherit;
      opacity: 0.8;
    }

    .acp-radio-card.acp-radio-card--disabled {
      cursor: default;
      opacity: 0.5;
    }

    .acp-radio-card__body {
      display: flex;
      align-items: center;
      gap: var(--acp-rc-gap);
      padding: var(--acp-rc-padding);
      min-height: inherit;
      box-sizing: border-box;
    }

    .acp-radio-card__radio {
      margin: 0;
      flex-shrink: 0;
      pointer-events: none; /* los clics los recibe el host */
      transform: scale(var(--acp-rc-radio-scale));
    }

    /* El radio de Material toma el color elegido (tokens v17-v18 y v19+) */
    .acp-radio-card .acp-radio-card__radio {
      --mdc-radio-selected-icon-color: var(--acp-rc-accent);
      --mdc-radio-selected-hover-icon-color: var(--acp-rc-accent);
      --mdc-radio-selected-focus-icon-color: var(--acp-rc-accent);
      --mdc-radio-selected-pressed-icon-color: var(--acp-rc-accent);
      --mat-radio-selected-icon-color: var(--acp-rc-accent);
      --mat-radio-selected-hover-icon-color: var(--acp-rc-accent);
      --mat-radio-selected-focus-icon-color: var(--acp-rc-accent);
      --mat-radio-selected-pressed-icon-color: var(--acp-rc-accent);
    }

    .acp-radio-card__icon {
      flex-shrink: 0;
      font-size: var(--acp-rc-icon-size);
      width: var(--acp-rc-icon-size);
      height: var(--acp-rc-icon-size);
      line-height: var(--acp-rc-icon-size);
      color: var(--mat-sys-on-surface-variant, #6c757d);
    }

    .acp-radio-card--checked .acp-radio-card__icon {
      color: var(--acp-rc-accent);
    }

    .acp-radio-card__content {
      flex: 1;
      min-width: 0;
    }

    .acp-radio-card__label-text {
      display: block;
      font-weight: 500;
      font-size: var(--acp-rc-font-size);
    }

    .acp-radio-card__description {
      display: block;
      font-size: var(--acp-rc-desc-font-size);
      color: var(--mat-sys-on-surface-variant, #6c757d);
    }

    .acp-radio-card__description:empty {
      display: none;
    }
  `,
  host: {
    role: 'radio',
    class: 'acp-radio-card-host',
    '[attr.data-size]': 'resolvedSize()',
    '[attr.data-color]': 'resolvedColor()',
    '[attr.data-accent-preset]': 'resolvedAccentColor() ? backgroundPreset() : null',
    '[attr.data-tonal]': "resolvedTonal() ? '' : null",
    // Si la tarjeta no define fondo, hereda el del grupo (variables CSS heredables)
    '[style.--acp-rc-accent]': 'resolvedAccentColor() ?? null',
    '[style.--acp-rc-bg]': 'resolvedBackground() ?? null',
    '[style.--acp-rc-bg-checked]': 'resolvedCheckedBackground() ?? null',
    '[style.--acp-rc-text]': 'resolvedTextColor() ?? null',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '(click)': 'select()',
    '(keydown.space)': 'select(); $event.preventDefault()',
    '(keydown.enter)': 'select(); $event.preventDefault()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcpRadioCard {
  protected readonly group = injectGroup();

  readonly value = input.required<unknown>();
  readonly label = input('');
  readonly icon = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Si no se indica, hereda el tamaño del grupo. */
  readonly size = input<AcpRadioCardSize>();

  /** Si no se indica, hereda el color del grupo. */
  readonly color = input<AcpRadioCardColor>();
  /** Si no se indica, hereda `tonal` del grupo. */
  readonly tonal = input<boolean | undefined, unknown>(undefined, { transform: optionalBoolean });
  /** Preset de fondo propio (sobrescribe el del grupo). */
  readonly backgroundPreset = input<AcpRadioCardBackgroundPreset>();
  /** Fondo propio de esta tarjeta (sobrescribe el del grupo). */
  readonly background = input<string>();
  /** Fondo propio cuando está seleccionada (sobrescribe el del grupo). */
  readonly checkedBackground = input<string>();
  /** Color de texto propio de esta tarjeta. */
  readonly textColor = input<string>();

  readonly resolvedSize = computed(() => this.size() ?? this.group.size());
  readonly resolvedColor = computed(() => this.color() ?? this.group.color());
  readonly resolvedTonal = computed(() => this.tonal() ?? this.group.tonal());
  readonly resolvedAccentColor = computed(() => {
    // Si la tarjeta tiene un color explícito, no usa el preset.
    if (this.color()) return undefined;
    // Si el grupo tiene un color explícito, no usa el preset.
    if (this.group.color()) return undefined;
    // Si el grupo tiene un preset, usa su color de acento.
    return this.group.resolvedAccentColor();
  });

  /** Derivado del grupo: nunca se desincroniza. */
  readonly checked = computed(() => this.group.isSelected(this.value()));
  readonly isDisabled = computed(() => this.disabled() || this.group.isDisabled());

  // --- Presets de fondo ---
  readonly resolvedBackground = computed(() => {
    if (this.background()) return this.background();
    const preset = this.backgroundPreset();
    if (preset) return BACKGROUND_PRESETS[preset];
    return this.group.resolvedBackground();
  });
  readonly resolvedCheckedBackground = computed(() => {
    if (this.checkedBackground()) return this.checkedBackground();
    const preset = this.backgroundPreset();
    if (preset) return CHECKED_BACKGROUND_PRESETS[preset];
    return undefined;
  });
  readonly resolvedTextColor = computed(() => {
    if (this.textColor()) return this.textColor();
    const preset = this.backgroundPreset();
    if (preset) return TEXT_PRESETS[preset];
    return undefined;
  });

  protected select(): void {
    if (!this.isDisabled()) this.group.select(this.value());
  }
}

// Colores de acento por preset: el borde, icono y radio toman este color.
// Misma paleta que acp-button: colores fijos distinguibles.
// Se aplica cuando no hay un `color` explícito.
const PRESET_ACCENT: Record<AcpRadioCardBackgroundPreset, string> = {
  success: '#4caf50',
  warning: '#f59e0b',
  info: '#3b82f6',
  light: 'var(--mat-sys-primary, #1976d2)',
  dark: 'var(--mat-sys-primary, #1976d2)',
};

// Presets de fondo: cada preset usa una paleta coherente con su color de acento.
// Los colores hex son fallbacks; las variables CSS permiten dark mode.
const BACKGROUND_PRESETS: Record<AcpRadioCardBackgroundPreset, string> = {
  success: 'light-dark(#f0fdf4, #052e16)',
  warning: 'light-dark(#fffbeb, #451a03)',
  info: 'light-dark(#eff6ff, #172554)',
  light: 'light-dark(#f9fafb, #374151)',
  dark: 'light-dark(#f3f4f6, #1f2937)',
};

const CHECKED_BACKGROUND_PRESETS: Record<AcpRadioCardBackgroundPreset, string> = {
  success: 'light-dark(#dcfce7, #14532d)',
  warning: 'light-dark(#fef3c7, #78350f)',
  info: 'light-dark(#dbeafe, #1e40af)',
  light: 'light-dark(#f3f4f6, #4b5563)',
  dark: 'light-dark(#e5e7eb, #111827)',
};

const TEXT_PRESETS: Record<AcpRadioCardBackgroundPreset, string> = {
  success: 'light-dark(#166534, #bbf7d0)',
  warning: 'light-dark(#92400e, #fde68a)',
  info: 'light-dark(#1d4ed8, #bfdbfe)',
  light: 'light-dark(#1f2937, #f9fafb)',
  dark: 'light-dark(#374151, #f3f4f6)',
};

function injectGroup(): AcpRadioCardGroup {
  const group = inject(AcpRadioCardGroup, { optional: true });
  if (!group) {
    throw new Error('<acp-radio-card> debe usarse dentro de <acp-radio-card-group>.');
  }
  return group;
}
