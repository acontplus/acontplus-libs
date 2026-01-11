import { Component, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateRangePicker, DateRangePickerOptions } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-advanced-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    DateRangePicker,
  ],
})
export class AdvancedApp {
  // Resultado de la selección
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;
  isSelected: boolean = false;

  // Configuración de fechas usando signals
  startDateValue = signal(this.formatDateForInput(new Date()));
  endDateValue = signal(this.formatDateForInput(new Date()));
  minDateValue = signal('');
  maxDateValue = signal('');

  // Opciones de UI usando signals
  showDropdowns = signal(true);
  showWeekNumbers = signal(false);
  showISOWeekNumbers = signal(false);
  singleDatePicker = signal(false);
  timePicker = signal(false);
  timePicker24Hour = signal(true);
  timePickerSeconds = signal(false);
  autoApply = signal(false);
  ranges = signal(true);
  alwaysShowCalendars = signal(false);
  showCustomRangeLabel = signal(true);
  linkedCalendars = signal(true);
  autoUpdateInput = signal(true);

  // Configuración de tiempo usando signals
  timePickerIncrement = signal(1);

  // Posicionamiento usando signals
  opens = signal<'left' | 'right' | 'center'>('right');
  drops = signal<'up' | 'down' | 'auto'>('down');
  checkboxPosition = signal<'prefix' | 'suffix'>('suffix');

  // Clases CSS usando signals
  buttonClasses = signal('btn btn-sm');
  applyButtonClasses = signal('btn-primary');
  cancelButtonClasses = signal('btn-default');

  // Eventos
  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
  }

  onCheckboxChange(checked: boolean) {
    this.isSelected = checked;
  }

  // Métodos auxiliares
  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getStartDate(): Date | undefined {
    return this.startDateValue() ? new Date(this.startDateValue()) : undefined;
  }

  getEndDate(): Date | undefined {
    return this.endDateValue() ? new Date(this.endDateValue()) : undefined;
  }

  getMinDate(): Date | null {
    return this.minDateValue() ? new Date(this.minDateValue()) : null;
  }

  getMaxDate(): Date | null {
    return this.maxDateValue() ? new Date(this.maxDateValue()) : null;
  }

  // Configuración usando un objeto options
  // Configuración usando computed para evitar recrear el objeto
  pickerOptions = computed((): DateRangePickerOptions => {
    return {
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      minDate: this.getMinDate(),
      maxDate: this.getMaxDate(),
      showDropdowns: this.showDropdowns(),
      singleDatePicker: this.singleDatePicker(),
      timePicker: this.timePicker(),
      timePicker24Hour: this.timePicker24Hour(),
      timePickerSeconds: this.timePickerSeconds(),
      timePickerIncrement: this.timePickerIncrement(),
      autoApply: this.autoApply(),
      ranges: this.getRanges(),
      alwaysShowCalendars: this.alwaysShowCalendars(),
      showCustomRangeLabel: this.showCustomRangeLabel(),
      linkedCalendars: this.linkedCalendars(),
      autoUpdateInput: this.autoUpdateInput(),
      opens: this.opens(),
      drops: this.drops(),
      buttonClasses: this.buttonClasses(),
      applyButtonClasses: this.applyButtonClasses(),
      cancelButtonClasses: this.cancelButtonClasses(),
      presetTheme: 'material',
    };
  });

  getConfigurationCode(): string {
    const config = {
      startDate: this.startDateValue() || undefined,
      endDate: this.endDateValue() || undefined,
      minDate: this.minDateValue() || undefined,
      maxDate: this.maxDateValue() || undefined,
      showDropdowns: this.showDropdowns(),
      singleDatePicker: this.singleDatePicker(),
      timePicker: this.timePicker(),
      timePicker24Hour: this.timePicker24Hour(),
      timePickerSeconds: this.timePickerSeconds(),
      timePickerIncrement: this.timePickerIncrement(),
      autoApply: this.autoApply(),
      ranges: this.ranges() ? 'predefinedRanges' : undefined,
      alwaysShowCalendars: this.alwaysShowCalendars(),
      showCustomRangeLabel: this.showCustomRangeLabel(),
      linkedCalendars: this.linkedCalendars(),
      autoUpdateInput: this.autoUpdateInput(),
      opens: this.opens(),
      drops: this.drops(),
      buttonClasses: this.buttonClasses(),
      applyButtonClasses: this.applyButtonClasses(),
      cancelButtonClasses: this.cancelButtonClasses(),
    };

    // Filtrar propiedades undefined
    const filteredConfig = Object.entries(config)
      .filter(([_, value]) => value !== undefined && value !== false && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const attributes = Object.entries(filteredConfig)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return `[${key}]="${value}"`;
        } else if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'number') {
          return `[${key}]="${value}"`;
        } else {
          return `[${key}]="${key}"`;
        }
      })
      .join('\n  ');

    return `<acp-date-range-picker
  ${attributes}
  [showCheckbox]="true"
  [checkboxChecked]="isSelected"
  [showCalendarButton]="true"
  [inputReadonly]="false"
  label="Seleccionar rango de fechas"
  hint="Configuración personalizada"
  placeholderText="Selecciona fechas"
  (dateRangeSelected)="onDateRangeSelected($event)"
  (checkboxChange)="onCheckboxChange($event)"
></acp-date-range-picker>`;
  }

  getRanges(): Record<string, [Date, Date]> | undefined {
    if (!this.ranges()) return undefined;

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      Hoy: [today, today] as [Date, Date],
      Ayer: [yesterday, yesterday] as [Date, Date],
      'Últimos 7 días': [lastWeek, today] as [Date, Date],
      'Últimos 30 días': [lastMonth, today] as [Date, Date],
      'Este mes': [thisMonthStart, today] as [Date, Date],
    };
  }
}
