import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DateRangePicker, SPANISH_LOCALE, MATERIAL_THEME } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-single-date-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule],
})
export class SingleDateApp implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;

  selectedDate: Date = new Date();

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
    const input = document.getElementById('single-date-input') as HTMLInputElement;

    if (!input) {
      console.error('Single date input not found');
      return;
    }

    const today = new Date();

    try {
      this.dateRangePicker = new DateRangePicker(
        input,
        {
          startDate: today,
          endDate: today,
          locale: SPANISH_LOCALE,
          singleDatePicker: true, // Solo una fecha
          autoApply: true, // Aplicar automáticamente
          showDropdowns: true,
          linkedCalendars: false, // No aplica para fecha única
          alwaysShowCalendars: true,
          theme: MATERIAL_THEME,
          opens: 'right',
          drops: 'down',
        },
        (startDate: Date, endDate: Date, label?: string) => {
          this.selectedDate = startDate;
          console.log('Single date - Fecha seleccionada:', { startDate, label });
        },
      );

      // Configurar valor inicial
      this.selectedDate = today;

      console.log('DateRangePicker Single Date inicializado correctamente');
    } catch (error) {
      console.error('Error inicializando DateRangePicker Single Date:', error);
    }
  }
}
