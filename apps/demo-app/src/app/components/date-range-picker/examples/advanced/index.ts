import { AdvancedApp } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<div class="date-range-picker-advanced-demo">
  <h3>DateRangePicker - Configuraciones Avanzadas</h3>

  <!-- Picker Principal con todas las características -->
  <div class="demo-section main-section">
    <h4>🚀 Picker Principal - Todas las características</h4>
    <div class="main-picker-container">
      <label for="main-daterange-input">Selector completo con tiempo:</label>
      <input
        type="text"
        id="main-daterange-input"
        class="form-control main-input"
        placeholder="Selecciona fecha y hora"
        readonly
      />

      <div class="main-config-display">
        <p><strong>Fecha inicio:</strong> {{ selectedStartDate | date:'dd/MM/yyyy HH:mm' }}</p>
        <p><strong>Fecha fin:</strong> {{ selectedEndDate | date:'dd/MM/yyyy HH:mm' }}</p>
        <p><strong>Etiqueta:</strong> {{ selectedLabel || 'Personalizado' }}</p>
      </div>
    </div>
  </div>

  <!-- Control de Temas Global -->
  <div class="demo-section">
    <h4>🎨 Control de Temas Global</h4>
    <div class="theme-selector">
      <button
        *ngFor="let theme of ['default', 'bootstrap', 'material', 'custom']"
        class="theme-btn"
        [class.active]="currentTheme === theme"
        (click)="changeTheme(theme)"
      >
        {{ theme | titlecase }}
      </button>
    </div>
  </div>

  <!-- Ejemplos de Configuración -->
  <div class="demo-section">
    <h4>⚙️ Ejemplos de Configuración</h4>
    <div class="configurations-grid">
      <div *ngFor="let key of getConfigKeys()" class="config-item">
        <div class="config-header">
          <h5>{{ getConfig(key).title }}</h5>
        </div>

        <div class="config-input">
          <input
            type="text"
            [id]="key + '-input'"
            class="form-control"
            [placeholder]="'Ejemplo: ' + getConfig(key).title"
            readonly
          />
        </div>

        <div class="config-details">
          <h6>Configuración:</h6>
          <div class="config-code">
            <pre><code>{{ getConfigOptionsString(key) }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

const appTs = `import { Component, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import {
  DateRangePicker,
  SPANISH_LOCALE,
  SPANISH_LOCALE_WITH_TIME,
  DEFAULT_THEME,
  BOOTSTRAP_THEME,
  MATERIAL_THEME,
  DateRangePickerTheme,
  DateRangePickerOptions,
} from '@acontplus/ng-components';
import { addDay, addMonth } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-advanced-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, NgFor, TitleCasePipe],
})
export class AdvancedApp implements AfterViewInit, OnDestroy {
  private dateRangePickers: DateRangePicker[] = [];

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;
  currentTheme: string = 'default';

  // Configuraciones avanzadas
  configurations = {
    basic: {
      title: '1. Configuración Básica',
      options: {
        locale: SPANISH_LOCALE,
        showDropdowns: true,
        autoApply: false,
        linkedCalendars: true,
        alwaysShowCalendars: true,
        theme: DEFAULT_THEME,
      } as DateRangePickerOptions,
    },
    autoApply: {
      title: '2. Auto-Apply (Sin Botones)',
      options: {
        locale: SPANISH_LOCALE,
        autoApply: true,
        showDropdowns: true,
        theme: BOOTSTRAP_THEME,
        ranges: {
          Hoy: [new Date(), new Date()],
          Ayer: [addDay(new Date(), -1), addDay(new Date(), -1)],
          'Últimos 7 días': [addDay(new Date(), -7), new Date()],
        },
      } as DateRangePickerOptions,
    },
    // ... más configuraciones
  };

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAllExamples();
    }, 0);
  }

  ngOnDestroy() {
    this.dateRangePickers.forEach(picker => picker.remove());
    this.dateRangePickers = [];
  }

  private initializeAllExamples() {
    // Inicializar todos los ejemplos...
  }

  changeTheme(themeName: string) {
    this.currentTheme = themeName;
    const theme = this.themes[themeName as keyof typeof this.themes];
    if (theme) {
      this.dateRangePickers.forEach(picker => {
        picker.setTheme(theme);
      });
    }
  }
}`;

const appScss = `.date-range-picker-advanced-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h3 {
    color: #1f2937;
    margin-bottom: 30px;
    text-align: center;
    font-size: 28px;
    border-bottom: 3px solid #3b82f6;
    padding-bottom: 15px;
  }

  .demo-section {
    margin-bottom: 40px;
    padding: 25px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background-color: #f9fafb;
  }

  .main-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
  }

  .configurations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .config-item {
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }
}`;

const dateRangePickerAdvancedExampleConfig = {
  title: 'Avanzado',
  component: AdvancedApp,
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

export { dateRangePickerAdvancedExampleConfig };
