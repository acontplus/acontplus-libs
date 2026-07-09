import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { ACP_DATE_OPTION_TYPE } from '../constant/date-filter-const';
import type { IAcpSelectDateOption } from '../model/select-date-option.model';
import { ChangeDetectorRef } from '@angular/core';
import type { AcpActiveDate } from '../model/active-data.model';

/**
 * Reinicia el estado de selección de todas las opciones
 * y marca la opción dada como seleccionada si se proporciona.
 *
 * @param options - Lista de opciones de fecha
 * @param selectedOption - Opción a marcar como seleccionada
 */
export function resetOptionSelection(
  options: IAcpSelectDateOption[],
  selectedOption?: IAcpSelectDateOption,
) {
  options.forEach(option => (option.isSelected = false));
  if (selectedOption) {
    selectedOption.isSelected = true;
  }
}

/**
 * Marca la opción de fecha personalizada como seleccionada.
 *
 * @param options - Lista de opciones de fecha
 */
export function selectCustomOption(options: IAcpSelectDateOption[]): void {
  const customOption = options.find(option => option.optionType === ACP_DATE_OPTION_TYPE.CUSTOM);
  if (customOption) customOption.isSelected = true;
}

/**
 * Retorna una nueva fecha con el desplazamiento de año aplicado.
 *
 * @param offset - Número de años a agregar (negativo para años pasados)
 * @returns Objeto Date con año actualizado
 */
export function getDateWithOffset(offset: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + offset);
  return date;
}

/**
 * Crea un clon profundo del objeto o array proporcionado.
 *
 * @param data - Datos a clonar
 * @returns Una copia profunda de los datos
 */
export function getClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Formatea un objeto de fecha en una cadena usando Angular DatePipe.
 *
 * @param date - Fecha a formatear
 * @param dateFormat - Formato de fecha deseado (ej: 'dd/MM/yyyy')
 * @returns Cadena de fecha formateada
 */
export function getDateString(date: Date, dateFormat: string): string {
  const datePipe = new DatePipe('en');
  return datePipe.transform(date, dateFormat) ?? '';
}

/**
 * Formatea un rango de fechas en una cadena con fechas de inicio y fin.
 *
 * @param range - Rango de fechas con inicio y fin
 * @param dateFormat - Formato de fecha deseado
 * @returns Cadena de rango formateada (ej: '01/01/2023 - 07/01/2023')
 */
export function getFormattedDateString(range: DateRange<Date>, dateFormat: string) {
  if (!(range.start && range.end)) {
    return '';
  }
  return getDateString(range.start, dateFormat) + ' - ' + getDateString(range.end, dateFormat);
}

/**
 * Crea un objeto de opción de fecha estandarizado para desplegables.
 *
 * @param label - Etiqueta de visualización para la opción
 * @param key - Clave de opción de DEFAULT_DATE_OPTION_ENUM
 * @param dateDiff - Desplazamiento en días desde la fecha actual (por defecto: 0)
 * @param isVisible - Si la opción es visible (por defecto: true)
 * @returns Objeto ISelectDateOption
 */
export function createOption(
  label: string,
  key: ACP_DATE_OPTION_TYPE,
  dateDiff = 0,
  isVisible = true,
): IAcpSelectDateOption {
  return {
    optionLabel: label,
    optionType: key,
    dateDiff,
    isSelected: false,
    isVisible,
  };
}

/** Escapa una cadena para que pueda usarse como literal dentro de una RegExp. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Retorna verdadero cuando ambas fechas caen en el mismo día del calendario. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Analiza una cadena de fecha contra un formato de fecha estilo Angular (el subconjunto de
 * tokens `yyyy`, `yy`, `MM`, `M`, `dd`, `d`). Retorna `null` si la cadena
 * no coincide con el formato o no es una fecha de calendario real (ej: `31/02`).
 *
 * @param value - La cadena de fecha ingresada por el usuario.
 * @param format - El formato esperado, ej: `dd/MM/yyyy`.
 * @returns La fecha analizada, o `null` si no coincide.
 */
export function parseDateByFormat(value: string, format: string): Date | null {
  const tokens: string[] = [];
  const tokenRegex = /yyyy|yy|MM|M|dd|d/g;
  let pattern = '^';
  let lastIndex = 0;
  let token: RegExpExecArray | null;
  while ((token = tokenRegex.exec(format)) !== null) {
    pattern += escapeRegExp(format.slice(lastIndex, token.index));
    switch (token[0]) {
      case 'yyyy':
        pattern += '(\\d{4})';
        break;
      case 'yy':
        pattern += '(\\d{2})';
        break;
      case 'MM':
      case 'dd':
        pattern += '(\\d{2})';
        break;
      default: // 'M' or 'd'
        pattern += '(\\d{1,2})';
        break;
    }
    tokens.push(token[0]);
    lastIndex = token.index + token[0].length;
  }
  pattern += escapeRegExp(format.slice(lastIndex)) + '$';

  const match = new RegExp(pattern).exec(value.trim());
  if (!match) {
    return null;
  }

  let year = NaN;
  let month = NaN;
  let day = NaN;
  tokens.forEach((token, index) => {
    const part = parseInt(match[index + 1], 10);
    if (token.startsWith('y')) {
      year = token === 'yy' ? 2000 + part : part;
    } else if (token.startsWith('M')) {
      month = part - 1;
    } else {
      day = part;
    }
  });
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  const date = new Date(year, month, day);
  // Reject overflow dates such as 31/02 that Date silently rolls over.
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }
  return date;
}

/**
 * Deriva las expresiones de fecha-matemática relativa (inicio/fin) para una opción de fecha,
 * para mostrar en inputs editables. Solo las opciones de diferencia de días tienen una forma relativa
 * limpia (ej: `Últimos 7 días` -> `now-7d` .. `now`); un `startExpr` / `endExpr` explícito
 * en la opción anula el valor derivado. Retorna `null` cuando no aplica representación relativa,
 * para que la llamada recurra a fechas absolutas.
 *
 * @param option - La opción de fecha seleccionada.
 * @returns Expresiones `{ start, end }`, o `null`.
 */
export function getRelativeExpr(
  option?: IAcpSelectDateOption | null,
): { start: string; end: string } | null {
  if (!option) {
    return null;
  }
  if (option.startExpr && option.endExpr) {
    return { start: option.startExpr, end: option.endExpr };
  }
  if (option.optionType !== ACP_DATE_OPTION_TYPE.DATE_DIFF) {
    return null;
  }
  const diff = option.dateDiff ?? 0;
  const start = diff === 0 ? 'now' : `now${diff > 0 ? '+' : ''}${diff}d`;
  return { start, end: 'now' };
}

/**
 * Retorna la fecha del próximo mes basada en la fecha dada.
 *
 * @param currDate - Fecha actual
 * @returns Un nuevo objeto Date incrementado por un mes
 */
export function getDateOfNextMonth(currDate: Date): Date {
  const date = new Date(currDate);
  date.setMonth(currDate.getMonth() + 1);
  return date;
}

/**
 * Retorna el primer día del mes siguiente a la fecha dada.
 *
 * @param currDate - La fecha actual
 * @returns Un objeto Date establecido al primer día del próximo mes
 */
export function getFirstDateOfNextMonth(currDate: Date): Date {
  return new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1);
}

/**
 * Retorna el número de días en el mes de la fecha dada.
 *
 * @param date La fecha para calcular los días.
 * @returns Número de días en el mes.
 */
export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Calcula el DateRange esperado para una opción dada, reflejando la
 * lógica en updateDateWithSelectedOption. Se usa para auto-coincidir
 * selectedDates proporcionadas contra la lista de opciones disponibles.
 *
 * Retorna null para opciones CUSTOM y cualquier tipo no manejado.
 *
 * @param option - La opción de fecha para calcular un rango
 * @returns DateRange calculado, o null si no aplica
 */
export function computeOptionDateRange(option: IAcpSelectDateOption): DateRange<Date> | null {
  if (option.optionType === ACP_DATE_OPTION_TYPE.CUSTOM) {
    return null;
  }

  if (option.callBackFunction) {
    return option.callBackFunction();
  }

  const currDate = new Date();
  let startDate: Date;
  let lastDate: Date;

  switch (option.optionType) {
    case ACP_DATE_OPTION_TYPE.DATE_DIFF:
      startDate = new Date();
      startDate.setDate(startDate.getDate() + (option.dateDiff ?? 0));
      lastDate = new Date();
      break;

    case ACP_DATE_OPTION_TYPE.LAST_MONTH: {
      const lastMonth = new Date(currDate);
      lastMonth.setMonth(currDate.getMonth() - 1);
      startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      lastDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), getDaysInMonth(lastMonth));
      break;
    }

    case ACP_DATE_OPTION_TYPE.THIS_MONTH:
      startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
      lastDate = new Date(currDate.getFullYear(), currDate.getMonth(), getDaysInMonth(currDate));
      break;

    case ACP_DATE_OPTION_TYPE.YEAR_TO_DATE:
      startDate = new Date(currDate.getFullYear(), 0, 1);
      lastDate = new Date();
      break;

    case ACP_DATE_OPTION_TYPE.MONTH_TO_DATE:
      startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
      lastDate = new Date();
      break;

    default:
      return null;
  }

  return new DateRange<Date>(startDate, lastDate);
}

/**
 * Anula el setter `activeDate` para una instancia de MatCalendar, inyectando lógica de manejador personalizado
 * mientras preserva el comportamiento del setter original. Útil para reaccionar a eventos de navegación de fecha interna
 * (ej: cambios de mes) en el calendario de Angular Material.
 *
 * @param calendar - Instancia de MatCalendar cuyo setter `activeDate` será anulado.
 * @param cdref - ChangeDetectorRef para activar actualizaciones de vista después de que se ejecute el setter.
 * @param handler - Función de callback personalizada ejecutada siempre que se establezca `activeDate`.
 */
export function overrideActiveDateSetter(
  calendar: MatCalendar<Date>,
  cdref: ChangeDetectorRef,
  handler: (date: AcpActiveDate) => void,
): void {
  const proto = Object.getPrototypeOf(calendar);
  const descriptor = Object.getOwnPropertyDescriptor(proto, 'activeDate');

  if (!(descriptor?.set && descriptor?.get)) {
    console.warn(
      'overrideActiveDateSetter: setter/getter de activeDate no encontrado en el prototipo de MatCalendar.',
    );
    return;
  }
  const originalSetter = descriptor.set;
  const originalGetter = descriptor.get;

  Object.defineProperty(calendar, 'activeDate', {
    configurable: true,
    enumerable: false,
    get() {
      return originalGetter.call(this);
    },

    set(value: Date) {
      const activeDate: AcpActiveDate = {
        previous: originalGetter.call(this) ?? value,
        current: value,
      };
      originalSetter.call(this, value);
      handler.call(this, activeDate);
      cdref.markForCheck();
    },
  });
}
