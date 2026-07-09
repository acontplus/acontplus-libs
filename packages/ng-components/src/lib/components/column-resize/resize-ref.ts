import { ElementRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export class ResizeRef {
  constructor(
    readonly origin: ElementRef,
    readonly overlayRef: OverlayRef,
    readonly minWidthPx: number,
    readonly maxWidthPx: number,
    readonly liveUpdates = true,
  ) {}
}
