import { Component, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateRangePicker,
  DateRangePickerOptions,
  SPANISH_LOCALE,
  MATERIAL_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-ranges-only-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    DateRangePicker,
  ],
})
export class RangesOnlyApp implements AfterViewInit {
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  // Configuración del picker
  rangesOnlyOptions: DateRangePickerOptions = {
    autoApply: true,
    alwaysShowCalendars: false,
    showCustomRangeLabel: true,
    theme: MATERIAL_THEME,
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
    const last3Days = addDay(today, -3);
    const last7Days = addDay(today, -7);
    const last15Days = addDay(today, -15);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      Hoy: [today, today] as [Date, Date],
      Ayer: [yesterday, yesterday] as [Date, Date],
      'Últimos 3 días': [last3Days, today] as [Date, Date],
      'Últimos 7 días': [last7Days, today] as [Date, Date],
      'Últimos 15 días': [last15Days, today] as [Date, Date],
      'Este mes': [thisMonthStart, today] as [Date, Date],
    };
  }
}
