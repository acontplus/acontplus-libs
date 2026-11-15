import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Date Range Input Básico</mat-card-title>
    <mat-card-subtitle>Ejemplo básico usando el componente AcpDateRangeInput</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <!-- Componente Date Range Input -->
      <acp-date-range-input
        inputLabel="Selecciona un rango de fechas"
        [dateFormat]="'dd/MM/yyyy'"
        (dateSelectionChanged)="onDateSelectionChanged($event)"
      ></acp-date-range-input>

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
    </div>
  </mat-card-content>
</mat-card>`;

const appTs = `import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AcpDateRangeInput, type AcpSelectedDateEvent } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-input-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.styles',
  imports: [
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    AcpDateRangeInput,
  ],
})
export class App {
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  selectedLabel: string | null = null;

  onDateSelectionChanged(event: AcpSelectedDateEvent) {
    this.selectedStartDate = event.range?.start || null;
    this.selectedEndDate = event.range?.end || null;
    this.selectedLabel = event.selectedOption?.optionLabel || null;
  }
}`;

const appScss = `.example-card {
  max-width: 800px;
  margin: 20px auto;

  .example-container {
    padding: 16px 0;

    .result-display {
      margin: 30px 0;
      padding: 20px;
      background: var(--mat-sys-surface-container-low);
      border-radius: var(--mat-sys-corner-small);

      h4 {
        margin-bottom: 16px;
        color: var(--mat-sys-primary);
      }

      .result-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;

        .result-item {
          padding: 12px;
          background-color: var(--mat-sys-surface);
          border-radius: var(--mat-sys-corner-small);
          border-inline-start: 4px solid var(--mat-sys-primary);

          strong {
            display: block;
            color: var(--mat-sys-on-surface);
            margin-bottom: 4px;
          }

          span {
            color: var(--mat-sys-on-surface-variant);
            font: var(--mat-sys-body-medium);
          }
        }
      }
    }
  }
}`;

const dateRangeInputBasicExampleConfig = {
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
      file: 'app.styles',
      content: hljs.highlightAuto(appScss).value,
      filecontent: { default: appScss },
    },
  ],
};

export { dateRangeInputBasicExampleConfig };
