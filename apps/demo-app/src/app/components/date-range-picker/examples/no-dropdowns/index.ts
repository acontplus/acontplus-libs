import { NoDropdownsApp } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>No Dropdowns Picker</mat-card-title>
    <mat-card-subtitle>Navegación solo con flechas, sin selectores de mes/año</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Navegación con flechas</mat-label>
        <input
          matInput
          id="no-dropdowns-input"
          placeholder="Solo navegación con flechas"
          readonly
        />
        <mat-icon matSuffix>keyboard_arrow_left</mat-icon>
        <mat-hint>Usa las flechas ← → para navegar entre meses</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Navegación simplificada:</h4>
        <div class="navigation-info">
          <div class="info-item">
            <mat-icon>touch_app</mat-icon>
            <div class="info-content">
              <strong>Navegación:</strong>
              <span>Solo flechas ← → para cambiar mes/año</span>
            </div>
          </div>

          <div class="info-item">
            <mat-icon>event</mat-icon>
            <div class="info-content">
              <strong>Selección:</strong>
              <span>{{ selectedStartDate | date:'dd/MM/yyyy' }} - {{ selectedEndDate | date:'dd/MM/yyyy' }}</span>
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
import { MatIconModule } from '@angular/material/icon';
import {
  DateRangePicker,
  SPANISH_LOCALE,
  BOOTSTRAP_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-no-dropdowns-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule],
})
export class NoDropdownsApp implements AfterViewInit, OnDestroy {
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
    const input = document.getElementById('no-dropdowns-input') as HTMLInputElement;
    if (!input) return;

    const today = new Date();

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        showDropdowns: false, // Sin dropdowns
        autoApply: false,
        linkedCalendars: true,
        theme: BOOTSTRAP_THEME,
        ranges: {
          Hoy: [today, today],
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
    background: linear-gradient(135deg, #fff8e1 0%, #f3e5f5 100%);
    border-radius: 12px;

    .navigation-info {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .info-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        border-left: 4px solid #ff9800;
      }
    }
  }
}`;

const dateRangePickerNoDropdownsExampleConfig = {
  title: 'Sin Dropdowns',
  component: NoDropdownsApp,
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

export { dateRangePickerNoDropdownsExampleConfig };
