---
ng-components: major
ng-notifications: patch
---

**Breaking:** `ThemeSwitcher` is removed from `@acontplus/ng-components`. `ThemeToggle`
(`acp-theme-toggle`) now reads and changes the theme through `AcpLayoutSettings`, so it stays in
sync with `acp-layout` and `acp-customizer`: the mode is persisted with the layout options and
applied as `color-scheme` and `theme-dark` on `<html>` (no longer `dark-theme` /
`localStorage.theme`). From `auto` it switches to the opposite of the effective mode. Its default
labels are now Spanish (`Modo claro` / `Modo oscuro`). Migrate `ThemeSwitcher` calls to
`inject(AcpLayoutSettings)`: `isDark()` and `set({ theme: 'light' | 'dark' | 'auto' })`.

`acp-customizer` has a theme border radius slider (4-24px, as in MaterialPro). The value is the new
`radius` layout option (default `10`), persisted by `AcpLayoutSettings` and applied as
`--acp-skin-radius` on `<html>`, so it changes the acontpluspro corners of cards, menus, fields,
grids and dialogs. Fix: acontpluspro's `--mat-sys-corner-small` was overwritten by `mat.theme`
(8px), so `acp-card` and `acp-alert` ignored the skin radius.

`AcpDataGridColumn.editable` of `DataGrid` (`acp-data-grid`) also accepts a function
`(rowData) => boolean` that decides per row whether the cell can be edited. Rows for which it
returns `false` render as read-only cells (no edit on click, no `acp-grid-cell-editable` class).
`editable: true` keeps its current behavior.

The acontpluspro `border` and `field-border` colors are darker, so card borders (`acp-card-border`),
grid lines, dividers, dialogs and outlined inputs are easier to see. Button color tokens also apply
under `theme-dark`.

In `acp-vanilla-date-range-picker`, the days of the previous and next month and the week number
column (`W`) are faded so the current month stands out.

ng-notifications: the `auto` SweetAlert2 theme also detects the `theme-dark` class set by
`AcpLayoutSettings`.
