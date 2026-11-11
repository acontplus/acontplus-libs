# @acontplus/ng-components

Angular Material UI component library with dynamic tables, theming support, dialog wrappers, and comprehensive styling utilities for AcontPlus applications.

## Installation

```bash
# Using npm
npm install @acontplus/ng-components

# Using pnpm
pnpm add @acontplus/ng-components
```

## Features

- **UI Components**: Cards, KPI cards, dialogs, icons, input chips, buttons, spinners, dynamic/tabulator tables, theme toggle, search select
- **Directives**: Text transformation (to-upper-case)
- **Pipes**: Data transformation (get-total, status-display)
- **Services**: Dialog management, overlay, theme management (dark/light mode), autocomplete
- **Form Controls**: Dynamic input components
- **Models**: Table models, pagination, autocomplete wrapper models
- **Types**: Tabulator table type definitions
- **Styling**: Custom SCSS mixins, variables, dialog styles, and theme support
- **Angular Material Integration**: Built on Angular Material for consistent design
- **TypeScript Support**: Full type safety with comprehensive definitions

## Components

### Cards

#### AcpCard

Material Design 3 card built on `mat-card`. Props can be passed in three ways,
from lowest to highest priority: injected defaults, plain inputs, and slot
templates for rich content.

```typescript
import { ACP_CARD_SLOTS, AcpCard, provideAcpCardDefaults } from '@acontplus/ng-components';

// app.config.ts (optional, application-wide defaults)
providers: [provideAcpCardDefaults({ appearance: 'outlined', rounded: 12 })];

@Component({
  template: `
    <acp-card
      title="Order #1024"
      subtitle="Pending"
      color="surface-container"
      imageRatio="16:9"
      actionsAlign="end"
      clickable
      (clicked)="open()"
    >
      <ng-template acpCardMedia><img src="cover.jpg" alt="" /></ng-template>
      <p>Card content goes here</p>
      <ng-template acpCardActions><acp-button text="Pay" /></ng-template>
    </acp-card>
  `,
  imports: [AcpCard, ACP_CARD_SLOTS],
})
export class OrderComponent {}
```

- Inputs: `title`, `subtitle`, `appearance` (`elevated` | `outlined` | `filled`),
  `color`, `elevation` (0-5), `rounded` (`true` | `false` | px), `padding`
  (`none` | `small` | `medium` | `large`), `hoverable`, `clickable`, `disabled`,
  `loading`, `imageRatio`, `actionsAlign`, `fullHeight`, `fullWidth`,
  `ariaLabel` and `passThrough` (per-section `class`/`style`).
- Output: `clicked`, emitted on click, Enter or Space when `clickable`. Clicks on
  actions or nested buttons/links are ignored.
- Slots: `acpCardHeader`, `acpCardMedia`, `acpCardAvatar`, `acpCardTitle`,
  `acpCardSubtitle`, `acpCardActions` and `acpCardFooter`. Slot templates win
  over `title`/`subtitle`. Legacy `#title`-style template refs still work.
- Styling hooks: `--acp-card-shape`, `--acp-card-elevation`, `--acp-card-padding`,
  `--acp-card-container-color`, `--acp-card-on-color`, `--acp-card-subtitle-color`
  and `--acp-card-outline-color`.
- Removed in this major: `backgroundColor` (use `color`), `hover` (use
  `hoverable`), `outlined` (use `appearance="outlined"`), the appearances
  `default`, `interactive` and `compact`, and the unused `AcpCardBadge` and
  `AcpCardBackgroundColor` types. `DynamicCard` (`acp-dynamic-card`) was removed;
  use `AcpCard`.

#### AcpKpiCard

Metric card for dashboards. Numeric values and changes are formatted with
`Intl.NumberFormat` using the app `LOCALE_ID` (or `locale`).

```html
<acp-kpi-card
  title="Expenses"
  icon="payments"
  [value]="45900"
  [valueFormat]="{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }"
  [percentage]="-4.1"
  lowerIsBetter
  trendLabel="vs last month"
  variant="outlined"
/>
```

- `trend` is inferred from the sign of `percentage` when unset. The delta badge
  color comes from the trend sentiment, not from the card `color`; set
  `lowerIsBetter` for costs, churn or error rates.
- Other inputs: `subtitle`, `prefix`, `suffix`, `description`, `footer`,
  `variant`, `color` (including `surface` and `custom`), `size`, `align`
  (`start` | `center` | `end`), `showTrendIcon`, `icon`,
  `svgIcon`, `avatar`, `avatarInitials`, `progress`, `progressColor`, `loading`,
  `disabled`, `clickable`, `selected`, `routerLink`, `ariaLabel`,
  `menuAriaLabel` and `tooltip`. Output: `clicked` (click, Enter or Space).
- Templates: `#icon`, `#avatar`, `#footer` and `#actions` (rendered in a menu).
- Styling hooks: `--acp-kpi-card-custom-bg`, `--acp-kpi-card-custom-fg` and
  `--acp-kpi-card-custom-accent`, plus the `kpi-card-*` theme tokens.

### Buttons

> **The legacy `Button` component is deprecated.** New code should import and
> use `AcpButton` (v2) instead. The legacy `Button` will be removed in a future
> major release.

#### AcpButton (v2)

Current button implementation with `input()` signals, loading state, form
association and full Material Design variants.

```typescript
import { AcpButton } from '@acontplus/ng-components';

@Component({
  template: ` <acp-button text="Save" color="success" (clicked)="save()" /> `,
  imports: [AcpButton],
})
export class SaveComponent {
  save() {
    // handle click
  }
}
```

### AcpDialog

Reusable, strongly-typed dialog service built on Angular Material. Every dialog
renders inside `AcpDialogContainer`, so content components always read data with
`inject(ACP_DIALOG_DATA)` and close with `inject(AcpDialogRef<R>)`.

The service is `AcpDialogService`; `acp-dialog` is the declarative layout
wrapper used inside content components.

#### Imperative usage

```typescript
import { Component, inject } from '@angular/core';
import { AcpDialogRef, AcpDialogService } from '@acontplus/ng-components';

@Component({ ... })
export class UserListComponent {
  private dialogs = inject(AcpDialogService);

  openEdit(userId: number) {
    const ref = this.dialogs.open<UserForm, { id: number }, boolean>(UserForm, {
      title: 'Edit user',
      size: 'lg',
      data: { id: userId },
      actions: [
        { text: 'Cancel', appearance: 'text', result: false },
        { text: 'Save', color: 'success', result: true },
      ],
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        // user saved
      }
    });
  }
}
```

Clicking a configured action emits `ref.clickedResult` and then closes the
dialog with `action.result` (or `action.key` when `result` is not set). To
intercept the click without closing, call `event.preventDefault()` inside a
`clickedResult` subscriber.

#### Reactive action state

`AcpDialogAction.disabled` and `AcpDialogAction.loading` accept a boolean, a
`Signal<boolean>` or an `Observable<boolean>`:

```typescript
actions: [
  { text: 'Cancel', appearance: 'text' },
  {
    text: 'Save',
    color: 'success',
    disabled: this.canSave, // signal<boolean>
    loading: this.saving, // signal<boolean>
  },
],
```

#### Declarative layout

For full control inside a dialog content template, use `acp-dialog` with
`acp-dialog-titlebar`, `acp-dialog-content` and `acp-dialog-actions`:

```html
<acp-dialog>
  <acp-dialog-titlebar title="Edit user" icon="person" />

  <acp-dialog-content>
    <p>Dialog body</p>
  </acp-dialog-content>

  <acp-dialog-actions align="end">
    <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
    <acp-button
      text="Save"
      color="success"
      [disabled]="form.invalid"
      (clicked)="ref.close(form.value)"
    />
  </acp-dialog-actions>
</acp-dialog>
```

#### Defaults

```typescript
import { provideAcpDialogDefaults } from '@acontplus/ng-components';

providers: [
  provideAcpDialogDefaults({
    fullScreenOnMobile: true,
    closeOn: { escapeKey: true, backdropClick: false },
  }),
],
```

#### API

- `AcpDialogService.open(component, config)` / `open({ content, ...config })`
- `AcpDialogRef.afterClosed()`, `close(result)`, `clickedResult`, `actionClicked$`
- `AcpDialogConfig` supports `size`, `width`, `height`, `title`, `header`,
  `actions`, `actionsAlign`, `closeOn`, `fullScreenOnMobile`, `bindings`,
  `ariaLabel`, `role`, etc.
- `AcpDialog`, `AcpDialogContent`, `AcpDialogTitlebar` and `AcpDialogActions` for
  declarative headers, body and footers.

### Dialog Wrapper

> **The `DialogWrapper` component is deprecated.** Use `AcpDialogService` and
> the `AcpDialog` declarative layout components instead. The wrapper will be
> removed in a future major release.

Enhanced dialog components with wrapper functionality for consistent dialog management.

```typescript
import { DialogWrapper } from '@acontplus/ng-components';
```

### AcpAlert

Inline message with a `type` (`default`, `info`, `success`, `warning`, `danger`), a `variant`
(`soft`, `outlined`, `filled`), an optional `heading`, a per-type icon and an actions slot.
`dismissible` adds a close button that hides the alert and emits `closed`; call `open()` to show
it again. Warnings and errors use `role="alert"`; the rest use `role="status"`.

```html
<acp-alert type="warning" heading="Certificado por vencer" dismissible>
  Renueva tu firma electrónica antes del 20/11/2026.
  <div acpAlertActions>
    <button matButton="filled">Renovar ahora</button>
  </div>
</acp-alert>
```

Inputs: `type`, `variant`, `heading`, `icon` (Material icon name), `showIcon`, `dismissible`,
`closeLabel` (default `Cerrar`), `elevation`.

### Input Chip

Chip input components integrated with Angular Material for tag/chip selection.

```typescript
import { InputChip } from '@acontplus/ng-components';
```

### Spinner

Loading spinner components for async operations.

```typescript
import { Spinner } from '@acontplus/ng-components';
```

### Tables

- **DataGrid**: Advanced data grid with Material table integration, signals, and modern Angular patterns
- **TabulatorTable**: Advanced table with Tabulator.js integration

```typescript
import { DataGrid, DataGridColumn, TabulatorTable } from '@acontplus/ng-components';
```

#### Data Grid Features

The DataGrid is the primary table component, built with modern Angular 22+ patterns:

- **Signals Architecture**: Uses `signal()`, `computed()`, `effect()` for reactive state
- **Modern APIs**: Uses `input()` and `output()` functions
- **Row Selection**: Single/multiple selection with formatter support
- **Row Highlighting**: Visual highlighting with `highlightedRowIndex`
- **Keyboard Navigation**: On by default. Arrows, Home/End, PageUp/PageDown, Enter (row click),
  Space (toggle selection) and Ctrl+A (select all). Add `[acpGridNavigationFor]="grid"` to a
  search input to drive the rows while the focus stays in the input
- **Column Pinning**: Sticky left/right columns
- **Infinite Scroll**: Load more data on scroll
- **Server-side Support**: `pageOnFront`/`sortOnFront` toggles for backend pagination
- **Custom Templates**: Cell, header, and expansion templates
- **Sorting & Pagination**: Full Material integration

```typescript
// Basic usage
@Component({
  imports: [DataGrid],
  template: `
    <acp-data-grid
      [data]="items"
      [columns]="columns"
      [rowSelectable]="true"
      [multiSelectable]="true"
      [showPaginator]="true"
      [pageOnFront]="false"
      [length]="totalCount"
      [pageIndex]="currentPage"
      [pageSize]="pageSize"
      [loading]="isLoading"
      (rowSelectedChange)="onSelect($event)"
      (page)="onPageChange($event)"
    />
  `,
})
export class MyComponent {
  columns: DataGridColumn[] = [
    { field: 'id', header: 'ID', type: 'number', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'status', header: 'Status', cellTemplate: statusTemplate },
    { field: 'actions', header: 'Actions', cellTemplate: actionsTemplate },
  ];
}
```

#### Row Selection Formatting

```typescript
// Disable selection for specific rows
<acp-data-grid
  [rowSelectable]="true"
  [rowSelectionFormatter]="{
    disabled: (row, index) => row.status === 'locked',
    hideCheckbox: (row, index) => row.isSystem
  }"
/>
```

#### Column Configuration

```typescript
const columns: DataGridColumn[] = [
  {
    field: 'price',
    header: 'Price',
    type: 'currency',
    typeParameter: { currencyCode: 'USD' },
    sortable: true,
    pinned: 'left',
    width: '120px',
  },
  {
    field: 'date',
    header: 'Created',
    type: 'date',
    typeParameter: { format: 'yyyy-MM-dd' },
  },
];
```

#### Column Groups

Consecutive columns that share the same `group` path are merged under group
headers — one header row per level, so nested groups are supported. Ungrouped
columns show an empty cell above their header.

Each level of `group` accepts:

- a `string` or `Observable<string>` used as both key and label;
- a function `(data) => string | Observable<string>` resolved against the grid
  `data`, for dynamic titles taken from the rows;
- a `{ key, label? }` descriptor when the grouping value differs from the
  displayed text (e.g. group by `warehouseId` but show `warehouseName`).
  `label` defaults to the resolved `key`.

Strings are compared by value; `Observable`s are compared by instance.

`groupClass` accepts a CSS class string or a formatter
`(group, memberColumns) => class`. The resolved classes are applied to each
group header cell and propagated to every member column's header and data
cells, so the whole column block can be styled (e.g. color entradas/salidas in
a kardex).

```typescript
const kardexGroupClass = (group: string | Observable<string>) =>
  typeof group === 'string'
    ? `kardex-group-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    : undefined;

// Groups by establecimientoId but shows establecimiento in the header.
const establecimiento = {
  key: (data: KardexRow[]) => data[0]?.establecimientoId ?? '',
  label: (data: KardexRow[]) => data[0]?.establecimiento ?? 'Establecimiento',
};

const columns: DataGridColumn<KardexRow>[] = [
  { field: 'item', header: 'Item' },
  {
    field: 'warehouseA',
    header: 'Warehouse A',
    group: [establecimiento, 'Entradas'],
    groupClass: kardexGroupClass,
  },
  {
    field: 'warehouseB',
    header: 'Warehouse B',
    group: [establecimiento, 'Salidas'],
    groupClass: kardexGroupClass,
  },
  { field: 'total', header: 'Total' },
];
```

#### Tabulator Table Features

- **Row Styling**: Same rowStyle property support as Dynamic Table
- **Advanced Filtering**: Built-in Tabulator filtering
- **Virtual Scrolling**: Performance optimization for large datasets
- **Tree Data**: Hierarchical data support
- **Custom Themes**: Material Design integration

```typescript
// Tabulator with row styling
<acp-tabulator-table
  [data]="tableData"
  [columns]="columns"
  [height]="400"
  [theme]="{ name: 'materialize' }"
/>
```

**Note**: Tabulator tables require `tabulator-tables` as a peer dependency:

```bash
# Using npm
npm install tabulator-tables

# Using pnpm
pnpm add tabulator-tables
```

#### Theme Integration

Both table components support automatic theme adaptation:

```scss
// Import Tabulator Material theme
@import 'tabulator-tables/dist/css/tabulator_materialize.min.css';
```

Row colors automatically adapt to light/dark themes using Material Design tokens or custom theme detection.

### Theme Toggle

Dark/light mode toggle component for theme switching. Provides accessible theme switching with customizable icons and labels.

**Features:**

- ✅ Accessible - ARIA labels and pressed state
- ✅ Customizable icons and labels
- ✅ Signal-based reactive state
- ✅ Automatic theme persistence to localStorage
- ✅ System theme preference detection
- ✅ OnPush change detection for performance

```typescript
import { ThemeToggle } from '@acontplus/ng-components';

@Component({
  template: `
    <!-- Basic usage -->
    <acp-theme-toggle />

    <!-- With custom labels (i18n ready) -->
    <acp-theme-toggle lightModeLabel="Cambiar a modo claro" darkModeLabel="Cambiar a modo oscuro" />

    <!-- With custom icons -->
    <acp-theme-toggle lightModeIcon="wb_sunny" darkModeIcon="nightlight" />

    <!-- With test ID for automated testing -->
    <acp-theme-toggle testId="header-theme-toggle" />
  `,
  imports: [ThemeToggle],
})
export class HeaderComponent {}
```

**Theme Toggle API:**

| Input            | Type     | Default                  | Description                                   |
| ---------------- | -------- | ------------------------ | --------------------------------------------- |
| `lightModeIcon`  | `string` | `'light_mode'`           | Icon shown when in dark mode (Material icon)  |
| `darkModeIcon`   | `string` | `'dark_mode'`            | Icon shown when in light mode (Material icon) |
| `lightModeLabel` | `string` | `'Switch to light mode'` | Accessible label when in dark mode            |
| `darkModeLabel`  | `string` | `'Switch to dark mode'`  | Accessible label when in light mode           |
| `testId`         | `string` | `''`                     | data-testid attribute for testing             |

### AcpSearchSelect

Searchable select built on `mat-autocomplete`. Accepts flat lists or one-level
groups (items with a `children` array), ignores accents when searching and works
with `ngModel`, reactive forms (including the `required` error state) and `[(value)]`.

```html
<acp-search-select [items]="cities" [(ngModel)]="cityId" [emptyValue]="0" label="Ciudad" />

<!-- Server-side search: debounce in the consumer and pass the results back -->
<acp-search-select
  [items]="customers()"
  [localFilter]="false"
  [loading]="loading()"
  (searchChange)="search($event)"
  label="Cliente"
/>
```

- Defaults match the backend lookup shape `{ id, value, children? }`:
  `bindValue="id"`, `bindLabel="value"`, `groupLabel="value"`. Each accessor
  also accepts a function, e.g. `[bindLabel]="labelOf"`.
- Inputs: `items`, `bindLabel`, `bindValue`, `children`, `groupLabel`,
  `compareWith` (matches `1` and `'1'` by default), `filterFn`, `localFilter`,
  `emptyValue`, `label`, `placeholder`, `hint`, `errorText`, `noResultsText`,
  `clearLabel`, `appearance`, `required`, `disabled`, `clearable` and `loading`.
- Outputs: `optionSelected` (`{ value, item, group }`), `cleared` and
  `searchChange`.
- Custom option content: `<ng-template #option let-item let-group="group">`.
- Typed text that is not selected is discarded when the panel closes, so the
  field always shows the current value.

## Directives

### ToUpperCase

Transforms input text to uppercase automatically.

```typescript
import { ToUpperCase } from '@acontplus/ng-components';
```

## Pipes

### GetTotalPipe

Calculates totals from arrays of objects.

```typescript
import { GetTotalPipe } from '@acontplus/ng-components';
```

### StatusDisplayPipe

Formats status values for display.

```typescript
import { StatusDisplayPipe } from '@acontplus/ng-components';
```

## Services

### AdvancedDialogService

Manages dialog creation and lifecycle with advanced features.

```typescript
import { AdvancedDialogService } from '@acontplus/ng-components';
```

### OverlayService

Manages overlay components and positioning.

```typescript
import { OverlayService } from '@acontplus/ng-components';
```

### ThemeSwitcher

Manages application theme (dark/light mode) with persistence.

```typescript
import { ThemeSwitcher } from '@acontplus/ng-components';
```

### AutocompleteWrapperService

Provides autocomplete functionality and data management.

```typescript
import { AutocompleteWrapperService } from '@acontplus/ng-components';
```

## Form Controls

### DynamicInput

Dynamic form input components for flexible form creation.

```typescript
import { DynamicInput } from '@acontplus/ng-components';
```

## Models

Exported models for type safety:

- **Mat Table Models**: Material table configuration models
- **Pagination**: Pagination models and interfaces
- **Autocomplete Wrapper**: Autocomplete configuration models

```typescript
import { PaginationModel, AutocompleteWrapperModel } from '@acontplus/ng-components';
```

## Types

### Tabulator Types

TypeScript definitions for Tabulator table configurations.

```typescript
import { TabulatorTypes } from '@acontplus/ng-components';
```

## Styling

The library includes custom SCSS files:

- **\_mixins.scss**: Reusable SCSS mixins
- **\_variables.scss**: Theme variables and constants
- **\_custom-dialog.scss**: Custom dialog styles
- **index.scss**: Main stylesheet entry point

Import styles in your application:

```scss
@import '@acontplus/ng-components/styles';
// For Tabulator Material theme
@import 'tabulator-tables/dist/css/tabulator_materialize.min.css';
```

### Theme-Aware Row Styling

Components support dynamic row styling that adapts to Material Design themes:

```typescript
// Theme detection utility
const isDark = document.documentElement.classList.contains('dark-theme');

// Status-based styling
function getStatusStyle(status: string) {
  switch (status) {
    case 'success':
      return isDark
        ? { backgroundColor: '#1b5e20', color: '#81c784' }
        : { backgroundColor: '#e8f5e8', color: '#2e7d32' };
    case 'error':
      return isDark
        ? { backgroundColor: '#b71c1c', color: '#ffcdd2' }
        : { backgroundColor: '#ffebee', color: '#c62828' };
    default:
      return {};
  }
}
```

## Peer Dependencies

- `@angular/cdk`: ^22.1.0
- `@angular/common`: ^22.1.0
- `@angular/core`: ^22.1.0
- `@angular/forms`: ^22.1.0
- `@angular/material`: ^22.1.0
- `@angular/platform-browser`: ^22.1.0
- `@angular/router`: ^22.1.0
- `tabulator-tables`: ^6.5.2
