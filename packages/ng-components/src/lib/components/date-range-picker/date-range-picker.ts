import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subject } from 'rxjs';

import {
  Datex,
  DatexOptions,
  DatexTheme,
  SPANISH_LOCALE,
  DEFAULT_THEME,
  BOOTSTRAP_THEME,
  MATERIAL_THEME,
} from 'datex-ui';

import { addDay, weekStart, weekEnd, monthStart, monthEnd, tzDate, format } from '@formkit/tempo';

/* ============================
   TYPES
============================ */

export interface DateRangePickerOptions extends DatexOptions {
  presetTheme?: 'default' | 'bootstrap' | 'material' | 'custom';
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
    format: 'YYYY-MM-DD hh:mm:ss A',
    tz: 'America/Guayaquil',
  });
}

/* ============================
   COMPONENT
============================ */

@Component({
  selector: 'acp-date-range-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePicker),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: DateRangePicker,
    },
  ],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `,
  ],
  template: `
    <mat-form-field [appearance]="appearance()" class="full-width">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }

      <!-- Checkbox prefix -->
      @if (showCheckbox() && checkboxPosition() === 'prefix') {
        <mat-checkbox
          matPrefix
          [checked]="checkboxChecked()"
          [disabled]="checkboxReadonly()"
          [aria-label]="checkboxAriaLabel()"
          (change)="onCheckboxToggle($event)"
          (click)="$event.stopPropagation()"
        ></mat-checkbox>
      }

      <input
        #dateInput
        matInput
        type="text"
        [placeholder]="placeholderText()"
        [disabled]="isDisabled()"
        [readonly]="inputReadonly()"
      />

      <!-- Checkbox suffix -->
      @if (showCheckbox() && checkboxPosition() === 'suffix') {
        <mat-checkbox
          matSuffix
          [checked]="checkboxChecked()"
          [disabled]="checkboxReadonly()"
          [aria-label]="checkboxAriaLabel()"
          (change)="onCheckboxToggle($event)"
          (click)="$event.stopPropagation()"
        ></mat-checkbox>
      }

      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }

      @if (errorState && errorMessage()) {
        <mat-error>{{ errorMessage() }}</mat-error>
      }
    </mat-form-field>
  `,
})
export class DateRangePicker<AsString extends boolean = true>
  implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, MatFormFieldControl<any>
{
  /* ============================
     MAT FORM FIELD
  ============================ */

  static nextId = 0;
  readonly id = `acp-date-range-picker-${DateRangePicker.nextId++}`;
  readonly controlType = 'acp-date-range-picker';
  readonly stateChanges = new Subject<void>();
  readonly autofilled = false;

  @ViewChild('dateInput', { static: true })
  dateInput!: ElementRef<HTMLInputElement>;

  private _focused = signal(false);
  private _required = signal(false);
  private _value = signal<any>(null);

  get focused(): boolean {
    return this._focused();
  }

  get empty(): boolean {
    return !this._value();
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get required(): boolean {
    return this._required();
  }

  private readonly _errorState = false;

  get errorState(): boolean {
    return this._errorState;
  }

  get value(): any {
    return this._value();
  }

  set value(val: any) {
    this._value.set(val);
    this.stateChanges.next();
  }

  get placeholder(): string {
    return this.placeholderText();
  }

  get disabled(): boolean {
    return this.isDisabled();
  }

  ngControl: any = null;

  setDescribedByIds(_ids: string[]): void {
    // Implementation for accessibility
  }

  onContainerClick(): void {
    this.focus();
  }

  focus(): void {
    this.dateInput.nativeElement.focus();
    this._focused.set(true);
    this.stateChanges.next();
  }

  /* ============================
     INPUTS
  ============================ */

  options = input<DateRangePickerOptions>({});
  placeholderText = input('Seleccionar rango de fechas');
  isDisabled = input(false);
  inputReadonly = input(false);
  label = input<string>();
  hint = input<string>();
  errorMessage = input<string>();
  appearance = input<'fill' | 'outline'>('outline');

  formatOutputAsString = input<AsString>(true as AsString);

  calendarIcon = input('date_range');
  showCalendarButton = input(false);

  showCheckbox = input(false);
  checkboxChecked = input(false);
  checkboxReadonly = input(false);
  checkboxAriaLabel = input('Toggle selection');
  checkboxPosition = input<'prefix' | 'suffix'>('suffix');

  /* ============================
     OUTPUTS
  ============================ */

  dateRangeSelected = output<DateRangeValue<AsString>>();
  pickerShow = output<void>();
  pickerHide = output<void>();
  pickerApply = output<void>();
  pickerCancel = output<void>();
  checkboxChange = output<boolean>();

  /* ============================
     INTERNAL
  ============================ */

  private picker?: Datex;
  private currentDate = new Date();

  private onChange = (_value: any) => {
    // This will be replaced by registerOnChange
  };
  private onTouched = () => {
    // This will be replaced by registerOnTouched
  };

  /* ============================
     LIFECYCLE
  ============================ */

  ngOnInit(): void {
    this.initializePicker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.picker) {
      this.reinitializePicker();
    }
  }

  ngOnDestroy(): void {
    this.picker?.remove();
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

  private initializePicker(): void {
    this.picker = new Datex(
      this.dateInput.nativeElement,
      this.buildDatexOptions(),
      (start: Date, end: Date, label?: string) => {
        const range: DateRangeValue<AsString> = {
          from: this.mapDate(start),
          to: this.mapDate(end),
          label,
        };

        this._value.set(range);
        this.onChange(range);
        this.onTouched();

        this.dateRangeSelected.emit(range);
        this.stateChanges.next();
      },
    );

    this.setupEventListeners();
  }

  private reinitializePicker(): void {
    const value = this._value();
    this.picker?.remove();
    this.initializePicker();
    if (value) {
      this.writeValue(value);
    }
  }

  private buildDatexOptions(): DatexOptions {
    const opts = this.options();
    const userOptions = { ...opts };
    delete userOptions.presetTheme;

    return {
      startDate: this.currentDate,
      endDate: this.currentDate,
      locale: SPANISH_LOCALE,
      ranges: this.getDefaultRanges(),
      theme: this.getTheme(),
      ...userOptions,
    };
  }

  private getDefaultRanges(): Record<string, [Date, Date]> {
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

  private getTheme(): DatexTheme {
    const opts = this.options();
    const baseTheme = opts.theme ?? DEFAULT_THEME;

    switch (opts.presetTheme ?? 'material') {
      case 'bootstrap':
        return { ...BOOTSTRAP_THEME, ...baseTheme };
      case 'material':
        return { ...MATERIAL_THEME, ...baseTheme };
      case 'custom':
        return baseTheme;
      default:
        return { ...DEFAULT_THEME, ...baseTheme };
    }
  }

  private setupEventListeners(): void {
    const input = this.dateInput.nativeElement;

    input.addEventListener('show.daterangepicker', () => this.pickerShow.emit());
    input.addEventListener('hide.daterangepicker', () => this.pickerHide.emit());
    input.addEventListener('apply.daterangepicker', () => this.pickerApply.emit());
    input.addEventListener('cancel.daterangepicker', () => this.pickerCancel.emit());

    input.addEventListener('focus', () => {
      this._focused.set(true);
      this.stateChanges.next();
    });

    input.addEventListener('blur', () => {
      this._focused.set(false);
      this.onTouched();
      this.stateChanges.next();
    });
  }

  /* ============================
     CVA
  ============================ */

  writeValue(value: any): void {
    this._value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.dateInput.nativeElement.disabled = isDisabled;
  }

  /* ============================
     UI API
  ============================ */

  show(): void {
    this.picker?.show();
  }

  hide(): void {
    this.picker?.hide();
  }

  toggle(): void {
    this.picker?.toggle();
  }

  onCheckboxToggle(event: any): void {
    if (!this.checkboxReadonly()) {
      this.checkboxChange.emit(event.checked);
    }
  }
}
