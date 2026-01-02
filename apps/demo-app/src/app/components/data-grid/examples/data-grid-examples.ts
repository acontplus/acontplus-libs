import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {
  DataGrid,
  DataGridColumn,
  DataGridRowClassFormatter,
  DataGridRowSelectionFormatter,
} from '@acontplus/ng-components';
import { DocHeading } from '../../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../../shared/code-example/code-example';

interface DemoData {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  disableSelection?: boolean;
}

@Component({
  selector: 'app-data-grid-examples',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    DataGrid,
    DocHeading,
    CodeExample,
  ],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Data Grid Examples</app-doc-heading>

      <!-- Basic Example -->
      <h2>Basic Usage</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid [data]="basicData" [columns]="basicColumns" />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="basicCode" [language]="'typescript'" />

      <!-- Row Selection -->
      <h2>Row Selection</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="selection-info">
            <span>Selected: {{ selectedRows().length }} items</span>
            @if (selectedRows().length > 0) {
              <button mat-button (click)="clearSelection()">Clear</button>
            }
          </div>
          <acp-data-grid
            [data]="demoData"
            [columns]="selectionColumns"
            [rowSelectable]="true"
            [multiSelectable]="true"
            [rowSelectionFormatter]="rowSelectionFormatter"
            (rowSelectedChange)="onRowSelected($event)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="selectionCode" [language]="'typescript'" />

      <!-- Sorting -->
      <h2>Sorting</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="demoData"
            [columns]="sortableColumns"
            [sortOnFront]="true"
            sortActive="name"
            sortDirection="asc"
            (sortChange)="onSortChange($event)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="sortingCode" [language]="'typescript'" />

      <!-- Pagination -->
      <h2>Pagination</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="paginatedData"
            [columns]="basicColumns"
            [showPaginator]="true"
            [pageSize]="5"
            [pageSizeOptions]="[5, 10, 25]"
            (page)="onPageChange($event)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="paginationCode" [language]="'typescript'" />

      <!-- Server-side Pagination -->
      <h2>Server-side Pagination</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="serverData()"
            [columns]="basicColumns"
            [showPaginator]="true"
            [pageOnFront]="false"
            [length]="totalItems"
            [pageSize]="5"
            [loading]="isLoading()"
            (page)="onServerPageChange($event)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="serverPaginationCode" [language]="'typescript'" />

      <!-- Row Styling -->
      <h2>Row Styling</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="styledData"
            [columns]="styledColumns"
            [rowClassFormatter]="rowClassFormatter"
            [rowStriped]="true"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="rowStylingCode" [language]="'typescript'" />

      <!-- Expandable Rows -->
      <h2>Expandable Rows</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="demoData.slice(0, 5)"
            [columns]="basicColumns"
            [expandable]="true"
            [expansionTemplate]="expansionTpl"
            [closeOthersOnExpand]="true"
          />

          <ng-template #expansionTpl let-row>
            <div class="expansion-content">
              <h4>Details for {{ row.name }}</h4>
              <p><strong>Description:</strong> {{ row.description }}</p>
              <p><strong>Category:</strong> {{ row.category }}</p>
              <p><strong>Created:</strong> {{ row.createdAt | date: 'medium' }}</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="expandableCode" [language]="'typescript'" />

      <!-- Custom Cell Templates -->
      <h2>Custom Cell Templates</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="demoData.slice(0, 5)"
            [columns]="templateColumns"
            [cellTemplate]="{ status: statusTpl, actions: actionsTpl }"
          />

          <ng-template #statusTpl let-rowData="rowData">
            <mat-chip [class]="'status-' + rowData.status">
              {{ rowData.status | titlecase }}
            </mat-chip>
          </ng-template>

          <ng-template #actionsTpl let-rowData="rowData">
            <button mat-icon-button (click)="onEdit(rowData); $event.stopPropagation()">
              <mat-icon>edit</mat-icon>
            </button>
            <button
              mat-icon-button
              color="warn"
              (click)="onDelete(rowData); $event.stopPropagation()"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </ng-template>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="cellTemplateCode" [language]="'typescript'" />

      <!-- Toolbar -->
      <h2>Toolbar with Column Menu</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="demoData.slice(0, 5)"
            [columns]="basicColumns"
            [showToolbar]="true"
            [showColumnMenuButton]="true"
            toolbarTitle="Products"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="toolbarCode" [language]="'html'" />

      <!-- Cell Selection -->
      <h2>Cell Selection</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="demoData.slice(0, 5)"
            [columns]="basicColumns"
            [cellSelectable]="true"
            (cellClick)="onCellClick($event)"
          />
          @if (lastCellClick()) {
            <p class="cell-info">Last cell clicked: {{ lastCellClick() }}</p>
          }
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="cellSelectionCode" [language]="'typescript'" />

      <!-- Keyboard Navigation -->
      <h2>Keyboard Navigation</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <p class="instruction">Use arrow keys to navigate, Enter to select</p>
          <acp-data-grid
            [data]="demoData.slice(0, 5)"
            [columns]="basicColumns"
            [keyboardNavigation]="true"
            [highlightedRowIndex]="highlightedIndex()"
            (focusedRowChange)="onFocusedRowChange($event)"
          />
          <p class="cell-info">Focused row: {{ focusedIndex() }}</p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="keyboardNavCode" [language]="'html'" />
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

      .example-card {
        margin-bottom: 16px;
      }

      .selection-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: var(--mat-sys-surface-container);
        border-radius: 4px;
      }

      .expansion-content {
        padding: 1rem;
        background: var(--mat-sys-surface-container-low);
        border-radius: 4px;
        margin: 0.5rem 0;
      }

      .cell-info,
      .instruction {
        margin-top: 8px;
        color: var(--mat-sys-on-surface-variant);
      }

      .status-pending {
        background-color: #fff3e0 !important;
        color: #e65100 !important;
      }
      .status-processing {
        background-color: #e3f2fd !important;
        color: #1565c0 !important;
      }
      .status-completed {
        background-color: #e8f5e9 !important;
        color: #2e7d32 !important;
      }
      .status-failed {
        background-color: #ffebee !important;
        color: #c62828 !important;
      }

      ::ng-deep .row-completed {
        background-color: #e8f5e9;
      }
      ::ng-deep .row-pending {
        background-color: #fff3e0;
      }
      ::ng-deep .row-failed {
        background-color: #ffebee;
      }
    `,
  ],
})
export class DataGridExamples {
  // Signals
  selectedRows = signal<DemoData[]>([]);
  isLoading = signal(false);
  serverData = signal<DemoData[]>([]);
  lastCellClick = signal<string>('');
  highlightedIndex = signal(-1);
  focusedIndex = signal(-1);

  totalItems = 50;

  // Data
  basicData = this.generateData(5);
  demoData = this.generateData(10);
  paginatedData = this.generateData(25);
  styledData = this.generateData(8);

  // Columns
  basicColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '80px' },
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price', type: 'currency' },
    { field: 'quantity', header: 'Qty', type: 'number', width: '80px' },
  ];

  selectionColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '80px' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
  ];

  sortableColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'price', header: 'Price', type: 'currency', sortable: true },
    { field: 'createdAt', header: 'Created', type: 'date', sortable: true },
  ];

  styledColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'category', header: 'Category' },
  ];

  templateColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'actions', header: 'Actions', width: '120px' },
  ];

  // Formatters
  rowClassFormatter: DataGridRowClassFormatter = {
    'row-completed': (row: DemoData) => row.status === 'completed',
    'row-pending': (row: DemoData) => row.status === 'pending',
    'row-failed': (row: DemoData) => row.status === 'failed',
  };

  rowSelectionFormatter: DataGridRowSelectionFormatter = {
    disabled: (row: DemoData) => row.disableSelection === true,
    hideCheckbox: (row: DemoData) => row.status === 'failed',
  };

  constructor() {
    this.loadServerData(0, 5);
  }

  private generateData(count: number): DemoData[] {
    const statuses: DemoData['status'][] = ['pending', 'processing', 'completed', 'failed'];
    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports'];

    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      description: `Description for product ${i + 1}`,
      price: Math.round(Math.random() * 1000 * 100) / 100,
      quantity: Math.floor(Math.random() * 100),
      category: categories[i % categories.length],
      status: statuses[i % statuses.length],
      createdAt: new Date(Date.now() - Math.random() * 10000000000),
      disableSelection: i === 1,
    }));
  }

  private loadServerData(pageIndex: number, pageSize: number): void {
    this.isLoading.set(true);
    setTimeout(() => {
      const start = pageIndex * pageSize;
      this.serverData.set(
        Array.from({ length: pageSize }, (_, i) => ({
          id: start + i + 1,
          name: `Server Item ${start + i + 1}`,
          description: `Server description ${start + i + 1}`,
          price: Math.round(Math.random() * 500 * 100) / 100,
          quantity: Math.floor(Math.random() * 50),
          category: 'Server Category',
          status: 'completed' as const,
          createdAt: new Date(),
        })),
      );
      this.isLoading.set(false);
    }, 500);
  }

  // Event handlers
  onRowSelected(rows: DemoData[]): void {
    this.selectedRows.set(rows);
  }

  clearSelection(): void {
    this.selectedRows.set([]);
  }

  onSortChange(sort: Sort): void {
    console.info('Sort changed:', sort);
  }

  onPageChange(event: PageEvent): void {
    console.info('Page changed:', event);
  }

  onServerPageChange(event: PageEvent): void {
    this.loadServerData(event.pageIndex, event.pageSize);
  }

  onEdit(row: DemoData): void {
    console.info('Edit:', row);
  }

  onDelete(row: DemoData): void {
    console.info('Delete:', row);
  }

  onCellClick(event: { row: DemoData; column: DataGridColumn<DemoData> }): void {
    this.lastCellClick.set(
      `${event.column.field}: ${event.row[event.column.field as keyof DemoData]}`,
    );
  }

  onFocusedRowChange(event: { row: DemoData; index: number }): void {
    this.focusedIndex.set(event.index);
    this.highlightedIndex.set(event.index);
  }

  // Code examples
  basicCode = `// Basic Data Grid
columns: DataGridColumn[] = [
  { field: 'id', header: 'ID', type: 'number', width: '80px' },
  { field: 'name', header: 'Name' },
  { field: 'price', header: 'Price', type: 'currency' },
  { field: 'quantity', header: 'Qty', type: 'number' },
];

<acp-data-grid [data]="data" [columns]="columns" />`;

  selectionCode = `// Row Selection
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowSelectable]="true"
  [multiSelectable]="true"
  [rowSelectionFormatter]="rowSelectionFormatter"
  (rowSelectedChange)="onRowSelected($event)"
/>

rowSelectionFormatter = {
  disabled: (row) => row.disableSelection,
  hideCheckbox: (row) => row.status === 'failed',
};`;

  sortingCode = `// Sortable Columns
columns: DataGridColumn[] = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'price', header: 'Price', sortable: true },
];

<acp-data-grid
  [data]="data"
  [columns]="columns"
  [sortOnFront]="true"
  sortActive="name"
  sortDirection="asc"
  (sortChange)="onSortChange($event)"
/>`;

  paginationCode = `// Client-side Pagination
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [showPaginator]="true"
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 25]"
  (page)="onPageChange($event)"
/>`;

  serverPaginationCode = `// Server-side Pagination
<acp-data-grid
  [data]="serverData()"
  [columns]="columns"
  [showPaginator]="true"
  [pageOnFront]="false"
  [length]="totalItems"
  [pageSize]="5"
  [loading]="isLoading()"
  (page)="onServerPageChange($event)"
/>

onServerPageChange(event: PageEvent) {
  this.loadServerData(event.pageIndex, event.pageSize);
}`;

  rowStylingCode = `// Row Styling with Class Formatter
rowClassFormatter = {
  'row-completed': (row) => row.status === 'completed',
  'row-pending': (row) => row.status === 'pending',
  'row-failed': (row) => row.status === 'failed',
};

<acp-data-grid
  [data]="data"
  [columns]="columns"
  [rowClassFormatter]="rowClassFormatter"
  [rowStriped]="true"
/>`;

  expandableCode = `// Expandable Rows
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [expandable]="true"
  [expansionTemplate]="expansionTpl"
  [closeOthersOnExpand]="true"
/>

<ng-template #expansionTpl let-row>
  <div class="expansion-content">
    <h4>{{ row.name }}</h4>
    <p>{{ row.description }}</p>
  </div>
</ng-template>`;

  cellTemplateCode = `// Custom Cell Templates
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [cellTemplate]="{ status: statusTpl, actions: actionsTpl }"
/>

<ng-template #statusTpl let-rowData="rowData">
  <mat-chip [class]="'status-' + rowData.status">
    {{ rowData.status | titlecase }}
  </mat-chip>
</ng-template>

<ng-template #actionsTpl let-rowData="rowData">
  <button mat-icon-button (click)="onEdit(rowData)">
    <mat-icon>edit</mat-icon>
  </button>
</ng-template>`;

  toolbarCode = `<acp-data-grid
  [data]="data"
  [columns]="columns"
  [showToolbar]="true"
  [showColumnMenuButton]="true"
  toolbarTitle="Products"
/>`;

  cellSelectionCode = `// Cell Selection
<acp-data-grid
  [data]="data"
  [columns]="columns"
  [cellSelectable]="true"
  (cellClick)="onCellClick($event)"
/>

onCellClick(event: { row: T; column: DataGridColumn }) {
  console.log('Cell clicked:', event.column.field, event.row);
}`;

  keyboardNavCode = `<acp-data-grid
  [data]="data"
  [columns]="columns"
  [keyboardNavigation]="true"
  [highlightedRowIndex]="highlightedIndex()"
  (focusedRowChange)="onFocusedRowChange($event)"
/>`;
}
