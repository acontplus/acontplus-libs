import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-dynamic-table-overview',
  imports: [MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Dynamic Table</app-doc-heading>

      <p class="docs-component-description">
        Angular Material-based dynamic table with advanced features including row selection, dynamic
        row styling, expandable rows, pagination, and theme-aware coloring.
      </p>

      <h2>Features</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <ul class="features-list">
            <li>✓ Row Selection (single/multiple with disabled rows support)</li>
            <li>✓ Theme-aware Dynamic Row Colors based on data properties</li>
            <li>✓ Expandable Rows with collapsible detail views</li>
            <li>✓ Built-in Pagination support</li>
            <li>✓ Custom Column Templates</li>
            <li>✓ Sorting & Filtering capabilities</li>
          </ul>
        </mat-card-content>
      </mat-card>

      <h2>Coming Soon</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>Interactive examples and detailed documentation are being prepared.</p>
        </mat-card-content>
      </mat-card>

      <h2>Basic Usage</h2>
      <app-code-example [code]="basicCode" [language]="'typescript'" />

      <h2>Row Styling</h2>
      <app-code-example [code]="rowStylingCode" [language]="'typescript'" />
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 32px;
        color: var(--mat-sys-on-surface-variant);
      }

      h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 32px 0 16px;
        color: var(--mat-sys-on-surface);
      }

      .docs-example-card {
        margin-bottom: 16px;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .features-list li {
        padding: 12px 0;
        border-bottom: 1px solid var(--mat-sys-outline-variant);
        font-size: 16px;
      }

      .features-list li:last-child {
        border-bottom: none;
      }
    `,
  ],
})
export class DynamicTableOverview {
  basicCode = `import { DynamicTable } from '@acontplus/ng-components';

// Usage example coming soon`;

  rowStylingCode = `interface TableRow {
  id: number;
  name: string;
  status: string;
  rowStyle?: {
    backgroundColor?: string;
    color?: string;
  };
  disableSelection?: boolean;
}

// Theme-aware row styling
const data: TableRow[] = [
  {
    id: 1,
    name: 'Active Item',
    status: 'active',
    rowStyle: {
      backgroundColor: 'var(--mat-sys-primary-container)',
      color: 'var(--mat-sys-on-primary-container)',
    },
  },
  {
    id: 2,
    name: 'Disabled Item',
    status: 'disabled',
    disableSelection: true,
    rowStyle: {
      backgroundColor: '#e3f2fd',
      color: '#1565c0',
    },
  },
];`;
}
