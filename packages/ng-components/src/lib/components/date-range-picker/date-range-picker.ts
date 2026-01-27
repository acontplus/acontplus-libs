import {
  Component,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef,
  input,
  output,
  signal,
  model,
  OutputEmitterRef,
  WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

import {
  NgxDatex,
  NgxDatexTheme,
  NgxDatexLocale,
  NgxDatexValue,
  SPANISH_LOCALE,
  MATERIAL_LIGHT_THEME,
} from 'ngx-datex';

import { addDay, weekStart, weekEnd, monthStart, monthEnd, tzDate, format } from '@formkit/tempo';

/* ============================
   TYPES
============================ */

export interface DateRangePickerOptions {
  presetTheme?: 'default' | 'bootstrap' | 'material' | 'custom';
  locale?: NgxDatexLocale;
  theme?: NgxDatexTheme;
  ranges?: Record<string, [Date, Date]>;
  minDate?: Date | null;
  maxDate?: Date | null;
  singleDatePicker?: boolean;
  timePicker?: boolean;
  timePicker24Hour?: boolean;
  timePickerSeconds?: boolean;
  timePickerIncrement?: number;
  autoApply?: boolean;
  showDropdowns?: boolean;
  linkedCalendars?: boolean;
  alwaysShowCalendars?: boolean;
}

export type DateValue<AsString extends boolean> = AsString extends true ? string : Date;

export interface DateRangeValue<AsString extends boolean> {
  from: DateValue<AsString>;
  to: DateValue<AsString>;
  label?: string;
}

/* ============================
   HELPERS
============================ */

function formatDateToString(date: Date): string {
  const dateZone = tzDate(date, 'America/Guayaquil');
  return format({
    date: dateZone,
    format: 'YYYY-MM-DD HH:mm:ss',
    tz: 'America/Guayaquil',
  });
}

/* ============================
   COMPONENT
============================ */

@Component({
  selector: 'acp-date-range-picker',
  standalone: true,
  imports: [NgxDatex, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePicker),
      multi: true,
    },
  ],
  template: `
    <ngx-datex
      [(ngModel)]="dateRangeValue"
      [appearance]="appearance()"
      [label]="label()"
      [placeholder]="placeholderText()"
      [disabled]="isDisabled()"
      [readonly]="inputReadonly()"
      [locale]="locale"
      [theme]="theme"
      [ranges]="predefinedRanges"
      [singleDatePicker]="singleDatePicker()"
      [timePicker]="timePicker()"
      [timePicker24Hour]="timePicker24Hour()"
      [timePickerSeconds]="timePickerSeconds()"
      [timePickerIncrement]="timePickerIncrement()"
      [autoApply]="autoApply()"
      [showDropdowns]="showDropdowns()"
      [linkedCalendars]="linkedCalendars()"
      [alwaysShowCalendars]="alwaysShowCalendars()"
      [minDate]="minDateForTemplate"
      [maxDate]="maxDateForTemplate"
      [showCheckbox]="showCheckbox()"
      [checkboxChecked]="checkboxChecked()"
      [checkboxPosition]="checkboxPosition()"
      [calendarIcon]="calendarIcon()"
      [showCalendarIcon]="showCalendarButton()"
      (dateChange)="onDateChange($event)"
      (rangeChange)="onRangeChange($event)"
      (openEvent)="onPickerShow()"
      (closeEvent)="onPickerHide()"
      (checkboxChange)="onCheckboxToggle($event)"
      [startDate]="startDate()"
      [endDate]="endDate()"
    ></ngx-datex>
  `,
})
export class DateRangePicker<AsString extends boolean = true>
  implements OnInit, OnChanges, OnDestroy, ControlValueAccessor
{
  /* ============================
     INPUTS
  ============================ */

  options = input<DateRangePickerOptions>({});
  placeholderText = input('Seleccionar rango de fechas');
  isDisabled = input(false);
  inputReadonly = input(false);
  label = input<string>('');
  appearance = input<'fill' | 'outline'>('outline');

  formatOutputAsString = input<AsString>(true as AsString);

  calendarIcon = input('date_range');
  showCalendarButton = input(false);

  showCheckbox = input(false);
  checkboxChecked = model(false);
  checkboxPosition = input<'prefix' | 'suffix'>('suffix');

  startDate = input<Date>(new Date());
  endDate = input<Date>(new Date());
  // NgxDatex specific inputs
  singleDatePicker = input(false);
  timePicker = input(false);
  timePicker24Hour = input(true);
  timePickerSeconds = input(false);
  timePickerIncrement = input(1);
  autoApply = input(false);
  showDropdowns = input(false);
  linkedCalendars = input(true);
  alwaysShowCalendars = input(false);
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);

  /* ============================
     OUTPUTS
  ============================ */

  dateRangeSelected: OutputEmitterRef<DateRangeValue<AsString>> =
    output<DateRangeValue<AsString>>();

  pickerShow: OutputEmitterRef<void> = output<void>();
  pickerHide: OutputEmitterRef<void> = output<void>();
  pickerApply: OutputEmitterRef<void> = output<void>();
  pickerCancel: OutputEmitterRef<void> = output<void>();
  checkboxChange: OutputEmitterRef<boolean> = output<boolean>();

  /* ============================
     INTERNAL
  ============================ */

  dateRangeValue: NgxDatexValue | null = null;
  predefinedRanges: Record<string, [Date, Date]> = {};
  locale: NgxDatexLocale = SPANISH_LOCALE;
  theme: NgxDatexTheme = MATERIAL_LIGHT_THEME;

  private currentDate = new Date();
  private readonly stateChanges = new Subject<void>();

  private onChange = (_value: any) => {
    // This will be replaced by registerOnChange
  };
  private onTouched = () => {
    // This will be replaced by registerOnTouched
  };

  /* ============================
     COMPUTED PROPERTIES
  ============================ */

  effectiveMinDate: WritableSignal<Date | null> = signal<Date | null>(null);
  effectiveMaxDate: WritableSignal<Date | null> = signal<Date | null>(null);

  get minDateForTemplate(): any {
    const minDate = this.effectiveMinDate();
    return minDate || null;
  }

  get maxDateForTemplate(): any {
    const maxDate = this.effectiveMaxDate();
    return maxDate || null;
  }

  /* ============================
     LIFECYCLE
  ============================ */

  ngOnInit(): void {
    this.initializeConfiguration();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['minDate'] || changes['maxDate']) {
      console.log('options changes');
      this.initializeConfiguration();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  /* ============================
     DATE LOGIC
  ============================ */

  private mapDate(date: Date): DateValue<AsString> {
    return this.formatOutputAsString()
      ? (formatDateToString(date) as DateValue<AsString>)
      : (date as DateValue<AsString>);
  }

  private initializeConfiguration(): void {
    this.predefinedRanges = this.getDefaultRanges();
    this.locale = this.getLocale();
    this.theme = this.getTheme();
    this.effectiveMinDate.set(this.minDate());
    this.effectiveMaxDate.set(this.maxDate());
  }

  private getDefaultRanges(): Record<string, [Date, Date]> {
    const opts = this.options();
    if (opts.ranges) {
      return opts.ranges;
    }

    return {
      Hoy: [this.currentDate, this.currentDate],
      Ayer: [addDay(this.currentDate, -1), addDay(this.currentDate, -1)],
      'Últimos 5 días': [addDay(this.currentDate, -4), this.currentDate],
      'Últimos 10 días': [addDay(this.currentDate, -9), this.currentDate],
      'Últimos 15 días': [addDay(this.currentDate, -14), this.currentDate],
      'Últimos 30 días': [addDay(this.currentDate, -29), this.currentDate],
      'Esta semana': [weekStart(this.currentDate), weekEnd(this.currentDate)],
      'Este mes': [monthStart(this.currentDate), monthEnd(this.currentDate)],
      'El mes pasado': [
        monthStart(addDay(monthStart(this.currentDate), -1)),
        addDay(monthStart(this.currentDate), -1),
      ],
    };
  }

  private getLocale(): NgxDatexLocale {
    const opts = this.options();
    return opts.locale ?? SPANISH_LOCALE;
  }

  private getTheme(): NgxDatexTheme {
    const opts = this.options();
    return opts.theme ?? MATERIAL_LIGHT_THEME;
  }

  /* ============================
     EVENT HANDLERS
  ============================ */

  onDateChange(value: NgxDatexValue | null): void {
    if (value && value.startDate) {
      const range: DateRangeValue<AsString> = {
        from: this.mapDate(value.startDate),
        to: this.mapDate(value.endDate || value.startDate),
        label: value.label,
      };

      this.onChange(range);
      this.onTouched();
      this.dateRangeSelected.emit(range);
    } else {
      this.onChange(null);
      this.onTouched();
      this.dateRangeSelected.emit(null as any);
    }
  }

  onRangeChange(range: { startDate: Date; endDate: Date | null }): void {
    if (range.startDate) {
      const dateRange: DateRangeValue<AsString> = {
        from: this.mapDate(range.startDate),
        to: this.mapDate(range.endDate || range.startDate),
      };

      this.onChange(dateRange);
    }
  }

  onPickerShow(): void {
    this.pickerShow.emit();
  }

  onPickerHide(): void {
    this.pickerHide.emit();
    this.onTouched();
  }

  onCheckboxToggle(checked: boolean): void {
    this.checkboxChecked.set(checked);
    this.checkboxChange.emit(checked);
  }

  /* ============================
     CVA
  ============================ */

  writeValue(value: any): void {
    if (value && value.from && value.to) {
      // Convert our DateRangeValue to NgxDatexValue format
      const startDate = typeof value.from === 'string' ? new Date(value.from) : value.from;
      const endDate = typeof value.to === 'string' ? new Date(value.to) : value.to;

      this.dateRangeValue = {
        startDate,
        endDate,
        label: value.label,
      };
    } else {
      this.dateRangeValue = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // NgxDatex handles disabled state through the [disabled] input
  }

  /* ============================
     UI API
  ============================ */

  show(): void {
    // NgxDatex handles show/hide through its own API
  }

  hide(): void {
    // NgxDatex handles show/hide through its own API
  }

  toggle(): void {
    // NgxDatex handles show/hide through its own API
  }
}
