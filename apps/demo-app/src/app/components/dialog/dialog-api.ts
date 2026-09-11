import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

interface ApiRow {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-dialog-api',
  imports: [DocHeading, MatTableModule],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Dialog API</app-doc-heading>

      <h2>AdvancedDialogService</h2>
      <table mat-table [dataSource]="serviceApi" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let row">
            <code>{{ row.name }}</code>
          </td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let row">
            <code>{{ row.type }}</code>
          </td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let row">{{ row.description }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>

      <h2>DialogWrapperConfig</h2>
      <table mat-table [dataSource]="wrapperConfigApi" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let row">
            <code>{{ row.name }}</code>
          </td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let row">
            <code>{{ row.type }}</code>
          </td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let row">{{ row.description }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>

      <h2>MatCustomDialogConfig</h2>
      <table mat-table [dataSource]="dialogConfigApi" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let row">
            <code>{{ row.name }}</code>
          </td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let row">
            <code>{{ row.type }}</code>
          </td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let row">{{ row.description }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
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
        margin-bottom: 24px;
      }
    `,
  ],
})
export class DialogApi {
  columns = ['name', 'type', 'description'];

  serviceApi: ApiRow[] = [
    {
      name: 'open(component, config)',
      type: 'Promise<MatDialogRef<T, R>>',
      description: 'Opens a component directly in a Material dialog.',
    },
    {
      name: 'openInWrapper(wrapperConfig, config)',
      type: 'Promise<MatDialogRef<DialogWrapper, R>>',
      description: 'Opens a component inside the branded DialogWrapper with header.',
    },
    {
      name: 'openAndGetResult(component, config)',
      type: 'Promise<R | undefined>',
      description: 'Opens a dialog and resolves with the value passed to close().',
    },
    {
      name: 'closeAll()',
      type: 'void',
      description: 'Closes all currently open dialogs.',
    },
  ];

  wrapperConfigApi: ApiRow[] = [
    {
      name: 'component',
      type: 'Type<unknown>',
      description: 'Component rendered dynamically inside the wrapper.',
    },
    { name: 'title', type: 'string', description: 'Title shown in the dialog header.' },
    {
      name: 'icon',
      type: 'string',
      description: 'Optional Material icon shown next to the title.',
    },
    {
      name: 'data',
      type: 'T',
      description: 'Payload assigned to the content component "data" property.',
    },
    {
      name: 'hideHeader',
      type: 'boolean',
      description: 'Hides the header (title, icon, close button). Default: false.',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      description: 'Shows the close button in the header. Default: true.',
    },
    {
      name: 'closeAriaLabel',
      type: 'string',
      description: 'Accessible label for the close button. Default: "Close dialog".',
    },
  ];

  dialogConfigApi: ApiRow[] = [
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full'",
      description: 'Preset dialog width. "full" forces a 100vw/100vh dialog.',
    },
    {
      name: 'width / height / minWidth / maxWidth / maxHeight',
      type: 'string',
      description: 'Explicit dimensions that override the size preset.',
    },
    {
      name: 'isMobileFullScreen',
      type: 'boolean',
      description: 'Opens the dialog full screen on handset breakpoints.',
    },
    {
      name: 'backdropClickClosable',
      type: 'boolean',
      description: 'Whether clicking the backdrop closes the dialog. Default: true.',
    },
    {
      name: 'escapeKeyClosable',
      type: 'boolean',
      description:
        'Whether pressing Escape closes the dialog. Independent from backdropClickClosable. Default: true.',
    },
    {
      name: 'data',
      type: 'T',
      description: 'Payload injected via MAT_DIALOG_DATA in the content component.',
    },
    {
      name: 'hasBackdrop / backdropClass / panelClass',
      type: 'boolean | string | string[]',
      description: 'Backdrop behavior and CSS classes applied to the overlay.',
    },
    {
      name: 'autoFocus / restoreFocus',
      type: "boolean | 'first-tabbable' | 'dialog' | 'first-heading'",
      description: 'Focus management options forwarded to MatDialog.',
    },
    {
      name: 'ariaLabel / ariaLabelledBy / ariaDescribedBy / role',
      type: "string | 'dialog' | 'alertdialog'",
      description: 'Accessibility attributes for the dialog.',
    },
    {
      name: 'scrollStrategy',
      type: 'ScrollStrategy',
      description: 'CDK scroll strategy. Default: block.',
    },
    {
      name: 'enterAnimationDuration / exitAnimationDuration',
      type: 'number | string',
      description: 'Animation timings. Defaults: 300ms / 200ms.',
    },
  ];
}
