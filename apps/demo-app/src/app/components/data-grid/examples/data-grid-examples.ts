import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
  AcpDataGridScrollHeight,
} from '@acontplus/ng-components';
import { DocHeading } from '../../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../../shared/code-example/code-example';

interface BranchStockRow {
  establishment: string;
  warehouse: string;
  product: string;
  quantity: number;
}

interface Account {
  code: string;
  name: string;
  balance: number;
  children?: Account[];
  /** Children are loaded on demand. */
  lazy?: boolean;
}

interface StockRow {
  sku: string;
  product: string;
  warehouse: string;
  quantity: number;
  cost: number;
}

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
    MatSlideToggleModule,
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
        dynamic titles. <code>groupColor</code> colors each group (header accent and a light tint
        over its columns) without <code>::ng-deep</code>; <code>groupClass</code> remains for full
        control. <code>showGridlines</code> adds vertical borders.
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
          <mat-slide-toggle
            class="gridlines-toggle"
            [checked]="kardexGridlines()"
            (change)="kardexGridlines.set($event.checked)"
            >showGridlines</mat-slide-toggle
          >
          <acp-data-grid
            [data]="kardexData"
            [columns]="kardexColumns"
            [size]="gridSize()"
            [showSummary]="true"
            [showGridlines]="kardexGridlines()"
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
            class="expandable-demo-grid"
            [data]="demoData"
            [columns]="expandableColumns"
            [expandable]="true"
            [expansionTemplate]="expansionTpl"
            [closeOthersOnExpand]="true"
            dataKey="id"
            [showPaginator]="true"
            [pageSize]="3"
            [pageSizeOptions]="[3, 5, 10]"
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

      <!-- Row Groups -->
      <h2>Row Groups</h2>
      <p>
        Rows are grouped by <code>groupRowsBy</code> under a header row. Rows of a group stay
        together even when sorting by another column; group footers show subtotals computed with
        each column's <code>summary</code>.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            class="row-group-demo-grid"
            [data]="stockData"
            [columns]="stockColumns"
            rowGroupMode="subheader"
            groupRowsBy="warehouse"
            [expandableRowGroups]="true"
            [(collapsedRowGroups)]="collapsedWarehouses"
            [showRowGroupFooter]="true"
            keyboardNavigation="true"
            [showPaginator]="true"
            [pageSize]="10"
            [pageSizeOptions]="[5, 10, 20]"
            size="small"
            [rowHover]="true"
          />
          <p class="row-group-state">Collapsed: {{ collapsedWarehouses().join(', ') || 'none' }}</p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="rowGroupsCode" [language]="'typescript'" />

      <!-- Merged Cells -->
      <h2>Merged Cells (rowspan)</h2>
      <p>
        <code>rowGroupMode="rowspan"</code> keeps the rows of each establishment together and merges
        its cells; <code>mergeRows</code> on the warehouse column merges equal warehouses inside
        each establishment. Sort by Qty: rows are sorted inside each block.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <acp-data-grid
            class="rowspan-demo-grid"
            [data]="branchStockData"
            [columns]="branchStockColumns"
            rowGroupMode="rowspan"
            groupRowsBy="establishment"
            [showPaginator]="true"
            [pageSize]="10"
            [pageSizeOptions]="[5, 10, 20]"
            size="small"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="mergedCellsCode" [language]="'typescript'" />

      <!-- Tree Table -->
      <h2>Tree Table</h2>
      <p>
        <code>treeChildren</code> renders nested rows. Paging counts root accounts, sorting sorts
        siblings on each level, and selecting an account selects its sub-accounts. "Gastos" loads
        its children on expand. Keyboard: ← → collapse and expand.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="tree-actions">
            <button matButton="outlined" type="button" (click)="accountsGrid.expandAll()">
              Expand all
            </button>
            <button matButton="outlined" type="button" (click)="accountsGrid.collapseAll()">
              Collapse all
            </button>
            <span>Selected: {{ selectedAccounts().length }}</span>
          </div>
          <acp-data-grid
            #accountsGrid
            class="tree-demo-grid"
            [data]="accounts"
            [columns]="accountColumns"
            treeChildren="children"
            [treeHasChildren]="hasAccountChildren"
            [(expandedTreeKeys)]="expandedAccounts"
            dataKey="code"
            (treeNodeExpand)="loadAccountChildren($event.row, accountsGrid)"
            [rowSelectable]="true"
            [multiSelectable]="true"
            [multiSelectionWithClick]="true"
            (rowSelectedChange)="selectedAccounts.set($event)"
            keyboardNavigation="true"
            [showPaginator]="true"
            [pageSize]="3"
            [pageSizeOptions]="[3, 5, 10]"
            size="small"
            showGridlines
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="treeTableCode" [language]="'typescript'" />

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

      <!-- Scroll Height -->
      <h2>Scroll Height</h2>
      <p>
        Limit the height of the rows area; the header stays fixed while the rows scroll. In
        <code>flex</code> mode the grid fills its parent: drag the bottom-right corner of the
        container to resize it.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <mat-button-toggle-group
            class="size-toggle"
            aria-label="Scroll mode"
            [value]="scrollMode()"
            (change)="scrollMode.set($event.value)"
          >
            <mat-button-toggle value="fixed">scrollHeight="300px"</mat-button-toggle>
            <mat-button-toggle value="flex">scrollHeight="flex"</mat-button-toggle>
            <mat-button-toggle value="css">CSS variable</mat-button-toggle>
            <mat-button-toggle value="none">No limit</mat-button-toggle>
          </mat-button-toggle-group>
          <div
            [class.scroll-flex-container]="scrollMode() === 'flex'"
            [class.scroll-css-var]="scrollMode() === 'css'"
          >
            <acp-data-grid
              [data]="scrollData"
              [columns]="basicColumns"
              [scrollHeight]="scrollHeight()"
              size="small"
              [rowHover]="true"
              [rowStriped]="true"
            />
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="scrollHeightCode" [language]="'html'" />

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

      <!-- Editable Cells -->
      <h2>Editable Cells</h2>
      <p class="instruction">
        Mark a column with <code>editable: true</code> to enable inline editing. Click a cell to
        start editing, press <code>Enter</code> to confirm or <code>Escape</code> to cancel.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="selection-info">
            <span>Last edit: {{ lastEdit() ?? 'None' }}</span>
          </div>
          <acp-data-grid
            [data]="editableData"
            [columns]="editableColumns"
            (cellEditChange)="onCellEditChange($event)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="editableCode" [language]="'typescript'" />

      <!-- Editable Cells with Select -->
      <h2>Editable Cells with Select</h2>
      <p class="instruction">
        Add <code>editOptions</code> to a column to render a dropdown select instead of a text
        input. Options can be simple values or objects with <code>value</code> and
        <code>label</code>.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="selection-info">
            <span>Last edit: {{ lastEdit() ?? 'None' }}</span>
          </div>
          <acp-data-grid
            [data]="editableData"
            [columns]="editableWithSelectColumns"
            (cellEditChange)="onCellEditChange($event)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="editableSelectCode" [language]="'typescript'" />

      <!-- Editable Cells with Validation -->
      <h2>Editable Cells with Validation</h2>
      <p class="instruction">
        Use <code>editValidator</code> to reject invalid values: return <code>true</code> to accept
        or a <code>string</code> with the error message to reject. When validation fails, the
        message is shown under the editor and the grid blocks editing other cells until the value is
        fixed or cancelled with <code>Escape</code>. Try entering a negative price or a non-integer
        quantity.
      </p>
      <mat-card class="example-card">
        <mat-card-content>
          <div class="selection-info">
            <span>Last edit: {{ lastEdit() ?? 'None' }}</span>
          </div>
          <acp-data-grid
            [data]="editableValidationData"
            [columns]="editableValidationColumns"
            (cellEditChange)="onCellEditChange($event)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="editableValidationCode" [language]="'typescript'" />
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

      .scroll-flex-container {
        display: flex;
        flex-direction: column;
        height: 360px;
        min-height: 160px;
        overflow: hidden;
        resize: vertical;
      }

      .scroll-css-var acp-data-grid {
        --acp-grid-scroll-height: 240px;
      }

      .tree-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }

      .gridlines-toggle {
        margin: 0 0 12px 16px;
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
  lastEdit = signal<string | null>(null);
  rowMenuItems: AcpContextMenuItem[] = [
    { id: 'view', label: 'View', icon: 'visibility' },
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { separator: true },
    { id: 'delete', label: 'Delete', icon: 'delete', danger: true },
  ];
  scrollMode = signal<'fixed' | 'flex' | 'css' | 'none'>('fixed');
  scrollHeight = computed<AcpDataGridScrollHeight | null>(() => {
    const mode = this.scrollMode();
    return mode === 'fixed' ? '300px' : mode === 'flex' ? 'flex' : null;
  });
  sizeOptions: DataGridSize[] = ['xs-small', 'small', 'medium', 'large'];

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
  scrollData = this.generateData(40);
  editableData = [
    { id: 1, name: 'Laptop Pro 15', category: 'Electronics', price: 1299.99, quantity: 25 },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 49.99, quantity: 150 },
    { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 79.99, quantity: 80 },
    { id: 4, name: 'Mechanical Keyboard', category: 'Accessories', price: 149.99, quantity: 60 },
    { id: 5, name: 'Monitor 27" 4K', category: 'Electronics', price: 599.99, quantity: 35 },
  ];

  // Columns
  collapsedWarehouses = signal<unknown[]>([]);

  expandedAccounts = signal<unknown[]>([]);
  selectedAccounts = signal<Account[]>([]);
  accounts: Account[] = [
    {
      code: '1',
      name: 'Activo',
      balance: 185000,
      children: [
        {
          code: '1.1',
          name: 'Activo corriente',
          balance: 65000,
          children: [
            { code: '1.1.01', name: 'Caja', balance: 5000 },
            { code: '1.1.02', name: 'Bancos', balance: 42000 },
            { code: '1.1.03', name: 'Cuentas por cobrar', balance: 18000 },
          ],
        },
        {
          code: '1.2',
          name: 'Activo no corriente',
          balance: 120000,
          children: [
            { code: '1.2.01', name: 'Propiedad, planta y equipo', balance: 150000 },
            { code: '1.2.02', name: 'Depreciación acumulada', balance: -30000 },
          ],
        },
      ],
    },
    {
      code: '2',
      name: 'Pasivo',
      balance: 70000,
      children: [
        {
          code: '2.1',
          name: 'Pasivo corriente',
          balance: 25000,
          children: [
            { code: '2.1.01', name: 'Proveedores', balance: 17000 },
            { code: '2.1.02', name: 'Impuestos por pagar', balance: 8000 },
          ],
        },
        {
          code: '2.2',
          name: 'Pasivo a largo plazo',
          balance: 45000,
          children: [{ code: '2.2.01', name: 'Préstamos bancarios', balance: 45000 }],
        },
      ],
    },
    {
      code: '3',
      name: 'Patrimonio',
      balance: 115000,
      children: [
        { code: '3.1', name: 'Capital social', balance: 100000 },
        { code: '3.2', name: 'Resultados acumulados', balance: 15000 },
      ],
    },
    {
      code: '4',
      name: 'Ingresos',
      balance: 98000,
      children: [
        { code: '4.1', name: 'Ventas', balance: 95000 },
        { code: '4.2', name: 'Otros ingresos', balance: 3000 },
      ],
    },
    { code: '5', name: 'Gastos', balance: 61000, lazy: true },
  ];
  accountColumns: DataGridColumn<Account>[] = [
    { field: 'code', header: 'Code', width: '180px', treeToggle: true, sortable: true },
    { field: 'name', header: 'Account', sortable: true },
    { field: 'balance', header: 'Balance', type: 'currency', sortable: true },
  ];
  readonly hasAccountChildren = (account: Account) => !!account.lazy || !!account.children?.length;

  /** Simulates loading the children of a lazy account from the backend. */
  loadAccountChildren(account: Account, grid: DataGrid): void {
    if (!account.lazy || account.children) {
      return;
    }
    setTimeout(() => {
      account.children = [
        { code: '5.1', name: 'Gastos administrativos', balance: 38000 },
        { code: '5.2', name: 'Gastos de ventas', balance: 23000 },
      ];
      grid.refreshTree();
    }, 800);
  }
  stockData: StockRow[] = [
    {
      sku: 'A-100',
      product: 'Steel screws 4mm',
      warehouse: 'Main warehouse',
      quantity: 1200,
      cost: 0.05,
    },
    {
      sku: 'B-210',
      product: 'Copper wire 2.5mm',
      warehouse: 'North branch',
      quantity: 300,
      cost: 1.2,
    },
    {
      sku: 'A-101',
      product: 'Steel screws 6mm',
      warehouse: 'Main warehouse',
      quantity: 800,
      cost: 0.07,
    },
    {
      sku: 'C-310',
      product: 'PVC pipe 1in',
      warehouse: 'South branch',
      quantity: 150,
      cost: 3.4,
    },
    {
      sku: 'B-211',
      product: 'Copper wire 4mm',
      warehouse: 'North branch',
      quantity: 180,
      cost: 1.9,
    },
    {
      sku: 'A-102',
      product: 'Wall anchors',
      warehouse: 'Main warehouse',
      quantity: 2000,
      cost: 0.03,
    },
    {
      sku: 'C-311',
      product: 'PVC elbow 1in',
      warehouse: 'South branch',
      quantity: 400,
      cost: 0.8,
    },
    { sku: 'B-212', product: 'Breaker 20A', warehouse: 'North branch', quantity: 60, cost: 7.5 },
    {
      sku: 'A-103',
      product: 'Hex bolts 8mm',
      warehouse: 'Main warehouse',
      quantity: 650,
      cost: 0.12,
    },
    {
      sku: 'C-312',
      product: 'PVC glue 250ml',
      warehouse: 'South branch',
      quantity: 90,
      cost: 4.25,
    },
    {
      sku: 'B-213',
      product: 'Junction box',
      warehouse: 'North branch',
      quantity: 120,
      cost: 2.1,
    },
    {
      sku: 'C-313',
      product: 'Ball valve 1in',
      warehouse: 'South branch',
      quantity: 45,
      cost: 9.9,
    },
  ];
  stockColumns: DataGridColumn<StockRow>[] = [
    { field: 'sku', header: 'SKU', width: '100px', sortable: true, summary: 'Subtotal' },
    { field: 'product', header: 'Product', sortable: true },
    {
      field: 'quantity',
      header: 'Qty',
      type: 'number',
      sortable: true,
      summary: (values: number[]) => values.reduce((total, value) => total + value, 0),
    },
    {
      field: 'value',
      header: 'Stock value',
      formatter: row => `$${(row.quantity * row.cost).toFixed(2)}`,
      // Computed column: the subtotal uses the summarized rows (3rd argument).
      summary: (_values, _col, rows) =>
        `$${rows.reduce((total, row) => total + row.quantity * row.cost, 0).toFixed(2)}`,
    },
  ];

  branchStockData: BranchStockRow[] = [
    ['Quito', 'Main', 'Steel screws 4mm', 1200],
    ['Guayaquil', 'Port', 'Copper wire 2.5mm', 300],
    ['Quito', 'Main', 'Wall anchors', 2000],
    ['Quito', 'Annex', 'PVC pipe 1in', 150],
    ['Guayaquil', 'Port', 'Breaker 20A', 60],
    ['Cuenca', 'Center', 'Ball valve 1in', 45],
    ['Quito', 'Annex', 'PVC elbow 1in', 400],
    ['Guayaquil', 'Downtown', 'Junction box', 120],
    ['Cuenca', 'Center', 'PVC glue 250ml', 90],
    ['Guayaquil', 'Downtown', 'Hex bolts 8mm', 650],
    ['Cuenca', 'Center', 'Copper wire 4mm', 180],
    ['Quito', 'Main', 'Hex bolts 8mm', 500],
  ].map(([establishment, warehouse, product, quantity]) => ({
    establishment: establishment as string,
    warehouse: warehouse as string,
    product: product as string,
    quantity: quantity as number,
  }));
  branchStockColumns: DataGridColumn<BranchStockRow>[] = [
    { field: 'establishment', header: 'Establishment', width: '140px' },
    { field: 'warehouse', header: 'Warehouse', width: '120px', mergeRows: true },
    { field: 'product', header: 'Product', sortable: true },
    { field: 'quantity', header: 'Qty', type: 'number', sortable: true },
  ];

  expandableColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '80px', sortable: true },
    { field: 'name', header: 'Name', showExpand: true, sortable: true },
    { field: 'price', header: 'Price', type: 'currency', sortable: true },
  ];
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

  // groupColor: any CSS color. The first level (establishment) is dynamic, so it falls back to
  // the primary color.
  private readonly kardexGroupColor = (group: string | Observable<string>): string | undefined =>
    typeof group === 'string'
      ? ({
          Entradas: 'var(--mat-sys-tertiary)',
          Salidas: 'var(--mat-sys-error)',
          Saldo: 'var(--mat-sys-secondary)',
        }[group] ?? 'var(--mat-sys-primary)')
      : undefined;

  // Groups by `establecimientoId` but displays `establecimiento` in the header.
  private readonly kardexEstablecimiento = {
    key: (data: KardexRow[]) => data[0]?.establecimientoId ?? '',
    label: (data: KardexRow[]) => data[0]?.establecimiento ?? 'Establecimiento',
  };

  private readonly kardexTotal = (data: any[]): number =>
    data.reduce((acc, value) => acc + (Number(value) || 0), 0);

  kardexGridlines = signal(true);
  kardexColumns: DataGridColumn<KardexRow>[] = [
    { field: 'descripcion', header: 'Descripción', summary: 'Total', summaryColspan: 2 },
    { field: 'codigo', header: 'Código', width: '100px' },
    {
      field: 'entradasCantidad',
      header: 'Cantidad',
      type: 'number',
      group: [this.kardexEstablecimiento, 'Entradas'],
      groupColor: this.kardexGroupColor,
      summary: this.kardexTotal,
    },
    {
      field: 'entradasPrecio',
      header: 'Precio',
      type: 'currency',
      group: [this.kardexEstablecimiento, 'Entradas'],
      groupColor: this.kardexGroupColor,
      summary: this.kardexTotal,
      width: '120px',
    },
    {
      field: 'salidasCantidad',
      header: 'Cantidad',
      type: 'number',
      group: [this.kardexEstablecimiento, 'Salidas'],
      groupColor: this.kardexGroupColor,
      summary: this.kardexTotal,
    },
    {
      field: 'salidasPrecio',
      header: 'Precio',
      type: 'currency',
      group: [this.kardexEstablecimiento, 'Salidas'],
      groupColor: this.kardexGroupColor,
      summary: this.kardexTotal,
      width: '120px',
    },
    {
      field: 'saldoCantidad',
      header: 'Cantidad',
      type: 'number',
      group: [this.kardexEstablecimiento, 'Saldo'],
      groupColor: this.kardexGroupColor,
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

  private readonly pivotGroupColor = (group: string | Observable<string>): string | undefined =>
    typeof group === 'string'
      ? {
          Ecuador: 'var(--mat-sys-primary)',
          Perú: 'var(--mat-sys-secondary)',
          'Bodega Norte': 'var(--mat-sys-tertiary)',
          'Bodega Sur': 'var(--mat-sys-error)',
        }[group]
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
        groupColor: this.pivotGroupColor,
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
// dynamic titles taken from the rows. \`groupColor\` takes any CSS color (or a
// function of the group value): the group header gets an accent border and the
// member columns a light tint, with no ::ng-deep. \`groupClass\` remains
// available for full control.
const kardexGroupColor = (group: string | Observable<string>) =>
  typeof group === 'string'
    ? ({ Entradas: 'var(--mat-sys-tertiary)', Salidas: 'var(--mat-sys-error)',
        Saldo: 'var(--mat-sys-secondary)' }[group] ?? 'var(--mat-sys-primary)')
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
  { field: 'descripcion', header: 'Descripción', summary: 'Total', summaryColspan: 2 },
  { field: 'codigo', header: 'Código', width: '100px' },
  { field: 'entradasCantidad', header: 'Cantidad', type: 'number',
    group: [establecimiento, 'Entradas'], groupColor: kardexGroupColor, summary: kardexTotal },
  { field: 'entradasPrecio', header: 'Precio', type: 'currency',
    group: [establecimiento, 'Entradas'], groupColor: kardexGroupColor },
  { field: 'salidasCantidad', header: 'Cantidad', type: 'number',
    group: [establecimiento, 'Salidas'], groupColor: kardexGroupColor },
  { field: 'salidasPrecio', header: 'Precio', type: 'currency',
    group: [establecimiento, 'Salidas'], groupColor: kardexGroupColor },
  { field: 'saldoCantidad', header: 'Cantidad', type: 'number',
    group: [establecimiento, 'Saldo'], groupColor: kardexGroupColor },
];

<acp-data-grid [data]="kardexData" [columns]="columns" [showSummary]="true" showGridlines />`;

  pivotGroupsCode = `// Column Groups (dynamic pivot): columns are generated per
// country/warehouse. Each level uses a { key, label } descriptor — columns merge
// by key (nationalId / warehouseId) while the header shows label (the name).
const groupColors: Record<string, string> = {
  Ecuador: 'var(--mat-sys-primary)', Perú: 'var(--mat-sys-secondary)',
  'Bodega Norte': 'var(--mat-sys-tertiary)', 'Bodega Sur': 'var(--mat-sys-error)',
};

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
      groupColor: group => (typeof group === 'string' ? groupColors[group] : undefined),
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

  expandableCode = `// Expandable Rows: showExpand renders the toggle; dataKey keeps the expanded
// state with the row when sorting, paging or reloading data.
columns: AcpDataGridColumn[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', showExpand: true, sortable: true },
];

<acp-data-grid
  [data]="data"
  [columns]="columns"
  [expandable]="true"
  [expansionTemplate]="expansionTpl"
  [closeOthersOnExpand]="true"
  dataKey="id"
  [showPaginator]="true"
  [pageSize]="3"
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

  sizeCode = `<!-- size: 'xs-small' | 'small' | 'medium' (default) | 'large' -->
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

  scrollHeightCode = `<!-- Max height of the rows area; the grid shrinks when there are fewer rows -->
<acp-data-grid [data]="data" [columns]="columns" scrollHeight="300px" />

<!-- Fill the parent's height (the parent must have a height) -->
<div style="height: 360px">
  <acp-data-grid [data]="data" [columns]="columns" scrollHeight="flex" />
</div>

<!-- Same limit from a component stylesheet, without ::ng-deep -->
<!-- acp-data-grid { --acp-grid-scroll-height: 240px; } -->
<acp-data-grid [data]="data" [columns]="columns" />`;

  rowGroupsCode = `// Row Groups: rows sharing groupRowsBy are rendered under a header row.
// Groups keep the order of \`data\` unless you sort by the grouping field.
columns: AcpDataGridColumn<StockRow>[] = [
  { field: 'sku', header: 'SKU', summary: 'Subtotal' },
  { field: 'product', header: 'Product' },
  { field: 'quantity', header: 'Qty', summary: (values: number[]) => values.reduce((a, b) => a + b, 0) },
  {
    field: 'value',
    header: 'Stock value',
    formatter: row => row.quantity * row.cost,
    // Computed column: summary receives the summarized rows as 3rd argument
    summary: (_values, _col, rows) => rows.reduce((t, r) => t + r.quantity * r.cost, 0),
  },
];
collapsedWarehouses = signal<unknown[]>([]);

<acp-data-grid
  [data]="stock"
  [columns]="columns"
  rowGroupMode="subheader"
  groupRowsBy="warehouse"
  [expandableRowGroups]="true"
  [(collapsedRowGroups)]="collapsedWarehouses"
  [showRowGroupFooter]="true"
/>

<!-- Optional: custom header content (the toggle button is kept) -->
<ng-template #groupHeader let-key="key" let-count="count">
  {{ key }} · {{ count }} items
</ng-template>
<acp-data-grid ... [rowGroupHeaderTemplate]="groupHeader" />`;

  mergedCellsCode = `// Merged cells: rowGroupMode="rowspan" keeps each establishment together and
// merges its cells; mergeRows merges equal warehouses inside each establishment.
columns: AcpDataGridColumn<BranchStockRow>[] = [
  { field: 'establishment', header: 'Establishment' },
  { field: 'warehouse', header: 'Warehouse', mergeRows: true },
  { field: 'product', header: 'Product', sortable: true },
  { field: 'quantity', header: 'Qty', type: 'number', sortable: true },
];

<acp-data-grid
  [data]="stock"
  [columns]="columns"
  rowGroupMode="rowspan"
  groupRowsBy="establishment"
/>

// mergeRows also accepts a comparer: (previous, current) => boolean`;

  treeTableCode = `// Tree Table: rows carry their children; data holds the root nodes.
columns: AcpDataGridColumn<Account>[] = [
  { field: 'code', header: 'Code', treeToggle: true, sortable: true },
  { field: 'name', header: 'Account', sortable: true },
  { field: 'balance', header: 'Balance', type: 'currency', sortable: true },
];
// Lazy nodes: report children before loading them
hasChildren = (a: Account) => !!a.lazy || !!a.children?.length;

<acp-data-grid
  #grid
  [data]="accounts"
  [columns]="columns"
  treeChildren="children"
  [treeHasChildren]="hasChildren"
  [(expandedTreeKeys)]="expanded"
  dataKey="code"
  (treeNodeExpand)="load($event.row, grid)"
  [rowSelectable]="true"
  [multiSelectable]="true"
/>

// Load children, then redraw: account.children = loaded; grid.refreshTree();
// Also: grid.expandAll(), grid.collapseAll(), grid.toggleTreeNode(row)`;

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

  keyboardNavCode = `<!-- Keyboard navigation is opt-in -->
<acp-data-grid
  keyboardNavigation="true"
  [data]="data"
  [columns]="columns"
  (focusedRowChange)="onActiveRow($event)"
  (rowClick)="open($event.rowData)"
/>

<!-- Enable it for every grid with DATA_GRID_DEFAULT_OPTIONS: { keyboardNavigation: true } -->`;

  searchNavCode = `<input matInput [acpGridNavigationFor]="grid" (input)="search($event)" />

<acp-data-grid
  #grid
  [data]="results()"
  [columns]="columns"
  (rowClick)="pick($event.rowData)"
/>

<!-- The first row becomes active when results change.
     Opt out with [acpGridNavigationActivateFirstRow]="false" -->`;

  // Editable cells
  editableColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '60px' },
    { field: 'name', header: 'Name', editable: true },
    { field: 'category', header: 'Category', editable: true },
    { field: 'price', header: 'Price', type: 'currency', editable: true },
    {
      field: 'quantity',
      header: 'Qty',
      type: 'number',
      width: '80px',
      editable: true,
      editValidator: value => {
        const num = Number(value);
        return Number.isInteger(num) && num >= 0 ? true : 'Quantity must be a non-negative integer';
      },
    },
  ];

  // Editable cells with validation
  editableValidationData: DemoData[] = [
    {
      id: 101,
      name: 'Laptop Pro 15',
      description: 'High-performance laptop',
      category: 'Electronics',
      price: 1299.99,
      quantity: 25,
      status: 'completed',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 102,
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      category: 'Accessories',
      price: 49.99,
      quantity: 150,
      status: 'completed',
      createdAt: new Date('2024-02-20'),
    },
    {
      id: 103,
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub',
      category: 'Accessories',
      price: 79.99,
      quantity: 80,
      status: 'processing',
      createdAt: new Date('2024-03-10'),
    },
  ];

  editableValidationColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '60px' },
    {
      field: 'name',
      header: 'Name',
      editable: true,
      editValidator: value =>
        value == null || String(value).trim() === '' ? 'Name is required' : true,
    },
    {
      field: 'price',
      header: 'Price',
      type: 'currency',
      editable: true,
      editValidator: value => (Number(value) >= 0 ? true : 'Price must be zero or positive'),
    },
    {
      field: 'quantity',
      header: 'Qty',
      type: 'number',
      width: '80px',
      editable: true,
      editValidator: value => {
        const num = Number(value);
        return Number.isInteger(num) && num > 0 ? true : 'Quantity must be a positive integer';
      },
    },
  ];

  // Editable cells with select dropdown
  editableWithSelectColumns: DataGridColumn<DemoData>[] = [
    { field: 'id', header: 'ID', type: 'number', width: '60px' },
    { field: 'name', header: 'Name', editable: true },
    {
      field: 'category',
      header: 'Category',
      editable: true,
      editOptions: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'],
    },
    {
      field: 'status',
      header: 'Status',
      editable: true,
      width: '120px',
      editOptions: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ],
    },
    { field: 'price', header: 'Price', type: 'currency' },
  ];

  onCellEditChange(event: {
    row: Record<string, any>;
    field: string;
    oldValue: any;
    newValue: any;
  }): void {
    this.lastEdit.set(`${event.field}: "${event.oldValue}" → "${event.newValue}"`);
  }

  editableCode = `// Editable Cells — click to edit, Enter to confirm, Escape to cancel
editableColumns: DataGridColumn<DemoData>[] = [
  { field: 'id', header: 'ID', type: 'number' },
  { field: 'name', header: 'Name', editable: true },
  { field: 'category', header: 'Category', editable: true },
  { field: 'price', header: 'Price', type: 'currency', editable: true },
  { field: 'quantity', header: 'Qty', type: 'number', editable: true,
    editValidator: (value) => Number.isInteger(value) && value >= 0 ? true : 'Must be ≥ 0' },
];

<acp-data-grid
  [data]="data"
  [columns]="editableColumns"
  (cellEditChange)="onCellEditChange($event)"
/>

onCellEditChange(event: { row, field, oldValue, newValue }) {
  console.log('Changed', event.field, event.oldValue, '→', event.newValue);
}`;

  editableSelectCode = `// Editable Cells with Select — click to open dropdown
editableColumns: DataGridColumn<DemoData>[] = [
  { field: 'id', header: 'ID', type: 'number' },
  { field: 'name', header: 'Name', editable: true },
  {
    field: 'category',
    header: 'Category',
    editable: true,
    editOptions: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'],
  },
  {
    field: 'status',
    header: 'Status',
    editable: true,
    editOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ],
  },
];

<acp-data-grid
  [data]="data"
  [columns]="editableColumns"
  (cellEditChange)="onCellEditChange($event)"
/>`;

  editableValidationCode = `// Editable Cells with Validation — editValidator returns
// true to accept or a string error message to reject. On failure the message
// is shown under the editor and other cells cannot be edited until the value
// is fixed or the edit is cancelled with Escape.
editableColumns: DataGridColumn<DemoData>[] = [
  { field: 'id', header: 'ID', type: 'number' },
  {
    field: 'name',
    header: 'Name',
    editable: true,
    editValidator: (value) =>
      value == null || String(value).trim() === '' ? 'Name is required' : true,
  },
  {
    field: 'price',
    header: 'Price',
    type: 'currency',
    editable: true,
    editValidator: (value) => (Number(value) >= 0 ? true : 'Price must be >= 0'),
  },
  {
    field: 'quantity',
    header: 'Qty',
    type: 'number',
    editable: true,
    editValidator: (value) => {
      const num = Number(value);
      return Number.isInteger(num) && num > 0 ? true : 'Must be a positive integer';
    },
  },
];

<acp-data-grid
  [data]="data"
  [columns]="editableColumns"
  (cellEditChange)="onCellEditChange($event)"
/>`;
}
