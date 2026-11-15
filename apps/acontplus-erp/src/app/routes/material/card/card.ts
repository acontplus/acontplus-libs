import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ACP_CARD_SLOTS, AcpCard, AcpCardColor, AcpCardPadding } from '@acontplus/ng-components';

@Component({
  selector: 'app-card-page',
  imports: [AcpCard, ACP_CARD_SLOTS, MatButtonModule, MatIconModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPage {
  readonly paddings: AcpCardPadding[] = ['small', 'medium', 'large'];
  readonly colors: AcpCardColor[] = [
    'primary-container',
    'secondary-container',
    'tertiary-container',
    'error-container',
  ];
  readonly stats = [
    { label: 'Ventas del mes', value: '$ 48.250', icon: 'trending_up', delta: '+12,5 %' },
    { label: 'Facturas emitidas', value: '1.284', icon: 'receipt_long', delta: '+4,1 %' },
    { label: 'Clientes nuevos', value: '86', icon: 'group_add', delta: '+9,8 %' },
  ];
  readonly loading = signal(false);
  readonly lastClicked = signal('');

  toggleLoading(): void {
    this.loading.update((value) => !value);
  }
}
