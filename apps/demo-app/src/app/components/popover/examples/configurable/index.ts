import { App } from './app';
import hljs from 'highlight.js';

const appHtml = `<div class="demo-popover">
  <div class="demo-controls">
    <form [formGroup]="popoverForm" class="controls-form">
      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Trigger Event</mat-label>
          <mat-select formControlName="triggerEvent">
            @for (event of triggerEvents; track event) {
            <mat-option [value]="event"> {{ event }} </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Position</mat-label>
          <mat-select formControlName="position" [compareWith]="comparePositions">
            @for (pos of positions; track pos.value) {
            <mat-option [value]="pos.value"> {{ pos.label }} </mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Enter Delay (ms)</mat-label>
          <input matInput type="number" formControlName="enterDelay" min="0" max="5000" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Leave Delay (ms)</mat-label>
          <input matInput type="number" formControlName="leaveDelay" min="0" max="5000" />
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>X Offset (px)</mat-label>
          <input matInput type="number" formControlName="xOffset" min="-100" max="100" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Y Offset (px)</mat-label>
          <input matInput type="number" formControlName="yOffset" min="-100" max="100" />
        </mat-form-field>
      </div>

      <div class="form-row checkboxes">
        <mat-checkbox formControlName="hideArrow">Hide Arrow</mat-checkbox>
        <mat-checkbox formControlName="closeOnPanelClick">Close on Panel Click</mat-checkbox>
        <mat-checkbox formControlName="closeOnBackdropClick">Close on Backdrop Click</mat-checkbox>
      </div>

      <div class="form-row checkboxes">
        <mat-checkbox formControlName="hasBackdrop">Has Backdrop</mat-checkbox>
        <mat-checkbox formControlName="focusTrapEnabled">Focus Trap Enabled</mat-checkbox>
      </div>
    </form>
  </div>

  <div class="demo-content">
    <div class="popover-demo-area">
      <button
        mat-raised-button
        color="primary"
        [acpPopoverTriggerFor]="configPopover"
        [triggerEvent]="config.triggerEvent"
        (popoverOpened)="onPopoverOpened()"
        (popoverClosed)="onPopoverClosed()"
      >
        {{ config.triggerEvent === 'hover' ? 'Hover me' : 'Click me' }}
      </button>

      <acp-popover
        #configPopover="acpPopover"
        [triggerEvent]="config.triggerEvent"
        [position]="config.position"
        [enterDelay]="config.enterDelay"
        [leaveDelay]="config.leaveDelay"
        [xOffset]="config.xOffset"
        [yOffset]="config.yOffset"
        [hideArrow]="config.hideArrow"
        [closeOnPanelClick]="config.closeOnPanelClick"
        [closeOnBackdropClick]="config.closeOnBackdropClick"
        [hasBackdrop]="config.hasBackdrop"
        [focusTrapEnabled]="config.focusTrapEnabled"
      >
        <div class="popover-content">
          <h4>Popover Content</h4>
          <p>This is a configurable popover example.</p>
          <p>Current settings:</p>
          <ul>
            <li>Trigger: {{ config.triggerEvent }}</li>
            <li>Position: {{ config.position[0] }} {{ config.position[1] }}</li>
            <li>Enter Delay: {{ config.enterDelay }}ms</li>
            <li>Leave Delay: {{ config.leaveDelay }}ms</li>
          </ul>
          @if (config.closeOnPanelClick) {
          <button mat-button color="accent">Click to close</button>
          }
        </div>
      </acp-popover>
    </div>

    <div class="demo-info">
      <h3>Configuration</h3>
      <p>Use the controls above to configure the popover behavior and appearance.</p>
      <ul>
        <li><strong>Trigger Event:</strong> How the popover is activated (hover or click)</li>
        <li><strong>Position:</strong> Where the popover appears relative to the trigger</li>
        <li><strong>Delays:</strong> Time before showing/hiding the popover</li>
        <li><strong>Offsets:</strong> Fine-tune positioning with pixel adjustments</li>
        <li><strong>Arrow:</strong> Toggle the popover's pointing arrow</li>
        <li><strong>Click Behaviors:</strong> Control how clicking closes the popover</li>
        <li><strong>Backdrop:</strong> Add an overlay behind the popover</li>
        <li><strong>Focus Trap:</strong> Keep keyboard focus within the popover</li>
      </ul>
    </div>
  </div>
</div>
`;

const appTs = `import { Component } from '@angular/core';
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
`;

const appScss = `.demo-popover {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.demo-controls {
  background: var(--mat-sys-surface-container);
  border-radius: 8px;
  padding: 1.5rem;
}

.controls-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;

  mat-form-field {
    flex: 1;
    min-width: 200px;
  }

  &.checkboxes {
    gap: 2rem;

    mat-checkbox {
      flex: none;
    }
  }
}

.demo-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.popover-demo-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background: var(--mat-sys-surface-container-low);
  border-radius: 8px;
  border: 2px dashed var(--mat-sys-outline-variant);
}

.demo-info {
  flex: 1;
  min-width: 300px;
  background: var(--mat-sys-surface-container);
  border-radius: 8px;
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    color: var(--mat-sys-on-surface);
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
}

.popover-content {
  padding: 1rem;
  max-width: 300px;

  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--mat-sys-on-surface);
  }

  p {
    margin: 0.5rem 0;
    line-height: 1.4;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    font-size: 0.9rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  button {
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;

    mat-form-field {
      min-width: unset;
    }
  }

  .demo-content {
    flex-direction: column;
  }

  .popover-demo-area,
  .demo-info {
    min-width: unset;
  }
}
`;

const popoverConfigurableExampleConfig = {
  title: 'Configurable popover',
  component: App,
  files: [
    {
      file: 'app.html',
      content: hljs.highlightAuto(appHtml, ['html']).value,
      filecontent: appHtml,
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs, ['typescript']).value,
      filecontent: appTs,
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss, ['scss']).value,
      filecontent: appScss,
    },
  ],
};

export { popoverConfigurableExampleConfig };
