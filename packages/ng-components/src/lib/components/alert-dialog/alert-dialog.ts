import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  createComponent,
  ElementRef,
  EnvironmentInjector,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertDialogOptions, ButtonConfig } from '../../services';
import { NgClass } from '@angular/common';
import { Button } from '../button/button';
import { ButtonVariant, MaterialButtonStyle } from '@acontplus/ui-kit';
import { DialogZIndexService } from '../../services/dialog/dialog-z-index.service';

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
    DragDropModule,
    NgClass,
    Button,
  ],
  templateUrl: 'alert-dialog.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [
    `
      .acp-alert-dialog {
        position: relative;
        overflow: hidden;
        padding: 0;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
      }

      /* ===== ALERT HEADER ===== */
      .acp-alert-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 24px 24px 0 24px;
        position: relative;
      }

      .acp-alert-header .acp-alert-dialog-icon {
        margin: 0;
        flex-shrink: 0;
        margin-top: 4px; /* Alinear con el texto del título */
      }

      /* ===== TITLE ===== */
      .acp-alert-dialog-title {
        margin: 0 0 12px 0;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.2;
        color: #1a1a1a;
        text-align: left;
      }

      /* ===== CONTENT ===== */
      .acp-alert-dialog-content {
        /* Sin padding/margin - mat-dialog-content ya los maneja */
        text-align: left;

        .acp-alert-message {
          margin: 0;
          font-size: 16px;
          line-height: 1.4;
          color: #666;
        }
      }

      /* ===== ACTIONS ===== */
      .acp-alert-dialog-actions {
        margin: 24px 24px 24px 24px;
        padding: 0;
        gap: 12px;
      }

      /* Reverse buttons - solo cambiar el orden, mat-dialog-actions maneja align */
      .acp-alert-dialog-actions.reverse-buttons {
        flex-direction: row-reverse;
      }

      /* Vertical buttons */
      .acp-alert-dialog-actions.vertical-buttons {
        flex-direction: column;
        align-items: stretch;
      }

      .acp-alert-dialog-actions.vertical-buttons.reverse-buttons {
        flex-direction: column-reverse;
      }

      /* ===== CLOSE BUTTON ===== */
      .close-button {
        position: relative;
        z-index: 10;
        width: 40px;
        height: 40px;
        margin: 0;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 50%;

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
          color: rgba(0, 0, 0, 0.6);
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      /* ===== LAYOUTS ===== */

      /* Modern Layout - Icon a la izquierda */
      .acp-alert-dialog.modern-layout {
        .acp-alert-header {
          padding: 24px 24px 0 24px;

          .acp-alert-dialog-icon {
            margin-right: 16px;

            .icon-large {
              font-size: 48px;
              width: 48px;
              height: 48px;
            }
          }
        }
      }

      /* ===== ICON POSITIONS ===== */
      .acp-alert-dialog.icon-center {
        .acp-alert-header {
          flex-direction: column;
          text-align: center;
          align-items: center;
          padding: 24px 24px 16px 24px;

          .acp-alert-dialog-icon {
            margin: 0 0 16px 0;
          }

          .close-button {
            position: absolute;
            top: 16px;
            right: 16px;
          }
        }

        .acp-alert-dialog-title,
        .acp-alert-dialog-content {
          text-align: center;
        }
      }

      .acp-alert-dialog.icon-top {
        .acp-alert-header {
          flex-direction: column;
          align-items: flex-start;
          padding: 24px 24px 16px 24px;

          .acp-alert-dialog-icon {
            margin: 0 0 16px 0;
          }

          .close-button {
            position: absolute;
            top: 16px;
            right: 16px;
          }
        }
      }

      /* ===== CONTENT ALIGNMENT ===== */
      .acp-alert-dialog.content-left {
        .acp-alert-dialog-title,
        .acp-alert-dialog-content {
          text-align: left;
        }
      }

      .acp-alert-dialog.content-center {
        .acp-alert-header {
          justify-content: center;
        }

        .acp-alert-dialog-title,
        .acp-alert-dialog-content {
          text-align: center;
        }
      }

      .acp-alert-dialog.content-right {
        .acp-alert-dialog-title,
        .acp-alert-dialog-content {
          text-align: right;
        }
      }

      /* ===== TIMER PROGRESS ===== */
      .timer-progress {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        z-index: 5;
        border-radius: 0;
      }

      /* Asegurar que la barra de progreso sea visible */
      :host ::ng-deep .timer-progress .mdc-linear-progress__bar {
        transition: transform 50ms linear;
      }

      :host ::ng-deep .timer-progress .mdc-linear-progress__buffer {
        background-color: rgba(0, 0, 0, 0.1);
      }

      /* ===== ICON COLORS ===== */
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

      .icon-delete mat-icon {
        color: #ef4444;
      }

      /* ===== LEGACY STYLES ===== */
      .acp-alert-dialog-image {
        margin: 1rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .acp-alert-dialog-image img {
        max-width: 100%;
        border-radius: 8px;
      }

      .acp-alert-input-field {
        width: 100%;
        margin-top: 1rem;
      }

      .acp-confirm-button,
      .acp-cancel-button,
      .acp-deny-button {
        min-width: 100px;
      }

      .acp-cancel-button {
        color: #333;
      }

      .acp-alert-dialog-footer {
        margin: 0 24px 24px 24px;
        padding-top: 1rem;
        border-top: 1px solid #e0e0e0;
        font-size: 0.875rem;
        color: #666;
      }

      /* ===== CDK DRAG STYLES ===== */
      .acp-alert-header[cdkDrag] {
        cursor: move;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }

      .acp-alert-header[cdkDrag]:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }

      /* Prevent text selection during drag */
      .cdk-drag-dragging {
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }

      /* ===== ANIMATIONS ===== */
      :host ::ng-deep .animation-fade .mat-mdc-dialog-container {
        animation: fadeIn 0.3s ease-out;
      }

      :host ::ng-deep .animation-slide .mat-mdc-dialog-container {
        animation: slideIn 0.3s ease-out;
      }

      :host ::ng-deep .animation-bounce .mat-mdc-dialog-container {
        animation: bounceIn 0.5s ease-out;
      }

      :host ::ng-deep .animation-zoom .mat-mdc-dialog-container {
        animation: zoomIn 0.3s ease-out;
      }

      /* ===== KEYFRAMES ===== */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideIn {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes bounceIn {
        0% {
          transform: scale(0.3);
          opacity: 0;
        }
        50% {
          transform: scale(1.05);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes zoomIn {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    `,
  ],
})
export class AlertDialog implements OnInit, OnDestroy {
  @ViewChild('inputField') inputField?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  @ViewChild('dialogTitle') dialogTitle?: ElementRef<HTMLElement>;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  private container!: ViewContainerRef;

  private componentRef: ComponentRef<any> | null = null;
  private timerInterval: any;

  inputValue = '';
  validationError: string | null = null;
  timerProgress = 100;
  sanitizedHtml: SafeHtml;
  sanitizedFooter: SafeHtml | null = null;
  public dialogRef = inject(MatDialogRef<AlertDialog>);
  public data = inject<AlertDialogOptions>(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private zIndexService = inject(DialogZIndexService);

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

    console.log('Starting timer with duration:', this.data.timer);
    const startTime = Date.now();
    const endTime = startTime + this.data.timer;
    this.timerProgress = 100;

    this.timerInterval = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        this.timerProgress = 0;
        this.cdr.detectChanges();
        console.log('Timer finished, closing dialog');
        this.dialogRef.close({
          isConfirmed: false,
          isDismissed: true,
          isDenied: false,
          dismiss: 'timer',
        });
        return;
      }

      const newProgress = (remaining / this.data.timer!) * 100;
      if (Math.abs(this.timerProgress - newProgress) > 0.5) {
        this.timerProgress = newProgress;
        this.cdr.detectChanges();
      }
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

    if (this.data.footerHtml) {
      this.sanitizedFooter = this.sanitizer.bypassSecurityTrustHtml(this.data.footerHtml);
    }

    // Inicializar timer después de que el componente esté listo
    if (this.data.timer) {
      // Usar setTimeout para asegurar que el componente esté completamente inicializado
      setTimeout(() => {
        this.startTimer();
      }, 100);
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
      case 'delete':
        return 'delete_forever';
      default:
        return '';
    }
  }

  onClose(): void {
    this.dialogRef.close({
      isConfirmed: false,
      isDismissed: true,
      isDenied: false,
      dismiss: 'close',
    });
  }

  private getButtonConfig(buttonType: ButtonType): ButtonConfig {
    return this.data.buttons?.[buttonType] || {};
  }

  getButtonVariant(buttonType: ButtonType): ButtonVariant {
    const config = this.getButtonConfig(buttonType);
    if (config.variant) return config.variant;

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
        case 'delete':
          return 'danger';
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
    const config = this.getButtonConfig(buttonType);
    if (config.icon) return config.icon;

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
    const config = this.getButtonConfig(buttonType);
    return config.style || 'elevated';
  }

  getButtonText(buttonType: ButtonType): string {
    const config = this.getButtonConfig(buttonType);
    if (config.text) return config.text;

    // Default text based on button type
    switch (buttonType) {
      case 'confirm':
        return 'OK';
      case 'cancel':
        return 'Cancelar';
      case 'deny':
        return 'No';
      default:
        return 'OK';
    }
  }

  getButtonDisabled(buttonType: ButtonType): boolean {
    const config = this.getButtonConfig(buttonType);
    return config.disabled || false;
  }

  getButtonFocus(buttonType: ButtonType): boolean {
    const config = this.getButtonConfig(buttonType);
    return config.focus || buttonType === 'confirm';
  }

  getActionsAlignment(): 'start' | 'center' | 'end' {
    // Si hay una configuración específica de alineación de acciones, usarla
    if (this.data.actionsAlignment) {
      return this.data.actionsAlignment;
    }

    // Si no, usar la alineación del contenido como referencia
    switch (this.data.contentAlignment) {
      case 'left':
        return 'start';
      case 'center':
        return 'center';
      case 'right':
        return 'end';
      default:
        return 'end'; // Por defecto a la derecha
    }
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

  private getButtonColor(buttonType: ButtonType, isBackground = false): any {
    const config = this.getButtonConfig(buttonType);
    const color = config.color;

    if (!color) {
      return buttonType === 'confirm' ? 'primary' : undefined;
    }

    const materialColors = ['primary', 'accent', 'warn'];
    if (isBackground) {
      return materialColors.includes(color) ? undefined : color;
    }
    return materialColors.includes(color) ? color : undefined;
  }

  getConfirmColor(): any {
    return this.getButtonColor('confirm');
  }

  getCancelColor(): any {
    return this.getButtonColor('cancel');
  }

  getDenyColor(): any {
    return this.getButtonColor('deny');
  }

  getConfirmBackgroundColor(): string | undefined {
    return this.getButtonColor('confirm', true);
  }

  getCancelBackgroundColor(): string | undefined {
    return this.getButtonColor('cancel', true);
  }

  getDenyBackgroundColor(): string | undefined {
    return this.getButtonColor('deny', true);
  }

  // ===== CDK DRAG FUNCTIONALITY =====

  /**
   * Brings the dialog to the front by adjusting its z-index.
   * Uses the centralized DialogZIndexService for consistent z-index management.
   * Called when the dialog header is clicked.
   */
  bringToFront(): void {
    this.zIndexService.bringToFront(this.elementRef.nativeElement);
  }
}
