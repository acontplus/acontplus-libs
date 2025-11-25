import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

interface ApiProperty {
  name: string;
  type: string;
  description: string;
  default?: string;
}

@Component({
  selector: 'app-button-api',
  imports: [CommonModule, MatTableModule, DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Button API</app-doc-heading>

      <h2>Inputs</h2>
      <table mat-table [dataSource]="inputs" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.name }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.type }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>

        <ng-container matColumnDef="default">
          <th mat-header-cell *matHeaderCellDef>Default</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.default || '-' }}</code>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <h2>Outputs</h2>
      <table mat-table [dataSource]="outputs" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.name }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.type }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="outputColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: outputColumns"></tr>
      </table>
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

      .api-table {
        width: 100%;
        margin-bottom: 32px;
      }

      code {
        background-color: var(--mat-sys-surface-container);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Roboto Mono', monospace;
        font-size: 13px;
      }

      th {
        font-weight: 600;
        color: var(--mat-sys-on-surface-variant);
      }
    `,
  ],
})
export class ButtonApi {
  displayedColumns = ['name', 'type', 'description', 'default'];
  outputColumns = ['name', 'type', 'description'];

  inputs: ApiProperty[] = [
    {
      name: 'text',
      type: 'string',
      description: 'Button text label',
      default: "''",
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
      description: 'Button color variant',
      default: "'primary'",
    },
    {
      name: 'matStyle',
      type: "'filled' | 'elevated' | 'outlined' | 'text' | 'tonal' | 'icon' | 'fab' | 'mini-fab' | 'extended-fab'",
      description: 'Material Design button style',
      default: "'filled'",
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Material icon name',
      default: 'undefined',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether button is disabled',
      default: 'false',
    },
    {
      name: 'title',
      type: 'string',
      description: 'Tooltip text',
      default: "''",
    },
    {
      name: 'reportFormat',
      type: 'REPORT_FORMAT',
      description: 'Report format for automatic icon and color',
      default: 'undefined',
    },
  ];

  outputs: ApiProperty[] = [
    {
      name: 'handleClick',
      type: 'EventEmitter<MouseEvent>',
      description: 'Emits when button is clicked',
    },
  ];
}
