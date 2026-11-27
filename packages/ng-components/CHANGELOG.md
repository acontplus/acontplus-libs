## 10.1.0 (2026-11-27)

### 🚀 Features

- Add `acp-side-panel-layout` (`AcpSidePanelLayout`): a page section with a list of options on the ([#161](https://github.com/acontplus/acontplus-libs/pull/161))
  side and the content of the selected one, in the MaterialPro apps style. Inputs `title`, `items`
  (`AcpSidePanelItem`: `id`, `label`, `icon`, `description`, `disabled`, `badge`), `[(selected)]`,
  `panelWidth`, `compactQuery`, `position` (`start` / `end`), `showHeading`, `labels`, `toggleable`
  and `[(panelOpened)]`. Below `compactQuery` (default 992px) the panel floats over the content and
  opens with the menu button; with `toggleable` that button also hides and shows the panel on wide
  screens. Slots `acpSidePanelActions`, `acpSidePanelHeader` and `acpSidePanelFooter`, custom items
  with `<ng-template acpSidePanelItem>`, app-wide defaults with `provideAcpSidePanelDefaults` and
  styling through `--acp-side-panel-*` (acontpluspro sets border, radius, active item and badge from
  the theme).

  `acp-customizer`: returning from the top navigation to the side one no longer leaves a collapsed and
  closed sidenav without a toggle to open it. The customizer keeps the sidenav state it had on load
  and sends it back with every change.

  The package now declares `"sideEffects": false`, so bundlers keep each component in the chunk that
  uses it instead of the initial bundle.

### ❤️ Thank You

- Claude Opus 5.5
- Emilio Senguana @senguanasoft
- emiliosw-dev

# 10.0.0 (2026-11-25)

### 🩹 Fixes

- `AcpTabulator`: if Tabulator rejects the latest data update, the next `data` change replaces all ([#160](https://github.com/acontplus/acontplus-libs/pull/160))
  rows instead of applying incremental updates against rows the table never received.

- `AcpDialogService` footer `actions` now close the dialog with `action.result` (or `action.key`), as ([#160](https://github.com/acontplus/acontplus-libs/pull/160))
  documented. Clicks were only emitted on `clickedResult`, so the dialog stayed open. Call
  `event.preventDefault()` in a `clickedResult` subscriber to keep it open; a subscriber that closes
  the dialog itself keeps its own result.

### ⚠️ Breaking Changes

- Add form control options to the layout: `fieldAppearance` (`outline` / `fill`) and `controlSize` ([#160](https://github.com/acontplus/acontplus-libs/pull/160))
  (`small` / `medium` / `large`: fields 40 / 48 / 56px, select options 33 / 40 / 48px and menu items
  36 / 42 / 48px), editable from `acp-customizer` and persisted by
  `AcpLayoutSettings`. New exports: `AcpFieldAppearance`, `AcpControlSize` and `ACP_CONTROL_SIZES`.

  `provideAcpLayout` now provides `MAT_FORM_FIELD_DEFAULT_OPTIONS` with `fieldAppearance` through the
  new `acpFieldDefaults` helper (fields already on screen switch live), and
  `AcpLayoutSettings` sets `acp-control-<size>` on `<html>`. acontpluspro maps those classes to the
  Material form field density tokens and to `--acp-control-option-height` /
  `--acp-control-menu-item-height` (`$acontpluspro-control-sizes`); the classes also work on a
  container or a single `mat-form-field`. Unlike Material's density, `fill` fields keep the floating
  label at every size (smaller and higher, `--acp-control-fill-label-transform`). Menu item icons
  now follow `--mat-menu-item-icon-size` for their font size too (they were cut at 18px). The selected `mat-option` keeps its color on hover, focus and when it is
  the active option (Material dropped it, leaving only the near-white acontpluspro hover), and option, menu item and expansion panel header hover is tinted with the theme color
  (`$acontpluspro-hover-tint`, 12%). `mat-autocomplete` panels get the same padding, rounded options
  and control-size height as `mat-select`.

  Add M3 color classes (`.acp-text-red-50`, `.acp-bg-blue-90`, `.acp-border-...`), included by
  acontpluspro; `acp.color-utilities('')` emits the unprefixed legacy names.
  The sidemenu badge also gets the `acp-bg-<color>` class. Add `.acp-form-field-full` (alias
  `.form-field-full`) for full-width form fields.

  Breaking: with `provideAcpLayout`, fields without an explicit `appearance` are now `outline` and
  40px high (`small`, Material density -4, as the Acontplus apps), instead of Material's `fill` and 56px. To keep the previous look:

  ```ts
  provideAcpLayout({ defaults: { fieldAppearance: 'fill', controlSize: 'large' } });
  ```

  To use other `MAT_FORM_FIELD_DEFAULT_OPTIONS`, provide them after `provideAcpLayout` with
  `acpFieldDefaults(appearance, options)`.

### ❤️ Thank You

- Emilio Senguana @senguanasoft
- emiliosw-dev

## 9.2.0 (2026-11-20)

### 🚀 Features

- Add `AcpTabulator` (`acp-tabulator`), a signal-driven Tabulator table: `data` synced by `index` ([#159](https://github.com/acontplus/acontplus-libs/pull/159))
  (edited rows update alone, so an editor open in another row survives), declarative row `actions`
  (theme colors, `filled` or `tonal`, automatic width), `readonly`, `rowNumbers`, `maxRows`,
  `groupBy`, `editCell(key, field)`, and `cellEdited` with `revert()`. Tabulator runs outside the
  Angular zone. Column helpers `AcpColumns.text/number/money/list` with `acpTextEditor`,
  `acpNumberEditor` and `acpMoneyFormatter`. acontpluspro skin for the table, popups, group rows,
  frozen columns and actions.

  `acp-tabulator-table` and `acp-tabulator` share `registerAcpTabulatorModules`, which now also
  registers ResizeColumns, ResizeTable, Filter, FrozenColumns, FrozenRows, GroupRows, Keybindings,
  Menu, Mutator and Accessor: resizable columns, header filters, grouping, frozen columns and keyboard
  navigation work without extra setup. Heavy modules are opt-in with
  `provideAcpTabulator({ modules })`.

  `TabulatorTable` (`acp-tabulator-table`) is marked legacy and `@deprecated` in favor of
  `AcpTabulator`; it keeps working for existing screens.

### ❤️ Thank You

- Emilio Senguana @senguanasoft
- emiliosw-dev

## 9.1.0 (2026-11-18)

### 🚀 Features

- Add RadioCard component (`AcpRadioCardGroup` + `AcpRadioCard`) with group-based single selection, 4 sizes, theme colors, tonal mode, background presets with dark mode support, and adaptive border radius. ([#158](https://github.com/acontplus/acontplus-libs/pull/158))

### ❤️ Thank You

- Emilio Senguana @senguanasoft
- emiliosw-dev

# 9.0.0 (2026-11-16)

### 🚀 Features

- New `AcpLogo` (`acp-logo`): app logo loaded from an image URL, set per instance with `src` or ([#157](https://github.com/acontplus/acontplus-libs/pull/157))
  app-wide with `provideAcpLogo({ src, label })`, so replacing the logo does not need a new library
  release. SVG files are inlined (scripts and event handlers removed) so `currentColor` and
  `var(--acp-logo-color)` fills follow the theme; other formats render as `<img>`. Without an image, or when it fails to load, it shows the name as text (`label`,
  `provideAcpLogo` or `provideAcpLayout({ branding: { name } })`). Size it with
  `height` (default `44px`).

- `provideAcpLayout({ branding })` (and the `acp-branding` inputs) can show the logo and the name, ([#157](https://github.com/acontplus/acontplus-libs/pull/157))
  only the logo or only the name with `display: 'logo-name' | 'logo' | 'name'`, and choose the logo
  shape with `logoShape`: `'circle'` (default, the `2rem` round logo as before) or `'rectangle'`
  (`2rem` high, up to `10rem` wide, keeps the aspect ratio and shrinks to fit the sidebar or the
  header). `--acp-branding-logo-height` and `--acp-branding-logo-max-width` change the rectangle size.
  The name is cut with an ellipsis instead of overflowing, and the link takes the app name as
  accessible name.

  The collapse slide toggle of `acp-layout` is hidden on the collapsed rail, which shows only the
  logo, and appears when the rail expands on hover (or with keyboard focus) so it can be turned off.

  On the collapsed rail `acp-user-panel` keeps its avatar at half size and hides only the title,
  subtitle and details (as ng-matero); the hover restores it. In acontpluspro the panel
  background is now the skin `background` (was `surface-muted`), so it stands out from the sidebar. The expanded side menu item
  also takes that background (was transparent), as in ng-matero.

### ⚠️ Breaking Changes

- **Breaking:** `ThemeSwitcher` is removed from `@acontplus/ng-components`. `ThemeToggle` ([#157](https://github.com/acontplus/acontplus-libs/pull/157))
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

### ❤️ Thank You

- Claude Opus 5.5
- Emilio Senguana @senguanasoft
- emiliosw-dev

# 8.0.0 (2026-11-15)

### 🚀 Features

- Centralized the prebuilt color themes. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - One map (`$prebuilt-themes` in `core/theming/prebuilt/_themes.scss`) holds the palette and
    brand color of every theme; each `prebuilt-themes/<name>` file is generated from it with the
    same CSS output as before.
  - New `@acontplus/ng-components/prebuilt-themes/all` entry loads the 8 themes at once.
  - New Sass API: `prebuilt-theme($name)`, `prebuilt-all-themes()` and `$prebuilt-themes`.

- Added shared design tokens (inspired by MaterialPro) in `core/tokens/_acp-system.scss`. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - Single source for `--acp-sys-surface-raised`, `--acp-sys-shadow-1`, `--acp-sys-shadow-2`,
    `--acp-sys-heading-*`, `--acp-sys-easing-standard` and the layout sizes (`$layout`,
    `acp-system-layout()`), emitted only by acontpluspro.
  - Components read them with Material fallbacks, so the prebuilt themes alone keep the Material
    look (Roboto, M3 elevations and corners). The prebuilt themes provide colors only.

- Added `AcpFileUpload` (`acp-file-upload`), a file picker and uploader similar to PrimeNG's ([#156](https://github.com/acontplus/acontplus-libs/pull/156))
  FileUpload.

  - `advanced` mode with toolbar, drag-and-drop zone, image previews and progress; `basic` mode with
    a single button; `auto` upload.
  - Uploads with `HttpClient` (`multipart/form-data`) to `url`, with `beforeUpload`,
    `uploadProgress`, `uploadSuccess` and `uploadError`; or `customUpload` with `uploadHandler` and
    `completeUpload()`.
  - Validation of `accept`, `maxFileSize` and `fileLimit` with configurable Spanish messages.
  - Works with `ngModel` and reactive forms (value: `File[]` or `null`).
  - `#file`, `#empty` and `#toolbar` templates.

- Added inline cell editing to `DataGrid` (`acp-data-grid`). ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - New `DataGridColumn` options: `editable`, `editValidator` and `editOptions`.
  - New `cellEditChange` output emitted when an editable cell value is confirmed.
  - Editable cells render with a pointer cursor. When `editValidator` rejects a
    value, the editor stays open, the returned error message is displayed under
    the field, and other cells cannot be edited until the value is fixed or the
    edit is cancelled with `Escape`.

- Column groups in `DataGrid` (`acp-data-grid`) now render like PrimeNG column groups. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - The header of an ungrouped column (or of a column with fewer group levels) spans the remaining
    header rows (`rowspan`) instead of showing empty cells above it. Sorting, pinning and the
    selection checkbox keep working from that cell. Grids with `columnResizable` keep the previous
    layout, since the resize handles live on the column header row.
  - New `summaryColspan` column option: the summary (footer) cell spans several columns (e.g. a
    `'Total'` label), in the grid footer and in row-group footers. The span stops where the
    pinning changes.

- Added `groupColor` and `showGridlines` to `DataGrid` (`acp-data-grid`). ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - New `groupColor` column option (CSS color or `(group, columns) => color`): the group header
    gets an accent border and the member columns a light tint (`--acp-grid-group-tint`), without
    `::ng-deep` or global CSS. Nested groups use their own level's color on headers and the
    innermost color on cells. `groupClass` is unchanged.
  - New `showGridlines` input (and `DATA_GRID_DEFAULT_OPTIONS.showGridlines`): vertical borders
    between cells, colored with `--acp-grid-gridline-color`.
  - Both are opt-in; grids without them render as before.

- Added merged cells (`rowspan`) to `DataGrid` (`acp-data-grid`). ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - New `mergeRows` column option (`boolean` or `(previous, current) => boolean`) merges
    consecutive equal cells into one. Merging is nested: a column only merges inside the merged
    blocks of the merged columns to its left. Blocks are computed per rendered page and never cross
    row-group headers or footers.
  - New `rowGroupMode="rowspan"`: keeps the rows of each `groupRowsBy` group together and merges
    that column.
  - `mergeRows` is ignored when the grid is `expandable`.
  - Opt-in: columns without `mergeRows` render as before.

- `DataGrid` (`acp-data-grid`) now tracks the expanded state of each row by the row itself instead ([#156](https://github.com/acontplus/acontplus-libs/pull/156))
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

- Added row groups to `DataGrid` (`acp-data-grid`). ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

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

- Added the `scrollHeight` input to `DataGrid` (`acp-data-grid`). ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - A CSS length (`'400px'`, `'60vh'`) limits the height of the rows area; header and footer rows
    stay fixed while the rows scroll.
  - `'flex'` makes the grid fill the height of its parent container.
  - The `--acp-grid-scroll-height` CSS custom property sets the same limit from a stylesheet without
    `::ng-deep`, and `AcpDataGridDefaultOptions.scrollHeight` sets it globally.
  - Opt-in: without `scrollHeight` the grid keeps its current behavior.

  Renamed the public `DataGrid*` types to use the `Acp` prefix (`AcpDataGridColumn`,
  `AcpDataGridDefaultOptions`, `AcpDataGridSize`, ...). The previous names remain exported as
  deprecated aliases, so existing code keeps compiling.

- Added tree mode to `DataGrid` (`acp-data-grid`), similar to PrimeNG's TreeTable. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - `treeChildren` (field or function) renders nested rows; `data` holds the root nodes.
    The `treeToggle` column option chooses the column with the indentation and toggle.
  - Expanded state in `expandedTreeKeys` (two-way binding), with `isTreeNodeExpanded`,
    `toggleTreeNode`, `expandAll`, `collapseAll` and the `treeNodeExpand`/`treeNodeCollapse` outputs.
  - Paging counts root nodes; sorting sorts siblings on each level.
  - Multiple selection propagates to descendants and ancestors, with indeterminate parents
    (`treePropagateSelection`).
  - Lazy loading with `treeHasChildren`, a loading spinner and `refreshTree()`.
  - `role="treegrid"`, `aria-level`, `aria-expanded`, and ←/→ keys with `keyboardNavigation`.

  Fixed: the row selection is no longer reset when an unrelated input changes (for example
  `loading`); it is rebuilt only when `rowSelected`, `rowSelectable`, `multiSelectable` or `data`
  change.

- Added `acontpluspro`, the global look inspired by MaterialPro: ([#156](https://github.com/acontplus/acontplus-libs/pull/156))
  `@use '@acontplus/ng-components/acontpluspro';` after the prebuilt themes.

  - Typography (Poppins, 14px body, 400-weight buttons), elevations (`--mat-sys-level1/2` as soft
    shadows), 10px corners, borders and white surfaces on a blue-gray background, applied through
    tokens to Material components (card, dialog, menu, select, autocomplete, datepicker, form field,
    expansion, table, paginator, sidenav, list, FAB, tooltip, button toggle) and to acontplus
    components (card, grid, KPI card, popover, drawer, dialog, side menu, top menu, sidebar header,
    user panel). The top menu becomes a white bar with pill items aligned with the header to the
    boxed width.
  - Compact menus and select options: menu items 36px high with 13px text, 12px sides and 18px icons
    (Material menu tokens), menu panels 160-320px wide, select options 33px high with ~14px text.
    The panels of the acontplus widgets keep their own sizes.
  - Configurable with `acontpluspro-apply($overrides)` and `$acontpluspro-palette`; exposes
    `--acp-skin-*` variables and the `acp-card-border`, `acp-boxed` and `acp-page-boxed` classes.
  - Removed `global-variables` (`@acontplus/ng-components/global-variables` and its `_index`
    forward): acontpluspro is the single global style layer and emits every variable it defined
    (layout sizes, body, code, link, header, top menu, side menu, user panel). Remove the
    `@use '@acontplus/ng-components/global-variables'` import. Layout components read the sizes
    with defaults from `acp-system.$layout` (`acp-system-layout()`), and colors with Material
    fallbacks, so they work without acontpluspro. Dropped the unused `--acp-topmenu-background-color`
    and the toolbar height overrides (they equal Material's defaults).
  - Text scale from MaterialPro: `--acp-sys-text-<xs|sm|base|lg|xl|2xl|3xl>-size` / `-line-height`
    and `--acp-sys-font-weight-<normal|medium|semibold|bold>`, with the `.acp-text-*` and
    `.acp-font-*` utility classes (`acontpluspro-utilities($prefix)` generates them with another
    prefix, e.g. `''` for Tailwind names).

### 🩹 Fixes

- Fixed `AcpVanillaDateRangePicker` leaving its dropdown in the page after the component is destroyed ([#156](https://github.com/acontplus/acontplus-libs/pull/156))
  (closing a dialog or leaving the page showed the ranges list at the bottom of the page).

  - The component now removes the picker on destroy. The picker container is appended to `<body>`,
    outside the component, and its styles are removed with the component.
  - `DateRangePicker.remove()` now detaches the container from the DOM (it only dropped the
    reference) and removes the window `resize` listener (it added it again).

- Fixed `acpGridNavigationFor` keyboard navigation from a search input. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - It no longer requires `keyboardNavigation` on the grid; the directive alone enables it.
  - ArrowDown/ArrowUp wrap around within the page (last row to first and vice versa).
  - PageDown on the last page activates the last row; PageUp on the first page activates the first
    row (also with the grid's own keyboard navigation).
  - When the results change, the grid goes back to the first page.
  - Ignores keys with Ctrl/Meta and during IME composition.
  - Accepts a grid that is not rendered yet (`null`/`undefined`), so the grid can live in an overlay
    `ng-template` for an autocomplete; the first row becomes active when the grid appears.

### ⚠️ Breaking Changes

- Rebuilt `AcpBadge` on native elements with the MaterialPro look and a consistent API. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - Renders a `<span>`, a native `<a>` (`routerLink` / `href`) or a native `<button>`
    (`clickable`) instead of `mat-chip`. Fixes `removed` being emitted twice, the remove click also
    emitting `clicked`, `href` not navigating and the ignored accessible name.
  - Look: `tonal` (15% tint, pill, 500 weight) is the new default variant; text sizes follow the
    theme typescale.
  - Renamed `danger` to `error`, `ariaLabelOverride` to `ariaLabel`; sizes are now `xs-small`,
    `small`, `medium` and `large`; removed the `soft` variant (use `tonal`), the `highlighted` input
    (use `selected`) and the `none` trend (leave `trend` unset).
  - `trend` no longer adds arrow characters to the value; it announces the change to screen readers
    and supports `lowerIsBetter`. `selected` only sets `aria-pressed` when bound. `clicked` emits a
    `MouseEvent`.
  - Slots are typed directives (`ACP_BADGE_SLOTS`: `acpBadgeIcon`, `acpBadgeTrailingIcon`) instead
    of `#icon` / `#trailingIcon` template references.
  - New `ACP_BADGE_DEFAULT_OPTIONS` / `provideAcpBadgeDefaults()` for app-wide defaults and screen
    reader labels. `ACP_BADGE_*` value lists now define the types (`as const`).
  - Theme tokens use `<color>-bg` / `-fg` / `-accent`; `TREND_CONFIGS` and `AcpBadgeTrendConfig` are
    no longer exported.

- Redesigned `AcpKpiCard` (MaterialPro look) and cleaned up its API. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - Look: `variant="default"` is a raised surface with a soft shadow, a dark value and the icon in a
    15% tinted tile of `color`; `elevated`, `outlined` (neutral border) and `tonal` (15% tint) sit on
    a surface; `filled` is the solid `color` container. Text sizes follow the theme typescale,
    corners use `corner-small` and the delta badge is a light tinted pill.
  - Renamed `percentage` / `percentageFormat` to `delta` / `deltaFormat`.
  - Sizes are now `xs-small`, `small`, `medium` and `large` (same scale as `acp-data-grid`).
  - Removed the `success-light`, `warning-light`, `error-light`, `info-light` and `surface` colors:
    use `variant="tonal"` with the base color, or the default variant.
  - `routerLink` renders a native link and `clickable` a native button stretched over the card, so
    keyboard activation, Ctrl+click and screen readers work; the menu and footer stay clickable.
    `selected` only sets `aria-pressed` when bound.
  - Title is plain text by default; `headingLevel` renders it as a heading.
  - Slots are now typed directives (`ACP_KPI_CARD_SLOTS`: `acpKpiCardIcon`, `acpKpiCardAvatar`,
    `acpKpiCardFooter`, `acpKpiCardActions`) instead of `#icon`-style template references.
  - New `ACP_KPI_CARD_DEFAULT_OPTIONS` / `provideAcpKpiCardDefaults()` for app-wide defaults and
    screen reader labels (`increase`, `decrease`, `noChange`, `moreOptions`).
  - Theme tokens use `-fg` for content colors (`<color>-fg`, `delta-*-fg`); `KPI_CARD_TREND_CONFIGS`
    and `inferKpiTrend` are no longer exported.

- Redesigned `AcpCard` (MaterialPro look) and cleaned up its API. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - Look: elevated and outlined cards use the raised surface (white in light mode) and the soft
    `--acp-sys-*` shadows; title uses the heading scale and subtitle 14px; `padding` is 16, 24
    (default) or 30px and is shared by header, content, actions and footer; the footer has a top
    divider; hoverable and interactive cards lift 2px.
  - Removed the `elevation` and `rounded` inputs (and their `AcpCardConfig` keys and the
    `AcpCardElevation` type): shape and shadows come from the theme. Override a single card with
    `--acp-card-shape` / `--acp-card-elevation`.
  - Removed the `disabled-bg` color and the `[key: string]: any` index signature of
    `AcpCardPassThroughSection`.
  - Removed the legacy `#title`-style template references; use the `ACP_CARD_SLOTS` directives.
    `acpCardHeader` now replaces the avatar/title/subtitle group instead of rendering next to it.
  - `clickable` renders a native button and the new `routerLink` input a native link stretched
    over the card, so keyboard activation, Ctrl+click and screen readers work and actions stay
    clickable. The host no longer gets `role="button"`, `role="article"` or `tabindex`. `clicked`
    emits a `MouseEvent`.
  - New `headingLevel` input renders the title as a heading.
  - New styling hooks: `--acp-card-hover-elevation` and `--acp-card-gap`.

- Removed `DateRangePicker` and its `ngx-datex` dependency. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - Deleted the `date-range-picker` component (`DateRangePicker`,
    `DateRangePickerOptions`, `DateRangeValue`) and its re-exports of
    `ngx-datex` symbols (`NgxDatex`, `SPANISH_LOCALE`, `MATERIAL_LIGHT_THEME`
    and related types).
  - Removed the `ngx-datex` and `@formkit/tempo` peer dependencies.
  - Apps that need date-range selection should use `AcpDateRangeInput`
    (`date-range-input`) instead.

- Replaced the shell components with `acp-layout`, the admin layout of acontplus-frontend. ([#156](https://github.com/acontplus/acontplus-libs/pull/156))

  - New `acp-layout`: header, collapsible sidebar with `acp-sidemenu`, `acp-topmenu` (`navPos:
'top'`) and the page. Handles mobile (overlay sidenav closed after navigating), the collapsed
    rail, header positions (`fixed`, `static`, `above`) and scrolling to the top. Apps project their
    widgets with the `acpHeaderStart`, `acpHeaderEnd`, `acpSidebarUser` and `acpSidebarFooter`
    attributes and the page as default content.
  - New `AcpLayoutSettings` (signals, persisted in `localStorage`) and `provideAcpLayout({ defaults,
storageKey, branding, mobileQuery, fullscreenButton })`. It applies `color-scheme`,
    `theme-dark`, `theme-<color>`, `dir`, `acp-card-border` and `acp-boxed` on `<html>`.
  - New `acp-customizer`: draggable settings button with a drawer to edit the layout options
    (Spanish labels by default, `[labels]` to override).
  - New header and sidebar widgets from acontplus-frontend: `acp-apps-button` (`AcpAppShortcut`),
    `acp-notifications-button` (`AcpNotificationItem`, pulsing dot, Spanish labels by default) and
    `acp-user-panel` (`AcpUserPanel`, replaces `UserPanel`: inputs `title`, `subtitle`, `avatar`,
    `link` and `details` instead of `name`, `email` and `profileLink`; avatar and link are
    optional).
  - Rebuilt the user menu as `AcpUserMenu` (replaces `UserMenu`) with the acontplus-frontend profile
    menu: avatar or initials, header with name, role chip, subtitle and caption, and plain items.
    `AcpUserMenuUser` (`name`, `subtitle`, `caption`, `role`, `avatar`) replaces `UserProfile`
    (`email` and `plan`); `AcpUserMenuItem` takes `route` instead of `routerLink`, items without
    route emit the new `selected` output instead of a `click` callback, and `badge` was removed.
    `UserMenuSelectedEvent` was removed.
  - New `AcpMenuItem`, `buildMenuRoute`, `menuPath` and `isMenuItemActive`.
  - Removed `AcpShellLayout` and its slot directives, the `AcpSidebar*` components and the
    `AcpHeader*` components (`AcpHeaderActions`, `AcpHeaderNotifications`, `AcpHeaderWorkspace`,
    `AcpHeaderLanguage`, `AcpHeaderTheme`...). Use `acp-layout` with projected widgets.
  - Renamed `SidemenuComponent` to `AcpSidemenu` (input `menuItems` → `items`), `Branding` to
    `AcpBranding`, and the accordion directives to `AcpNavAccordion`, `AcpNavAccordionItem` and
    `AcpNavAccordionToggle`. Removed `MenuItem`, `MenuTag`, `MenuPermissions` and the
    `AcpTopmenu*Item` types (use `AcpMenuItem`) and the `buildRoute` input of `acp-topmenu`.
  - `acp-sidemenu` and `acp-topmenu` no longer filter by `permissions` (they imported
    `ngx-permissions`, which was not a declared dependency); filter the items before passing them.
    The top menu marks a dropdown as active from the current URL instead of the `active` signal.
  - CSS classes: `acp-layout*`, `acp-layout-header`, `acp-layout-sidebar__*` and
    `acp-topmenu-panel` replace `acontplus-container*`, `acontplus-header`, `acontplus-sidenav`,
    `acontplus-sidebar-*`, `acontplus-page-content` and `acontplus-topmenu-panel`; acontpluspro
    targets the new classes.
  - Docs: `AcpDrawerConfig.panelClass` goes on the overlay pane (`.cdk-overlay-pane`), not on the
    drawer container; the comment said otherwise.

### ❤️ Thank You

- Claude Opus 5.5
- Emilio Senguana @senguanasoft
- emiliosw-dev

# 7.0.0 (2026-11-11)

### 🚀 Features

- AcpDataGrid: new optional `group` field on `DataGridColumn`. Consecutive visible columns that share the same `group` value (a `string` or the same `Observable` instance) are merged under a single group header cell that spans them, rendered as an extra sticky header row on top of the column headers. Works with dynamic columns (e.g. kardex pivots), column hiding from the column menu, pinned columns (a group sticks only when all its columns share the same `pinned` value) and `columnResizable` (a hidden sizing row keeps `table-layout: fixed` aligned after resizes). Grids without `group` values render exactly as before. ([#155](https://github.com/acontplus/acontplus-libs/pull/155))

### 🩹 Fixes

- Cleaned dialog styles and updated declarative example. ([#155](https://github.com/acontplus/acontplus-libs/pull/155))

### ⚠️ Breaking Changes

- Reworked `AcpCard` props: `title`/`subtitle` inputs, `color`, `hoverable`, `loading`, `actionsAlign`, `clicked` output with keyboard support, typed slot directives (`acpCardTitle`, `acpCardActions`, ...) and `provideAcpCardDefaults()`. `appearance`, `elevation`, `imageRatio` and `padding="none"` now take effect. ([#155](https://github.com/acontplus/acontplus-libs/pull/155))

  Reworked `AcpKpiCard`: locale-aware `Intl.NumberFormat` formatting (`valueFormat`, `locale`, `prefix`, `suffix`), trend inferred from `percentage`, sentiment-colored delta badge with `lowerIsBetter`, `trendLabel` and optional trend icon (`showTrendIcon`), `align` (`start` | `center` | `end`), working `size` variants, readable `outlined`/`tonal` variants, keyboard support for `clickable`, and a value of `0` is now displayed.

  Added `AcpSearchSelect` (`acp-search-select`): searchable select on `mat-autocomplete` with groups, accent-insensitive search, forms support with error state, clear button and server-side search.

  `ng-customer` now uses `AcpCard` in the customer form, so section titles render.

  BREAKING CHANGE: removed `DynamicCard` (`acp-dynamic-card`); use `AcpCard`. `AcpCard`: removed `backgroundColor` (use `color`), `hover` (use `hoverable`) and `outlined` (use `appearance="outlined"`) inputs; removed the `default`, `interactive` and `compact` appearances; removed the `AcpCardBadge` and `AcpCardBackgroundColor` types; `AcpCardConfig` no longer accepts per-instance state. `AcpKpiCard`: removed `href` and the `actionClicked` output (both unused), the `white` color (use `surface`), `KPI_CARD_TOKENS`, `AcpKpiCardLayout`, `formatValue` and the `color` field of `AcpKpiCardTrendConfig`; the header icon is no longer replaced by the trend icon; the `kpi-card-container-height` and `kpi-card-container-elevation` theme tokens were removed.

- AcpDataGrid: implement `small`, `medium` and `large` sizes (`medium` is the new default; `normal` is deprecated and maps to `medium`), translate the default column menu button text to Spanish, and fix `currency` columns rendering a `null` prefix when `typeParameter.display` is not set. ([#155](https://github.com/acontplus/acontplus-libs/pull/155))

  Context menu fixes: selections and close events are emitted only by the instance that opened the menu (previously every `acpContextMenu`/`acp-contextmenu` on the page emitted), `acp-contextmenu` now opens on right-click of its `target`, keyboard navigation skips separators and disabled items, `closeOnEscape: false` and `closeOnOutsideClick: false` are respected, `contextMenuClosed`/`hide` fire however the menu closes, `AcpContextMenuRef.updateItems`/`updateData` now update the open panel, and right-clicking outside an open menu opens the menu of the element underneath. `AcpContextMenuService` adds `itemSelectedFor$()`, `closedFor$()` and an optional `owner` argument to `open()`.

  AcpDataGrid keyboard navigation (PrimeNG-style): `keyboardNavigation` is now implemented and on by default. Rows use a roving tabindex (one Tab stop) and support arrows, Home/End, PageUp/PageDown, Enter (row click), Space (toggle selection) and Ctrl+A (select all). `highlightedRowIndex` and `focusedRowChange` now work. New `acpGridNavigationFor` directive lets a search input drive the grid rows while keeping the focus. New public grid members: `gridId`, `renderedRows`, `activeRow`, `activeRowIndex`, `setActiveRow()`, `moveActiveRow()`, `activateActiveRow()`, `nextPage()`, `previousPage()`. `KeyboardNavigationService` and `FocusableElement` were removed.

  AcpAlert rework: new `variant` (`soft`, `outlined`, `filled`), `heading`, per-type `icon` (`showIcon` to hide it), `[acpAlertActions]` slot, `closeLabel` (default `Cerrar`), and `close()`/`open()`/`isOpen()`. The close button now hides the alert. Colors were reworked to match `acp-badge` (warning is now orange) and to stay subtle in both light and dark themes; soft text uses the theme text color and every combination meets WCAG AA. `role` is `alert` for warnings and errors and `status` otherwise. Inputs are now signal inputs and the built-in `margin-bottom` was removed.

  AcpBadge colors: semantic colors (`success`, `warning`, `danger`, `info`) are softened in dark mode, like `acp-alert`, instead of the saturated Material tone 80. `tonal` text is darkened in light mode and `neutral` uses `on-surface-variant` as text outside `filled`, so every color and variant now meets WCAG AA contrast (previously `tonal` was 4.2:1 and `soft`/`text` neutral 1.1:1).

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft
- emiliosw-dev
- Ivan Fernando Paz @iferpaz7

# 6.0.0 (2026-11-11)

### 🚀 Features

- AcpDataGrid: new optional `group` field on `DataGridColumn`. Consecutive visible columns that share the same `group` value (a `string` or the same `Observable` instance) are merged under a single group header cell that spans them, rendered as an extra sticky header row on top of the column headers. Works with dynamic columns (e.g. kardex pivots), column hiding from the column menu, pinned columns (a group sticks only when all its columns share the same `pinned` value) and `columnResizable` (a hidden sizing row keeps `table-layout: fixed` aligned after resizes). Grids without `group` values render exactly as before. ([#154](https://github.com/acontplus/acontplus-libs/pull/154))

### 🩹 Fixes

- Cleaned dialog styles and updated declarative example. ([#154](https://github.com/acontplus/acontplus-libs/pull/154))

### ⚠️ Breaking Changes

- Reworked `AcpCard` props: `title`/`subtitle` inputs, `color`, `hoverable`, `loading`, `actionsAlign`, `clicked` output with keyboard support, typed slot directives (`acpCardTitle`, `acpCardActions`, ...) and `provideAcpCardDefaults()`. `appearance`, `elevation`, `imageRatio` and `padding="none"` now take effect. ([#154](https://github.com/acontplus/acontplus-libs/pull/154))

  Reworked `AcpKpiCard`: locale-aware `Intl.NumberFormat` formatting (`valueFormat`, `locale`, `prefix`, `suffix`), trend inferred from `percentage`, sentiment-colored delta badge with `lowerIsBetter`, `trendLabel` and optional trend icon (`showTrendIcon`), `align` (`start` | `center` | `end`), working `size` variants, readable `outlined`/`tonal` variants, keyboard support for `clickable`, and a value of `0` is now displayed.

  Added `AcpSearchSelect` (`acp-search-select`): searchable select on `mat-autocomplete` with groups, accent-insensitive search, forms support with error state, clear button and server-side search.

  `ng-customer` now uses `AcpCard` in the customer form, so section titles render.

  BREAKING CHANGE: removed `DynamicCard` (`acp-dynamic-card`); use `AcpCard`. `AcpCard`: removed `backgroundColor` (use `color`), `hover` (use `hoverable`) and `outlined` (use `appearance="outlined"`) inputs; removed the `default`, `interactive` and `compact` appearances; removed the `AcpCardBadge` and `AcpCardBackgroundColor` types; `AcpCardConfig` no longer accepts per-instance state. `AcpKpiCard`: removed `href` and the `actionClicked` output (both unused), the `white` color (use `surface`), `KPI_CARD_TOKENS`, `AcpKpiCardLayout`, `formatValue` and the `color` field of `AcpKpiCardTrendConfig`; the header icon is no longer replaced by the trend icon; the `kpi-card-container-height` and `kpi-card-container-elevation` theme tokens were removed.

- AcpDataGrid: implement `small`, `medium` and `large` sizes (`medium` is the new default; `normal` is deprecated and maps to `medium`), translate the default column menu button text to Spanish, and fix `currency` columns rendering a `null` prefix when `typeParameter.display` is not set. ([#154](https://github.com/acontplus/acontplus-libs/pull/154))

  Context menu fixes: selections and close events are emitted only by the instance that opened the menu (previously every `acpContextMenu`/`acp-contextmenu` on the page emitted), `acp-contextmenu` now opens on right-click of its `target`, keyboard navigation skips separators and disabled items, `closeOnEscape: false` and `closeOnOutsideClick: false` are respected, `contextMenuClosed`/`hide` fire however the menu closes, `AcpContextMenuRef.updateItems`/`updateData` now update the open panel, and right-clicking outside an open menu opens the menu of the element underneath. `AcpContextMenuService` adds `itemSelectedFor$()`, `closedFor$()` and an optional `owner` argument to `open()`.

  AcpDataGrid keyboard navigation (PrimeNG-style): `keyboardNavigation` is now implemented and on by default. Rows use a roving tabindex (one Tab stop) and support arrows, Home/End, PageUp/PageDown, Enter (row click), Space (toggle selection) and Ctrl+A (select all). `highlightedRowIndex` and `focusedRowChange` now work. New `acpGridNavigationFor` directive lets a search input drive the grid rows while keeping the focus. New public grid members: `gridId`, `renderedRows`, `activeRow`, `activeRowIndex`, `setActiveRow()`, `moveActiveRow()`, `activateActiveRow()`, `nextPage()`, `previousPage()`. `KeyboardNavigationService` and `FocusableElement` were removed.

  AcpAlert rework: new `variant` (`soft`, `outlined`, `filled`), `heading`, per-type `icon` (`showIcon` to hide it), `[acpAlertActions]` slot, `closeLabel` (default `Cerrar`), and `close()`/`open()`/`isOpen()`. The close button now hides the alert. Colors were reworked to match `acp-badge` (warning is now orange) and to stay subtle in both light and dark themes; soft text uses the theme text color and every combination meets WCAG AA. `role` is `alert` for warnings and errors and `status` otherwise. Inputs are now signal inputs and the built-in `margin-bottom` was removed.

  AcpBadge colors: semantic colors (`success`, `warning`, `danger`, `info`) are softened in dark mode, like `acp-alert`, instead of the saturated Material tone 80. `tonal` text is darkened in light mode and `neutral` uses `on-surface-variant` as text outside `filled`, so every color and variant now meets WCAG AA contrast (previously `tonal` was 4.2:1 and `soft`/`text` neutral 1.1:1).

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft
- emiliosw-dev
- Ivan Fernando Paz @iferpaz7

# 5.0.0 (2026-11-06)

### ⚠️ Breaking Changes

- AcpDataGrid: implement `small`, `medium` and `large` sizes (`medium` is the new default; `normal` is deprecated and maps to `medium`), translate the default column menu button text to Spanish, and fix `currency` columns rendering a `null` prefix when `typeParameter.display` is not set. ([#151](https://github.com/acontplus/acontplus-libs/pull/151))

  Context menu fixes: selections and close events are emitted only by the instance that opened the menu (previously every `acpContextMenu`/`acp-contextmenu` on the page emitted), `acp-contextmenu` now opens on right-click of its `target`, keyboard navigation skips separators and disabled items, `closeOnEscape: false` and `closeOnOutsideClick: false` are respected, `contextMenuClosed`/`hide` fire however the menu closes, `AcpContextMenuRef.updateItems`/`updateData` now update the open panel, and right-clicking outside an open menu opens the menu of the element underneath. `AcpContextMenuService` adds `itemSelectedFor$()`, `closedFor$()` and an optional `owner` argument to `open()`.

  AcpDataGrid keyboard navigation (PrimeNG-style): `keyboardNavigation` is now implemented and on by default. Rows use a roving tabindex (one Tab stop) and support arrows, Home/End, PageUp/PageDown, Enter (row click), Space (toggle selection) and Ctrl+A (select all). `highlightedRowIndex` and `focusedRowChange` now work. New `acpGridNavigationFor` directive lets a search input drive the grid rows while keeping the focus. New public grid members: `gridId`, `renderedRows`, `activeRow`, `activeRowIndex`, `setActiveRow()`, `moveActiveRow()`, `activateActiveRow()`, `nextPage()`, `previousPage()`. `KeyboardNavigationService` and `FocusableElement` were removed.

  AcpAlert rework: new `variant` (`soft`, `outlined`, `filled`), `heading`, per-type `icon` (`showIcon` to hide it), `[acpAlertActions]` slot, `closeLabel` (default `Cerrar`), and `close()`/`open()`/`isOpen()`. The close button now hides the alert. Colors were reworked to match `acp-badge` (warning is now orange) and to stay subtle in both light and dark themes; soft text uses the theme text color and every combination meets WCAG AA. `role` is `alert` for warnings and errors and `status` otherwise. Inputs are now signal inputs and the built-in `margin-bottom` was removed.

  AcpBadge colors: semantic colors (`success`, `warning`, `danger`, `info`) are softened in dark mode, like `acp-alert`, instead of the saturated Material tone 80. `tonal` text is darkened in light mode and `neutral` uses `on-surface-variant` as text outside `filled`, so every color and variant now meets WCAG AA contrast (previously `tonal` was 4.2:1 and `soft`/`text` neutral 1.1:1).

### ❤️ Thank You

- Emilio Senguana @senguanasoft
- emiliosw-dev

# 4.0.0 (2026-11-05)

### 🩹 Fixes

- Cleaned dialog styles and updated declarative example. ([#150](https://github.com/acontplus/acontplus-libs/pull/150))

### ⚠️ Breaking Changes

- Reworked `AcpCard` props: `title`/`subtitle` inputs, `color`, `hoverable`, `loading`, `actionsAlign`, `clicked` output with keyboard support, typed slot directives (`acpCardTitle`, `acpCardActions`, ...) and `provideAcpCardDefaults()`. `appearance`, `elevation`, `imageRatio` and `padding="none"` now take effect. ([#150](https://github.com/acontplus/acontplus-libs/pull/150))

  Reworked `AcpKpiCard`: locale-aware `Intl.NumberFormat` formatting (`valueFormat`, `locale`, `prefix`, `suffix`), trend inferred from `percentage`, sentiment-colored delta badge with `lowerIsBetter`, `trendLabel` and optional trend icon (`showTrendIcon`), `align` (`start` | `center` | `end`), working `size` variants, readable `outlined`/`tonal` variants, keyboard support for `clickable`, and a value of `0` is now displayed.

  Added `AcpSearchSelect` (`acp-search-select`): searchable select on `mat-autocomplete` with groups, accent-insensitive search, forms support with error state, clear button and server-side search.

  `ng-customer` now uses `AcpCard` in the customer form, so section titles render.

  BREAKING CHANGE: removed `DynamicCard` (`acp-dynamic-card`); use `AcpCard`. `AcpCard`: removed `backgroundColor` (use `color`), `hover` (use `hoverable`) and `outlined` (use `appearance="outlined"`) inputs; removed the `default`, `interactive` and `compact` appearances; removed the `AcpCardBadge` and `AcpCardBackgroundColor` types; `AcpCardConfig` no longer accepts per-instance state. `AcpKpiCard`: removed `href` and the `actionClicked` output (both unused), the `white` color (use `surface`), `KPI_CARD_TOKENS`, `AcpKpiCardLayout`, `formatValue` and the `color` field of `AcpKpiCardTrendConfig`; the header icon is no longer replaced by the trend icon; the `kpi-card-container-height` and `kpi-card-container-elevation` theme tokens were removed.

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft
- emiliosw-dev

## 3.2.1 (2026-09-25)

### 🩹 Fixes

- Cleaned dialog styles and updated declarative example. ([#149](https://github.com/acontplus/acontplus-libs/pull/149))

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft
- emiliosw-dev

## 3.2.0 (2026-09-11)

### 🚀 Features

- Fix dialog configuration handling in `AdvancedDialogService` and `DialogWrapper`: preserve the ([#148](https://github.com/acontplus/acontplus-libs/pull/148))
  `full-screen-dialog` panel class when using `size: 'full'` or mobile full-screen, honor the
  `minHeight`, `restoreFocus`, and `escapeKeyClosable` options (Escape and backdrop click can now be
  configured independently), support signal inputs when passing `data` to wrapped content components,
  and add the `closeAriaLabel` option for accessible close-button labels.

- Introduce `AcpDialogService` (formerly `AcpDialog`), a reusable, strongly-typed ([#148](https://github.com/acontplus/acontplus-libs/pull/148))
  dialog service built on Angular Material. Add `AcpDialog`, `AcpDialogContent`,
  `AcpDialogTitlebar` and `AcpDialogActions` as declarative layout components.
  Includes `AcpDialogContainer`, `AcpDialogRef`, `ACP_DIALOG_DATA` and
  `provideAcpDialogDefaults`. Supports reactive `disabled`/`loading` action
  states (boolean, `Signal` or `Observable`), a shared action-click stream between
  caller and content, configurable and declarative header/footer components,
  content `bindings`, and sizing, focus and close behavior.

  **BREAKING CHANGE**: The service class `AcpDialog` has been renamed to
  `AcpDialogService` to free the `acp-dialog` selector for the new declarative
  wrapper component. Update call sites from `inject(AcpDialog)` to
  `inject(AcpDialogService)`.

- Add FAB/mini-FAB color overrides, dark text contrast fixes, layout variables export rename to `global-variables`, and progress indicator support (`showProgress`, `progressType`, `progressText`) to AcpButton v2. ([#148](https://github.com/acontplus/acontplus-libs/pull/148))

### 🩹 Fixes

- Normalize package repository URLs by removing the `git+` prefix across all libraries. ([#148](https://github.com/acontplus/acontplus-libs/pull/148))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.3

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft
- emilios-dev

## 3.1.0 (2026-08-23)

### 🚀 Features

- Add FAB/mini-FAB color overrides, dark text contrast fixes, layout variables export rename to `global-variables`, and progress indicator support (`showProgress`, `progressType`, `progressText`) to AcpButton v2. ([#147](https://github.com/acontplus/acontplus-libs/pull/147))

### 🩹 Fixes

- Normalize package repository URLs by removing the `git+` prefix across all libraries. ([#147](https://github.com/acontplus/acontplus-libs/pull/147))
- Apply ACONTPLUS branding and acontplus-* CSS class prefix across header, sidebar, and shell-layout components. ([#144](https://github.com/acontplus/acontplus-libs/pull/144))
- Switch AcpHeaderTheme to a single icon button cycling light/dark; update avatar asset and theme handling in acontplus-erp. ([#144](https://github.com/acontplus/acontplus-libs/pull/144))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.2

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft
- emilios-dev
- Ivan Fernando Paz @iferpaz7

## 3.0.1 (2026-08-04)

### 🩹 Fixes

- Normalize API base URL and endpoint joining without corrupting absolute URLs. ([#143](https://github.com/acontplus/acontplus-libs/pull/143))
  Align package documentation with the current Angular 22 APIs and configuration contracts.

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.1

### ❤️ Thank You

- Ivan Fernando Paz @iferpaz7

# 3.0.0 (2026-08-03)

### ⚠️ Breaking Changes

- Angular 22 compatibility release. ([a989c59](https://github.com/acontplus/acontplus-libs/commit/a989c59))

  BREAKING CHANGE: The affected Angular libraries now require Angular ^22.1.0.

### ❤️ Thank You

- Ivan Paz

## 2.5.0 (2026-08-03)

### Features

- **release:** add manual dispatch for explicit version releases ([#142](https://github.com/acontplus/acontplus-libs/pull/142))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.0

### ❤️ Thank You

- Ivan Fernando Paz @iferpaz7

## 2.4.1 (2026-08-03)

### Features

- ⚠️ **angular:** release Angular 22 majors ([#141](https://github.com/acontplus/acontplus-libs/pull/141))

### ⚠️ Breaking Changes

- **angular:** release Angular 22 majors ([#141](https://github.com/acontplus/acontplus-libs/pull/141))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.4

### ❤️ Thank You

- Ivan Fernando Paz @iferpaz7

## 2.4.0 (2026-07-21)

### Features

- merge pagination fixes and signal API migration ([#140](https://github.com/acontplus/acontplus-libs/pull/140))

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft

## 2.3.0 (2026-07-17)

### Features

- **ng-components:** implement AcpButton v2 component and apply code quality improvements ([#139](https://github.com/acontplus/acontplus-libs/pull/139))
- **ng-components:** implement AcpButton v2 component and apply code quality improvements ([#138](https://github.com/acontplus/acontplus-libs/pull/138))

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft

## 2.2.0 (2026-07-16)

### Features

- add theme color system and dark mode ([#137](https://github.com/acontplus/acontplus-libs/pull/137))

### ❤️ Thank You

- Emilio Senguana @senguanasoft

## 2.1.34 (2026-07-12)

### 🩹 Fixes

- **release:** sync source package versions with git tags ([#124](https://github.com/acontplus/acontplus-libs/pull/124))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.5

### ❤️ Thank You

- Ivan Fernando Paz @iferpaz7

## 2.1.33 (2026-07-12)

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.4

## 2.1.32 (2026-07-10)

### 🩹 Fixes

- add keyboard events and fix linting issues ([#113](https://github.com/acontplus/acontplus-libs/pull/113))

### ❤️ Thank You

- Emilio Senguana @senguanasoft

## 2.1.31 (2026-03-10)

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.3
