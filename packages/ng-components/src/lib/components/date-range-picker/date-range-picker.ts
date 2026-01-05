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
  daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
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
  daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
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
    this.theme = this.options.theme || DEFAULT_THEME;

    // Initialize callback
    this.callback =
      callback ||
      (() => {
        /* empty callback */
      });

    // Initialize state
    const today = new Date();
    this.state = {
      startDate: this.options.startDate,
      endDate: this.options.endDate,
      oldStartDate: this.options.startDate,
      oldEndDate: this.options.endDate,
      isShowing: false,
      leftCalendar: { month: today, calendar: [] },
      rightCalendar: { month: addMonth(today, 1), calendar: [] },
      chosenLabel: null,
    };

    this.createContainer();
    this.applyTheme();
    this.setupEventListeners();
    this.updateElement();
  }

  private applyTheme(): void {
    if (!this.container) return;

    // Create a style element for dynamic theming
    const styleId = 'daterangepicker-theme-' + Math.random().toString(36).substr(2, 9);
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = this.generateThemeCSS();
    document.head.appendChild(style);

    // Store style ID for cleanup
    this.container.dataset['themeStyleId'] = styleId;
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
      }

      .daterangepicker .ranges li:hover {
        background-color: ${t.hoverColor} !important;
      }

      .daterangepicker .ranges li.active {
        background-color: #08c !important;
        color: #fff !important;
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
        background: #eee !important;
        border: 1px solid #eee !important;
        padding: 2px !important;
        outline: 0 !important;
        font-size: 12px !important;
      }

      .daterangepicker .calendar-time {
        text-align: center !important;
        margin: 4px auto 0 auto !important;
        line-height: 30px !important;
        position: relative !important;
      }

      .daterangepicker .calendar-time select.disabled {
        color: ${t.secondaryColor} !important;
        cursor: not-allowed !important;
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

    return {
      startDate: options.startDate || today,
      endDate: options.endDate || today,
      minDate: options.minDate ?? null,
      maxDate: options.maxDate ?? null,
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
      opens: options.opens || 'right',
      drops: options.drops || 'down',
      locale: options.locale || SPANISH_LOCALE,
      buttonClasses: options.buttonClasses || 'btn btn-sm',
      applyButtonClasses: options.applyButtonClasses || 'btn-success',
      cancelButtonClasses: options.cancelButtonClasses || 'btn-danger',
      theme: options.theme || DEFAULT_THEME,
    };
  }
  private createContainer(): void {
    const template = `
      <div class="daterangepicker">
        <div class="ranges"></div>
        <div class="drp-calendar left">
          <div class="calendar-table"></div>
        </div>
        <div class="drp-calendar right">
          <div class="calendar-table"></div>
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

    // Setup document event listeners with proper handling
    this.documentClickHandler = this.outsideClick.bind(this);
    this.documentFocusHandler = this.outsideFocus.bind(this);

    // Use capture phase to handle events before they bubble
    document.addEventListener('mousedown', this.documentClickHandler, true);
    document.addEventListener('focusin', this.documentFocusHandler, true);

    // Add window resize listener
    this.resizeHandler = this.move.bind(this);
    window.addEventListener('resize', this.resizeHandler);

    this.updateView();
    this.container.style.display = 'block';
    this.move();

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
    this.updateMonthsInView();
    this.updateCalendars();
    this.updateFormInputs();
    this.updateSelectedDisplay();
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
    const day = date.getDay();
    const diff = (day < firstDay ? 7 : 0) + day - firstDay;
    return addDay(date, -diff);
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
    let currentDate = new Date(startCalendar);

    for (let i = 0; i < 42; i++) {
      if (i > 0 && i % 7 === 0) {
        calendarDays.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(new Date(currentDate));
      currentDate = addDay(currentDate, 1);
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
  }

  private renderDropdowns(monthIndex: number, year: number, _side: 'left' | 'right'): string {
    const minYear = this.options.minDate ? this.options.minDate.getFullYear() : year - 100;
    const maxYear = this.options.maxDate ? this.options.maxDate.getFullYear() : year + 100;

    let monthHtml = `<select class="monthselect">`;
    for (let m = 0; m < 12; m++) {
      const selected = m === monthIndex ? ' selected="selected"' : '';
      monthHtml += `<option value="${m}"${selected}>${this.locale.monthNames[m]}</option>`;
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

    // Today
    if (isSame(day, new Date(), 'day')) {
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
    const elementRect = this.element.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();

    let top = elementRect.bottom + window.scrollY + 5; // Add small gap
    let left = elementRect.left + window.scrollX;

    // Adjust for drops
    if (this.options.drops === 'up') {
      top = elementRect.top + window.scrollY - containerRect.height - 5;
    }

    // Adjust for opens
    if (this.options.opens === 'left') {
      left = elementRect.right + window.scrollX - containerRect.width;
    } else if (this.options.opens === 'center') {
      left = elementRect.left + window.scrollX + elementRect.width / 2 - containerRect.width / 2;
    }

    // Keep within viewport
    if (left < 10) left = 10;
    if (left + containerRect.width > window.innerWidth - 10) {
      left = window.innerWidth - containerRect.width - 10;
    }

    this.container.style.position = 'absolute';
    this.container.style.top = `${top}px`;
    this.container.style.left = `${left}px`;
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

    if (this.state.endDate || isBefore(clickedDate, this.state.startDate)) {
      // Selecting start date
      this.state.endDate = null;
      this.setStartDate(clickedDate);
    } else {
      // Selecting end date
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

    for (const [label, [rangeStart, rangeEnd]] of Object.entries(this.options.ranges)) {
      if (
        isSame(this.state.startDate, rangeStart, 'day') &&
        this.state.endDate &&
        isSame(this.state.endDate, rangeEnd, 'day')
      ) {
        customRange = false;
        this.state.chosenLabel = label;

        // Highlight the range in UI
        const rangeItems = this.container.querySelectorAll('.ranges li');
        rangeItems.forEach(item => item.classList.remove('active'));
        const activeItem = this.container.querySelector(`[data-range-key="${label}"]`);
        if (activeItem) {
          activeItem.classList.add('active');
        }
        break;
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
    this.state.startDate = dayStart(date);
    this.updateView();
  }

  setEndDate(date: Date): void {
    this.state.endDate = dayEnd(date);
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

  private dispatchEvent(eventName: string): void {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: this,
    });
    this.element.dispatchEvent(event);
  }
}
