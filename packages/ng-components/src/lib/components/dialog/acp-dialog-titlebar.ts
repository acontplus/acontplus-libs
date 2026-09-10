import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  Signal,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import { AcpButton } from '../button';
import { ACP_DIALOG_TITLEBAR } from './dialog.tokens';
import { AcpButtonColor } from './dialog.interfaces';

/**
 * Dialog title bar. Use it inside a dialog content template for a declarative
 * header, or let `AcpDialogContainer` instantiate it from `config.header`.
 *
 * @example
 * ```html
 * <acp-dialog-titlebar title="Edit user" icon="person">
 *   <acp-dialog-actions align="end">
 *     <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
 *     <acp-button text="Save" color="success" (clicked)="ref.close(user)" />
 *   </acp-dialog-actions>
 * </acp-dialog-titlebar>
 * ```
 */
@Component({
  selector: 'acp-dialog-titlebar',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, MatDialogModule, MatIconModule, AcpButton, NgTemplateOutlet],
  template: `
    <ng-template #titlebarTemplate>
      <div
        [class]="headerClasses()"
        cdkDrag
        cdkDragRootElement=".cdk-overlay-pane"
        [cdkDragDisabled]="draggable() === false"
        cdkDragHandle
        (mousedown)="bringToFront()"
      >
        <h6 mat-dialog-title class="acp-dialog-title">
          @if (icon()) {
            <mat-icon class="acp-dialog-title-icon" aria-hidden="true">{{ icon() }}</mat-icon>
          }
          <span>
            @if (title()) {
              {{ title() }}
            } @else {
              <ng-content />
            }
          </span>
          @if (closable() !== false) {
            <acp-button
              class="acp-dialog-close-btn"
              variant="icon"
              icon="close"
              [color]="resolvedCloseColor()"
              [ariaLabel]="closeLabel() ?? 'Close dialog'"
              (clicked)="close()"
            />
          }
        </h6>
        @if (subtitle()) {
          <p class="acp-dialog-subtitle">{{ subtitle() }}</p>
        }
      </div>
    </ng-template>

    @if (renderInline()) {
      <ng-container [ngTemplateOutlet]="titlebarTemplate" />
    }
  `,
  host: {
    class: 'acp-dialog-titlebar',
    '[style.display]': 'hostDisplay()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AcpDialogTitlebar implements AfterViewInit {
  private readonly elementRef = inject(ElementRef);
  private readonly matDialogRef = inject(MatDialogRef, { optional: true });
  private readonly outlet = inject(ACP_DIALOG_TITLEBAR, { optional: true });
  private readonly titlebarTemplateRef: Signal<TemplateRef<unknown>> = viewChild.required(
    'titlebarTemplate',
    { read: TemplateRef },
  );

  protected readonly renderInline = signal(this.outlet == null);
  protected readonly hostDisplay = signal(this.outlet == null ? 'contents' : 'none');

  /** CSS classes applied to the header element. */
  protected readonly headerClasses = computed(() => {
    const classes = ['acp-dialog-header'];
    if (this.color()) {
      classes.push(`acp-dialog-header--${this.color()}`);
    }
    if (this.colorClass()) {
      classes.push(this.colorClass()!);
    }
    return classes.join(' ');
  });

  /** Close-button color resolved from `closeColor` or the header background. */
  protected readonly resolvedCloseColor = computed(() => {
    const requested = this.closeColor();
    if (requested) {
      return requested;
    }
    const darkBackgrounds = new Set([
      'primary',
      'secondary',
      'accent',
      'success',
      'info',
      'error',
      'danger',
      'dark',
    ]);
    return darkBackgrounds.has(this.color() ?? '') ? 'light' : 'dark';
  });

  /** Title text shown in the header. */
  title = input<string>();

  /** Optional subtitle shown below the title. */
  subtitle = input<string>();

  /** Optional Material icon name displayed before the title. */
  icon = input<string>();

  /** Whether the close button is shown. @default true */
  closable = input<boolean>(true);

  /** Accessible label for the close button. @default 'Close dialog' */
  closeLabel = input<string>('Close dialog');

  /** Whether the dialog can be dragged by its header. @default true */
  draggable = input<boolean>(true);

  /** Predefined header color theme. */
  color = input<AcpButtonColor>();

  /** Additional CSS class names to apply to the header. */
  colorClass = input<string>();

  /** Explicit close icon color. If omitted, it is chosen from the header `color`. */
  closeColor = input<'dark' | 'light'>();

  /** Emitted when the close button is clicked and no `MatDialogRef` is available. */
  closed = output<void>();

  close(): void {
    if (this.matDialogRef) {
      this.matDialogRef.close();
    } else {
      this.closed.emit();
    }
  }

  bringToFront(): void {
    const pane = this.elementRef.nativeElement.closest('.cdk-overlay-pane') as HTMLElement | null;
    if (pane) {
      const current = parseInt(pane.style.zIndex || '1000', 10);
      const next = Math.max(1000, isNaN(current) ? 1000 : current + 1);
      pane.style.zIndex = next.toString();
    }
  }

  ngAfterViewInit(): void {
    if (this.outlet) {
      this.outlet.register(this.titlebarTemplateRef(), this.title());
      this.hostDisplay.set('none');
    }
  }
}
