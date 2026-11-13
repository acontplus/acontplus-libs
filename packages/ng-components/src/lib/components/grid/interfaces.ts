import { TemplateRef } from '@angular/core';
import { MatBadgePosition, MatBadgeSize } from '@angular/material/badge';
import { MatButtonAppearance } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { SortDirection } from '@angular/material/sort';
import { TooltipPosition, TooltipTouchGestures } from '@angular/material/tooltip';
import { Observable } from 'rxjs';

export interface AcpDataGridColumn<T = any> {
  field: string;
  header?: string | Observable<string>;
  hide?: boolean;
  show?: boolean;
  disabled?: boolean;
  pinned?: AcpDataGridColumnPinValue;
  left?: string;
  right?: string;
  width?: string;
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean | string;
  sortProp?: AcpDataGridSortProp;
  type?: AcpDataGridColumnType;
  typeParameter?: AcpDataGridColumnTypeParameter;
  tag?: AcpDataGridColumnTag;
  buttons?: AcpDataGridColumnButton<T>[] | ((rowData: T) => AcpDataGridColumnButton<T>[]);
  formatter?: (rowData: T, colDef?: AcpDataGridColumn) => any;
  cellTemplate?: TemplateRef<any> | null;
  showExpand?: boolean;
  description?: string;
  /**
   * Value of the summary (footer) cell of the column: a fixed text, or a function that receives
   * the values of the column (`values`), the column definition and the rows being summarized
   * (all rows in the grid footer, the group rows in a row-group footer). Use `rows` when the
   * result depends on other fields, e.g. `(_, __, rows) => sum(rows.map(r => r.qty * r.cost))`.
   */
  summary?: ((values: any[], colDef: AcpDataGridColumn<T>, rows: T[]) => any) | string;
  /**
   * Number of columns the summary (footer) cell of this column spans, starting at this column,
   * like `colspan` (e.g. a `'Total'` label over the first two columns). The summary cells of the
   * covered columns are not rendered. Applies to the grid footer and to row-group footers.
   * The span stops at the first column whose pinning (`pinned`) differs.
   */
  summaryColspan?: number;
  class?: string | ((rowData?: T, colDef?: AcpDataGridColumn) => string);
  headerCellTemplate?: TemplateRef<any>;
  /**
   * Whether the cell value can be edited inline. When true, double-clicking a cell
   * enters edit mode with an input field. The grid emits `cellEditChange` when the
   * user confirms the change (Enter) or cancels it (Escape).
   */
  editable?: boolean;
  /**
   * Merges consecutive cells of this column into one cell (`rowspan`) when their values are
   * equal, or when the function returns `true` for two consecutive rows. Merging is nested: a
   * column only merges inside the merged blocks of the merged columns to its left. Blocks are
   * computed on the rendered page and never cross row-group headers or footers.
   *
   * Ignored when the grid is `expandable` (detail rows would split the merged cells). The grid
   * keeps the order of the rows: sort or group them so equal values are consecutive.
   */
  mergeRows?: boolean | ((previous: T, current: T) => boolean);
  /**
   * Validation function for editable cells. Return `true` to accept the value,
   * or a string error message to reject it. If not provided, any value is accepted.
   */
  editValidator?: (value: any, rowData: T) => boolean | string;
  /**
   * When provided, the editable cell renders as a dropdown (select) instead of a text input.
   * Each option can be a simple string/value or an object with `value` and `label` properties.
   */
  editOptions?: (string | number | { value: string | number; label: string })[];
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
  group?: AcpDataGridColumnGroupItem<T> | AcpDataGridColumnGroupItem<T>[];
  /**
   * CSS class(es) applied to the group header cells, or a formatter that receives
   * the group value of each level and the run's member columns and returns
   * class(es). It is resolved once per member column, so each column can style
   * itself differently per level; a group cell combines the distinct classes of
   * its members. The resolved classes are also propagated to each member
   * column's header and data cells, so the whole column block can be styled
   * (e.g. entradas/salidas in a kardex).
   */
  /**
   * Color of the column group, as any CSS color (`'var(--mat-sys-tertiary)'`, `'#1976d2'`), or
   * a function that receives the group value of each level and the member columns. The group
   * header cell gets a top border in that color, and the header, data and footer cells of the
   * member columns get a light tint of it (`--acp-grid-group-tint`, 10% by default). With nested
   * groups each header uses its own level's color and the cells use the innermost color.
   * No `::ng-deep` or global CSS is needed. For full control use `groupClass`.
   */
  groupColor?:
    | string
    | ((group: string | Observable<string>, columns: AcpDataGridColumn[]) => string | undefined);
  groupClass?:
    | string
    | ((group: string | Observable<string>, columns: AcpDataGridColumn[]) => string | undefined);
}

export type AcpDataGridColumnGroupLevel<T = any> =
  string | Observable<string> | ((data: T[]) => string | Observable<string>);

/**
 * Group level descriptor for cases where the value used to merge columns
 * (`key`) differs from the text shown in the group header (`label`).
 */
export interface AcpDataGridColumnGroupDescriptor<T = any> {
  key: AcpDataGridColumnGroupLevel<T>;
  label?: AcpDataGridColumnGroupLevel<T>;
}

export type AcpDataGridColumnGroupItem<T = any> =
  AcpDataGridColumnGroupLevel<T> | AcpDataGridColumnGroupDescriptor<T>;

export declare type AcpDataGridColumnPinValue = 'left' | 'right' | null;

export interface AcpDataGridColumnPinOption {
  label: string | Observable<string>;
  value: AcpDataGridColumnPinValue;
}

export declare type AcpDataGridColumnType =
  'button' | 'tag' | 'link' | 'image' | 'boolean' | 'number' | 'currency' | 'percent' | 'date';

export interface AcpDataGridColumnTypeParameter {
  currencyCode?: string;
  display?: string | boolean;
  digitsInfo?: string;
  format?: string;
  locale?: string;
  timezone?: string;
}

export interface AcpDataGridSortProp {
  arrowPosition?: 'before' | 'after';
  disableClear?: boolean;
  id?: string;
  start?: 'asc' | 'desc';
}

export interface AcpDataGridColumnTag {
  [key: number]: AcpDataGridColumnTagValue;
  [key: string]: AcpDataGridColumnTagValue;
}

export interface AcpDataGridColumnTagValue {
  text?: string;
  color?: string;
}

export interface AcpDataGridColumnButton<T = any> {
  type?: AcpDataGridButtonType;
  text?: string | Observable<string>;
  icon?: string;
  fontIcon?: string;
  svgIcon?: string;
  color?: ThemePalette;
  class?: string;
  disabled?: boolean | ((rowData: T) => boolean);
  click?: (rowData: T, event: Event) => void;
  iif?: (rowData: T) => boolean;
  pop?: string | Observable<string> | AcpDataGridColumnButtonPop;
  tooltip?: string | Observable<string> | AcpDataGridColumnButtonTooltip;
  badge?: number | string | Observable<string> | AcpDataGridColumnButtonBadge;
  children?: AcpDataGridMenuItem<T>[];
}

export interface AcpDataGridColumnButtonPop {
  title: string | Observable<string>;
  description?: string | Observable<string>;
  okColor?: ThemePalette;
  okText?: string | Observable<string>;
  closeColor?: ThemePalette;
  closeText?: string | Observable<string>;
}

export interface AcpDataGridColumnButtonTooltip {
  message: string | Observable<string>;
  position?: TooltipPosition;
  positionAtOrigin?: boolean;
  class?: any;
  hideDelay?: number;
  showDelay?: number;
  touchGestures?: TooltipTouchGestures;
  disabled?: boolean;
}

export interface AcpDataGridColumnButtonBadge {
  content: number | string | Observable<string>;
  description?: string | Observable<string>;
  color?: ThemePalette;
  position?: MatBadgePosition;
  size?: MatBadgeSize;
  overlap?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export type AcpDataGridCellTemplate = Record<string, TemplateRef<any>>;

export interface AcpDataGridRowSelectionFormatter<T = any> {
  disabled?: (rowData: T, index: number) => boolean;
  hideCheckbox?: (rowData: T, index: number) => boolean;
}

export type AcpDataGridRowClassFormatter<T = any> = Record<
  string,
  (rowData: T, index: number) => boolean
>;

export type AcpDataGridButtonType = MatButtonAppearance | 'icon';

export type AcpDataGridSize = 'xs-small' | 'small' | 'medium' | 'large';

/**
 * Altura del área de filas con scroll: una longitud CSS (`'400px'`, `'60vh'`) que actúa como
 * altura máxima, o `'flex'` para ocupar la altura del contenedor padre.
 */
export type AcpDataGridScrollHeight = 'flex' | (string & {});

/**
 * How rows are grouped:
 * - `'subheader'` inserts a header row before each group.
 * - `'rowspan'` keeps the rows of each group together and merges the cells of the
 *   `groupRowsBy` column (it must be a field name) into one cell per group.
 */
export type AcpDataGridRowGroupMode = 'subheader' | 'rowspan';

/** A group of rows that share the same `groupRowsBy` value. */
export interface AcpDataGridRowGroup<T = any> {
  /** The value returned by `groupRowsBy` for the rows of the group. */
  key: unknown;
  /** All rows of the group, including those on other pages. */
  rows: T[];
  /** Whether the rows of the group are shown. */
  expanded: boolean;
}

/** Context of the `rowGroupHeaderTemplate`. */
export interface AcpDataGridRowGroupContext<T = any> {
  $implicit: AcpDataGridRowGroup<T>;
  group: AcpDataGridRowGroup<T>;
  key: unknown;
  rows: T[];
  count: number;
  expanded: boolean;
}

/**
 * Represents the default options for the grid that can be configured
 * using the `DATA_GRID_DEFAULT_OPTIONS` injection token.
 */
export interface AcpDataGridDefaultOptions {
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
  columnPinOptions?: AcpDataGridColumnPinOption[];

  showColumnMenuButton?: boolean;
  columnMenuButtonText?: string;
  columnMenuButtonType?: AcpDataGridButtonType;
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

  showGridlines?: boolean;

  scrollHeight?: AcpDataGridScrollHeight | null;
}

export interface AcpDataGridMenuItem<T = any> {
  text: string | Observable<string>;
  icon?: string;
  fontIcon?: string;
  svgIcon?: string;
  class?: string;
  disabled?: boolean | ((rowData: T) => boolean);
  click?: (rowData: T, event: Event) => void;
  iif?: (rowData: T) => boolean;
  children?: AcpDataGridMenuItem[];
}

// Deprecated aliases kept for backward compatibility. Use the `Acp`-prefixed names.

/** @deprecated Use `AcpDataGridColumn` instead. */
export type DataGridColumn<T = any> = AcpDataGridColumn<T>;
/** @deprecated Use `AcpDataGridColumnPinValue` instead. */
export type DataGridColumnPinValue = AcpDataGridColumnPinValue;
/** @deprecated Use `AcpDataGridSortProp` instead. */
export type DataGridSortProp = AcpDataGridSortProp;
/** @deprecated Use `AcpDataGridColumnType` instead. */
export type DataGridColumnType = AcpDataGridColumnType;
/** @deprecated Use `AcpDataGridColumnTypeParameter` instead. */
export type DataGridColumnTypeParameter = AcpDataGridColumnTypeParameter;
/** @deprecated Use `AcpDataGridColumnTag` instead. */
export type DataGridColumnTag = AcpDataGridColumnTag;
/** @deprecated Use `AcpDataGridColumnButton` instead. */
export type DataGridColumnButton<T = any> = AcpDataGridColumnButton<T>;
/** @deprecated Use `AcpDataGridColumnGroupItem` instead. */
export type DataGridColumnGroupItem<T = any> = AcpDataGridColumnGroupItem<T>;
/** @deprecated Use `AcpDataGridColumnGroupLevel` instead. */
export type DataGridColumnGroupLevel<T = any> = AcpDataGridColumnGroupLevel<T>;
/** @deprecated Use `AcpDataGridColumnGroupDescriptor` instead. */
export type DataGridColumnGroupDescriptor<T = any> = AcpDataGridColumnGroupDescriptor<T>;
/** @deprecated Use `AcpDataGridColumnPinOption` instead. */
export type DataGridColumnPinOption = AcpDataGridColumnPinOption;
/** @deprecated Use `AcpDataGridColumnTagValue` instead. */
export type DataGridColumnTagValue = AcpDataGridColumnTagValue;
/** @deprecated Use `AcpDataGridButtonType` instead. */
export type DataGridButtonType = AcpDataGridButtonType;
/** @deprecated Use `AcpDataGridColumnButtonPop` instead. */
export type DataGridColumnButtonPop = AcpDataGridColumnButtonPop;
/** @deprecated Use `AcpDataGridColumnButtonTooltip` instead. */
export type DataGridColumnButtonTooltip = AcpDataGridColumnButtonTooltip;
/** @deprecated Use `AcpDataGridColumnButtonBadge` instead. */
export type DataGridColumnButtonBadge = AcpDataGridColumnButtonBadge;
/** @deprecated Use `AcpDataGridMenuItem` instead. */
export type DataGridMenuItem<T = any> = AcpDataGridMenuItem<T>;
/** @deprecated Use `AcpDataGridCellTemplate` instead. */
export type DataGridCellTemplate = AcpDataGridCellTemplate;
/** @deprecated Use `AcpDataGridRowSelectionFormatter` instead. */
export type DataGridRowSelectionFormatter<T = any> = AcpDataGridRowSelectionFormatter<T>;
/** @deprecated Use `AcpDataGridRowClassFormatter` instead. */
export type DataGridRowClassFormatter<T = any> = AcpDataGridRowClassFormatter<T>;
/** @deprecated Use `AcpDataGridSize` instead. */
export type DataGridSize = AcpDataGridSize;
/** @deprecated Use `AcpDataGridScrollHeight` instead. */
export type DataGridScrollHeight = AcpDataGridScrollHeight;
/** @deprecated Use `AcpDataGridDefaultOptions` instead. */
export type DataGridDefaultOptions = AcpDataGridDefaultOptions;
