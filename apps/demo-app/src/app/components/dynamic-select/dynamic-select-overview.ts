import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-dynamic-select-overview',
  imports: [MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Dynamic Select</app-doc-heading>

      <p class="docs-component-description">
        Dynamic select dropdown components with enhanced functionality. Supports dynamic option
        loading, custom templates, and advanced filtering capabilities.
      </p>

      <h2>Coming Soon</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>
            Interactive examples and documentation for Dynamic Select component are being prepared.
          </p>
          <p>
            This component provides Material select with dynamic data loading and custom features.
          </p>
        </mat-card-content>
      </mat-card>

      <h2>Basic Usage</h2>
      <app-code-example [code]="basicCode" [language]="'typescript'" />
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
    `,
  ],
})
export class DynamicSelectOverview {
  basicCode = `import { DynamicSelect } from '@acontplus/ng-components';

// Usage example coming soon`;
}
