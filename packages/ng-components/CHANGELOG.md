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
