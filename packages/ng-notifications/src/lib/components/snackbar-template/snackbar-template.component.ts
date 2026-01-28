import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface SnackbarTemplateData {
  message: string;
  title?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  action?: string;
  showIcon?: boolean;
  showCloseIcon?: boolean;
  showProgressBar?: boolean;
  duration?: number;
}

@Component({
  selector: 'acp-snackbar-template',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="snackbar-content">
      <!-- Icon (configurable) -->
      @if (data.showIcon === true) {
        <div class="snackbar-icon">
          <mat-icon [attr.aria-label]="getIconAriaLabel()">{{ getIcon() }}</mat-icon>
        </div>
      }

      <!-- Using official Angular Material directive for label -->
      <div matSnackBarLabel class="snackbar-message">
        @if (data.title) {
          <div class="snackbar-title">{{ data.title }}</div>
        }
        <div class="snackbar-text">{{ data.message }}</div>
      </div>

      <!-- Using official Angular Material directives for actions -->
      <div matSnackBarActions class="snackbar-actions">
        @if (data.showCloseIcon) {
          <button
            mat-icon-button
            matSnackBarAction
            (click)="dismiss()"
            class="snackbar-close-button"
            [attr.aria-label]="'Close notification'"
          >
            <mat-icon>close</mat-icon>
          </button>
        }
      </div>
    </div>

    <!-- Progress bar (configurable) -->
    @if (data.showProgressBar === true && data.duration && data.duration > 0) {
      <div class="snackbar-progress-container">
        <div class="snackbar-progress-bar" [style.animation-duration.ms]="data.duration"></div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .snackbar-content {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        color: inherit;
        padding: 0;
      }

      .snackbar-icon {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .snackbar-icon mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: inherit;
      }

      .snackbar-message {
        flex: 1;
        min-width: 0;
        color: inherit;
      }

      .snackbar-title {
        font-weight: 600;
        font-size: 14px;
        line-height: 1.2;
        margin-bottom: 2px;
        color: inherit;
      }

      .snackbar-text {
        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
        color: inherit;
      }

      .snackbar-actions {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .snackbar-actions button {
        min-width: auto;
        font-weight: 500;
        color: inherit;
      }

      .snackbar-actions .mat-mdc-button {
        padding: 0 8px;
      }

      .snackbar-close-button {
        width: 32px;
        height: 32px;
        padding: 0;
        min-width: 32px;
      }

      .snackbar-close-button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      /* Progress bar container */
      .snackbar-progress-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.2);
        overflow: hidden;
      }

      .snackbar-progress-bar {
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        width: 100%;
        transform-origin: left center;
        animation: snackbar-progress linear forwards;
      }

      @keyframes snackbar-progress {
        0% {
          transform: scaleX(1);
        }
        100% {
          transform: scaleX(0);
        }
      }

      /* Type-specific icon colors - inherit from container */
      :host-context(.acontplus-snackbar-success) .snackbar-icon mat-icon {
        color: rgba(255, 255, 255, 0.9);
      }

      :host-context(.acontplus-snackbar-error) .snackbar-icon mat-icon {
        color: rgba(255, 255, 255, 0.9);
      }

      :host-context(.acontplus-snackbar-warning) .snackbar-icon mat-icon {
        color: rgba(255, 255, 255, 0.9);
      }

      :host-context(.acontplus-snackbar-info) .snackbar-icon mat-icon {
        color: rgba(255, 255, 255, 0.9);
      }

      /* Ensure buttons are properly styled */
      :host-context(.acontplus-snackbar) .snackbar-actions button {
        color: rgba(255, 255, 255, 0.9) !important;
      }

      :host-context(.acontplus-snackbar) .snackbar-actions button:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }
    `,
  ],
})
export class SnackbarTemplateComponent {
  public data = inject<SnackbarTemplateData>(MAT_SNACK_BAR_DATA);
  private snackBarRef = inject(MatSnackBarRef<SnackbarTemplateComponent>);

  getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'notifications';
    }
  }

  getIconAriaLabel(): string {
    switch (this.data.type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return 'Notification';
    }
  }

  dismiss(): void {
    this.snackBarRef.dismissWithAction();
  }
}
