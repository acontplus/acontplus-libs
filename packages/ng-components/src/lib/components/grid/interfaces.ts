import { TemplateRef } from '@angular/core';
import { MatBadgePosition, MatBadgeSize } from '@angular/material/badge';
import { MatButtonAppearance } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { SortDirection } from '@angular/material/sort';
import { TooltipPosition, TooltipTouchGestures } from '@angular/material/tooltip';
import { Observable } from 'rxjs';

export interface DataGridColumn<T = any> {
  field: string;
  header?: string | Observable<string>;
  hide?: boolean;
  show?: boolean;
  disabled?: boolean;
  pinned?: DataGridColumnPinValue;
  left?: string;
  right?: string;
  width?: string;
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean | string;
  sortProp?: DataGridSortProp;
  type?: DataGridColumnType;
  typeParameter?: DataGridColumnTypeParameter;
  tag?: DataGridColumnTag;
  buttons?: DataGridColumnButton<T>[] | ((rowData: T) => DataGridColumnButton<T>[]);
  formatter?: (rowData: T, colDef?: DataGridColumn) => any;
  cellTemplate?: TemplateRef<any> | null;
  showExpand?: boolean;
  description?: string;
  summary?: ((data: T[], colDef?: DataGridColumn) => any) | string;
  class?: string | ((rowData?: T, colDef?: DataGridColumn) => string);
  headerCellTemplate?: TemplateRef<any>;
  /**
   * Groups consecutive columns under shared header cells. Columns next to each
   * other that share the same group path are merged into group header cells that
   * span them.
   *
   * - A single value creates one group header row.
   * - An array of values creates one group header row per level (nested groups),
   *   e.g. `['Establecimiento', 'Bodega 1']`.
   *
   * Each level can be:
   * - a `string` or `Observable<string>` used both as key and label;
   * - a function `(data) => string | Observable<string>` resolved against the
   *   grid `data` (dynamic labels such as an establishment name taken from rows);
   * - a `{ key, label? }` descriptor when the grouping value differs from the
   *   displayed text (e.g. group by `warehouseId` but show `warehouseName`).
   *   `label` defaults to the resolved `key`.
   *
   * Strings are compared by value; functions are resolved against the grid
   * `data`; `Observable`s are compared by their first emitted value (the group
   * header is rebuilt once it arrives).
   */
  group?: DataGridColumnGroupItem<T> | DataGridColumnGroupItem<T>[];
  /**
   * CSS class(es) applied to the group header cells, or a formatter that receives
   * the group value of each level and the run's member columns and returns
   * class(es). It is resolved once per member column, so each column can style
   * itself differently per level; a group cell combines the distinct classes of
   * its members. The resolved classes are also propagated to each member
   * column's header and data cells, so the whole column block can be styled
   * (e.g. entradas/salidas in a kardex).
   */
  groupClass?:
    | string
    | ((group: string | Observable<string>, columns: DataGridColumn[]) => string | undefined);
}

export type DataGridColumnGroupLevel<T = any> =
  string | Observable<string> | ((data: T[]) => string | Observable<string>);

/**
 * Group level descriptor for cases where the value used to merge columns
 * (`key`) differs from the text shown in the group header (`label`).
 */
export interface DataGridColumnGroupDescriptor<T = any> {
  key: DataGridColumnGroupLevel<T>;
  label?: DataGridColumnGroupLevel<T>;
}

export type DataGridColumnGroupItem<T = any> =
  DataGridColumnGroupLevel<T> | DataGridColumnGroupDescriptor<T>;

export declare type DataGridColumnPinValue = 'left' | 'right' | null;

export interface DataGridColumnPinOption {
  label: string | Observable<string>;
  value: DataGridColumnPinValue;
}

export declare type DataGridColumnType =
  'button' | 'tag' | 'link' | 'image' | 'boolean' | 'number' | 'currency' | 'percent' | 'date';

export interface DataGridColumnTypeParameter {
  currencyCode?: string;
  display?: string | boolean;
  digitsInfo?: string;
  format?: string;
  locale?: string;
  timezone?: string;
}

export interface DataGridSortProp {
  arrowPosition?: 'before' | 'after';
  disableClear?: boolean;
  id?: string;
  start?: 'asc' | 'desc';
}

export interface DataGridColumnTag {
  [key: number]: DataGridColumnTagValue;
  [key: string]: DataGridColumnTagValue;
}

export interface DataGridColumnTagValue {
  text?: string;
  color?: string;
}

export interface DataGridColumnButton<T = any> {
  type?: DataGridButtonType;
  text?: string | Observable<string>;
  icon?: string;
  fontIcon?: string;
  svgIcon?: string;
  color?: ThemePalette;
  class?: string;
  disabled?: boolean | ((rowData: T) => boolean);
  click?: (rowData: T, event: Event) => void;
  iif?: (rowData: T) => boolean;
  pop?: string | Observable<string> | DataGridColumnButtonPop;
  tooltip?: string | Observable<string> | DataGridColumnButtonTooltip;
  badge?: number | string | Observable<string> | DataGridColumnButtonBadge;
  children?: DataGridMenuItem<T>[];
}

export interface DataGridColumnButtonPop {
  title: string | Observable<string>;
  description?: string | Observable<string>;
  okColor?: ThemePalette;
  okText?: string | Observable<string>;
  closeColor?: ThemePalette;
  closeText?: string | Observable<string>;
}

export interface DataGridColumnButtonTooltip {
  message: string | Observable<string>;
  position?: TooltipPosition;
  positionAtOrigin?: boolean;
  class?: any;
  hideDelay?: number;
  showDelay?: number;
  touchGestures?: TooltipTouchGestures;
  disabled?: boolean;
}

export interface DataGridColumnButtonBadge {
  content: number | string | Observable<string>;
  description?: string | Observable<string>;
  color?: ThemePalette;
  position?: MatBadgePosition;
  size?: MatBadgeSize;
  overlap?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export type DataGridCellTemplate = Record<string, TemplateRef<any>>;

export interface DataGridRowSelectionFormatter<T = any> {
  disabled?: (rowData: T, index: number) => boolean;
  hideCheckbox?: (rowData: T, index: number) => boolean;
}

export type DataGridRowClassFormatter<T = any> = Record<
  string,
  (rowData: T, index: number) => boolean
>;

export type DataGridButtonType = MatButtonAppearance | 'icon';

export type DataGridSize = 'small' | 'medium' | 'large';

/**
 * Represents the default options for the grid that can be configured
 * using the `DATA_GRID_DEFAULT_OPTIONS` injection token.
 */
export interface DataGridDefaultOptions {
  columnResizable?: boolean;
  emptyValuePlaceholder?: string;

  pageOnFront?: boolean;
  showPaginator?: boolean;
  pageDisabled?: boolean;
  showFirstLastButtons?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  hidePageSize?: boolean;

  sortOnFront?: boolean;
  sortActive?: string;
  sortDirection?: SortDirection;
  sortDisableClear?: boolean;
  sortDisabled?: boolean;
  sortStart?: 'asc' | 'desc';

  rowHover?: boolean;
  rowStriped?: boolean;

  multiSelectable?: boolean;
  multiSelectionWithClick?: boolean;
  rowSelectable?: boolean;
  hideRowSelectionCheckbox?: boolean;
  disableRowClickSelection?: boolean;

  cellSelectable?: boolean;

  keyboardNavigation?: boolean;

  showToolbar?: boolean;
  toolbarTitle?: string;

  columnHideable?: boolean;
  columnHideableChecked?: 'show' | 'hide';
  columnSortable?: boolean;
  columnPinnable?: boolean;
  columnPinOptions?: DataGridColumnPinOption[];

  showColumnMenuButton?: boolean;
  columnMenuButtonText?: string;
  columnMenuButtonType?: DataGridButtonType;
  columnMenuButtonColor?: ThemePalette;
  columnMenuButtonClass?: string;
  columnMenuButtonIcon?: string;
  columnMenuButtonFontIcon?: string;
  columnMenuButtonSvgIcon?: string;

  showColumnMenuHeader?: boolean;
  columnMenuHeaderText?: string;
  showColumnMenuFooter?: boolean;
  columnMenuFooterText?: string;

  noResultText?: string;
}

export interface DataGridMenuItem<T = any> {
  text: string | Observable<string>;
  icon?: string;
  fontIcon?: string;
  svgIcon?: string;
  class?: string;
  disabled?: boolean | ((rowData: T) => boolean);
  click?: (rowData: T, event: Event) => void;
  iif?: (rowData: T) => boolean;
  children?: DataGridMenuItem[];
}
