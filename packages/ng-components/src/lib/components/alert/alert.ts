import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  WritableSignal,
  OutputEmitterRef,
  input,
  output,
  signal,
  inject,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';

export type AcpAlertType = 'default' | 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'acp-alert',
  exportAs: 'acpAlert',
  host: {
    '[class]': 'hostClassList',
    '[class.acp-alert-dismissible]': 'dismissible()',
    '[class.acp-alert-hidden]': '!visible()',
    '[attr.role]': 'visible() ? "alert" : null',
    '[attr.aria-live]': 'type() === "danger" ? "assertive" : "polite"',
    '[attr.aria-atomic]': 'true',
  },
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconButton],
})
export class AcpAlert {
  private _changeDetectorRef = inject(ChangeDetectorRef);

  /** Signal to control visibility */
  visible: WritableSignal<boolean> = signal(true);

  /** The alert's type. Can be `default`, `info`, `success`, `warning` or `danger`. */
  type = input<AcpAlertType>('default');

  /** Whether to display an inline close button. */
  dismissible = input(false, { transform: (value: unknown) => value === '' || value === true });

  /** The alert's elevation (0~24). */
  elevation = input(0, { transform: (value: unknown) => Number(value) || 0 });

  /** Event emitted when the alert closed. */
  closed: OutputEmitterRef<AcpAlert> = output<AcpAlert>();

  get hostClassList() {
    const clampedElevation = Math.max(0, Math.min(24, this.elevation()));
    return `acp-alert acp-alert-${this.type()} mat-elevation-z${clampedElevation}`;
  }

  /** Programmatically close the alert */
  close(): void {
    this._onClosed();
  }

  /** Programmatically show the alert */
  show(): void {
    this.visible.set(true);
    this._changeDetectorRef.markForCheck();
  }

  _onClosed(): void {
    this.visible.set(false);
    this._changeDetectorRef.markForCheck();
    this.closed.emit(this);
  }
}
