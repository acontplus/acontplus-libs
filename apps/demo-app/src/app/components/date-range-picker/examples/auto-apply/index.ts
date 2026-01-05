import { AutoApplyApp } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Auto-Apply DateRangePicker</mat-card-title>
    <mat-card-subtitle>Selección automática sin botones Aplicar/Cancelar</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Seleccionar rango de fechas</mat-label>
        <input
          matInput
          id="auto-apply-input"
          placeholder="Haz clic para seleccionar"
          readonly
        />
        <mat-hint>La selección se aplica automáticamente</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Resultado:</h4>
        <div class="result-grid">
          <div class="result-item">
            <strong>Fecha inicio:</strong>
            <span>{{ selectedStartDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="result-item">
            <strong>Fecha fin:</strong>
            <span>{{ selectedEndDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="result-item">
            <strong>Etiqueta:</strong>
            <span>{{ selectedLabel || 'Personalizado' }}</span>
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
import {
  DateRangePicker,
  SPANISH_LOCALE,
  BOOTSTRAP_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-auto-apply-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule],
})
export class AutoApplyApp implements AfterViewInit, OnDestroy {
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
    const input = document.getElementById('auto-apply-input') as HTMLInputElement;

    if (!input) return;

    const today = new Date();
    const yesterday = addDay(today, -1);
    const last7Days = addDay(today, -7);

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        autoApply: true, // Sin botones
        showDropdowns: true,
        theme: BOOTSTRAP_THEME,
        ranges: {
          Hoy: [today, today],
          Ayer: [yesterday, yesterday],
          'Últimos 7 días': [last7Days, today],
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

  .example-container {
    padding: 16px 0;

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    .result-display {
      margin-top: 20px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
  }
}`;

const dateRangePickerAutoApplyExampleConfig = {
  title: 'Auto-Apply',
  component: AutoApplyApp,
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

export { dateRangePickerAutoApplyExampleConfig };
