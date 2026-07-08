import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  booleanAttribute,
  inject,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';

export type AcpAlertType = 'default' | 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'acp-alert',
  exportAs: 'acpAlert',
  host: {
    '[class]': 'hostClassList',
    '[class.acp-alert-dismissible]': 'dismissible',
    role: 'alert',
  },
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconButton],
})
export class AcpAlert {
  private _changeDetectorRef = inject(ChangeDetectorRef);

  get hostClassList() {
    return `acp-alert acp-alert-${this.type} mat-elevation-z${this.elevation}`;
  }

  /** The alert's type. Can be `default`, `info`, `success`, `warning` or `danger`. */
  @Input() type: AcpAlertType = 'default';

  /** Whether to display an inline close button. */
  @Input({ transform: booleanAttribute }) dismissible = false;

  /** The alert's elevation (0~24). */
  @Input() elevation = 0;

  /** Event emitted when the alert closed. */
  @Output() closed = new EventEmitter<AcpAlert>();

  _onClosed(): void {
    this._changeDetectorRef.markForCheck();
    this.closed.emit(this);
  }
}
