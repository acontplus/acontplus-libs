import { Component, AfterViewInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  DateRangePicker,
  DateRangePickerOptions,
  DateRangeValue,
  SPANISH_LOCALE,
  MATERIAL_LIGHT_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-no-dropdowns-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    DateRangePicker,
  ],
})
export class NoDropdownsApp implements AfterViewInit {
  selectedStartDate = signal<Date>(new Date());
  selectedEndDate = signal<Date>(new Date());
  selectedLabel = signal<string | null>(null);

  // Configuración del picker
  noDropdownsOptions: DateRangePickerOptions = {
    showDropdowns: false,
    autoApply: false,
    linkedCalendars: true,
    alwaysShowCalendars: true,
    theme: MATERIAL_LIGHT_THEME,
    ranges: this.getRanges(),
    locale: SPANISH_LOCALE,
  };

  ngAfterViewInit() {
    const today = new Date();
    this.selectedStartDate.set(today);
    this.selectedEndDate.set(today);
    this.selectedLabel.set('Hoy');
  }

  onDateRangeSelected(event: DateRangeValue<false> | null) {
    if (event && event.from && event.to) {
      this.selectedStartDate.set(event.from);
      this.selectedEndDate.set(event.to);
      this.selectedLabel.set(event.label || null);
    }
  }

  private getRanges(): Record<string, [Date, Date]> {
    const today = new Date();
    const yesterday = addDay(today, -1);
    const last7Days = addDay(today, -7);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      Hoy: [today, today],
      Ayer: [yesterday, yesterday],
      'Últimos 7 días': [last7Days, today],
      'Este mes': [thisMonthStart, today],
    };
  }
}
