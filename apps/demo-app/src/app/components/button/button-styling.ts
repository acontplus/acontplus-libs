import { Component } from '@angular/core';

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
      <app-code-example [code]="customColorCode" [language]="'scss'" />

      <h2>Button Sizing</h2>
      <app-code-example [code]="sizingCode" [language]="'scss'" />

      <h2>Custom Variants</h2>
      <p class="section-description">
        Create custom button variants by extending the base button styles.
      </p>
      <app-code-example [code]="customVariantCode" [language]="'scss'" />
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
        margin: 16px 0;
      }

      .features-list li {
        padding: 8px 0;
        font-size: 14px;
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
export class ButtonStyling {
  customColorCode = `// Custom button color using CSS variables
.custom-button {
  --mat-filled-button-container-color: #6200ee;
  --mat-filled-button-label-text-color: #ffffff;
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
  font-size: 13px;
}

.button-large {
  height: 56px;
  padding: 0 32px;
  font-size: 16px;
}

// Full-width button
.button-full-width {
  width: 100%;
  display: flex;
  justify-content: center;
}`;

  customVariantCode = `// Create a custom gradient button
.button-gradient {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
  
  &:hover {
    background: linear-gradient(45deg, #fe8ba0 30%, #ffa070 90%);
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
