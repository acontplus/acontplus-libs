import { Component } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-theme-toggle-api',
  imports: [DocHeading, MatCardModule],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Theme Toggle API</app-doc-heading>

      <h2>Selector</h2>
      <p><code>acp-theme-toggle</code></p>

      <h2>Inputs</h2>
      <mat-card class="api-card">
        <mat-card-content>
          <table class="api-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>lightModeIcon</code></td>
                <td><code>string</code></td>
                <td><code>'light_mode'</code></td>
                <td>
                  Material icon name displayed when in dark mode (clicking will switch to light)
                </td>
              </tr>
              <tr>
                <td><code>darkModeIcon</code></td>
                <td><code>string</code></td>
                <td><code>'dark_mode'</code></td>
                <td>
                  Material icon name displayed when in light mode (clicking will switch to dark)
                </td>
              </tr>
              <tr>
                <td><code>lightModeLabel</code></td>
                <td><code>string</code></td>
                <td><code>'Switch to light mode'</code></td>
                <td>Accessible label (aria-label and tooltip) when in dark mode</td>
              </tr>
              <tr>
                <td><code>darkModeLabel</code></td>
                <td><code>string</code></td>
                <td><code>'Switch to dark mode'</code></td>
                <td>Accessible label (aria-label and tooltip) when in light mode</td>
              </tr>
              <tr>
                <td><code>testId</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>Sets data-testid attribute for automated testing. Not rendered if empty.</td>
              </tr>
            </tbody>
          </table>
        </mat-card-content>
      </mat-card>

      <h2>Accessibility</h2>
      <mat-card class="api-card">
        <mat-card-content>
          <ul class="a11y-list">
            <li><strong>aria-label:</strong> Dynamic label based on current theme state</li>
            <li>
              <strong>aria-pressed:</strong> Indicates toggle state (true when dark mode is active)
            </li>
            <li><strong>Tooltip:</strong> Shows the action that will be performed on click</li>
            <li>
              <strong>Keyboard:</strong> Fully accessible via keyboard (Enter/Space to toggle)
            </li>
          </ul>
        </mat-card-content>
      </mat-card>

      <h2>CSS Classes</h2>
      <mat-card class="api-card">
        <mat-card-content>
          <table class="api-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>.acp-theme-toggle</code></td>
                <td>Applied to the host element for custom styling</td>
              </tr>
            </tbody>
          </table>
        </mat-card-content>
      </mat-card>
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

      p {
        margin-bottom: 16px;
        line-height: 1.6;
      }

      code {
        background: var(--mat-sys-surface-container);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Roboto Mono', monospace;
        font-size: 14px;
      }

      .api-card {
        margin-bottom: 24px;
      }

      .api-table {
        width: 100%;
        border-collapse: collapse;
      }

      .api-table th,
      .api-table td {
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid var(--mat-sys-outline-variant);
      }

      .api-table th {
        font-weight: 500;
        color: var(--mat-sys-on-surface);
        background: var(--mat-sys-surface-container);
      }

      .api-table td {
        color: var(--mat-sys-on-surface-variant);
      }

      .api-table tr:last-child td {
        border-bottom: none;
      }

      .a11y-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .a11y-list li {
        padding: 12px 0;
        border-bottom: 1px solid var(--mat-sys-outline-variant);
        line-height: 1.6;
      }

      .a11y-list li:last-child {
        border-bottom: none;
      }
    `,
  ],
})
export class ThemeToggleApi {}
