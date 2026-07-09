import { DateRange } from '@angular/material/datepicker';
import { IAcpSelectDateOption } from './select-date-option.model';

export interface AcpSelectedDateEvent {
  /** Rango de fechas seleccionado, o null si se limpió la selección. */
  range: DateRange<Date> | null;

  /** Opción de fecha seleccionada, o null si se limpió la selección. */
  selectedOption: IAcpSelectDateOption | null;

  /**
   * Expresión legible para el inicio del rango: la entrada del usuario (ej: `now-7d`)
   * cuando se edita, la forma relativa de una opción de diferencia de días,
   * o la fecha formateada absoluta. `null` cuando se limpia la selección.
   */
  startExpr: string | null;

  /** Expresión legible para el fin del rango. Ver {@link startExpr}. */
  endExpr: string | null;
}
