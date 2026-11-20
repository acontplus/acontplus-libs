import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  AcpColumns,
  AcpTabulator,
  type AcpTabulatorAction,
  type AcpTabulatorActionEvent,
  type AcpTabulatorCellEdit,
  type AcpTabulatorColumn,
} from '@acontplus/ng-components';

interface Product {
  code: string;
  description: string;
  price: number;
  stock: number;
}

interface InvoiceLine {
  uuid: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxRateId: number;
  warehouseId: number;
  total: number;
  serials: number;
}

interface Customer {
  id: number;
  name: string;
  idCard: string;
  city: string;
  balance: number;
}

const TAX_RATES = [
  { label: 'IVA 15%', value: 4, rate: 0.15 },
  { label: 'IVA 0%', value: 0, rate: 0 },
  { label: 'No objeto', value: 6, rate: 0 },
];

const WAREHOUSES = [
  { label: 'Matriz', value: 1 },
  { label: 'Bodega Sur', value: 2 },
];

const PRODUCTS: Product[] = [
  { code: 'LAP-001', description: 'Laptop 14" Core i5', price: 689.5, stock: 8 },
  { code: 'MOU-010', description: 'Mouse inalámbrico', price: 12.9, stock: 120 },
  { code: 'MON-024', description: 'Monitor 24" IPS', price: 159, stock: 3 },
  { code: 'SER-INST', description: 'Servicio de instalación', price: 25, stock: 0 },
];

const withTotal = (line: InvoiceLine): InvoiceLine => {
  const rate = TAX_RATES.find((tax) => tax.value === line.taxRateId)?.rate ?? 0;
  const subtotal = line.quantity * line.unitPrice * (1 - line.discountPercent / 100);
  return { ...line, total: subtotal * (1 + rate) };
};

const newLine = (product: Product): InvoiceLine =>
  withTotal({
    uuid: crypto.randomUUID(),
    code: product.code,
    description: product.description,
    quantity: 1,
    unitPrice: product.price,
    discountPercent: 0,
    taxRateId: 4,
    warehouseId: 1,
    total: 0,
    serials: product.code === 'LAP-001' ? 1 : 0,
  });

@Component({
  selector: 'app-tabulator-page',
  imports: [
    AcpTabulator,
    DecimalPipe,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './tabulator.html',
  styleUrl: './tabulator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabulatorPage {
  readonly products = PRODUCTS;
  private readonly linesTable = viewChild.required<AcpTabulator<InvoiceLine>>('linesTable');

  // Detalle de factura
  readonly lines = signal<InvoiceLine[]>([newLine(PRODUCTS[0]), newLine(PRODUCTS[1])]);
  readonly readonly = signal(false);
  readonly canSeeKardex = signal(true);
  readonly appearance = signal<'filled' | 'tonal'>('filled');
  readonly log = signal<string[]>([]);
  readonly grandTotal = computed(() => this.lines().reduce((sum, line) => sum + line.total, 0));

  readonly lineColumns: AcpTabulatorColumn<InvoiceLine>[] = [
    { title: 'Código', field: 'code', minWidth: 90 },
    AcpColumns.text<InvoiceLine>({
      title: 'Descripción',
      field: 'description',
      minWidth: 200,
      widthGrow: 3,
      editor: { maxLength: 300 },
      // Solo los servicios cambian su descripción
      editable: (line) => line.code.startsWith('SER'),
    }),
    AcpColumns.number<InvoiceLine>({
      title: 'Cantidad',
      field: 'quantity',
      minWidth: 80,
      editor: { positive: true, decimals: 2 },
    }),
    AcpColumns.money<InvoiceLine>({
      title: 'Precio',
      field: 'unitPrice',
      minWidth: 90,
      editor: { positive: true },
    }),
    AcpColumns.number<InvoiceLine>({
      title: 'Desc. %',
      field: 'discountPercent',
      minWidth: 80,
      editor: { min: 0, max: 100 },
    }),
    AcpColumns.list<InvoiceLine>({
      title: 'Impuesto',
      field: 'taxRateId',
      minWidth: 110,
      options: () => TAX_RATES,
    }),
    AcpColumns.list<InvoiceLine>({
      title: 'Bodega',
      field: 'warehouseId',
      minWidth: 120,
      options: () => WAREHOUSES,
    }),
    AcpColumns.money<InvoiceLine>({ title: 'Total', field: 'total', minWidth: 100 }),
  ];

  // Las acciones dependen de permisos: un computed las mantiene estables entre renders
  readonly lineActions = computed<AcpTabulatorAction<InvoiceLine>[]>(() => [
    { id: 'delete', icon: 'delete', color: 'error', label: 'Eliminar artículo' },
    {
      id: 'edit',
      icon: 'edit',
      color: 'info',
      label: 'Editar artículo',
      visible: (line) => !line.code.startsWith('SER'),
    },
    ...(this.canSeeKardex()
      ? [
          {
            id: 'kardex',
            icon: 'swap_vert',
            color: 'primary',
            label: 'Ver kardex',
            visible: (line: InvoiceLine) => !line.code.startsWith('SER'),
          } satisfies AcpTabulatorAction<InvoiceLine>,
        ]
      : []),
    {
      id: 'serials',
      icon: 'sell',
      label: (line) => `Series: ${line.serials} de ${line.quantity}`,
      color: (line) => (line.serials >= line.quantity ? 'success' : 'warning'),
      visible: (line) => line.code === 'LAP-001',
    },
  ]);

  // Clientes: solo lectura, ordenable, acciones tonales
  readonly customers = signal<Customer[]>([
    {
      id: 1,
      name: 'Comercial Andina S.A.',
      idCard: '1790012345001',
      city: 'Quito',
      balance: 1250.4,
    },
    { id: 2, name: 'María Fernanda López', idCard: '0912345678', city: 'Guayaquil', balance: 0 },
    {
      id: 3,
      name: 'Distribuidora El Sol',
      idCard: '0190087654001',
      city: 'Cuenca',
      balance: 389.15,
    },
    { id: 4, name: 'Juan Carlos Pérez', idCard: '1712345678', city: 'Ambato', balance: 74.9 },
    { id: 5, name: 'Ferretería Central', idCard: '1891234567001', city: 'Ambato', balance: 2310 },
  ]);

  readonly customerColumns: AcpTabulatorColumn<Customer>[] = [
    { title: 'Cliente', field: 'name', minWidth: 200, widthGrow: 2 },
    { title: 'Identificación', field: 'idCard', minWidth: 130 },
    { title: 'Ciudad', field: 'city', minWidth: 110 },
    AcpColumns.money<Customer>({ title: 'Saldo', field: 'balance', minWidth: 110 }),
  ];

  readonly customerActions: AcpTabulatorAction<Customer>[] = [
    { id: 'view', icon: 'visibility', color: 'primary', label: 'Ver cliente' },
    {
      id: 'collect',
      icon: 'payments',
      color: 'success',
      label: 'Registrar cobro',
      visible: (customer) => customer.balance > 0,
    },
  ];

  async addProduct(product: Product): Promise<void> {
    const line = newLine(product);
    this.lines.update((lines) => [...lines, line]);
    // Igual que ventas: abre la cantidad (la descripción en un servicio) de la línea nueva
    const opened = await this.linesTable().editCell(
      line.uuid,
      product.code.startsWith('SER') ? 'description' : 'quantity',
    );
    this.write(`agregado ${product.code}, editor abierto: ${opened}`);
  }

  onLineAction({ action, row }: AcpTabulatorActionEvent<InvoiceLine>): void {
    if (action === 'delete') this.lines.update((lines) => lines.filter((line) => line !== row));
    else if (action === 'serials') this.replace({ ...row, serials: row.quantity });
    this.write(`acción ${action} en ${row.code}`);
  }

  onLineEdited({ row, field, value, oldValue, revert }: AcpTabulatorCellEdit<InvoiceLine>): void {
    // Regla de ejemplo: más que el stock se rechaza y la celda vuelve al valor anterior
    const stock = PRODUCTS.find((product) => product.code === row.code)?.stock ?? 0;
    if (field === 'quantity' && stock && Number(value) > stock) {
      revert();
      this.write(`cantidad ${value} rechazada: stock ${stock}`);
      return;
    }
    this.replace(withTotal({ ...row, [field]: value }));
    this.write(`${row.code}.${field}: ${oldValue} → ${value}`);
  }

  onCustomerAction({ action, row }: AcpTabulatorActionEvent<Customer>): void {
    if (action === 'collect') {
      this.customers.update((list) => list.map((c) => (c === row ? { ...c, balance: 0 } : c)));
    }
    this.write(`acción ${action} en ${row.name}`);
  }

  private replace(line: InvoiceLine): void {
    this.lines.update((lines) => lines.map((item) => (item.uuid === line.uuid ? line : item)));
  }

  private write(message: string): void {
    this.log.update((log) => [message, ...log].slice(0, 8));
  }
}
