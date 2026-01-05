import { App } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<div class="date-range-picker-demo">
  <h3>Selector de Rango de Fechas Básico</h3>

  <div class="demo-section">
    <label for="daterange-input">Seleccionar rango de fechas:</label>
    <input type="text" id="daterange-input" class="form-control" placeholder="Selecciona un rango de fechas" />
  </div>

  <div class="demo-section">
    <h4>Configuración actual:</h4>
    <div class="config-display">
      <p><strong>Fecha inicio:</strong> {{ selectedStartDate | date:'dd/MM/yyyy' }}</p>
      <p><strong>Fecha fin:</strong> {{ selectedEndDate | date:'dd/MM/yyyy' }}</p>
      <p><strong>Etiqueta:</strong> {{ selectedLabel || 'Personalizado' }}</p>
    </div>
  </div>

  <div class="demo-section">
    <h4>Opciones disponibles:</h4>
    <ul>
      <li>Rangos predefinidos (Hoy, Ayer, Últimos 7 días, etc.)</li>
      <li>Selector de tiempo opcional</li>
      <li>Localización en español</li>
      <li>Validación de fechas mínimas y máximas</li>
      <li>Aplicación automática o manual</li>
    </ul>
  </div>
</div>`;

const appTs = `import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateRangePicker, SPANISH_LOCALE } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe],
})
export class App implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  ngAfterViewInit() {
    // Use setTimeout to ensure the DOM is fully rendered
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
    const input = document.getElementById('daterange-input') as HTMLInputElement;

    if (!input) {
      console.error('Input element with id "daterange-input" not found');
      return;
    }

    const today = new Date();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        showDropdowns: true,
        showWeekNumbers: false,
        autoApply: false,
        linkedCalendars: true,
        showCustomRangeLabel: true,
        alwaysShowCalendars: false,
        ranges: {
          'Hoy': [today, today],
          'Ayer': [yesterday, yesterday],
          'Últimos 7 días': [lastWeek, today],
          'Últimos 30 días': [lastMonth, today],
          'Este mes': [
            new Date(today.getFullYear(), today.getMonth(), 1),
            new Date(today.getFullYear(), today.getMonth() + 1, 0)
          ],
          'Mes pasado': [
            new Date(today.getFullYear(), today.getMonth() - 1, 1),
            new Date(today.getFullYear(), today.getMonth(), 0)
          ]
        },
        opens: 'right',
        drops: 'down',
        buttonClasses: 'btn btn-sm',
        applyButtonClasses: 'btn-success',
        cancelButtonClasses: 'btn-danger',
      },
      (startDate: Date, endDate: Date, label?: string) => {
        this.selectedStartDate = startDate;
        this.selectedEndDate = endDate;
        this.selectedLabel = label || null;

        console.log('Rango seleccionado:', {
          startDate,
          endDate,
          label
        });
      }
    );

    // Set initial values
    this.selectedStartDate = today;
    this.selectedEndDate = today;
  }
}`;

const appScss = `.date-range-picker-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h3 {
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #3b82f6;
    padding-bottom: 10px;
  }

  .demo-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background-color: #f9fafb;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #374151;
    }

    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }

    h4 {
      color: #374151;
      margin-bottom: 15px;
      font-size: 16px;
    }

    .config-display {
      background-color: #fff;
      padding: 15px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;

      p {
        margin: 8px 0;
        font-size: 14px;

        strong {
          color: #1f2937;
        }
      }
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin-bottom: 8px;
        color: #6b7280;
        font-size: 14px;
      }
    }
  }
}

// Importar los estilos completos del date-range-picker
@import '../../../../../../packages/ng-components/src/lib/components/date-range-picker/styles/date-range-picker.scss';`;

const dateRangePickerBasicExampleConfig = {
  title: 'Básico',
  component: App,
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

export { dateRangePickerBasicExampleConfig };
