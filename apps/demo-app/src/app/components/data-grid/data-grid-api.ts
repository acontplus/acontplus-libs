import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

interface ApiProperty {
  name: string;
  type: string;
  description: string;
  default?: string;
}

@Component({
  selector: 'app-data-grid-api',
  imports: [MatTableModule, DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Data Grid API</app-doc-heading>

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

        <ng-container matColumnDef="default">
          <th mat-header-cell *matHeaderCellDef>Default</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.default || '-' }}</code>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <h2>DataGridColumn Interface</h2>
      <table mat-table [dataSource]="columnProperties" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Property</th>
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
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1400px;
      }

      h2 {
        margin-top: 32px;
        margin-bottom: 16px;
      }

      .api-table {
        width: 100%;
        margin-bottom: 24px;

        th,
        td {
          padding: 12px 16px;
        }

        code {
          background: var(--mat-sys-surface-container);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
        }
      }
    `,
  ],
})
export class DataGridApi {
  displayedColumns = ['name', 'type', 'description', 'default'];

  inputs: ApiProperty[] = [
    // Data Configuration
    {
      name: 'data',
      type: 'T[]',
      description: 'Array of data to display in the grid',
      default: '[]',
    },
    {
      name: 'columns',
      type: 'DataGridColumn<T>[]',
      description: 'Column definitions',
      default: '[]',
    },
    {
      name: 'length',
      type: 'number',
      description: 'Total number of items (for server-side pagination)',
      default: '0',
    },
    { name: 'loading', type: 'boolean', description: 'Shows loading state', default: 'false' },
    {
      name: 'emptyValuePlaceholder',
      type: 'string',
      description: 'Placeholder for empty cell values',
      default: "'-'",
    },
    {
      name: 'trackBy',
      type: 'TrackByFunction<any>',
      description: 'TrackBy function for ngFor optimization',
      default: '-',
    },

    // Toolbar
    { name: 'showToolbar', type: 'boolean', description: 'Shows the toolbar', default: 'false' },
    {
      name: 'showColumnMenuButton',
      type: 'boolean',
      description: 'Shows column visibility menu',
      default: 'true',
    },
    {
      name: 'toolbarTitle',
      type: 'string',
      description: 'Title displayed in toolbar',
      default: "''",
    },

    // Pagination
    { name: 'showPaginator', type: 'boolean', description: 'Shows the paginator', default: 'true' },
    {
      name: 'pageOnFront',
      type: 'boolean',
      description: 'Enable client-side pagination',
      default: 'true',
    },
    {
      name: 'pageIndex',
      type: 'number',
      description: 'Current page index (0-based)',
      default: '0',
    },
    { name: 'pageSize', type: 'number', description: 'Number of items per page', default: '10' },
    {
      name: 'pageSizeOptions',
      type: 'number[]',
      description: 'Page size options',
      default: '[5, 10, 20, 50]',
    },
    {
      name: 'showFirstLastButtons',
      type: 'boolean',
      description: 'Shows first/last page buttons',
      default: 'true',
    },
    {
      name: 'hidePageSize',
      type: 'boolean',
      description: 'Hides page size selector',
      default: 'false',
    },
    { name: 'pageDisabled', type: 'boolean', description: 'Disables pagination', default: 'false' },

    // Sorting
    {
      name: 'sortOnFront',
      type: 'boolean',
      description: 'Enable client-side sorting',
      default: 'true',
    },
    {
      name: 'sortActive',
      type: 'string',
      description: 'Initially sorted column field',
      default: "''",
    },
    {
      name: 'sortDirection',
      type: 'SortDirection',
      description: 'Initial sort direction',
      default: "''",
    },
    { name: 'sortDisabled', type: 'boolean', description: 'Disables sorting', default: 'false' },
    {
      name: 'sortDisableClear',
      type: 'boolean',
      description: 'Prevents clearing sort',
      default: 'false',
    },
    {
      name: 'sortStart',
      type: "'asc' | 'desc'",
      description: 'Default sort direction on first click',
      default: "'asc'",
    },

    // Row Selection
    {
      name: 'rowSelectable',
      type: 'boolean',
      description: 'Enables row selection',
      default: 'false',
    },
    {
      name: 'multiSelectable',
      type: 'boolean',
      description: 'Allows multi-row selection',
      default: 'true',
    },
    {
      name: 'multiSelectionWithClick',
      type: 'boolean',
      description: 'Toggle selection on row click',
      default: 'false',
    },
    {
      name: 'hideRowSelectionCheckbox',
      type: 'boolean',
      description: 'Hides selection checkboxes',
      default: 'false',
    },
    {
      name: 'disableRowClickSelection',
      type: 'boolean',
      description: 'Disables row click selection',
      default: 'false',
    },
    { name: 'rowSelected', type: 'T[]', description: 'Pre-selected rows', default: '[]' },
    {
      name: 'rowSelectionFormatter',
      type: 'DataGridRowSelectionFormatter',
      description: 'Formatter for row selection',
      default: '{}',
    },

    // Row Styling
    { name: 'rowHover', type: 'boolean', description: 'Enables row hover effect', default: 'true' },
    {
      name: 'rowStriped',
      type: 'boolean',
      description: 'Alternating row colors',
      default: 'false',
    },
    {
      name: 'rowClassFormatter',
      type: 'DataGridRowClassFormatter',
      description: 'Dynamic row CSS classes',
      default: '-',
    },
    {
      name: 'highlightedRowIndex',
      type: 'number',
      description: 'Index of highlighted row',
      default: '-1',
    },

    // Cell Selection
    {
      name: 'cellSelectable',
      type: 'boolean',
      description: 'Enables cell selection',
      default: 'false',
    },

    // Expansion
    { name: 'expandable', type: 'boolean', description: 'Enables row expansion', default: 'false' },
    {
      name: 'expansionTemplate',
      type: 'TemplateRef<any>',
      description: 'Template for expanded content',
      default: 'null',
    },
    {
      name: 'closeOthersOnExpand',
      type: 'boolean',
      description: 'Close other rows when expanding',
      default: 'false',
    },

    // Infinite Scroll
    {
      name: 'infiniteScroll',
      type: 'boolean',
      description: 'Enables infinite scroll',
      default: 'false',
    },
    {
      name: 'infiniteScrollThreshold',
      type: 'number',
      description: 'Scroll threshold (0-1)',
      default: '0.8',
    },
    {
      name: 'infiniteScrollDisabled',
      type: 'boolean',
      description: 'Disables infinite scroll',
      default: 'false',
    },

    // Keyboard Navigation
    {
      name: 'keyboardNavigation',
      type: 'boolean',
      description: 'Enables arrow key navigation',
      default: 'false',
    },

    // Templates
    {
      name: 'cellTemplate',
      type: 'Record<string, TemplateRef<any>>',
      description: 'Custom cell templates by field',
      default: '{}',
    },
    {
      name: 'headerTemplate',
      type: 'TemplateRef<any>',
      description: 'Custom header template',
      default: '-',
    },
    {
      name: 'noResultTemplate',
      type: 'TemplateRef<any>',
      description: 'Template for empty state',
      default: '-',
    },
    {
      name: 'paginationTemplate',
      type: 'TemplateRef<any>',
      description: 'Custom pagination template',
      default: '-',
    },
    {
      name: 'summaryTemplate',
      type: 'TemplateRef<any>',
      description: 'Summary row template',
      default: '-',
    },

    // Size
    {
      name: 'size',
      type: "'small' | 'medium' | 'normal'",
      description: 'Table density',
      default: "'normal'",
    },

    // Summary
    { name: 'showSummary', type: 'boolean', description: 'Shows summary row', default: 'false' },

    // No Result
    {
      name: 'noResultText',
      type: 'string',
      description: 'Empty state message',
      default: "'No records found'",
    },
  ];

  outputs: ApiProperty[] = [
    { name: 'page', type: 'EventEmitter<PageEvent>', description: 'Emits when page changes' },
    { name: 'sortChange', type: 'EventEmitter<Sort>', description: 'Emits when sort changes' },
    { name: 'rowClick', type: 'EventEmitter<T>', description: 'Emits when row is clicked' },
    {
      name: 'rowSelectedChange',
      type: 'EventEmitter<T[]>',
      description: 'Emits when row selection changes',
    },
    {
      name: 'selectionChange',
      type: 'EventEmitter<T[]>',
      description: 'Emits on selection model change',
    },
    {
      name: 'cellClick',
      type: 'EventEmitter<{row: T, column: DataGridColumn}>',
      description: 'Emits when cell is clicked',
    },
    {
      name: 'cellSelectedChange',
      type: 'EventEmitter<any[]>',
      description: 'Emits when cell selection changes',
    },
    {
      name: 'expansionChange',
      type: 'EventEmitter<any>',
      description: 'Emits when expansion state changes',
    },
    {
      name: 'rowContextMenu',
      type: 'EventEmitter<any>',
      description: 'Emits on right-click context menu',
    },
    {
      name: 'infiniteScrollLoad',
      type: 'EventEmitter<void>',
      description: 'Emits when infinite scroll threshold reached',
    },
    {
      name: 'focusedRowChange',
      type: 'EventEmitter<{row: T, index: number}>',
      description: 'Emits when focused row changes (keyboard nav)',
    },
  ];

  columnProperties: ApiProperty[] = [
    { name: 'field', type: 'string', description: 'Property name to display from data object' },
    { name: 'header', type: 'string', description: 'Column header text' },
    {
      name: 'type',
      type: 'string',
      description: "Data type: 'number', 'currency', 'date', 'boolean', etc.",
    },
    { name: 'typeParameter', type: 'object', description: 'Type-specific formatting options' },
    { name: 'width', type: 'string', description: "Column width (e.g., '100px', '20%')" },
    { name: 'minWidth', type: 'number', description: 'Minimum column width in pixels' },
    { name: 'maxWidth', type: 'number', description: 'Maximum column width in pixels' },
    {
      name: 'sortable',
      type: 'boolean',
      description: 'Enable sorting for this column',
      default: 'false',
    },
    { name: 'pinned', type: "'left' | 'right'", description: 'Pin column to side' },
    { name: 'hide', type: 'boolean', description: 'Hide the column', default: 'false' },
    { name: 'class', type: 'string', description: 'CSS class for the column' },
    {
      name: 'formatter',
      type: '(row: T, column: DataGridColumn) => string',
      description: 'Custom cell value formatter',
    },
  ];
}
