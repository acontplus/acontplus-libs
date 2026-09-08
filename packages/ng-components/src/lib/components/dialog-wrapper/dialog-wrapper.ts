import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Signal,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogWrapperConfig } from '../../services';
import { Button } from '../button';
import { DialogZIndexService } from '../../services/dialog/dialog-z-index.service';

/**
 * A wrapper component for Angular Material dialogs that provides a consistent look and feel,
 * including a draggable header and the ability to dynamically create components inside the dialog.
 *
 * This component is typically used with the AdvancedDialogService's openInWrapper method.
 */
@Component({
  selector: 'acp-dialog-wrapper',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, MatDialogModule, MatIconModule, Button],
  templateUrl: './dialog-wrapper.html',
  styleUrls: ['./dialog-wrapper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DialogWrapper implements AfterViewInit {
  dialogRef = inject<MatDialogRef<DialogWrapper>>(MatDialogRef);
  config = inject<DialogWrapperConfig>(MAT_DIALOG_DATA);
  private zIndexService = inject(DialogZIndexService);

  /**
   * A template reference that acts as an anchor for dynamic content.
   * This is where the component specified in the config will be rendered.
   */
  readonly contentHost: Signal<ViewContainerRef> = viewChild.required('contentHost', {
    read: ViewContainerRef,
  });

  /**
   * A reference to the header element for the z-index focus logic.
   * Used to bring the dialog to the front when clicked.
   */
  readonly header: Signal<ElementRef | undefined> = viewChild<ElementRef>('dialogHeader');

  /**
   * Lifecycle hook that initializes the dynamic content after the view is ready.
   * Creates the component specified in the config and passes data to it.
   */
  ngAfterViewInit(): void {
    // Dynamically create the content component after the view is ready.
    this.contentHost().clear();
    const componentRef = this.contentHost().createComponent(this.config.component);

    // Pass the provided data to the new component. `setInput` supports both signal
    // inputs and decorator-based @Input() properties and marks the component dirty;
    // fall back to a plain property assignment when `data` is not declared as an input.
    if (this.config.data !== undefined && componentRef.instance) {
      try {
        componentRef.setInput('data', this.config.data);
      } catch {
        (componentRef.instance as { data?: unknown }).data = this.config.data;
      }
    }
  }

  /**
   * Closes the dialog.
   * Called when the close button in the header is clicked.
   */
  onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Brings the dialog to the front by adjusting its z-index.
   * Uses the centralized DialogZIndexService for consistent z-index management.
   * Called when the dialog header is clicked.
   */
  bringToFront(): void {
    const headerElement = this.header()?.nativeElement;
    if (headerElement) {
      this.zIndexService.bringToFront(headerElement);
    }
  }
}
