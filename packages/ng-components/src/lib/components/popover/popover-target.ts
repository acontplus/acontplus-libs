import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Directive that marks an element as a popover target.
 *
 * This directive provides a reference to an element that can be used
 * as the target for popover positioning. It's useful when you want
 * the popover to appear relative to a different element than the trigger.
 *
 * @example
 * ```html
 * <div acpPopoverTarget #target="acpPopoverTarget">Target element</div>
 * <button [acpPopoverTriggerFor]="popover" [acpPopoverTargetAt]="target">
 *   Trigger
 * </button>
 * ```
 */
@Directive({
  selector: 'acp-popover-target, [acpPopoverTarget]',
  exportAs: 'acpPopoverTarget',
  standalone: true,
})
export class AcpPopoverTarget {
  /** Reference to the target element. */
  elementRef = inject(ElementRef);
}
