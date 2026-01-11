import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>DateRangePicker Básico</mat-card-title>
    <mat-card-subtitle>Ejemplo básico usando el componente Angular</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <!-- Componente DateRangePicker -->
      <acp-date-range-picker
        [ranges]="ranges"
        [presetTheme]="currentTheme"
        [autoApply]="false"
        [showDropdowns]="true"
        [linkedCalendars]="true"
        [showCustomRangeLabel]="true"
        placeholderText="Selecciona un rango de fechas"
        (dateRangeSelected)="onDateRangeSelected($event)"
      ></acp-date-range-picker>

      <!-- Resultado de la selección -->
      <div class="result-display">
        <h4>Resultado de la selección:</h4>
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

      <!-- Controles de tema -->
      <div class="theme-controls">
        <h4>Cambiar tema:</h4>
        <div class="theme-buttons">
          <button
            mat-raised-button
            [color]="currentTheme === 'default' ? 'primary' : ''"
            (click)="switchTheme('default')"
          >
            Default
          </button>
          <button
            mat-raised-button
            [color]="currentTheme === 'bootstrap' ? 'primary' : ''"
            (click)="switchTheme('bootstrap')"
          >
            Bootstrap
          </button>
          <button
            mat-raised-button
            [color]="currentTheme === 'material' ? 'primary' : ''"
            (click)="switchTheme('material')"
          >
            Material
          </button>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`;

const appTs = `import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    DateRangePicker,
  ],
})
export class App {
  // Propiedades para mostrar los valores seleccionados
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;
  currentTheme: 'default' | 'bootstrap' | 'material' = 'material';

  // Rangos predefinidos
  ranges = {
    'Hoy': [new Date(), new Date()] as [Date, Date],
    'Ayer': [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date(Date.now() - 24 * 60 * 60 * 1000)] as [Date, Date],
    'Últimos 7 días': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
    'Últimos 30 días': [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ] as [Date, Date],
  } as Record<string, [Date, Date]>;

  // Manejador de eventos cuando se selecciona un rango
  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
  }

  // Cambiar tema
  switchTheme(themeName: 'default' | 'bootstrap' | 'material') {
    this.currentTheme = themeName;
  }
}`;

const appScss = `.example-card {
  max-width: 800px;
  margin: 20px auto;

  .example-container {
    padding: 16px 0;

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    .form-section {
      margin: 30px 0;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;

      h4 {
        margin-bottom: 16px;
        color: #495057;
      }

      .form-value {
        margin-top: 16px;

        h5 {
          margin-bottom: 8px;
          color: #6c757d;
        }

        pre {
          background-color: #fff;
          padding: 12px;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          font-size: 12px;
          overflow-x: auto;
        }
      }
    }

    .result-display {
      margin: 30px 0;
      padding: 20px;
      background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
      border-radius: 12px;

      h4 {
        margin-bottom: 16px;
        color: #1976d2;
      }

      .result-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;

        .result-item {
          padding: 12px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          border-left: 4px solid #1976d2;

          strong {
            display: block;
            color: #1565c0;
            margin-bottom: 4px;
          }

          span {
            color: #424242;
            font-size: 14px;
          }
        }
      }
    }

    .theme-controls {
      margin-top: 30px;
      padding: 20px;
      background-color: #fff3e0;
      border-radius: 8px;

      h4 {
        margin-bottom: 16px;
        color: #ef6c00;
      }

      .theme-buttons {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;

        button {
          min-width: 100px;
        }
      }
    }
  }
}`;

const dateRangePickerBasicExampleConfig = {
  title: 'Básico',
  component: App,
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

export { dateRangePickerBasicExampleConfig };
