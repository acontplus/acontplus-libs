import { ACP_DATE_OPTION_TYPE } from '../constant/date-filter-const';
import { IAcpSelectDateOption } from '../model/select-date-option.model';
import { createOption } from '../utils/date-picker-utilities';

export const ACP_DEFAULT_DATE_OPTIONS: IAcpSelectDateOption[] = [
  createOption('Hoy', ACP_DATE_OPTION_TYPE.DATE_DIFF, 0),
  createOption('Ayer', ACP_DATE_OPTION_TYPE.DATE_DIFF, -1),
  createOption('Últimos 7 días', ACP_DATE_OPTION_TYPE.DATE_DIFF, -7),
  createOption('Últimos 30 días', ACP_DATE_OPTION_TYPE.DATE_DIFF, -30),
  createOption('Mes anterior', ACP_DATE_OPTION_TYPE.LAST_MONTH),
  createOption('Este mes', ACP_DATE_OPTION_TYPE.THIS_MONTH),
  createOption('Mes hasta hoy', ACP_DATE_OPTION_TYPE.MONTH_TO_DATE),
  createOption('Semana hasta hoy', ACP_DATE_OPTION_TYPE.WEEK_TO_DATE, 0, false),
  createOption('Año hasta hoy', ACP_DATE_OPTION_TYPE.YEAR_TO_DATE),
  createOption('Rango personalizado', ACP_DATE_OPTION_TYPE.CUSTOM),
] as IAcpSelectDateOption[];
