import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Vanilla Date Range Picker - Básico</mat-card-title>
    <mat-card-subtitle>Ejemplo básico con rangos predefinidos y calendarios duales</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <acp-vanilla-date-range-picker
        label="Selecciona un rango de fechas"
        [from]="from"
        [to]="to"
        [options]="{ timePicker: false, format: 'YYYY-MM-DD' }"
        (dateRangeChange)="onDateRangeChanged($event)"
      ></acp-vanilla-date-range-picker>

      <div class="result-display">
        <h4>Resultado de la selección:</h4>
        <div class="result-grid">
          <div class="result-item">
            <strong>Fecha inicio:</strong>
            <span>{{ from || 'No seleccionada' }}</span>
          </div>
          <div class="result-item">
            <strong>Fecha fin:</strong>
            <span>{{ to || 'No seleccionada' }}</span>
          </div>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`;

const appTs = `import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AcpVanillaDateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-vanilla-date-range-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [MatCardModule, AcpVanillaDateRangePicker],
})
export class App {
  from: string | null = null;
  to: string | null = null;

  onDateRangeChanged(range: { from: string; to: string }) {
    this.from = range.from;
    this.to = range.to;
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
  }
}`;

const vanillaDateRangeBasicExampleConfig = {
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

export { vanillaDateRangeBasicExampleConfig };
