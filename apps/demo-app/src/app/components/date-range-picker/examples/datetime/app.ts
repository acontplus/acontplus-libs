import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DateRangePicker, SPANISH_LOCALE_WITH_TIME, DEFAULT_THEME } from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-datetime-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatChipsModule],
})
export class DateTimeApp implements AfterViewInit, OnDestroy {
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
    const input = document.getElementById('datetime-input') as HTMLInputElement;

    if (!input) {
      console.error('DateTime input not found');
      return;
    }

    const today = new Date();
    const yesterday = addDay(today, -1);
    const last7Days = addDay(today, -7);

    try {
      this.dateRangePicker = new DateRangePicker(
        input,
        {
          startDate: today,
          endDate: today,
          locale: SPANISH_LOCALE_WITH_TIME, // Formato con tiempo
          timePicker: true, // Habilitar selector de tiempo
          timePicker24Hour: true, // Formato 24 horas
          timePickerIncrement: 1, // Incrementos de 15 minutos
          autoApply: false, // Mostrar botones
          showDropdowns: true,
          linkedCalendars: true,
          alwaysShowCalendars: true,
          showCustomRangeLabel: true,
          theme: DEFAULT_THEME,
          ranges: {
            Hoy: [today, today],
            Ayer: [yesterday, yesterday],
            'Últimos 7 días': [last7Days, today],
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
          console.log('DateTime - Fechas seleccionadas:', { startDate, endDate, label });
        },
      );

      // Configurar valores iniciales
      this.selectedStartDate = today;
      this.selectedEndDate = today;
      this.selectedLabel = 'Hoy';

      console.log('DateRangePicker DateTime inicializado correctamente');
    } catch (error) {
      console.error('Error inicializando DateRangePicker DateTime:', error);
    }
  }
}
