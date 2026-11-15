---
ng-components: minor
---

Added the `scrollHeight` input to `DataGrid` (`acp-data-grid`).

- A CSS length (`'400px'`, `'60vh'`) limits the height of the rows area; header and footer rows
  stay fixed while the rows scroll.
- `'flex'` makes the grid fill the height of its parent container.
- The `--acp-grid-scroll-height` CSS custom property sets the same limit from a stylesheet without
  `::ng-deep`, and `AcpDataGridDefaultOptions.scrollHeight` sets it globally.
- Opt-in: without `scrollHeight` the grid keeps its current behavior.

Renamed the public `DataGrid*` types to use the `Acp` prefix (`AcpDataGridColumn`,
`AcpDataGridDefaultOptions`, `AcpDataGridSize`, ...). The previous names remain exported as
deprecated aliases, so existing code keeps compiling.
