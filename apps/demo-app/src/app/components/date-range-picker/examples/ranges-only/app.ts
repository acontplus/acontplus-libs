import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DateRangePicker, SPANISH_LOCALE, MATERIAL_THEME } from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-ranges-only-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatChipsModule],
})
export class RangesOnlyApp implements AfterViewInit, OnDestroy {
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
    const input = document.getElementById('ranges-only-input') as HTMLInputElement;

    if (!input) {
      console.error('Ranges only input not found');
      return;
    }

    const today = new Date();
    const yesterday = addDay(today, -1);
    const last3Days = addDay(today, -3);
    const last7Days = addDay(today, -7);
    const last15Days = addDay(today, -15);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    try {
      this.dateRangePicker = new DateRangePicker(
        input,
        {
          startDate: today,
          endDate: today,
          locale: SPANISH_LOCALE,
          autoApply: true, // Aplicar automáticamente
          alwaysShowCalendars: false, // Solo mostrar rangos inicialmente
          showCustomRangeLabel: true, // Permitir rango personalizado
          showDropdowns: true,
          theme: MATERIAL_THEME,
          ranges: {
            Hoy: [today, today],
            Ayer: [yesterday, yesterday],
            'Últimos 3 días': [last3Days, today],
            'Últimos 7 días': [last7Days, today],
            'Últimos 15 días': [last15Days, today],
            'Este mes': [thisMonthStart, today],
          },
          opens: 'right',
          drops: 'down',
        },
        (startDate: Date, endDate: Date, label?: string) => {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.selectedLabel = label || null;
          console.log('Ranges only - Fechas seleccionadas:', { startDate, endDate, label });
        },
      );

      // Configurar valores iniciales
      this.selectedStartDate = today;
      this.selectedEndDate = today;
      this.selectedLabel = 'Hoy';

      console.log('DateRangePicker Ranges Only inicializado correctamente');
    } catch (error) {
      console.error('Error inicializando DateRangePicker Ranges Only:', error);
    }
  }
}
