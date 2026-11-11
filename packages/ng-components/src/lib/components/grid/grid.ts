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
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { BehaviorSubject, isObservable, Observable, take } from 'rxjs';

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
import { SelectionModel } from '@angular/cdk/collections';

// Shared Imports

import { AcpToObservablePipe, AcpIsTemplateRefPipe } from '../../../core/pipes';
import { AcpGridSelectableCell } from './grid-selectable-cell';
import { DataGridUtils } from './grid-utils';
import { AcpGridCell } from './cell/cell';
import {
  DataGridButtonType,
  DataGridCellTemplate,
  DataGridColumn,
  DataGridColumnGroupDescriptor,
  DataGridColumnGroupItem,
  DataGridColumnGroupLevel,
  DataGridColumnPinOption,
  DataGridColumnPinValue,
  DataGridDefaultOptions,
  DataGridRowClassFormatter,
  DataGridRowSelectionFormatter,
  DataGridSize,
} from './interfaces';
import { AcpGridColClassPipe, AcpGridRowClassPipe } from './data-grid.pipes';
import { _animationsDisabled, ThemePalette } from '@angular/material/core';
import { ColumnResize } from '../column-resize';
import { AcpGridColumnMenu } from './column-menu/column-menu';
import { AcpGridExpansionToggle } from './grid-expansion-toggle';
import { MatColumnResize, MatResizable } from './column-resize';

export const DATA_GRID_DEFAULT_OPTIONS = new InjectionToken<DataGridDefaultOptions>(
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
    '[class.acp-grid-size-small]': '_size() === "small"',
    '[class.acp-grid-size-medium]': '_size() === "medium"',
    '[class.acp-grid-size-large]': '_size() === "large"',
    '[attr.tabindex]': 'keyboardNavigation() ? 0 : null',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGrid implements AfterViewInit, OnChanges {
  /** Densidad de la tabla. `'normal'` está obsoleto y equivale a `'medium'`. */
  size = input<DataGridSize | 'normal'>('medium');
  protected readonly _size = computed<DataGridSize>(() =>
    this.size() === 'normal' ? 'medium' : (this.size() as DataGridSize),
  );
  protected _animationsDisabled = _animationsDisabled();
  private readonly _utils = inject(DataGridUtils);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _injector = inject(Injector);
  private static _nextId = 0;
  /** Unique id of the grid, used for row ids and `aria-controls`. */
  readonly gridId = `acp-grid-${DataGrid._nextId++}`;
  private readonly _activeRow = signal<unknown>(null);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _columnsByField = new Map<string, DataGridColumn>();
  private readonly _resizedColumnWidths = new Map<string, number>();
  private readonly _groupClassByField = new Map<string, string>();
  /** @internal First emitted value of each tracked `Observable` group key, by instance. */
  private readonly _groupKeyValues = new Map<Observable<string>, string>();
  private readonly _trackedGroupKeyObservables = new Set<Observable<string>>();
  /** @internal Rows of column-group header cells, derived from `columns[].group`. */
  _groupHeaderRows: DataGridGroupHeaderRow[] = [];
  private _focusFirstRowOnRender = false;
  /** @internal Set by `acpGridNavigationFor` to activate the first row when data changes. */
  _activateFirstRowOnDataChange = false;
  private readonly _defaultOptions = inject<DataGridDefaultOptions>(DATA_GRID_DEFAULT_OPTIONS, {
    optional: true,
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
  @Input() columns: DataGridColumn[] = [];
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
  /** Event emitted when the user clicks the row. */
  rowClick = output<any>();
  /** Event emitted when the user attempts to open a context menu. */
  rowContextMenu = output<any>();

  // ===== Expandable Row =====

  expansionRowStates: any[] = [];

  /** Whether the row is expandable. */
  @Input({ transform: booleanAttribute }) expandable = false;
  /** The template for the expandable row. */
  @Input() expansionTemplate!: TemplateRef<any>;
  /** Event emitted when the user toggles the expandable row. */
  expansionChange = output<any>();
  closeOthersOnExpand = input(false);
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
  @Input() rowSelectionFormatter: DataGridRowSelectionFormatter = {};
  /** The formatter to set the row's class. */
  @Input() rowClassFormatter?: DataGridRowClassFormatter;
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
  columnChange = output<DataGridColumn[]>();
  /** The options for the column pin list. */
  @Input() columnPinOptions: DataGridColumnPinOption[] =
    this._defaultOptions?.columnPinOptions ?? [];

  /** Whether to show the column menu button. */
  @Input({ transform: booleanAttribute })
  showColumnMenuButton = this._defaultOptions?.showColumnMenuButton ?? true;
  /** The text for the column menu button. */
  @Input() columnMenuButtonText = this._defaultOptions?.columnMenuButtonText ?? '';
  /** The type for the column menu button. */
  @Input() columnMenuButtonType: DataGridButtonType =
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
  @Input() headerTemplate!: TemplateRef<any> | DataGridCellTemplate;
  /** The header's cell template for the grid exclude sort. */
  @Input() headerExtraTemplate!: TemplateRef<any> | DataGridCellTemplate;
  /** The cell template for the grid. */
  @Input() cellTemplate!: TemplateRef<any> | DataGridCellTemplate;

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
  @Input() summaryTemplate!: TemplateRef<any> | DataGridCellTemplate;

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

  _getColData(data: any[], colDef: DataGridColumn) {
    return this._utils.getColData(data, colDef);
  }

  _isColumnHide(item: DataGridColumn) {
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

    // We should copy each item of data for expansion data
    if (this.expandable) {
      this.expansionRowStates = []; // reset

      this.data?.forEach(_ => {
        this.expansionRowStates.push({ expanded: false });
      });
    }

    if (this.rowSelectable) {
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
  _groupClassFor(col: DataGridColumn): string | undefined {
    return this._groupClassByField.get(col.field);
  }

  /** Rebuilds the column-group header rows from the currently visible columns. */
  private _updateGroupHeaderCells(): void {
    this._columnsByField.clear();
    this._groupClassByField.clear();
    this.columns.forEach(col => this._columnsByField.set(col.field, col));

    const displayed = this.displayedColumns;
    const paths = displayed.map(field => this._groupPathFor(this._columnsByField.get(field)));
    const maxDepth = paths.reduce((max, path) => Math.max(max, path.length), 0);

    const rows: DataGridGroupHeaderRow[] = [];
    for (let level = 0; level < maxDepth; level++) {
      const cells: DataGridGroupHeaderCell[] = [];
      const columnIds: string[] = [];

      for (let i = 0; i < displayed.length;) {
        const field = displayed[i];
        const path = paths[i];
        const col = this._columnsByField.get(field);

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
        const members: DataGridColumn[] = [col!];
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

        const id = `__acpGridGroup_${level}_${field}`;
        cells.push({
          id,
          colspan: end - i,
          isGroup: true,
          header,
          className,
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
  private _groupPathFor(col?: DataGridColumn): DataGridGroupLevelValue[] {
    const group = col?.group;
    if (group == null) {
      return [];
    }
    const levels: DataGridColumnGroupItem[] = Array.isArray(group) ? group : [group];
    return levels.map(item => {
      const descriptor = this._asGroupDescriptor(item);
      const keySource = descriptor ? descriptor.key : (item as DataGridColumnGroupLevel);
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
  private _resolveGroupLevel(level: DataGridColumnGroupLevel): string | Observable<string> {
    return typeof level === 'function' ? level(this.data) : level;
  }

  /** Returns the item as a `{ key, label }` descriptor, or `undefined` for plain levels. */
  private _asGroupDescriptor(
    item: DataGridColumnGroupItem,
  ): DataGridColumnGroupDescriptor | undefined {
    return typeof item === 'object' && item !== null && 'key' in item
      ? (item as DataGridColumnGroupDescriptor)
      : undefined;
  }

  /** Whether two group paths share the same group keys up to and including `level`. */
  private _sameGroupPrefix(
    a: DataGridGroupLevelValue[],
    b: DataGridGroupLevelValue[],
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

  /** Goes to the next page, if there is one, and activates its first row. */
  nextPage(focus = false): void {
    this._changePage(1, focus);
  }

  /** Goes to the previous page, if there is one, and activates its first row. */
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
    if (!this.showPaginator || !paginator) {
      return;
    }
    const canMove = delta === 1 ? paginator.hasNextPage() : paginator.hasPreviousPage();
    if (!canMove) {
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
    column: DataGridColumn,
    index: number,
  ) {
    const currentStates = structuredClone(this.expansionRowStates);

    if (this.closeOthersOnExpand()) {
      currentStates.forEach(item => (item.expanded = false));
    }
    if (currentStates[index]) {
      currentStates[index].expanded = expansionRef.opened;
      this.expansionRowStates = currentStates;
    }
    this.expansionChange.emit({ expanded: expansionRef.opened, data: rowData, index, column });
  }

  /** Cell select event */
  _selectCell(
    cellRef: AcpGridSelectableCell,
    rowData: Record<string, any>,
    colDef: DataGridColumn,
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
    const numRows = this.dataSource.data.filter(
      (row, index) => !this.rowSelectionFormatter.disabled?.(row, index),
    ).length;
    return numSelected === numRows;
  }

  /** Select all rows if they are not all selected; otherwise clear selection. */
  _toggleMasterCheckbox() {
    if (this._isAllSelected()) {
      this.rowSelection.clear();
    } else {
      this.dataSource.data.forEach((row, index) => {
        if (!this.rowSelectionFormatter.disabled?.(row, index)) {
          this.rowSelection.select(row);
        }
      });
    }
    this.rowSelectedChange.emit(this.rowSelection.selected);
  }

  /** Select normal row */
  _toggleNormalCheckbox(row: Record<string, any>) {
    this.rowSelection.toggle(row);
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
  _onColumnChange(columns: DataGridColumn[]) {
    this.columnChange.emit(columns);

    this.displayedColumns = Object.assign([], this.getDisplayedColumnFields(columns));

    if (this.rowSelectable && !this.hideRowSelectionCheckbox) {
      this.displayedColumns.unshift('acpGridCheckboxColumnDef');
    }

    this._updateGroupHeaderCells();
  }

  getDisplayedColumnFields(columns: DataGridColumn[]): string[] {
    const fields = columns
      .filter(item => (this.columnHideableChecked === 'show' ? item.show : !item.hide))
      .map(item => item.field);
    return fields;
  }

  /** Customize expansion event */
  toggleExpansion(index: number) {
    if (!this.expandable) {
      throw new Error('The `expandable` should be set true.');
    }
    this.expansionRowStates[index].expanded = !this.expansionRowStates[index].expanded;
    return this.expansionRowStates[index].expanded;
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

interface DataGridGroupHeaderCell {
  id: string;
  colspan: number;
  isGroup: boolean;
  header?: string | Observable<string>;
  className?: string;
  pinned: DataGridColumnPinValue;
}

interface DataGridGroupHeaderRow {
  cells: DataGridGroupHeaderCell[];
  columnIds: string[];
}

interface DataGridGroupLevelValue {
  key: unknown;
  label: string | Observable<string>;
}
