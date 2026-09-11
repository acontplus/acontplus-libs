import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Declarative dialog content body. Use it inside `<acp-dialog>` or any dialog
 * content template to mark the scrollable body section.
 *
 * @example
 * ```html
 * <acp-dialog-content>
 *   <p>Dialog body</p>
 * </acp-dialog-content>
 * ```
 */
@Component({
  selector: 'acp-dialog-content',
  standalone: true,
  template: `<ng-content />`,
  host: { class: 'acp-dialog-content' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AcpDialogContent {}
