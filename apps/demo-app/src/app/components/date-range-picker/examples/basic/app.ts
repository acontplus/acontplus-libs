import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  DateRangePicker,
  SPANISH_LOCALE,
  MATERIAL_THEME,
  BOOTSTRAP_THEME,
  DEFAULT_THEME,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule],
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('daterangeInput', { static: false }) daterangeInput!: ElementRef<HTMLInputElement>;

  private dateRangePicker!: DateRangePicker;

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;
  currentTheme = 'MATERIAL';

  ngAfterViewInit() {
    this.initializeDateRangePicker();
  }

  ngOnDestroy() {
    if (this.dateRangePicker) {
      this.dateRangePicker.remove();
    }
  }

  switchTheme(themeName: string) {
    if (!this.dateRangePicker) return;

    this.currentTheme = themeName;
    switch (themeName) {
      case 'BOOTSTRAP':
        this.dateRangePicker.setTheme(BOOTSTRAP_THEME);
        break;
      case 'DEFAULT':
        this.dateRangePicker.setTheme(DEFAULT_THEME);
        break;
      case 'MATERIAL':
      default:
        this.dateRangePicker.setTheme(MATERIAL_THEME);
        break;
    }
  }

  private initializeDateRangePicker() {
    const input = this.daterangeInput.nativeElement;

    if (!input) {
      return;
    }

    // Crear fechas limpias (solo día, sin hora) para evitar problemas
    const today = new Date();
    const cleanToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const yesterday = new Date(cleanToday);
    yesterday.setDate(cleanToday.getDate() - 1);

    const last7Days = new Date(cleanToday);
    last7Days.setDate(cleanToday.getDate() - 7);

    const last30Days = new Date(cleanToday);
    last30Days.setDate(cleanToday.getDate() - 30);

    // Agregar más rangos como en la imagen
    const last5Days = new Date(cleanToday);
    last5Days.setDate(cleanToday.getDate() - 5);

    const last10Days = new Date(cleanToday);
    last10Days.setDate(cleanToday.getDate() - 10);

    const last15Days = new Date(cleanToday);
    last15Days.setDate(cleanToday.getDate() - 15);

    const last14Days = new Date(cleanToday);
    last14Days.setDate(cleanToday.getDate() - 14);

    // Esta semana (desde lunes hasta domingo)
    const thisWeekStart = new Date(cleanToday);
    const dayOfWeek = thisWeekStart.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Domingo = 0, queremos lunes = 0
    thisWeekStart.setDate(thisWeekStart.getDate() - daysFromMonday);

    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekStart.getDate() + 6); // Lunes + 6 días = Domingo

    // Este mes
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // El mes pasado
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    try {
      this.dateRangePicker = new DateRangePicker(
        input,
        {
          startDate: cleanToday,
          endDate: cleanToday,
          locale: SPANISH_LOCALE,
          minYear: 2022,
          timePicker: false,
          timePicker24Hour: true,
          //showCustomRangeLabel: false,
          showDropdowns: true,
          autoApply: false, // Mostrar botones Aplicar/Cancelar
          linkedCalendars: true,
          alwaysShowCalendars: true,
          autoUpdateInput: true,
          showCustomRangeLabel: true,
          ranges: {
            Hoy: [cleanToday, cleanToday],
            Ayer: [yesterday, yesterday],
            'Últimos 5 días': [last5Days, cleanToday],
            'Últimos 10 días': [last10Days, cleanToday],
            'Últimos 14 días': [last14Days, cleanToday],
            'Últimos 15 días': [last15Days, cleanToday],
            'Últimos 30 días': [last30Days, cleanToday],
            'Esta semana': [thisWeekStart, thisWeekEnd],
            'Este mes': [thisMonthStart, thisMonthEnd],
            'El mes pasado': [lastMonthStart, lastMonthEnd],
          },
          opens: 'center',
          drops: 'auto',
          buttonClasses: 'btn btn-sm',
          applyButtonClasses: 'btn-success',
          cancelButtonClasses: 'btn-danger',
          theme: MATERIAL_THEME,
        },
        (startDate: Date, endDate: Date, label?: string) => {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.selectedLabel = label || null;
        },
      );

      // Configurar valores iniciales
      this.selectedStartDate = cleanToday;
      this.selectedEndDate = cleanToday;
      this.selectedLabel = 'Hoy';
    } catch {
      // Error initializing DateRangePicker
    }
  }
}
