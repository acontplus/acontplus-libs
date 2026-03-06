/**
 * Throws an exception for the case when popover trigger doesn't have a valid acp-popover instance
 */
export function throwAcpPopoverMissingError() {
  throw Error(`acp-popover-trigger: must pass in an acp-popover instance.

    Example:
      <acp-popover #popover="acpPopover"></acp-popover>
      <button [acpPopoverTriggerFor]="popover"></button>`);
}

/**
 * Throws an exception for the case when popover's acpPopoverPosition[0] value isn't valid.
 * In other words, it doesn't match 'above', 'below', 'before' or 'after'.
 */
export function throwAcpPopoverInvalidPositionStart() {
  throw Error(`acpPopoverPosition[0] value must be either 'above', 'below', 'before' or 'after'.
    Example: <acp-popover [position]="['below', 'after']" #popover="acpPopover"></acp-popover>`);
}

/**
 * Throws an exception for the case when popover's acpPopoverPosition[1] value isn't valid.
 * In other words, it doesn't match 'above', 'below', 'before', 'after' or 'center'.
 */
export function throwAcpPopoverInvalidPositionEnd() {
  throw Error(`acpPopoverPosition[1] value must be either 'above', 'below', 'before', 'after' or 'center'.
    Example: <acp-popover [position]="['below', 'after']" #popover="acpPopover"></acp-popover>`);
}
