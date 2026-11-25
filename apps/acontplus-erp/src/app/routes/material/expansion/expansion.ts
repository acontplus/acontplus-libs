import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AcpCard, AcpCardSubtitle, AcpCardTitle, AcpDialogService } from '@acontplus/ng-components';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ExpansionDialogContent } from './expansion-dialog';

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-expansion-page',
  imports: [
    AcpCard,
    AcpCardSubtitle,
    AcpCardTitle,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './expansion.html',
  styleUrl: './expansion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPage {
  readonly #dialogs = inject(AcpDialogService);

  readonly faqs: Faq[] = [
    {
      question: '¿Cómo emito una factura?',
      answer: 'Desde Ventas > Facturas, pulse Nuevo, complete el cliente y los productos y guarde.',
    },
    {
      question: '¿Puedo anular un comprobante autorizado?',
      answer:
        'Sí, desde el detalle del comprobante con la opción Anular, dentro del plazo del SRI.',
    },
    {
      question: '¿Dónde descargo el XML?',
      answer: 'En el listado de comprobantes, menú de acciones de la fila > Descargar XML.',
    },
  ];

  readonly step = signal(0);
  readonly dialogResult = signal('-');
  readonly customer = signal({ name: '', email: '', address: '' });
  readonly multi = signal(false);

  openInDialog(): void {
    this.#dialogs
      .open(ExpansionDialogContent, {
        header: { title: 'Editar producto', icon: 'inventory_2' },
        size: 'md',
        actions: [
          { text: 'Cancelar', appearance: 'text' },
          { text: 'Guardar', color: 'success', result: 'saved' },
        ],
      })
      .afterClosed()
      .subscribe((result) => this.dialogResult.set(result === 'saved' ? 'Guardado' : 'Cancelado'));
  }

  next(): void {
    this.step.update((step) => step + 1);
  }

  prev(): void {
    this.step.update((step) => step - 1);
  }

  update(field: 'name' | 'email' | 'address', value: string): void {
    this.customer.update((customer) => ({ ...customer, [field]: value }));
  }
}
