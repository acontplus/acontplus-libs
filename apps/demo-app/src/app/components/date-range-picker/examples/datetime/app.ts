import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateRangePicker,
  DateRangePickerOptions,
  DateRangeValue,
  SPANISH_LOCALE,
  MATERIAL_LIGHT_THEME,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-datetime-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    JsonPipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    DateRangePicker,
    ReactiveFormsModule,
  ],
})
export class DateTimeApp {
  // Form control para el ejemplo
  dateTimeControl = new FormControl({
    startDate: new Date(),
    endDate: new Date(),
  });

  selectedStartDate = signal<Date>(new Date());
  selectedEndDate = signal<Date>(new Date());
  selectedLabel = signal<string | null>('Hoy');

  // Rangos predefinidos
  ranges = {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date(Date.now() - 24 * 60 * 60 * 1000)],
    'Últimos 7 días': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
  } as Record<string, [Date, Date]>;

  // Configuración del picker
  dateTimeOptions: DateRangePickerOptions = {
    locale: SPANISH_LOCALE,
    theme: MATERIAL_LIGHT_THEME,
    timePicker: true,
    timePicker24Hour: true,
    timePickerSeconds: true,
    timePickerIncrement: 15,
    ranges: this.ranges,
    autoApply: false,
    showDropdowns: true,
    linkedCalendars: true,
    alwaysShowCalendars: true,
  };

  onDateRangeSelected(event: DateRangeValue<false> | null) {
    if (event && event.from && event.to) {
      this.selectedStartDate.set(event.from);
      this.selectedEndDate.set(event.to);
      this.selectedLabel.set(event.label || null);
    }
  }
}
