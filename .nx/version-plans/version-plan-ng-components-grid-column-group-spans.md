---
ng-components: minor
---

Column groups in `DataGrid` (`acp-data-grid`) now render like PrimeNG column groups.

- The header of an ungrouped column (or of a column with fewer group levels) spans the remaining
  header rows (`rowspan`) instead of showing empty cells above it. Sorting, pinning and the
  selection checkbox keep working from that cell. Grids with `columnResizable` keep the previous
  layout, since the resize handles live on the column header row.
- New `summaryColspan` column option: the summary (footer) cell spans several columns (e.g. a
  `'Total'` label), in the grid footer and in row-group footers. The span stops where the
  pinning changes.
