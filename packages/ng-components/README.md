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

- **DynamicTable**: Angular Material-based dynamic table with advanced features
- **TabulatorTable**: Advanced table with Tabulator.js integration

```typescript
import { DynamicTable, TabulatorTable } from '@acontplus/ng-components';
```

#### Dynamic Table Features

- **Row Selection**: Single/multiple selection with disabled rows support
- **Row Styling**: Theme-aware dynamic row colors based on data properties
- **Expandable Rows**: Collapsible detail views
- **Pagination**: Built-in pagination support
- **Column Templates**: Custom column rendering
- **Sorting & Filtering**: Material table sorting capabilities

```typescript
// Row styling example
interface TableRow {
  rowStyle?: {
    backgroundColor?: string;
    color?: string;
    [key: string]: any;
  };
  disableSelection?: boolean;
}

// Usage with theme-aware colors
const data = [
  {
    id: 1,
    name: 'Item 1',
    status: 'active',
    rowStyle: {
      backgroundColor: 'var(--mat-sys-primary-container)',
      color: 'var(--mat-sys-on-primary-container)',
    },
  },
  {
    id: 2,
    name: 'Item 2',
    status: 'processing',
    disableSelection: true,
    rowStyle: {
      backgroundColor: '#e3f2fd',
      color: '#1565c0',
    },
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

Dark/light mode toggle component for theme switching.

```typescript
import { ThemeToggle } from '@acontplus/ng-components';
```

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
