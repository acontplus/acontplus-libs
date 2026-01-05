import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DateRangePicker, SPANISH_LOCALE, BOOTSTRAP_THEME } from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-no-dropdowns-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule],
})
export class NoDropdownsApp implements AfterViewInit, OnDestroy {
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
    const input = document.getElementById('no-dropdowns-input') as HTMLInputElement;

    if (!input) {
      console.error('No dropdowns input not found');
      return;
    }

    const today = new Date();
    const yesterday = addDay(today, -1);
    const last7Days = addDay(today, -7);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    try {
      this.dateRangePicker = new DateRangePicker(
        input,
        {
          startDate: today,
          endDate: today,
          locale: SPANISH_LOCALE,
          showDropdowns: false, // Sin selectores de mes/año
          autoApply: false, // Mostrar botones
          linkedCalendars: true,
          alwaysShowCalendars: true,
          showCustomRangeLabel: true,
          theme: BOOTSTRAP_THEME,
          ranges: {
            Hoy: [today, today],
            Ayer: [yesterday, yesterday],
            'Últimos 7 días': [last7Days, today],
            'Este mes': [thisMonthStart, today],
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
          console.log('No dropdowns - Fechas seleccionadas:', { startDate, endDate, label });
        },
      );

      // Configurar valores iniciales
      this.selectedStartDate = today;
      this.selectedEndDate = today;
      this.selectedLabel = 'Hoy';

      console.log('DateRangePicker No Dropdowns inicializado correctamente');
    } catch (error) {
      console.error('Error inicializando DateRangePicker No Dropdowns:', error);
    }
  }
}
