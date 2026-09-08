import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OverlayRef } from '@angular/cdk/overlay';

export type DialogType = 'normal' | 'alert';

/**
 * Minimal structural type for the parts of MatDialogRef used here.
 * `MatDialogRef` does not expose its `OverlayRef` publicly, so it is read
 * through the internal `_overlayRef` field. Guarded everywhere it is used.
 */
interface DialogRefWithOverlay {
  _overlayRef?: OverlayRef;
}

/**
 * Centralized service that manages z-index stacking for all dialogs.
 * Ensures dialogs always appear in the correct order.
 * Alert dialogs always take priority over regular dialogs.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogZIndexService {
  // Z-index ranges per dialog type
  private static readonly Z_INDEX_RANGES = {
    normal: { base: 1000, current: 1000 }, // Regular dialogs: 1000-1999
    alert: { base: 2000, current: 2000 }, // Alert dialogs: 2000-2999 (always on top)
  };

  private static readonly Z_INDEX_INCREMENT = 10;

  /**
   * Gets the next available z-index for a specific dialog type.
   * @param type Dialog type (normal, alert)
   * @returns The next z-index to use
   */
  getNextZIndex(type: DialogType = 'normal'): number {
    const range = DialogZIndexService.Z_INDEX_RANGES[type];
    range.current += DialogZIndexService.Z_INDEX_INCREMENT;
    return range.current;
  }

  /**
   * Gets the highest z-index currently in use for a specific type.
   * @param type Dialog type
   * @returns The highest z-index currently in use for that type
   */
  getCurrentZIndex(type: DialogType = 'normal'): number {
    return DialogZIndexService.Z_INDEX_RANGES[type].current;
  }

  /**
   * Gets the highest z-index across all dialog types.
   * @returns The highest z-index of all dialogs
   */
  getHighestZIndex(): number {
    return Math.max(
      ...Object.values(DialogZIndexService.Z_INDEX_RANGES).map(range => range.current),
    );
  }

  /**
   * Resets the z-index counter (useful for testing).
   * @param type Specific type to reset, or undefined to reset all
   */
  reset(type?: DialogType): void {
    if (type) {
      const range = DialogZIndexService.Z_INDEX_RANGES[type];
      range.current = range.base;
    } else {
      Object.values(DialogZIndexService.Z_INDEX_RANGES).forEach(range => {
        range.current = range.base;
      });
    }
  }

  /**
   * Applies a z-index to a specific dialog.
   * @param dialogRef Dialog reference
   * @param type Dialog type (determines the z-index range)
   * @param zIndex Specific z-index to apply (optional)
   */
  applyZIndex(
    dialogRef: MatDialogRef<unknown>,
    type: DialogType = 'normal',
    zIndex?: number,
  ): void {
    const targetZIndex = zIndex ?? this.getNextZIndex(type);
    const overlayRef = this.getOverlayRef(dialogRef);
    if (!overlayRef) {
      return;
    }

    const pane = overlayRef.overlayElement;
    const backdrop = overlayRef.backdropElement;

    if (pane) {
      pane.style.zIndex = (targetZIndex + 2).toString();
      // Data attributes for debugging
      pane.setAttribute('data-dialog-type', type);
      pane.setAttribute('data-z-index', targetZIndex.toString());
    }

    if (backdrop) {
      backdrop.style.zIndex = (targetZIndex + 1).toString();
    }
  }

  /**
   * Brings a dialog to the front (used by the drag functionality).
   * @param element Dialog element to bring to the front
   * @param type Dialog type
   */
  bringToFront(element: HTMLElement, type: DialogType = 'normal'): void {
    const pane = element.closest('.cdk-overlay-pane') as HTMLElement;
    if (pane) {
      const newZIndex = this.getNextZIndex(type);
      pane.style.zIndex = (newZIndex + 2).toString();
      pane.setAttribute('data-z-index', newZIndex.toString());

      // Also update the backdrop if it exists
      const backdrop = pane.parentElement?.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      if (backdrop) {
        backdrop.style.zIndex = (newZIndex + 1).toString();
      }
    }
  }

  /**
   * Forces a dialog to stay above every other dialog.
   * Useful for critical alerts that must have maximum priority.
   * @param dialogRef Dialog reference
   */
  forceToTop(dialogRef: MatDialogRef<unknown>): void {
    const highestZIndex = this.getHighestZIndex();
    const topZIndex = highestZIndex + DialogZIndexService.Z_INDEX_INCREMENT;
    const overlayRef = this.getOverlayRef(dialogRef);
    if (!overlayRef) {
      return;
    }

    const pane = overlayRef.overlayElement;
    const backdrop = overlayRef.backdropElement;

    if (pane) {
      pane.style.zIndex = (topZIndex + 2).toString();
      pane.setAttribute('data-z-index', topZIndex.toString());
      pane.setAttribute('data-forced-top', 'true');
    }
    if (backdrop) {
      backdrop.style.zIndex = (topZIndex + 1).toString();
    }
  }

  private getOverlayRef(dialogRef: MatDialogRef<unknown>): OverlayRef | undefined {
    return (dialogRef as unknown as DialogRefWithOverlay)._overlayRef;
  }
}
