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
