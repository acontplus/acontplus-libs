import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  AcpColumns,
  AcpTabulator,
  type AcpTabulatorAction,
  type AcpTabulatorActionEvent,
  type AcpTabulatorCellEdit,
  type AcpTabulatorColumn,
} from '@acontplus/ng-components';
import type { Options } from 'tabulator-tables';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

interface Line {
  uuid: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRateId: number;
  total: number;
}

interface Sale {
  id: number;
  number: string;
  date: string;
  customer: string;
  city: string;
  seller: string;
  status: 'Autorizada' | 'Pendiente' | 'Anulada';
  subtotal: number;
  tax: number;
  total: number;
}

const CITIES = ['Quito', 'Guayaquil', 'Cuenca', 'Ambato'];
const SELLERS = ['Ana Torres', 'Luis Vera', 'Carla Mena'];
const CUSTOMERS = [
  'Comercial Andina S.A.',
  'Distribuidora El Sol',
  'Ferretería Central',
  'María Fernanda López',
  'Juan Carlos Pérez',
];
const STATUSES: Sale['status'][] = ['Autorizada', 'Autorizada', 'Pendiente', 'Anulada'];

const SALES: Sale[] = Array.from({ length: 24 }, (_, i) => {
  const subtotal = Math.round(((i * 137) % 900) + 40.5);
  return {
    id: i + 1,
    number: `001-001-${String(1200 + i).padStart(9, '0')}`,
    date: `2026-11-${String((i % 20) + 1).padStart(2, '0')}`,
    customer: CUSTOMERS[i % CUSTOMERS.length],
    city: CITIES[i % CITIES.length],
    seller: SELLERS[i % SELLERS.length],
    status: STATUSES[i % STATUSES.length],
    subtotal,
    tax: subtotal * 0.15,
    total: subtotal * 1.15,
  };
});

interface StockCount {
  id: number;
  code: string;
  product: string;
  system: number;
  counted: number | null;
  note: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const TAX_RATES = [
  { label: 'IVA 15%', value: 4, rate: 0.15 },
  { label: 'IVA 0%', value: 0, rate: 0 },
];

const withTotal = (line: Line): Line => ({
  ...line,
  total:
    line.quantity *
    line.unitPrice *
    (1 + (TAX_RATES.find(t => t.value === line.taxRateId)?.rate ?? 0)),
});

const line = (code: string, description: string, unitPrice: number): Line =>
  withTotal({
    uuid: crypto.randomUUID(),
    code,
    description,
    quantity: 1,
    unitPrice,
    taxRateId: 4,
    total: 0,
  });

@Component({
  selector: 'app-tabulator-table-examples',
  imports: [
    AcpTabulator,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    DocHeading,
    CodeExample,
  ],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Tabulator Examples</app-doc-heading>
      <p class="docs-component-description">
        <code>acp-tabulator</code> is the signal-driven Tabulator: <code>data</code> syncs by
        <code>index</code> (an edited row updates alone, so an editor open in another row survives),
        <code>actions</code> builds the row buttons column, <code>readonly</code> drops editors and
        actions, and <code>AcpColumns</code> gives the text, number, money and list columns.
      </p>

      <h2>Basic</h2>
      <p>Sortable headers, resizable columns, money formatting with the full value on hover.</p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-tabulator [sortable]="true" [data]="products" [columns]="productColumns" />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="basicCode" [language]="'typescript'" />

      <h2>Editable lines</h2>
      <p>
        A document detail: editors per column, <code>editable</code> per row, row numbers, a height
        that grows up to <code>maxRows</code>, and <code>editCell()</code> to open the quantity of a
        new line. A quantity over 10 is rejected with <code>revert()</code>.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="toolbar">
            <button matButton="tonal" [disabled]="readonly()" (click)="addLine()">
              <mat-icon>add</mat-icon>Add line
            </button>
            <mat-slide-toggle [checked]="readonly()" (change)="readonly.set($event.checked)">
              Read only
            </mat-slide-toggle>
          </div>
          <acp-tabulator
            #linesTable
            index="uuid"
            headerAlign="center"
            [rowNumbers]="true"
            [maxRows]="5"
            [data]="lines()"
            [columns]="lineColumns"
            [actions]="lineActions"
            [readonly]="readonly()"
            (action)="onLineAction($event)"
            (cellEdited)="onLineEdited($event)"
          />
          <p class="hint">Total: {{ total().toFixed(2) }} · {{ lastEvent() }}</p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="linesHtml" [language]="'html'" />
      <app-code-example [code]="linesCode" [language]="'typescript'" />

      <h2>Row actions</h2>
      <p>
        Colors <code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>,
        <code>info</code> and <code>neutral</code> follow the theme. <code>visible</code> hides an
        action per row; <code>label</code> and <code>color</code> can depend on the row. Appearance
        <code>filled</code> (default) or <code>tonal</code>.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-tabulator
            actionsPosition="end"
            actionsAppearance="tonal"
            [data]="products"
            [columns]="productColumns"
            [actions]="productActions"
            (action)="lastEvent.set($event.action + ' · ' + $event.row.name)"
          />
          <p class="hint">{{ lastEvent() }}</p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="actionsCode" [language]="'typescript'" />

      <h2>Header filters</h2>
      <p>
        Any Tabulator <code>headerFilter</code>: text inputs, lists and number ranges. Sorting and
        filtering keep working while <code>data</code> changes.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-tabulator [sortable]="true" [maxRows]="8" [data]="sales" [columns]="filterColumns" />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="filtersCode" [language]="'typescript'" />

      <h2>Grouping</h2>
      <p>
        <code>groupBy</code> takes a field or a function and can change at any time;
        <code>null</code> ungroups. Column calcs add the totals of each group.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <mat-button-toggle-group
            class="toolbar"
            hideSingleSelectionIndicator
            [value]="groupBy()"
            (change)="groupBy.set($event.value)"
          >
            <mat-button-toggle [value]="null">None</mat-button-toggle>
            <mat-button-toggle value="city">City</mat-button-toggle>
            <mat-button-toggle value="seller">Seller</mat-button-toggle>
            <mat-button-toggle value="status">Status</mat-button-toggle>
          </mat-button-toggle-group>
          <acp-tabulator
            [maxRows]="10"
            [groupBy]="groupBy()"
            [data]="sales"
            [columns]="groupColumns"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="groupingCode" [language]="'typescript'" />

      <h2>Frozen columns</h2>
      <p>
        <code>frozen: true</code> keeps a column in place while the others scroll horizontally.
        Narrow the window to see it.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <acp-tabulator
            layout="fitData"
            [maxRows]="6"
            [data]="sales"
            [columns]="frozenColumns"
            [actions]="saleActions"
            (action)="lastEvent.set($event.action + ' · ' + $event.row.number)"
          />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="frozenCode" [language]="'typescript'" />

      <h2>Keyboard navigation</h2>
      <p>
        <code>KeybindingsModule</code> comes registered: count the stock without the mouse. Click a
        <em>Counted</em> cell, type and press <kbd>Tab</kbd> to go to the next editable cell.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <ul class="keys">
            <li><kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> next / previous editable cell</li>
            <li><kbd>↑</kbd> / <kbd>↓</kbd> same column, row above / below (while editing)</li>
            <li><kbd>Enter</kbd> confirms, <kbd>Esc</kbd> cancels</li>
            <li>
              <kbd>Ctrl</kbd>+<kbd>↓</kbd> / <kbd>Ctrl</kbd>+<kbd>↑</kbd> end / start of the table
              (custom binding)
            </li>
          </ul>
          <acp-tabulator
            [maxRows]="6"
            [data]="counts()"
            [columns]="countColumns"
            [options]="countOptions"
            (cellEdited)="onCountEdited($event)"
          />
          <p class="hint">
            Counted {{ countedItems() }} of {{ counts().length }} · differences:
            {{ countDifferences() }}
          </p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="keyboardCode" [language]="'typescript'" />

      <h2>Download (opt-in module)</h2>
      <p>
        Heavy modules are registered once with <code>provideAcpTabulator</code>; then use the
        Tabulator instance through a template reference or <code>(ready)</code>.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="toolbar">
            <button matButton="tonal" (click)="downloadCsv()">
              <mat-icon>download</mat-icon>CSV
            </button>
          </div>
          <acp-tabulator #salesTable [maxRows]="5" [data]="sales" [columns]="groupColumns" />
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="downloadCode" [language]="'typescript'" />

      <h2>Global styles</h2>
      <p>
        Include the Tabulator base CSS once; the acontpluspro skin comes with the component and
        every color can be overridden with the <code>--acp-tabulator-*</code> variables.
      </p>
      <app-code-example [code]="stylesCode" [language]="'scss'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 12px;
      }

      .keys {
        margin: 0 0 12px;
        padding-left: 18px;
        color: var(--mat-sys-on-surface-variant);
        line-height: 1.8;
      }

      kbd {
        padding: 1px 6px;
        border: 1px solid var(--mat-sys-outline-variant);
        border-radius: 4px;
        font-family: inherit;
        font-size: 0.8125rem;
      }

      .hint {
        margin: 8px 0 0;
        color: var(--mat-sys-on-surface-variant);
      }
    `,
  ],
})
export class TabulatorTableExamples {
  private readonly linesTable = viewChild.required<AcpTabulator<Line>>('linesTable');
  private readonly salesTable = viewChild.required<AcpTabulator<Sale>>('salesTable');

  readonly sales = SALES;
  readonly groupBy = signal<string | null>('city');

  readonly filterColumns: AcpTabulatorColumn<Sale>[] = [
    { title: 'Number', field: 'number', minWidth: 160, headerFilter: 'input' },
    {
      title: 'Customer',
      field: 'customer',
      minWidth: 180,
      widthGrow: 2,
      headerFilter: 'input',
      headerFilterPlaceholder: 'Search…',
    },
    {
      title: 'City',
      field: 'city',
      minWidth: 120,
      headerFilter: 'list',
      headerFilterParams: { values: CITIES, clearable: true },
    },
    {
      title: 'Status',
      field: 'status',
      minWidth: 120,
      headerFilter: 'list',
      headerFilterParams: { values: ['Autorizada', 'Pendiente', 'Anulada'], clearable: true },
    },
    AcpColumns.money<Sale>({
      title: 'Total ≥',
      field: 'total',
      minWidth: 110,
      headerFilter: 'number',
      headerFilterFunc: '>=',
    }),
  ];

  readonly groupColumns: AcpTabulatorColumn<Sale>[] = [
    { title: 'Number', field: 'number', minWidth: 160 },
    { title: 'Customer', field: 'customer', minWidth: 180, widthGrow: 2 },
    { title: 'City', field: 'city', minWidth: 110 },
    { title: 'Seller', field: 'seller', minWidth: 120 },
    { title: 'Status', field: 'status', minWidth: 110 },
    AcpColumns.money<Sale>({
      title: 'Total',
      field: 'total',
      minWidth: 110,
      bottomCalc: 'sum',
      bottomCalcFormatter: 'money',
    }),
  ];

  readonly frozenColumns: AcpTabulatorColumn<Sale>[] = [
    { title: 'Number', field: 'number', width: 170, frozen: true },
    { title: 'Date', field: 'date', width: 110 },
    { title: 'Customer', field: 'customer', width: 220 },
    { title: 'City', field: 'city', width: 130 },
    { title: 'Seller', field: 'seller', width: 150 },
    { title: 'Status', field: 'status', width: 130 },
    AcpColumns.money<Sale>({ title: 'Subtotal', field: 'subtotal', width: 120 }),
    AcpColumns.money<Sale>({ title: 'Tax', field: 'tax', width: 110 }),
    AcpColumns.money<Sale>({ title: 'Total', field: 'total', width: 120 }),
  ];

  readonly saleActions: AcpTabulatorAction<Sale>[] = [
    { id: 'pdf', icon: 'picture_as_pdf', color: 'error', label: 'PDF' },
    {
      id: 'send',
      icon: 'send',
      color: 'success',
      label: 'Send',
      visible: sale => sale.status === 'Autorizada',
    },
  ];

  readonly counts = signal<StockCount[]>(
    [
      ['LAP-001', 'Laptop 14" Core i5', 8],
      ['MOU-010', 'Mouse inalámbrico', 120],
      ['MON-024', 'Monitor 24" IPS', 3],
      ['TEC-005', 'Teclado mecánico', 14],
      ['CAB-HDMI', 'Cable HDMI 2 m', 45],
      ['SSD-512', 'SSD NVMe 512 GB', 11],
      ['RAM-16', 'Memoria RAM 16 GB', 20],
      ['UPS-750', 'UPS 750 VA', 6],
    ].map(([code, product, system], i) => ({
      id: i + 1,
      code: code as string,
      product: product as string,
      system: system as number,
      counted: null,
      note: '',
    })),
  );
  readonly countedItems = computed(() => this.counts().filter(c => c.counted !== null).length);
  readonly countDifferences = computed(
    () => this.counts().filter(c => c.counted !== null && c.counted !== c.system).length,
  );

  readonly countColumns: AcpTabulatorColumn<StockCount>[] = [
    { title: 'Code', field: 'code', minWidth: 100 },
    { title: 'Product', field: 'product', minWidth: 180, widthGrow: 2 },
    AcpColumns.number<StockCount>({ title: 'System', field: 'system', minWidth: 90 }),
    AcpColumns.number<StockCount>({
      title: 'Counted',
      field: 'counted',
      minWidth: 90,
      editor: { min: 0, decimals: 0 },
    }),
    {
      title: 'Difference',
      field: 'counted',
      minWidth: 100,
      hozAlign: 'right',
      formatter: cell => {
        const row = cell.getRow().getData() as StockCount;
        if (row.counted === null) return '';
        const diff = row.counted - row.system;
        const color = diff ? 'var(--mat-sys-error)' : 'inherit';
        return `<span style="color:${color}">${diff > 0 ? '+' : ''}${diff}</span>`;
      },
    },
    AcpColumns.text<StockCount>({
      title: 'Note',
      field: 'note',
      minWidth: 160,
      widthGrow: 2,
      editor: { maxLength: 120 },
    }),
  ];

  /** Ctrl+arrows (instead of End / Home) jump to the end / start of the table */
  readonly countOptions: Options = {
    keybindings: { scrollToEnd: 'ctrl + 40', scrollToStart: 'ctrl + 38' },
  };

  onCountEdited({ row, field, value }: AcpTabulatorCellEdit<StockCount>): void {
    this.counts.update(list => list.map(c => (c.id === row.id ? { ...c, [field]: value } : c)));
  }

  downloadCsv(): void {
    this.salesTable().instance?.download('csv', 'sales.csv');
  }

  readonly products: Product[] = [
    { id: 1, name: 'Laptop 14" Core i5', category: 'Equipos', price: 689.5, stock: 8 },
    { id: 2, name: 'Mouse inalámbrico', category: 'Accesorios', price: 12.9, stock: 120 },
    { id: 3, name: 'Monitor 24" IPS', category: 'Equipos', price: 159, stock: 0 },
    { id: 4, name: 'Teclado mecánico', category: 'Accesorios', price: 54.25, stock: 14 },
  ];

  readonly productColumns: AcpTabulatorColumn<Product>[] = [
    { title: 'Product', field: 'name', minWidth: 180, widthGrow: 2 },
    { title: 'Category', field: 'category', minWidth: 110 },
    AcpColumns.number<Product>({ title: 'Stock', field: 'stock', minWidth: 80 }),
    AcpColumns.money<Product>({ title: 'Price', field: 'price', minWidth: 100 }),
  ];

  readonly productActions: AcpTabulatorAction<Product>[] = [
    { id: 'view', icon: 'visibility', color: 'primary', label: 'View' },
    { id: 'edit', icon: 'edit', color: 'info', label: 'Edit' },
    {
      id: 'restock',
      icon: 'inventory',
      color: 'warning',
      label: 'Restock',
      visible: product => product.stock === 0,
    },
    { id: 'delete', icon: 'delete', color: 'error', label: 'Delete' },
  ];

  readonly lines = signal<Line[]>([
    line('LAP-001', 'Laptop 14" Core i5', 689.5),
    line('SER-INST', 'Servicio de instalación', 25),
  ]);
  readonly readonly = signal(false);
  readonly lastEvent = signal('Edit a cell or use an action');
  readonly total = computed(() => this.lines().reduce((sum, item) => sum + item.total, 0));

  readonly lineColumns: AcpTabulatorColumn<Line>[] = [
    { title: 'Code', field: 'code', minWidth: 90 },
    AcpColumns.text<Line>({
      title: 'Description',
      field: 'description',
      minWidth: 200,
      widthGrow: 3,
      editor: { maxLength: 300 },
      editable: item => item.code.startsWith('SER'),
    }),
    AcpColumns.number<Line>({
      title: 'Quantity',
      field: 'quantity',
      minWidth: 80,
      editor: { positive: true },
    }),
    AcpColumns.money<Line>({
      title: 'Price',
      field: 'unitPrice',
      minWidth: 90,
      editor: { positive: true },
    }),
    AcpColumns.list<Line>({
      title: 'Tax',
      field: 'taxRateId',
      minWidth: 110,
      options: () => TAX_RATES,
    }),
    AcpColumns.money<Line>({ title: 'Total', field: 'total', minWidth: 100 }),
  ];

  readonly lineActions: AcpTabulatorAction<Line>[] = [
    { id: 'delete', icon: 'delete', color: 'error', label: 'Remove line' },
    {
      id: 'kardex',
      icon: 'swap_vert',
      color: 'primary',
      label: 'Kardex',
      visible: item => !item.code.startsWith('SER'),
    },
  ];

  async addLine(): Promise<void> {
    const added = line('MOU-010', 'Mouse inalámbrico', 12.9);
    this.lines.update(lines => [...lines, added]);
    await this.linesTable().editCell(added.uuid, 'quantity');
  }

  onLineAction({ action, row }: AcpTabulatorActionEvent<Line>): void {
    if (action === 'delete') this.lines.update(lines => lines.filter(item => item !== row));
    this.lastEvent.set(`${action} · ${row.code}`);
  }

  onLineEdited({ row, field, value, revert }: AcpTabulatorCellEdit<Line>): void {
    if (field === 'quantity' && Number(value) > 10) {
      revert();
      this.lastEvent.set(`quantity ${value} rejected (max 10)`);
      return;
    }
    const edited = withTotal({ ...row, [field]: value });
    this.lines.update(lines => lines.map(item => (item.uuid === row.uuid ? edited : item)));
    this.lastEvent.set(`${row.code}.${field} = ${value}`);
  }

  readonly basicCode = `readonly columns: AcpTabulatorColumn<Product>[] = [
  { title: 'Product', field: 'name', minWidth: 180, widthGrow: 2 },
  { title: 'Category', field: 'category', minWidth: 110 },
  AcpColumns.number<Product>({ title: 'Stock', field: 'stock' }),
  AcpColumns.money<Product>({ title: 'Price', field: 'price' }),
];

// <acp-tabulator [sortable]="true" [data]="products" [columns]="columns" />`;

  readonly linesHtml = `<acp-tabulator
  #linesTable
  index="uuid"
  headerAlign="center"
  [rowNumbers]="true"
  [maxRows]="5"
  [data]="lines()"
  [columns]="lineColumns"
  [actions]="lineActions"
  [readonly]="readonly()"
  (action)="onLineAction($event)"
  (cellEdited)="onLineEdited($event)"
/>`;

  readonly linesCode = `readonly lineColumns: AcpTabulatorColumn<Line>[] = [
  { title: 'Code', field: 'code' },
  AcpColumns.text<Line>({
    title: 'Description',
    field: 'description',
    editor: { maxLength: 300 },
    editable: line => line.code.startsWith('SER'), // receives the row, not the cell
  }),
  AcpColumns.number<Line>({ title: 'Quantity', field: 'quantity', editor: { positive: true } }),
  AcpColumns.money<Line>({ title: 'Price', field: 'unitPrice', editor: { positive: true } }),
  AcpColumns.list<Line>({ title: 'Tax', field: 'taxRateId', options: () => TAX_RATES }),
  AcpColumns.money<Line>({ title: 'Total', field: 'total' }),
];

async addLine(): Promise<void> {
  const line = newLine();
  this.lines.update(lines => [...lines, line]);
  // Waits for the render and for the row, scrolls to it and opens the editor
  await this.linesTable().editCell(line.uuid, 'quantity');
}

onLineEdited({ row, field, value, revert }: AcpTabulatorCellEdit<Line>): void {
  if (field === 'quantity' && Number(value) > 10) return revert();
  this.lines.update(lines =>
    lines.map(line => (line.uuid === row.uuid ? withTotal({ ...row, [field]: value }) : line)),
  );
}`;

  readonly actionsCode = `readonly actions: AcpTabulatorAction<Product>[] = [
  { id: 'view', icon: 'visibility', color: 'primary', label: 'View' },
  { id: 'edit', icon: 'edit', color: 'info', label: 'Edit' },
  { id: 'restock', icon: 'inventory', color: 'warning', label: 'Restock', visible: p => p.stock === 0 },
  { id: 'delete', icon: 'delete', color: 'error', label: 'Delete' },
];

// <acp-tabulator actionsPosition="end" actionsAppearance="tonal"
//   [data]="products" [columns]="columns" [actions]="actions"
//   (action)="onAction($event)" />   // $event = { action: 'edit', row: Product }`;

  readonly filtersCode = `readonly columns: AcpTabulatorColumn<Sale>[] = [
  { title: 'Customer', field: 'customer', headerFilter: 'input', headerFilterPlaceholder: 'Search…' },
  {
    title: 'City',
    field: 'city',
    headerFilter: 'list',
    headerFilterParams: { values: CITIES, clearable: true },
  },
  AcpColumns.money<Sale>({ title: 'Total ≥', field: 'total', headerFilter: 'number', headerFilterFunc: '>=' }),
];`;

  readonly groupingCode = `readonly groupBy = signal<string | null>('city');

// <acp-tabulator [groupBy]="groupBy()" [data]="sales" [columns]="columns" />

AcpColumns.money<Sale>({ title: 'Total', field: 'total', bottomCalc: 'sum', bottomCalcFormatter: 'money' })`;

  readonly frozenCode = `readonly columns: AcpTabulatorColumn<Sale>[] = [
  { title: 'Number', field: 'number', width: 170, frozen: true },
  { title: 'Customer', field: 'customer', width: 220 },
  // ...
];

// <acp-tabulator layout="fitData" [data]="sales" [columns]="columns" [actions]="actions" />`;

  readonly keyboardCode = `// KeybindingsModule is registered by default: Tab, Shift+Tab and the arrows move
// between editable cells; Enter confirms and Esc cancels the editor.
readonly columns: AcpTabulatorColumn<StockCount>[] = [
  { title: 'Product', field: 'product' },
  AcpColumns.number<StockCount>({ title: 'Counted', field: 'counted', editor: { min: 0, decimals: 0 } }),
  AcpColumns.text<StockCount>({ title: 'Note', field: 'note', editor: { maxLength: 120 } }),
];

// Custom bindings (key codes, "ctrl + 40" = Ctrl+ArrowDown); false disables one
readonly options: Options = {
  keybindings: { scrollToEnd: 'ctrl + 40', scrollToStart: 'ctrl + 38' },
};

// <acp-tabulator [data]="counts()" [columns]="columns" [options]="options"
//   (cellEdited)="onCountEdited($event)" />`;

  readonly downloadCode = `// app.config.ts
import { provideAcpTabulator } from '@acontplus/ng-components';
import { DownloadModule } from 'tabulator-tables';

providers: [provideAcpTabulator({ modules: [DownloadModule] })]

// component
private readonly table = viewChild.required<AcpTabulator<Sale>>('salesTable');
downloadCsv() {
  this.table().instance?.download('csv', 'sales.csv');
}`;

  readonly stylesCode = `// styles.scss
@use '@acontplus/ng-components/acontpluspro';
@use 'tabulator-tables/dist/css/tabulator.min.css';

// optional overrides
.acp-tabulator {
  --acp-tabulator-radius: 8px;
  --acp-tabulator-success: #13deb9;
}`;
}
