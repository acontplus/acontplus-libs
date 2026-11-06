import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export type AcpAlertType = 'default' | 'info' | 'success' | 'warning' | 'danger';

/**
 * - `soft`: tinted container (default).
 * - `outlined`: neutral container with a colored border and icon.
 * - `filled`: solid colored container, for high-emphasis messages.
 */
export type AcpAlertVariant = 'soft' | 'outlined' | 'filled';

const DEFAULT_ICONS: Record<AcpAlertType, string | null> = {
  default: null,
  info: 'info',
  success: 'check_circle',
  warning: 'warning',
  danger: 'error',
};

@Component({
  selector: 'acp-alert',
  exportAs: 'acpAlert',
  host: {
    '[class]': 'hostClassList()',
    '[class.acp-alert-dismissible]': 'dismissible()',
    '[attr.role]': 'role()',
    '[attr.hidden]': 'isOpen() ? null : ""',
  },
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconButton, MatIcon],
})
export class AcpAlert {
  /** The alert's type. Can be `default`, `info`, `success`, `warning` or `danger`. */
  readonly type = input<AcpAlertType>('default');

  /** Visual style: `soft` (default), `outlined` or `filled`. */
  readonly variant = input<AcpAlertVariant>('soft');

  /** Optional bold heading shown above the content. */
  readonly heading = input<string>();

  /** Material icon name. Defaults to an icon per type (none for `default`). */
  readonly icon = input<string>();

  /** Whether to show the icon. */
  readonly showIcon = input(true, { transform: booleanAttribute });

  /** Whether to display an inline close button. */
  readonly dismissible = input(false, { transform: booleanAttribute });

  /** Accessible label of the close button. */
  readonly closeLabel = input('Cerrar');

  /** The alert's elevation (0~24). */
  readonly elevation = input(0, { transform: numberAttribute });

  /** Event emitted when the alert is closed. */
  readonly closed = output<AcpAlert>();

  private readonly _open = signal(true);

  /** Whether the alert is visible. */
  readonly isOpen = this._open.asReadonly();

  protected readonly resolvedIcon = computed(() =>
    this.showIcon() ? (this.icon() ?? DEFAULT_ICONS[this.type()]) : null,
  );

  /** Errors and warnings interrupt screen readers; the rest are announced politely. */
  protected readonly role = computed(() =>
    this.type() === 'danger' || this.type() === 'warning' ? 'alert' : 'status',
  );

  protected readonly hostClassList = computed(
    () =>
      `acp-alert acp-alert-${this.type()} acp-alert--${this.variant()} mat-elevation-z${this.elevation()}`,
  );

  /** Hides the alert and emits `closed`. */
  close(): void {
    if (!this._open()) {
      return;
    }
    this._open.set(false);
    this.closed.emit(this);
  }

  /** Shows the alert again after it was closed. */
  open(): void {
    this._open.set(true);
  }
}
