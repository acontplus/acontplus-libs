import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Declarative dialog structure wrapper. Use it inside a dialog content template
 * to group the titlebar, body and actions sections.
 *
 * @example
 * ```html
 * <acp-dialog>
 *   <acp-dialog-titlebar title="Edit user" icon="person" />
 *   <acp-dialog-content>
 *     <p>Dialog body</p>
 *   </acp-dialog-content>
 *   <acp-dialog-actions align="end">
 *     <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
 *     <acp-button text="Save" color="success" (clicked)="ref.close(user)" />
 *   </acp-dialog-actions>
 * </acp-dialog>
 * ```
 */
@Component({
  selector: 'acp-dialog',
  standalone: true,
  template: `
    <ng-content select="acp-dialog-titlebar" />
    <ng-content select="acp-dialog-content" />
    <ng-content select="acp-dialog-actions" />
    <ng-content />
  `,
  host: {
    class: 'acp-dialog',
    '[style.display]': '"contents"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AcpDialog {}
