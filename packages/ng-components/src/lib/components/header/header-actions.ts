import { Component, input, output, computed  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import type { AcpHeaderAction, AcpHeaderActionEvent } from './header.types';

/**
 * AcpHeaderActions Component
 *
 * Helper component for rendering action buttons.
 *
 * @example
 * ```html
 * <acp-header-actions
 *   [actions]="actions"
 *   (action)="onAction($event)"
 * />
 * ```
 */
@Component({
  selector: 'acp-header-actions',
  template: `
    @for (action of actions(); track action.id) {
      @if (action.visible !== false) {
        <button
          mat-icon-button
          [disabled]="action.disabled"
          [matTooltip]="action.tooltip"
          (click)="action?.click($event, action)"
          [attr.aria-label]="action.label || action.icon"
        >
          @if (action.icon) {
            <mat-icon>{{ action.icon }}</mat-icon>
          } @else if (action.label) {
            <span>{{ action.label }}</span>
          }
          @if (action.badge) {
            <span class="acp-header__badge">{{ action.badge }}</span>
          }
        </button>
      }
    }
  `,
  host: { class: 'acp-header-actions' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
})
export class AcpHeaderActions {
  /**
   * Array of actions to display. Can be a signal or a plain array.
   */
  readonly actions = input<AcpHeaderAction[]>([]);
  
  
}
