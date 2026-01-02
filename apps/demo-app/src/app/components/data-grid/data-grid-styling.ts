import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-data-grid-styling',
  imports: [MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Data Grid Styling</app-doc-heading>

      <p class="docs-component-description">
        Customize the Data Grid appearance using CSS variables, row formatters, and SCSS theming.
        The grid supports Material Design 3 tokens for consistent theming.
      </p>

      <h2>CSS Variables</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>Use Material Design 3 tokens for consistent theming:</p>
          <ul class="features-list">
            <li><code>--mat-sys-surface</code> - Table background</li>
            <li><code>--mat-sys-on-surface</code> - Text color</li>
            <li><code>--mat-sys-surface-container</code> - Header background</li>
            <li><code>--mat-sys-surface-container-highest</code> - Highlighted row</li>
            <li><code>--mat-sys-primary</code> - Selection color</li>
            <li><code>--mat-sys-outline-variant</code> - Border color</li>
          </ul>
        </mat-card-content>
      </mat-card>

      <h2>Row Class Formatter</h2>
      <p class="section-description">
        Use <code>rowClassFormatter</code> to dynamically apply CSS classes to rows based on data.
      </p>
      <app-code-example [code]="rowClassFormatterCode" [language]="'typescript'" />

      <h2>Row Selection Formatter</h2>
      <p class="section-description">
        Control row selection behavior with <code>rowSelectionFormatter</code>.
      </p>
      <app-code-example [code]="rowSelectionFormatterCode" [language]="'typescript'" />

      <h2>Custom Cell Styling</h2>
      <p class="section-description">
        Apply custom styles to cells using the column <code>class</code> property or cell templates.
      </p>
      <app-code-example [code]="cellStylingCode" [language]="'typescript'" />

      <h2>Size Variants</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>Control table density with the <code>size</code> input:</p>
          <ul class="features-list">
            <li><code>small</code> - Compact rows (32px height)</li>
            <li><code>medium</code> - Medium rows (40px height)</li>
            <li><code>normal</code> - Default rows (48px height)</li>
          </ul>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="sizeCode" [language]="'html'" />

      <h2>Striped Rows</h2>
      <p class="section-description">Enable alternating row colors for better readability.</p>
      <app-code-example [code]="stripedCode" [language]="'html'" />

      <h2>Highlighted Row</h2>
      <p class="section-description">
        Use <code>highlightedRowIndex</code> to highlight a specific row, useful for keyboard
        navigation.
      </p>
      <app-code-example [code]="highlightedCode" [language]="'html'" />

      <h2>Global SCSS Customization</h2>
      <p class="section-description">Override default styles with SCSS variables.</p>
      <app-code-example [code]="scssCustomizationCode" [language]="'scss'" />
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      h2 {
        margin-top: 32px;
        margin-bottom: 16px;
      }

      .docs-component-description,
      .section-description {
        color: var(--mat-sys-on-surface-variant);
        margin-bottom: 16px;
        line-height: 1.6;
      }

      .docs-example-card {
        margin-bottom: 16px;
      }

      .features-list {
        margin: 8px 0;
        padding-left: 24px;

        li {
          margin-bottom: 8px;
        }

        code {
          background: var(--mat-sys-surface-container);
          padding: 2px 6px;
          border-radius: 4px;
        }
      }
    `,
  ],
})
export class DataGridStyling {
  rowClassFormatterCode = `// Define CSS classes for rows based on data
rowClassFormatter: DataGridRowClassFormatter = {
  'row-success': (row) => row.status === 'completed',
  'row-warning': (row) => row.status === 'pending',
  'row-danger': (row) => row.status === 'failed',
};

// In your template
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowClassFormatter]="rowClassFormatter"
/>

// In your styles
::ng-deep .row-success { background-color: #e8f5e9; }
::ng-deep .row-warning { background-color: #fff3e0; }
::ng-deep .row-danger { background-color: #ffebee; }`;

  rowSelectionFormatterCode = `// Control which rows can be selected
rowSelectionFormatter: DataGridRowSelectionFormatter = {
  // Disable selection for certain rows
  disabled: (row) => row.status === 'locked',
  // Hide checkbox for certain rows
  hideCheckbox: (row) => row.type === 'header',
};

<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowSelectable]="true"
  [rowSelectionFormatter]="rowSelectionFormatter"
/>`;

  cellStylingCode = `// Add CSS class to a column
columns: DataGridColumn[] = [
  { field: 'name', header: 'Name' },
  { field: 'status', header: 'Status', class: 'status-cell' },
  { field: 'amount', header: 'Amount', class: 'amount-cell text-right' },
];

// Or use cellTemplate for full control
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [cellTemplate]="{ status: statusTpl }"
/>

<ng-template #statusTpl let-rowData="rowData">
  <span [class]="'status-badge status-' + rowData.status">
    {{ rowData.status }}
  </span>
</ng-template>`;

  sizeCode = `<!-- Compact size -->
<acp-data-grid [data]="data" [columns]="columns" size="small" />

<!-- Medium size -->
<acp-data-grid [data]="data" [columns]="columns" size="medium" />

<!-- Normal size (default) -->
<acp-data-grid [data]="data" [columns]="columns" size="normal" />`;

  stripedCode = `<!-- Enable striped rows -->
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowStriped]="true"
/>`;

  highlightedCode = `<!-- Highlight a specific row -->
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [keyboardNavigation]="true"
  [highlightedRowIndex]="currentIndex"
/>`;

  scssCustomizationCode = `// Override data grid styles globally
acp-data-grid {
  // Header styling
  .mat-mdc-header-row {
    background: var(--mat-sys-surface-container);
    font-weight: 600;
  }

  // Row hover effect
  .mat-mdc-row:hover {
    background: var(--mat-sys-surface-container-low);
  }

  // Selected row
  .mat-mdc-row.selected {
    background: color-mix(in srgb, var(--mat-sys-primary) 12%, transparent);
  }

  // Highlighted row (keyboard navigation)
  .mat-mdc-row.highlighted {
    background: var(--mat-sys-surface-container-highest);
    outline: 2px solid var(--mat-sys-primary);
    outline-offset: -2px;
  }

  // Cell borders
  .mat-mdc-cell {
    border-bottom: 1px solid var(--mat-sys-outline-variant);
  }
}`;
}
