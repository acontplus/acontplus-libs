import { Component, inject, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { AppSettings, AppThemeColor } from '../../core/settings';
import { SettingsService } from '../../core/settings.service';

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatRadioModule, MatTooltipModule],
  template: `
    <div class="customizer-panel">
      <h3>Theme Settings</h3>

      <div class="setting-group">
        <label>Theme Color</label>
        <div class="color-options">
          @for (color of themeColors; track color.value) {
            <button
              class="color-btn"
              [class.active]="form.value.themeColor === color.value"
              [matTooltip]="color.tooltip"
              (click)="setThemeColor(color.value)"
              [style.background-color]="color.color"
              [attr.aria-label]="color.label"
            ></button>
          }
        </div>
      </div>

      <div class="setting-group">
        <label>Theme Mode</label>
        <mat-radio-group [formControl]="form.controls.theme">
          <mat-radio-button value="light">Light</mat-radio-button>
          <mat-radio-button value="dark">Dark</mat-radio-button>
          <mat-radio-button value="auto">Auto</mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
  `,
  styles: [
    `
      .customizer-panel {
        padding: 20px;
        background: var(--mat-sys-surface-container);
        border-radius: 8px;
        min-width: 280px;
      }

      h3 {
        margin: 0 0 20px;
        font-size: 18px;
        font-weight: 500;
        color: var(--mat-sys-on-surface);
      }

      .setting-group {
        margin-bottom: 24px;
      }

      label {
        display: block;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        color: var(--mat-sys-on-surface-variant);
      }

      .color-options {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .color-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--mat-sys-outline);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      }

      .color-btn:hover {
        transform: scale(1.1);
        border-color: var(--mat-sys-primary);
      }

      .color-btn.active {
        border-color: var(--mat-sys-primary);
        box-shadow:
          0 0 0 2px var(--mat-sys-surface),
          0 0 0 4px var(--mat-sys-primary);
      }

      mat-radio-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      ::ng-deep mat-radio-button {
        display: block;
      }
    `,
  ],
})
export class Customizer {
  private settings = inject(SettingsService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group<AppSettings>(this.settings.options());

  themeColors: { value: AppThemeColor; label: string; tooltip: string; color: string }[] = [
    { value: 'blue', label: 'Blue', tooltip: 'Blue (Corporativo)', color: '#1b84ff' },
    { value: 'aqua', label: 'Aqua', tooltip: 'Aqua (Profesional)', color: '#0074ba' },
    { value: 'purple', label: 'Purple', tooltip: 'Purple (Premium)', color: '#763ebd' },
    { value: 'green', label: 'Green', tooltip: 'Green (Enterprise)', color: '#0a7ea4' },
    { value: 'cyan', label: 'Cyan', tooltip: 'Cyan (Tecnológico)', color: '#01c0c8' },
    { value: 'orange', label: 'Orange', tooltip: 'Orange (Energético)', color: '#fa896b' },
    { value: 'pink', label: 'Pink', tooltip: 'Pink (Moderno)', color: '#d200d2' },
    { value: 'rose', label: 'Rose', tooltip: 'Rose (Elegante)', color: '#e80074' },
  ];

  constructor() {
    this.form.valueChanges.subscribe(value => {
      this.settings.setOptions(value);
    });
  }

  setThemeColor(themeColor: AppThemeColor) {
    this.form.patchValue({ themeColor });
  }
}
