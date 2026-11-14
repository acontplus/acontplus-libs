import {
  Directive,
  Injector,
  afterNextRender,
  booleanAttribute,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { DataGrid } from './grid';

/**
 * Lets a text input drive the rows of an `acp-data-grid` while keeping the focus in the input,
 * like an autocomplete: ArrowDown/ArrowUp move the active row (wrapping around within the page),
 * PageDown/PageUp change page and Enter runs the row click (selection and `rowClick`) on the
 * active row. It does not require `keyboardNavigation` on the grid. When the results change, the
 * grid goes back to the first page.
 *
 * The grid may be absent (`null`/`undefined`), for example while it lives in a closed overlay
 * (`cdkConnectedOverlay`, `ng-template`). Keys are then not handled and keep their default
 * behavior, so the host can use them to open the overlay.
 *
 * @example
 * ```html
 * <input matInput [acpGridNavigationFor]="grid" />
 * <acp-data-grid #grid [data]="results" [columns]="columns" (rowClick)="pick($event.rowData)" />
 * ```
 */
@Directive({
  selector: '[acpGridNavigationFor]',
  exportAs: 'acpGridNavigationFor',
  host: {
    '[attr.aria-controls]': 'grid()?.gridId ?? null',
    '[attr.aria-activedescendant]': 'grid()?._activeRowId() ?? null',
    '(keydown)': '_onKeydown($event)',
  },
})
export class AcpGridNavigationFor {
  private readonly _injector = inject(Injector);

  /** The grid controlled by this input, or `null`/`undefined` while it is not rendered. */
  readonly grid = input.required<DataGrid | null | undefined>({ alias: 'acpGridNavigationFor' });

  /** Whether the first row becomes active when the grid appears and each time its data changes. */
  readonly acpGridNavigationActivateFirstRow = input(true, { transform: booleanAttribute });

  constructor() {
    effect(() => {
      const grid = this.grid();
      const activateFirstRow = this.acpGridNavigationActivateFirstRow();
      if (!grid) {
        return;
      }
      grid._activateFirstRowOnDataChange = activateFirstRow;
      if (activateFirstRow) {
        untracked(() =>
          afterNextRender(
            () => {
              if (grid.activeRowIndex === -1) {
                grid.setActiveRow(0);
              }
            },
            { injector: this._injector },
          ),
        );
      }
    });
  }

  _onKeydown(event: KeyboardEvent): void {
    const grid = this.grid();
    if (!grid || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) {
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this._moveWrapping(grid, event.key === 'ArrowDown' ? 1 : -1);
        break;
      case 'PageDown':
        grid.nextPage();
        break;
      case 'PageUp':
        grid.previousPage();
        break;
      case 'Enter':
        if (!grid.activateActiveRow(event)) {
          return;
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  private _moveWrapping(grid: DataGrid, delta: 1 | -1): void {
    const count = grid.renderedRows.length;
    if (count === 0) {
      return;
    }
    const current = grid.activeRowIndex;
    const start = delta === 1 ? -1 : count;
    grid.setActiveRow(((current === -1 ? start : current) + delta + count) % count);
  }
}
