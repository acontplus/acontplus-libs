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
      <!-- Componente DateRangePicker -->
      <acp-date-range-picker
        [autoApply]="true"
        [alwaysShowCalendars]="false"
        [showCustomRangeLabel]="true"
        [theme]="MATERIAL_THEME"
        [ranges]="ranges"
        [locale]="SPANISH_LOCALE"
        placeholderText="Elige un rango predefinido"
        (dateRangeSelected)="onDateRangeSelected($event)"
      ></acp-date-range-picker>

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

  <mat-card-actions>
    <div class="config-info">
      <h4>Configuración:</h4>
      <pre><code>{{'{'}}{{'{'}}
  autoApply: true,
  alwaysShowCalendars: false,
  showCustomRangeLabel: true,
  theme: MATERIAL_THEME,
  ranges: {{'{'}}{{'{'}}
    'Hoy': [today, today],
    'Ayer': [yesterday, yesterday],
    'Últimos 3 días': [last3Days, today],
    'Últimos 7 días': [last7Days, today],
    'Últimos 15 días': [last15Days, today],
    'Este mes': [thisMonthStart, today]
  {{'}'}}{{'}'}}
{{'}'}}{{'}'}}</code></pre>
    </div>
  </mat-card-actions>
</mat-card>`;

const appTs = `import { Component, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DateRangePicker, SPANISH_LOCALE, MATERIAL_THEME } from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-ranges-only-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    DateRangePicker,
  ],
})
export class RangesOnlyApp implements AfterViewInit {
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  // Expose constants for template
  SPANISH_LOCALE = SPANISH_LOCALE;
  MATERIAL_THEME = MATERIAL_THEME;

  ngAfterViewInit() {
    // No longer needed - Angular component handles initialization
    const today = new Date();
    this.selectedStartDate = today;
    this.selectedEndDate = today;
    this.selectedLabel = 'Hoy';
  }

  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
  }

  // Configuration for the Angular component
  get ranges(): Record<string, [Date, Date]> {
    const today = new Date();
    const yesterday = addDay(today, -1);
    const last3Days = addDay(today, -3);
    const last7Days = addDay(today, -7);
    const last15Days = addDay(today, -15);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      'Hoy': [today, today] as [Date, Date],
      'Ayer': [yesterday, yesterday] as [Date, Date],
      'Últimos 3 días': [last3Days, today] as [Date, Date],
      'Últimos 7 días': [last7Days, today] as [Date, Date],
      'Últimos 15 días': [last15Days, today] as [Date, Date],
      'Este mes': [thisMonthStart, today] as [Date, Date],
    };
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
      filecontent: { default: appHtml },
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs).value,
      filecontent: { default: appTs },
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss).value,
      filecontent: { default: appScss },
    },
  ],
};

export { dateRangePickerRangesOnlyExampleConfig };
