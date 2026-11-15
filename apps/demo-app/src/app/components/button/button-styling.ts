import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-button-styling',
  imports: [MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Button Styling</app-doc-heading>

      <p class="docs-component-description">
        Customize button appearance using CSS variables and SCSS mixins. All buttons support
        Material Design 3 theming and custom styling.
      </p>

      <h2>CSS Variables</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>Use Material Design 3 tokens for consistent theming:</p>
          <ul class="features-list">
            <li><code>--mat-sys-primary</code> - Primary color</li>
            <li><code>--mat-sys-on-primary</code> - Text color on primary</li>
            <li><code>--mat-sys-surface</code> - Surface color</li>
            <li><code>--mat-sys-outline</code> - Border color</li>
          </ul>
        </mat-card-content>
      </mat-card>

      <h2>Custom Button Colors</h2>
      <app-code-example [code]="customColorCode" [language]="'styles'" />

      <h2>Button Sizing</h2>
      <app-code-example [code]="sizingCode" [language]="'styles'" />

      <h2>Custom Variants</h2>
      <p class="section-description">
        Create custom button variants by extending the base button styles.
      </p>
      <app-code-example [code]="customVariantCode" [language]="'styles'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description,
      .docs-example-card {
        margin-bottom: 16px;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 16px 0;
      }
    `,
  ],
})
export class ButtonStyling {
  customColorCode = `// Custom button color using CSS variables
.custom-button {
  --mat-filled-button-container-color: var(--mat-sys-tertiary);
  --mat-filled-button-label-text-color: var(--mat-sys-on-tertiary);
}

// Or override specific variant
.acp-button.custom-variant {
  background-color: var(--mat-sys-tertiary);
  color: var(--mat-sys-on-tertiary);

  &:hover {
    background-color: var(--mat-sys-tertiary-container);
  }
}`;

  sizingCode = `// Custom button sizes
.button-small {
  height: 32px;
  padding: 0 12px;
  font-size: var(--mat-sys-label-medium-size);
}

.button-large {
  height: 56px;
  padding: 0 32px;
  font-size: var(--mat-sys-label-large-size);
}

// Full-width button
.button-full-width {
  width: 100%;
  display: flex;
  justify-content: center;
}`;

  customVariantCode = `// Create a custom gradient button
.button-gradient {
  background: linear-gradient(45deg, var(--mat-sys-primary) 30%, var(--mat-sys-tertiary) 90%);
  border: 0;
  color: var(--mat-sys-on-primary);
  box-shadow: var(--acp-sys-shadow-2);

  &:hover {
    filter: brightness(1.08);
  }
}

// Responsive button styling
@media (max-width: 600px) {
  .acp-button {
    width: 100%;
    margin: 4px 0;
  }
}`;
}
