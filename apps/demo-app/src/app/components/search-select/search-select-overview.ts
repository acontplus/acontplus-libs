import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AcpSearchSelect } from '@acontplus/ng-components';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

interface Lookup {
  id: number;
  value: string;
  code?: string;
  children?: Lookup[];
}

const CITIES: Lookup[] = [
  { id: 1, value: 'Quito' },
  { id: 2, value: 'Guayaquil' },
  { id: 3, value: 'Cuenca' },
  { id: 4, value: 'Loja' },
  { id: 5, value: 'Ambato' },
];

const PROVINCES: Lookup[] = [
  {
    id: 17,
    value: 'Pichincha',
    children: [
      { id: 1701, value: 'Quito', code: '1701' },
      { id: 1702, value: 'Cayambe', code: '1702' },
    ],
  },
  {
    id: 9,
    value: 'Guayas',
    children: [
      { id: 901, value: 'Guayaquil', code: '0901' },
      { id: 907, value: 'Durán', code: '0907' },
    ],
  },
  {
    id: 1,
    value: 'Azuay',
    children: [{ id: 101, value: 'Cuenca', code: '0101' }],
  },
];

const CUSTOMERS: Lookup[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  value: `Cliente ${String(i + 1).padStart(3, '0')}`,
}));

@Component({
  selector: 'app-search-select-overview',
  imports: [AcpSearchSelect, FormsModule, ReactiveFormsModule, MatCardModule, DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Search Select</app-doc-heading>
      <p class="docs-component-description">
        Searchable select built on mat-autocomplete. Accepts flat lists or one-level groups
        (<code>children</code>), ignores accents when searching and works with ngModel, reactive
        forms and server-side search.
      </p>

      <h2>Flat list with ngModel</h2>
      <mat-card class="docs-example-card"
        ><mat-card-content>
          <acp-search-select
            [items]="cities"
            [(ngModel)]="cityId"
            [emptyValue]="0"
            label="Ciudad"
          />
          <p>Value: {{ cityId }}</p>
        </mat-card-content></mat-card
      >

      <h2>Groups with custom bindValue</h2>
      <mat-card class="docs-example-card"
        ><mat-card-content>
          <acp-search-select
            [items]="provinces"
            [(ngModel)]="cantonCode"
            bindValue="code"
            label="Ubicación"
            hint="Try typing 'duran'"
          >
            <ng-template #option let-item let-group="group">
              {{ item.value }} <small>· {{ group?.value }}</small>
            </ng-template>
          </acp-search-select>
          <p>Value: {{ cantonCode }}</p>
        </mat-card-content></mat-card
      >

      <h2>Reactive form, required</h2>
      <mat-card class="docs-example-card"
        ><mat-card-content>
          <acp-search-select
            [items]="cities"
            [formControl]="cityControl"
            label="Ciudad"
            required
            errorText="La ciudad es obligatoria"
          />
          <p>Value: {{ cityControl.value }} · valid: {{ cityControl.valid }}</p>
        </mat-card-content></mat-card
      >

      <h2>Server-side search</h2>
      <mat-card class="docs-example-card"
        ><mat-card-content>
          <acp-search-select
            [items]="customers()"
            [(value)]="customerId"
            [localFilter]="false"
            [loading]="loading()"
            label="Cliente"
            placeholder="Escriba al menos 2 letras"
            (searchChange)="searchCustomers($event)"
          />
          <p>Value: {{ customerId() }}</p>
        </mat-card-content></mat-card
      >
    </div>
  `,
  styles: `
    .docs-component-viewer-content {
      padding: 24px;
      max-width: 720px;
    }
    acp-search-select {
      max-width: 360px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SearchSelectOverview {
  readonly cities = CITIES;
  readonly provinces = PROVINCES;
  cityId = 0;
  cantonCode: string | null = '0907';
  readonly cityControl = new FormControl<number | null>(null, Validators.required);

  readonly customerId = signal<unknown>(null);
  readonly customers = signal<Lookup[]>([]);
  readonly loading = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  searchCustomers(term: string): void {
    clearTimeout(this.timer);
    if (term.trim().length < 2) {
      this.customers.set([]);
      return;
    }
    this.loading.set(true);
    this.timer = setTimeout(() => {
      const q = term.toLowerCase();
      this.customers.set(CUSTOMERS.filter(c => c.value.toLowerCase().includes(q)).slice(0, 20));
      this.loading.set(false);
    }, 300);
  }
}
