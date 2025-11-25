import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-tabulator-table-overview',
  imports: [CommonModule, MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Tabulator Table</app-doc-heading>

      <p class="docs-component-description">
        Advanced table with Tabulator.js integration featuring virtual scrolling, tree data support,
        advanced filtering, and Material Design theming.
      </p>

      <h2>Features</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <ul class="features-list">
            <li>✓ Row Styling with theme-aware colors</li>
            <li>✓ Advanced Filtering and searching</li>
            <li>✓ Virtual Scrolling for large datasets</li>
            <li>✓ Tree Data with hierarchical support</li>
            <li>✓ Custom Themes with Material Design integration</li>
            <li>✓ Export capabilities (PDF, Excel, CSV)</li>
            <li>✓ Column grouping and frozen columns</li>
          </ul>
        </mat-card-content>
      </mat-card>

      <h2>Installation</h2>
      <p class="section-description">
        Tabulator tables require <code>tabulator-tables</code> as a peer dependency.
      </p>

      <app-code-example [code]="installCode" [language]="'bash'" />

      <h2>Coming Soon</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>Interactive examples and detailed documentation are being prepared.</p>
        </mat-card-content>
      </mat-card>

      <h2>Basic Usage</h2>
      <app-code-example [code]="basicCode" [language]="'typescript'" />

      <h2>Theme Integration</h2>
      <app-code-example [code]="themeCode" [language]="'scss'" />
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description,
      .section-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 24px;
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

      code {
        background-color: var(--mat-sys-surface-container);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Roboto Mono', monospace;
        font-size: 13px;
      }
    `,
  ],
})
export class TabulatorTableOverview {
  installCode = `# Using npm
npm install tabulator-tables

# Using pnpm
pnpm add tabulator-tables`;

  basicCode = `import { TabulatorTable } from '@acontplus/ng-components';

<acp-tabulator-table
  [data]="tableData"
  [columns]="columns"
  [height]="400"
  [theme]="{ name: 'materialize' }"
/>`;

  themeCode = `// Import Tabulator Material theme in your styles
@import 'tabulator-tables/dist/css/tabulator_materialize.min.css';

// Row colors automatically adapt to light/dark themes`;
}
