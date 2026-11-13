---
ng-components: minor
---

Added `groupColor` and `showGridlines` to `DataGrid` (`acp-data-grid`).

- New `groupColor` column option (CSS color or `(group, columns) => color`): the group header
  gets an accent border and the member columns a light tint (`--acp-grid-group-tint`), without
  `::ng-deep` or global CSS. Nested groups use their own level's color on headers and the
  innermost color on cells. `groupClass` is unchanged.
- New `showGridlines` input (and `DATA_GRID_DEFAULT_OPTIONS.showGridlines`): vertical borders
  between cells, colored with `--acp-grid-gridline-color`.
- Both are opt-in; grids without them render as before.
