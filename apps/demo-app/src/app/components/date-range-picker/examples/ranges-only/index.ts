import { RangesOnlyApp } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Ranges Only Picker</mat-card-title>
    <mat-card-subtitle>Solo rangos predefinidos con opción personalizada</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Seleccionar rango predefinido</mat-label>
        <input
          matInput
          id="ranges-only-input"
          placeholder="Elige un rango predefinido"
          readonly
        />
        <mat-hint>Muestra solo rangos, calendario opcional</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Rango seleccionado:</h4>
        <div class="range-info">
          <mat-chip-set>
            <mat-chip color="primary" selected>{{ selectedLabel || 'Personalizado' }}</mat-chip>
          </mat-chip-set>

          <div class="date-range">
            <div class="date-item">
              <span class="label">Desde:</span>
              <span class="value">{{ selectedStartDate | date:'dd/MM/yyyy' }}</span>
            </div>
            <div class="date-separator">→</div>
            <div class="date-item">
              <span class="label">Hasta:</span>
              <span class="value">{{ selectedEndDate | date:'dd/MM/yyyy' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`;

const appTs = `import { Component, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateRangePicker,
  SPANISH_LOCALE,
  MATERIAL_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-ranges-only-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatChipsModule],
})
export class RangesOnlyApp implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeDateRangePicker();
    }, 0);
  }

  ngOnDestroy() {
    if (this.dateRangePicker) {
      this.dateRangePicker.remove();
    }
  }

  private initializeDateRangePicker() {
    const input = document.getElementById('ranges-only-input') as HTMLInputElement;
    if (!input) return;

    const today = new Date();

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        autoApply: true,
        alwaysShowCalendars: false, // Solo rangos
        showCustomRangeLabel: true,
        theme: MATERIAL_THEME,
        ranges: {
          Hoy: [today, today],
          Ayer: [addDay(today, -1), addDay(today, -1)],
          'Últimos 7 días': [addDay(today, -7), today],
        },
      },
      (startDate: Date, endDate: Date, label?: string) => {
        this.ngZone.run(() => {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.selectedLabel = label || null;
        });
      },
    );
  }
}`;

const appScss = `.example-card {
  max-width: 600px;
  margin: 20px auto;

  .result-display {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%);
    border-radius: 12px;

    .range-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      .date-range {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 16px;
        align-items: center;

        .date-item .value {
          font-size: 16px;
          font-weight: 600;
          color: #1976d2;
          font-family: monospace;
        }
      }
    }
  }
}`;

const dateRangePickerRangesOnlyExampleConfig = {
  title: 'Solo Rangos',
  component: RangesOnlyApp,
  files: [
    {
      file: 'app.html',
      content: hljs.highlightAuto(appHtml).value,
      filecontent: appHtml,
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs).value,
      filecontent: appTs,
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss).value,
      filecontent: appScss,
    },
  ],
};

export { dateRangePickerRangesOnlyExampleConfig };
