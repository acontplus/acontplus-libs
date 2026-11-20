import type { CellComponent, Editor, Formatter } from 'tabulator-tables';
import type { AcpTabulatorColumn, AcpTabulatorListOption } from './tabulator.types';

type ColumnOptions<T> = Omit<AcpTabulatorColumn<T>, 'editor' | 'editorParams' | 'formatter'>;

export interface AcpNumberEditorOptions {
  min?: number;
  max?: number;
  decimals?: number;
  /** Strictly greater than 0 */
  positive?: boolean;
  selectOnFocus?: boolean;
}

export interface AcpTextEditorOptions {
  maxLength?: number;
  /** Applied before confirming. Default: `acpSanitizeText` */
  sanitize?: (value: string) => string;
}

const CONTROL_KEYS = new Set([
  'Backspace',
  'Delete',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
]);

const rowOf = <T>(cell: CellComponent) => cell.getRow().getData() as T;

/** Drops line breaks, tabs and zero-width characters and collapses spaces. */
export const acpSanitizeText = (value: string): string =>
  value
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const editorInput = (value: unknown): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'acp-tabulator-editor';
  input.value = value === null || value === undefined ? '' : String(value);
  return input;
};

/** Enter confirms, Escape cancels, blur confirms (Tab included). */
const bindEditor = (
  input: HTMLInputElement,
  confirm: () => void,
  cancel: () => void,
  onKey?: (event: KeyboardEvent) => void,
): void => {
  let done = false;
  const once = (fn: () => void) => () => {
    if (done) return;
    done = true;
    fn();
  };
  const ok = once(confirm);
  const ko = once(cancel);
  input.addEventListener('blur', ok);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      ok();
    } else if (event.key === 'Escape') {
      event.stopPropagation();
      ko();
    } else onKey?.(event);
  });
};

/** Text input that sanitizes the value before confirming. */
export function acpTextEditor({
  maxLength,
  sanitize = acpSanitizeText,
}: AcpTextEditorOptions = {}): Editor {
  return (cell, onRendered, success, cancel) => {
    const input = editorInput(cell.getValue());
    if (maxLength) input.maxLength = maxLength;
    onRendered(() => {
      input.focus();
      input.select();
    });
    bindEditor(
      input,
      () => success(sanitize(input.value)),
      () => cancel(cell.getValue()),
    );
    return input;
  };
}

/**
 * Numeric input: only digits, one decimal separator (dot or comma) and the minus sign when `min`
 * allows negatives. An empty or out of range value cancels the edit.
 */
export function acpNumberEditor({
  min,
  max,
  decimals = 2,
  positive = false,
  selectOnFocus = true,
}: AcpNumberEditorOptions = {}): Editor {
  const negatives = !positive && (min === undefined || min < 0);
  const parse = (raw: string): number | undefined => {
    const value = Number(raw.replace(',', '.'));
    if (raw.trim() === '' || !Number.isFinite(value)) return undefined;
    const rounded = Number(value.toFixed(decimals));
    if (positive && rounded <= 0) return undefined;
    if (min !== undefined && rounded < min) return undefined;
    if (max !== undefined && rounded > max) return undefined;
    return rounded;
  };

  return (cell, onRendered, success, cancel) => {
    const input = editorInput(cell.getValue());
    input.inputMode = 'decimal';
    onRendered(() => {
      input.focus();
      if (selectOnFocus) input.select();
    });
    bindEditor(
      input,
      () => {
        const value = parse(input.value);
        if (value === undefined) cancel(cell.getValue());
        else success(value);
      },
      () => cancel(cell.getValue()),
      event => {
        if (CONTROL_KEYS.has(event.key) || event.ctrlKey || event.metaKey) return;
        const separator = event.key === '.' || event.key === ',';
        const allowed =
          /^\d$/.test(event.key) ||
          (separator && decimals > 0 && !/[.,]/.test(input.value)) ||
          (event.key === '-' &&
            negatives &&
            input.selectionStart === 0 &&
            !input.value.includes('-'));
        if (!allowed) event.preventDefault();
      },
    );
    return input;
  };
}

/** Fixed decimals; the full value shows on hover. */
export function acpMoneyFormatter(decimals = 2): Formatter {
  return cell => {
    const value = Number(cell.getValue() ?? 0);
    if (!Number.isFinite(value)) return '';
    const span = document.createElement('span');
    span.className = 'acp-tabulator-number';
    span.textContent = value.toFixed(decimals);
    span.title = value.toFixed(decimals + 3);
    return span;
  };
}

const listCell = (label: string): HTMLElement => {
  const container = document.createElement('span');
  container.className = 'acp-tabulator-list';
  const text = document.createElement('span');
  text.className = 'acp-tabulator-list__label';
  text.textContent = label;
  const arrow = document.createElement('span');
  arrow.className = 'material-icons acp-tabulator-list__arrow';
  arrow.ariaHidden = 'true';
  arrow.textContent = 'arrow_drop_down';
  container.append(text, arrow);
  return container;
};

/**
 * Column factories over the acontplus editors. Each returns a plain column: spread or override
 * any Tabulator option.
 */
export const AcpColumns = {
  text<T>({
    editor,
    ...column
  }: ColumnOptions<T> & { editor?: AcpTextEditorOptions | false }): AcpTabulatorColumn<T> {
    return editor === false || editor === undefined
      ? column
      : { ...column, editor: acpTextEditor(editor) };
  },

  number<T>({
    editor,
    ...column
  }: ColumnOptions<T> & { editor?: AcpNumberEditorOptions | false }): AcpTabulatorColumn<T> {
    return {
      hozAlign: 'right',
      cssClass: 'acp-tabulator-number',
      ...column,
      ...(editor === false || editor === undefined ? {} : { editor: acpNumberEditor(editor) }),
    };
  },

  money<T>({
    decimals = 2,
    editor,
    ...column
  }: ColumnOptions<T> & {
    decimals?: number;
    editor?: AcpNumberEditorOptions | false;
  }): AcpTabulatorColumn<T> {
    return {
      hozAlign: 'right',
      ...column,
      formatter: acpMoneyFormatter(decimals),
      ...(editor === false || editor === undefined
        ? {}
        : { editor: acpNumberEditor({ decimals, ...editor }) }),
    };
  },

  /** Dropdown with the options of each row; the cell shows the label, never HTML. */
  list<T>({
    options,
    emptyText = 'Sin opciones',
    ...column
  }: ColumnOptions<T> & {
    options: (row: T) => AcpTabulatorListOption[];
    emptyText?: string;
  }): AcpTabulatorColumn<T> {
    const labelOf = (cell: CellComponent) =>
      options(rowOf<T>(cell)).find(option => option.value === cell.getValue())?.label ?? '';
    return {
      ...column,
      editor: 'list',
      editorParams: (cell: CellComponent) => ({
        values: options(rowOf<T>(cell)),
        placeholderEmpty: emptyText,
        verticalNavigation: 'hybrid',
      }),
      formatter: cell => listCell(labelOf(cell)),
    };
  },
};
