import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AcpGridCellActionDisablePipe } from './data-grid.pipes';
import { DataGridMenuItem } from './interfaces';

@Component({
  selector: 'acp-grid-menu',
  exportAs: 'acpGridMenu',
  template: `
    <mat-menu class="acp-grid-menu">
      @for (item of items; track $index) {
        @if (!item.iif || item.iif(data)) {
          @if (item.children && item.children.length > 0) {
            <button
              mat-menu-item
              [matMenuTriggerFor]="gridMenu.menu"
              [disabled]="item | cellActionDisable: data"
              [class]="item.class"
              (click)="item.click?.(data, $event)"
            >
              <mat-icon *ngTemplateOutlet="iconTpl; context: { $implicit: item }" />
              <span>{{ item.text }}</span>
            </button>

            <acp-grid-menu #gridMenu [items]="item.children" [data]="data" />
          } @else {
            <button
              mat-menu-item
              [disabled]="item | cellActionDisable: data"
              [class]="item.class"
              (click)="item.click?.(data, $event)"
            >
              <mat-icon *ngTemplateOutlet="iconTpl; context: { $implicit: item }" />
              <span>{{ item.text }}</span>
            </button>
          }
        }
      }
    </mat-menu>

    <ng-template #iconTpl let-item>
      @if (item.icon) {
        <mat-icon class="acp-grid-icon">{{ item.icon }}</mat-icon>
      } @else if (item.fontIcon) {
        <mat-icon class="acp-grid-icon" [fontIcon]="item.fontIcon"></mat-icon>
      } @else if (item.svgIcon) {
        <mat-icon class="acp-grid-icon" [svgIcon]="item.svgIcon"></mat-icon>
      }
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    AcpGridMenu,
    AcpGridCellActionDisablePipe,
  ],
})
export class AcpGridMenu {
  @ViewChild(MatMenu, { static: true }) menu!: MatMenu;

  @Input() items: DataGridMenuItem[] = [];

  @Input() data: Record<string, any> = {};
}
