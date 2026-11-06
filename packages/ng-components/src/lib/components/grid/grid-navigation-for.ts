import { Directive, booleanAttribute, effect, input } from '@angular/core';
import { DataGrid } from './grid';

/**
 * Lets a text input drive the rows of an `acp-data-grid` while keeping the focus in the input,
 * like an autocomplete: ArrowDown/ArrowUp move the active row, PageDown/PageUp change page and
 * Enter runs the row click (selection and `rowClick`) on the active row.
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
    '[attr.aria-controls]': 'grid().gridId',
    '[attr.aria-activedescendant]': 'grid()._activeRowId()',
    '(keydown)': '_onKeydown($event)',
  },
})
export class AcpGridNavigationFor {
  /** The grid controlled by this input. */
  readonly grid = input.required<DataGrid>({ alias: 'acpGridNavigationFor' });

  /** Whether the first row becomes active each time the grid data changes. */
  readonly acpGridNavigationActivateFirstRow = input(true, { transform: booleanAttribute });

  constructor() {
    effect(() => {
      this.grid()._activateFirstRowOnDataChange = this.acpGridNavigationActivateFirstRow();
    });
  }

  _onKeydown(event: KeyboardEvent): void {
    const grid = this.grid();
    if (!grid.keyboardNavigation() || event.altKey) {
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        grid.moveActiveRow(1);
        break;
      case 'ArrowUp':
        grid.moveActiveRow(-1);
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
}
