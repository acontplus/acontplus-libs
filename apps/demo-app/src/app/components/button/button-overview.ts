import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@acontplus/ng-components';
import { REPORT_FORMAT } from '@acontplus/ui-kit';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-button-overview',
  imports: [CommonModule, Button, MatCardModule, MatTabsModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Button</app-doc-heading>

      <p class="docs-component-description">
        Flexible button component with multiple Material Design variants and built-in report format
        support. Supports all Material button styles including filled, elevated, outlined, text, and
        FAB variants.
      </p>

      <h2>Basic Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button [text]="'Primary'" [variant]="'primary'" [matStyle]="'filled'" />
            <acp-button [text]="'Secondary'" [variant]="'secondary'" [matStyle]="'filled'" />
            <acp-button [text]="'Success'" [variant]="'success'" [matStyle]="'filled'" />
            <acp-button [text]="'Danger'" [variant]="'danger'" [matStyle]="'filled'" />
            <acp-button [text]="'Warning'" [variant]="'warning'" [matStyle]="'filled'" />
            <acp-button [text]="'Info'" [variant]="'info'" [matStyle]="'filled'" />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="basicButtonCode" [language]="'typescript'" />

      <h2>Material Button Styles</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button [text]="'Filled'" [variant]="'primary'" [matStyle]="'filled'" />
            <acp-button [text]="'Elevated'" [variant]="'primary'" [matStyle]="'elevated'" />
            <acp-button [text]="'Outlined'" [variant]="'primary'" [matStyle]="'outlined'" />
            <acp-button [text]="'Text'" [variant]="'primary'" [matStyle]="'text'" />
            <acp-button [text]="'Tonal'" [variant]="'primary'" [matStyle]="'tonal'" />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="materialStylesCode" [language]="'typescript'" />

      <h2>Buttons with Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button
              [text]="'Save'"
              [icon]="'save'"
              [variant]="'primary'"
              [matStyle]="'filled'"
            />
            <acp-button
              [text]="'Delete'"
              [icon]="'delete'"
              [variant]="'danger'"
              [matStyle]="'filled'"
            />
            <acp-button
              [text]="'Edit'"
              [icon]="'edit'"
              [variant]="'secondary'"
              [matStyle]="'outlined'"
            />
            <acp-button
              [icon]="'add'"
              [variant]="'primary'"
              [matStyle]="'fab'"
              [title]="'Add Item'"
            />
            <acp-button
              [icon]="'settings'"
              [variant]="'secondary'"
              [matStyle]="'mini-fab'"
              [title]="'Settings'"
            />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="iconButtonsCode" [language]="'typescript'" />

      <h2>Report Format Buttons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button
              [reportFormat]="REPORT_FORMAT.PDF"
              [text]="'Export PDF'"
              (handleClick)="onExport('PDF')"
            />
            <acp-button
              [reportFormat]="REPORT_FORMAT.EXCEL"
              [text]="'Export Excel'"
              (handleClick)="onExport('Excel')"
            />
            <acp-button
              [reportFormat]="REPORT_FORMAT.WORD"
              [text]="'Export Word'"
              (handleClick)="onExport('Word')"
            />
            <acp-button
              [reportFormat]="REPORT_FORMAT.CSV"
              [text]="'Export CSV'"
              (handleClick)="onExport('CSV')"
            />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="reportButtonsCode" [language]="'typescript'" />

      <h2>Disabled State</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="button-row">
            <acp-button [text]="'Enabled'" [variant]="'primary'" [disabled]="false" />
            <acp-button [text]="'Disabled'" [variant]="'primary'" [disabled]="true" />
            <acp-button
              [text]="'Disabled'"
              [icon]="'save'"
              [variant]="'success'"
              [disabled]="true"
            />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="disabledButtonsCode" [language]="'typescript'" />
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

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
    `,
  ],
})
export class ButtonOverview {
  REPORT_FORMAT = REPORT_FORMAT;

  basicButtonCode = `<acp-button
  [text]="'Primary'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [text]="'Secondary'"
  [variant]="'secondary'"
  [matStyle]="'filled'"
/>`;

  materialStylesCode = `<acp-button
  [text]="'Filled'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [text]="'Elevated'"
  [variant]="'primary'"
  [matStyle]="'elevated'"
/>
<acp-button
  [text]="'Outlined'"
  [variant]="'primary'"
  [matStyle]="'outlined'"
/>`;

  iconButtonsCode = `<acp-button
  [text]="'Save'"
  [icon]="'save'"
  [variant]="'primary'"
  [matStyle]="'filled'"
/>
<acp-button
  [icon]="'add'"
  [variant]="'primary'"
  [matStyle]="'fab'"
  [title]="'Add Item'"
/>`;

  reportButtonsCode = `import { REPORT_FORMAT } from '@acontplus/ng-components';

<acp-button
  [reportFormat]="REPORT_FORMAT.PDF"
  [text]="'Export PDF'"
  (handleClick)="onExport('PDF')"
/>
<acp-button
  [reportFormat]="REPORT_FORMAT.EXCEL"
  [text]="'Export Excel'"
  (handleClick)="onExport('Excel')"
/>`;

  disabledButtonsCode = `<acp-button
  [text]="'Enabled'"
  [variant]="'primary'"
  [disabled]="false"
/>
<acp-button
  [text]="'Disabled'"
  [variant]="'primary'"
  [disabled]="true"
/>`;

  onExport(format: string) {
    alert(`Exporting ${format}...`);
  }
}
