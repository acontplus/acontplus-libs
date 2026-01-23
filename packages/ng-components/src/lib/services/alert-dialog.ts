import { Injectable, inject, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialog } from './../components';
import { firstValueFrom } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ButtonVariant, MaterialButtonStyle } from '@acontplus/ui-kit';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question';
export type AlertPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'center-start'
  | 'center-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export interface AlertDialogOptions {
  // ===== Content and Appearance =====
  title?: string;
  message?: string;
  html?: string; // Custom HTML instead of message
  icon?: string; // Custom Material Icons
  iconColor?: string;
  type?: AlertType;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  position?: AlertPosition;
  customClass?: string;
  panelClass?: string | string[];
  backdropClass?: string;

  // ===== Custom Component Support =====
  component?: Type<any>;
  componentProps?: Record<string, any>;

  // ===== Layout and Behavior =====
  verticalButtons?: boolean;
  fullWidthButtons?: boolean;
  reverseButtons?: boolean;
  timer?: number;
  timerProgressBar?: boolean;
  disableClose?: boolean;
  closeOnBackdropClick?: boolean;
  allowEscapeKey?: boolean;
  allowEnterKey?: boolean;
  scrollbarPadding?: boolean;

  // ===== Button Configuration =====
  // - Visibility
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  showDenyButton?: boolean;

  // - Labels
  confirmText?: string;
  cancelText?: string;
  denyText?: string;

  // - Icons
  confirmButtonIcon?: string;
  cancelButtonIcon?: string;
  denyButtonIcon?: string;

  // - Variants (using ButtonVariant from ui-kit)
  confirmButtonVariant?: ButtonVariant;
  cancelButtonVariant?: ButtonVariant;
  denyButtonVariant?: ButtonVariant;

  // - Styles (elevated, flat, etc.)
  confirmButtonStyle?: MaterialButtonStyle;
  cancelButtonStyle?: MaterialButtonStyle;
  denyButtonStyle?: MaterialButtonStyle;

  // - Colors (Material palette or hex)
  confirmButtonColor?: ThemePalette | string;
  cancelButtonColor?: ThemePalette | string;
  denyButtonColor?: ThemePalette | string;

  // - States
  disableConfirmButton?: boolean;
  disableCancelButton?: boolean;
  disableDenyButton?: boolean;

  // - Focus Management
  focusConfirm?: boolean;
  focusCancel?: boolean;
  focusDeny?: boolean;

  // ===== Loading States =====
  processing?: boolean;
  processingButton?: 'confirm' | 'cancel' | 'deny';

  // ===== Input Field (for prompts) =====
  input?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea';
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  inputValidator?: (value: string) => string | null | Promise<string | null>;
  inputAttributes?: Record<string, string>;

  // ===== Media =====
  imageUrl?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageAlt?: string;

  // ===== Footer =====
  footer?: string;
  footerHtml?: string;

  // ===== Callbacks =====
  willOpen?: () => void;
  didOpen?: () => void;
  willClose?: () => void;
  didClose?: () => void;
  preConfirm?: (value?: string) => Promise<any> | any;
  preDeny?: (value?: string) => Promise<any> | any;

  // ===== Animations =====
  showClass?: {
    backdrop?: string;
    popup?: string;
  };
  hideClass?: {
    backdrop?: string;
    popup?: string;
  };

  // ===== Accessibility =====
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface AlertDialogResult<T = any> {
  isConfirmed: boolean;
  isDismissed: boolean;
  isDenied: boolean;
  value?: T;
  dismiss?: 'backdrop' | 'cancel' | 'esc' | 'close' | 'timer';
}

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  private dialog = inject(MatDialog);
  private defaultOptions: Partial<AlertDialogOptions> = {
    width: '400px',
    showConfirmButton: true,
    showCancelButton: false,
    showDenyButton: false,
    confirmText: 'OK',
    cancelText: 'Cancelar',
    denyText: 'No',
    disableClose: false,
    closeOnBackdropClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    timerProgressBar: false,
    reverseButtons: false,
    focusConfirm: true,
    scrollbarPadding: true,
    position: 'center',
  };

  /**
   * Configurar opciones por defecto para todos los diálogos
   */
  setDefaults(options: Partial<AlertDialogOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  /**
   * Obtener opciones por defecto actuales
   */
  getDefaults(): Partial<AlertDialogOptions> {
    return { ...this.defaultOptions };
  }

  /**
   * Resetear a opciones por defecto originales
   */
  resetDefaults(): void {
    this.defaultOptions = {
      width: '400px',
      showConfirmButton: true,
      showCancelButton: false,
      showDenyButton: false,
      confirmText: 'OK',
      cancelText: 'Cancelar',
      denyText: 'No',
      disableClose: false,
      closeOnBackdropClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      timerProgressBar: false,
      reverseButtons: false,
      focusConfirm: true,
      scrollbarPadding: true,
      position: 'center',
    };
  }

  /**
   * Muestra un diálogo de alerta con todas las opciones configurables
   */
  fire(options: AlertDialogOptions): Promise<AlertDialogResult> {
    const mergedOptions = { ...this.defaultOptions, ...options };

    // Calcular posición del diálogo
    const position = this.getDialogPosition(mergedOptions.position || 'center');

    const dialogRef = this.dialog.open(AlertDialog, {
      width: mergedOptions.width,
      minWidth: mergedOptions.minWidth,
      maxWidth: mergedOptions.maxWidth,
      height: mergedOptions.height,
      disableClose: !mergedOptions.closeOnBackdropClick && mergedOptions.disableClose,
      data: mergedOptions,
      panelClass: this.getPanelClasses(mergedOptions),
      backdropClass: mergedOptions.backdropClass,
      position,
      closeOnNavigation: true,
      autoFocus: mergedOptions.focusConfirm !== false,
      restoreFocus: true,
      hasBackdrop: true,
    });

    // Callbacks de ciclo de vida
    if (mergedOptions.willOpen) {
      mergedOptions.willOpen();
    }

    if (mergedOptions.didOpen) {
      setTimeout(() => mergedOptions.didOpen!(), 0);
    }

    // Auto-close con timer
    let timerHandle: any;
    if (mergedOptions.timer && mergedOptions.timer > 0) {
      timerHandle = setTimeout(() => {
        if (dialogRef) {
          dialogRef.close({
            isConfirmed: true,
            isDismissed: false,
            isDenied: false,
            dismiss: 'timer',
          });
        }
      }, mergedOptions.timer);
    }

    // Manejar ESC key
    if (!mergedOptions.allowEscapeKey) {
      dialogRef.keydownEvents().subscribe(event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
        }
      });
    }

    // Manejar backdrop click
    if (!mergedOptions.closeOnBackdropClick) {
      dialogRef.backdropClick().subscribe(event => {
        event.preventDefault();
        event.stopPropagation();
      });
    }

    const resultPromise = firstValueFrom(dialogRef.afterClosed());

    // Callbacks de cierre
    dialogRef.beforeClosed().subscribe(() => {
      if (timerHandle) {
        clearTimeout(timerHandle);
      }
      if (mergedOptions.willClose) {
        mergedOptions.willClose();
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (mergedOptions.didClose) {
        mergedOptions.didClose();
      }
    });

    return resultPromise;
  }

  /**
   * Alerta de éxito
   */
  success(options: string | Omit<AlertDialogOptions, 'type'>): Promise<AlertDialogResult> {
    const opts =
      typeof options === 'string'
        ? { message: options, title: '¡Éxito!' }
        : { title: '¡Éxito!', ...options };

    return this.fire({ ...opts, type: 'success' });
  }

  /**
   * Alerta de error
   */
  error(options: string | Omit<AlertDialogOptions, 'type'>): Promise<AlertDialogResult> {
    const opts =
      typeof options === 'string'
        ? { message: options, title: 'Error' }
        : { title: 'Error', ...options };

    return this.fire({ ...opts, type: 'error' });
  }

  /**
   * Alerta de advertencia
   */
  warning(options: string | Omit<AlertDialogOptions, 'type'>): Promise<AlertDialogResult> {
    const opts =
      typeof options === 'string'
        ? { message: options, title: 'Advertencia' }
        : { title: 'Advertencia', ...options };

    return this.fire({ ...opts, type: 'warning' });
  }

  /**
   * Alerta de información
   */
  info(options: string | Omit<AlertDialogOptions, 'type'>): Promise<AlertDialogResult> {
    const opts =
      typeof options === 'string'
        ? { message: options, title: 'Información' }
        : { title: 'Información', ...options };

    return this.fire({ ...opts, type: 'info' });
  }

  /**
   * Diálogo de confirmación
   */
  confirm(
    options: string | Omit<AlertDialogOptions, 'type' | 'showCancelButton'>,
  ): Promise<AlertDialogResult> {
    const opts =
      typeof options === 'string'
        ? { message: options, title: '¿Estás seguro?' }
        : { title: '¿Estás seguro?', ...options };

    return this.fire({
      ...opts,
      type: 'question',
      showCancelButton: true,
      confirmText: opts.confirmText || 'Sí',
      cancelText: opts.cancelText || 'No',
    });
  }

  /**
   * Prompt para capturar input del usuario
   */
  prompt(
    options: Omit<AlertDialogOptions, 'input'> & { input?: AlertDialogOptions['input'] },
  ): Promise<AlertDialogResult<string>> {
    return this.fire({
      type: 'question',
      showCancelButton: true,
      ...options,
      input: options.input || 'text',
    });
  }

  /**
   * Toast notification (auto-cierre, posición personalizada)
   */
  toast(options: string | AlertDialogOptions): Promise<AlertDialogResult> {
    const opts = typeof options === 'string' ? { message: options } : options;

    return this.fire({
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      width: '350px',
      ...opts,
    });
  }

  /**
   * Cerrar todos los diálogos abiertos
   */
  closeAll(): void {
    this.dialog.closeAll();
  }

  private getDialogPosition(position: AlertPosition): any {
    const positions: Record<AlertPosition, any> = {
      top: { top: '20px' },
      'top-start': { top: '20px', left: '20px' },
      'top-end': { top: '20px', right: '20px' },
      center: {},
      'center-start': { left: '20px' },
      'center-end': { right: '20px' },
      bottom: { bottom: '20px' },
      'bottom-start': { bottom: '20px', left: '20px' },
      'bottom-end': { bottom: '20px', right: '20px' },
    };
    return positions[position] || {};
  }

  private getPanelClasses(options: AlertDialogOptions): string[] {
    const classes = ['alert-dialog-container'];

    if (options.customClass) {
      classes.push(options.customClass);
    }

    if (options.panelClass) {
      if (Array.isArray(options.panelClass)) {
        classes.push(...options.panelClass);
      } else {
        classes.push(options.panelClass);
      }
    }

    return classes;
  }
}
