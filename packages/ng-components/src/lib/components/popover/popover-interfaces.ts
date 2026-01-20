import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, TemplateRef } from '@angular/core';
import { AcpPopoverTriggerEvent, AcpPopoverPosition, PopoverCloseReason } from './popover-types';

/**
 * Interface for a custom popover panel that can be used with `acpPopoverTriggerFor`.
 * @docs-private
 */
export interface AcpPopoverPanel {
  triggerEvent: AcpPopoverTriggerEvent;
  enterDelay: number;
  leaveDelay: number;
  position: AcpPopoverPosition;
  xOffset: number;
  yOffset: number;
  closeOnPanelClick: boolean;
  closeOnBackdropClick: boolean;
  closeDisabled: boolean;
  backdropClass?: string;
  overlayPanelClass?: string | string[];
  hasBackdrop?: boolean;
  templateRef: TemplateRef<any>;
  lazyContent?: any;
  direction?: Direction;
  readonly panelId?: string;
  readonly closed: EventEmitter<PopoverCloseReason>;
  setCurrentStyles: (pos?: AcpPopoverPosition) => void;
  setPositionClasses: (pos?: AcpPopoverPosition) => void;
  setElevation: () => void;
}

/** Default `acp-popover` options that can be overridden. */
export interface AcpPopoverDefaultOptions {
  triggerEvent?: AcpPopoverTriggerEvent;
  enterDelay?: number;
  leaveDelay?: number;
  position?: AcpPopoverPosition;
  xOffset?: number;
  yOffset?: number;
  arrowWidth?: number;
  arrowHeight?: number;
  arrowOffsetX?: number;
  arrowOffsetY?: number;
  hideArrow?: boolean;
  closeOnPanelClick?: boolean;
  closeOnBackdropClick?: boolean;
  overlayPanelClass?: string;
  backdropClass?: string;
  hasBackdrop?: boolean;
  focusTrapEnabled?: boolean;
  focusTrapAutoCaptureEnabled?: boolean;
}
