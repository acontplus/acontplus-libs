import { Component } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';
import { ThemeToggle } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-theme-toggle-examples',
  imports: [DocHeading, CodeExample, ThemeToggle, MatCardModule],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Theme Toggle Examples</app-doc-heading>

      <h2>Basic Usage</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="example-preview">
            <acp-theme-toggle />
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="basicCode" [language]="'html'" />

      <h2>Custom Icons</h2>
      <p class="example-description">Use different Material icons for the toggle states.</p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="example-preview">
            <acp-theme-toggle lightModeIcon="wb_sunny" darkModeIcon="nightlight" />
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="customIconsCode" [language]="'html'" />

      <h2>Custom Labels (i18n)</h2>
      <p class="example-description">
        Customize labels for internationalization or different contexts.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="example-preview">
            <acp-theme-toggle
              lightModeLabel="Cambiar a modo claro"
              darkModeLabel="Cambiar a modo oscuro"
            />
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="customLabelsCode" [language]="'html'" />

      <h2>With Test ID</h2>
      <p class="example-description">
        Add a data-testid for automated testing (E2E, integration tests).
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="example-preview">
            <acp-theme-toggle testId="header-theme-toggle" />
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="testIdCode" [language]="'html'" />

      <h2>Fully Customized</h2>
      <p class="example-description">Combine all customization options.</p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="example-preview">
            <acp-theme-toggle
              lightModeIcon="brightness_high"
              darkModeIcon="brightness_4"
              lightModeLabel="Activate light theme"
              darkModeLabel="Activate dark theme"
              testId="custom-theme-toggle"
            />
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="fullCustomCode" [language]="'html'" />
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 32px 0 16px;
        color: var(--mat-sys-on-surface);
      }

      h2:first-of-type {
        margin-top: 16px;
      }

      .example-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 16px;
        color: var(--mat-sys-on-surface-variant);
      }

      .example-card {
        margin-bottom: 16px;
      }

      .example-preview {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 24px;
        min-height: 80px;
      }
    `,
  ],
})
export class ThemeToggleExamples {
  basicCode = `<acp-theme-toggle />`;

  customIconsCode = `<acp-theme-toggle
  lightModeIcon="wb_sunny"
  darkModeIcon="nightlight"
/>`;

  customLabelsCode = `<acp-theme-toggle
  lightModeLabel="Cambiar a modo claro"
  darkModeLabel="Cambiar a modo oscuro"
/>`;

  testIdCode = `<acp-theme-toggle testId="header-theme-toggle" />`;

  fullCustomCode = `<acp-theme-toggle
  lightModeIcon="brightness_high"
  darkModeIcon="brightness_4"
  lightModeLabel="Activate light theme"
  darkModeLabel="Activate dark theme"
  testId="custom-theme-toggle"
/>`;
}
