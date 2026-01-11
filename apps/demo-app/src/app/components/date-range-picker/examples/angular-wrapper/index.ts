import { DateRangePickerAngularWrapperExample } from './app';
import hljs from 'highlight.js';

hljs.highlightAll();

const appHtml = `<div class="angular-wrapper-demo">
  <h3>Componente Angular para DateRangePicker</h3>
  <p>
    Este ejemplo muestra cómo usar el componente Angular <code>acp-date-range-picker</code>
    que envuelve la librería <code>datex-ui</code>.
  </p>

  <!-- Form Integration Example -->
  <div class="example-section">
    <h4>Integración con Angular Forms</h4>
    <form [formGroup]="dateForm" class="form-example">
      <div class="form-group">
        <label for="dateRange">Rango de Fechas:</label>
        <acp-date-range-picker
          formControlName="dateRange"
          [placeholder]="basicConfig.placeholder"
          [autoApply]="basicConfig.autoApply"
          [ranges]="ranges"
          (dateRangeSelected)="onDateRangeSelected($event)"
          (pickerShow)="onPickerShow()"
          (pickerHide)="onPickerHide()"
          (pickerApply)="onPickerApply()"
          (pickerCancel)="onPickerCancel()">
        </acp-date-range-picker>
      </div>

      <div class="form-group">
        <label for="singleDate">Fecha Única:</label>
        <acp-date-range-picker
          formControlName="singleDate"
          [placeholder]="singleDateConfig.placeholder"
          [singleDatePicker]="singleDateConfig.singleDatePicker"
          [autoApply]="singleDateConfig.autoApply"
          (dateRangeSelected)="onDateRangeSelected($event)">
        </acp-date-range-picker>
      </div>
    </form>

    <div class="form-values">
      <h5>Valores del Formulario:</h5>
      <pre>{{ formValue }}</pre>
    </div>
  </div>

  <!-- Theme Examples -->
  <div class="example-section">
    <h4>Diferentes Temas</h4>

    <div class="theme-examples">
      <div class="theme-example">
        <label>Tema Bootstrap:</label>
        <acp-date-range-picker
          [placeholder]="bootstrapConfig.placeholder"
          [presetTheme]="bootstrapConfig.presetTheme"
          [autoApply]="bootstrapConfig.autoApply"
          [ranges]="ranges">
        </acp-date-range-picker>
      </div>

      <div class="theme-example">
        <label>Tema Material:</label>
        <acp-date-range-picker
          [placeholder]="materialConfig.placeholder"
          [presetTheme]="materialConfig.presetTheme"
          [showDropdowns]="materialConfig.showDropdowns"
          [linkedCalendars]="materialConfig.linkedCalendars"
          [ranges]="ranges">
        </acp-date-range-picker>
      </div>
    </div>
  </div>

  <!-- Time Picker Example -->
  <div class="example-section">
    <h4>Con Selector de Tiempo</h4>
    <acp-date-range-picker
      [placeholder]="timePickerConfig.placeholder"
      [timePicker]="timePickerConfig.timePicker"
      [timePicker24Hour]="timePickerConfig.timePicker24Hour"
      [timePickerSeconds]="timePickerConfig.timePickerSeconds"
      [autoApply]="false">
    </acp-date-range-picker>
  </div>
</div>`;

const appTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-angular-wrapper-example',
  standalone: true,
  imports: [DateRangePicker, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class DateRangePickerAngularWrapperExample {
  // Form integration example
  dateForm = new FormGroup({
    dateRange: new FormControl({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    }),
    singleDate: new FormControl(new Date()),
  });

  // Configuration examples
  basicConfig = {
    placeholder: 'Seleccionar rango básico',
    autoApply: false,
  };

  bootstrapConfig = {
    placeholder: 'Rango con tema Bootstrap',
    presetTheme: 'bootstrap' as const,
    autoApply: true,
  };

  materialConfig = {
    placeholder: 'Rango con tema Material',
    presetTheme: 'material' as const,
    showDropdowns: true,
    linkedCalendars: true,
  };

  timePickerConfig = {
    placeholder: 'Rango con selector de tiempo',
    timePicker: true,
    timePicker24Hour: true,
    timePickerSeconds: true,
  };

  singleDateConfig = {
    placeholder: 'Selector de fecha única',
    singleDatePicker: true,
    autoApply: true,
  };

  // Predefined ranges
  ranges = {
    'Hoy': [new Date(), new Date()],
    'Ayer': [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    ],
    'Últimos 7 días': [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      new Date(),
    ],
    'Últimos 30 días': [
      new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      new Date(),
    ],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  } as Record<string, [Date, Date]>;

  // Event handlers
  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    console.log('Rango seleccionado:', event);
  }

  onPickerShow() {
    console.log('Picker mostrado');
  }

  onPickerHide() {
    console.log('Picker ocultado');
  }

  onPickerApply() {
    console.log('Selección aplicada');
  }

  onPickerCancel() {
    console.log('Selección cancelada');
  }

  // Form value display
  get formValue() {
    return JSON.stringify(this.dateForm.value, null, 2);
  }
}`;

const appScss = `.angular-wrapper-demo {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;

  h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }

  h4 {
    color: #34495e;
    margin: 25px 0 15px 0;
    font-size: 1.2em;
  }

  .example-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    background-color: #fafbfc;
  }

  .form-example {
    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #2c3e50;
      }

      acp-date-range-picker input {
        width: 100%;
        padding: 10px 15px;
        border: 2px solid #bdc3c7;
        border-radius: 6px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #3498db;
        }
      }
    }
  }

  .theme-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .theme-example {
    padding: 15px;
    border: 1px solid #d5dbdb;
    border-radius: 6px;
    background-color: #ffffff;

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 600;
    }
  }

  .form-values {
    margin-top: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 6px;
    border: 1px solid #e1e8ed;

    h5 {
      margin-bottom: 10px;
      color: #2c3e50;
    }

    pre {
      background-color: #f8f9fa;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #dee2e6;
      font-size: 12px;
      overflow-x: auto;
    }
  }
}`;

export const dateRangePickerAngularWrapperExampleConfig = {
  title: 'Componente Angular',
  component: DateRangePickerAngularWrapperExample,
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
