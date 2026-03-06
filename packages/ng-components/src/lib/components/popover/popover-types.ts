/** First value of popover's position. */
export type AcpPopoverPositionStart = 'above' | 'below' | 'before' | 'after';

/** Second value of popover's position. */
export type AcpPopoverPositionEnd = AcpPopoverPositionStart | 'center';

/** Popover's position. */
export type AcpPopoverPosition = [AcpPopoverPositionStart, AcpPopoverPositionEnd];

/** Popover's trigger event. */
export type AcpPopoverTriggerEvent = 'click' | 'hover' | 'none';

/** Reason why the popover was closed. */
export type PopoverCloseReason = void | 'click' | 'keydown' | 'tab' | 'programmatic';
