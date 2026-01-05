import { SingleDateApp } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Single Date Picker</mat-card-title>
    <mat-card-subtitle>Selector de fecha única con Material Design</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Seleccionar fecha</mat-label>
        <input
          matInput
          id="single-date-input"
          placeholder="Selecciona una fecha"
          readonly
        />
        <mat-hint>Solo se puede seleccionar una fecha</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Fecha seleccionada:</h4>
        <div class="selected-date">
          <span class="date-value">{{ selectedDate | date:'EEEE, dd MMMM yyyy':'es' }}</span>
          <span class="date-format">{{ selectedDate | date:'dd/MM/yyyy' }}</span>
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
  MATERIAL_THEME,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-single-date-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule],
})
export class SingleDateApp implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;
  selectedDate: Date = new Date();

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
    const input = document.getElementById('single-date-input') as HTMLInputElement;
    if (!input) return;

    const today = new Date();

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        singleDatePicker: true, // Solo una fecha
        autoApply: true,
        showDropdowns: true,
        theme: MATERIAL_THEME,
      },
      (startDate: Date) => {
        this.ngZone.run(() => {
          this.selectedDate = startDate;
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
    background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
    border-radius: 12px;
    text-align: center;

    .selected-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .date-value {
        font-size: 18px;
        font-weight: 600;
        color: #1976d2;
        text-transform: capitalize;
      }
    }
  }
}`;

const dateRangePickerSingleDateExampleConfig = {
  title: 'Fecha Única',
  component: SingleDateApp,
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

export { dateRangePickerSingleDateExampleConfig };
