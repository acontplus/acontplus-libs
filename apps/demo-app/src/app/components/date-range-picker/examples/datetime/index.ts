import { DateTimeApp } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>DateTime Range Picker</mat-card-title>
    <mat-card-subtitle>Selector de fecha y hora con formato 24h</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Seleccionar fecha y hora</mat-label>
        <input
          matInput
          id="datetime-input"
          placeholder="Selecciona fecha y hora"
          readonly
        />
        <mat-hint>Incluye selector de tiempo con incrementos de 15 minutos</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Resultado:</h4>
        <div class="datetime-grid">
          <div class="datetime-item">
            <mat-chip-set>
              <mat-chip>Inicio</mat-chip>
            </mat-chip-set>
            <div class="datetime-values">
              <span class="date">{{ selectedStartDate | date:'EEEE, dd MMM':'es' }}</span>
              <span class="time">{{ selectedStartDate | date:'HH:mm' }}</span>
            </div>
          </div>

          <div class="datetime-separator">→</div>

          <div class="datetime-item">
            <mat-chip-set>
              <mat-chip>Fin</mat-chip>
            </mat-chip-set>
            <div class="datetime-values">
              <span class="date">{{ selectedEndDate | date:'EEEE, dd MMM':'es' }}</span>
              <span class="time">{{ selectedEndDate | date:'HH:mm' }}</span>
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
  SPANISH_LOCALE_WITH_TIME,
  DEFAULT_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-datetime-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatChipsModule],
})
export class DateTimeApp implements AfterViewInit, OnDestroy {
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
    const input = document.getElementById('datetime-input') as HTMLInputElement;
    if (!input) return;

    const today = new Date();

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE_WITH_TIME,
        timePicker: true, // Habilitar tiempo
        timePicker24Hour: true, // 24 horas
        timePickerIncrement: 15, // 15 min
        autoApply: false,
        showDropdowns: true,
        theme: DEFAULT_THEME,
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
  max-width: 700px;
  margin: 20px auto;

  .result-display {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #fff3e0 0%, #e8f5e8 100%);
    border-radius: 12px;

    .datetime-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 16px;
      align-items: center;

      .datetime-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        .time {
          font-size: 20px;
          font-weight: 700;
          color: #2e7d32;
          font-family: monospace;
        }
      }
    }
  }
}`;

const dateRangePickerDateTimeExampleConfig = {
  title: 'DateTime',
  component: DateTimeApp,
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

export { dateRangePickerDateTimeExampleConfig };
