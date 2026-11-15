import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Vanilla Date Range Picker - Con Time Picker</mat-card-title>
    <mat-card-subtitle>Selecciona rango de fechas con hora (formato 24h)</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <acp-vanilla-date-range-picker
        label="Selecciona fecha y hora"
        [from]="from"
        [to]="to"
        [options]="{ timePicker: true, format: 'YYYY-MM-DD HH:mm:ss' }"
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
  selector: 'app-vanilla-date-range-time-picker-example',
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

const vanillaDateRangeTimePickerExampleConfig = {
  title: 'Con Time Picker',
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

export { vanillaDateRangeTimePickerExampleConfig };
