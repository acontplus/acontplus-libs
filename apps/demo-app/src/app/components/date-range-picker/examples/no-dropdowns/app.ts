import { Component, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  DateRangePicker,
  DateRangePickerOptions,
  SPANISH_LOCALE,
  BOOTSTRAP_THEME,
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
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  // Configuración del picker
  noDropdownsOptions: DateRangePickerOptions = {
    showDropdowns: false,
    autoApply: false,
    linkedCalendars: true,
    alwaysShowCalendars: true,
    theme: BOOTSTRAP_THEME,
    ranges: this.getRanges(),
    locale: SPANISH_LOCALE,
  };

  ngAfterViewInit() {
    const today = new Date();
    this.selectedStartDate = today;
    this.selectedEndDate = today;
    this.selectedLabel = 'Hoy';
  }

  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
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
