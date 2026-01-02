import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {
  DataGrid,
  TabulatorTable,
  DataGridColumn,
  DataGridRowClassFormatter,
  DataGridRowSelectionFormatter,
} from '@acontplus/ng-components';

interface DemoData {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  rowStyle?: { backgroundColor?: string; color?: string; [key: string]: any };
  disableSelection?: boolean;
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    DataGrid,
    TabulatorTable,
  ],
  template: `
    <div class="demo-container">
      <h1>DataGrid Examples</h1>

      <mat-tab-group>
        <!-- Basic Example -->
        <mat-tab label="Basic">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Basic Data Grid</mat-card-title>
              <mat-card-subtitle>Simple table with columns and data</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-data-grid [data]="basicData" [columns]="basicColumns" />
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <!-- Row Selection Example -->
        <mat-tab label="Row Selection">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Row Selection</mat-card-title>
              <mat-card-subtitle>Single and multi-select with checkbox</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="selection-info">
                <span>Selected: {{ selectedRows().length }} items</span>
                @if (selectedRows().length > 0) {
                  <button mat-button (click)="clearSelection()">Clear Selection</button>
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
        </mat-tab>

        <!-- Sorting Example -->
        <mat-tab label="Sorting">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Sortable Columns</mat-card-title>
              <mat-card-subtitle>Click column headers to sort</mat-card-subtitle>
            </mat-card-header>
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
        </mat-tab>

        <!-- Pagination Example -->
        <mat-tab label="Pagination">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Pagination</mat-card-title>
              <mat-card-subtitle>Client-side and server-side pagination</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <h3>Client-side Pagination</h3>
              <acp-data-grid
                [data]="paginatedData"
                [columns]="basicColumns"
                [showPaginator]="true"
                [pageSize]="5"
                [pageSizeOptions]="[5, 10, 25]"
                [showFirstLastButtons]="true"
                (page)="onPageChange($event)"
              />

              <h3 style="margin-top: 2rem">Server-side Pagination</h3>
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
        </mat-tab>

        <!-- Row Styling Example -->
        <mat-tab label="Row Styling">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Row Styling & Formatting</mat-card-title>
              <mat-card-subtitle>Dynamic row classes and styles based on data</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-data-grid
                [data]="styledData"
                [columns]="styledColumns"
                [rowClassFormatter]="rowClassFormatter"
                [rowHover]="true"
                [rowStriped]="true"
              />
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <!-- Expandable Rows Example -->
        <mat-tab label="Expandable Rows">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Expandable Rows</mat-card-title>
              <mat-card-subtitle>Click row to expand details</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-data-grid
                [data]="demoData"
                [columns]="basicColumns"
                [expandable]="true"
                [expansionTemplate]="expansionTpl"
                [closeOthersOnExpand]="true"
                (expansionChange)="onExpansionChange($event)"
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
        </mat-tab>

        <!-- Custom Cell Templates -->
        <mat-tab label="Cell Templates">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Custom Cell Templates</mat-card-title>
              <mat-card-subtitle>Custom rendering with templates</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-data-grid
                [data]="demoData"
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
        </mat-tab>

        <!-- Toolbar Example -->
        <mat-tab label="Toolbar">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Grid with Toolbar</mat-card-title>
              <mat-card-subtitle>Built-in toolbar with column menu</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-data-grid
                [data]="demoData"
                [columns]="basicColumns"
                [showToolbar]="true"
                [showColumnMenuButton]="true"
                toolbarTitle="Products List"
              />
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <!-- Cell Selection Example -->
        <mat-tab label="Cell Selection">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Cell Selection</mat-card-title>
              <mat-card-subtitle>Select individual cells</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-data-grid
                [data]="demoData"
                [columns]="basicColumns"
                [cellSelectable]="true"
                (cellClick)="onCellClick($event)"
                (cellSelectedChange)="onCellSelectedChange($event)"
              />
              @if (lastCellClick()) {
                <p>Last cell clicked: {{ lastCellClick() }}</p>
              }
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <!-- Keyboard Navigation -->
        <mat-tab label="Keyboard Nav">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Keyboard Navigation</mat-card-title>
              <mat-card-subtitle>Use arrow keys to navigate, Enter to select</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-data-grid
                [data]="demoData"
                [columns]="basicColumns"
                [keyboardNavigation]="true"
                [highlightedRowIndex]="highlightedIndex()"
                (focusedRowChange)="onFocusedRowChange($event)"
              />
              <p>Focused row index: {{ focusedIndex() }}</p>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <!-- Tabulator Comparison -->
        <mat-tab label="Tabulator">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Tabulator Table</mat-card-title>
              <mat-card-subtitle>Alternative table component</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <acp-tabulator-table [data]="demoData" [columns]="tabulatorColumns" [height]="300" />
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      .demo-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        h1 {
          margin-bottom: 1rem;
        }
      }

      mat-card {
        margin: 1rem 0;
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

      ::ng-deep .row-pending {
        background-color: #fff3e0;
      }
      ::ng-deep .row-completed {
        background-color: #e8f5e9;
      }
      ::ng-deep .row-failed {
        background-color: #ffebee;
      }
    `,
  ],
})
export class TableDemoComponent {
  // Signals
  selectedRows = signal<DemoData[]>([]);
  isLoading = signal(false);
  serverData = signal<DemoData[]>([]);
  lastCellClick = signal<string>('');
  highlightedIndex = signal(-1);
  focusedIndex = signal(-1);

  // Data
  totalItems = 50;

  basicData: DemoData[] = this.generateData(5);
  demoData: DemoData[] = this.generateData(10);
  paginatedData: DemoData[] = this.generateData(25);
  styledData: DemoData[] = this.generateData(8);

  // Basic columns
  basicColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '80px' },
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price', type: 'currency' },
    { field: 'quantity', header: 'Qty', type: 'number', width: '80px' },
  ];

  // Selection columns
  selectionColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '80px' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
  ];

  // Sortable columns
  sortableColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'price', header: 'Price', type: 'currency', sortable: true },
    { field: 'createdAt', header: 'Created', type: 'date', sortable: true },
  ];

  // Styled columns
  styledColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'category', header: 'Category' },
  ];

  // Template columns
  templateColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'actions', header: 'Actions', width: '120px' },
  ];

  // Tabulator columns
  tabulatorColumns = [
    { title: 'ID', field: 'id', width: 80 },
    { title: 'Name', field: 'name', width: 200 },
    { title: 'Price', field: 'price', width: 100, formatter: 'money' },
    { title: 'Status', field: 'status', width: 120 },
  ];

  // Row formatters
  rowClassFormatter: DataGridRowClassFormatter = {
    completed: (row: DemoData) => row.status === 'completed',
    pending: (row: DemoData) => row.status === 'pending',
    failed: (row: DemoData) => row.status === 'failed',
  };

  rowSelectionFormatter: DataGridRowSelectionFormatter = {
    disabled: (row: DemoData) => row.disableSelection === true,
    hideCheckbox: (row: DemoData) => row.status === 'failed',
  };

  constructor() {
    // Initialize server data
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
    // Simulate server delay
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
    console.info('Selected rows:', rows);
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
    console.info('Server page changed:', event);
    this.loadServerData(event.pageIndex, event.pageSize);
  }

  onExpansionChange(event: any): void {
    console.info('Expansion changed:', event);
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
    console.info('Cell clicked:', event);
  }

  onCellSelectedChange(cells: any[]): void {
    console.info('Cell selection changed:', cells);
  }

  onFocusedRowChange(event: { row: DemoData; index: number }): void {
    this.focusedIndex.set(event.index);
    console.info('Focused row:', event);
  }
}
