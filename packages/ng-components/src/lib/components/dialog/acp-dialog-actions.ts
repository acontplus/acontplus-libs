import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  isSignal,
  Signal,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isObservable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AcpButton } from '../button';
import { ACP_DIALOG_ACTIONS } from './dialog.tokens';
import {
  AcpDialogAction,
  AcpDialogActionClick,
  AcpDialogActionState,
  AcpDialogContainerData,
} from './dialog.interfaces';

/**
 * Dialog actions container. Use it declaratively inside a dialog content
 * template, or let `AcpDialogContainer` instantiate it from `config.actions`.
 *
 * @example
 * ```html
 * <acp-dialog-actions align="end">
 *   <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
 *   <acp-button text="Save" color="success" (clicked)="ref.close(user)" />
 * </acp-dialog-actions>
 * ```
 */
@Component({
  selector: 'acp-dialog-actions',
  standalone: true,
  imports: [MatDialogModule, AcpButton, NgTemplateOutlet],
  template: `
    <ng-template #actionsTemplate><ng-content /></ng-template>

    @if (renderInline()) {
      <mat-dialog-actions
        class="acp-dialog-actions"
        [class.acp-dialog-actions-start]="align() === 'start'"
        [class.acp-dialog-actions-center]="align() === 'center'"
        [class.acp-dialog-actions-end]="align() === 'end'"
        [align]="align()"
        [attr.aria-label]="ariaLabel()"
      >
        @for (action of actions() ?? []; track action.key ?? action.text ?? $index) {
          <acp-button
            [text]="action.text"
            [color]="action.color ?? 'primary'"
            [appearance]="action.appearance ?? 'filled'"
            [variant]="action.variant ?? 'basic'"
            [icon]="action.icon"
            [suffixIcon]="action.suffixIcon"
            [disabled]="resolveActionState(action.disabled)"
            [loading]="resolveActionState(action.loading)"
            [ariaLabel]="action.ariaLabel"
            [size]="action.size ?? 'large'"
            [block]="action.block ?? false"
            [extended]="action.extended ?? false"
            [type]="action.type ?? 'button'"
            [form]="action.form"
            (click)="handleActionClick($event, action)"
          />
        }
        <ng-container [ngTemplateOutlet]="actionsTemplate" />
      </mat-dialog-actions>
    }
  `,
  host: {
    role: 'group',
    '[style.display]': 'hostDisplay()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AcpDialogActions implements AfterViewInit {
  private readonly outlet = inject(ACP_DIALOG_ACTIONS, { optional: true });
  private readonly matDialogRef = inject(MatDialogRef, { optional: true });
  private readonly containerData = inject<AcpDialogContainerData>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly injector = inject(Injector);
  private readonly actionsTemplateRef: Signal<TemplateRef<unknown>> = viewChild.required(
    'actionsTemplate',
    { read: TemplateRef },
  );
  private readonly actionStateSignals = new WeakMap<object, Signal<boolean>>();

  protected readonly renderInline = signal(this.outlet == null);
  protected readonly hostDisplay = signal(this.outlet == null ? 'contents' : 'none');

  /** Alignment of the action buttons. @default 'end' */
  align = input<'start' | 'center' | 'end'>('end');

  /** Configured footer actions. When omitted, the component works as a declarative slot. */
  actions = input<AcpDialogAction[]>();

  /** Optional title used to label the actions footer. */
  dialogTitle = input<string>();

  /** Accessible label for the actions footer. Falls back to a generated one. */
  ariaLabel = computed(() => {
    const title = this.dialogTitle();
    return title ? `Actions for ${title}` : 'Dialog actions';
  });

  ngAfterViewInit(): void {
    if (this.outlet) {
      this.outlet.register(this.actionsTemplateRef(), this.align());
      this.hostDisplay.set('none');
    }
  }

  /** Resolves an action's boolean state (boolean, signal or observable). */
  protected resolveActionState(state: AcpDialogActionState | undefined): boolean {
    if (state === undefined) {
      return false;
    }
    if (typeof state === 'boolean') {
      return state;
    }
    if (isSignal(state)) {
      return state();
    }
    if (isObservable(state)) {
      let sig = this.actionStateSignals.get(state);
      if (!sig) {
        sig = toSignal(state, { injector: this.injector, initialValue: false });
        this.actionStateSignals.set(state, sig);
      }
      return sig();
    }
    return false;
  }

  /** Broadcasts the click and closes the dialog unless the event is prevented. */
  protected handleActionClick(event: MouseEvent, action: AcpDialogAction): void {
    const click: AcpDialogActionClick = { action, event };
    this.containerData?.actionClicks?.next(click);
  }
}
