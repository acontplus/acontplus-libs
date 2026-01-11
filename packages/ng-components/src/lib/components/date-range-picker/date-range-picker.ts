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
import { CommonModule } from '@angular/common';
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

export interface DateRangePickerOptions extends DatexOptions {
  presetTheme?: 'default' | 'bootstrap' | 'material' | 'custom';
}

export interface DateRangeValue {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'acp-date-range-picker',
  template: `
    <mat-form-field [appearance]="appearance()" class="full-width">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }

      <!-- Checkbox in prefix -->
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
        [id]="id"
      />

      <!-- Checkbox in suffix -->
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

      <!-- Calendar icon button -->
      <!-- @if (showCalendarButton()) {
        <button
          mat-icon-button
          matSuffix
          type="button"
          (click)="toggle()"
          [attr.aria-label]="'Abrir selector de fechas'"
        >
          <mat-icon>{{ calendarIcon() }}</mat-icon>
        </button>
      } -->

      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }
      @if (errorState && errorMessage()) {
        <mat-error>{{ errorMessage() }}</mat-error>
      }
    </mat-form-field>
  `,
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
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
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
})
export class DateRangePicker
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    ControlValueAccessor,
    MatFormFieldControl<DateRangeValue | Date>
{
  static nextId = 0;

  @ViewChild('dateInput', { static: true }) dateInput!: ElementRef<HTMLInputElement>;

  // MatFormFieldControl implementation
  readonly stateChanges = new Subject<void>();
  readonly id = `acp-date-range-picker-${DateRangePicker.nextId++}`;
  readonly controlType = 'acp-date-range-picker';
  readonly autofilled = false;

  private _focused = signal(false);
  private _required = signal(false);
  private _value = signal<DateRangeValue | Date | null>(null);

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

  get value(): DateRangeValue | Date | null {
    return this._value();
  }

  set value(val: DateRangeValue | Date | null) {
    this._value.set(val);
    this.stateChanges.next();
  }

  private readonly _errorState = false;

  get errorState(): boolean {
    return this._errorState;
  }

  get userAriaDescribedBy(): string | undefined {
    return undefined;
  }

  get placeholder(): string {
    return this.placeholderText();
  }

  get disabled(): boolean {
    return this.isDisabled();
  }

  ngControl: any = null;

  // Configuration inputs
  options = input<DateRangePickerOptions>({});

  // UI inputs
  placeholderText = input('Seleccionar rango de fechas');
  isDisabled = input(false);
  inputReadonly = input(false);
  label = input<string>();
  hint = input<string>();
  errorMessage = input<string>();
  appearance = input<'fill' | 'outline'>('outline');

  // Icon inputs
  calendarIcon = input('date_range');
  showCalendarButton = input(false);

  // Checkbox functionality
  showCheckbox = input(false);
  checkboxChecked = input(false);
  checkboxReadonly = input(false);
  checkboxAriaLabel = input('Toggle selection');
  checkboxPosition = input<'prefix' | 'suffix'>('suffix');

  // Events
  dateRangeSelected = output<{
    startDate: Date;
    endDate: Date;
    label?: string;
  }>();
  pickerShow = output<void>();
  pickerHide = output<void>();
  pickerApply = output<void>();
  pickerCancel = output<void>();
  checkboxChange = output<boolean>();

  // Internal state
  private picker?: Datex;
  private isInitialized = signal(false);

  // ControlValueAccessor implementation
  private onChange = (_value: any) => {
    // This will be replaced by registerOnChange
  };
  private onTouched = () => {
    // This will be replaced by registerOnTouched
  };

  constructor() {
    // No effect here to avoid infinite loops - using ngOnChanges instead
  }

  ngOnInit(): void {
    this.initializePicker();
    this.isInitialized.set(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && !changes['options'].isFirstChange()) {
      if (this.picker) {
        this.updateOptions();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.picker) {
      this.picker.remove();
    }
    this.stateChanges.complete();
  }

  setDescribedByIds(_ids: string[]): void {
    // Implementation for accessibility
  }

  onContainerClick(_event: MouseEvent): void {
    if (!this.focused) {
      this.focus();
    }
  }

  focus(): void {
    this.dateInput.nativeElement.focus();
    this._focused.set(true);
    this.stateChanges.next();
  }

  blur(): void {
    this._focused.set(false);
    this.onTouched();
    this.stateChanges.next();
  }

  private initializePicker(): void {
    const options = this.buildDatexOptions();

    this.picker = new Datex(
      this.dateInput.nativeElement,
      options,
      (startDate: Date, endDate: Date, label?: string) => {
        const opts = this.options();
        const value = opts.singleDatePicker ? startDate : { startDate, endDate };

        this._value.set(value);
        this.onChange(value);
        this.onTouched();

        this.dateRangeSelected.emit({ startDate, endDate, label });
        this.stateChanges.next();
      },
    );

    this.setupEventListeners();
  }

  private updateOptions(): void {
    if (!this.picker) return;

    // Try to use native updateOptions if available
    if (typeof this.picker.updateOptions === 'function') {
      const newOptions = this.buildDatexOptions();
      this.picker.updateOptions(newOptions);
    } else {
      // Fallback to reinitialize if updateOptions is not available
      this.reinitializePicker();
    }
  }

  private reinitializePicker(): void {
    if (!this.isInitialized()) return;

    const currentValue = this._value();

    if (this.picker) {
      this.picker.remove();
      this.picker = undefined;
    }

    this.initializePicker();

    if (currentValue) {
      setTimeout(() => {
        this.writeValue(currentValue);
      }, 0);
    }
  }

  private buildDatexOptions(): DatexOptions {
    const opts = this.options();
    const today = new Date();

    const defaultOptions: DatexOptions = {
      startDate: today,
      endDate: today,
      autoApply: false,
      singleDatePicker: false,
      showDropdowns: true,
      linkedCalendars: true,
      autoUpdateInput: true,
      alwaysShowCalendars: false,
      showCustomRangeLabel: true,
      timePicker: false,
      timePicker24Hour: true,
      timePickerIncrement: 1,
      timePickerSeconds: false,
      ranges: {},
      opens: 'center',
      drops: 'auto',
      locale: SPANISH_LOCALE,
      buttonClasses: 'btn btn-sm',
      applyButtonClasses: 'btn-success',
      cancelButtonClasses: 'btn-danger',
      theme: this.getTheme(),
    };

    // Merge user options with defaults, excluding presetTheme
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { presetTheme, ...userOptions } = opts;

    return {
      ...defaultOptions,
      ...userOptions,
      // Always use getTheme() to handle presetTheme properly
      theme: this.getTheme(),
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
    if (!this.picker) return;

    const input = this.dateInput.nativeElement;

    input.addEventListener('show.daterangepicker', () => {
      this.pickerShow.emit();
    });

    input.addEventListener('hide.daterangepicker', () => {
      this.pickerHide.emit();
    });

    input.addEventListener('apply.daterangepicker', () => {
      this.pickerApply.emit();
    });

    input.addEventListener('cancel.daterangepicker', () => {
      this.pickerCancel.emit();
    });

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

  writeValue(value: any): void {
    this._value.set(value);

    if (!this.picker) return;

    if (value) {
      const opts = this.options();
      if (opts.singleDatePicker) {
        const date = value instanceof Date ? value : new Date(value);
        this.picker.setStartDate(date);
        this.picker.setEndDate(date);
      } else if (value.startDate && value.endDate) {
        this.picker.setStartDate(new Date(value.startDate));
        this.picker.setEndDate(new Date(value.endDate));
      }
    }

    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.dateInput) {
      this.dateInput.nativeElement.disabled = isDisabled;
    }
  }

  show(): void {
    this.picker?.show();
  }

  hide(): void {
    this.picker?.hide();
  }

  toggle(): void {
    this.picker?.toggle();
  }

  getStartDate(): Date | null {
    return this.picker?.getStartDate() || null;
  }

  getEndDate(): Date | null {
    return this.picker?.getEndDate() || null;
  }

  setStartDate(date: Date): void {
    this.picker?.setStartDate(date);
  }

  setEndDate(date: Date): void {
    this.picker?.setEndDate(date);
  }

  updateTheme(theme: DatexTheme): void {
    this.picker?.setTheme({ ...this.getTheme(), ...theme });
  }

  updateRanges(ranges: Record<string, [Date, Date]>): void {
    if (this.picker && 'updateRanges' in this.picker) {
      (this.picker as any).updateRanges(ranges);
    }
  }

  updateConfiguration(): void {
    this.reinitializePicker();
  }

  forceReinitialize(): void {
    this.reinitializePicker();
  }

  onCheckboxToggle(event: any): void {
    if (this.checkboxReadonly()) {
      return;
    }

    const newValue = event.checked;
    this.checkboxChange.emit(newValue);
  }
}
