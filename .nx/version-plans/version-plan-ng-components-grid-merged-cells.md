---
ng-components: minor
---

Added merged cells (`rowspan`) to `DataGrid` (`acp-data-grid`).

- New `mergeRows` column option (`boolean` or `(previous, current) => boolean`) merges
  consecutive equal cells into one. Merging is nested: a column only merges inside the merged
  blocks of the merged columns to its left. Blocks are computed per rendered page and never cross
  row-group headers or footers.
- New `rowGroupMode="rowspan"`: keeps the rows of each `groupRowsBy` group together and merges
  that column.
- `mergeRows` is ignored when the grid is `expandable`.
- Opt-in: columns without `mergeRows` render as before.
