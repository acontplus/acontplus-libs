import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AcpAlert } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-alert-overview',
  imports: [AcpAlert, MatCardModule, MatTabsModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Alert</app-doc-heading>

      <p class="docs-component-description">
        Flexible alert component with multiple types and dismissible option. Supports default, info,
        success, warning, and danger alert types.
      </p>

      <h2>Alert Types</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="alert-column">
            <acp-alert type="default">
              <strong>Default Alert:</strong> This is a default alert message.
            </acp-alert>
            <acp-alert type="info">
              <strong>Info Alert:</strong> This is an informational alert message.
            </acp-alert>
            <acp-alert type="success">
              <strong>Success Alert:</strong> Operation completed successfully!
            </acp-alert>
            <acp-alert type="warning">
              <strong>Warning Alert:</strong> Please review this warning message.
            </acp-alert>
            <acp-alert type="danger">
              <strong>Danger Alert:</strong> An error has occurred.
            </acp-alert>
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="alertTypesCode" [language]="'typescript'" />

      <h2>Dismissible Alerts</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="alert-column">
            <acp-alert type="info" [dismissible]="true" (closed)="onAlertClosed('info')">
              <strong>Dismissible Info Alert:</strong> Click the close button to dismiss this alert.
            </acp-alert>
            <acp-alert type="success" [dismissible]="true" (closed)="onAlertClosed('success')">
              <strong>Dismissible Success Alert:</strong> This alert can be closed.
            </acp-alert>
            <acp-alert type="warning" [dismissible]="true" (closed)="onAlertClosed('warning')">
              <strong>Dismissible Warning Alert:</strong> You can dismiss this warning.
            </acp-alert>
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="dismissibleAlertsCode" [language]="'typescript'" />

      <h2>Alert with Elevation</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="alert-column">
            <acp-alert type="info" [elevation]="0">
              <strong>Elevation 0:</strong> No shadow elevation.
            </acp-alert>
            <acp-alert type="success" [elevation]="4">
              <strong>Elevation 4:</strong> Subtle shadow elevation.
            </acp-alert>
            <acp-alert type="warning" [elevation]="8">
              <strong>Elevation 8:</strong> Medium shadow elevation.
            </acp-alert>
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="elevationAlertsCode" [language]="'typescript'" />
    </div>
  `,
  styles: `
    .alert-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertOverview {
  alertTypesCode = `
<acp-alert type="default">
  <strong>Default Alert:</strong> This is a default alert message.
</acp-alert>

<acp-alert type="info">
  <strong>Info Alert:</strong> This is an informational alert message.
</acp-alert>

<acp-alert type="success">
  <strong>Success Alert:</strong> Operation completed successfully!
</acp-alert>

<acp-alert type="warning">
  <strong>Warning Alert:</strong> Please review this warning message.
</acp-alert>

<acp-alert type="danger">
  <strong>Danger Alert:</strong> An error has occurred.
</acp-alert>
  `;

  dismissibleAlertsCode = `
<acp-alert type="info" [dismissible]="true" (closed)="onAlertClosed('info')">
  <strong>Dismissible Info Alert:</strong> Click the close button to dismiss this alert.
</acp-alert>

<acp-alert type="success" [dismissible]="true" (closed)="onAlertClosed('success')">
  <strong>Dismissible Success Alert:</strong> This alert can be closed.
</acp-alert>

<acp-alert type="warning" [dismissible]="true" (closed)="onAlertClosed('warning')">
  <strong>Dismissible Warning Alert:</strong> You can dismiss this warning.
</acp-alert>
  `;

  elevationAlertsCode = `
<acp-alert type="info" [elevation]="0">
  <strong>Elevation 0:</strong> No shadow elevation.
</acp-alert>

<acp-alert type="success" [elevation]="4">
  <strong>Elevation 4:</strong> Subtle shadow elevation.
</acp-alert>

<acp-alert type="warning" [elevation]="8">
  <strong>Elevation 8:</strong> Medium shadow elevation.
</acp-alert>
  `;

  onAlertClosed(type: string): void {
    console.log(`Alert of type "${type}" was closed`);
  }
}
