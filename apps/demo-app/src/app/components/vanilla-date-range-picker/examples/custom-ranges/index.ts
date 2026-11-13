import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Vanilla Date Range Picker - Con Checkbox</mat-card-title>
    <mat-card-subtitle>Ejemplo con checkbox y opción requiredDate</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <acp-vanilla-date-range-picker
        label="Selecciona un rango de fechas"
        [from]="from"
        [to]="to"
        [options]="{ timePicker: false, format: 'YYYY-MM-DD' }"
        [showMatPrefix]="true"
        [(checkbox)]="checkbox"
        [requiredDate]="true"
        (dateRangeChange)="onDateRangeChanged($event)"
        (checkboxToggled)="onCheckboxToggled()"
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
          <div class="result-item">
            <strong>Checkbox:</strong>
            <span>{{ checkbox }}</span>
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
  selector: 'app-vanilla-date-range-custom-ranges-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [MatCardModule, AcpVanillaDateRangePicker],
})
export class App {
  from: string | null = null;
  to: string | null = null;
  checkbox = false;

  onDateRangeChanged(range: { from: string; to: string }) {
    this.from = range.from;
    this.to = range.to;
  }

  onCheckboxToggled() {
    console.log('Checkbox changed:', this.checkbox);
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
      background: linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%);
      border-radius: 12px;

      h4 {
        margin-bottom: 16px;
        color: #e65100;
      }

      .result-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;

        .result-item {
          padding: 12px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          border-left: 4px solid #e65100;

          strong {
            display: block;
            color: #bf360c;
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

const vanillaDateRangeCustomRangesExampleConfig = {
  title: 'Rangos Personalizados',
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

export { vanillaDateRangeCustomRangesExampleConfig };
