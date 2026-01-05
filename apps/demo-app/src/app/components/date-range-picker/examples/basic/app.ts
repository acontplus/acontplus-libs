import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DateRangePicker, SPANISH_LOCALE, DEFAULT_THEME } from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule],
})
export class App implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  ngAfterViewInit() {
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
      return;
    }

    const today = new Date();
    const yesterday = addDay(today, -1);
    const last7Days = addDay(today, -7);
    const last30Days = addDay(today, -30);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        showDropdowns: true,
        autoApply: false, // Mostrar botones Aplicar/Cancelar
        linkedCalendars: true,
        alwaysShowCalendars: true,
        autoUpdateInput: true,
        showCustomRangeLabel: true,
        ranges: {
          Hoy: [today, today],
          Ayer: [yesterday, yesterday],
          'Últimos 7 días': [last7Days, today],
          'Últimos 30 días': [last30Days, today],
          'Este mes': [thisMonthStart, thisMonthEnd],
        },
        opens: 'right',
        drops: 'down',
        buttonClasses: 'btn btn-sm',
        applyButtonClasses: 'btn-success',
        cancelButtonClasses: 'btn-danger',
        theme: DEFAULT_THEME,
      },
      (startDate: Date, endDate: Date, label?: string) => {
        this.selectedStartDate = startDate;
        this.selectedEndDate = endDate;
        this.selectedLabel = label || null;
      },
    );

    // Configurar valores iniciales
    this.selectedStartDate = today;
    this.selectedEndDate = today;
    this.selectedLabel = 'Hoy';
  }
}
