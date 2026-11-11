import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import {
  AcpContextMenu,
  AcpContextMenuItem,
  AcpContextMenuItemContext,
  AcpGridNavigationFor,
  DataGrid,
  DataGridColumn,
  DataGridRowClassFormatter,
  DataGridRowSelectionFormatter,
  DataGridSize,
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

interface KardexRow {
  establecimientoId: string;
  establecimiento: string;
  descripcion: string;
  codigo: string;
  entradasCantidad: number;
  entradasPrecio: number;
  salidasCantidad: number;
  salidasPrecio: number;
  saldoCantidad: number;
}

interface PivotRow {
  producto: string;
  sku: string;
  stock_EC_WH01: number;
  stock_EC_WH02: number;
  stock_PE_WH01: number;
  stock_PE_WH02: number;
}

@Component({
  selector: 'app-data-grid-examples',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    AcpGridNavigationFor,
    DataGrid,
    AcpContextMenu,
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

      <!-- Column Groups (Kardex) -->
      <h2>Column Groups (Kardex)</h2>
      <p class="instruction">
        Consecutive columns that share the same <code>group</code> path are merged under group
        headers, one row per level. Each level accepts a string, an
        <code>Observable&lt;string&gt;</code> or a function <code>(data) =&gt; label</code> for
        dynamic titles. <code>groupClass</code> styles each group header and propagates to its
        member columns' headers and cells.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <mat-button-toggle-group
            class="size-toggle"
            aria-label="Grid size"
            [value]="gridSize()"
            (change)="gridSize.set($event.value)"
          >
            @for (option of sizeOptions; track option) {
              <mat-button-toggle [value]="option">{{ option }}</mat-button-toggle>
            }
          </mat-button-toggle-group>
          <acp-data-grid
            [data]="kardexData"
            [columns]="kardexColumns"
            [size]="gridSize()"
            [showSummary]="true"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="columnGroupsCode" [language]="'typescript'" />

      <!-- Column Groups: dynamic pivot -->
      <h2>Column Groups: dynamic pivot by id + name</h2>
      <p class="instruction">
        Columns generated dynamically per country/warehouse. Each level uses a
        <code>key/label object</code> descriptor: columns merge by <code>key</code> (nationalId /
        warehouseId) while the header shows <code>label</code> (country / warehouse name).
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid [data]="pivotData" [columns]="pivotColumns" [size]="gridSize()" />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="pivotGroupsCode" [language]="'typescript'" />

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
      <h2>Pagination (Server-side)</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="reload-section">
            <button mat-button (click)="reloadPaginatedData()">
              <mat-icon>refresh</mat-icon>
              Reload
            </button>
          </div>
          <acp-data-grid
            [data]="paginatedData()"
            [columns]="basicColumns"
            [showPaginator]="true"
            [pageOnFront]="false"
            [length]="paginatedTotalItems()"
            [pageIndex]="currentPageIndex()"
            [pageSize]="currentPageSize()"
            [pageSizeOptions]="[5, 10, 25]"
            [loading]="isPaginatedLoading()"
            (page)="onPaginatedPageChange($event)"
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

      <!-- Size Variants -->
      <h2>Size Variants</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <mat-button-toggle-group
            class="size-toggle"
            aria-label="Grid size"
            [value]="gridSize()"
            (change)="gridSize.set($event.value)"
          >
            @for (option of sizeOptions; track option) {
              <mat-button-toggle [value]="option">{{ option }}</mat-button-toggle>
            }
          </mat-button-toggle-group>
          <acp-data-grid
            [data]="demoData"
            [columns]="basicColumns"
            [size]="gridSize()"
            [showToolbar]="true"
            [showColumnMenuButton]="true"
            [rowSelectable]="true"
            [multiSelectable]="true"
            [showPaginator]="true"
            [pageSize]="5"
            [pageSizeOptions]="[5, 10]"
            toolbarTitle="Products"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="sizeCode" [language]="'html'" />

      <!-- Row Context Menu -->
      <h2>Row Context Menu</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <p class="instruction">Right-click a row to open its actions</p>
          <acp-data-grid
            [data]="demoData.slice(0, 5)"
            [columns]="basicColumns"
            (rowContextMenu)="onRowContextMenu($event, rowMenu)"
          />
          <acp-contextmenu
            #rowMenu
            [model]="rowMenuItems"
            (itemSelected)="onRowMenuSelected($event)"
          />
          @if (lastRowAction()) {
            <p class="cell-info">{{ lastRowAction() }}</p>
          }
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="rowContextMenuCode" [language]="'typescript'" />

      <!-- Cell Selection -->
      <h2>Cell Selection</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            [data]="demoData.slice(0, 5)"
            [columns]="basicColumns"
            [cellSelectable]="true"
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
          <p class="instruction">
            Enabled by default. Click a row or Tab into the grid, then use ↑/↓, Home/End,
            PageUp/PageDown, Enter (row click), Space (toggle selection) and Ctrl+A (select all).
          </p>
          <acp-data-grid
            [data]="demoData"
            [columns]="basicColumns"
            [rowSelectable]="true"
            [multiSelectable]="true"
            [pageSize]="5"
            [pageSizeOptions]="[5, 10]"
            (focusedRowChange)="focusedIndex.set($event.index)"
            (rowClick)="lastKeyboardAction.set('Row click: ' + $event.rowData.name)"
            keyboardNavigation="true"
          />
          <p class="cell-info">
            Active row: {{ focusedIndex() }}
            @if (lastKeyboardAction()) {
              · {{ lastKeyboardAction() }}
            }
          </p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="keyboardNavCode" [language]="'html'" />

      <!-- Search Input + Grid -->
      <h2>Search Input + Grid</h2>
      <mat-card class="example-card">
        <mat-card-content>
          <p class="instruction">
            The focus stays in the input: type to filter, ↑/↓ to move, PageUp/PageDown to change
            page and Enter to pick the active row.
          </p>
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search product</mat-label>
            <input
              matInput
              [acpGridNavigationFor]="searchGrid"
              [value]="searchText()"
              (input)="searchText.set($any($event.target).value)"
            />
          </mat-form-field>
          <acp-data-grid
            #searchGrid
            [data]="searchResults()"
            [columns]="basicColumns"
            [pageSize]="5"
            [pageSizeOptions]="[5, 10]"
            (rowClick)="pickedProduct.set($event.rowData.name)"
          />
          @if (pickedProduct()) {
            <p class="cell-info">Picked: {{ pickedProduct() }}</p>
          }
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="searchNavCode" [language]="'html'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
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

      .search-field {
        width: 100%;
        max-width: 360px;
      }

      .size-toggle {
        margin-bottom: 1rem;
      }

      .reload-section {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
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
        background-color: var(--mat-sys-warning-container) !important;
        color: var(--mat-sys-on-warning-container) !important;
      }
      .status-processing {
        background-color: var(--mat-sys-primary-container) !important;
        color: var(--mat-sys-on-primary-container) !important;
      }
      .status-completed {
        background-color: var(--mat-sys-tertiary-container) !important;
        color: var(--mat-sys-on-tertiary-container) !important;
      }
      .status-failed {
        background-color: var(--mat-sys-error-container) !important;
        color: var(--mat-sys-on-error-container) !important;
      }

      ::ng-deep .row-completed {
        background-color: var(--mat-sys-tertiary-container);
      }
      ::ng-deep .row-pending {
        background-color: var(--mat-sys-warning-container);
      }
      ::ng-deep .row-failed {
        background-color: var(--mat-sys-error-container);
      }

      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).kardex-group-matriz {
        background-color: color-mix(in srgb, var(--mat-sys-primary) 6%, transparent);
      }
      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).kardex-group-entradas {
        background-color: color-mix(in srgb, var(--mat-sys-tertiary) 10%, transparent);
      }
      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).kardex-group-salidas {
        background-color: color-mix(in srgb, var(--mat-sys-error) 10%, transparent);
      }
      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).kardex-group-saldo {
        background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.kardex-group-matriz {
        border-top: 2px solid var(--mat-sys-primary);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.kardex-group-entradas {
        border-top: 2px solid var(--mat-sys-tertiary);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.kardex-group-salidas {
        border-top: 2px solid var(--mat-sys-error);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.kardex-group-saldo {
        border-top: 2px solid var(--mat-sys-primary);
      }

      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).pivot-group-ecuador {
        background-color: color-mix(in srgb, var(--mat-sys-primary) 6%, transparent);
      }
      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).pivot-group-peru {
        background-color: color-mix(in srgb, var(--mat-sys-secondary) 8%, transparent);
      }
      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).pivot-group-bodega-norte {
        background-color: color-mix(in srgb, var(--mat-sys-tertiary) 10%, transparent);
      }
      ::ng-deep
        .mat-mdc-table
        :is(.mat-mdc-header-cell, .mat-mdc-cell, .mat-mdc-footer-cell).pivot-group-bodega-sur {
        background-color: color-mix(in srgb, var(--mat-sys-error) 8%, transparent);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.pivot-group-ecuador {
        border-top: 2px solid var(--mat-sys-primary);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.pivot-group-peru {
        border-top: 2px solid var(--mat-sys-secondary);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.pivot-group-bodega-norte {
        border-top: 2px solid var(--mat-sys-tertiary);
      }
      ::ng-deep .mat-mdc-table .acp-grid-header-group-cell.pivot-group-bodega-sur {
        border-top: 2px solid var(--mat-sys-error);
      }

      ::ng-deep .mat-mdc-table .success {
        background-color: color-mix(in srgb, var(--mat-sys-primary) 12%, transparent);
      }
      ::ng-deep .mat-mdc-table .danger {
        background-color: color-mix(in srgb, var(--mat-sys-error) 12%, transparent);
      }
      ::ng-deep .mat-mdc-table .warning {
        background-color: color-mix(in srgb, var(--mat-sys-tertiary) 12%, transparent);
      }
    `,
  ],
})
export class DataGridExamples {
  // Signals
  selectedRows = signal<DemoData[]>([]);
  isLoading = signal(false);
  serverData = signal<DemoData[]>([]);
  paginatedData = signal<DemoData[]>([]);
  isPaginatedLoading = signal(false);
  lastCellClick = signal<string>('');
  focusedIndex = signal(-1);
  lastKeyboardAction = signal('');
  searchText = signal('');
  pickedProduct = signal('');
  searchResults = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    return this.searchData.filter(item => item.name.toLowerCase().includes(text));
  });
  gridSize = signal<DataGridSize>('small');
  lastRowAction = signal('');
  rowMenuItems: AcpContextMenuItem[] = [
    { id: 'view', label: 'View', icon: 'visibility' },
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { separator: true },
    { id: 'delete', label: 'Delete', icon: 'delete', danger: true },
  ];
  sizeOptions: DataGridSize[] = ['small', 'medium', 'large'];

  // Pagination signals
  currentPageIndex = signal(0);
  currentPageSize = signal(5);

  totalItems = 50;
  paginatedTotalItems = signal(0);

  // Data
  basicData = this.generateData(5);
  demoData = this.generateData(10);
  styledData = this.generateData(8);
  searchData = this.generateData(25);

  // Columns
  basicColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '80px' },
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price', type: 'currency' },
    { field: 'quantity', header: 'Qty', type: 'number', width: '80px' },
  ];

  kardexData: KardexRow[] = [
    {
      establecimientoId: 'EST-01',
      establecimiento: 'Matriz',
      descripcion: 'Arroz blanco 500g',
      codigo: 'A-001',
      entradasCantidad: 100,
      entradasPrecio: 1250,
      salidasCantidad: 40,
      salidasPrecio: 1250,
      saldoCantidad: 60,
    },
    {
      establecimientoId: 'EST-01',
      establecimiento: 'Matriz',
      descripcion: 'Aceite vegetal 1L',
      codigo: 'A-002',
      entradasCantidad: 50,
      entradasPrecio: 3200,
      salidasCantidad: 15,
      salidasPrecio: 3200,
      saldoCantidad: 35,
    },
    {
      establecimientoId: 'EST-01',
      establecimiento: 'Matriz',
      descripcion: 'Azúcar rubia 1kg',
      codigo: 'A-003',
      entradasCantidad: 0,
      entradasPrecio: 0,
      salidasCantidad: 20,
      salidasPrecio: 2800,
      saldoCantidad: 80,
    },
    {
      establecimientoId: 'EST-01',
      establecimiento: 'Matriz',
      descripcion: 'Café molido 250g',
      codigo: 'B-014',
      entradasCantidad: 30,
      entradasPrecio: 5400,
      salidasCantidad: 12,
      salidasPrecio: 5400,
      saldoCantidad: 18,
    },
  ];

  private readonly kardexGroupClass = (group: string | Observable<string>): string | undefined =>
    typeof group === 'string'
      ? `kardex-group-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      : undefined;

  // Groups by `establecimientoId` but displays `establecimiento` in the header.
  private readonly kardexEstablecimiento = {
    key: (data: KardexRow[]) => data[0]?.establecimientoId ?? '',
    label: (data: KardexRow[]) => data[0]?.establecimiento ?? 'Establecimiento',
  };

  private readonly kardexTotal = (data: any[]): number =>
    data.reduce((acc, value) => acc + (Number(value) || 0), 0);

  kardexColumns: DataGridColumn<KardexRow>[] = [
    { field: 'descripcion', header: 'Descripción', summary: 'Total' },
    { field: 'codigo', header: 'Código', width: '100px' },
    {
      field: 'entradasCantidad',
      header: 'Cantidad',
      type: 'number',
      group: [this.kardexEstablecimiento, 'Entradas'],
      groupClass: group => (group === 'Matriz' ? 'kardex-group-matriz' : 'bg-primary'),
      summary: this.kardexTotal,
    },
    {
      field: 'entradasPrecio',
      header: 'Precio',
      type: 'currency',
      group: [this.kardexEstablecimiento, 'Entradas'],
      groupClass: group => (group === 'Matriz' ? 'kardex-group-matriz' : 'bg-primary'),
      summary: this.kardexTotal,
      width: '120px',
    },
    {
      field: 'salidasCantidad',
      header: 'Cantidad',
      type: 'number',
      group: [this.kardexEstablecimiento, 'Salidas'],
      groupClass: this.kardexGroupClass,
      summary: this.kardexTotal,
    },
    {
      field: 'salidasPrecio',
      header: 'Precio',
      type: 'currency',
      group: [this.kardexEstablecimiento, 'Salidas'],
      groupClass: this.kardexGroupClass,
      summary: this.kardexTotal,
      width: '120px',
    },
    {
      field: 'saldoCantidad',
      header: 'Cantidad',
      type: 'number',
      group: [this.kardexEstablecimiento, 'Saldo'],
      groupClass: this.kardexGroupClass,
      summary: this.kardexTotal,
    },
  ];

  pivotData: PivotRow[] = [
    {
      producto: 'Arroz blanco 500g',
      sku: 'A-001',
      stock_EC_WH01: 120,
      stock_EC_WH02: 45,
      stock_PE_WH01: 30,
      stock_PE_WH02: 0,
    },
    {
      producto: 'Aceite vegetal 1L',
      sku: 'A-002',
      stock_EC_WH01: 60,
      stock_EC_WH02: 20,
      stock_PE_WH01: 15,
      stock_PE_WH02: 8,
    },
    {
      producto: 'Azúcar rubia 1kg',
      sku: 'A-003',
      stock_EC_WH01: 0,
      stock_EC_WH02: 90,
      stock_PE_WH01: 40,
      stock_PE_WH02: 12,
    },
  ];

  private readonly pivotNations = [
    { id: 'EC', nombre: 'Ecuador' },
    { id: 'PE', nombre: 'Perú' },
  ];

  private readonly pivotWarehouses = [
    { id: 'WH01', nombre: 'Bodega Norte' },
    { id: 'WH02', nombre: 'Bodega Sur' },
  ];

  private readonly pivotGroupClass = (group: string | Observable<string>): string | undefined =>
    typeof group === 'string'
      ? `pivot-group-${group
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')}`
      : undefined;

  pivotColumns: DataGridColumn<PivotRow>[] = [
    { field: 'producto', header: 'Producto' },
    { field: 'sku', header: 'SKU', width: '90px' },
    ...this.pivotNations.flatMap(nation =>
      this.pivotWarehouses.map(warehouse => ({
        field: `stock_${nation.id}_${warehouse.id}` as keyof PivotRow & string,
        header: 'Stock',
        type: 'number' as const,
        group: [
          { key: nation.id, label: nation.nombre },
          { key: warehouse.id, label: warehouse.nombre },
        ],
        groupClass: this.pivotGroupClass,
      })),
    ),
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
    // this.loadPaginatedData(0, 5);
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
    alert('Sort changed:' + sort);
  }

  onPageChange(event: PageEvent): void {
    alert('Page changed:' + event);
  }

  onPaginatedPageChange(event: PageEvent): void {
    this.currentPageIndex.set(event.pageIndex);
    this.currentPageSize.set(event.pageSize);
    this.loadPaginatedData(event.pageIndex, event.pageSize);
  }

  private loadPaginatedData(pageIndex: number, pageSize: number): void {
    this.isPaginatedLoading.set(true);
    // Simulate API call - in real apps, API returns { items: [], total: number }
    setTimeout(() => {
      const start = pageIndex * pageSize;
      // Simulate dynamic total from API (e.g., could vary based on filters)
      const simulatedTotal = 100 + Math.floor(Math.random() * 50);
      this.paginatedTotalItems.set(simulatedTotal);
      this.paginatedData.set(
        Array.from({ length: pageSize }, (_, i) => ({
          id: start + i + 1,
          name: `API Item ${start + i + 1}`,
          description: `API description ${start + i + 1}`,
          price: Math.round(Math.random() * 1000 * 100) / 100,
          quantity: Math.floor(Math.random() * 100),
          category: ['Electronics', 'Clothing', 'Food', 'Books'][i % 4],
          status: ['pending', 'processing', 'completed', 'failed'][i % 4] as DemoData['status'],
          createdAt: new Date(Date.now() - Math.random() * 10000000000),
        })),
      );
      this.isPaginatedLoading.set(false);
    }, 300);
  }

  reloadPaginatedData(): void {
    this.currentPageIndex.set(0);
    this.currentPageSize.set(5);
    this.loadPaginatedData(0, 5);
  }

  onServerPageChange(event: PageEvent): void {
    this.loadServerData(event.pageIndex, event.pageSize);
  }

  onEdit(row: DemoData): void {
    alert('Edit:' + row);
  }

  onDelete(row: DemoData): void {
    alert('Delete:' + row);
  }

  onCellClick(event: { row: DemoData; column: DataGridColumn<DemoData> }): void {
    this.lastCellClick.set(
      `${event.column.field}: ${event.row[event.column.field as keyof DemoData]}`,
    );
  }

  onRowContextMenu(
    { event, rowData }: { event: MouseEvent; rowData: DemoData },
    menu: AcpContextMenu,
  ): void {
    event.preventDefault();
    menu.show(event, rowData);
  }

  onRowMenuSelected({ item, data }: AcpContextMenuItemContext): void {
    this.lastRowAction.set(`${item.label}: ${(data as DemoData).name}`);
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

  columnGroupsCode = `// Column Groups (Kardex, nested): \`group\` accepts a single level or an
// array of levels — one header row is rendered per level. Each level can be a
// string, an Observable<string>, or (data) => string | Observable<string> for
// dynamic titles taken from the rows. \`groupClass\` accepts a class string or a
// formatter (group, memberColumns) => class and is applied to the group header
// plus every member column's header and data cells.
const kardexGroupClass = (group: string | Observable<string>) =>
  typeof group === 'string'
    ? \`kardex-group-\${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`
    : undefined;

// Dynamic first level: group by establecimientoId but show establecimiento.
const establecimiento = {
  key: (data: KardexRow[]) => data[0]?.establecimientoId ?? '',
  label: (data: KardexRow[]) => data[0]?.establecimiento ?? 'Establecimiento',
};

// Footer totals: summary receives the column values; enable with
// <acp-data-grid [showSummary]="true" ... />
const kardexTotal = (data: any[]) => data.reduce((acc, v) => acc + (Number(v) || 0), 0);

columns: DataGridColumn<KardexRow>[] = [
  { field: 'descripcion', header: 'Descripción', summary: 'Total' },
  { field: 'codigo', header: 'Código', width: '100px' },
  { field: 'entradasCantidad', header: 'Cantidad', type: 'number',
    group: [establecimiento, 'Entradas'], groupClass: kardexGroupClass, summary: kardexTotal },
  { field: 'entradasPrecio', header: 'Precio', type: 'currency',
    group: [establecimiento, 'Entradas'], groupClass: kardexGroupClass },
  { field: 'salidasCantidad', header: 'Cantidad', type: 'number',
    group: [establecimiento, 'Salidas'], groupClass: kardexGroupClass },
  { field: 'salidasPrecio', header: 'Precio', type: 'currency',
    group: [establecimiento, 'Salidas'], groupClass: kardexGroupClass },
  { field: 'saldoCantidad', header: 'Cantidad', type: 'number',
    group: [establecimiento, 'Saldo'], groupClass: kardexGroupClass },
];

<acp-data-grid [data]="kardexData" [columns]="columns" />`;

  pivotGroupsCode = `// Column Groups (dynamic pivot): columns are generated per
// country/warehouse. Each level uses a { key, label } descriptor — columns merge
// by key (nationalId / warehouseId) while the header shows label (the name).
const pivotGroupClass = (group: string | Observable<string>) =>
  typeof group === 'string'
    ? \`pivot-group-\${group.toLowerCase().normalize('NFD')
        .replace(/[\\u0300-\\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')}\`
    : undefined;

const nations = [
  { id: 'EC', nombre: 'Ecuador' },
  { id: 'PE', nombre: 'Perú' },
];
const warehouses = [
  { id: 'WH01', nombre: 'Bodega Norte' },
  { id: 'WH02', nombre: 'Bodega Sur' },
];

columns: DataGridColumn<PivotRow>[] = [
  { field: 'producto', header: 'Producto' },
  { field: 'sku', header: 'SKU', width: '90px' },
  ...nations.flatMap(nation =>
    warehouses.map(warehouse => ({
      field: \`stock_\${nation.id}_\${warehouse.id}\`,
      header: 'Stock',
      type: 'number' as const,
      group: [
        { key: nation.id, label: nation.nombre },   // nationalId -> nombre
        { key: warehouse.id, label: warehouse.nombre }, // warehouseId -> warehouseName
      ],
      groupClass: pivotGroupClass,
    })),
  ),
];

<acp-data-grid [data]="pivotData" [columns]="columns" />`;

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

  paginationCode = `// Server-side Pagination with API simulation
paginatedData = signal<T[]>([]);
paginatedTotalItems = signal(0);
isPaginatedLoading = signal(false);
currentPageIndex = signal(0);
currentPageSize = signal(5);

<acp-data-grid
  [data]="paginatedData()"
  [columns]="columns"
  [showPaginator]="true"
  [pageOnFront]="false"
  [length]="paginatedTotalItems()"
  [pageIndex]="currentPageIndex()"
  [pageSize]="currentPageSize()"
  [pageSizeOptions]="[5, 10, 25]"
  [loading]="isPaginatedLoading()"
  (page)="onPaginatedPageChange($event)"
/>

onPaginatedPageChange(event: PageEvent) {
  this.currentPageIndex.set(event.pageIndex);
  this.currentPageSize.set(event.pageSize);
  this.loadPaginatedData(event.pageIndex, event.pageSize);
}

private loadPaginatedData(pageIndex: number, pageSize: number) {
  this.isPaginatedLoading.set(true);
  // Real API call returns { items: T[], total: number }
  this.apiService.getData(pageIndex, pageSize).subscribe(data => {
    this.paginatedData.set(data.items);
    this.paginatedTotalItems.set(data.total); // Dynamic total from API
    this.isPaginatedLoading.set(false);
  });
}`;

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

  sizeCode = `<!-- size: 'small' | 'medium' (default) | 'large' -->
<acp-data-grid
  [data]="data"
  [columns]="columns"
  size="small"
  [showToolbar]="true"
  [showColumnMenuButton]="true"
  [rowSelectable]="true"
  [expandable]="true"
  [expansionTemplate]="expansionTpl"
  [showPaginator]="true"
/>`;

  rowContextMenuCode = `// Row Context Menu
<acp-data-grid
  [data]="data"
  [columns]="columns"
  (rowContextMenu)="onRowContextMenu($event, rowMenu)"
/>
<acp-contextmenu #rowMenu [model]="rowMenuItems" (itemSelected)="onRowMenuSelected($event)" />

rowMenuItems: AcpContextMenuItem[] = [
  { id: 'view', label: 'View', icon: 'visibility' },
  { id: 'edit', label: 'Edit', icon: 'edit' },
  { separator: true },
  { id: 'delete', label: 'Delete', icon: 'delete', danger: true },
];

onRowContextMenu({ event, rowData }: { event: MouseEvent; rowData: T }, menu: AcpContextMenu) {
  event.preventDefault();
  menu.show(event, rowData);
}

onRowMenuSelected({ item, data }: AcpContextMenuItemContext) {
  console.log(item.id, data);
}`;

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

  keyboardNavCode = `<!-- No configuration needed: keyboard navigation is on by default -->
<acp-data-grid
  [data]="data"
  [columns]="columns"
  (focusedRowChange)="onActiveRow($event)"
  (rowClick)="open($event.rowData)"
/>

<!-- Disable it per grid with [keyboardNavigation]="false",
     or globally with DATA_GRID_DEFAULT_OPTIONS: { keyboardNavigation: false } -->`;

  searchNavCode = `<input matInput [acpGridNavigationFor]="grid" (input)="search($event)" />

<acp-data-grid
  #grid
  [data]="results()"
  [columns]="columns"
  (rowClick)="pick($event.rowData)"
/>

<!-- The first row becomes active when results change.
     Opt out with [acpGridNavigationActivateFirstRow]="false" -->`;
}
