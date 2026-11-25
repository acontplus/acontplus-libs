import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, type MatMenuTrigger } from '@angular/material/menu';

interface Row {
  id: number;
  name: string;
}

@Component({
  selector: 'app-menu-page',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage {
  readonly rows: Row[] = [
    { id: 1, name: 'Factura 001-001-000123' },
    { id: 2, name: 'Factura 001-001-000124' },
    { id: 3, name: 'Nota de crédito 001-002-000045' },
  ];

  readonly lastAction = signal('-');
  readonly contextPosition = signal({ x: '0px', y: '0px' });

  run(action: string, row?: Row): void {
    this.lastAction.set(row ? `${action}: ${row.name}` : action);
  }

  openContextMenu(event: MouseEvent, trigger: MatMenuTrigger): void {
    event.preventDefault();
    this.contextPosition.set({ x: `${event.clientX}px`, y: `${event.clientY}px` });
    trigger.openMenu();
  }
}
