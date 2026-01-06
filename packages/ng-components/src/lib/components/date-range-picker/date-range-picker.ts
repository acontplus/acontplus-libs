import {
  format,
  addDay,
  addMonth,
  dayStart,
  dayEnd,
  isAfter,
  isBefore,
  parse,
} from '@formkit/tempo';

// Helper functions since @formkit/tempo doesn't have isSame and isValid
function isSame(date1: Date, date2: Date, unit: 'day' | 'month' | 'year' = 'day'): boolean {
  if (!date1 || !date2) return false;

  switch (unit) {
    case 'day':
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    case 'month':
      return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
    case 'year':
      return date1.getFullYear() === date2.getFullYear();
    default:
      return false;
  }
}

function isValid(date: Date | null | undefined): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

export interface DateRangePickerTheme {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
  selectedColor?: string;
  rangeColor?: string;
  todayColor?: string;
  disabledColor?: string;
  applyButtonColor?: string;
  cancelButtonColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontFamily?: string;
}

export const DEFAULT_THEME: DateRangePickerTheme = {
  primaryColor: '#357ebd',
  secondaryColor: '#ccc',
  backgroundColor: '#ffffff',
  borderColor: '#ddd',
  textColor: '#000000',
  hoverColor: '#eee',
  selectedColor: '#357ebd',
  rangeColor: '#ebf4f8',
  todayColor: '#357ebd',
  disabledColor: '#999',
  applyButtonColor: '#357ebd',
  cancelButtonColor: '#999',
  borderRadius: '4px',
  fontSize: '15px',
  fontFamily: 'Arial',
};

export const BOOTSTRAP_THEME: DateRangePickerTheme = {
  primaryColor: '#0d6efd',
  secondaryColor: '#6c757d',
  backgroundColor: '#ffffff',
  borderColor: '#dee2e6',
  textColor: '#212529',
  hoverColor: '#e9ecef',
  selectedColor: '#0d6efd',
  rangeColor: '#cfe2ff',
  todayColor: '#0d6efd',
  disabledColor: '#adb5bd',
  applyButtonColor: '#198754',
  cancelButtonColor: '#dc3545',
  borderRadius: '6px',
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

export const MATERIAL_THEME: DateRangePickerTheme = {
  primaryColor: '#1976d2',
  secondaryColor: '#757575',
  backgroundColor: '#ffffff',
  borderColor: '#e0e0e0',
  textColor: '#212121',
  hoverColor: '#f5f5f5',
  selectedColor: '#1976d2',
  rangeColor: '#e3f2fd',
  todayColor: '#1976d2',
  disabledColor: '#bdbdbd',
  applyButtonColor: '#4caf50',
  cancelButtonColor: '#f44336',
  borderRadius: '4px',
  fontSize: '14px',
  fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
};

export interface DateRangePickerOptions {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  minYear?: number;
  maxYear?: number;
  maxSpan?: { days?: number } | null;
  autoApply?: boolean;
  singleDatePicker?: boolean;
  showDropdowns?: boolean;
  linkedCalendars?: boolean;
  autoUpdateInput?: boolean;
  alwaysShowCalendars?: boolean;
  showCustomRangeLabel?: boolean;
  timePicker?: boolean;
  timePicker24Hour?: boolean;
  timePickerIncrement?: number;
  timePickerSeconds?: boolean;
  ranges?: Record<string, [Date, Date]>;
  opens?: 'left' | 'right' | 'center';
  drops?: 'up' | 'down' | 'auto';
  locale?: DateRangePickerLocale;
  buttonClasses?: string;
  applyButtonClasses?: string;
  cancelButtonClasses?: string;
  theme?: DateRangePickerTheme;
}

export interface DateRangePickerLocale {
  format: string;
  separator: string;
  applyLabel: string;
  cancelLabel: string;
  customRangeLabel: string;
  daysOfWeek: string[];
  monthNames: string[];
  firstDay: number;
}

export const SPANISH_LOCALE: DateRangePickerLocale = {
  format: 'DD/MM/YYYY',
  separator: ' - ',
  applyLabel: 'Aplicar',
  cancelLabel: 'Cancelar',
  customRangeLabel: 'Rango Personalizado',
  daysOfWeek: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  firstDay: 1, // Monday
};

export const SPANISH_LOCALE_WITH_TIME: DateRangePickerLocale = {
  format: 'DD/MM/YYYY HH:mm',
  separator: ' - ',
  applyLabel: 'Aplicar',
  cancelLabel: 'Cancelar',
  customRangeLabel: 'Rango Personalizado',
  daysOfWeek: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  firstDay: 1, // Monday
};

export type DateRangePickerCallback = (startDate: Date, endDate: Date, label?: string) => void;

interface CalendarState {
  month: Date;
  calendar: Date[][];
}

interface PickerState {
  startDate: Date;
  endDate: Date | null;
  oldStartDate: Date;
  oldEndDate: Date | null;
  isShowing: boolean;
  leftCalendar: CalendarState;
  rightCalendar: CalendarState;
  chosenLabel: string | null;
  hoverDate: Date | null;
}

export class DateRangePicker {
  private element: HTMLElement;
  private container!: HTMLElement;
  private options: Required<DateRangePickerOptions>;
  private locale: DateRangePickerLocale;
  private theme: DateRangePickerTheme;
  private callback: DateRangePickerCallback;
  private state: PickerState;

  // Event handlers
  private boundHandlers = new Map<string, EventListener>();
  private resizeHandler?: EventListener;
  private scrollHandler?: EventListener;
  private documentClickHandler?: EventListener;
  private documentFocusHandler?: EventListener;

  constructor(
    element: HTMLElement | string,
    options: DateRangePickerOptions = {},
    callback?: DateRangePickerCallback,
  ) {
    // Initialize element
    this.element = typeof element === 'string' ? document.getElementById(element)! : element;

    if (!this.element) {
      throw new Error('DateRangePicker: Element not found');
    }

    // Initialize options with defaults
    this.options = this.mergeOptions(options);

    // Initialize locale and theme
    this.locale = this.options.locale;
    this.theme = { ...this.options.theme }; // Usar el tema de las opciones directamente

    // Initialize callback
    this.callback =
      callback ||
      (() => {
        /* empty callback */
      });

    // Initialize state
    const today = new Date();
    this.state = {
      startDate: this.options.timePicker
        ? this.options.startDate
        : dayStart(this.options.startDate),
      endDate: this.options.timePicker ? this.options.endDate : dayEnd(this.options.endDate),
      oldStartDate: this.options.timePicker
        ? this.options.startDate
        : dayStart(this.options.startDate),
      oldEndDate: this.options.timePicker ? this.options.endDate : dayEnd(this.options.endDate),
      isShowing: false,
      leftCalendar: { month: today, calendar: [] },
      rightCalendar: { month: addMonth(today, 1), calendar: [] },
      chosenLabel: null,
      hoverDate: null,
    };

    this.createContainer();
    this.setupEventListeners();
    this.updateElement();

    // Calculate and set initial chosen label
    this.calculateChosenLabel();

    // Apply initial theme to ensure it's ready
    this.applyTheme();
  }

  private applyTheme(): void {
    if (!this.container) {
      return;
    }

    // Remove existing theme styles for this instance
    const existingStyleId = this.container.dataset['themeStyleId'];
    if (existingStyleId) {
      const existingStyle = document.getElementById(existingStyleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    }

    // Create a new style element for dynamic theming
    const styleId = 'daterangepicker-theme-' + Math.random().toString(36).slice(2, 9);
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = this.generateThemeCSS();

    // Ensure the style is added to head immediately
    document.head.appendChild(style);

    // Store style ID for cleanup
    this.container.dataset['themeStyleId'] = styleId;

    // Force a reflow to ensure styles are applied
    void this.container.offsetHeight;
  }

  private generateThemeCSS(): string {
    const t = this.theme;

    return `
      .daterangepicker {
        background-color: ${t.backgroundColor} !important;
        border: 1px solid ${t.borderColor} !important;
        border-radius: ${t.borderRadius} !important;
        font-family: ${t.fontFamily} !important;
        font-size: ${t.fontSize} !important;
        color: ${t.textColor} !important;
        line-height: 1em !important;
        width: 278px !important;
        z-index: 999999 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
      }

      /* IMPORTANTE: Permitir interacción con selectores */
      .daterangepicker select,
      .daterangepicker select * {
        user-select: auto !important;
        pointer-events: auto !important;
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
      }

      .daterangepicker:before {
        border-bottom: 7px solid #ccc !important;
      }

      .daterangepicker:after {
        border-bottom-color: ${t.backgroundColor} !important;
      }

      .daterangepicker.drop-up:before {
        border-top: 7px solid #ccc !important;
      }

      .daterangepicker.drop-up:after {
        border-top-color: ${t.backgroundColor} !important;
      }

      .daterangepicker .calendar-table {
        background-color: ${t.backgroundColor} !important;
        border: 1px solid ${t.backgroundColor} !important;
        border-radius: ${t.borderRadius} !important;
      }

      .daterangepicker .calendar-table th,
      .daterangepicker .calendar-table td {
        min-width: 32px !important;
        width: 32px !important;
        height: 24px !important;
        line-height: 24px !important;
        font-size: 12px !important;
        border-radius: ${t.borderRadius} !important;
        border: 1px solid transparent !important;
        white-space: nowrap !important;
        cursor: pointer !important;
      }

      .daterangepicker .calendar-table th {
        color: ${t.textColor} !important;
      }

      .daterangepicker .calendar-table th.month {
        color: ${t.textColor} !important;
        width: auto !important;
      }

      .daterangepicker .calendar-table .next span,
      .daterangepicker .calendar-table .prev span {
        color: #fff !important;
        border: solid black !important;
        border-width: 0 2px 2px 0 !important;
        border-radius: 0 !important;
        display: inline-block !important;
        padding: 3px !important;
      }

      .daterangepicker td.available:hover,
      .daterangepicker th.available:hover {
        background-color: ${t.hoverColor} !important;
        border-color: transparent !important;
        color: ${t.textColor} !important;
      }

      .daterangepicker td.week,
      .daterangepicker th.week {
        font-size: 80% !important;
        color: ${t.secondaryColor} !important;
      }

      .daterangepicker td.off,
      .daterangepicker td.off.in-range,
      .daterangepicker td.off.start-date,
      .daterangepicker td.off.end-date {
        background-color: ${t.backgroundColor} !important;
        border-color: transparent !important;
        color: ${t.disabledColor} !important;
      }

      .daterangepicker td.in-range {
        background-color: ${t.rangeColor} !important;
        border-color: transparent !important;
        color: ${t.textColor} !important;
        border-radius: 0 !important;
      }

      .daterangepicker td.start-date {
        border-radius: ${t.borderRadius} 0 0 ${t.borderRadius} !important;
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
      }

      .daterangepicker td.end-date {
        border-radius: 0 ${t.borderRadius} ${t.borderRadius} 0 !important;
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
      }

      .daterangepicker td.start-date.end-date {
        border-radius: ${t.borderRadius} !important;
      }

      .daterangepicker td.active,
      .daterangepicker td.active:hover {
        background-color: ${t.selectedColor} !important;
        border-color: transparent !important;
        color: #fff !important;
      }

      .daterangepicker td.disabled,
      .daterangepicker option.disabled {
        color: ${t.disabledColor} !important;
        cursor: not-allowed !important;
        text-decoration: line-through !important;
      }

      .daterangepicker .drp-calendar.left {
        padding: 8px 0 8px 8px !important;
      }

      .daterangepicker .drp-calendar.right {
        padding: 8px !important;
      }

      .daterangepicker .ranges {
        float: none !important;
        text-align: left !important;
        margin: 0 !important;
      }

      .daterangepicker .ranges ul {
        list-style: none !important;
        margin: 0 auto !important;
        padding: 0 !important;
        width: 100% !important;
      }

      .daterangepicker .ranges li {
        font-size: 12px !important;
        padding: 8px 12px !important;
        cursor: pointer !important;
        color: ${t.textColor} !important;
        border-radius: ${t.borderRadius} !important;
        margin: 2px 0 !important;
      }

      .daterangepicker .ranges li:hover {
        background-color: ${t.rangeColor} !important;
        color: ${t.textColor} !important;
      }

      .daterangepicker .ranges li.active {
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
      }

      .daterangepicker .ranges li.active:hover {
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
        opacity: 0.9 !important;
      }

      .daterangepicker.show-calendar .drp-buttons {
        display: block !important;
      }

      .daterangepicker.auto-apply .drp-buttons {
        display: none !important;
      }

      .daterangepicker .drp-buttons {
        clear: both !important;
        text-align: right !important;
        padding: 8px !important;
        border-top: 1px solid ${t.borderColor} !important;
        display: block !important;
        line-height: 12px !important;
        vertical-align: middle !important;
      }

      .daterangepicker .drp-selected {
        display: inline-block !important;
        font-size: 12px !important;
        padding-right: 8px !important;
        color: ${t.textColor} !important;
      }

      .daterangepicker .drp-buttons .btn {
        margin-left: 8px !important;
        font-size: 12px !important;
        font-weight: bold !important;
        padding: 4px 8px !important;
      }

      .daterangepicker .drp-buttons .btn.btn-success {
        background-color: ${t.applyButtonColor} !important;
        border-color: ${t.applyButtonColor} !important;
        color: #fff !important;
      }

      .daterangepicker .drp-buttons .btn.btn-danger {
        background-color: ${t.cancelButtonColor} !important;
        border-color: ${t.cancelButtonColor} !important;
        color: #fff !important;
      }

      /* Asegurar que el contenedor no bloquee eventos */
      .daterangepicker .calendar-table th.month {
        pointer-events: auto !important;
      }

      .daterangepicker .calendar-table th.month * {
        pointer-events: auto !important;
      }

      .daterangepicker select.monthselect,
      .daterangepicker select.yearselect {
        font-size: 12px !important;
        padding: 1px 2px !important;
        height: auto !important;
        margin: 0 !important;
        cursor: pointer !important;
        background-color: ${t.backgroundColor} !important;
        border: 1px solid ${t.borderColor} !important;
        color: ${t.textColor} !important;
        outline: none !important;
        /* Asegurar que los dropdowns funcionen nativamente */
        appearance: auto !important;
        -webkit-appearance: menulist !important;
        -moz-appearance: menulist !important;
        /* Permitir interacción */
        pointer-events: auto !important;
        user-select: auto !important;
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        /* Tamaño mínimo para ser clickeable */
        min-height: 20px !important;
        min-width: 50px !important;
        /* Asegurar que estén por encima de otros elementos */
        position: relative !important;
        z-index: 1000000 !important;
        /* Remover cualquier transformación que pueda interferir */
        transform: none !important;
        /* Asegurar que no estén bloqueados por overlay */
        isolation: auto !important;
      }

      .daterangepicker select.monthselect {
        margin-right: 2% !important;
        width: 56% !important;
      }

      .daterangepicker select.yearselect {
        width: 40% !important;
      }

      .daterangepicker select.hourselect,
      .daterangepicker select.minuteselect,
      .daterangepicker select.secondselect,
      .daterangepicker select.ampmselect {
        width: 50px !important;
        margin: 0 auto !important;
        background: ${t.backgroundColor} !important;
        border: 1px solid ${t.borderColor} !important;
        color: ${t.textColor} !important;
        padding: 2px !important;
        outline: 0 !important;
        font-size: 12px !important;
        pointer-events: auto !important;
        user-select: auto !important;
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        appearance: auto !important;
        -webkit-appearance: menulist !important;
        -moz-appearance: menulist !important;
        border-radius: ${t.borderRadius} !important;
        opacity: 1 !important;
      }

      .daterangepicker .calendar-time {
        text-align: center !important;
        margin: 4px auto 0 auto !important;
        line-height: 30px !important;
        position: relative !important;
        display: block !important;
        background: ${t.backgroundColor} !important;
        padding: 8px !important;
        border-top: 1px solid ${t.borderColor} !important;
      }

      .daterangepicker .calendar-time select.disabled {
        color: ${t.secondaryColor} !important;
        cursor: not-allowed !important;
        background: ${t.hoverColor} !important;
        opacity: 0.6 !important;
      }

      .daterangepicker select option {
        background: ${t.backgroundColor} !important;
        color: ${t.textColor} !important;
      }

      .daterangepicker select option:disabled {
        background: ${t.hoverColor} !important;
        color: ${t.disabledColor} !important;
      }

      .daterangepicker select option:hover {
        background: ${t.selectedColor} !important;
        color: #fff !important;
      }

      /* Media queries para responsive - exactamente como el CSS original */
      @media (min-width: 564px) {
        .daterangepicker {
          width: auto !important;
        }

        .daterangepicker .ranges ul {
          width: 140px !important;
        }

        .daterangepicker.single .ranges ul {
          width: 100% !important;
        }

        .daterangepicker .drp-calendar.left {
          clear: left !important;
          margin-right: 0 !important;
        }

        .daterangepicker .drp-calendar.left .calendar-table {
          border-right: none !important;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          padding-right: 8px !important;
        }

        .daterangepicker .drp-calendar.right {
          margin-left: 0 !important;
        }

        .daterangepicker .drp-calendar.right .calendar-table {
          border-left: none !important;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }

        .daterangepicker .ranges,
        .daterangepicker .drp-calendar {
          float: left !important;
        }
      }

      @media (min-width: 730px) {
        .daterangepicker .ranges {
          width: auto !important;
          float: left !important;
        }

        .daterangepicker .drp-calendar.left {
          clear: none !important;
        }
      }
    `;
  }

  // Public method to change theme dynamically
  setTheme(theme: DateRangePickerTheme): void {
    this.theme = { ...DEFAULT_THEME, ...theme };
    this.applyTheme();
  }

  // Public method to force theme reapplication
  refreshTheme(): void {
    this.applyTheme();
  }

  // Debug method to check current theme
  getCurrentTheme(): DateRangePickerTheme {
    return this.theme;
  }

  // Debug method to test dropdowns
  testDropdowns(): void {
    const selects = this.container.querySelectorAll('select');

    selects.forEach((select, _index) => {
      // Intentar hacer click programáticamente
      select.addEventListener('click', () => {
        // Select clicked programmatically
      });

      // Simular click
      select.click();
    });
  }

  private mergeOptions(options: DateRangePickerOptions): Required<DateRangePickerOptions> {
    const today = new Date();

    const merged = {
      startDate: options.startDate || today,
      endDate: options.endDate || today,
      minDate: options.minDate ?? null,
      maxDate: options.maxDate ?? null,
      minYear: options.minYear ?? today.getFullYear() - 100,
      maxYear: options.maxYear ?? today.getFullYear() + 100,
      maxSpan: options.maxSpan ?? null,
      autoApply: options.autoApply ?? false,
      singleDatePicker: options.singleDatePicker ?? false,
      showDropdowns: options.showDropdowns ?? true,
      linkedCalendars: options.linkedCalendars ?? true,
      autoUpdateInput: options.autoUpdateInput ?? true,
      alwaysShowCalendars: options.alwaysShowCalendars ?? false,
      showCustomRangeLabel: options.showCustomRangeLabel ?? true,
      timePicker: options.timePicker ?? false,
      timePicker24Hour: options.timePicker24Hour ?? true,
      timePickerIncrement: options.timePickerIncrement ?? 1,
      timePickerSeconds: options.timePickerSeconds ?? false,
      ranges: options.ranges || {},
      opens: options.opens || 'center',
      drops: options.drops || 'auto',
      locale: options.locale || SPANISH_LOCALE,
      buttonClasses: options.buttonClasses || 'btn btn-sm',
      applyButtonClasses: options.applyButtonClasses || 'btn-success',
      cancelButtonClasses: options.cancelButtonClasses || 'btn-danger',
      theme: options.theme || DEFAULT_THEME,
    };

    // Can't be used together for now
    if (merged.timePicker && merged.autoApply) {
      merged.autoApply = false;
    }

    return merged;
  }
  private createContainer(): void {
    const template = `
      <div class="daterangepicker">
        <div class="ranges"></div>
        <div class="drp-calendar left">
          <div class="calendar-table"></div>
          <div class="calendar-time"></div>
        </div>
        <div class="drp-calendar right">
          <div class="calendar-table"></div>
          <div class="calendar-time"></div>
        </div>
        <div class="drp-buttons">
          <span class="drp-selected"></span>
          <button class="cancelBtn ${this.options.buttonClasses} ${this.options.cancelButtonClasses}" type="button">
            ${this.locale.cancelLabel}
          </button>
          <button class="applyBtn ${this.options.buttonClasses} ${this.options.applyButtonClasses}" type="button">
            ${this.locale.applyLabel}
          </button>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = template.trim();
    this.container = wrapper.firstElementChild as HTMLElement;

    // Add to DOM
    document.body.appendChild(this.container);

    // Note: Theme will be applied when show() is called

    // Setup initial classes
    this.container.classList.add(`opens${this.options.opens}`);
    if (this.options.singleDatePicker) {
      this.container.classList.add('single');
    }
    if (this.options.autoApply) {
      this.container.classList.add('auto-apply');
    }
    if (Object.keys(this.options.ranges).length > 0) {
      this.container.classList.add('show-ranges');
      this.renderRanges();
    }
    if (this.options.alwaysShowCalendars || Object.keys(this.options.ranges).length === 0) {
      this.container.classList.add('show-calendar');
    }

    // Always show buttons unless autoApply is true
    if (!this.options.autoApply) {
      this.container.classList.add('show-calendar');
    }

    // Hide time containers if time picker is not enabled
    if (!this.options.timePicker) {
      const timeContainers = this.container.querySelectorAll('.calendar-time');
      timeContainers.forEach(container => {
        (container as HTMLElement).style.display = 'none';
      });
    }

    // Initially hidden
    this.container.style.display = 'none';
  }

  private renderRanges(): void {
    const rangesContainer = this.container.querySelector('.ranges')!;
    let html = '<ul>';

    for (const [label] of Object.entries(this.options.ranges)) {
      html += `<li data-range-key="${label}">${label}</li>`;
    }

    if (this.options.showCustomRangeLabel) {
      html += `<li data-range-key="${this.locale.customRangeLabel}">${this.locale.customRangeLabel}</li>`;
    }

    html += '</ul>';
    rangesContainer.innerHTML = html;
  }

  private setupEventListeners(): void {
    // Element events
    if (this.element.tagName === 'INPUT' || this.element.tagName === 'BUTTON') {
      this.addEventHandler(this.element, 'click', this.show.bind(this));
      this.addEventHandler(this.element, 'focus', this.show.bind(this));
      this.addEventHandler(this.element, 'keyup', this.elementChanged.bind(this));
      this.addEventHandler(this.element, 'keydown', this.keydown.bind(this) as EventListener);
    } else {
      this.addEventHandler(this.element, 'click', this.toggle.bind(this));
    }

    // Container events - Usar event delegation para evitar problemas de foco
    this.addEventHandler(this.container, 'click', this.containerClick.bind(this));
    this.addEventHandler(this.container, 'mouseover', this.containerMouseOver.bind(this));
    this.addEventHandler(this.container, 'mouseleave', this.containerMouseLeave.bind(this));
    // REMOVIDO: mousedown preventBlur que interfiere con los selectores
    this.addEventHandler(this.container, 'change', this.containerChange.bind(this));

    // Event listeners directos para los selectores como respaldo
    setTimeout(() => {
      const selects = this.container.querySelectorAll('select.monthselect, select.yearselect');
      selects.forEach(select => {
        this.addEventHandler(select as HTMLElement, 'change', this.monthOrYearChanged.bind(this));
      });
    }, 100);
  }

  private addEventHandler(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListener,
  ): void {
    const key = `${event}_${Math.random()}`;
    this.boundHandlers.set(key, handler);
    element.addEventListener(event, handler);
  }

  private containerChange(event: Event): void {
    const target = event.target as HTMLSelectElement;

    // Handle dropdown changes
    if (target.matches('select.monthselect, select.yearselect')) {
      this.monthOrYearChanged(event);
      return;
    }
  }

  private containerMouseOver(event: Event): void {
    const target = event.target as HTMLElement;

    // Handle date hover
    if (target.matches('td.available')) {
      this.hoverDate(event);
      return;
    }
  }

  private containerMouseLeave(): void {
    // Limpiar hover state cuando el mouse sale del calendario
    if (this.state.hoverDate) {
      this.state.hoverDate = null;
      this.updateDateClasses();
    }
  }

  private containerClick(event: Event): void {
    const target = event.target as HTMLElement;

    // NO interferir con selectores
    if (target.tagName === 'SELECT' || target.closest('select')) {
      return;
    }

    // Handle range clicks
    if (target.matches('.ranges li')) {
      this.clickRange(event);
      return;
    }

    // Handle button clicks
    if (target.matches('.applyBtn')) {
      this.clickApply(event);
      return;
    }

    if (target.matches('.cancelBtn')) {
      this.clickCancel(event);
      return;
    }

    // Handle calendar navigation
    if (target.matches('.prev')) {
      this.clickPrev(event);
      return;
    }

    if (target.matches('.next')) {
      this.clickNext(event);
      return;
    }

    // Handle date clicks
    if (target.matches('td.available')) {
      this.clickDate(event);
      return;
    }
  }

  private preventBlur(event: Event): void {
    // Prevent the input from losing focus when clicking inside the picker
    // BUT allow select dropdowns to work normally
    const target = event.target as HTMLElement;

    // Don't prevent default for select elements
    if (target.tagName === 'SELECT' || target.closest('select')) {
      return;
    }

    event.preventDefault();
  }

  show(): void {
    if (this.state.isShowing) return;

    // Store old values for potential cancellation
    this.state.oldStartDate = new Date(this.state.startDate);
    this.state.oldEndDate = this.state.endDate ? new Date(this.state.endDate) : null;

    // Apply theme just before showing to ensure it's applied correctly
    this.applyTheme();

    // Setup document event listeners with proper handling
    this.documentClickHandler = this.outsideClick.bind(this);
    this.documentFocusHandler = this.outsideFocus.bind(this);

    // Use capture phase to handle events before they bubble
    document.addEventListener('mousedown', this.documentClickHandler, true);
    document.addEventListener('focusin', this.documentFocusHandler, true);

    // Add window resize and scroll listeners
    this.resizeHandler = this.move.bind(this);
    this.scrollHandler = this.move.bind(this);
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('scroll', this.scrollHandler, true); // Use capture to catch all scroll events

    this.updateView();
    this.container.style.display = 'block';

    // Usar setTimeout para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      this.move();
    }, 0);

    this.dispatchEvent('show.daterangepicker');
    this.state.isShowing = true;
  }

  hide(): void {
    if (!this.state.isShowing) return;

    // Revert to old values if incomplete selection
    if (!this.state.endDate) {
      this.state.startDate = new Date(this.state.oldStartDate);
      this.state.endDate = this.state.oldEndDate ? new Date(this.state.oldEndDate) : null;
    }

    // Call callback if dates changed
    if (
      !isSame(this.state.startDate, this.state.oldStartDate, 'day') ||
      (this.state.endDate &&
        this.state.oldEndDate &&
        !isSame(this.state.endDate, this.state.oldEndDate, 'day'))
    ) {
      this.callback(
        new Date(this.state.startDate),
        this.state.endDate ? new Date(this.state.endDate) : new Date(this.state.startDate),
        this.state.chosenLabel || undefined,
      );
    }

    this.updateElement();
    this.removeDocumentListeners();

    this.container.style.display = 'none';
    this.dispatchEvent('hide.daterangepicker');
    this.state.isShowing = false;
  }

  private removeDocumentListeners(): void {
    if (this.documentClickHandler) {
      document.removeEventListener('mousedown', this.documentClickHandler, true);
      this.documentClickHandler = undefined;
    }

    if (this.documentFocusHandler) {
      document.removeEventListener('focusin', this.documentFocusHandler, true);
      this.documentFocusHandler = undefined;
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = undefined;
    }

    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler, true);
      this.scrollHandler = undefined;
    }
  }

  private outsideClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Allow clicks inside the picker or on the trigger element
    if (
      this.element.contains(target) ||
      this.container.contains(target) ||
      target.closest('.daterangepicker')
    ) {
      return;
    }

    // IMPORTANTE: No cerrar si se está interactuando con un select dropdown
    if (target.tagName === 'SELECT' || target.closest('select')) {
      return;
    }

    this.hide();
    this.dispatchEvent('outsideClick.daterangepicker');
  }

  private outsideFocus(event: Event): void {
    const target = event.target as HTMLElement;

    // Allow focus within the picker or trigger element
    if (
      this.element.contains(target) ||
      this.container.contains(target) ||
      target.closest('.daterangepicker')
    ) {
      return;
    }

    // Add a small delay to allow for tab navigation within the picker
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (
        activeElement &&
        !this.element.contains(activeElement) &&
        !this.container.contains(activeElement) &&
        !activeElement.closest('.daterangepicker')
      ) {
        this.hide();
      }
    }, 50); // Increased delay for better UX
  }

  toggle(): void {
    if (this.state.isShowing) {
      this.hide();
    } else {
      this.show();
    }
  }

  private updateView(): void {
    if (this.options.timePicker) {
      this.renderTimePicker('left');
      this.renderTimePicker('right');
      const selectElList = this.container.querySelectorAll('.right .calendar-time select');
      if (!this.state.endDate) {
        selectElList.forEach(select => {
          (select as HTMLSelectElement).disabled = true;
          select.classList.add('disabled');
        });
      } else {
        selectElList.forEach(select => {
          (select as HTMLSelectElement).disabled = false;
          select.classList.remove('disabled');
        });
      }
    }
    this.updateMonthsInView();
    this.updateCalendars();
    this.updateFormInputs();
    this.updateSelectedDisplay();

    // Update chosen label and active range
    this.calculateChosenLabel();
  }

  private updateMonthsInView(): void {
    if (this.state.endDate) {
      this.state.leftCalendar.month = this.getStartOfMonth(this.state.startDate);
      if (
        !this.options.linkedCalendars &&
        (this.state.endDate.getMonth() !== this.state.startDate.getMonth() ||
          this.state.endDate.getFullYear() !== this.state.startDate.getFullYear())
      ) {
        this.state.rightCalendar.month = this.getStartOfMonth(this.state.endDate);
      } else {
        this.state.rightCalendar.month = addMonth(this.state.leftCalendar.month, 1);
      }
    } else {
      this.state.leftCalendar.month = this.getStartOfMonth(this.state.startDate);
      this.state.rightCalendar.month = addMonth(this.state.leftCalendar.month, 1);
    }
  }

  private getStartOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getEndOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  private getStartOfWeek(date: Date, firstDay = 1): Date {
    const day = date.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mie, 4=Jue, 5=Vie, 6=Sab

    // Calcular cuántos días retroceder para llegar al primer día de la semana
    const daysBack = (day - firstDay + 7) % 7;

    const result = new Date(date);
    result.setDate(date.getDate() - daysBack);
    return result;
  }

  private updateCalendars(): void {
    this.renderCalendar('left');
    if (!this.options.singleDatePicker) {
      this.renderCalendar('right');
    }

    // Re-agregar event listeners a los nuevos selectores
    setTimeout(() => {
      const selects = this.container.querySelectorAll('select.monthselect, select.yearselect');
      selects.forEach(select => {
        // Remover listeners anteriores si existen
        select.removeEventListener('change', this.monthOrYearChanged.bind(this));
        // Agregar nuevo listener
        select.addEventListener('change', this.monthOrYearChanged.bind(this));
      });
    }, 10);
  }

  private renderCalendar(side: 'left' | 'right'): void {
    const calendar = side === 'left' ? this.state.leftCalendar : this.state.rightCalendar;
    const calendarContainer = this.container.querySelector(
      `.drp-calendar.${side} .calendar-table`,
    )!;

    const month = calendar.month;
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    // Build calendar matrix
    const firstDay = this.getStartOfMonth(month);
    const startCalendar = this.getStartOfWeek(firstDay, this.locale.firstDay);

    const calendarDays: Date[][] = [];
    let currentWeek: Date[] = [];
    const startDate = new Date(startCalendar);

    for (let i = 0; i < 42; i++) {
      if (i > 0 && i % 7 === 0) {
        calendarDays.push(currentWeek);
        currentWeek = [];
      }

      // Crear fecha para el día actual
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      currentWeek.push(currentDate);
    }
    if (currentWeek.length > 0) {
      calendarDays.push(currentWeek);
    }

    calendar.calendar = calendarDays;

    // Render HTML
    let html = '<table class="table-condensed">';
    html += '<thead>';
    html += '<tr>';

    // Navigation
    const canGoPrev =
      !this.options.minDate || isAfter(this.getStartOfMonth(month), this.options.minDate);
    const canGoNext =
      !this.options.maxDate || isBefore(this.getEndOfMonth(month), this.options.maxDate);

    if (canGoPrev && (!this.options.linkedCalendars || side === 'left')) {
      html += '<th class="prev available"><span></span></th>';
    } else {
      html += '<th></th>';
    }

    // Month/Year header
    let dateHtml = this.locale.monthNames[monthIndex] + ' ' + year;
    if (this.options.showDropdowns) {
      dateHtml = this.renderDropdowns(monthIndex, year, side);
    }
    html += `<th colspan="5" class="month">${dateHtml}</th>`;

    if (
      canGoNext &&
      (!this.options.linkedCalendars || side === 'right' || this.options.singleDatePicker)
    ) {
      html += '<th class="next available"><span></span></th>';
    } else {
      html += '<th></th>';
    }

    html += '</tr>';
    html += '<tr>';

    // Day headers
    for (const dayName of this.locale.daysOfWeek) {
      html += `<th>${dayName}</th>`;
    }

    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    // Calendar days
    for (const week of calendarDays) {
      html += '<tr>';
      for (const day of week) {
        const classes = this.getDayClasses(day, month);
        const isDisabled = classes.includes('disabled');
        const className = classes.join(' ') + (!isDisabled ? ' available' : '');

        html += `<td class="${className}" data-date="${format(day, 'YYYY-MM-DD')}">${day.getDate()}</td>`;
      }
      html += '</tr>';
    }

    html += '</tbody>';
    html += '</table>';

    calendarContainer.innerHTML = html;

    // Render time picker if enabled
    if (this.options.timePicker) {
      this.renderTimePicker(side);
    }
  }

  private renderDropdowns(monthIndex: number, year: number, _side: 'left' | 'right'): string {
    // Calcular años mínimo y máximo basado en minDate/maxDate y minYear/maxYear
    let minYear = this.options.minYear;
    let maxYear = this.options.maxYear;

    // Ajustar según minDate y maxDate si existen
    if (this.options.minDate) {
      minYear = Math.max(minYear, this.options.minDate.getFullYear());
    }
    if (this.options.maxDate) {
      maxYear = Math.min(maxYear, this.options.maxDate.getFullYear());
    }

    const currentYear = year;
    const inMinYear = currentYear === minYear;
    const inMaxYear = currentYear === maxYear;

    let monthHtml = `<select class="monthselect">`;
    for (let m = 0; m < 12; m++) {
      let disabled = false;

      // Deshabilitar meses fuera del rango permitido
      if (inMinYear && this.options.minDate && m < this.options.minDate.getMonth()) {
        disabled = true;
      }
      if (inMaxYear && this.options.maxDate && m > this.options.maxDate.getMonth()) {
        disabled = true;
      }

      const selected = m === monthIndex ? ' selected="selected"' : '';
      const disabledAttr = disabled ? ' disabled="disabled"' : '';
      monthHtml += `<option value="${m}"${selected}${disabledAttr}>${this.locale.monthNames[m]}</option>`;
    }
    monthHtml += '</select>';

    let yearHtml = `<select class="yearselect">`;
    for (let y = minYear; y <= maxYear; y++) {
      const selected = y === year ? ' selected="selected"' : '';
      yearHtml += `<option value="${y}"${selected}>${y}</option>`;
    }
    yearHtml += '</select>';

    return monthHtml + ' ' + yearHtml;
  }

  private getDayClasses(day: Date, currentMonth: Date): string[] {
    const classes: string[] = [];
    const today = new Date();

    // Today
    if (isSame(day, today, 'day')) {
      classes.push('today');
    }

    // Weekend
    if (day.getDay() === 0 || day.getDay() === 6) {
      classes.push('weekend');
    }

    // Other month
    if (day.getMonth() !== currentMonth.getMonth()) {
      classes.push('off', 'ends');
    }

    // Disabled dates
    if (this.options.minDate && isBefore(day, dayStart(this.options.minDate))) {
      classes.push('off', 'disabled');
    }

    if (this.options.maxDate && isAfter(day, dayEnd(this.options.maxDate))) {
      classes.push('off', 'disabled');
    }

    // Selected dates
    if (isSame(day, this.state.startDate, 'day')) {
      classes.push('active', 'start-date');
    }

    if (this.state.endDate && isSame(day, this.state.endDate, 'day')) {
      classes.push('active', 'end-date');
    }

    // In range
    if (
      this.state.endDate &&
      isAfter(day, this.state.startDate) &&
      isBefore(day, this.state.endDate)
    ) {
      classes.push('in-range');
    }

    return classes;
  }

  private updateFormInputs(): void {
    const applyBtn = this.container.querySelector('.applyBtn') as HTMLButtonElement;
    const isValid =
      this.options.singleDatePicker ||
      (this.state.endDate &&
        (isBefore(this.state.startDate, this.state.endDate) ||
          isSame(this.state.startDate, this.state.endDate, 'day')));

    applyBtn.disabled = !isValid;
  }

  private updateSelectedDisplay(): void {
    const selectedSpan = this.container.querySelector('.drp-selected')!;
    let text = format(this.state.startDate, this.locale.format);

    if (!this.options.singleDatePicker && this.state.endDate) {
      text += this.locale.separator + format(this.state.endDate, this.locale.format);
    }

    selectedSpan.textContent = text;
  }

  private renderTimePicker(side: 'left' | 'right'): void {
    // Don't bother updating the time picker if it's currently disabled
    // because an end date hasn't been clicked yet
    if (side === 'right' && !this.state.endDate) return;

    const calendarContainer = this.container.querySelector(`.drp-calendar.${side}`)!;
    const timeContainer = calendarContainer.querySelector('.calendar-time');

    if (!timeContainer) {
      // Create time container if it doesn't exist
      const timeDiv = document.createElement('div');
      timeDiv.className = 'calendar-time';
      calendarContainer.appendChild(timeDiv);
    }

    let selected: Date;
    let minDate: Date | null = null;
    let maxDate: Date | null = this.options.maxDate;

    if (
      this.options.maxSpan &&
      (!this.options.maxDate ||
        isAfter(addDay(this.state.startDate, this.options.maxSpan.days || 0), this.options.maxDate))
    ) {
      maxDate = addDay(this.state.startDate, this.options.maxSpan.days || 0);
    }

    if (side === 'left') {
      selected = new Date(this.state.startDate);
      minDate = this.options.minDate;
    } else {
      selected = this.state.endDate ? new Date(this.state.endDate) : new Date(this.state.startDate);
      minDate = this.state.startDate;

      // Preserve the time already selected
      const timeSelector = this.container.querySelector('.drp-calendar.right .calendar-time');
      if (timeSelector && timeSelector.innerHTML !== '') {
        const hourSelect = timeSelector.querySelector('.hourselect') as HTMLSelectElement;
        const minuteSelect = timeSelector.querySelector('.minuteselect') as HTMLSelectElement;
        const secondSelect = timeSelector.querySelector('.secondselect') as HTMLSelectElement;
        const ampmSelect = timeSelector.querySelector('.ampmselect') as HTMLSelectElement;

        if (hourSelect && hourSelect.value) {
          let hour = parseInt(hourSelect.value, 10);
          if (!this.options.timePicker24Hour && ampmSelect) {
            const ampm = ampmSelect.value;
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
          }
          selected.setHours(hour);
        }

        if (minuteSelect && minuteSelect.value) {
          selected.setMinutes(parseInt(minuteSelect.value, 10));
        }

        if (secondSelect && secondSelect.value) {
          selected.setSeconds(parseInt(secondSelect.value, 10));
        }
      }

      if (isBefore(selected, this.state.startDate)) {
        selected = new Date(this.state.startDate);
      }

      if (maxDate && isAfter(selected, maxDate)) {
        selected = new Date(maxDate);
      }
    }

    // Hours
    let html = '<select class="hourselect">';
    const start = this.options.timePicker24Hour ? 0 : 1;
    const end = this.options.timePicker24Hour ? 23 : 12;

    for (let i = start; i <= end; i++) {
      let i_in_24 = i;
      if (!this.options.timePicker24Hour) {
        i_in_24 = selected.getHours() >= 12 ? (i === 12 ? 12 : i + 12) : i === 12 ? 0 : i;
      }

      const testTime = new Date(selected);
      testTime.setHours(i_in_24);
      testTime.setMinutes(59);

      let disabled = false;
      if (minDate && isBefore(testTime, minDate)) disabled = true;

      testTime.setMinutes(0);
      if (maxDate && isAfter(testTime, maxDate)) disabled = true;

      if (i_in_24 === selected.getHours() && !disabled) {
        html += `<option value="${i}" selected="selected">${i}</option>`;
      } else if (disabled) {
        html += `<option value="${i}" disabled="disabled" class="disabled">${i}</option>`;
      } else {
        html += `<option value="${i}">${i}</option>`;
      }
    }
    html += '</select> ';

    // Minutes
    html += ': <select class="minuteselect">';
    for (let i = 0; i < 60; i += this.options.timePickerIncrement) {
      const padded = i < 10 ? '0' + i : i.toString();
      const testTime = new Date(selected);
      testTime.setMinutes(i);
      testTime.setSeconds(59);

      let disabled = false;
      if (minDate && isBefore(testTime, minDate)) disabled = true;

      testTime.setSeconds(0);
      if (maxDate && isAfter(testTime, maxDate)) disabled = true;

      if (selected.getMinutes() === i && !disabled) {
        html += `<option value="${i}" selected="selected">${padded}</option>`;
      } else if (disabled) {
        html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
      } else {
        html += `<option value="${i}">${padded}</option>`;
      }
    }
    html += '</select> ';

    // Seconds
    if (this.options.timePickerSeconds) {
      html += ': <select class="secondselect">';
      for (let i = 0; i < 60; i++) {
        const padded = i < 10 ? '0' + i : i.toString();
        const testTime = new Date(selected);
        testTime.setSeconds(i);

        let disabled = false;
        if (minDate && isBefore(testTime, minDate)) disabled = true;
        if (maxDate && isAfter(testTime, maxDate)) disabled = true;

        if (selected.getSeconds() === i && !disabled) {
          html += `<option value="${i}" selected="selected">${padded}</option>`;
        } else if (disabled) {
          html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
        } else {
          html += `<option value="${i}">${padded}</option>`;
        }
      }
      html += '</select> ';
    }

    // AM/PM
    if (!this.options.timePicker24Hour) {
      html += '<select class="ampmselect">';

      const testAM = new Date(selected);
      testAM.setHours(12, 0, 0);
      const testPM = new Date(selected);
      testPM.setHours(0, 0, 0);

      let amDisabled = '';
      let pmDisabled = '';

      if (minDate && isBefore(testAM, minDate)) {
        amDisabled = ' disabled="disabled" class="disabled"';
      }

      if (maxDate && isAfter(testPM, maxDate)) {
        pmDisabled = ' disabled="disabled" class="disabled"';
      }

      if (selected.getHours() >= 12) {
        html += `<option value="AM"${amDisabled}>AM</option><option value="PM" selected="selected"${pmDisabled}>PM</option>`;
      } else {
        html += `<option value="AM" selected="selected"${amDisabled}>AM</option><option value="PM"${pmDisabled}>PM</option>`;
      }

      html += '</select>';
    }

    const timeContainer2 = calendarContainer.querySelector('.calendar-time')!;
    timeContainer2.innerHTML = html;

    // Add event listeners for time changes
    const timeSelects = timeContainer2.querySelectorAll('select');
    timeSelects.forEach(select => {
      select.addEventListener('change', this.timeChanged.bind(this));
    });
  }

  private timeChanged(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const calendar = target.closest('.drp-calendar');
    if (!calendar) return;

    const isLeft = calendar.classList.contains('left');
    const cal = calendar as HTMLElement;

    const hourSelect = cal.querySelector('.hourselect') as HTMLSelectElement;
    const minuteSelect = cal.querySelector('.minuteselect') as HTMLSelectElement;
    const secondSelect = cal.querySelector('.secondselect') as HTMLSelectElement;
    const ampmSelect = cal.querySelector('.ampmselect') as HTMLSelectElement;

    let hour = parseInt(hourSelect.value, 10);
    let minute = parseInt(minuteSelect.value, 10);
    if (isNaN(minute)) {
      const lastOption = minuteSelect.options[minuteSelect.options.length - 1];
      minute = parseInt(lastOption.value, 10);
    }
    const second =
      this.options.timePickerSeconds && secondSelect ? parseInt(secondSelect.value, 10) : 0;

    if (!this.options.timePicker24Hour && ampmSelect) {
      const ampm = ampmSelect.value;
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
    }

    if (isLeft) {
      const start = new Date(this.state.startDate);
      start.setHours(hour, minute, second);
      this.setStartDate(start);

      if (this.options.singleDatePicker) {
        this.state.endDate = new Date(start);
      } else if (
        this.state.endDate &&
        format(this.state.endDate, 'YYYY-MM-DD') === format(start, 'YYYY-MM-DD') &&
        isBefore(this.state.endDate, start)
      ) {
        this.setEndDate(new Date(start));
      }
    } else if (this.state.endDate) {
      const end = new Date(this.state.endDate);
      end.setHours(hour, minute, second);
      this.setEndDate(end);
    }

    // Update the calendars and form inputs
    this.updateCalendars();
    this.updateFormInputs();

    // Re-render the time pickers because changing one selection can affect what's enabled in another
    this.renderTimePicker('left');
    this.renderTimePicker('right');
  }

  private updateElement(): void {
    if (this.element.tagName === 'INPUT' && this.options.autoUpdateInput) {
      const input = this.element as HTMLInputElement;
      let newValue = format(this.state.startDate, this.locale.format);

      if (!this.options.singleDatePicker && this.state.endDate) {
        newValue += this.locale.separator + format(this.state.endDate, this.locale.format);
      }

      if (newValue !== input.value) {
        input.value = newValue;
        this.dispatchEvent('change');
      }
    }
  }

  private move(): void {
    if (!this.state.isShowing || !this.container) return;

    // Basado en la lógica del vanilla JS para mejor posicionamiento
    const elementRect = this.element.getBoundingClientRect();
    let containerTop: number;
    let drops = this.options.drops;

    // Force the container to its actual width
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.right = 'auto';
    this.container.style.position = 'fixed';

    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;

    // Calculate vertical position
    switch (drops) {
      case 'auto':
        containerTop = elementRect.bottom + 5;
        if (containerTop + containerHeight >= window.innerHeight) {
          containerTop = elementRect.top - containerHeight - 5;
          drops = 'up';
        }
        break;
      case 'up':
        containerTop = elementRect.top - containerHeight - 5;
        break;
      default: // 'down'
        containerTop = elementRect.bottom + 5;
        break;
    }

    // Add/remove drop-up class
    if (drops === 'up') {
      this.container.classList.add('drop-up');
    } else {
      this.container.classList.remove('drop-up');
    }

    // Calculate horizontal position
    let containerLeft: number;

    if (this.options.opens === 'left') {
      containerLeft = elementRect.right - containerWidth;
      if (containerLeft < 9) {
        containerLeft = 9;
      }
    } else if (this.options.opens === 'center') {
      containerLeft = elementRect.left + elementRect.width / 2 - containerWidth / 2;
      if (containerLeft < 9) {
        containerLeft = 9;
      } else if (containerLeft + containerWidth > window.innerWidth - 9) {
        containerLeft = window.innerWidth - containerWidth - 9;
      }
    } else {
      // 'right'
      containerLeft = elementRect.left;
      if (containerLeft + containerWidth > window.innerWidth - 9) {
        containerLeft = window.innerWidth - containerWidth - 9;
      }
    }

    // Ensure minimum margins
    if (containerLeft < 9) containerLeft = 9;
    if (containerTop < 9) containerTop = 9;

    // Apply final position
    this.container.style.top = `${containerTop}px`;
    this.container.style.left = `${containerLeft}px`;
    this.container.style.right = 'auto';
    this.container.style.zIndex = '99999';
  }

  // Event handlers
  private clickRange(event: Event): void {
    const target = event.target as HTMLElement;
    const label = target.dataset['rangeKey'];
    if (!label) return;

    // Remove active class from all ranges
    const rangeItems = this.container.querySelectorAll('.ranges li');
    rangeItems.forEach(item => item.classList.remove('active'));

    // Add active class to clicked range
    target.classList.add('active');

    this.state.chosenLabel = label;

    if (label === this.locale.customRangeLabel) {
      this.showCalendars();
    } else {
      const range = this.options.ranges[label];
      if (range) {
        const [rangeStart, rangeEnd] = range;
        this.state.startDate = new Date(rangeStart);
        this.state.endDate = new Date(rangeEnd);

        if (!this.options.alwaysShowCalendars) {
          this.hideCalendars();
        }

        this.updateView();

        if (this.options.autoApply) {
          this.clickApply(event);
        }
      }
    }
  }

  private clickPrev(event: Event): void {
    const target = event.target as HTMLElement;
    const calendar = target.closest('.drp-calendar');
    if (!calendar) return;

    if (calendar.classList.contains('left')) {
      this.state.leftCalendar.month = addMonth(this.state.leftCalendar.month, -1);
      if (this.options.linkedCalendars) {
        this.state.rightCalendar.month = addMonth(this.state.rightCalendar.month, -1);
      }
    } else {
      this.state.rightCalendar.month = addMonth(this.state.rightCalendar.month, -1);
    }

    this.updateCalendars();
  }

  private clickNext(event: Event): void {
    const target = event.target as HTMLElement;
    const calendar = target.closest('.drp-calendar');
    if (!calendar) return;

    if (calendar.classList.contains('left')) {
      this.state.leftCalendar.month = addMonth(this.state.leftCalendar.month, 1);
    } else {
      this.state.rightCalendar.month = addMonth(this.state.rightCalendar.month, 1);
      if (this.options.linkedCalendars) {
        this.state.leftCalendar.month = addMonth(this.state.leftCalendar.month, 1);
      }
    }

    this.updateCalendars();
  }

  private clickDate(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('available')) return;

    const dateStr = target.dataset['date'];
    if (!dateStr) return;

    const clickedDate = parse(dateStr, 'YYYY-MM-DD');
    if (!isValid(clickedDate)) return;

    // If time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
    if (this.options.timePicker) {
      const calendar = target.closest('.drp-calendar');
      if (calendar) {
        const hourSelect = calendar.querySelector('.hourselect') as HTMLSelectElement;
        const minuteSelect = calendar.querySelector('.minuteselect') as HTMLSelectElement;
        const secondSelect = calendar.querySelector('.secondselect') as HTMLSelectElement;
        const ampmSelect = calendar.querySelector('.ampmselect') as HTMLSelectElement;

        if (hourSelect) {
          let hour = parseInt(hourSelect.value, 10);
          if (!this.options.timePicker24Hour && ampmSelect) {
            const ampm = ampmSelect.value;
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
          }
          clickedDate.setHours(hour);
        }

        if (minuteSelect) {
          let minute = parseInt(minuteSelect.value, 10);
          if (isNaN(minute)) {
            const lastOption = minuteSelect.options[minuteSelect.options.length - 1];
            minute = parseInt(lastOption.value, 10);
          }
          clickedDate.setMinutes(minute);
        }

        if (this.options.timePickerSeconds && secondSelect) {
          clickedDate.setSeconds(parseInt(secondSelect.value, 10));
        }
      }
    }

    if (this.state.endDate || isBefore(clickedDate, this.state.startDate)) {
      // Selecting start date
      this.state.endDate = null;
      this.state.hoverDate = null;
      this.setStartDate(clickedDate);
    } else {
      // Selecting end date
      this.state.hoverDate = null;
      this.setEndDate(clickedDate);
      if (this.options.autoApply) {
        this.calculateChosenLabel();
        this.clickApply(event);
      }
    }

    if (this.options.singleDatePicker) {
      this.setEndDate(this.state.startDate);
      if (this.options.autoApply) {
        this.clickApply(event);
      }
    }

    this.updateView();
  }

  private hoverDate(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('available')) return;

    const dateStr = target.dataset['date'];
    if (!dateStr) return;

    const hoverDate = parse(dateStr, 'YYYY-MM-DD');
    if (!isValid(hoverDate)) return;

    // Only show hover effects when selecting end date
    if (!this.state.endDate && !isBefore(hoverDate, this.state.startDate)) {
      this.state.hoverDate = hoverDate;
      // Solo actualizar las clases CSS, no regenerar todo el calendario
      this.updateDateClasses();
    }
  }

  private updateDateClasses(): void {
    const allDates = this.container.querySelectorAll('td[data-date]');
    allDates.forEach(td => {
      const dateStr = (td as HTMLElement).dataset['date'];
      if (!dateStr) return;

      const date = parse(dateStr, 'YYYY-MM-DD');
      if (!isValid(date)) return;

      // Remover clases de hover anteriores
      td.classList.remove('in-range', 'end-date');

      // Aplicar clases basadas en el estado actual
      const isInRange =
        this.state.hoverDate &&
        !this.state.endDate &&
        isAfter(date, this.state.startDate) &&
        isBefore(date, this.state.hoverDate);

      const isHoverEnd = this.state.hoverDate && isSame(date, this.state.hoverDate, 'day');

      if (isInRange) {
        td.classList.add('in-range');
      }

      if (isHoverEnd) {
        td.classList.add('end-date');
      }

      // Mantener clases existentes para fechas seleccionadas
      if (isSame(date, this.state.startDate, 'day')) {
        td.classList.add('active', 'start-date');
      }

      if (this.state.endDate && isSame(date, this.state.endDate, 'day')) {
        td.classList.add('active', 'end-date');
      }

      // Rango real seleccionado
      if (
        this.state.endDate &&
        isAfter(date, this.state.startDate) &&
        isBefore(date, this.state.endDate)
      ) {
        td.classList.add('in-range');
      }
    });
  }

  private clickApply(_event: Event): void {
    this.hide();
    this.dispatchEvent('apply.daterangepicker');
  }

  private clickCancel(_event: Event): void {
    this.state.startDate = new Date(this.state.oldStartDate);
    this.state.endDate = this.state.oldEndDate ? new Date(this.state.oldEndDate) : null;
    this.hide();
    this.dispatchEvent('cancel.daterangepicker');
  }

  private monthOrYearChanged(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const calendar = target.closest('.drp-calendar');
    if (!calendar) {
      return;
    }

    const isLeft = calendar.classList.contains('left');
    const monthSelect = calendar.querySelector('.monthselect') as HTMLSelectElement;
    const yearSelect = calendar.querySelector('.yearselect') as HTMLSelectElement;

    if (!monthSelect || !yearSelect) {
      return;
    }

    const month = parseInt(monthSelect.value, 10);
    const year = parseInt(yearSelect.value, 10);

    const newDate = new Date(year, month, 1);

    if (isLeft) {
      this.state.leftCalendar.month = newDate;
      if (this.options.linkedCalendars) {
        this.state.rightCalendar.month = addMonth(newDate, 1);
      }
    } else {
      this.state.rightCalendar.month = newDate;
      if (this.options.linkedCalendars) {
        this.state.leftCalendar.month = addMonth(newDate, -1);
      }
    }

    this.updateCalendars();
  }

  private elementChanged(): void {
    if (this.element.tagName !== 'INPUT') return;

    const input = this.element as HTMLInputElement;
    if (!input.value || !input.value.length) return;

    const parts = input.value.split(this.locale.separator);
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (parts.length === 2) {
      startDate = parse(parts[0].trim(), this.locale.format);
      endDate = parse(parts[1].trim(), this.locale.format);
    } else if (this.options.singleDatePicker || parts.length === 1) {
      startDate = parse(parts[0].trim(), this.locale.format);
      endDate = startDate;
    }

    if (startDate && isValid(startDate) && endDate && isValid(endDate)) {
      this.setStartDate(startDate);
      this.setEndDate(endDate);
      this.updateView();
    }
  }

  private keydown(event: KeyboardEvent): void {
    // Hide on tab or enter
    if (event.key === 'Tab' || event.key === 'Enter') {
      this.hide();
    }

    // Hide on escape
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
    }
  }

  private showCalendars(): void {
    this.container.classList.add('show-calendar');
    this.move();
    this.dispatchEvent('showCalendar.daterangepicker');
  }

  private hideCalendars(): void {
    this.container.classList.remove('show-calendar');
    this.dispatchEvent('hideCalendar.daterangepicker');
  }

  private calculateChosenLabel(): void {
    let customRange = true;
    let bestMatch: { label: string; days: number } | null = null;

    for (const [label, [rangeStart, rangeEnd]] of Object.entries(this.options.ranges)) {
      const startMatches = isSame(this.state.startDate, rangeStart, 'day');
      let endMatches = false;

      if (this.state.endDate) {
        // We have both start and end dates
        endMatches = isSame(this.state.endDate, rangeEnd, 'day');
      } else {
        // Only start date selected - check if it matches a single-day range
        endMatches = isSame(this.state.startDate, rangeEnd, 'day');
      }

      if (startMatches && endMatches) {
        // Calculate the number of days in this range
        const rangeDays =
          Math.abs(rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24) + 1;

        // Prefer longer ranges over shorter ones (Esta semana over Hoy)
        if (!bestMatch || rangeDays > bestMatch.days) {
          bestMatch = { label, days: rangeDays };
        }
      }
    }

    // Always clear all active ranges first
    const rangeItems = this.container.querySelectorAll('.ranges li');
    rangeItems.forEach(item => item.classList.remove('active'));

    if (bestMatch) {
      customRange = false;
      this.state.chosenLabel = bestMatch.label;

      // Highlight the matched range in UI
      const activeItem = this.container.querySelector(`[data-range-key="${bestMatch.label}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
      }
    }

    if (customRange) {
      if (this.options.showCustomRangeLabel) {
        this.state.chosenLabel = this.locale.customRangeLabel;
        const customItem = this.container.querySelector(
          `[data-range-key="${this.locale.customRangeLabel}"]`,
        );
        if (customItem) {
          customItem.classList.add('active');
        }
      } else {
        this.state.chosenLabel = null;
      }
      this.showCalendars();
    }
  }

  // Public API
  setStartDate(date: Date): void {
    if (!this.options.timePicker) {
      this.state.startDate = dayStart(date);
    } else {
      this.state.startDate = new Date(date);
      if (this.options.timePickerIncrement) {
        const minutes =
          Math.round(this.state.startDate.getMinutes() / this.options.timePickerIncrement) *
          this.options.timePickerIncrement;
        this.state.startDate.setMinutes(minutes);
      }
    }
    this.updateView();
  }

  setEndDate(date: Date): void {
    if (!this.options.timePicker) {
      this.state.endDate = dayEnd(date);
    } else {
      this.state.endDate = new Date(date);
      if (this.options.timePickerIncrement) {
        const minutes =
          Math.round(this.state.endDate.getMinutes() / this.options.timePickerIncrement) *
          this.options.timePickerIncrement;
        this.state.endDate.setMinutes(minutes);
      }
    }
    this.updateView();
  }

  getStartDate(): Date {
    return new Date(this.state.startDate);
  }

  getEndDate(): Date | null {
    return this.state.endDate ? new Date(this.state.endDate) : null;
  }

  remove(): void {
    this.removeDocumentListeners();

    // Remove theme styles
    if (this.container && this.container.dataset['themeStyleId']) {
      const styleElement = document.getElementById(this.container.dataset['themeStyleId']);
      if (styleElement) {
        styleElement.remove();
      }
    }

    // Remove all bound event listeners
    this.boundHandlers.forEach((_handler, _key) => {
      // This is a simplified cleanup - in a real implementation,
      // you'd need to track which element each handler was bound to
    });
    this.boundHandlers.clear();

    // Remove container from DOM
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  updateRanges(newRanges: Record<string, [Date, Date]>): void {
    if (typeof newRanges !== 'object') return;

    this.options.ranges = {};

    for (const [label, range] of Object.entries(newRanges)) {
      let start: Date, end: Date;

      if (typeof range[0] === 'string') {
        start = parse(range[0], this.locale.format);
      } else {
        start = new Date(range[0]);
      }

      if (typeof range[1] === 'string') {
        end = parse(range[1], this.locale.format);
      } else {
        end = new Date(range[1]);
      }

      // Adjust dates according to minDate and maxSpan constraints
      if (this.options.minDate && isBefore(start, this.options.minDate)) {
        start = new Date(this.options.minDate);
      }

      let maxDate = this.options.maxDate;
      if (this.options.maxSpan && maxDate) {
        const maxSpanDate = addDay(start, this.options.maxSpan.days || 0);
        if (isAfter(maxSpanDate, maxDate)) {
          maxDate = maxSpanDate;
        }
      }
      if (maxDate && isAfter(end, maxDate)) {
        end = new Date(maxDate);
      }

      // Skip ranges that are completely outside allowed dates
      if (
        (this.options.minDate && isBefore(end, this.options.minDate)) ||
        (maxDate && isAfter(start, maxDate))
      ) {
        continue;
      }

      this.options.ranges[label] = [start, end];
    }

    // Re-render ranges
    this.renderRanges();
  }

  private dispatchEvent(eventName: string): void {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: this,
    });
    this.element.dispatchEvent(event);
  }
}
