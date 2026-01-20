import { Component } from '@angular/core';

/**
 * API documentation component for the ACP Popover.
 *
 * Displays comprehensive documentation for all popover-related components,
 * directives, and their properties, methods, and events.
 */
@Component({
  selector: 'app-popover-api',
  template: `
    <div class="api-documentation">
      <div class="api-section">
        <h3>AcpPopover</h3>
        <p>Main popover component that displays content in an overlay panel.</p>

        <h4>Properties</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>triggerEvent</td>
              <td>AcpPopoverTriggerEvent</td>
              <td>'hover'</td>
              <td>Event that triggers the popover (hover or click)</td>
            </tr>
            <tr>
              <td>position</td>
              <td>AcpPopoverPosition</td>
              <td>['below', 'after']</td>
              <td>Position of the popover relative to trigger</td>
            </tr>
            <tr>
              <td>enterDelay</td>
              <td>number</td>
              <td>100</td>
              <td>Delay in milliseconds before showing popover</td>
            </tr>
            <tr>
              <td>leaveDelay</td>
              <td>number</td>
              <td>100</td>
              <td>Delay in milliseconds before hiding popover</td>
            </tr>
            <tr>
              <td>xOffset</td>
              <td>number</td>
              <td>0</td>
              <td>Horizontal offset in pixels</td>
            </tr>
            <tr>
              <td>yOffset</td>
              <td>number</td>
              <td>0</td>
              <td>Vertical offset in pixels</td>
            </tr>
            <tr>
              <td>hideArrow</td>
              <td>boolean</td>
              <td>false</td>
              <td>Whether to hide the popover arrow</td>
            </tr>
            <tr>
              <td>closeOnPanelClick</td>
              <td>boolean</td>
              <td>false</td>
              <td>Whether clicking the panel closes the popover</td>
            </tr>
            <tr>
              <td>closeOnBackdropClick</td>
              <td>boolean</td>
              <td>true</td>
              <td>Whether clicking the backdrop closes the popover</td>
            </tr>
            <tr>
              <td>hasBackdrop</td>
              <td>boolean</td>
              <td>undefined</td>
              <td>Whether the popover has a backdrop</td>
            </tr>
            <tr>
              <td>focusTrapEnabled</td>
              <td>boolean</td>
              <td>false</td>
              <td>Whether to enable focus trapping</td>
            </tr>
          </tbody>
        </table>

        <h4>Events</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>closed</td>
              <td>EventEmitter&lt;PopoverCloseReason&gt;</td>
              <td>Emitted when the popover is closed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>AcpPopoverTrigger</h3>
        <p>Directive that triggers the popover display.</p>

        <h4>Properties</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>acpPopoverTriggerFor</td>
              <td>AcpPopoverPanel</td>
              <td>Reference to the popover instance</td>
            </tr>
            <tr>
              <td>popoverData</td>
              <td>any</td>
              <td>Data to pass to lazily-rendered content</td>
            </tr>
            <tr>
              <td>targetElement</td>
              <td>AcpPopoverTarget</td>
              <td>Alternative target element for positioning</td>
            </tr>
            <tr>
              <td>triggerEvent</td>
              <td>AcpPopoverTriggerEvent</td>
              <td>Override trigger event for this instance</td>
            </tr>
          </tbody>
        </table>

        <h4>Events</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>popoverOpened</td>
              <td>EventEmitter&lt;void&gt;</td>
              <td>Emitted when the popover is opened</td>
            </tr>
            <tr>
              <td>popoverClosed</td>
              <td>EventEmitter&lt;void&gt;</td>
              <td>Emitted when the popover is closed</td>
            </tr>
          </tbody>
        </table>

        <h4>Methods</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>openPopover()</td>
              <td>Opens the popover</td>
            </tr>
            <tr>
              <td>closePopover()</td>
              <td>Closes the popover</td>
            </tr>
            <tr>
              <td>togglePopover()</td>
              <td>Toggles the popover open/closed state</td>
            </tr>
            <tr>
              <td>focus(origin?, options?)</td>
              <td>Focuses the trigger element</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class PopoverApi {}
