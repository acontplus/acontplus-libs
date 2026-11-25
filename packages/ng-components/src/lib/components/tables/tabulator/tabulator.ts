import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  NgZone,
  output,
  signal,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  Tabulator,
  type CellComponent,
  type ColumnDefinition,
  type Options,
  type RowComponent,
} from 'tabulator-tables';
import { registerAcpTabulatorModules } from './tabulator-modules';
import type {
  AcpTabulatorAction,
  AcpTabulatorActionEvent,
  AcpTabulatorCellEdit,
  AcpTabulatorColumn,
  AcpTabulatorEditorKeydown,
  AcpTabulatorLayout,
} from './tabulator.types';

registerAcpTabulatorModules();

const HEADER_HEIGHT = 42;
const ACTION_WIDTH = 30;
const ACTION_GAP = 4;
const ACTIONS_PADDING = 16;
const ROW_NUMBER_WIDTH = 50;
const EDIT_ATTEMPTS = 10;
const EDIT_RETRY_MS = 50;
const RENDER_TIMEOUT_MS = 100;

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Tabulator with the acontpluspro look, driven by signals:
 * - `data` is synced by `index`: edited rows update alone (an editor open in another row
 *   survives), added or removed rows replace the data. No `reactiveData`, no manual sync.
 * - `actions` builds the row buttons column, sized for every action.
 * - `readonly` drops editors and actions; `maxRows` grows the table up to N rows, then scrolls.
 * - `editCell(key, field)` opens an editor once the row exists (after a data change too).
 *
 * Requires `tabulator-tables/dist/css/tabulator.min.css` in the global styles.
 */
@Component({
  selector: 'acp-tabulator',
  template: '<div #host class="acp-tabulator__host"></div>',
  styleUrl: './tabulator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'acp-tabulator',
    '[class.acp-tabulator--readonly]': 'readonly()',
    '[class.acp-tabulator--tonal-actions]': 'actionsAppearance() === "tonal"',
  },
})
export class AcpTabulator<T extends object = Record<string, unknown>> {
  readonly data = input<readonly T[]>([]);
  readonly columns = input<readonly AcpTabulatorColumn<T>[]>([]);
  /** Field that identifies a row: the sync and `editCell` work by it */
  readonly index = input('id');
  readonly actions = input<readonly AcpTabulatorAction<T>[]>([]);
  readonly actionsPosition = input<'start' | 'end'>('start');
  readonly actionsAppearance = input<'filled' | 'tonal'>('filled');
  readonly readonly = input(false);
  /** Adds a row number column; a string is its title */
  readonly rowNumbers = input<boolean | string>(false);
  readonly sortable = input(false);
  readonly headerAlign = input<'left' | 'center' | 'right'>('left');
  readonly placeholder = input('');
  /** Field or function to group the rows by; `null` or an empty field ungroups */
  readonly groupBy = input<string | ((row: T) => unknown) | null>(null);
  /** Creation only */
  readonly layout = input<AcpTabulatorLayout>('fitColumns');
  /**
   * Creation only. Ignored when `maxRows` is set. Without both the table grows with every row and
   * never scrolls vertically (the page scrolls instead).
   */
  readonly height = input<string | number | false>(false);
  /** Creation only. Grows with the rows up to this many, then scrolls */
  readonly maxRows = input<number | null>(null);
  /** Creation only */
  readonly rowHeight = input(36);
  /** Creation only. Any other Tabulator option; wins over the inputs */
  readonly options = input<Options>({});

  readonly cellEdited = output<AcpTabulatorCellEdit<T>>();
  readonly action = output<AcpTabulatorActionEvent<T>>();
  readonly rowClick = output<T>();
  /** Keys typed while a cell editor is open (capture phase: can be prevented) */
  readonly editorKeydown = output<AcpTabulatorEditorKeydown>();
  /** The Tabulator instance, once built with the first data loaded */
  readonly ready = output<Tabulator>();

  readonly #editing = signal<CellComponent | null>(null);
  /** Cell with an open editor */
  readonly editing = this.#editing.asReadonly();

  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  readonly #injector = inject(Injector);
  /**
   * Tabulator works outside the zone: its listeners, timers and promises would run change
   * detection on every scroll or redraw, and with zone.js a `data` built in the template
   * (`lines().map(...)`) would loop: update, promise, change detection, new array, update...
   * Only the outputs come back in.
   */
  readonly #zone = inject(NgZone);
  #table: Tabulator | null = null;
  #built = false;
  #shown: readonly T[] = [];
  #appliedColumns: ColumnDefinition[] | null = null;
  #appliedGroupBy: string | ((row: T) => unknown) | null = null;
  #pending: Promise<unknown> = Promise.resolve();

  readonly #columns = computed<ColumnDefinition[]>(() => {
    const readonly = this.readonly();
    const columns = this.columns().map(column => this.#column(column, readonly));
    const rowNumbers = this.rowNumbers();
    if (rowNumbers) {
      columns.unshift({
        title: typeof rowNumbers === 'string' ? rowNumbers : '#',
        formatter: 'rownum',
        width: ROW_NUMBER_WIDTH,
        hozAlign: 'center',
        headerSort: false,
        resizable: false,
      });
    }
    const actions = this.actions();
    if (!readonly && actions.length) {
      const column = this.#actionsColumn(actions);
      if (this.actionsPosition() === 'start') columns.unshift(column);
      else columns.push(column);
    }
    const headerSort = this.sortable();
    const headerHozAlign = this.headerAlign();
    return columns.map(column => ({ headerSort, headerHozAlign, ...column }));
  });

  constructor() {
    afterNextRender(() => this.#create());
    effect(() => {
      const data = this.data();
      untracked(() => this.#sync(data));
    });
    effect(() => {
      const columns = this.#columns();
      untracked(() => this.#applyColumns(columns));
    });
    effect(() => {
      const groupBy = this.groupBy();
      untracked(() => this.#applyGroupBy(groupBy));
    });
    inject(DestroyRef).onDestroy(() => {
      this.#table?.destroy();
      this.#table = null;
    });
  }

  get instance(): Tabulator | null {
    return this.#table;
  }

  /**
   * Scrolls to the row and opens the editor of `field`. Waits for the render that hands a new
   * `data` to the table and for the table to draw it, so it can follow a data change directly.
   */
  async editCell(key: unknown, field: string): Promise<boolean> {
    await this.#nextRender();
    for (let attempt = 0; attempt < EDIT_ATTEMPTS; attempt++) {
      await this.#pending.catch(() => undefined);
      const row = this.#row(key);
      if (row) {
        // Virtual rendering: rows out of view have no cells until scrolled to
        await this.#outside(() => this.#table?.scrollToRow(row, 'nearest', false))?.catch(
          () => undefined,
        );
        const cell = row.getCell(field);
        if (!cell) return false;
        this.#outside(() => cell.edit(true));
        return true;
      }
      await wait(EDIT_RETRY_MS);
    }
    return false;
  }

  /** Draws the row of `data` again, dropping what the user typed in it */
  refreshRow(key: unknown): void {
    const table = this.#table;
    const source = this.#source(key);
    if (!table || !source || !this.#row(key)) return;
    this.#pending = this.#outside(() => table.updateData([{ ...source }]));
  }

  redraw(force = false): void {
    this.#outside(() => this.#table?.redraw(force));
  }

  #create(): void {
    const maxRows = this.maxRows();
    const rowHeight = this.rowHeight();
    const sizing: Options = maxRows
      ? {
          height: false,
          minHeight: HEADER_HEIGHT + rowHeight,
          maxHeight: HEADER_HEIGHT + rowHeight * maxRows,
        }
      : { height: this.height() };
    const columns = this.#columns();
    this.#appliedColumns = columns;
    this.#appliedGroupBy = this.groupBy();
    const table = this.#outside(
      () =>
        new Tabulator(this.host().nativeElement, {
          data: [],
          columns,
          index: this.index(),
          layout: this.layout(),
          rowHeight,
          placeholder: this.placeholder() || undefined,
          reactiveData: false,
          groupBy: this.#groupArg(this.groupBy()),
          // Virtual rendering needs a bounded height: without one every row is drawn
          renderVertical: maxRows || this.height() ? 'virtual' : 'basic',
          ...sizing,
          ...this.options(),
        }),
    );
    this.#table = table;

    table.on('tableBuilt', () => {
      this.#built = true;
      this.#applyColumns(this.#columns());
      this.#applyGroupBy(this.groupBy());
      this.#shown = [];
      this.#sync(this.data());
      // Built and loaded: the data APIs (getData, getRows...) answer from here on
      this.#inside(() => this.ready.emit(table));
    });
    table.on('cellEditing', cell => this.#editing.set(cell));
    table.on('cellEditCancelled', () => this.#editing.set(null));
    table.on('cellEdited', cell => {
      this.#editing.set(null);
      const key = (cell.getRow().getData() as Record<string, unknown>)[this.index()];
      const row = this.#source(key);
      if (!row) return;
      this.#inside(() =>
        this.cellEdited.emit({
          row,
          field: cell.getField(),
          value: cell.getValue(),
          oldValue: cell.getOldValue(),
          cell,
          revert: () => this.refreshRow(key),
        }),
      );
    });
    table.on('rowClick', (event, row) => {
      if ((event.target as HTMLElement | null)?.closest('[data-acp-action]')) return;
      const source = this.#source(row.getIndex());
      if (source) this.#inside(() => this.rowClick.emit(source));
    });
    this.#outside(() =>
      table.element.addEventListener(
        'keydown',
        event => {
          const cell = this.#editing();
          if (cell) this.#inside(() => this.editorKeydown.emit({ event, cell }));
        },
        true,
      ),
    );
  }

  /** Same rows in the same order: only the changed objects update. Otherwise a replace. */
  #sync(data: readonly T[]): void {
    const table = this.#table;
    if (!table || !this.#built) return;
    const shown = this.#shown;
    const sameRows =
      data.length === shown.length &&
      data.every((row, i) => this.#key(row) === this.#key(shown[i]));
    let operation: Promise<unknown> | undefined;
    if (sameRows) {
      const changed = data.filter((row, i) => row !== shown[i]);
      if (changed.length) {
        operation = this.#outside(() => table.updateData(changed.map(row => ({ ...row }))));
      }
    } else {
      operation = this.#outside(() => table.replaceData(data.map(row => ({ ...row }))));
    }
    // Updated now so quick consecutive syncs compare against the latest data. If the table rejects
    // the latest operation, the next sync replaces everything.
    this.#shown = data;
    if (operation) {
      this.#pending = operation;
      operation.catch(() => {
        if (this.#pending === operation) this.#shown = [];
      });
    }
  }

  #applyColumns(columns: ColumnDefinition[]): void {
    if (!this.#table || !this.#built || columns === this.#appliedColumns) return;
    this.#appliedColumns = columns;
    const table = this.#table;
    this.#outside(() => table.setColumns(columns));
  }

  #applyGroupBy(groupBy: string | ((row: T) => unknown) | null): void {
    if (!this.#table || !this.#built || groupBy === this.#appliedGroupBy) return;
    this.#appliedGroupBy = groupBy;
    // `false` ungroups (the typings leave it out)
    const table = this.#table;
    const arg = this.#groupArg(groupBy) ?? (false as unknown as string);
    this.#outside(() => table.setGroupBy(arg));
  }

  #groupArg(groupBy: string | ((row: T) => unknown) | null): Options['groupBy'] {
    if (!groupBy) return undefined;
    return typeof groupBy === 'string' ? groupBy : (data: unknown) => groupBy(data as T);
  }

  #column({ editable, ...column }: AcpTabulatorColumn<T>, readonly: boolean): ColumnDefinition {
    if (readonly) {
      const view: ColumnDefinition = { ...column };
      delete view.editor;
      delete view.editorParams;
      return view;
    }
    if (typeof editable !== 'function')
      return editable === undefined ? column : { ...column, editable };
    return { ...column, editable: cell => editable(cell.getRow().getData() as T) };
  }

  #actionsColumn(actions: readonly AcpTabulatorAction<T>[]): ColumnDefinition {
    const width =
      actions.length * ACTION_WIDTH + (actions.length - 1) * ACTION_GAP + ACTIONS_PADDING;
    return {
      title: '',
      width,
      minWidth: width,
      hozAlign: 'center',
      headerSort: false,
      cssClass: 'acp-tabulator__actions-cell',
      formatter: cell => this.#renderActions(cell.getRow().getData() as T, actions),
      cellClick: (event, cell) => {
        const id = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-acp-action]')
          ?.dataset['acpAction'];
        const row = this.#source(cell.getRow().getIndex());
        if (id && row) this.#inside(() => this.action.emit({ action: id, row }));
      },
    };
  }

  #renderActions(row: T, actions: readonly AcpTabulatorAction<T>[]): HTMLElement {
    const container = document.createElement('div');
    container.className = 'acp-tabulator__actions';
    for (const action of actions) {
      if (action.visible && !action.visible(row)) continue;
      const label = typeof action.label === 'function' ? action.label(row) : action.label;
      const color =
        (typeof action.color === 'function' ? action.color(row) : action.color) ?? 'neutral';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `acp-tabulator__action acp-tabulator__action--${color}`;
      button.dataset['acpAction'] = action.id;
      button.title = label;
      button.ariaLabel = label;
      const icon = document.createElement('span');
      icon.className = 'material-icons acp-tabulator__action-icon';
      icon.ariaHidden = 'true';
      icon.textContent = action.icon;
      button.append(icon);
      container.append(button);
    }
    return container;
  }

  #outside<R>(fn: () => R): R {
    return this.#zone.runOutsideAngular(fn);
  }

  #inside(fn: () => void): void {
    this.#zone.run(fn);
  }

  #key(row: T): unknown {
    return (row as Record<string, unknown>)[this.index()];
  }

  #source(key: unknown): T | undefined {
    return this.data().find(row => this.#key(row) === key);
  }

  /** Tabulator answers `false` for a missing row */
  #row(key: unknown): RowComponent | null {
    return (this.#table?.getRow(key as string) as RowComponent | false | undefined) || null;
  }

  /** The render that runs the data effect, or a timeout when nothing is pending */
  #nextRender(): Promise<void> {
    return new Promise(resolve => {
      const ref = afterNextRender(() => resolve(), { injector: this.#injector });
      setTimeout(() => {
        ref.destroy();
        resolve();
      }, RENDER_TIMEOUT_MS);
    });
  }
}
