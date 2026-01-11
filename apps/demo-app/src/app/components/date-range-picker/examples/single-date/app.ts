import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DateRangePicker, DateRangePickerOptions } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-single-date-example',
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
export class SingleDateApp {
  // Form control para el ejemplo
  singleDateControl = new FormControl(new Date());

  selectedDate: Date = new Date();

  // Configuración para single date picker
  singleDateOptions: DateRangePickerOptions = {
    singleDatePicker: true,
    autoApply: true,
    showDropdowns: true,
    linkedCalendars: false,
    alwaysShowCalendars: true,
    opens: 'right',
    drops: 'down',
    presetTheme: 'material',
  };

  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedDate = event.startDate;
  }
}
