import { DateRange } from '@angular/material/datepicker';
import { ACP_DATE_OPTION_TYPE } from '../constant/date-filter-const';

export interface IAcpSelectDateOption {
  /**
   * Etiqueta mostrada en la lista desplegable para esta opción.
   * Ejemplo: "Últimos 7 días", "Hoy", "Personalizado".
   */
  optionLabel: string;

  /**
   * Tipo de opción que indica cómo se determina la fecha.
   * Por defecto es DATE_DIFF si no se proporciona.
   */
  optionType?: ACP_DATE_OPTION_TYPE;

  /**
   * Número de días de desplazamiento desde hoy.
   *
   * - Números positivos indican fechas futuras.
   * - Números negativos indican fechas pasadas.
   * - Se utiliza solo cuando optionType es DATE_DIFF y no hay callback.
   *
   * Ejemplo: -7 → "Últimos 7 días"
   */
  dateDiff?: number;

  /**
   * Indica si esta opción está actualmente seleccionada.
   */
  isSelected: boolean;

  /**
   * Indica si esta opción debe mostrarse en la lista desplegable.
   */
  isVisible: boolean;

  /**
   * Función personalizada para calcular y retornar un DateRange.
   * Se utiliza cuando optionType requiere manejo especial más allá de dateDiff.
   */
  callBackFunction?: () => DateRange<Date>;

  /**
   * Expresión de fecha-matemática/relativa opcional mostrada para el inicio del rango
   * cuando los inputs editables están habilitados (ej: `now-7d`).
   * Anula el valor derivado de `dateDiff`. Debe estar emparejada con {@link endExpr}.
   */
  startExpr?: string;

  /**
   * Expresión de fecha-matemática/relativa opcional mostrada para el fin del rango
   * cuando los inputs editables están habilitados (ej: `now`).
   * Debe estar emparejada con {@link startExpr}.
   */
  endExpr?: string;
}

/**
 * Implementación por defecto de una opción de fecha seleccionable.
 * Proporciona valores por defecto para todos los campos.
 */
export class AcpSelectDateOption implements IAcpSelectDateOption {
  optionLabel = '';
  optionType = ACP_DATE_OPTION_TYPE.DATE_DIFF;
  dateDiff = 0;
  isSelected = false;
  isVisible = false;
  callBackFunction!: () => DateRange<Date>;
}
