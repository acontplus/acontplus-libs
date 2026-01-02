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

#### Button

Flexible button component with multiple Material Design variants and built-in report format support.

```typescript
import { Button, REPORT_FORMAT } from '@acontplus/ng-components';

@Component({
  template: `
    <!-- Standard button -->
    <acp-button
      [variant]="'primary'"
      [text]="'Save'"
      [icon]="'save'"
      [matStyle]="'elevated'"
      [disabled]="false"
      (handleClick)="onSave()"
    />

    <!-- Report button with automatic icon, color, and title -->
    <acp-button
      [reportFormat]="REPORT_FORMAT.PDF"
      [text]="'Export Report'"
      [title]="'Download'"
      (handleClick)="exportReport($event)"
    />
    <!-- Automatically shows PDF icon, danger color, and title "Download - PDF" -->

    <!-- Report button with format-only (no explicit text) -->
    <acp-button [reportFormat]="REPORT_FORMAT.EXCEL" (handleClick)="exportExcel()" />
    <!-- Shows Excel icon, success color, and "Excel" as title -->
  `,
  imports: [Button],
})
export class FormComponent {
  REPORT_FORMAT = REPORT_FORMAT;

  exportReport() {
    console.log('Exporting PDF report...');
  }
}
```

#### Report Format Support

The Button component includes optional built-in support for report/export buttons with automatic styling:

**Available Report Formats:**

- `REPORT_FORMAT.PDF` - Red/danger color, PDF icon
- `REPORT_FORMAT.EXCEL` - Green/success color, table icon
- `REPORT_FORMAT.WORD` - Blue/primary color, document icon
- `REPORT_FORMAT.CSV` - Green/success color, grid icon
- `REPORT_FORMAT.XML` - Orange/warning color, code icon
- `REPORT_FORMAT.IMAGE` - Blue/info color, image icon
- `REPORT_FORMAT.HTML` - Blue/info color, HTML icon
- `REPORT_FORMAT.MHTML` - Gray/secondary color, web icon

**Features:**

- **Auto Icon**: Automatically sets the appropriate icon based on format
- **Auto Color**: Automatically applies the correct color variant
- **Auto Title**: Appends format name to tooltip (e.g., "Export - PDF")
- **Optional**: All report features are completely optional
- **Overridable**: Explicit `icon`, `variant`, or `title` inputs take precedence

**Examples:**

```typescript
// Minimal report button
<acp-button
  [reportFormat]="REPORT_FORMAT.PDF"
  [text]="'Export'"
/>
// Result: PDF icon, danger color, tooltip "PDF"

// With custom title
<acp-button
  [reportFormat]="REPORT_FORMAT.EXCEL"
  [text]="'Download'"
  [title]="'Monthly Report'"
/>
// Result: Excel icon, success color, tooltip "Monthly Report - Excel"

// Override icon but keep auto-color
<acp-button
  [reportFormat]="REPORT_FORMAT.WORD"
  [icon]="'download'"
  [text]="'Get Document'"
/>
// Result: Custom download icon, primary color (from Word format)

// Override color but keep auto-icon
<acp-button
  [reportFormat]="REPORT_FORMAT.CSV"
  [variant]="'secondary'"
  [text]="'Export Data'"
/>
// Result: Grid icon (from CSV), secondary color (overridden)

// Regular button (no report format)
<acp-button
  [text]="'Click me'"
  [icon]="'add'"
  [variant]="'primary'"
/>
// Result: Works as before, no report format logic applied
```

**Button Variants:**

- `primary`, `secondary`, `success`, `danger`, `warning`, `info`

**Material Styles:**

- `filled` (default), `elevated`, `outlined`, `text`, `tonal`
- `icon`, `fab`, `mini-fab`, `extended-fab`

### Dialog Wrapper

Enhanced dialog components with wrapper functionality for consistent dialog management.

```typescript
import { DialogWrapper } from '@acontplus/ng-components';
```

### Icons

#### SvgIcon

Modern, type-safe SVG icon system with registry service, fallback support, and online icon loading.

**Features:**

- ✅ Type-safe with autocomplete for icon names
- ✅ Tree-shakable - only bundled icons included
- ✅ SSR-friendly - no runtime HTTP requests for registered icons
- ✅ Signal-based reactive primitives
- ✅ Fallback icon support for missing icons
- ✅ Dynamic online icon loading from URLs
- ✅ Customizable size, color, and dimensions

```typescript
import { SvgIcon, IconRegistryService } from '@acontplus/ng-components';

@Component({
  template: `
    <!-- Basic usage -->
    <acp-svg-icon name="home" />

    <!-- Custom size and color -->
    <acp-svg-icon name="user" size="32px" color="#FF5733" />

    <!-- Custom width and height -->
    <acp-svg-icon name="settings" width="20px" height="20px" />

    <!-- Disable fallback for missing icons -->
    <acp-svg-icon name="custom-icon" [useFallback]="false" />

    <!-- Dynamic icon -->
    <acp-svg-icon [name]="currentIcon" size="24px" />
  `,
  imports: [SvgIcon],
})
export class IconExampleComponent {
  currentIcon = 'menu';
}
```

**Available Default Icons:**
`home`, `user`, `settings`, `search`, `close`, `check`, `arrow-right`, `arrow-left`, `menu`, `info`, `warning`, `error`

**Configuring the Icon Registry:**

```typescript
import { ApplicationConfig } from '@angular/core';
import { IconRegistryService } from '@acontplus/ng-components';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Required for online icon loading
    // ... other providers
  ],
};

// In your app component or initialization
export class AppComponent implements OnInit {
  private iconRegistry = inject(IconRegistryService);

  ngOnInit() {
    // Configure with fallback icon
    this.iconRegistry.configure({
      fallbackIcon: `<svg>...</svg>`, // Fallback when icon not found
      showWarnings: true, // Log warnings for missing icons
      iconBaseUrl: 'https://cdn.example.com/icons', // Base URL for auto-loading
    });

    // Register custom icons
    this.iconRegistry.registerIcon(
      'custom-icon',
      `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10l10 5 10-5V7z"/>
      </svg>
    `,
    );

    // Register multiple icons
    this.iconRegistry.registerIcons([
      { name: 'icon-one', data: '<svg>...</svg>' },
      { name: 'icon-two', data: '<svg>...</svg>' },
    ]);

    // Load icons from URLs
    await this.iconRegistry.loadIconFromUrl('github', 'https://example.com/github.svg');

    // Load multiple icons from URLs
    await this.iconRegistry.loadIconsFromUrls([
      { name: 'twitter', url: 'https://example.com/twitter.svg' },
      { name: 'linkedin', url: 'https://example.com/linkedin.svg' },
    ]);
  }
}
```

**Icon Registry API:**

| Method                        | Description                               |
| ----------------------------- | ----------------------------------------- |
| `configure(config)`           | Set fallback icon, warnings, and base URL |
| `registerIcon(name, svgData)` | Register a single icon                    |
| `registerIcons(icons[])`      | Register multiple icons                   |
| `loadIconFromUrl(name, url)`  | Load icon from URL (requires HttpClient)  |
| `loadIconsFromUrls(icons[])`  | Load multiple icons from URLs             |
| `getIcon(name)`               | Get icon (returns fallback if not found)  |
| `getIconAsync(name)`          | Get icon with auto-loading from base URL  |
| `hasIcon(name)`               | Check if icon exists                      |
| `getRegisteredIcons()`        | Get all registered icon names             |
| `removeIcon(name)`            | Remove specific icon                      |
| `clearRegistry()`             | Clear all icons                           |

**Handling Missing Icons:**

When an icon is not found:

1. If `fallbackIcon` is configured, it displays the fallback
2. If `useFallback` input is `false`, nothing is displayed
3. Console warning is shown (if `showWarnings: true`)

**Online Icon Loading:**

```typescript
// Manual loading
await this.iconRegistry.loadIconFromUrl('brand-icon', 'https://cdn.example.com/brand.svg');

// Auto-loading with base URL
this.iconRegistry.configure({
  iconBaseUrl: 'https://cdn.example.com/icons'
});

// Component automatically tries to load from:
// https://cdn.example.com/icons/brand-icon.svg
<acp-svg-icon name="brand-icon" />

// Or use async method
const icon = await this.iconRegistry.getIconAsync('brand-icon');
```

#### UserIcon & SvgIcon

Icon components for consistent iconography.

```typescript
import { UserIcon, SvgIcon } from '@acontplus/ng-components';
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

The DataGrid is the primary table component, built with modern Angular 21+ patterns:

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

- `@angular/cdk`: ^20.2.5
- `@angular/common`: ^20.3.2
- `@angular/core`: ^20.3.2
- `@angular/material`: ^20.2.5
- `tabulator-tables`: ^6.3.1
