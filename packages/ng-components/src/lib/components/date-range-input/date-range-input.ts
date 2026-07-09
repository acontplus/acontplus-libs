import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';

import { ACP_DATE_OPTION_TYPE } from './constant/date-filter-const';
import { ACP_DEFAULT_DATE_OPTIONS } from './data/default-date-options';
import { IAcpSelectDateOption } from './model/select-date-option.model';
import {
  computeOptionDateRange,
  getClone,
  getDateString,
  getDateWithOffset,
  getDaysInMonth,
  getFormattedDateString,
  getRelativeExpr,
  parseDateByFormat,
  isSameDay,
  resetOptionSelection,
  selectCustomOption,
} from './utils/date-picker-utilities';
import { parseHumanDate } from './utils/human-date-parser';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, DateRange } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AcpDateRangeCalendar } from './calendar/date-range-calendar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import type { AcpSelectedDateEvent } from './model/date-selection-event.model';
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Button } from '../button';
@Component({
  selector: 'acp-date-range-input',
  templateUrl: './date-range-input.html',
  styleUrls: ['./date-range-input.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCheckboxModule,
    NgClass,
    AcpDateRangeCalendar,
    DatePipe,
    NgTemplateOutlet,
    Button,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcpDateRangeInput implements OnInit, AfterViewInit {
  public isDateOptionList = false;
  public isCustomRange = false;

  @Input() inputLabel = 'Date Range';
  showClearButton = input(false);
  showCalendarIcon = input(false);
  showRangeRequired = input(false);
  isRangeRequired = input(false);
  @Input() staticOptionId = 'static-options';
  @Input() dynamicOptionId = 'dynamic-options';
  @Input() calendarId = 'custom-calendar';
  @Input() enableDefaultOptions = true;
  @Input() selectedDates!: DateRange<Date> | null;
  @Input() dateFormat = 'dd/MM/yyyy';
  @Input() isShowStaticDefaultOptions = false;
  @Input() hideDefaultOptions = false;
  @Input() cdkConnectedOverlayOffsetX = 0;
  @Input() cdkConnectedOverlayOffsetY = 0;
  @Input() listCdkConnectedOverlayOffsetY = 0;
  @Input() listCdkConnectedOverlayOffsetX = 0;
  @Input() selectedOptionIndex = 0; // por defecto hoy
  @Input() displaySelectedLabel = false;
  /**
   * When true, the main input shows the human-readable expressions
   * (e.g. `now-7d - now`) instead of the absolute date range. If
   * `displaySelectedLabel` is also true, the label takes priority.
   */
  @Input() displaySelectedExpression = false;
  /**
   * When true, the custom-range footer shows two editable Material inputs
   * (start / end) that accept dates in `dateFormat`, ISO 8601 durations
   * (`p7d`), or date math (`now-7d`). When false, a read-only label is shown.
   */
  @Input() enableEditableDates = false;
  @Input() cdkConnectedOverlayPush = true;
  @Input() cdkConnectedOverlayPositions = [];
  @Input() allowSingleDateSelection = true;
  /**
   * When true, automatically selects the preset option whose computed date range
   * matches the provided selectedDates (works with both default and custom options).
   * Falls back to "Custom Range" if no option matches.
   */
  @Input() autoSelectOption = false;

  // default min date is current date - 10 years.
  @Input() minDate = getDateWithOffset(-10);
  // default max date is current date + 10 years.
  @Input() maxDate = getDateWithOffset(10);

  dateSelectionChanged = output<AcpSelectedDateEvent>();
  dateListOptions = output<IAcpSelectDateOption[]>();
  rangeRequiredChange = output<boolean>();

  private cdref: ChangeDetectorRef = inject(ChangeDetectorRef);
  private el: ElementRef = inject(ElementRef);

  @ViewChild('calendar') calendar?: AcpDateRangeCalendar;

  private _dateOptions: WritableSignal<IAcpSelectDateOption[]> = signal([]);
  visibleOptions = computed(() => this._dateOptions().filter(op => op.isVisible));

  /**
   * Reactive form backing the editable start/end inputs. Each control accepts
   * a `dateFormat` date, an ISO 8601 duration, or a date-math expression; the
   * group is invalid when either value is unparseable or start is after end.
   */
  editableForm = new FormGroup(
    {
      start: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, c => this.validateDateControl(c)],
      }),
      end: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, c => this.validateDateControl(c)],
      }),
    },
    { validators: g => this.validateRange(g) },
  );

  // The raw expressions the user last committed via the editable inputs, kept
  // so human-language input (e.g. `now-7d`) is shown again instead of being
  // replaced by an absolute date - but only while it still resolves to the
  // current range (see populateEditableForm).
  private editableExpr: { start: string; end: string } | null = null;

  @Input()
  set dateDropDownOptions(defaultDateList: IAcpSelectDateOption[]) {
    const options = [
      ...(this.enableDefaultOptions ? getClone(ACP_DEFAULT_DATE_OPTIONS) : []),
      ...(defaultDateList ?? []),
    ];
    this._dateOptions.set(options);
  }

  get dateDropDownOptions(): IAcpSelectDateOption[] {
    return this._dateOptions() ?? [];
  }

  ngOnInit(): void {
    if (this.isDefaultInitRequired()) {
      this.initDefaultOptions();
    }
    this.dateListOptions.emit(this.dateDropDownOptions);
  }

  ngAfterViewInit(): void {
    this.updateDefaultDatesValues();
  }

  /**
   * Alterna la visibilidad de la lista de opciones de fecha predeterminada.
   * Si el panel de rango personalizado está abierto, lo cierra en su lugar.
   * Si el dropdown ya está abierto y se hace clic en el input, no lo cierra.
   *
   * @param event MouseEvent opcional que activa el alternador.
   */
  toggleRangeSelection(event: MouseEvent): void {
    event.stopPropagation();
    const newValue = !this.isRangeRequired();
    this.rangeRequiredChange.emit(newValue);
    this.cdref.markForCheck();
  }

  toggleDateOptionSelectionList(event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopImmediatePropagation();

    if (this.isCustomRange) {
      this.isCustomRange = false;
      return;
    }

    // Si el dropdown ya está abierto, no hacer nada (solo cierra con clic fuera)
    if (this.isDateOptionList) {
      return;
    }

    // Cuando la selección activa es un rango personalizado, reabre directamente en la
    // vista de rango personalizado en lugar de la lista de opciones.
    const selectedOption = this.dateDropDownOptions.find(o => o.isSelected);
    if (selectedOption?.optionType === ACP_DATE_OPTION_TYPE.CUSTOM) {
      this.isCustomRange = true;
      this.populateEditableForm();
      return;
    }
    this.isDateOptionList = true;
  }

  /**
   * Actualiza la selección de rango de fecha personalizado desde la entrada.
   *
   * @param input El elemento de entrada HTML asociado con el selector de fecha.
   * @param selectedDates El rango de fechas seleccionado.
   */
  updateCustomRange(input: HTMLInputElement, selectedDates: DateRange<Date> | null): void {
    if (this.allowSingleDateSelection && !selectedDates?.end) {
      const date = selectedDates?.start ?? new Date();
      selectedDates = new DateRange<Date>(date, date);
    }
    if (this.isCustomRange) {
      resetOptionSelection(this.dateDropDownOptions);
      selectCustomOption(this.dateDropDownOptions);
      this.syncOptionSelection();
      this.isCustomRange = false;
    }

    const start = selectedDates?.start ?? new Date();
    const end = selectedDates?.end ?? new Date();
    this.updateSelectedDates(input, start, end, null);
  }

  /**
   * Actualiza la selección cuando se hace clic en una opción de fecha específica.
   *
   * @param option La opción de fecha seleccionada.
   * @param input El elemento de entrada HTML a actualizar con fechas seleccionadas.
   */
  updateSelection(option: IAcpSelectDateOption, input: HTMLInputElement): void {
    this.isDateOptionList = false;
    this.isCustomRange = option.optionType === ACP_DATE_OPTION_TYPE.CUSTOM;
    if (this.isCustomRange) {
      resetOptionSelection(this.dateDropDownOptions);
      selectCustomOption(this.dateDropDownOptions);
      this.populateEditableForm();
    } else {
      resetOptionSelection(this.dateDropDownOptions, option);
      this.updateDateOnOptionSelect(option, input);
      // Cerrar el panel de rango personalizado cuando se selecciona una opción predefinida
      this.isCustomRange = false;
    }
    this.syncOptionSelection();
    this.cdref.markForCheck();
  }

  /**
   * Re-emite la señal de opciones después de un cambio de selección en el lugar para que
   * las vistas OnPush (vinculadas a `visibleOptions` calculado) reflejen de manera confiable
   * el nuevo estado `isSelected` - la misma notificación que proporciona el `set` de señal inicial.
   */
  private syncOptionSelection(): void {
    this._dateOptions.update(options => [...options]);
  }

  /**
   * Alterna la visibilidad de la vista de selección de rango de fecha personalizado.
   */
  toggleCustomDateRangeView(): void {
    this.isCustomRange = !this.isCustomRange;
    if (this.isCustomRange) {
      this.populateEditableForm();
    }
  }

  /**
   * Analiza un único valor de entrada editable, aceptando una fecha `dateFormat`
   * o uno de los formatos humanos (duración ISO 8601, matemática de fecha).
   *
   * @param value - La cadena de entrada sin procesar.
   * @returns La fecha analizada, o `null` si no se puede analizar.
   */
  private parseInputValue(value: string): Date | null {
    const trimmed = value?.trim();
    if (!trimmed) {
      return null;
    }
    return parseDateByFormat(trimmed, this.dateFormat) ?? parseHumanDate(trimmed);
  }

  /**
   * Validador para un único control de fecha editable: válido cuando el valor se analiza
   * como una fecha. Los valores vacíos se dejan al validador `required`.
   */
  private validateDateControl(control: AbstractControl): ValidationErrors | null {
    const value = (control.value ?? '').trim();
    if (!value) {
      return null;
    }
    return this.parseInputValue(value) ? null : { invalidDate: true };
  }

  /**
   * Validador de grupo que asegura que la fecha de inicio analizada no sea posterior a la fecha de fin.
   */
  private validateRange(group: AbstractControl): ValidationErrors | null {
    const start = this.parseInputValue(group.get('start')?.value ?? '');
    const end = this.parseInputValue(group.get('end')?.value ?? '');
    if (start && end && start > end) {
      return { rangeOrder: true };
    }
    return null;
  }

  /**
   * Confirma las entradas editables en el calendario para que las vistas y la acción
   * Aplicar reflejen los valores escritos. No-op cuando la edición está deshabilitada o
   * el formulario es inválido.
   *
   * @param calendar - La instancia del componente de calendario desde la plantilla.
   */
  commitEditableDates(calendar: AcpDateRangeCalendar): void {
    if (!this.enableEditableDates || this.editableForm.invalid) {
      return;
    }
    const startRaw = this.editableForm.controls.start.value.trim();
    const endRaw = this.editableForm.controls.end.value.trim();
    const start = this.parseInputValue(startRaw);
    const end = this.parseInputValue(endRaw);
    if (!start || !end) {
      return;
    }
    // Recuerda exactamente lo que escribió el usuario para que la expresión (ej: `now-7d`)
    // sobreviva a una reapertura en lugar de mostrarse como una fecha absoluta resuelta.
    this.editableExpr = { start: startRaw, end: endRaw };
    calendar.selectedDates = new DateRange<Date>(start, end);
    this.cdref.markForCheck();
  }

  /**
   * Refleja una selección de calendario (clic de fecha) en las entradas editables como
   * fechas absolutas. Una selección de calendario es una selección absoluta explícita, por lo que
   * cualquier expresión recordada se borra y las entradas muestran fechas formateadas.
   *
   * @param range - El rango emitido por el calendario.
   */
  onCalendarSelectionChange(range: DateRange<Date>): void {
    if (!this.enableEditableDates) {
      return;
    }
    this.editableExpr = null;
    this.editableForm.setValue({
      start: range.start ? getDateString(range.start, this.dateFormat) : '',
      end: range.end ? getDateString(range.end, this.dateFormat) : '',
    });
    this.cdref.markForCheck();
  }

  /**
   * Confirma las entradas editables y aplica el rango, cerrando el panel -
   * lo mismo que hacer clic en Aplicar. Se usa para la tecla Intro. No-op cuando la edición está
   * deshabilitada o el formulario es inválido, por lo que Intro nunca cierra con entrada incorrecta.
   *
   * @param input - El elemento de entrada de fecha principal a actualizar.
   * @param calendar - La instancia del componente de calendario desde la plantilla.
   */
  applyEditableDates(input: HTMLInputElement, _calendar: AcpDateRangeCalendar): void {
    if (!this.enableEditableDates || this.editableForm.invalid) {
      return;
    }

    // Parsear las fechas directamente del formulario editable
    const startRaw = this.editableForm.controls.start.value.trim();
    const endRaw = this.editableForm.controls.end.value.trim();
    const start = this.parseInputValue(startRaw);
    const end = this.parseInputValue(endRaw);

    if (!start || !end) {
      return;
    }

    // Crear el rango de fechas
    const dateRange = new DateRange<Date>(start, end);

    // Intentar encontrar una opción predefinida que coincida con este rango
    const matchedOption = this.findMatchingOption(dateRange);

    if (matchedOption) {
      // Si encontramos una opción que coincide, seleccionarla
      resetOptionSelection(this.dateDropDownOptions, matchedOption);
      this.syncOptionSelection();
      this.updateDateOnOptionSelect(matchedOption, input);
    } else {
      // Si no coincide con ninguna opción, usar rango personalizado
      resetOptionSelection(this.dateDropDownOptions);
      selectCustomOption(this.dateDropDownOptions);
      this.syncOptionSelection();
      this.updateSelectedDates(input, start, end, null);
    }

    // Cerrar el panel de rango personalizado
    this.isCustomRange = false;
    this.cdref.markForCheck();
  }

  /**
   * Rellena previamente las entradas editables desde la selección actual: expresiones relativas
   * para una opción de diferencia de días (ej: `now-7d` .. `now`), de lo contrario las
   * fechas formateadas absolutas.
   */
  private populateEditableForm(): void {
    if (!this.enableEditableDates) {
      return;
    }
    const range = this.selectedDates;
    if (range?.start && range?.end) {
      const option = this.dateDropDownOptions.find(o => o.isSelected) ?? null;
      this.editableForm.setValue(this.resolveDisplayExpr(range.start, range.end, option));
      // Actualizar el calendario para que muestre el rango correcto
      if (this.calendar) {
        this.calendar.selectedDates = range;
      }
    } else {
      this.editableForm.setValue({ start: '', end: '' });
    }
  }

  /**
   * Resuelve las expresiones legibles de inicio/fin para un rango. Prefiere la
   * expresión comprometida del usuario (cuando aún se resuelve a este rango),
   * luego la forma relativa de una opción de diferencia de días, y finalmente las
   * fechas formateadas absolutas. Compartido por las entradas editables y el evento emitido.
   *
   * @param start - Fecha de inicio del rango.
   * @param end - Fecha de fin del rango.
   * @param opt - La opción de fecha asociada, si la hay.
   * @returns Las cadenas de expresión de inicio y fin.
   */
  private resolveDisplayExpr(
    start: Date,
    end: Date,
    opt: IAcpSelectDateOption | null,
  ): { start: string; end: string } {
    if (this.editableExpr && this.exprMatchesDates(this.editableExpr, start, end)) {
      return { start: this.editableExpr.start, end: this.editableExpr.end };
    }
    const optionExpr = getRelativeExpr(opt);
    if (optionExpr) {
      return optionExpr;
    }
    return {
      start: getDateString(start, this.dateFormat),
      end: getDateString(end, this.dateFormat),
    };
  }

  /**
   * Checks whether a saved expression still resolves (to day precision) to the
   * given dates, so a stale expression is not reused after the range changed
   * by other means.
   */
  private exprMatchesDates(expr: { start: string; end: string }, start: Date, end: Date): boolean {
    const exprStart = this.parseInputValue(expr.start);
    const exprEnd = this.parseInputValue(expr.end);
    return !!exprStart && !!exprEnd && isSameDay(exprStart, start) && isSameDay(exprEnd, end);
  }

  /**
   * Clears the currently selected dates and resets all related properties.
   *
   * @param event The MouseEvent triggering the clear action.
   */
  clearSelection(event: MouseEvent): void {
    event?.stopImmediatePropagation();
    this.minDate = getDateWithOffset(-10);
    this.maxDate = getDateWithOffset(10);
    this.selectedDates = null;
    resetOptionSelection(this.dateDropDownOptions);
    this.syncOptionSelection();
    this.clearDateInput();
    this.cdref.markForCheck();
    const selectedDateEventData: AcpSelectedDateEvent = {
      range: null,
      selectedOption: null,
      startExpr: null,
      endExpr: null,
    };
    this.dateSelectionChanged.emit(selectedDateEventData);
  }

  /**
   * Clears the input field value for the date picker.
   */
  private clearDateInput(): void {
    const dateInputField = this.el.nativeElement.querySelector('#date-input-field');
    if (dateInputField) {
      dateInputField.value = '';
    }
  }

  /**
   * Updates selected dates based on a selected option and input element.
   *
   * @param option The selected date option.
   * @param input The HTML input element to update.
   */
  private updateDateOnOptionSelect(option: IAcpSelectDateOption, input: HTMLInputElement): void {
    // If there is a callback function, use it to get the date range
    if (option?.callBackFunction) {
      const dateRange: DateRange<Date> = option.callBackFunction();
      if (dateRange?.start && dateRange?.end) {
        this.updateSelectedDates(input, dateRange.start, dateRange.end, option);
        return;
      }
    }
    this.updateDateWithSelectedOption(option, input);
  }

  /**
   * Calculates and updates the start and end dates based on the selected option.
   *
   * @param option The selected date option.
   * @param input The HTML input element to update.
   */
  private updateDateWithSelectedOption(
    option: IAcpSelectDateOption,
    input: HTMLInputElement,
  ): void {
    const currDate = new Date();
    let startDate: Date = new Date();
    let lastDate: Date = new Date();
    // Determine the date range based on the option key
    switch (option.optionType) {
      case ACP_DATE_OPTION_TYPE.DATE_DIFF: {
        const diff = option.dateDiff ?? 0;
        startDate.setDate(startDate.getDate() + diff);
        // Para "Hoy" (diff=0) y "Ayer" (diff=-1), ambas fechas son el mismo día
        // Para "Últimos N días" (diff<-1), rango desde hace N días hasta hoy
        lastDate = diff === 0 || diff === -1 ? new Date(startDate) : new Date();
        break;
      }

      case ACP_DATE_OPTION_TYPE.LAST_MONTH:
        currDate.setMonth(currDate.getMonth() - 1);
        startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        lastDate = new Date(currDate.getFullYear(), currDate.getMonth(), getDaysInMonth(currDate));
        break;

      case ACP_DATE_OPTION_TYPE.THIS_MONTH:
        startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        lastDate = new Date(currDate.getFullYear(), currDate.getMonth(), getDaysInMonth(currDate));
        break;

      case ACP_DATE_OPTION_TYPE.YEAR_TO_DATE:
        startDate = new Date(currDate.getFullYear(), 0, 1);
        break;

      case ACP_DATE_OPTION_TYPE.MONTH_TO_DATE:
        startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        break;

      default:
        break;
    }

    // Update the selected dates
    this.updateSelectedDates(input, startDate, lastDate, option);
  }

  /**
   * Updates the date range and input display.
   *
   * @param input The HTML input element.
   * @param start Start date of the range.
   * @param end End date of the range.
   * @param opt Optional selected date option.
   */
  private updateSelectedDates(
    input: HTMLInputElement,
    start: Date,
    end: Date,
    opt: IAcpSelectDateOption | null,
  ): void {
    const range = new DateRange(start, end);
    this.selectedDates = range;

    const expr = this.resolveDisplayExpr(start, end, opt);
    const rangeLabel = `${getDateString(
      start,
      this.dateFormat,
    )} - ${getDateString(end, this.dateFormat)}`;

    if (this.displaySelectedLabel && opt?.optionLabel) {
      input.value = opt.optionLabel;
    } else if (this.displaySelectedExpression) {
      input.value = `${expr.start} - ${expr.end}`;
    } else {
      input.value = rangeLabel;
    }

    this.dateSelectionChanged.emit({
      range,
      selectedOption: this.dateDropDownOptions.find(o => o.isSelected) ?? null,
      startExpr: expr.start,
      endExpr: expr.end,
    });
    this.cdref.markForCheck();
  }

  /**
   * Updates the input and internal state with default dates on initialization.
   * When autoSelectOption is true and selectedDates is provided, attempts to
   * match against existing options before falling back to Custom Range.
   */
  private updateDefaultDatesValues(): void {
    const input: HTMLInputElement = this.el.nativeElement.querySelector('#date-input-field');

    if (this.selectedDates?.start && this.selectedDates?.end) {
      const matchedOption = this.autoSelectOption
        ? this.findMatchingOption(this.selectedDates)
        : null;

      if (matchedOption) {
        resetOptionSelection(this.dateDropDownOptions, matchedOption);
        const label = this.displaySelectedLabel ? matchedOption.optionLabel : null;
        input.value = label ?? getFormattedDateString(this.selectedDates, this.dateFormat);
      } else {
        resetOptionSelection(this.dateDropDownOptions);
        selectCustomOption(this.dateDropDownOptions);
        input.value = getFormattedDateString(this.selectedDates, this.dateFormat);
      }

      this.cdref.detectChanges();
      return;
    }

    const selectedOptions = this._dateOptions().find(option => option.isSelected);

    if (selectedOptions && selectedOptions.optionType !== ACP_DATE_OPTION_TYPE.CUSTOM) {
      this.updatedFromListValueSelection(selectedOptions, input);
      this.cdref.detectChanges();
    }
  }

  /**
   * Maneja cambios manuales en el input principal de fecha.
   * Cuando el usuario escribe directamente, deselecciona todas las opciones
   * predefinidas y marca "Rango personalizado" como seleccionado.
   *
   * @param input El elemento de entrada HTML que cambió.
   */
  onMainInputChange(input: HTMLInputElement): void {
    // Si el input está vacío, no hacer nada
    if (!input.value || input.value.trim() === '') {
      return;
    }

    // Intentar parsear el rango de fechas del input
    // Formato esperado: "dd/MM/yyyy - dd/MM/yyyy"
    const parts = input.value.split(' - ');
    if (parts.length === 2) {
      const start = this.parseInputValue(parts[0].trim());
      const end = this.parseInputValue(parts[1].trim());

      if (start && end) {
        // Crear el rango de fechas
        const dateRange = new DateRange<Date>(start, end);
        // Actualizar selectedDates para que el calendario se muestre correctamente
        this.selectedDates = dateRange;
        // Actualizar el calendario con el rango para que navegue y pinte correctamente
        if (this.calendar) {
          this.calendar.selectedDates = dateRange;
        }
        // Forzar detección de cambios para que todo se actualice
        this.cdref.detectChanges();
      }
    }

    // Deseleccionar todas las opciones predefinidas
    resetOptionSelection(this.dateDropDownOptions);

    // Marcar "Rango personalizado" como seleccionado
    selectCustomOption(this.dateDropDownOptions);

    // Actualizar la señal de opciones para reflejar el cambio
    this.syncOptionSelection();

    // Abrir el panel de rango personalizado para que aparezca el calendario
    this.isCustomRange = true;
    this.populateEditableForm();

    // Marcar para detección de cambios
    this.cdref.markForCheck();
  }

  /**
   * Iterates over all non-custom options and returns the first one whose
   * computed date range matches the provided selectedDates (day-level comparison).
   * Works for both default options and consumer-provided options with callBackFunction.
   *
   * @param selectedDates The date range to match against
   * @returns The matching ISelectDateOption, or null if none found
   */
  private findMatchingOption(selectedDates: DateRange<Date>): IAcpSelectDateOption | null {
    const candidates = this.dateDropDownOptions.filter(
      option => option.optionType !== ACP_DATE_OPTION_TYPE.CUSTOM,
    );

    for (const option of candidates) {
      const range = computeOptionDateRange(option);
      if (
        range?.start &&
        range?.end &&
        isSameDay(range.start, selectedDates.start!) &&
        isSameDay(range.end, selectedDates.end!)
      ) {
        return option;
      }
    }

    return null;
  }

  /**
   * Updates the input and selected dates based on a selected option from the list.
   *
   * @param selectedOption The selected date option.
   * @param input The HTML input element to update.
   */
  private updatedFromListValueSelection(
    selectedOption: IAcpSelectDateOption,
    input: HTMLInputElement,
  ): void {
    // This will update value if option is selected from default list.
    if (!selectedOption.callBackFunction) {
      this.updateDateOnOptionSelect(selectedOption, input);
      return;
    }
    // This will update value if option is selected from provided custom list.
    const dateRange: DateRange<Date> = selectedOption.callBackFunction();
    this.updateSelectedDates(
      input,
      dateRange.start ?? new Date(),
      dateRange.end ?? new Date(),
      selectedOption,
    );
  }

  /**
   * Checks whether default initialization of options is required.
   *
   * @returns True if default options need to be initialized, otherwise false.
   */
  private isDefaultInitRequired(): boolean {
    return this.enableDefaultOptions && !this._dateOptions.length;
  }

  /**
   * Initializes the default date options with the selected index.
   */
  private initDefaultOptions(): void {
    const options = getClone<IAcpSelectDateOption[]>(ACP_DEFAULT_DATE_OPTIONS).map((opt, idx) => ({
      ...opt,
      isSelected: idx === this.selectedOptionIndex,
    }));
    this._dateOptions.set(options);
  }
}
