import { AcpDataGridRowGroup } from './interfaces';

/** @internal Marker object rendered as a group header or group footer row. */
export interface AcpDataGridRowGroupItem<T = any> {
  readonly acpRowGroupRow: 'header' | 'footer';
  readonly group: AcpDataGridRowGroup<T>;
}

/** @internal */
export function isRowGroupItem(item: unknown): item is AcpDataGridRowGroupItem {
  return typeof item === 'object' && item !== null && 'acpRowGroupRow' in item;
}

/**
 * @internal Stable reorder that puts rows of the same group together. Groups follow `rank`
 * when given (keys missing from it go last), otherwise their first appearance in `rows`.
 * The order of rows inside each group is preserved.
 */
export function groupRowsContiguous<T>(
  rows: readonly T[],
  keyOf: (row: T) => unknown,
  rank?: ReadonlyMap<unknown, number>,
): T[] {
  const buckets = new Map<unknown, T[]>();
  for (const row of rows) {
    const key = keyOf(row);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(row);
    } else {
      buckets.set(key, [row]);
    }
  }
  const keys = [...buckets.keys()];
  if (rank) {
    const last = Number.MAX_SAFE_INTEGER;
    keys.sort((a, b) => (rank.get(a) ?? last) - (rank.get(b) ?? last));
  }
  return keys.flatMap(key => buckets.get(key) ?? []);
}

/** @internal Rows of each group, in the order they appear in `rows`. */
export function collectRowGroups<T>(
  rows: readonly T[],
  keyOf: (row: T) => unknown,
): Map<unknown, T[]> {
  const groups = new Map<unknown, T[]>();
  for (const row of rows) {
    const key = keyOf(row);
    const group = groups.get(key);
    if (group) {
      group.push(row);
    } else {
      groups.set(key, [row]);
    }
  }
  return groups;
}

/** @internal Reuses header/footer items by group key so the table keeps their row views. */
export class RowGroupItemCache<T = any> {
  private readonly _items = new Map<unknown, Partial<Record<'header' | 'footer', unknown>>>();

  get(
    kind: 'header' | 'footer',
    key: unknown,
    rows: T[],
    expanded: boolean,
  ): AcpDataGridRowGroupItem<T> {
    const entry = this._items.get(key) ?? {};
    const cached = entry[kind] as AcpDataGridRowGroupItem<T> | undefined;
    if (cached && cached.group.rows === rows && cached.group.expanded === expanded) {
      return cached;
    }
    const item: AcpDataGridRowGroupItem<T> = {
      acpRowGroupRow: kind,
      group: { key, rows, expanded },
    };
    entry[kind] = item;
    this._items.set(key, entry);
    return item;
  }
}

export interface RowGroupView<T> {
  /** Items to render: group headers, visible data rows and group footers. */
  items: (T | AcpDataGridRowGroupItem<T>)[];
  /** Data rows that are rendered (rows of collapsed groups are left out). */
  visibleRows: T[];
}

/**
 * @internal Builds the rows to render for one page. A group header is emitted wherever the group
 * changes (so a group split across pages repeats its header). A group footer is emitted after
 * the group's last row, only on the page that contains it.
 */
export function buildRowGroupView<T>(
  pageRows: readonly T[],
  options: {
    keyOf: (row: T) => unknown;
    groups: ReadonlyMap<unknown, T[]>;
    collapsed: ReadonlySet<unknown>;
    footer: boolean;
    cache: RowGroupItemCache<T>;
  },
): RowGroupView<T> {
  const { keyOf, groups, collapsed, footer, cache } = options;
  const items: (T | AcpDataGridRowGroupItem<T>)[] = [];
  const visibleRows: T[] = [];
  const keys = pageRows.map(keyOf);

  pageRows.forEach((row, i) => {
    const key = keys[i];
    const rows = groups.get(key) ?? [row];
    const expanded = !collapsed.has(key);
    if (i === 0 || !Object.is(keys[i - 1], key)) {
      items.push(cache.get('header', key, rows, expanded));
    }
    if (expanded) {
      items.push(row);
      visibleRows.push(row);
    }
    const lastOnPage = i === pageRows.length - 1 || !Object.is(keys[i + 1], key);
    if (footer && lastOnPage && rows[rows.length - 1] === row) {
      items.push(cache.get('footer', key, rows, expanded));
    }
  });

  return { items, visibleRows };
}

/** @internal A column whose consecutive equal cells are merged. */
export interface RowSpanColumn<T> {
  field: string;
  equals: (a: T, b: T) => boolean;
}

/**
 * @internal Computes `rowspan` values for merged columns. Returns, per row and field, `n > 1`
 * for the first cell of a merged block, `0` for the cells it covers; cells absent from the map
 * are regular cells. Blocks never cross a `isBreak` item (group headers/footers), and each
 * column only merges inside the blocks of the merged columns to its left (nested merging).
 */
export function computeRowSpans<T>(
  items: readonly unknown[],
  columns: readonly RowSpanColumn<T>[],
  isBreak: (item: unknown) => boolean,
): Map<T, Map<string, number>> {
  const spans = new Map<T, Map<string, number>>();
  if (!columns.length) {
    return spans;
  }

  // Runs of consecutive data rows between breaks.
  const runs: T[][] = [];
  let current: T[] = [];
  for (const item of items) {
    if (isBreak(item)) {
      if (current.length) {
        runs.push(current);
      }
      current = [];
    } else {
      current.push(item as T);
    }
  }
  if (current.length) {
    runs.push(current);
  }

  const set = (row: T, field: string, value: number) => {
    let byField = spans.get(row);
    if (!byField) {
      byField = new Map();
      spans.set(row, byField);
    }
    byField.set(field, value);
  };

  for (const rows of runs) {
    // Indexes where a block starts; a column cannot merge across a boundary of a column to its left.
    const boundaries = new Set<number>([0]);
    for (const { field, equals } of columns) {
      const starts: number[] = [];
      rows.forEach((row, i) => {
        if (boundaries.has(i) || !equals(rows[i - 1], row)) {
          starts.push(i);
        }
      });
      starts.forEach((start, s) => {
        const end = s + 1 < starts.length ? starts[s + 1] : rows.length;
        if (end - start > 1) {
          set(rows[start], field, end - start);
          for (let i = start + 1; i < end; i++) {
            set(rows[i], field, 0);
          }
        }
      });
      starts.forEach(start => boundaries.add(start));
    }
  }
  return spans;
}
