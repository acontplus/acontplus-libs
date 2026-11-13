---
ng-components: minor
---

Added row groups to `DataGrid` (`acp-data-grid`).

- `rowGroupMode="subheader"` with `groupRowsBy` (field or function) renders a header row before
  each group. Rows of a group stay together; groups keep the order of `data` unless sorted by the
  grouping field, and sorting by another column sorts rows inside each group.
- `expandableRowGroups`, `collapsedRowGroups` (two-way binding), `rowGroupToggle`,
  `isRowGroupExpanded(key)` and `toggleRowGroup(key, expanded?)` collapse and expand groups.
- `showRowGroupFooter` renders per-group subtotals with each column's `summary`.
  `summaryTemplate` now also receives `group` in its context.
- `rowGroupHeaderTemplate` customizes the header content (`AcpDataGridRowGroupContext`).
- New theme tokens: `grid-table-row-group-header-background-color` and
  `grid-table-row-group-footer-background-color`.
- Opt-in: grids without `rowGroupMode` render as before.

`summary` improvements (backward compatible):

- `summary(values, colDef, rows)` now also receives the summarized rows (all rows in the grid
  footer, the group rows in a row-group footer), so computed columns can total other fields.
- Fixed the `summary` type: its first argument is the column values (`any[]`), not the rows, so
  functions such as `(values: number[]) => ...` now type-check.
- The per-column `summaryTemplate` context now also includes `data` (the summarized rows).

Docs: `keyboardNavigation` is opt-in (default `false` since 6.0.0); README and examples said it
was on by default.
