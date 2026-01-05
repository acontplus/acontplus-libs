import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
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
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-advanced-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, TitleCasePipe],
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
    singleDate: {
      title: '3. Selector de Fecha Única',
      options: {
        locale: SPANISH_LOCALE,
        singleDatePicker: true,
        autoApply: true,
        showDropdowns: true,
        theme: MATERIAL_THEME,
      } as DateRangePickerOptions,
    },
    rangesOnly: {
      title: '4. Solo Rangos Predefinidos',
      options: {
        locale: SPANISH_LOCALE,
        autoApply: true,
        alwaysShowCalendars: false,
        showCustomRangeLabel: true,
        theme: this.createCustomTheme(),
        ranges: {
          Hoy: [new Date(), new Date()],
          Ayer: [addDay(new Date(), -1), addDay(new Date(), -1)],
          'Últimos 3 días': [addDay(new Date(), -3), new Date()],
          'Últimos 7 días': [addDay(new Date(), -7), new Date()],
          'Últimos 15 días': [addDay(new Date(), -15), new Date()],
          'Este mes': [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
        },
      } as DateRangePickerOptions,
    },
    datetime24h: {
      title: '5. DateTime 24h',
      options: {
        locale: SPANISH_LOCALE_WITH_TIME,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 15,
        autoApply: false,
        showDropdowns: true,
        theme: DEFAULT_THEME,
      } as DateRangePickerOptions,
    },
    datetime12h: {
      title: '6. DateTime 12h con Segundos',
      options: {
        locale: {
          ...SPANISH_LOCALE_WITH_TIME,
          format: 'DD/MM/YYYY hh:mm:ss A',
        },
        timePicker: true,
        timePicker24Hour: false,
        timePickerSeconds: true,
        timePickerIncrement: 5,
        autoApply: false,
        showDropdowns: true,
        theme: BOOTSTRAP_THEME,
      } as DateRangePickerOptions,
    },
    noDropdowns: {
      title: '7. Sin Dropdowns (Solo Flechas)',
      options: {
        locale: SPANISH_LOCALE,
        showDropdowns: false,
        autoApply: false,
        linkedCalendars: true,
        theme: MATERIAL_THEME,
        ranges: {
          Hoy: [new Date(), new Date()],
          'Últimos 7 días': [addDay(new Date(), -7), new Date()],
          'Este mes': [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
        },
      } as DateRangePickerOptions,
    },
    customLimits: {
      title: '8. Con Límites de Fecha',
      options: {
        locale: SPANISH_LOCALE,
        minDate: addDay(new Date(), -30), // Máximo 30 días atrás
        maxDate: addDay(new Date(), 30), // Máximo 30 días adelante
        showDropdowns: true,
        autoApply: false,
        theme: this.createCustomTheme(),
      } as DateRangePickerOptions,
    },
  };

  // Temas disponibles
  themes = {
    default: DEFAULT_THEME,
    bootstrap: BOOTSTRAP_THEME,
    material: MATERIAL_THEME,
    custom: this.createCustomTheme(),
  };

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAllExamples();
    }, 0);
  }

  ngOnDestroy() {
    this.dateRangePickers.forEach(picker => picker.remove());
    this.dateRangePickers = [];
  }

  private createCustomTheme(): DateRangePickerTheme {
    return {
      primaryColor: '#8b5cf6',
      secondaryColor: '#6b7280',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      textColor: '#111827',
      hoverColor: '#f3f4f6',
      selectedColor: '#8b5cf6',
      rangeColor: '#ede9fe',
      todayColor: '#8b5cf6',
      disabledColor: '#d1d5db',
      applyButtonColor: '#059669',
      cancelButtonColor: '#dc2626',
      borderRadius: '12px',
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
    };
  }

  private initializeAllExamples() {
    Object.entries(this.configurations).forEach(([key, config]) => {
      const input = document.getElementById(`${key}-input`) as HTMLInputElement;
      if (input) {
        const picker = new DateRangePicker(
          input,
          {
            ...config.options,
            startDate: new Date(),
            endDate: new Date(),
          },
          () => {},
        );

        this.dateRangePickers.push(picker);
      }
    });

    // Inicializar el picker principal con todas las características
    this.initializeMainPicker();
  }

  private initializeMainPicker() {
    const input = document.getElementById('main-daterange-input') as HTMLInputElement;
    if (!input) return;

    const today = new Date();
    const yesterday = addDay(today, -1);
    const last7Days = addDay(today, -7);
    const last30Days = addDay(today, -30);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const mainPicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE_WITH_TIME,
        showDropdowns: true,
        autoApply: false,
        linkedCalendars: true,
        alwaysShowCalendars: true,
        autoUpdateInput: true,
        showCustomRangeLabel: true,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 15,
        ranges: {
          Hoy: [today, today],
          Ayer: [yesterday, yesterday],
          'Últimos 7 días': [last7Days, today],
          'Últimos 30 días': [last30Days, today],
          'Este mes': [thisMonthStart, thisMonthEnd],
          'Mes pasado': [lastMonthStart, lastMonthEnd],
        },
        opens: 'right',
        drops: 'down',
        buttonClasses: 'btn btn-sm',
        applyButtonClasses: 'btn-success',
        cancelButtonClasses: 'btn-danger',
        theme: this.themes.default,
      },
      () => {},
    );

    this.dateRangePickers.push(mainPicker);

    // Configurar valores iniciales
    this.selectedStartDate = today;
    this.selectedEndDate = today;
    this.selectedLabel = 'Hoy';
  }

  // Método para cambiar tema dinámicamente
  changeTheme(themeName: string) {
    this.currentTheme = themeName;
    const theme = this.themes[themeName as keyof typeof this.themes];
    if (theme) {
      this.dateRangePickers.forEach(picker => {
        picker.setTheme(theme);
      });
    }
  }

  // Método para testear dropdowns
  testDropdowns() {}

  // Método para obtener las claves de configuración
  getConfigKeys(): string[] {
    return Object.keys(this.configurations);
  }

  // Método para obtener configuración por clave
  getConfig(key: string) {
    return this.configurations[key as keyof typeof this.configurations];
  }

  // Método para obtener string de configuración formateado
  getConfigOptionsString(key: string): string {
    const config = this.getConfig(key);
    if (!config) return '';
    return '';
  }
}
