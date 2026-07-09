import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Date Range Input con Expresiones Humanas</mat-card-title>
    <mat-card-subtitle>Ejemplo mostrando expresiones legibles por humanos</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <!-- Componente Date Range Input con expresiones humanas -->
      <acp-date-range-input
        inputLabel="Selecciona un rango de fechas"
        [dateFormat]="'dd/MM/yyyy'"
        [displaySelectedExpression]="true"
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
            <strong>Expresión inicio:</strong>
            <span>{{ startExpr || 'N/A' }}</span>
          </div>
          <div class="result-item">
            <strong>Expresión fin:</strong>
            <span>{{ endExpr || 'N/A' }}</span>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h4>Expresiones humanas:</h4>
        <p>Cuando se seleccionan opciones predefinidas, el input muestra expresiones legibles como:</p>
        <ul>
          <li><code>now - now</code> para "Hoy"</li>
          <li><code>now-1d - now-1d</code> para "Ayer"</li>
          <li><code>now-7d - now</code> para "Últimos 7 días"</li>
          <li><code>now-30d - now</code> para "Últimos 30 días"</li>
        </ul>
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
  selector: 'app-date-range-input-human-expressions-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
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
  startExpr: string | null = null;
  endExpr: string | null = null;

  onDateSelectionChanged(event: AcpSelectedDateEvent) {
    this.selectedStartDate = event.range?.start || null;
    this.selectedEndDate = event.range?.end || null;
    this.selectedLabel = event.selectedOption?.optionLabel || null;
    this.startExpr = event.startExpr;
    this.endExpr = event.endExpr;
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

    .info-box {
      margin: 30px 0;
      padding: 20px;
      background-color: #e8f5e9;
      border-radius: 8px;

      h4 {
        margin-bottom: 16px;
        color: #2e7d32;
      }

      p {
        margin-bottom: 12px;
        color: #424242;
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          color: #424242;

          code {
            background-color: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            color: #d32f2f;
          }
        }
      }
    }
  }
}`;

const dateRangeInputHumanExpressionsExampleConfig = {
  title: 'Expresiones Humanas',
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

export { dateRangeInputHumanExpressionsExampleConfig };
