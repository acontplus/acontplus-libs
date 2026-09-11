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

- **UI Components**: Dynamic cards, dialogs, icons, input chips, buttons, spinners, dynamic/tabulator tables, theme toggle, autocomplete wrapper
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

### DateRangePicker

Standalone date-range form control built on `ngx-datex`. It implements
`ControlValueAccessor`, includes Spanish preset ranges, and can emit either
formatted strings or `Date` objects.

Install its peer dependencies with the package:

```bash
pnpm add @acontplus/ng-components ngx-datex@1.0.5 @formkit/tempo
```

```typescript
import { Component } from '@angular/core';
import { DateRangePicker, DateRangeValue } from '@acontplus/ng-components';

@Component({
  standalone: true,
  imports: [DateRangePicker],
  template: `
    <acp-date-range-picker
      label="Periodo"
      [formatOutputAsString]="false"
      [timePicker]="true"
      (dateRangeSelected)="onRangeSelected($event)"
    />
  `,
})
export class ReportComponent {
  onRangeSelected(range: DateRangeValue<false>): void {
    console.log(range.from, range.to);
  }
}
```

Use `formControlName` or `[(ngModel)]` as with any Angular form control. Its
main inputs are `options`, `formatOutputAsString`, `startDate`, `endDate`,
`minDate`, `maxDate`, `singleDatePicker`, and the time-picker settings. The
outputs are `dateRangeSelected`, `pickerShow`, `pickerHide`, `pickerApply`,
`pickerCancel`, and `checkboxChange`.

`DateRangePickerOptions` accepts `locale`, `theme`, custom `ranges`, date
bounds, and the `ngx-datex` behavior options. `MATERIAL_LIGHT_THEME`,
`SPANISH_LOCALE`, and the relevant `ngx-datex` types are re-exported from
`@acontplus/ng-components`.

### Cards

#### DynamicCard

Versatile card component wrapping Angular Material's mat-card with additional functionality.

```typescript
import { DynamicCard } from '@acontplus/ng-components';

@Component({
  template: `
    <acp-dynamic-card
      [cardTitle]="'Product Details'"
      [cardSubtitle]="'Premium Package'"
      [isHeaderVisible]="true"
      [areActionsVisible]="true"
      [primaryButtonText]="'Buy Now'"
      [secondaryButtonText]="'Learn More'"
      (primaryButtonClicked)="onPurchase()"
      (secondaryButtonClicked)="onLearnMore()"
    >
      <p>Card content goes here</p>
    </acp-dynamic-card>
  `,
  imports: [DynamicCard],
})
export class ProductComponent {}
```

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
- **Keyboard Navigation**: Full accessibility with arrow keys, Home/End
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

### Autocomplete Wrapper

Enhanced autocomplete components with custom functionality.

```typescript
import { AutocompleteWrapperComponent } from '@acontplus/ng-components';
```

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
