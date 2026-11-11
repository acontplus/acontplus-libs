---
ng-components: minor
---

AcpDataGrid: new optional `group` field on `DataGridColumn`. Consecutive visible columns that share the same `group` value (a `string` or the same `Observable` instance) are merged under a single group header cell that spans them, rendered as an extra sticky header row on top of the column headers. Works with dynamic columns (e.g. kardex pivots), column hiding from the column menu, pinned columns (a group sticks only when all its columns share the same `pinned` value) and `columnResizable` (a hidden sizing row keeps `table-layout: fixed` aligned after resizes). Grids without `group` values render exactly as before.
