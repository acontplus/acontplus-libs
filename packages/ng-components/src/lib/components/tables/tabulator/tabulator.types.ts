import type { CellComponent, ColumnDefinition } from 'tabulator-tables';

export type AcpTabulatorColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

export type AcpTabulatorLayout = 'fitData' | 'fitColumns' | 'fitDataFill' | 'fitDataStretch';

/** Row button of the actions column. `label` is the tooltip and the accessible name. */
export interface AcpTabulatorAction<T> {
  id: string;
  icon: string;
  label: string | ((row: T) => string);
  color?: AcpTabulatorColor | ((row: T) => AcpTabulatorColor);
  /** Rows without the action leave no gap (the column keeps the width of every action). */
  visible?: (row: T) => boolean;
}

export interface AcpTabulatorActionEvent<T> {
  action: string;
  /** The object of `data`, not Tabulator's copy */
  row: T;
}

/** Tabulator column whose `editable` receives the row instead of the cell. */
export type AcpTabulatorColumn<T> = Omit<ColumnDefinition, 'editable'> & {
  editable?: boolean | ((row: T) => boolean);
};

export interface AcpTabulatorCellEdit<T> {
  /** The object of `data` before the edit */
  row: T;
  field: string;
  value: unknown;
  oldValue: unknown;
  cell: CellComponent;
  /** Shows the row of `data` again: for a value the consumer rejects without changing `data`. */
  revert: () => void;
}

export interface AcpTabulatorEditorKeydown {
  event: KeyboardEvent;
  cell: CellComponent;
}

export interface AcpTabulatorListOption {
  label: string;
  value: string | number;
}
