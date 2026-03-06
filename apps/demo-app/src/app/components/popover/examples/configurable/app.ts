import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AcpPopover, AcpPopoverTrigger } from '@acontplus/ng-components';
import { AcpPopoverPosition, AcpPopoverTriggerEvent } from '@acontplus/ng-components';

/**
 * Configurable popover example component.
 *
 * Demonstrates various popover configurations with interactive controls
 * allowing users to test different settings and behaviors.
 */
@Component({
  selector: 'app-popover-configurable-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    AcpPopover,
    AcpPopoverTrigger,
  ],
})
export class App {
  /** Form group for popover configuration */
  popoverForm = new FormGroup({
    triggerEvent: new FormControl<AcpPopoverTriggerEvent>('hover'),
    position: new FormControl<AcpPopoverPosition>(['below', 'after']),
    enterDelay: new FormControl(100),
    leaveDelay: new FormControl(100),
    xOffset: new FormControl(0),
    yOffset: new FormControl(0),
    hideArrow: new FormControl(false),
    closeOnPanelClick: new FormControl(false),
    closeOnBackdropClick: new FormControl(true),
    hasBackdrop: new FormControl(false),
    focusTrapEnabled: new FormControl(false),
  });

  /** Available trigger events */
  triggerEvents: AcpPopoverTriggerEvent[] = ['hover', 'click'];

  /** Available position options */
  positions: { value: AcpPopoverPosition; label: string }[] = [
    { value: ['above', 'before'], label: 'Above Before' },
    { value: ['above', 'center'], label: 'Above Center' },
    { value: ['above', 'after'], label: 'Above After' },
    { value: ['below', 'before'], label: 'Below Before' },
    { value: ['below', 'center'], label: 'Below Center' },
    { value: ['below', 'after'], label: 'Below After' },
    { value: ['before', 'above'], label: 'Before Above' },
    { value: ['before', 'center'], label: 'Before Center' },
    { value: ['before', 'below'], label: 'Before Below' },
    { value: ['after', 'above'], label: 'After Above' },
    { value: ['after', 'center'], label: 'After Center' },
    { value: ['after', 'below'], label: 'After Below' },
  ];

  /**
   * Gets the current form values for the popover configuration.
   * @returns Current form values with proper defaults
   */
  get config() {
    const formValue = this.popoverForm.value;
    return {
      triggerEvent: formValue.triggerEvent ?? 'hover',
      position: formValue.position ?? ['below', 'after'],
      enterDelay: formValue.enterDelay ?? 100,
      leaveDelay: formValue.leaveDelay ?? 100,
      xOffset: formValue.xOffset ?? 0,
      yOffset: formValue.yOffset ?? 0,
      hideArrow: formValue.hideArrow ?? false,
      closeOnPanelClick: formValue.closeOnPanelClick ?? false,
      closeOnBackdropClick: formValue.closeOnBackdropClick ?? true,
      hasBackdrop: formValue.hasBackdrop ?? false,
      focusTrapEnabled: formValue.focusTrapEnabled ?? false,
    };
  }

  /**
   * Handles popover opened event.
   */
  onPopoverOpened() {
    // Popover opened
  }

  /**
   * Handles popover closed event.
   */
  onPopoverClosed() {
    // Popover closed
  }

  /**
   * Compares position arrays for mat-select.
   * @param pos1 First position array
   * @param pos2 Second position array
   * @returns Whether positions are equal
   */
  comparePositions(pos1: AcpPopoverPosition, pos2: AcpPopoverPosition): boolean {
    return pos1?.[0] === pos2?.[0] && pos1?.[1] === pos2?.[1];
  }
}
