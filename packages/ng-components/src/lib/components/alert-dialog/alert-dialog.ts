import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  ComponentRef,
  ChangeDetectionStrategy,
  createComponent,
  EnvironmentInjector,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertDialogOptions, AlertDialogResult } from '../../services';
import { NgClass } from '@angular/common';
import { Button } from '../button/button';
import { ButtonVariant, MaterialButtonStyle } from '@acontplus/ui-kit';

type ButtonType = 'confirm' | 'cancel' | 'deny';

@Component({
  selector: 'acp-alert-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgClass,
    Button,
  ],
  templateUrl: 'alert-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .alert-dialog {
        text-align: center;
        padding: 1rem;
        position: relative;
        overflow: hidden;
      }

      .timer-progress {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
      }

      .alert-dialog-image {
        margin: 1rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .alert-dialog-image img {
        max-width: 100%;
        border-radius: 8px;
      }

      .alert-dialog-icon {
        margin: 1rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon-large {
        font-size: 80px;
        width: 80px;
        height: 80px;
      }

      .icon-success mat-icon {
        color: #10b981;
      }

      .icon-error mat-icon {
        color: #ef4444;
      }

      .icon-warning mat-icon {
        color: #f59e0b;
      }

      .icon-info mat-icon {
        color: #3b82f6;
      }

      .icon-question mat-icon {
        color: #8b5cf6;
      }

      .alert-dialog-title {
        font-size: 1.5rem;
        font-weight: 600;
        text-align: center;
      }

      .alert-dialog-content {
        color: #666;
        font-size: 1rem;
        min-height: 50px;
      }

      .alert-input-field {
        width: 100%;
        margin-top: 1rem;
      }

      .alert-dialog-actions {
        gap: 0.75rem;
        padding: 1rem 0 0.5rem 0;
        display: flex;
        justify-content: center;
      }

      .alert-dialog-actions.reverse-buttons {
        flex-direction: row-reverse;
      }

      .confirm-button,
      .cancel-button,
      .deny-button {
        min-width: 100px;
      }

      .cancel-button {
        color: #333;
      }

      .alert-dialog-footer {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e0e0e0;
        font-size: 0.875rem;
        color: #666;
      }
    `,
  ],
})
export class AlertDialog implements OnInit, OnDestroy {
  @ViewChild('inputField') inputField?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  private container!: ViewContainerRef;

  private componentRef: ComponentRef<any> | null = null;

  inputValue = '';
  validationError: string | null = null;
  timerProgress = 100;
  private timerInterval: any;
  sanitizedHtml: SafeHtml;
  sanitizedFooter: SafeHtml | null = null;
  public dialogRef = inject(MatDialogRef<AlertDialog>);
  public data = inject<AlertDialogOptions>(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer);
  private environmentInjector = inject(EnvironmentInjector);

  constructor() {
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.data.html || '');
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  // Start the timer for auto-closing the dialog
  private startTimer(): void {
    if (!this.data.timer) return;

    const startTime = Date.now();
    const endTime = startTime + this.data.timer;

    this.timerInterval = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        this.dialogRef.close({
          isConfirmed: false,
          isDismissed: true,
          isDenied: false,
          dismiss: 'timer',
        });
        return;
      }

      this.timerProgress = (remaining / this.data.timer!) * 100;
    }, 50);
  }

  // Load dynamic component
  private loadComponent(): void {
    if (!this.data.component) return;

    this.container.clear();

    // Create the component using the view container's injector
    this.componentRef = createComponent(this.data.component, {
      environmentInjector: this.container.injector.get(EnvironmentInjector),
    });

    // Pass input properties to the dynamic component
    if (this.data.componentProps) {
      Object.keys(this.data.componentProps).forEach(key => {
        (this.componentRef!.instance as any)[key] = this.data.componentProps![key];
      });
    }

    // Attach the view
    this.container.insert(this.componentRef.hostView);
  }

  ngOnInit(): void {
    if (this.data.component) {
      this.loadComponent();
    }

    if (this.data.timer) {
      this.startTimer();
    }

    if (this.data.footerHtml) {
      this.sanitizedFooter = this.sanitizer.bypassSecurityTrustHtml(this.data.footerHtml);
    }
  }

  getIconName(): string {
    if (this.data.icon) {
      return this.data.icon;
    }

    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'question':
        return 'help';
      default:
        return '';
    }
  }

  getButtonVariant(buttonType: ButtonType): ButtonVariant {
    const variant = (this.data as any)[`${buttonType}ButtonVariant`] as ButtonVariant | undefined;
    if (variant) return variant;

    // Default variants based on button type and alert type
    if (buttonType === 'confirm') {
      switch (this.data.type) {
        case 'success':
          return 'success';
        case 'error':
          return 'danger';
        case 'warning':
          return 'warning';
        case 'info':
          return 'info';
        case 'question':
          return 'primary';
        default:
          return 'primary';
      }
    } else if (buttonType === 'cancel') {
      return 'secondary';
    } else if (buttonType === 'deny') {
      return 'danger';
    }

    return 'primary';
  }

  getButtonIcon(buttonType: ButtonType): string {
    const icon = (this.data as any)[`${buttonType}ButtonIcon`] as string | undefined;
    if (icon) return icon;

    // Default icons based on button type
    switch (buttonType) {
      case 'confirm':
        return this.data.type === 'question' ? 'check' : '';
      case 'cancel':
        return 'close';
      case 'deny':
        return 'block';
      default:
        return '';
    }
  }

  getButtonStyle(buttonType: ButtonType): MaterialButtonStyle {
    const style = (this.data as any)[`${buttonType}ButtonStyle`] as MaterialButtonStyle | undefined;
    return style || 'elevated';
  }

  async onConfirm(): Promise<void> {
    if (this.data.input && this.data.inputValidator) {
      const error = await Promise.resolve(this.data.inputValidator(this.inputValue));
      if (error) {
        this.validationError = error;
        return;
      }
    }

    if (this.data.preConfirm) {
      try {
        const result = await Promise.resolve(this.data.preConfirm(this.inputValue || undefined));
        this.dialogRef.close({
          isConfirmed: true,
          isDismissed: false,
          isDenied: false,
          value: result,
        });
      } catch (error) {
        console.error('Error in preConfirm:', error);
      }
    } else {
      this.dialogRef.close({
        isConfirmed: true,
        isDismissed: false,
        isDenied: false,
        value: this.inputValue || undefined,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close({
      isConfirmed: false,
      isDismissed: true,
      isDenied: false,
      dismiss: 'cancel',
    });
  }

  onDeny(): void {
    if (this.data.preDeny) {
      try {
        const result = this.data.preDeny(this.inputValue || undefined);
        if (result instanceof Promise) {
          result
            .then(() => {
              this.dialogRef.close({
                isConfirmed: false,
                isDismissed: false,
                isDenied: true,
                value: this.inputValue || undefined,
              });
            })
            .catch(error => {
              this.validationError = error instanceof Error ? error.message : String(error);
            });
        } else {
          this.dialogRef.close({
            isConfirmed: false,
            isDismissed: false,
            isDenied: true,
            value: this.inputValue || undefined,
          });
        }
      } catch (error) {
        this.validationError = error instanceof Error ? error.message : String(error);
      }
    } else {
      this.dialogRef.close({
        isConfirmed: false,
        isDismissed: false,
        isDenied: true,
        value: this.inputValue || undefined,
      });
    }
  }

  onInputEnter(): void {
    if (this.data.allowEnterKey !== false && this.data.input !== 'textarea') {
      this.onConfirm();
    }
  }

  private closeWithResult(result: AlertDialogResult): void {
    this.dialogRef.close(result);
  }

  getConfirmColor(): any {
    if (!this.data.confirmButtonColor) return 'primary';
    if (['primary', 'accent', 'warn'].includes(this.data.confirmButtonColor)) {
      return this.data.confirmButtonColor;
    }
    return undefined;
  }

  getCancelColor(): any {
    if (!this.data.cancelButtonColor) return undefined;
    if (['primary', 'accent', 'warn'].includes(this.data.cancelButtonColor)) {
      return this.data.cancelButtonColor;
    }
    return undefined;
  }

  getDenyColor(): any {
    if (!this.data.denyButtonColor) return undefined;
    if (['primary', 'accent', 'warn'].includes(this.data.denyButtonColor)) {
      return this.data.denyButtonColor;
    }
    return undefined;
  }

  getConfirmBackgroundColor(): string | undefined {
    if (!this.data.confirmButtonColor) return undefined;
    if (['primary', 'accent', 'warn'].includes(this.data.confirmButtonColor)) {
      return undefined;
    }
    return this.data.confirmButtonColor;
  }

  getCancelBackgroundColor(): string | undefined {
    if (!this.data.cancelButtonColor) return undefined;
    if (['primary', 'accent', 'warn'].includes(this.data.cancelButtonColor)) {
      return undefined;
    }
    return this.data.cancelButtonColor;
  }

  getDenyBackgroundColor(): string | undefined {
    if (!this.data.denyButtonColor) return undefined;
    if (['primary', 'accent', 'warn'].includes(this.data.denyButtonColor)) {
      return undefined;
    }
    return this.data.denyButtonColor;
  }
}
