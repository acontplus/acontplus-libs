import {
  Component,
  input,
  output,
  TemplateRef,
  InjectionToken,
  inject,
  booleanAttribute,
  TrackByFunction,
  ViewChild,
  ContentChildren,
  viewChildren,
  QueryList,
  ElementRef,
  SimpleChanges,
  ChangeDetectionStrategy,
  KeyValueChangeRecord,
  ViewEncapsulation,
  AfterViewInit,
  OnChanges,
  ChangeDetectorRef,
  Input,
  computed,
  signal,
  effect,
  afterNextRender,
  Injector,
  untracked,
  DestroyRef,
  model,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { BehaviorSubject, combineLatest, isObservable, map, Observable, take } from 'rxjs';

// Material Imports
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortHeader, Sort, SortDirection } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';
import { Directionality } from '@angular/cdk/bidi';

// Shared Imports

import { AcpToObservablePipe, AcpIsTemplateRefPipe } from '../../../core/pipes';
import { AcpGridSelectableCell } from './grid-selectable-cell';
import { DataGridUtils } from './grid-utils';
import { AcpGridCell } from './cell/cell';
import { AcpGridCellEdit } from './cell/cell-edit';
import {
  AcpDataGridButtonType,
  AcpDataGridCellTemplate,
  AcpDataGridColumn,
  AcpDataGridColumnGroupDescriptor,
  AcpDataGridColumnGroupItem,
  AcpDataGridColumnGroupLevel,
  AcpDataGridColumnPinOption,
  AcpDataGridColumnPinValue,
  AcpDataGridDefaultOptions,
  AcpDataGridRowClassFormatter,
  AcpDataGridRowGroup,
  AcpDataGridRowGroupContext,
  AcpDataGridRowGroupMode,
  AcpDataGridRowSelectionFormatter,
  AcpDataGridScrollHeight,
  AcpDataGridSize,
} from './interfaces';
import { AcpGridColClassPipe, AcpGridRowClassPipe } from './data-grid.pipes';
import {
  buildRowGroupView,
  collectRowGroups,
  computeRowSpans,
  groupRowsContiguous,
  isRowGroupItem,
  RowSpanColumn,
  RowGroupItemCache,
} from './grid-row-group';
import { _animationsDisabled, ThemePalette } from '@angular/material/core';
import { ColumnResize } from '../column-resize';
import { AcpGridColumnMenu } from './column-menu/column-menu';
import { AcpGridExpansionToggle } from './grid-expansion-toggle';
import { MatColumnResize, MatResizable } from './column-resize';

export const DATA_GRID_DEFAULT_OPTIONS = new InjectionToken<AcpDataGridDefaultOptions>(
  'acp-grid-default-options',
);

@Component({
  selector: 'acp-data-grid',
  exportAs: 'dataGrid',
  imports: [
    AsyncPipe,
    NgClass,
    NgTemplateOutlet,
    MatProgressBar,
    MatProgressSpinner,
    MatIconButton,
    MatCheckbox,
    MatTable,
    MatColumnDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatFooterRowDef,
    MatFooterRow,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatFooterCellDef,
    MatFooterCell,
    MatSort,
    MatSortHeader,
    MatPaginator,
    MatResizable,
    MatColumnResize,
    AcpGridCell,
    AcpGridCellEdit,
    AcpGridColumnMenu,
    AcpGridSelectableCell,
    AcpGridExpansionToggle,
    AcpIsTemplateRefPipe,
    AcpGridColClassPipe,
    AcpGridRowClassPipe,
    AcpToObservablePipe,
  ],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
  host: {
    class: 'acp-grid',
    '[class.acp-grid-animations-enabled]': '!_animationsDisabled',
    '[class.acp-grid-size-xs-small]': '_size() === "xs-small"',
    '[class.acp-grid-size-small]': '_size() === "small"',
    '[class.acp-grid-size-medium]': '_size() === "medium"',
    '[class.acp-grid-size-large]': '_size() === "large"',
    '[attr.tabindex]': 'keyboardNavigation() ? 0 : null',
    '[style.--acp-grid-scroll-height]': '_scrollMaxHeight()',
    '[class.acp-grid-scroll-flex]': 'scrollHeight() === "flex"',
    '[class.acp-grid-gridlines]': 'showGridlines',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGrid implements AfterViewInit, OnChanges {
  /** Densidad de la tabla. `'normal'` está obsoleto y equivale a `'medium'`. */
  size = input<AcpDataGridSize | 'normal'>('medium');
  protected readonly _size = computed<AcpDataGridSize>(() =>
    this.size() === 'normal' ? 'medium' : (this.size() as AcpDataGridSize),
  );
  protected _animationsDisabled = _animationsDisabled();
  private readonly _utils = inject(DataGridUtils);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _injector = inject(Injector);
  private readonly _dir = inject(Directionality, { optional: true });
  private static _nextId = 0;
  /** Unique id of the grid, used for row ids and `aria-controls`. */
  readonly gridId = `acp-grid-${DataGrid._nextId++}`;
  private readonly _activeRow = signal<unknown>(null);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _columnsByField = new Map<string, AcpDataGridColumn>();
  private readonly _resizedColumnWidths = new Map<string, number>();
  private readonly _groupClassByField = new Map<string, string>();
  private readonly _groupColorByField = new Map<string, string>();
  /** @internal First emitted value of each tracked `Observable` group key, by instance. */
  private readonly _groupKeyValues = new Map<Observable<string>, string>();
  private readonly _trackedGroupKeyObservables = new Set<Observable<string>>();
  /** @internal Columns whose header is rendered in a group header row with `rowspan`. */
  readonly _spannedHeaderFields = new Set<string>();
  /** @internal `summaryColspan` per displayed column: `n > 1` spans, `0` is covered (hidden). */
  private readonly _summarySpans = new Map<string, number>();
  /** @internal Rows of column-group header cells, derived from `columns[].group`. */
  _groupHeaderRows: AcpDataGridGroupHeaderRow[] = [];
  private _focusFirstRowOnRender = false;
  /** @internal Set by `acpGridNavigationFor` to activate the first row when data changes. */
  _activateFirstRowOnDataChange = false;
  private readonly _defaultOptions = inject<AcpDataGridDefaultOptions>(DATA_GRID_DEFAULT_OPTIONS, {
    optional: true,
  });
  /**
   * Altura máxima del área de filas antes de hacer scroll (la cabecera y el pie quedan fijos).
   * - Una longitud CSS (`'400px'`, `'60vh'`, `'calc(100vh - 200px)'`) limita la altura.
   * - `'flex'` hace que el grid ocupe la altura de su contenedor padre, que debe tener altura.
   * - `null` (por defecto) mantiene el comportamiento actual: el grid crece con su contenido.
   *
   * También se puede definir desde CSS sin `::ng-deep`:
   * `acp-data-grid { --acp-grid-scroll-height: 400px; }`.
   */
  scrollHeight = input<AcpDataGridScrollHeight | null>(this._defaultOptions?.scrollHeight ?? null);
  protected readonly _scrollMaxHeight = computed(() => {
    const value = this.scrollHeight();
    return value && value !== 'flex' ? value : null;
  });

  /**
   * The CDK sticky styler measures header/footer row heights once; when `size`
   * changes those heights, the cached `top`/`bottom` offsets become stale and
   * sticky rows overlap. Re-run the sticky update after each size change.
   */
  private readonly _stickyRecalcEffect = effect(() => {
    this.size();
    afterNextRender(
      () => {
        this.table?.updateStickyHeaderRowStyles();
        this.table?.updateStickyFooterRowStyles();
      },
      { injector: this._injector },
    );
  });

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ContentChildren(MatRowDef) rowDefs!: QueryList<MatRowDef<any>>;
  @ContentChildren(MatHeaderRowDef) headerRowDefs!: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatFooterRow) footerRowDefs!: QueryList<MatFooterRowDef>;
  @ViewChild(ColumnResize) columnResize?: ColumnResize;
  @ViewChild(AcpGridColumnMenu) columnMenu!: AcpGridColumnMenu;
  @ViewChild('tableContainer') tableContainer!: ElementRef<HTMLDivElement>;

  dataSource = new MatTableDataSource();

  /** @internal Cached `dataSource.connect()` stream; see `renderedRows`. */
  private _renderData$?: BehaviorSubject<any[]>;

  /** The grid's displayed columns. */
  @Input() displayedColumns: string[] = [];
  /** The grid's columns. */
  @Input() columns: AcpDataGridColumn[] = [];
  /** The grid's data. */
  @Input() data: any[] = [];
  /** The total number of the data. */
  @Input() length = 0;
  /** Whether the grid is loading. */
  @Input({ transform: booleanAttribute }) loading = false;
  /** Tracking function that will be used to check the differences in data changes. */
  @Input() trackBy!: TrackByFunction<any>;
  /** Whether the column is resizable. */
  @Input({ transform: booleanAttribute })
  columnResizable = this._defaultOptions?.columnResizable ?? false;
  /** Placeholder for the empty value (`null`, `''`, `[]`). */
  @Input() emptyValuePlaceholder = this._defaultOptions?.emptyValuePlaceholder ?? '--';

  // ===== Page =====

  /** Whether to paginate the data on front end. */
  @Input({ transform: booleanAttribute })
  pageOnFront = this._defaultOptions?.pageOnFront ?? true;
  /** Whether to show the paginator. */
  @Input({ transform: booleanAttribute })
  showPaginator = this._defaultOptions?.showPaginator ?? true;
  /** Whether the paginator is disabled. */
  @Input({ transform: booleanAttribute })
  pageDisabled = this._defaultOptions?.pageDisabled ?? false;
  /** Whether to show the first/last buttons UI to the user. */
  @Input({ transform: booleanAttribute })
  showFirstLastButtons = this._defaultOptions?.showFirstLastButtons ?? true;
  /** The zero-based page index of the displayed list of items. */
  @Input() pageIndex = this._defaultOptions?.pageIndex ?? 0;
  /** Number of items to display on a page. */
  @Input() pageSize = this._defaultOptions?.pageSize ?? 10;
  /** The set of provided page size options to display to the user. */
  @Input() pageSizeOptions = this._defaultOptions?.pageSizeOptions ?? [10, 50, 100];
  /** Whether to hide the page size selection UI from the user. */
  @Input({ transform: booleanAttribute })
  hidePageSize = this._defaultOptions?.hidePageSize ?? false;
  /** Event emitted when the paginator changes the page size or page index. */
  page = output<PageEvent>();
  /** The template for the pagination. */
  @Input() paginationTemplate!: TemplateRef<any>;

  // ===== Sort =====

  /** Whether to sort the data on front end. */
  @Input({ transform: booleanAttribute })
  sortOnFront = this._defaultOptions?.sortOnFront ?? true;
  /** The id of the most recently sorted MatSortable. */
  @Input() sortActive = this._defaultOptions?.sortActive ?? '';
  /** The sort direction of the currently active MatSortable. */
  @Input() sortDirection: SortDirection = this._defaultOptions?.sortDirection ?? '';
  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   * May be overriden by the column's `disableClear` in `sortProp`.
   */
  @Input({ transform: booleanAttribute })
  sortDisableClear = this._defaultOptions?.sortDisableClear ?? false;
  /** Whether the sort is disabled. */
  @Input({ transform: booleanAttribute })
  sortDisabled = this._defaultOptions?.sortDisabled ?? false;
  /**
   * The direction to set when an MatSortable is initially sorted.
   * May be overriden by the column's `start` in `sortProp`.
   */
  @Input() sortStart: 'asc' | 'desc' = this._defaultOptions?.sortStart ?? 'asc';
  /** Event emitted when the user changes either the active sort or sort direction. */
  sortChange = output<Sort>();

  // ===== Row =====

  /** Whether to use the row hover style. */
  @Input({ transform: booleanAttribute })
  rowHover = this._defaultOptions?.rowHover ?? false;
  /** Whether to use the row striped style. */
  @Input({ transform: booleanAttribute })
  rowStriped = this._defaultOptions?.rowStriped ?? false;
  /** Muestra bordes verticales entre todas las celdas. Color: `--acp-grid-gridline-color`. */
  @Input({ transform: booleanAttribute })
  showGridlines = this._defaultOptions?.showGridlines ?? false;
  /** Event emitted when the user clicks the row. */
  rowClick = output<any>();
  /** Event emitted when the user attempts to open a context menu. */
  rowContextMenu = output<any>();

  // ===== Expandable Row =====

  /**
   * Identifica cada fila para conservar su estado (por ejemplo, la expansión) aunque cambien el
   * orden, la página o los datos. Acepta el nombre de un campo (`'id'`) o una función.
   * Sin `dataKey` se usa la referencia del objeto de la fila.
   */
  dataKey = input<string | ((row: any) => unknown) | null>(null);
  private readonly _expandedKeys = signal<ReadonlySet<unknown>>(new Set());

  /**
   * Estado de expansión en el orden de `data`.
   * @deprecated Usa `isRowExpanded(row)` y `toggleRowExpansion(row)`.
   */
  get expansionRowStates(): { expanded: boolean }[] {
    return (this.data ?? []).map(row => ({ expanded: this.isRowExpanded(row) }));
  }
  set expansionRowStates(states: { expanded: boolean }[]) {
    const keys = new Set<unknown>();
    (this.data ?? []).forEach((row, index) => {
      if (states?.[index]?.expanded) {
        keys.add(this._rowKey(row));
      }
    });
    this._expandedKeys.set(keys);
  }

  /** Whether the row is expandable. */
  @Input({ transform: booleanAttribute }) expandable = false;
  /** The template for the expandable row. */
  @Input() expansionTemplate!: TemplateRef<any>;
  /** Event emitted when the user toggles the expandable row. */
  expansionChange = output<any>();
  closeOthersOnExpand = input(false);

  // ===== Row Group =====

  /**
   * Agrupa las filas por el valor de `groupRowsBy`. `'subheader'` inserta una fila de cabecera
   * antes de cada grupo. Las filas de un mismo grupo se muestran juntas; los grupos siguen el
   * orden de `data`, salvo cuando se ordena por el propio campo de agrupación.
   */
  rowGroupMode = input<AcpDataGridRowGroupMode | null>(null);
  /** Campo (`'warehouse'`) o función que devuelve el valor por el que se agrupan las filas. */
  groupRowsBy = input<string | ((row: any) => unknown) | null>(null);
  /** Muestra un botón en la cabecera de cada grupo para contraer o expandir sus filas. */
  expandableRowGroups = input(false, { transform: booleanAttribute });
  /** Claves de los grupos contraídos. Admite enlace bidireccional: `[(collapsedRowGroups)]`. */
  collapsedRowGroups = model<unknown[]>([]);
  /**
   * Muestra una fila de pie al final de cada grupo con el `summary` de cada columna calculado
   * sobre las filas del grupo (subtotales). `summaryTemplate` también recibe las filas del grupo.
   */
  showRowGroupFooter = input(false, { transform: booleanAttribute });
  /** Plantilla del contenido de la cabecera de grupo. Contexto: `AcpDataGridRowGroupContext`. */
  rowGroupHeaderTemplate = input<TemplateRef<AcpDataGridRowGroupContext> | null>(null);
  /** Se emite cuando el usuario contrae o expande un grupo. */
  rowGroupToggle = output<{ key: unknown; expanded: boolean }>();

  // ===== Tree =====

  /**
   * Activa el modo árbol: campo (`'children'`) o función que devuelve los hijos de cada fila.
   * `data` contiene los nodos raíz. La paginación cuenta nodos raíz y al ordenar se ordenan los
   * hermanos de cada nivel. En modo árbol se ignoran `rowGroupMode` y `mergeRows`.
   */
  treeChildren = input<string | ((row: any) => any[] | null | undefined) | null>(null);
  /**
   * Indica si una fila tiene hijos aunque aún no estén cargados (carga perezosa). Por defecto,
   * una fila tiene hijos si `treeChildren` devuelve un arreglo no vacío. Al expandir un nodo con
   * hijos sin cargar (`undefined`/`null`) se muestra un indicador hasta que lleguen; asígnalos y
   * actualiza `data` o llama a `refreshTree()`.
   */
  treeHasChildren = input<string | ((row: any) => boolean) | null>(null);
  /** Claves (`dataKey` o la propia fila) de los nodos expandidos. Admite `[(expandedTreeKeys)]`. */
  expandedTreeKeys = model<unknown[]>([]);
  /**
   * Con selección múltiple, marcar un nodo marca sus descendientes cargados, y un padre queda
   * marcado cuando todos sus hijos lo están (indeterminado si solo algunos).
   */
  treePropagateSelection = input(true, { transform: booleanAttribute });
  /** Se emite al expandir un nodo (útil para cargar sus hijos de forma perezosa). */
  treeNodeExpand = output<{ row: any; key: unknown }>();
  /** Se emite al contraer un nodo. */
  treeNodeCollapse = output<{ row: any; key: unknown }>();

  /** @internal Visible tree rows rendered by the table in tree mode. */
  _treeRows$: Observable<unknown[]> | null = null;
  private readonly _treeRefresh$ = new BehaviorSubject<void>(undefined);
  private readonly _treeLevels = new Map<unknown, number>();
  private readonly _treeParents = new Map<unknown, unknown>();

  /** @internal Rows rendered by the table when row grouping is active. */
  _rowGroupItems$: Observable<unknown[]> | null = null;
  private _visibleRows: unknown[] | null = null;
  /** Last items rendered with row groups (headers, rows and footers). */
  private _renderedRowGroupItems: unknown[] | null = null;
  private _rowSpanCache: {
    source: unknown[];
    columns: string[];
    spans: Map<unknown, Map<string, number>>;
  } | null = null;
  private readonly _visibleRowIndex = new Map<unknown, number>();
  private readonly _rowGroupRefresh$ = new BehaviorSubject<void>(undefined);
  private _rowGroupContexts = new WeakMap<AcpDataGridRowGroup, AcpDataGridRowGroupContext>();
  private _rowGroupFooterColumnsCache: { source: string[]; ids: string[] } | null = null;
  // ===== Row Selection =====

  rowSelection: SelectionModel<any> = new SelectionModel<any>(true, []);

  /** Whether to support multiple row/cell selection. */
  @Input({ transform: booleanAttribute })
  multiSelectable = this._defaultOptions?.multiSelectable ?? true;
  /** Whether the user can select multiple rows with click. */
  @Input({ transform: booleanAttribute })
  multiSelectionWithClick = this._defaultOptions?.multiSelectionWithClick ?? false;
  /** Whether the row is selectable. */
  @Input({ transform: booleanAttribute })
  rowSelectable = this._defaultOptions?.rowSelectable ?? false;
  /** Whether to hide the row selection checkbox. */
  @Input({ transform: booleanAttribute })
  hideRowSelectionCheckbox = this._defaultOptions?.hideRowSelectionCheckbox ?? false;
  /** Whether disable rows to be selected when clicked. */
  @Input({ transform: booleanAttribute })
  disableRowClickSelection = this._defaultOptions?.disableRowClickSelection ?? false;
  /** The formatter to disable the row selection or hide the row's checkbox. */
  @Input() rowSelectionFormatter: AcpDataGridRowSelectionFormatter = {};
  /** The formatter to set the row's class. */
  @Input() rowClassFormatter?: AcpDataGridRowClassFormatter;
  /** The selected row items. */
  @Input() rowSelected: any[] = [];
  /** Event emitted when the row is selected. */
  rowSelectedChange = output<any[]>();

  checkboxKeyDown = output<KeyboardEvent>();
  checkboxKeyUp = output<KeyboardEvent>();
  checkboxKeyPress = output<KeyboardEvent>();

  rowKeyDown = output<{
    event: KeyboardEvent;
    row: Record<string, any>;
    index: number;
  }>();
  rowKeyUp = output<{
    event: KeyboardEvent;
    row: Record<string, any>;
    index: number;
  }>();
  rowKeyPress = output<{
    event: KeyboardEvent;
    row: Record<string, any>;
    index: number;
  }>();

  // ===== Cell Selection =====

  cellSelection: any[] = [];

  /** Whether the cell is selectable. */
  @Input({ transform: booleanAttribute })
  cellSelectable = this._defaultOptions?.cellSelectable ?? true;
  /** Event emitted when the cell is selected. */
  cellSelectedChange = output<any[]>();

  private _selectedCell?: AcpGridSelectableCell;

  // ===== Cell Editing =====

  /**
   * Event emitted when an editable cell value changes.
   * Contains the row data, column field, old value, and new value.
   */
  cellEditChange = output<{
    row: Record<string, any>;
    field: string;
    oldValue: any;
    newValue: any;
  }>();

  /** Current cell being edited: row reference and field */
  _editingCell = signal<{ row: Record<string, any>; field: string } | null>(null);
  /** Current edit value */
  _editValue = signal<any>('');
  /**
   * Validation error of the current edit, if any. While set, the grid blocks
   * starting another edit so an invalid value cannot be discarded silently.
   */
  _editError = signal<string | null>(null);

  /** Rendered cell components, used to refresh a cell after an inline edit. */
  private readonly _cellComponents = viewChildren(AcpGridCell);
  /** Rendered cell editors, used to restore focus after a failed validation. */
  private readonly _cellEditComponents = viewChildren(AcpGridCellEdit);

  // ===== Toolbar =====

  /** Whether to show the toolbar. */
  @Input({ transform: booleanAttribute })
  showToolbar = this._defaultOptions?.showToolbar ?? false;
  /** The text of the toolbar's title. */
  @Input() toolbarTitle = this._defaultOptions?.toolbarTitle ?? '';
  /** The template for the toolbar. */
  @Input() toolbarTemplate!: TemplateRef<any>;

  // ===== Column Menu =====

  /** Whether the column is hideable. */
  @Input({ transform: booleanAttribute })
  columnHideable = this._defaultOptions?.columnHideable ?? true;
  /** Hide or show when the column's checkbox is checked. */
  @Input() columnHideableChecked: 'show' | 'hide' =
    this._defaultOptions?.columnHideableChecked ?? 'show';
  /** Whether the column is sortable. */
  @Input({ transform: booleanAttribute })
  columnSortable = this._defaultOptions?.columnSortable ?? true;
  /** Whether the column is pinnable. */
  @Input({ transform: booleanAttribute })
  columnPinnable = this._defaultOptions?.columnPinnable ?? true;
  /** Event emitted when the column is hided or is sorted. */
  columnChange = output<AcpDataGridColumn[]>();
  /** The options for the column pin list. */
  @Input() columnPinOptions: AcpDataGridColumnPinOption[] =
    this._defaultOptions?.columnPinOptions ?? [];

  /** Whether to show the column menu button. */
  @Input({ transform: booleanAttribute })
  showColumnMenuButton = this._defaultOptions?.showColumnMenuButton ?? true;
  /** The text for the column menu button. */
  @Input() columnMenuButtonText = this._defaultOptions?.columnMenuButtonText ?? '';
  /** The type for the column menu button. */
  @Input() columnMenuButtonType: AcpDataGridButtonType =
    this._defaultOptions?.columnMenuButtonType ?? 'outlined';
  /** The color for the column menu button. */
  @Input() columnMenuButtonColor: ThemePalette = this._defaultOptions?.columnMenuButtonColor;
  /** The class for the column menu button. */
  @Input() columnMenuButtonClass = this._defaultOptions?.columnMenuButtonClass ?? '';
  /** The icon for the column menu button. */
  @Input() columnMenuButtonIcon = this._defaultOptions?.columnMenuButtonIcon ?? '';
  /** The font icon for the column menu button. */
  @Input() columnMenuButtonFontIcon = this._defaultOptions?.columnMenuButtonFontIcon ?? '';
  /** The svg icon for the column menu button. */
  @Input() columnMenuButtonSvgIcon = this._defaultOptions?.columnMenuButtonSvgIcon ?? '';

  /** Whether to show the column-menu's header. */
  @Input({ transform: booleanAttribute })
  showColumnMenuHeader = this._defaultOptions?.showColumnMenuHeader ?? false;
  /** The text for the column-menu's header. */
  @Input() columnMenuHeaderText = this._defaultOptions?.columnMenuHeaderText ?? 'Columns Header';
  /** The template for the column-menu's header. */
  @Input() columnMenuHeaderTemplate!: TemplateRef<any>;
  /** Whether to show the the column-menu's footer. */
  @Input({ transform: booleanAttribute })
  showColumnMenuFooter = this._defaultOptions?.showColumnMenuFooter ?? false;
  /** The text for the column-menu's footer. */
  @Input() columnMenuFooterText = this._defaultOptions?.columnMenuFooterText ?? 'Columns Footer';
  /** The template for the column-menu's footer. */
  @Input() columnMenuFooterTemplate!: TemplateRef<any>;

  // ===== No Result =====

  /** The displayed text for the empty data. */
  @Input() noResultText = this._defaultOptions?.noResultText ?? 'No records found';
  /** The template for the empty data. */
  @Input() noResultTemplate!: TemplateRef<any>;

  // ===== Keyboard Navigation =====

  /**
   * Whether rows can be navigated with the keyboard: arrows, Home/End, PageUp/PageDown,
   * Enter (same as a click), Space (toggle selection) and Ctrl+A (select all).
   */
  keyboardNavigation = input(this._defaultOptions?.keyboardNavigation ?? false, {
    transform: booleanAttribute,
  });
  /** Index (within the rendered page) of the row to mark as active. */
  highlightedRowIndex = input<number>(-1);
  private readonly _highlightedRowEffect = effect(() => {
    const index = this.highlightedRowIndex();
    if (index >= 0) {
      untracked(() =>
        afterNextRender(() => this.setActiveRow(index), { injector: this._injector }),
      );
    }
  });
  /** Event emitted when the active row changes. */
  focusedRowChange = output<{ row: any; index: number }>();
  get _hasNoResult() {
    return (!this.dataSource.data || this.dataSource.data.length === 0) && !this.loading;
  }

  // ===== Cell Templates =====

  /** The header's cell template for the grid. */
  @Input() headerTemplate!: TemplateRef<any> | AcpDataGridCellTemplate;
  /** The header's cell template for the grid exclude sort. */
  @Input() headerExtraTemplate!: TemplateRef<any> | AcpDataGridCellTemplate;
  /** The cell template for the grid. */
  @Input() cellTemplate!: TemplateRef<any> | AcpDataGridCellTemplate;

  // ===== Row Templates =====

  /** Whether to use custom row template. If true, you should define a matRowDef. */
  @Input({ transform: booleanAttribute }) useContentRowTemplate = false;
  // TODO: It can't use together with `useContentRowTemplate`
  @Input({ transform: booleanAttribute }) useContentHeaderRowTemplate = false;
  // TODO: It's not working
  @Input({ transform: booleanAttribute }) useContentFooterRowTemplate = false;

  // ===== Summary =====

  /** Whether to show the summary. */
  @Input({ transform: booleanAttribute }) showSummary = false;
  /** The template for the summary. */
  @Input() summaryTemplate!: TemplateRef<any> | AcpDataGridCellTemplate;

  // TODO: Summary display conditions
  get _whetherShowSummary() {
    return this.showSummary;
  }

  // ===== Side Bar =====

  /** Whether to show the sidebar. */
  @Input({ transform: booleanAttribute }) showSidebar = false;
  /** The template for the sidebar. */
  @Input() sidebarTemplate!: TemplateRef<any>;

  // ===== Status Bar =====

  /** Whether to show the status bar. */
  @Input({ transform: booleanAttribute }) showStatusbar = false;
  /** The template for the status bar. */
  @Input() statusbarTemplate!: TemplateRef<any>;

  /** The changed record of row data. */
  rowChangeRecord?: KeyValueChangeRecord<string, any>;

  detectChanges() {
    this._changeDetectorRef.detectChanges();
  }

  _getColData(data: any[], colDef: AcpDataGridColumn) {
    return this._utils.getColData(data, colDef);
  }

  _isColumnHide(item: AcpDataGridColumn) {
    if (item.hide !== undefined) {
      return item.hide;
    }
    if (item.show !== undefined) {
      return !item.show;
    }
    return false;
  }

  // Waiting for async data
  ngOnChanges(changes: SimpleChanges) {
    this._countPinnedPosition();

    this.displayedColumns = this.columns
      .filter(item => !this._isColumnHide(item))
      .map(item => item.field);

    if (this.showColumnMenuButton) {
      this.columns.forEach(item => {
        item.hide = this._isColumnHide(item);
        item.show = !item.hide;
      });
    }

    if (this.rowSelectable && !this.hideRowSelectionCheckbox) {
      this.displayedColumns.unshift('acpGridCheckboxColumnDef');
    }

    this._updateGroupHeaderCells();

    if (changes['data'] || changes['dataKey']) {
      this._pruneExpandedKeys();
    }

    // Rebuild the selection only when its inputs or the rows change, so unrelated input changes
    // (e.g. `loading`, or `expandedTreeKeys` on every tree toggle) keep the user's selection.
    if (
      this.rowSelectable &&
      (changes['rowSelected'] ||
        changes['rowSelectable'] ||
        changes['multiSelectable'] ||
        changes['data'])
    ) {
      this.rowSelection = new SelectionModel<any>(this.multiSelectable, this.rowSelected);
    }

    this.dataSource.disconnect();
    this.dataSource = new MatTableDataSource(this.data);
    this._renderData$ = this.dataSource.connect();

    // Reapply sort and paginator after recreating dataSource
    if (this.pageOnFront && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sortOnFront && this.sort) {
      this.dataSource.sort = this.sort;
    }

    this._setupRowGrouping();
    this._setupTree();

    // Only scroll top with data change
    if (changes['data']) {
      this.scrollTop(0);
      this._syncActiveRowWithData();
    }
  }

  ngAfterViewInit() {
    if (this.pageOnFront) {
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource.paginator = null;
    }

    if (this.sortOnFront) {
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource.sort = null;
    }

    if (this.rowDefs?.length > 0 && this.useContentRowTemplate) {
      this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    }
    if (this.headerRowDefs?.length > 0 && this.useContentHeaderRowTemplate) {
      this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    }
    if (this.footerRowDefs?.length > 0 && this.useContentFooterRowTemplate) {
      this.footerRowDefs.forEach(footerRowDef => this.table.addFooterRowDef(footerRowDef));
    }

    this.columnResize?.columnResizeNotifier.resizeCompleted
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(({ columnId, size }) => {
        this._resizedColumnWidths.set(columnId, size);
        this._changeDetectorRef.markForCheck();
      });
  }

  /** Whether any visible column belongs to a group, so the group header rows are rendered. */
  get _hasColumnGroups(): boolean {
    return this._groupHeaderRows.length > 0;
  }

  /**
   * Per-column widths for the hidden sizing row that keeps `table-layout: fixed`
   * (enabled after the first column resize) aligned with the group header row.
   */
  get _sizingColumns(): { field: string; width?: string; minWidth: string }[] {
    return this.displayedColumns.map(field => {
      const resizedWidth = this._resizedColumnWidths.get(field);
      const width =
        resizedWidth != null
          ? `${resizedWidth}px`
          : (this._columnsByField.get(field)?.width ??
            (field === 'acpGridCheckboxColumnDef' ? '60px' : undefined));
      return { field, width, minWidth: width ?? '80px' };
    });
  }

  /** CSS class(es) of the column group the column belongs to, if any. */
  /** @internal Color of the innermost colored group of the column (`groupColor`). */
  _groupColorFor(field: string | undefined): string | null {
    return (field && this._groupColorByField.get(field)) || null;
  }

  _groupClassFor(col: AcpDataGridColumn): string | undefined {
    return this._groupClassByField.get(col.field);
  }

  /** @internal `colspan` of a summary (footer) cell; `0` when covered by a previous cell. */
  _summarySpan(field: string): number | null {
    return this._summarySpans.get(field) ?? null;
  }

  private _updateSummarySpans(): void {
    this._summarySpans.clear();
    const displayed = this.displayedColumns;
    for (let i = 0; i < displayed.length; i++) {
      const col = this._columnsByField.get(displayed[i]);
      const span = Math.floor(col?.summaryColspan ?? 1);
      let end = i + 1;
      // A span stops where the pinning changes: a sticky cell cannot cover scrolling columns.
      while (
        end < Math.min(i + span, displayed.length) &&
        (this._columnsByField.get(displayed[end])?.pinned ?? null) === (col?.pinned ?? null)
      ) {
        end++;
      }
      if (end - i > 1) {
        this._summarySpans.set(displayed[i], end - i);
        for (let j = i + 1; j < end; j++) {
          this._summarySpans.set(displayed[j], 0);
        }
        i = end - 1;
      }
    }
  }

  /** Rebuilds the column-group header rows from the currently visible columns. */
  private _updateGroupHeaderCells(): void {
    this._columnsByField.clear();
    this._groupClassByField.clear();
    this._groupColorByField.clear();
    this.columns.forEach(col => this._columnsByField.set(col.field, col));

    const displayed = this.displayedColumns;
    const paths = displayed.map(field => this._groupPathFor(this._columnsByField.get(field)));
    const maxDepth = paths.reduce((max, path) => Math.max(max, path.length), 0);

    // Without column resize, headers of columns with fewer group levels span down to the column
    // header row (`rowspan`). Resize handles live on the column header cell, so resizable grids
    // keep empty cells above those headers instead.
    const spanHeaders = !this.columnResizable;
    this._spannedHeaderFields.clear();
    this._updateSummarySpans();

    const rows: AcpDataGridGroupHeaderRow[] = [];
    for (let level = 0; level < maxDepth; level++) {
      const cells: AcpDataGridGroupHeaderCell[] = [];
      const columnIds: string[] = [];

      for (let i = 0; i < displayed.length;) {
        const field = displayed[i];
        const path = paths[i];
        const col = this._columnsByField.get(field);

        if (spanHeaders && path.length < level) {
          i++;
          continue;
        }
        if (spanHeaders && path.length === level) {
          const id = `__acpGridHeaderSpan_${field}`;
          cells.push({
            id,
            colspan: 1,
            isGroup: false,
            leafField: field,
            rowspan: maxDepth - level + 1,
            pinned: col?.pinned ?? null,
          });
          columnIds.push(id);
          this._spannedHeaderFields.add(field);
          i++;
          continue;
        }
        if (path.length <= level) {
          const id = `__acpGridGroupEmpty_${level}_${field}`;
          cells.push({
            id,
            colspan: 1,
            isGroup: false,
            pinned: col?.pinned ?? null,
          });
          columnIds.push(id);
          i++;
          continue;
        }

        let end = i + 1;
        const pinned = col?.pinned ?? null;
        const members: AcpDataGridColumn[] = [col!];
        let uniformPin = true;
        while (end < displayed.length) {
          const nextPath = paths[end];
          const next = this._columnsByField.get(displayed[end]);
          if (nextPath.length <= level || !this._sameGroupPrefix(path, nextPath, level)) {
            break;
          }
          members.push(next!);
          if ((next?.pinned ?? null) !== pinned) {
            uniformPin = false;
          }
          end++;
        }

        const header = path[level].label;
        // Each member column resolves its own `groupClass` for this level; the
        // group cell combines the distinct results so mixed groups still render.
        const cellClasses: string[] = [];
        members.forEach(member => {
          const groupClass = member.groupClass;
          const className =
            typeof groupClass === 'function' ? groupClass(header, members) : groupClass;
          if (!className) {
            return;
          }
          if (!cellClasses.includes(className)) {
            cellClasses.push(className);
          }
          const previous = this._groupClassByField.get(member.field);
          const existing = previous?.split(' ') ?? [];
          if (!existing.includes(className)) {
            this._groupClassByField.set(
              member.field,
              previous ? `${previous} ${className}` : className,
            );
          }
        });
        const className = cellClasses.length ? cellClasses.join(' ') : undefined;
        // First member color for this level; inner levels overwrite outer ones on the cells.
        let color: string | undefined;
        for (const member of members) {
          const groupColor = member.groupColor;
          color = typeof groupColor === 'function' ? groupColor(header, members) : groupColor;
          if (color) {
            break;
          }
        }
        if (color) {
          members.forEach(member => this._groupColorByField.set(member.field, color));
        }

        const id = `__acpGridGroup_${level}_${field}`;
        cells.push({
          id,
          colspan: end - i,
          isGroup: true,
          header,
          className,
          color,
          pinned: uniformPin ? pinned : null,
        });
        columnIds.push(id);
        i = end;
      }

      rows.push({ cells, columnIds });
    }

    this._groupHeaderRows = rows;
  }

  /** Normalizes a column `group` into an array of comparable `{ key, label }` levels. */
  private _groupPathFor(col?: AcpDataGridColumn): AcpDataGridGroupLevelValue[] {
    const group = col?.group;
    if (group == null) {
      return [];
    }
    const levels: AcpDataGridColumnGroupItem[] = Array.isArray(group) ? group : [group];
    return levels.map(item => {
      const descriptor = this._asGroupDescriptor(item);
      const keySource = descriptor ? descriptor.key : (item as AcpDataGridColumnGroupLevel);
      const labelSource = descriptor?.label ?? keySource;
      const key = this._resolveGroupLevel(keySource);
      this._trackGroupKey(key);
      return {
        key,
        label: this._resolveGroupLevel(labelSource),
      };
    });
  }

  /**
   * Subscribes once to an `Observable` group key so its first emitted value can
   * be used when merging group header cells. If the value arrives after the
   * header rows were built, they are rebuilt.
   */
  private _trackGroupKey(key: string | Observable<string>): void {
    if (typeof key === 'string' || this._trackedGroupKeyObservables.has(key)) {
      return;
    }
    this._trackedGroupKeyObservables.add(key);
    key.pipe(take(1), takeUntilDestroyed(this._destroyRef)).subscribe(value => {
      this._groupKeyValues.set(key, value);
      this._updateGroupHeaderCells();
      this._changeDetectorRef.markForCheck();
    });
  }

  /** Resolves a group level (string, Observable or data function) to its display value. */
  private _resolveGroupLevel(level: AcpDataGridColumnGroupLevel): string | Observable<string> {
    return typeof level === 'function' ? level(this.data) : level;
  }

  /** Returns the item as a `{ key, label }` descriptor, or `undefined` for plain levels. */
  private _asGroupDescriptor(
    item: AcpDataGridColumnGroupItem,
  ): AcpDataGridColumnGroupDescriptor | undefined {
    return typeof item === 'object' && item !== null && 'key' in item
      ? (item as AcpDataGridColumnGroupDescriptor)
      : undefined;
  }

  /** Whether two group paths share the same group keys up to and including `level`. */
  private _sameGroupPrefix(
    a: AcpDataGridGroupLevelValue[],
    b: AcpDataGridGroupLevelValue[],
    level: number,
  ): boolean {
    for (let i = 0; i <= level; i++) {
      if (!this._sameGroupKey(a[i].key, b[i].key)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Compares two group keys. `Observable` keys are compared by their first
   * emitted value (see `_trackGroupKey`), so distinct instances that resolve to
   * the same value still merge into one group.
   */
  private _sameGroupKey(a: unknown, b: unknown): boolean {
    if (a === b) {
      return true;
    }
    const resolve = (value: unknown) =>
      isObservable(value) ? this._groupKeyValues.get(value as Observable<string>) : value;
    const resolvedA = resolve(a);
    return resolvedA !== undefined && resolvedA === resolve(b);
  }

  _countPinnedPosition() {
    const pinnedLeftCols = this.columns.filter(col => col.pinned && col.pinned === 'left');
    pinnedLeftCols.forEach((item, idx) => {
      item.left =
        pinnedLeftCols
          .slice(0, idx)
          .reduce((acc, cur) => acc + Number.parseFloat(cur.width || '80px'), 0) + 'px';
    });

    const pinnedRightCols = this.columns
      .filter(col => col.pinned && col.pinned === 'right')
      .reverse();
    pinnedRightCols.forEach((item, idx) => {
      item.right =
        pinnedRightCols
          .slice(0, idx)
          .reduce((acc, cur) => acc + Number.parseFloat(cur.width || '80px'), 0) + 'px';
    });
  }

  // ===== Keyboard Navigation =====

  /** Rows currently rendered (after sorting and front-end paging). */
  get renderedRows(): any[] {
    if (this._visibleRows) {
      return this._visibleRows;
    }
    this._renderData$ ??= this.dataSource.connect();
    return this._renderData$.value;
  }

  /** Index of the active row within the rendered rows, or -1. */
  get activeRowIndex(): number {
    const row = this._activeRow();
    return row === null ? -1 : this.renderedRows.indexOf(row);
  }

  /** The active row, or `null`. */
  get activeRow(): any {
    return this.activeRowIndex === -1 ? null : this._activeRow();
  }

  /**
   * Marks a rendered row as active.
   * @param focus Whether to move the browser focus to the row.
   */
  setActiveRow(index: number, focus = false): void {
    const rows = this.renderedRows;
    if (rows.length === 0) {
      this._setActiveRow(null);
      return;
    }
    const target = Math.min(Math.max(index, 0), rows.length - 1);
    this._setActiveRow(rows[target]);
    const element = this._rowElement(target);
    if (focus) {
      element?.focus({ preventScroll: true });
    }
    element?.scrollIntoView?.({ block: 'nearest' });
  }

  /** Moves the active row by `delta` rows; starts at the first row when none is active. */
  moveActiveRow(delta: number, focus = false): void {
    const current = this.activeRowIndex;
    this.setActiveRow(current === -1 ? 0 : current + delta, focus);
  }

  /** Runs the click behavior (selection and `rowClick`) on the active row. */
  activateActiveRow(event: MouseEvent | KeyboardEvent): boolean {
    const index = this.activeRowIndex;
    if (index === -1) {
      return false;
    }
    this._selectRow(event, this.renderedRows[index], index);
    return true;
  }

  /** Goes to the next page and activates its first row; on the last page, activates the last row. */
  nextPage(focus = false): void {
    this._changePage(1, focus);
  }

  /** Goes to the previous page and activates its first row; on the first page, activates the first row. */
  previousPage(focus = false): void {
    this._changePage(-1, focus);
  }

  _rowId(index: number): string {
    return `${this.gridId}-row-${index}`;
  }

  _activeRowId(): string | null {
    const index = this.activeRowIndex;
    return index === -1 ? null : this._rowId(index);
  }

  _isActiveRow(row: unknown): boolean {
    return this._activeRow() === row;
  }

  _rowTabIndex(row: unknown, index: number): number | null {
    if (!this.keyboardNavigation()) {
      return null;
    }
    const activeIndex = this.activeRowIndex;
    return (activeIndex === -1 ? index === 0 : this._activeRow() === row) ? 0 : -1;
  }

  _onRowFocus(row: unknown): void {
    if (this.keyboardNavigation() && this._activeRow() !== row) {
      this._setActiveRow(row);
    }
  }

  private _setActiveRow(row: unknown): void {
    if (this._activeRow() === row) {
      return;
    }
    this._activeRow.set(row);
    if (row !== null) {
      this.focusedRowChange.emit({ row, index: this.renderedRows.indexOf(row) });
    }
  }

  private _rowElement(index: number): HTMLElement | null {
    return this._elementRef.nativeElement.querySelector<HTMLElement>(`#${this._rowId(index)}`);
  }

  private _changePage(delta: 1 | -1, focus: boolean): void {
    const paginator = this.paginator;
    const canMove =
      this.showPaginator &&
      !!paginator &&
      (delta === 1 ? paginator.hasNextPage() : paginator.hasPreviousPage());
    if (!canMove) {
      this.setActiveRow(delta === 1 ? this.renderedRows.length - 1 : 0, focus);
      return;
    }
    this._focusFirstRowOnRender = focus;
    this._setActiveRow(null);
    if (delta === 1) {
      paginator.nextPage();
    } else {
      paginator.previousPage();
    }
    // Front-end paging re-renders synchronously; server paging activates on the next data change
    if (this.pageOnFront) {
      this._activateFirstRowAfterRender();
    }
  }

  private _syncActiveRowWithData(): void {
    if (this._activateFirstRowOnDataChange && this.pageOnFront && this.paginator?.pageIndex) {
      this.paginator.firstPage();
    }
    const rows = this.renderedRows;
    if (this._focusFirstRowOnRender || this._activateFirstRowOnDataChange) {
      this._activateFirstRowAfterRender();
    } else {
      const activeRow = this._activeRow();
      if (activeRow !== null && !rows.includes(activeRow)) {
        this._activeRow.set(null);
      }
    }
  }

  private _activateFirstRowAfterRender(): void {
    const focus = this._focusFirstRowOnRender;
    this._focusFirstRowOnRender = false;
    this._activeRow.set(null);
    afterNextRender(() => this.setActiveRow(0, focus), { injector: this._injector });
  }

  private _isEditableTarget(target: EventTarget | null): boolean {
    if (target instanceof HTMLInputElement) {
      return !['checkbox', 'radio', 'button', 'submit', 'reset'].includes(target.type);
    }
    return (
      target instanceof HTMLElement &&
      (target.isContentEditable || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')
    );
  }

  private _handleRowKeyDown(event: KeyboardEvent, row: Record<string, any>, index: number) {
    if (this._isEditableTarget(event.target)) {
      return;
    }
    const onRow = event.target === event.currentTarget;
    const rowCount = this.renderedRows.length;

    switch (event.key) {
      case 'ArrowDown':
        this.setActiveRow(index + 1, true);
        break;
      case 'ArrowUp':
        this.setActiveRow(index - 1, true);
        break;
      case 'Home':
        this.setActiveRow(0, true);
        break;
      case 'End':
        this.setActiveRow(rowCount - 1, true);
        break;
      case 'PageDown':
        this.nextPage(true);
        break;
      case 'PageUp':
        this.previousPage(true);
        break;
      case 'ArrowRight':
      case 'ArrowLeft': {
        if (!onRow || !this._treeActive) {
          return;
        }
        const expand = (event.key === 'ArrowRight') !== (this._dir?.value === 'rtl');
        const expanded = this.isTreeNodeExpanded(row);
        if (expand && this._treeHasChildren(row) && !expanded) {
          this.toggleTreeNode(row, true);
        } else if (!expand && expanded) {
          this.toggleTreeNode(row, false);
        } else if (!expand && this._treeParents.has(row)) {
          this.setActiveRow(this.renderedRows.indexOf(this._treeParents.get(row)), true);
        } else if (expand && expanded) {
          this.setActiveRow(index + 1, true);
        }
        break;
      }
      case 'Enter':
        if (!onRow) {
          return;
        }
        this._selectRow(event, row, index);
        break;
      case ' ':
        if (!onRow || !this.rowSelectable || this.rowSelectionFormatter.disabled?.(row, index)) {
          return;
        }
        this._toggleNormalCheckbox(row);
        break;
      case 'a':
      case 'A':
        if (!(event.ctrlKey || event.metaKey) || !this.rowSelectable || !this.multiSelectable) {
          return;
        }
        if (!this._isAllSelected()) {
          this._toggleMasterCheckbox();
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  _getIndex(index: number | undefined, dataIndex: number) {
    return index === undefined ? dataIndex : index;
  }

  /** @internal Index of a data row among the rendered data rows (group rows are not counted). */
  _rowIndex(row: unknown, index: number | undefined, dataIndex: number): number {
    return this._visibleRows
      ? (this._visibleRowIndex.get(row) ?? -1)
      : this._getIndex(index, dataIndex);
  }

  // ===== Row Group =====

  /** @internal Whether group header/footer rows are rendered. */
  get _rowGroupingActive(): boolean {
    return this.rowGroupMode() === 'subheader' && this.groupRowsBy() != null;
  }

  /** Whether rows are kept together by group (`subheader` and `rowspan` modes). */
  private get _rowGroupOrderingActive(): boolean {
    return !this._treeActive && this.rowGroupMode() !== null && this.groupRowsBy() != null;
  }

  // ===== Tree =====

  /** @internal Whether the grid renders a tree (`treeChildren`). */
  get _treeActive(): boolean {
    return this.treeChildren() != null;
  }

  /** @internal Children of a node, or `null`/`undefined` when it has none or they are not loaded. */
  _treeChildrenOf(row: any): any[] | null | undefined {
    const children = this.treeChildren();
    if (row == null || children == null) {
      return null;
    }
    return typeof children === 'function' ? children(row) : row[children];
  }

  /** @internal */
  _treeHasChildren(row: any): boolean {
    const hasChildren = this.treeHasChildren();
    if (hasChildren != null && row != null) {
      return !!(typeof hasChildren === 'function' ? hasChildren(row) : row[hasChildren]);
    }
    return (this._treeChildrenOf(row)?.length ?? 0) > 0;
  }

  /** @internal Expanded node whose children are not loaded yet. */
  _treeLoading(row: any): boolean {
    return this.isTreeNodeExpanded(row) && this._treeChildrenOf(row) == null;
  }

  /** @internal Depth of a rendered node (roots are 0). */
  _treeLevelOf(row: unknown): number {
    return this._treeLevels.get(row) ?? 0;
  }

  /** @internal Column that renders the indentation and toggle. */
  _isTreeToggleColumn(col: AcpDataGridColumn): boolean {
    if (!this._treeActive) {
      return false;
    }
    const marked = this.columns.some(item => item.treeToggle);
    if (marked) {
      return !!col.treeToggle;
    }
    return col.field === this.displayedColumns.find(field => this._columnsByField.has(field));
  }

  /** @internal Accessible name of a tree toggle: the node's text in the toggle column. */
  _treeToggleLabel(row: any, col: AcpDataGridColumn): string {
    const value = this._utils.getCellValue(row, col);
    return value == null ? '' : `${value}`;
  }

  /** Indica si el nodo está expandido. */
  isTreeNodeExpanded(row: unknown): boolean {
    return this.expandedTreeKeys().includes(this._rowKey(row));
  }

  /** Expande o contrae un nodo (alterna si no se indica `expanded`). Devuelve el nuevo estado. */
  toggleTreeNode(row: unknown, expanded = !this.isTreeNodeExpanded(row)): boolean {
    const key = this._rowKey(row);
    const keys = this.expandedTreeKeys().filter(item => !Object.is(item, key));
    if (expanded) {
      keys.push(key);
    }
    this.expandedTreeKeys.set(keys);
    this._treeRefresh$.next();
    (expanded ? this.treeNodeExpand : this.treeNodeCollapse).emit({ row, key });
    return expanded;
  }

  /** Expande todos los nodos con hijos cargados. */
  expandAll(): void {
    const keys = this._treeAllNodes()
      .filter(row => this._treeHasChildren(row))
      .map(row => this._rowKey(row));
    this.expandedTreeKeys.set(keys);
    this._treeRefresh$.next();
  }

  /** Contrae todos los nodos. */
  collapseAll(): void {
    this.expandedTreeKeys.set([]);
    this._treeRefresh$.next();
  }

  /** Vuelve a dibujar el árbol, p. ej. tras asignar hijos cargados de forma perezosa. */
  refreshTree(): void {
    this._treeRefresh$.next();
  }

  /** All loaded nodes, depth-first. */
  private _treeAllNodes(): any[] {
    const nodes: any[] = [];
    const visit = (row: any) => {
      nodes.push(row);
      this._treeChildrenOf(row)?.forEach(visit);
    };
    (this.data ?? []).forEach(visit);
    return nodes;
  }

  private _treeDescendants(row: any): any[] {
    const nodes: any[] = [];
    const visit = (node: any) => {
      this._treeChildrenOf(node)?.forEach(child => {
        nodes.push(child);
        visit(child);
      });
    };
    visit(row);
    return nodes;
  }

  private get _treeSelectionPropagates(): boolean {
    return this._treeActive && this.multiSelectable && this.treePropagateSelection();
  }

  /** @internal Partially selected node: some, but not all, descendants are selected. */
  _treeIndeterminate(row: any): boolean {
    if (!this._treeSelectionPropagates || this.rowSelection.isSelected(row)) {
      return false;
    }
    return this._treeDescendants(row).some(node => this.rowSelection.isSelected(node));
  }

  /** Selects or deselects a node with its descendants, then updates its ancestors. */
  private _toggleTreeSelection(row: any): void {
    const selected = !this.rowSelection.isSelected(row);
    const nodes = [row, ...this._treeDescendants(row)];
    if (selected) {
      this.rowSelection.select(...nodes);
    } else {
      this.rowSelection.deselect(...nodes);
    }
    let parent = this._treeParents.get(row);
    while (parent !== undefined) {
      const children = this._treeChildrenOf(parent) ?? [];
      const allSelected = children.every(child => this.rowSelection.isSelected(child));
      if (allSelected) {
        this.rowSelection.select(parent);
      } else {
        this.rowSelection.deselect(parent);
      }
      parent = this._treeParents.get(parent);
    }
  }

  /** Flattens the current page of root nodes into the visible tree rows. */
  private _setupTree(): void {
    this._treeRows$ = null;
    this._treeLevels.clear();
    this._treeParents.clear();
    if (!this._treeActive) {
      return;
    }
    const dataSource = this.dataSource;
    this._treeRows$ = combineLatest([dataSource.connect(), this._treeRefresh$]).pipe(
      map(([roots]) => {
        const sort = dataSource.sort;
        const sorted = (rows: any[]) =>
          sort?.active && sort.direction ? dataSource.sortData(rows.slice(), sort) : rows;
        const expanded = new Set(this.expandedTreeKeys());
        const rows: unknown[] = [];
        this._treeLevels.clear();
        this._treeParents.clear();
        const visit = (row: any, level: number, parent: unknown) => {
          rows.push(row);
          this._treeLevels.set(row, level);
          if (parent !== undefined) {
            this._treeParents.set(row, parent);
          }
          const children = this._treeChildrenOf(row);
          if (children?.length && expanded.has(this._rowKey(row))) {
            sorted(children).forEach(child => visit(child, level + 1, row));
          }
        };
        roots.forEach(row => visit(row, 0, undefined));
        this._visibleRows = rows;
        this._visibleRowIndex.clear();
        rows.forEach((row, i) => this._visibleRowIndex.set(row, i));
        return rows;
      }),
    );
  }

  /**
   * @internal `rowspan` of a data cell: `null` for a regular cell, `n > 1` for the first cell of
   * a merged block and `0` for the cells it covers (they are hidden).
   */
  _rowSpan(row: unknown, col: AcpDataGridColumn): number | null {
    if (this.expandable || this._treeActive || !this._mergesRows(col)) {
      return null;
    }
    return this._rowSpans().get(row)?.get(col.field) ?? null;
  }

  /** @internal Whether the cells of the column can be merged (`mergeRows` or `rowspan` mode). */
  _mergesRows(col: AcpDataGridColumn | undefined): boolean {
    return (
      !!col &&
      (!!col.mergeRows || (this.rowGroupMode() === 'rowspan' && col.field === this.groupRowsBy()))
    );
  }

  private _rowSpans(): Map<unknown, Map<string, number>> {
    const source = this._renderedRowGroupItems ?? this.renderedRows;
    const columns = this.displayedColumns;
    if (this._rowSpanCache?.source === source && this._rowSpanCache.columns === columns) {
      return this._rowSpanCache.spans;
    }
    const merged: RowSpanColumn<any>[] = [];
    for (const field of columns) {
      const col = this._columnsByField.get(field);
      if (!col || !this._mergesRows(col)) {
        continue;
      }
      const mergeRows = col.mergeRows;
      merged.push({
        field,
        equals:
          typeof mergeRows === 'function'
            ? mergeRows
            : (a, b) =>
                Object.is(this._utils.getCellValue(a, col), this._utils.getCellValue(b, col)),
      });
    }
    const spans = computeRowSpans(source, merged, isRowGroupItem);
    this._rowSpanCache = { source, columns, spans };
    return spans;
  }

  /** @internal Row predicates; data rows match whenever the item is not a group row. */
  readonly _isDataRow = (_: number, item: unknown) => !isRowGroupItem(item);
  readonly _isRowGroupHeader = (_: number, item: unknown) =>
    isRowGroupItem(item) && item.acpRowGroupRow === 'header';
  readonly _isRowGroupFooter = (_: number, item: unknown) =>
    isRowGroupItem(item) && item.acpRowGroupRow === 'footer';

  /** @internal Keeps the consumer `trackBy` for data rows; group rows are tracked by identity. */
  readonly _rowGroupTrackBy: TrackByFunction<unknown> = (index, item) =>
    isRowGroupItem(item) || !this.trackBy ? item : this.trackBy(index, item);

  /** @internal */
  get _rowGroupFooterColumns(): string[] {
    const source = this.displayedColumns;
    if (this._rowGroupFooterColumnsCache?.source !== source) {
      this._rowGroupFooterColumnsCache = {
        source,
        ids: source.map(id => `acpGridRowGroupFooter:${id}`),
      };
    }
    return this._rowGroupFooterColumnsCache.ids;
  }

  /** @internal */
  _columnFor(field: string): AcpDataGridColumn | undefined {
    return this._columnsByField.get(field);
  }

  /** @internal */
  _rowGroupLabel(group: AcpDataGridRowGroup): string {
    const key = group.key;
    return key === null || key === undefined || key === '' ? this.emptyValuePlaceholder : `${key}`;
  }

  /** @internal Stable context object per group, so the header template is not re-created. */
  _rowGroupContext(group: AcpDataGridRowGroup): AcpDataGridRowGroupContext {
    let context = this._rowGroupContexts.get(group);
    if (!context) {
      context = {
        $implicit: group,
        group,
        key: group.key,
        rows: group.rows,
        count: group.rows.length,
        expanded: group.expanded,
      };
      this._rowGroupContexts.set(group, context);
    }
    return context;
  }

  /** Indica si el grupo con esa clave está expandido. */
  isRowGroupExpanded(key: unknown): boolean {
    return !this.collapsedRowGroups().includes(key);
  }

  /** Expande o contrae un grupo (alterna si no se indica `expanded`). Devuelve el nuevo estado. */
  toggleRowGroup(key: unknown, expanded = !this.isRowGroupExpanded(key)): boolean {
    const collapsed = this.collapsedRowGroups().filter(item => !Object.is(item, key));
    if (!expanded) {
      collapsed.push(key);
    }
    this.collapsedRowGroups.set(collapsed);
    this._rowGroupRefresh$.next();
    this.rowGroupToggle.emit({ key, expanded });
    return expanded;
  }

  private _rowGroupKey(row: any): unknown {
    const groupBy = this.groupRowsBy();
    if (row == null || groupBy == null) {
      return undefined;
    }
    return typeof groupBy === 'function' ? groupBy(row) : row[groupBy];
  }

  /**
   * Wraps the data source ordering so rows of a group stay together, and derives the rendered
   * items (group headers, visible rows, group footers) from each page.
   */
  private _setupRowGrouping(): void {
    this._rowGroupItems$ = null;
    this._visibleRows = null;
    this._renderedRowGroupItems = null;
    this._visibleRowIndex.clear();
    if (!this._rowGroupOrderingActive) {
      return;
    }

    const dataSource = this.dataSource;
    const keyOf = (row: unknown) => this._rowGroupKey(row);
    const rank = new Map<unknown, number>();
    for (const row of this.data ?? []) {
      const key = keyOf(row);
      if (!rank.has(key)) {
        rank.set(key, rank.size);
      }
    }

    let groups = new Map<unknown, unknown[]>();
    const orderData = dataSource._orderData.bind(dataSource);
    dataSource._orderData = rows => {
      const sort = dataSource.sort;
      const sortedByGroup =
        typeof this.groupRowsBy() === 'string' &&
        !!sort?.direction &&
        sort.active === this.groupRowsBy();
      const ordered = groupRowsContiguous(orderData(rows), keyOf, sortedByGroup ? undefined : rank);
      groups = collectRowGroups(ordered, keyOf);
      return ordered;
    };
    // Re-run the pipeline: the data source already emitted with the original ordering.
    dataSource.data = this.data ?? [];
    if (!this._rowGroupingActive) {
      return;
    }

    const cache = new RowGroupItemCache();
    this._rowGroupContexts = new WeakMap();
    this._rowGroupItems$ = combineLatest([dataSource.connect(), this._rowGroupRefresh$]).pipe(
      map(([pageRows]) => {
        const view = buildRowGroupView(pageRows, {
          keyOf,
          groups,
          collapsed: new Set(this.collapsedRowGroups()),
          footer: this.showRowGroupFooter(),
          cache,
        });
        this._visibleRows = view.visibleRows;
        this._renderedRowGroupItems = view.items as unknown[];
        this._visibleRowIndex.clear();
        view.visibleRows.forEach((row, i) => this._visibleRowIndex.set(row, i));
        return view.items as unknown[];
      }),
    );
  }

  _onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  _onRowDataChange(record: KeyValueChangeRecord<string, any>) {
    this.rowChangeRecord = record;
    this._changeDetectorRef.markForCheck();
  }

  /** Expansion change event */
  _onExpansionChange(
    expansionRef: AcpGridExpansionToggle,
    rowData: Record<string, any>,
    column: AcpDataGridColumn,
    index: number,
  ) {
    this._setRowExpanded(rowData, expansionRef.opened, this.closeOthersOnExpand());
    this.expansionChange.emit({ expanded: expansionRef.opened, data: rowData, index, column });
  }

  /** Cell select event */
  _selectCell(
    cellRef: AcpGridSelectableCell,
    rowData: Record<string, any>,
    colDef: AcpDataGridColumn,
  ): void {
    // If not the same cell
    if (this._selectedCell !== cellRef) {
      const colValue = this._utils.getCellValue(rowData, colDef);
      this.cellSelection = []; // reset
      this.cellSelection.push({ cellData: colValue, rowData, colDef });

      this.cellSelectedChange.emit(this.cellSelection);

      if (this._selectedCell) {
        this._selectedCell.deselect(); // the selectedCell will be undefined
      }
    }

    this._selectedCell = cellRef.selected ? cellRef : undefined;
  }

  // ===== Cell Editing Methods =====

  /** Start editing a cell on click */
  _onCellClick(row: Record<string, any>, colDef: AcpDataGridColumn): void {
    if (!this._isCellEditable(row, colDef)) {
      return;
    }
    // Keep the row reference: `dataIndex` is not the index in `dataSource.data`
    // (it is undefined unless `multiTemplateDataRows` is on, and indexes the
    // rendered/sorted/paginated stream, not the raw data array).
    // While the current edit has a validation error, block starting another
    // one so the invalid value is not silently discarded (like Tabulator's
    // `invalidEdit` blocking mode).
    if (this._editError() !== null) {
      return;
    }
    const currentValue = this._utils.getCellValue(row, colDef);
    this._editingCell.set({ row, field: colDef.field });
    this._editValue.set(currentValue);
  }

  /** Confirm the cell edit */
  _onEditComplete(newValue: any): void {
    const editing = this._editingCell();
    if (!editing) {
      return;
    }

    const row = editing.row;
    if (!row) {
      this._cancelEdit();
      return;
    }

    // Find the column definition
    const colDef = this.columns.find(c => c.field === editing.field);
    if (!colDef) {
      this._cancelEdit();
      return;
    }

    const oldValue = this._utils.getCellValue(row, colDef);

    // Run validator if provided
    if (colDef.editValidator) {
      const result = colDef.editValidator(newValue, row);
      if (result !== true) {
        // Validation failed - keep editing and surface the message
        this._editError.set(typeof result === 'string' ? result : 'Invalid value');
        this._changeDetectorRef.markForCheck();
        this._cellEditComponents().at(0)?.focusAndSelect();
        return;
      }
    }
    this._editError.set(null);

    // Update the row data (supports nested paths like `a.b.c`, mirroring getCellValue)
    this._setCellValue(row, editing.field, newValue);

    // The row object is mutated in place, so the OnPush cell inputs do not
    // change; mark the edited cells for check so they render the new value.
    this._cellComponents()
      .filter(c => c.rowData === row && c.colDef?.field === editing.field)
      .forEach(c => c.markForCheck());

    // Emit the change event
    this.cellEditChange.emit({ row, field: editing.field, oldValue, newValue });

    this._editingCell.set(null);
    this._editValue.set('');
    this._changeDetectorRef.markForCheck();
  }

  /** Cancel the cell edit */
  _onEditCancel(): void {
    this._cancelEdit();
  }

  private _cancelEdit(): void {
    this._editingCell.set(null);
    this._editValue.set('');
    this._editError.set(null);
    this._changeDetectorRef.markForCheck();
  }

  /** Write a value into a row following the same dotted-path semantics as `getCellValue`. */
  private _setCellValue(row: Record<string, any>, field: string, value: any): void {
    const keys = field.split('.');
    let target: Record<string, any> = row;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (target[key] == null || typeof target[key] !== 'object') {
        target[key] = {};
      }
      target = target[key];
    }
    target[keys[keys.length - 1]] = value;
  }

  /** @internal Whether the cell can be edited: `editable` is a flag or a per-row function. */
  _isCellEditable(row: Record<string, any>, colDef: AcpDataGridColumn): boolean {
    const editable = colDef.editable;
    return typeof editable === 'function' ? editable(row) : !!editable;
  }

  /** Check if a specific cell is currently being edited */
  _isCellEditing(row: Record<string, any>, field: string): boolean {
    const editing = this._editingCell();
    return editing !== null && editing.row === row && editing.field === field;
  }

  /** Row select event */
  _selectRow(event: MouseEvent | KeyboardEvent, rowData: Record<string, any>, index: number) {
    if (
      this.rowSelectable &&
      !this.rowSelectionFormatter.disabled?.(rowData, index) &&
      !this.rowSelectionFormatter.hideCheckbox?.(rowData, index) &&
      !this.disableRowClickSelection
    ) {
      // metaKey -> command key
      if (!this.multiSelectionWithClick && !event.ctrlKey && !event.metaKey) {
        this.rowSelection.clear();
      }

      this._toggleNormalCheckbox(rowData);
    }

    this.rowClick.emit({ event, rowData, index });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  _isAllSelected() {
    const numSelected = this.rowSelection.selected.length;
    const numRows = this._selectableRows().filter(
      (row, index) => !this.rowSelectionFormatter.disabled?.(row, index),
    ).length;
    return numSelected === numRows;
  }

  /** Select all rows if they are not all selected; otherwise clear selection. */
  _toggleMasterCheckbox() {
    if (this._isAllSelected()) {
      this.rowSelection.clear();
    } else {
      this._selectableRows().forEach((row, index) => {
        if (!this.rowSelectionFormatter.disabled?.(row, index)) {
          this.rowSelection.select(row);
        }
      });
    }
    this.rowSelectedChange.emit(this.rowSelection.selected);
  }

  /** Select normal row */
  /** Rows the master checkbox acts on: every loaded node in tree mode. */
  private _selectableRows(): any[] {
    return this._treeActive ? this._treeAllNodes() : this.dataSource.data;
  }

  _toggleNormalCheckbox(row: Record<string, any>) {
    if (this._treeSelectionPropagates) {
      this._toggleTreeSelection(row);
    } else {
      this.rowSelection.toggle(row);
    }
    this.rowSelectedChange.emit(this.rowSelection.selected);
  }

  _onCheckboxKeyDown(event: KeyboardEvent) {
    this.checkboxKeyDown.emit(event);
  }

  _onCheckboxKeyUp(event: KeyboardEvent) {
    this.checkboxKeyUp.emit(event);
  }

  _onCheckboxKeyPress(event: KeyboardEvent) {
    this.checkboxKeyPress.emit(event);
  }

  _onRowKeyDown(event: KeyboardEvent, row: Record<string, any>, index: number) {
    this.rowKeyDown.emit({ event, row, index });
    if (this.keyboardNavigation() && !event.defaultPrevented) {
      this._handleRowKeyDown(event, row, index);
    }
  }

  _onRowKeyUp(event: KeyboardEvent, row: Record<string, any>, index: number) {
    this.rowKeyUp.emit({ event, row, index });
  }

  _onRowKeyPress(event: KeyboardEvent, row: Record<string, any>, index: number) {
    this.rowKeyPress.emit({ event, row, index });
  }

  /** Column change event */
  _onColumnChange(columns: AcpDataGridColumn[]) {
    this.columnChange.emit(columns);

    this.displayedColumns = Object.assign([], this.getDisplayedColumnFields(columns));

    if (this.rowSelectable && !this.hideRowSelectionCheckbox) {
      this.displayedColumns.unshift('acpGridCheckboxColumnDef');
    }

    this._updateGroupHeaderCells();
  }

  getDisplayedColumnFields(columns: AcpDataGridColumn[]): string[] {
    const fields = columns
      .filter(item => (this.columnHideableChecked === 'show' ? item.show : !item.hide))
      .map(item => item.field);
    return fields;
  }

  /**
   * Alterna la expansión de la fila en la posición `index` de `data`.
   * @deprecated Usa `toggleRowExpansion(row)`, que no depende de la posición.
   */
  toggleExpansion(index: number) {
    if (!this.expandable) {
      throw new Error('The `expandable` should be set true.');
    }
    const row = this.data?.[index];
    return this._setRowExpanded(row, !this.isRowExpanded(row));
  }

  /** Indica si la fila está expandida. */
  isRowExpanded(row: unknown): boolean {
    return this._expandedKeys().has(this._rowKey(row));
  }

  /**
   * Expande o contrae una fila (alterna si no se indica `expanded`). Respeta
   * `closeOthersOnExpand`. Devuelve el nuevo estado.
   */
  toggleRowExpansion(row: unknown, expanded = !this.isRowExpanded(row)): boolean {
    if (!this.expandable) {
      throw new Error('The `expandable` should be set true.');
    }
    return this._setRowExpanded(row, expanded, this.closeOthersOnExpand());
  }

  private _setRowExpanded(row: unknown, expanded: boolean, closeOthers = false): boolean {
    const key = this._rowKey(row);
    const keys = new Set(closeOthers && expanded ? [] : this._expandedKeys());
    if (expanded) {
      keys.add(key);
    } else {
      keys.delete(key);
    }
    this._expandedKeys.set(keys);
    this._changeDetectorRef.markForCheck();
    return expanded;
  }

  private _rowKey(row: any): unknown {
    const dataKey = this.dataKey();
    if (!dataKey || row == null) {
      return row;
    }
    return typeof dataKey === 'function' ? dataKey(row) : row[dataKey];
  }

  /** Drops expansion state of rows that are no longer in `data`. */
  private _pruneExpandedKeys(): void {
    const current = this._expandedKeys();
    if (current.size === 0) {
      return;
    }
    const present = new Set((this.data ?? []).map(row => this._rowKey(row)));
    this._expandedKeys.set(new Set([...current].filter(key => present.has(key))));
  }

  /** Scroll to top when turn to the next page. */
  _onPage(e: PageEvent) {
    if (this.pageOnFront) {
      this.scrollTop(0);
    }
    this.page.emit(e);
  }

  scrollTop(value?: number): number | void {
    if (value == null) {
      return this.tableContainer?.nativeElement.scrollTop;
    }
    if (this.tableContainer && !this.loading) {
      this.tableContainer.nativeElement.scrollTop = value;
    }
  }

  scrollLeft(value?: number): number | void {
    if (value == null) {
      return this.tableContainer?.nativeElement.scrollLeft;
    }
    if (this.tableContainer && !this.loading) {
      this.tableContainer.nativeElement.scrollLeft = value;
    }
  }

  _contextmenu(event: MouseEvent, rowData: Record<string, any>, index: number) {
    this.rowContextMenu.emit({ event, rowData, index });
  }
}

interface AcpDataGridGroupHeaderCell {
  id: string;
  colspan: number;
  isGroup: boolean;
  /**
   * Header of a column without group at this level: it spans the remaining header rows
   * (`rowspan`) and its cell in the column header row is hidden.
   */
  leafField?: string;
  rowspan?: number;
  header?: string | Observable<string>;
  className?: string;
  color?: string;
  pinned: AcpDataGridColumnPinValue;
}

interface AcpDataGridGroupHeaderRow {
  cells: AcpDataGridGroupHeaderCell[];
  columnIds: string[];
}

interface AcpDataGridGroupLevelValue {
  key: unknown;
  label: string | Observable<string>;
}
