import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ACP_CONTROL_SIZES, ACP_LAYOUT_RADIUS_RANGE, AcpDrawerRef } from '@acontplus/ng-components';
import { AppSettings, THEME_COLORS } from '../../core/settings';
import { SettingsService } from '../../core/settings.service';

interface ToggleOption<T> {
  value: T;
  label: string;
  icon: string;
}

/** Theme settings panel, opened in a drawer from the navbar (like MaterialPro's customizer). */
@Component({
  selector: 'app-customizer',
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
  ],
  template: `
    <header class="customizer__header">
      <h2>Settings</h2>
      @if (drawerRef) {
        <button matIconButton aria-label="Close settings" (click)="drawerRef.dismiss()">
          <mat-icon>close</mat-icon>
        </button>
      }
    </header>

    <div class="customizer__body">
      <section>
        <h3>Theme option</h3>
        <mat-button-toggle-group
          aria-label="Theme option"
          [value]="options().theme"
          (change)="set('theme', $event.value)"
        >
          @for (option of themeOptions; track option.value) {
            <mat-button-toggle [value]="option.value">
              <mat-icon>{{ option.icon }}</mat-icon>
              {{ option.label }}
            </mat-button-toggle>
          }
        </mat-button-toggle-group>
      </section>

      <section>
        <h3>Theme direction</h3>
        <mat-button-toggle-group
          aria-label="Theme direction"
          [value]="options().dir"
          (change)="set('dir', $event.value)"
        >
          @for (option of dirOptions; track option.value) {
            <mat-button-toggle [value]="option.value">
              <mat-icon>{{ option.icon }}</mat-icon>
              {{ option.label }}
            </mat-button-toggle>
          }
        </mat-button-toggle-group>
      </section>

      <section>
        <h3>Theme colors</h3>
        <div class="customizer__colors" role="radiogroup" aria-label="Theme colors">
          @for (color of themeColors; track color) {
            <button
              type="button"
              role="radio"
              class="customizer__swatch theme-{{ color }}"
              [class.customizer__swatch--active]="options().themeColor === color"
              [attr.aria-checked]="options().themeColor === color"
              [attr.aria-label]="color"
              [matTooltip]="color"
              (click)="set('themeColor', color)"
            >
              @if (options().themeColor === color) {
                <mat-icon>check</mat-icon>
              }
            </button>
          }
        </div>
      </section>

      <section>
        <h3>Container option</h3>
        <mat-button-toggle-group
          aria-label="Container option"
          [value]="options().container"
          (change)="set('container', $event.value)"
        >
          @for (option of containerOptions; track option.value) {
            <mat-button-toggle [value]="option.value">
              <mat-icon>{{ option.icon }}</mat-icon>
              {{ option.label }}
            </mat-button-toggle>
          }
        </mat-button-toggle-group>
      </section>

      <section>
        <h3>Card with</h3>
        <mat-button-toggle-group
          aria-label="Card with"
          [value]="options().cardStyle"
          (change)="set('cardStyle', $event.value)"
        >
          @for (option of cardOptions; track option.value) {
            <mat-button-toggle [value]="option.value">
              <mat-icon>{{ option.icon }}</mat-icon>
              {{ option.label }}
            </mat-button-toggle>
          }
        </mat-button-toggle-group>
      </section>

      <section>
        <h3>Theme Border Radius</h3>
        <div class="customizer__radius">
          <mat-slider [min]="radiusRange.min" [max]="radiusRange.max" step="1" discrete>
            <input
              matSliderThumb
              aria-label="Theme Border Radius"
              [value]="options().radius"
              (valueChange)="set('radius', $event)"
            />
          </mat-slider>
          <span>{{ options().radius }}px</span>
        </div>
      </section>

      <section>
        <h3>Form Fields</h3>
        <mat-button-toggle-group
          aria-label="Form field appearance"
          [value]="options().fieldAppearance"
          (change)="set('fieldAppearance', $event.value)"
        >
          @for (option of fieldAppearanceOptions; track option.value) {
            <mat-button-toggle [value]="option.value">
              <mat-icon>{{ option.icon }}</mat-icon>
              {{ option.label }}
            </mat-button-toggle>
          }
        </mat-button-toggle-group>
      </section>

      <section>
        <h3>Form Field Size</h3>
        <mat-button-toggle-group
          aria-label="Form field size"
          [value]="options().controlSize"
          (change)="set('controlSize', $event.value)"
        >
          @for (size of controlSizes; track size) {
            <mat-button-toggle [value]="size">{{ size }}</mat-button-toggle>
          }
        </mat-button-toggle-group>
      </section>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .customizer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 16px 24px;
      border-bottom: 1px solid var(--mat-sys-outline-variant);

      h2 {
        margin: 0;
        font: var(--mat-sys-title-large);
        font-size: var(--acp-sys-heading-size, var(--mat-sys-title-large-size));
        font-weight: var(--acp-sys-heading-weight, 500);
      }
    }

    .customizer__body {
      display: flex;
      flex-direction: column;
      gap: 28px;
      padding: 24px;
    }

    h3 {
      margin: 0 0 12px;
      color: var(--mat-sys-on-surface);
      font: var(--mat-sys-title-small);
    }

    mat-button-toggle-group {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      width: 100%;
    }

    mat-button-toggle mat-icon {
      margin-inline-end: 6px;
      vertical-align: middle;
    }

    .customizer__radius {
      display: flex;
      gap: 12px;
      align-items: center;

      mat-slider {
        flex: 1;
        margin: 0;
      }

      span {
        min-width: 40px;
        font: var(--mat-sys-label-large);
        text-align: end;
      }
    }

    .customizer__colors {
      display: grid;
      grid-template-columns: repeat(4, 48px);
      gap: 12px;
    }

    .customizer__swatch {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      padding: 0;
      border: 0;
      border-radius: var(--mat-sys-corner-small);
      background: var(--acp-theme-primary-color, var(--mat-sys-primary));
      color: var(--mat-sys-on-primary);
      cursor: pointer;
      transition: transform 0.2s var(--acp-sys-easing-standard, ease);

      &:hover {
        transform: translateY(-2px);
      }

      &:focus-visible,
      &--active {
        outline: 2px solid var(--acp-theme-primary-color, var(--mat-sys-primary));
        outline-offset: 2px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Customizer {
  private readonly settings = inject(SettingsService);

  readonly drawerRef = inject<AcpDrawerRef<Customizer>>(AcpDrawerRef, { optional: true });

  readonly options = this.settings.options;
  readonly themeColors = THEME_COLORS;
  readonly radiusRange = ACP_LAYOUT_RADIUS_RANGE;
  readonly controlSizes = ACP_CONTROL_SIZES;

  readonly themeOptions: ToggleOption<AppSettings['theme']>[] = [
    { value: 'light', label: 'Light', icon: 'light_mode' },
    { value: 'dark', label: 'Dark', icon: 'dark_mode' },
    { value: 'auto', label: 'Auto', icon: 'contrast' },
  ];
  readonly dirOptions: ToggleOption<AppSettings['dir']>[] = [
    { value: 'ltr', label: 'LTR', icon: 'format_textdirection_l_to_r' },
    { value: 'rtl', label: 'RTL', icon: 'format_textdirection_r_to_l' },
  ];
  readonly containerOptions: ToggleOption<AppSettings['container']>[] = [
    { value: 'full', label: 'Full', icon: 'width_full' },
    { value: 'boxed', label: 'Boxed', icon: 'width_normal' },
  ];
  readonly fieldAppearanceOptions: ToggleOption<AppSettings['fieldAppearance']>[] = [
    { value: 'outline', label: 'Outline', icon: 'check_box_outline_blank' },
    { value: 'fill', label: 'Fill', icon: 'rectangle' },
  ];
  readonly cardOptions: ToggleOption<AppSettings['cardStyle']>[] = [
    { value: 'shadow', label: 'Shadow', icon: 'layers' },
    { value: 'border', label: 'Border', icon: 'crop_square' },
  ];

  set<K extends keyof AppSettings>(key: K, value: AppSettings[K]): void {
    this.settings.setOptions({ [key]: value } as Partial<AppSettings>);
  }
}
