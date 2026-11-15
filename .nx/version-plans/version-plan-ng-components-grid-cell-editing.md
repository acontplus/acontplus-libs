---
ng-components: minor
---

Added inline cell editing to `DataGrid` (`acp-data-grid`).

- New `DataGridColumn` options: `editable`, `editValidator` and `editOptions`.
- New `cellEditChange` output emitted when an editable cell value is confirmed.
- Editable cells render with a pointer cursor. When `editValidator` rejects a
  value, the editor stays open, the returned error message is displayed under
  the field, and other cells cannot be edited until the value is fixed or the
  edit is cancelled with `Escape`.
