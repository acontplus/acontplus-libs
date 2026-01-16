import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateRangePicker,
  DateRangePickerOptions,
  SPANISH_LOCALE_WITH_TIME,
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

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = 'Hoy';

  // Locale con formato de tiempo
  localeWithTime = SPANISH_LOCALE_WITH_TIME;

  // Rangos predefinidos
  ranges = {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date(Date.now() - 24 * 60 * 60 * 1000)],
    'Últimos 7 días': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
  } as Record<string, [Date, Date]>;

  // Configuración del picker
  dateTimeOptions: DateRangePickerOptions = {
    locale: this.localeWithTime,
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 1,
    timePickerSeconds: false,
    ranges: this.ranges,
    autoApply: false,
    showDropdowns: true,
    linkedCalendars: true,
    alwaysShowCalendars: true,
    opens: 'right',
    drops: 'down',
    presetTheme: 'default',
  };

  onDateRangeSelected(event: { from: Date | string; to: Date | string; label?: string }) {
    // Convert to Date objects if they come as strings
    this.selectedStartDate = typeof event.from === 'string' ? new Date(event.from) : event.from;
    this.selectedEndDate = typeof event.to === 'string' ? new Date(event.to) : event.to;
    this.selectedLabel = event.label || null;
  }
}
