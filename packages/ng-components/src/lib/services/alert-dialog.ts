import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialog } from './../components';
import { firstValueFrom } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ButtonVariant, MaterialButtonStyle } from '@acontplus/ui-kit';
import { DialogType, DialogZIndexService } from './dialog/dialog-z-index.service';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question' | 'delete';
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

export interface ButtonConfig {
  text?: string;
  icon?: string;
  variant?: ButtonVariant;
  style?: MaterialButtonStyle;
  color?: ThemePalette | string;
  disabled?: boolean;
  focus?: boolean;
}

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

  // ===== Layout Configuration =====
  layout?: 'default' | 'modern'; // Tipo de layout
  iconPosition?: 'left' | 'center' | 'top'; // Posición del icono
  contentAlignment?: 'left' | 'center' | 'right'; // Alineación del contenido
  actionsAlignment?: 'start' | 'center' | 'end'; // Alineación específica de los botones
  showCloseButton?: boolean; // Botón X en la esquina superior derecha
  closeButtonPosition?: 'top-right' | 'top-left'; // Posición del botón cerrar

  // ===== Drag and Drop =====
  draggable?: boolean;
  dragHandle?: string; // CSS selector for drag handle (default: '.alert-dialog-title')

  // ===== Animation =====
  animation?: 'fade' | 'slide' | 'bounce' | 'zoom' | 'none';
  animationDuration?: number; // en milisegundos

  // ===== Custom Component Support =====
  component?: Type<any>;
  componentProps?: Record<string, any>;

  // ===== Z-Index and Priority =====
  forceToTop?: boolean; // Forzar que este diálogo esté siempre encima de todos
  dialogType?: DialogType; // Tipo de diálogo para manejo de z-index (normal, alert)
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
  allowMultiple?: boolean; // Permitir múltiples alerts abiertos simultáneamente (por defecto false)

  // ===== Button Configuration =====
  buttons?: {
    confirm?: ButtonConfig;
    cancel?: ButtonConfig;
    deny?: ButtonConfig;
  };
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  showDenyButton?: boolean;

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
  private zIndexService = inject(DialogZIndexService);

  // Trackear solo los AlertDialogs abiertos
  private openAlertDialogs: MatDialogRef<AlertDialog>[] = [];

  private defaultOptions: Partial<AlertDialogOptions> = {
    width: '400px',
    showConfirmButton: true,
    showCancelButton: false,
    showDenyButton: false,
    buttons: {
      confirm: { text: 'OK', focus: true },
      cancel: { text: 'Cancelar' },
      deny: { text: 'No' },
    },
    disableClose: false,
    closeOnBackdropClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    timerProgressBar: false,
    reverseButtons: false,
    scrollbarPadding: true,
    position: 'center',
    draggable: false,
    allowMultiple: false, // Por defecto no permitir múltiples alerts
    forceToTop: true, // Por defecto los alerts siempre van encima
    dialogType: 'alert', // Por defecto usar el tipo alert (z-index alto)
    layout: 'modern',
    iconPosition: 'left',
    contentAlignment: 'left',
    actionsAlignment: 'end', // Botones a la derecha por defecto
    showCloseButton: true,
    closeButtonPosition: 'top-right',
    animation: 'fade',
    animationDuration: 300,
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
      buttons: {
        confirm: { text: 'OK', focus: true },
        cancel: { text: 'Cancelar' },
        deny: { text: 'No' },
      },
      disableClose: false,
      closeOnBackdropClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      timerProgressBar: false,
      reverseButtons: false,
      scrollbarPadding: true,
      position: 'center',
      draggable: false,
      allowMultiple: false,
      forceToTop: true,
      dialogType: 'alert',
      layout: 'modern',
      iconPosition: 'left',
      contentAlignment: 'left',
      actionsAlignment: 'end',
      showCloseButton: true,
      closeButtonPosition: 'top-right',
      animation: 'fade',
      animationDuration: 300,
    };
  }

  /**
   * Muestra un diálogo de alerta con todas las opciones configurables
   */
  fire(options: AlertDialogOptions): Promise<AlertDialogResult> {
    const mergedOptions = { ...this.defaultOptions, ...options };

    // Si allowMultiple es false (por defecto), cerrar solo los AlertDialogs existentes
    if (!mergedOptions.allowMultiple) {
      this.closeAllAlertDialogs();
    }

    // Determinar el tipo de diálogo para z-index
    const dialogType: DialogType = mergedOptions.dialogType || 'alert';

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
      autoFocus: mergedOptions.buttons?.confirm?.focus !== false,
      restoreFocus: true,
      hasBackdrop: true,
    });

    // Trackear este AlertDialog
    this.openAlertDialogs.push(dialogRef);

    // Limpiar del tracking cuando se cierre
    dialogRef.afterClosed().subscribe(() => {
      const index = this.openAlertDialogs.indexOf(dialogRef);
      if (index > -1) {
        this.openAlertDialogs.splice(index, 1);
      }
    });

    // Aplicar z-index dinámico usando el servicio centralizado
    if (mergedOptions.forceToTop) {
      // Si se requiere forzar al tope, usar forceToTop
      this.zIndexService.forceToTop(dialogRef);
    } else {
      // Usar el tipo de diálogo apropiado para z-index
      this.zIndexService.applyZIndex(dialogRef, dialogType);
    }

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
      buttons: {
        confirm: { text: 'Sí', ...opts.buttons?.confirm },
        cancel: { text: 'No', ...opts.buttons?.cancel },
        ...opts.buttons,
      },
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
   * Diálogo de confirmación para eliminar
   */
  delete(
    options: string | Omit<AlertDialogOptions, 'type' | 'showCancelButton'>,
  ): Promise<AlertDialogResult> {
    const opts =
      typeof options === 'string'
        ? { message: options, title: '¿Eliminar elemento?' }
        : { title: '¿Eliminar elemento?', ...options };

    return this.fire({
      ...opts,
      type: 'delete',
      showCancelButton: true,
      buttons: {
        confirm: { text: 'Eliminar', variant: 'danger', ...opts.buttons?.confirm },
        cancel: { text: 'Cancelar', ...opts.buttons?.cancel },
        ...opts.buttons,
      },
    });
  }

  /**
   * Alerta crítica que siempre aparece encima de todo
   */
  critical(options: string | Omit<AlertDialogOptions, 'forceToTop'>): Promise<AlertDialogResult> {
    const opts =
      typeof options === 'string'
        ? { message: options, title: '¡Atención!' }
        : { title: '¡Atención!', ...options };

    return this.fire({
      ...opts,
      type: 'error',
      forceToTop: true,
      disableClose: true,
      closeOnBackdropClick: false,
      allowEscapeKey: false,
    });
  }

  /**
   * Cerrar solo los AlertDialogs abiertos (no afecta otros diálogos)
   */
  closeAllAlertDialogs(): void {
    // Crear una copia del array para evitar problemas de concurrencia
    const dialogsToClose = [...this.openAlertDialogs];
    dialogsToClose.forEach(dialogRef => {
      if (dialogRef && !dialogRef.componentInstance) {
        // Solo cerrar si el diálogo aún está abierto
        dialogRef.close();
      }
    });
    // Limpiar el array
    this.openAlertDialogs = [];
  }

  /**
   * Cerrar TODOS los diálogos abiertos (incluyendo otros servicios)
   * ⚠️ Usar con cuidado - afecta todos los diálogos de MatDialog
   */
  closeAll(): void {
    this.dialog.closeAll();
    // También limpiar nuestro tracking
    this.openAlertDialogs = [];
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
    const classes = ['acp-alert-dialog-container'];

    if (options.customClass) {
      classes.push(options.customClass);
    }

    if (options.draggable) {
      classes.push('acp-draggable-dialog');
    }

    // Agregar clases para layout
    if (options.layout) {
      classes.push(`acp-layout-${options.layout}`);
    }

    // Agregar clases para posición de icono
    if (options.iconPosition) {
      classes.push(`acp-icon-${options.iconPosition}`);
    }

    // Agregar clases para alineación de contenido
    if (options.contentAlignment) {
      classes.push(`acp-content-${options.contentAlignment}`);
    }

    // Agregar clase para animación
    if (options.animation) {
      classes.push(`acp-animation-${options.animation}`);
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
