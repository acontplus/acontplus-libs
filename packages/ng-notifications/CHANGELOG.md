## 3.1.0 (2026-11-25)

### 🚀 Features

- Add `AcpSwalService`: SweetAlert2 with buttons styled like `acp-button` (color, appearance, size ([#160](https://github.com/acontplus/acontplus-libs/pull/160))
  and `square`), the app light/dark theme, and `confirm()`, `success()`, `error()`, `warning()`,
  `info()` and `toast()` helpers. Spanish texts by default, configurable with `ACP_SWAL_BUTTONS` and
  `ACP_SWAL_CONFIRM_TEXT`. Add `acpEscapeHtml` and the `_sweetalert-theme.scss` styles, included in
  `@acontplus/ng-notifications/src/styles`.

### ❤️ Thank You

- Emilio Senguana @senguanasoft
- emiliosw-dev

## 3.0.4 (2026-11-16)

### 🩹 Fixes

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

## 3.0.3 (2026-09-11)

### 🩹 Fixes

- Normalize package repository URLs by removing the `git+` prefix across all libraries. ([#148](https://github.com/acontplus/acontplus-libs/pull/148))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.3

### ❤️ Thank You

- Devin @devin-ai-integration[bot]
- Emilio Senguana @senguanasoft
- emilios-dev

## 3.0.2 (2026-08-23)

### 🩹 Fixes

- Normalize package repository URLs by removing the `git+` prefix across all libraries. ([#147](https://github.com/acontplus/acontplus-libs/pull/147))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.2

### ❤️ Thank You

- Emilio Senguana @senguanasoft
- emilios-dev

## 3.0.1 (2026-08-04)

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.1

# 3.0.0 (2026-08-03)

### ⚠️ Breaking Changes

- Angular 22 compatibility release. ([a989c59](https://github.com/acontplus/acontplus-libs/commit/a989c59))

  BREAKING CHANGE: The affected Angular libraries now require Angular ^22.1.0.

### ❤️ Thank You

- Ivan Paz

## 2.2.0 (2026-08-03)

### 🧱 Updated Dependencies

- Updated ui-kit to 1.1.0

## 2.1.3 (2026-07-12)

### 🩹 Fixes

- **release:** sync source package versions with git tags ([#124](https://github.com/acontplus/acontplus-libs/pull/124))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.5

### ❤️ Thank You

- Ivan Fernando Paz @iferpaz7

## 2.1.2 (2026-07-12)

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.4

## 2.1.1 (2026-07-10)

### 🩹 Fixes

- resolve ng-components build errors and add SCSS exports ([#110](https://github.com/acontplus/acontplus-libs/pull/110))

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.3

### ❤️ Thank You

- Emilio Senguana @senguanasoft

## 2.1.0 (2026-03-10)

### 🚀 Features

- **ng-notifications:** add isProvider helper method ([#95](https://github.com/acontplus/acontplus-libs/pull/95))

### 🩹 Fixes

- **ng-notifications:** add getProvider method to service ([#88](https://github.com/acontplus/acontplus-libs/pull/88))

### ❤️ Thank You

- Ivan Fernando Paz @iferpaz7

## 2.0.6 (2026-03-10)

### 🧱 Updated Dependencies

- Updated ui-kit to 1.0.3
