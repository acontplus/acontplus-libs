---
ng-components: minor
---

`DataGrid` (`acp-data-grid`) now tracks the expanded state of each row by the row itself instead
of its position.

- Fixed: with `pageOnFront` or `sortOnFront`, expanding a row also showed the row at the same
  position on other pages, or a different row after sorting, as expanded.
- Fixed: changing an unrelated input (for example `loading`) no longer collapses every row; the
  state is only cleared for rows that leave `data`.
- New `dataKey` input (field name or function) keeps the expanded state across data reloads.
- New `isRowExpanded(row)` and `toggleRowExpansion(row, expanded?)` methods.
- `toggleExpansion(index)` and `expansionRowStates` are deprecated but keep working with the
  position in `data`.
- Internal: the cell, footer and expansion bodies are shared by both table variants (with and
  without column resize) instead of being duplicated.
