import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  AcpSidePanelItemTemplate,
  AcpSidePanelLayout,
  type AcpSidePanelItem,
} from '@acontplus/ng-components';

type ReportType = 'stock' | 'kardex' | 'lots' | 'valuation' | 'expiration';
type Folder = 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash';

@Component({
  selector: 'app-side-panel-layout-page',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    AcpSidePanelLayout,
    AcpSidePanelItemTemplate,
  ],
  templateUrl: './side-panel-layout.html',
  styleUrl: './side-panel-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelLayoutPage {
  readonly reports: AcpSidePanelItem<ReportType>[] = [
    { id: 'stock', label: 'Existencias', icon: 'inventory_2' },
    { id: 'kardex', label: 'Kardex', icon: 'receipt_long' },
    { id: 'lots', label: 'Lotes', icon: 'qr_code_2' },
    { id: 'valuation', label: 'Valoración', icon: 'paid' },
    { id: 'expiration', label: 'Caducidad', icon: 'event_busy' },
  ];
  readonly report = signal<ReportType | null>('stock');
  readonly toggleReport = signal<ReportType | null>('kardex');
  readonly panelOpened = signal(true);

  readonly folders: AcpSidePanelItem<Folder>[] = [
    { id: 'inbox', label: 'Recibidos', icon: 'inbox', description: '12 sin leer', badge: 12 },
    { id: 'sent', label: 'Enviados', icon: 'send', description: 'Comprobantes enviados' },
    { id: 'drafts', label: 'Borradores', icon: 'drafts', badge: 3 },
    { id: 'spam', label: 'Spam', icon: 'report', disabled: true },
    { id: 'trash', label: 'Papelera', icon: 'delete' },
  ];
  readonly folder = signal<Folder | null>('inbox');

  readonly settings: AcpSidePanelItem[] = [
    { id: 1, label: 'Empresa', icon: 'business' },
    { id: 2, label: 'Establecimientos', icon: 'store' },
    { id: 3, label: 'Puntos de emisión', icon: 'point_of_sale' },
    { id: 4, label: 'Bodegas', icon: 'warehouse' },
    { id: 5, label: 'Usuarios', icon: 'group' },
    { id: 6, label: 'Firma electrónica', icon: 'verified_user' },
  ];
  readonly setting = signal<string | number | null>(1);
  readonly search = signal('');
  readonly filteredSettings = computed(() => {
    const term = this.search().trim().toLowerCase();
    return term
      ? this.settings.filter((item) => item.label.toLowerCase().includes(term))
      : this.settings;
  });

  readonly contacts: AcpSidePanelItem<string>[] = [
    { id: 'ana', label: 'Ana Torres', description: 'Contadora' },
    { id: 'luis', label: 'Luis Paredes', description: 'Bodega' },
    { id: 'maria', label: 'María Vega', description: 'Ventas' },
  ];
  readonly contact = signal<string | null>('ana');

  readonly compactItem = signal<string | number | null>(1);

  protected initials(label: string): string {
    return label
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2);
  }

  protected label<T>(items: AcpSidePanelItem<T>[], id: T | null): string {
    return items.find((item) => item.id === id)?.label ?? '';
  }
}
