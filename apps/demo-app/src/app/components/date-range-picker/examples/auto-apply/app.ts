import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DateRangePicker, DateRangePickerOptions } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-auto-apply-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    JsonPipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    DateRangePicker,
    ReactiveFormsModule,
  ],
})
export class AutoApplyApp {
  // Form control para el ejemplo
  dateRangeControl = new FormControl({
    startDate: new Date(),
    endDate: new Date(),
  });

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = 'Hoy';

  // Rangos predefinidos
  ranges = {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date(Date.now() - 24 * 60 * 60 * 1000)],
    'Últimos 7 días': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
    'Últimos 30 días': [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  } as Record<string, [Date, Date]>;

  // Configuración del picker
  autoApplyOptions: DateRangePickerOptions = {
    ranges: this.ranges,
    presetTheme: 'bootstrap',
    autoApply: true,
    showDropdowns: true,
    linkedCalendars: true,
    alwaysShowCalendars: false,
    opens: 'right',
    drops: 'down',
  };

  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
  }
}
