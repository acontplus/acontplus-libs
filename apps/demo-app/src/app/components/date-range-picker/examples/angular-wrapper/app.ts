import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateRangePicker, DateRangePickerOptions } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-angular-wrapper-example',
  standalone: true,
  imports: [DateRangePicker, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class DateRangePickerAngularWrapperExample {
  // Form integration example
  dateForm = new FormGroup({
    dateRange: new FormControl({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    }),
    singleDate: new FormControl(new Date()),
  });

  // Predefined ranges
  ranges = {
    Hoy: [new Date(), new Date()] as [Date, Date],
    Ayer: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    ] as [Date, Date],
    'Últimos 7 días': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
    'Últimos 30 días': [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()] as [
      Date,
      Date,
    ],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ] as [Date, Date],
  } as Record<string, [Date, Date]>;

  // Configuration examples
  basicOptions: DateRangePickerOptions = {
    autoApply: false,
    ranges: this.ranges,
  };

  bootstrapOptions: DateRangePickerOptions = {
    presetTheme: 'bootstrap',
    autoApply: true,
    ranges: this.ranges,
  };

  materialOptions: DateRangePickerOptions = {
    presetTheme: 'material',
    showDropdowns: true,
    linkedCalendars: true,
    ranges: this.ranges,
  };

  timePickerOptions: DateRangePickerOptions = {
    timePicker: true,
    timePicker24Hour: true,
    timePickerSeconds: true,
  };

  singleDateOptions: DateRangePickerOptions = {
    singleDatePicker: true,
    autoApply: true,
  };

  // Event handlers
  onDateRangeSelected(_event: { startDate: Date; endDate: Date; label?: string }) {
    // Handle date range selection
  }

  onPickerShow() {
    // Handle picker show
  }

  onPickerHide() {
    // Handle picker hide
  }

  onPickerApply() {
    // Handle picker apply
  }

  onPickerCancel() {
    // Handle picker cancel
  }

  // Form value display
  get formValue() {
    return JSON.stringify(this.dateForm.value, null, 2);
  }
}
