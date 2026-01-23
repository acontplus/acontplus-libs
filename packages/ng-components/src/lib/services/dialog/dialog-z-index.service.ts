import { Injectable } from '@angular/core';

export type DialogType = 'normal' | 'alert' | 'toast';

/**
 * Servicio centralizado para manejar z-index de todos los diálogos
 * Asegura que los diálogos siempre aparezcan en el orden correcto
 * Los AlertDialogs siempre tienen prioridad sobre otros diálogos
 */
@Injectable({
  providedIn: 'root',
})
export class DialogZIndexService {
  // Rangos de z-index por tipo de diálogo
  private static readonly Z_INDEX_RANGES = {
    normal: { base: 1000, current: 1000 }, // Diálogos normales: 1000-1999
    alert: { base: 2000, current: 2000 }, // AlertDialogs: 2000-2999 (siempre encima)
    toast: { base: 3000, current: 3000 }, // Toasts: 3000-3999 (máxima prioridad)
  };

  private static readonly Z_INDEX_INCREMENT = 10;

  /**
   * Obtiene el siguiente z-index disponible para un tipo específico de diálogo
   * @param type Tipo de diálogo (normal, alert, toast)
   * @returns El próximo z-index a usar
   */
  getNextZIndex(type: DialogType = 'normal'): number {
    const range = DialogZIndexService.Z_INDEX_RANGES[type];
    range.current += DialogZIndexService.Z_INDEX_INCREMENT;
    return range.current;
  }

  /**
   * Obtiene el z-index actual más alto para un tipo específico
   * @param type Tipo de diálogo
   * @returns El z-index más alto actualmente en uso para ese tipo
   */
  getCurrentZIndex(type: DialogType = 'normal'): number {
    return DialogZIndexService.Z_INDEX_RANGES[type].current;
  }

  /**
   * Obtiene el z-index más alto de todos los tipos
   * @returns El z-index más alto de todos los diálogos
   */
  getHighestZIndex(): number {
    return Math.max(
      ...Object.values(DialogZIndexService.Z_INDEX_RANGES).map(range => range.current),
    );
  }

  /**
   * Resetea el contador de z-index (útil para testing)
   * @param type Tipo específico a resetear, o undefined para resetear todos
   */
  reset(type?: DialogType): void {
    if (type) {
      const range = DialogZIndexService.Z_INDEX_RANGES[type];
      range.current = range.base;
    } else {
      // Resetear todos los tipos
      Object.entries(DialogZIndexService.Z_INDEX_RANGES).forEach(([_, range]) => {
        range.current = range.base;
      });
    }
  }

  /**
   * Aplica z-index a un diálogo específico
   * @param dialogRef Referencia al diálogo
   * @param type Tipo de diálogo (determina el rango de z-index)
   * @param zIndex Z-index específico a aplicar (opcional)
   */
  applyZIndex(dialogRef: any, type: DialogType = 'normal', zIndex?: number): void {
    const targetZIndex = zIndex || this.getNextZIndex(type);

    setTimeout(() => {
      const overlayRef = dialogRef._overlayRef;
      if (overlayRef) {
        const pane = overlayRef.overlayElement;
        const backdrop = overlayRef.backdropElement;

        if (pane) {
          pane.style.zIndex = (targetZIndex + 2).toString();
          // Agregar atributo data para debugging
          pane.setAttribute('data-dialog-type', type);
          pane.setAttribute('data-z-index', targetZIndex.toString());

          // Para toasts, agregar clase especial para styling
          if (type === 'toast') {
            pane.classList.add('toast-overlay');
            // Los toasts no deben bloquear interacciones
            pane.style.pointerEvents = 'none';
            // Pero el contenido del toast sí debe ser clickeable
            const dialogContainer = pane.querySelector(
              '.mat-mdc-dialog-container, .mat-dialog-container',
            );
            if (dialogContainer) {
              (dialogContainer as HTMLElement).style.pointerEvents = 'auto';
            }
          }
        }

        // Los toasts no tienen backdrop, pero si existe, configurarlo
        if (backdrop && type !== 'toast') {
          backdrop.style.zIndex = (targetZIndex + 1).toString();
        }
      }
    }, 0);
  }

  /**
   * Trae un diálogo al frente (usado por drag functionality)
   * @param element Elemento del diálogo a traer al frente
   * @param type Tipo de diálogo
   */
  bringToFront(element: HTMLElement, type: DialogType = 'normal'): void {
    const pane = element.closest('.cdk-overlay-pane') as HTMLElement;
    if (pane) {
      const newZIndex = this.getNextZIndex(type);
      pane.style.zIndex = (newZIndex + 2).toString();
      pane.setAttribute('data-z-index', newZIndex.toString());

      // También actualizar el backdrop si existe
      const backdrop = pane.parentElement?.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      if (backdrop) {
        backdrop.style.zIndex = (newZIndex + 1).toString();
      }
    }
  }

  /**
   * Fuerza un diálogo a estar siempre encima de todos los demás
   * Útil para alertas críticas que deben tener máxima prioridad
   * @param dialogRef Referencia al diálogo
   */
  forceToTop(dialogRef: any): void {
    const highestZIndex = this.getHighestZIndex();
    const topZIndex = highestZIndex + DialogZIndexService.Z_INDEX_INCREMENT;

    setTimeout(() => {
      const overlayRef = dialogRef._overlayRef;
      if (overlayRef) {
        const pane = overlayRef.overlayElement;
        const backdrop = overlayRef.backdropElement;

        if (pane) {
          pane.style.zIndex = (topZIndex + 2).toString();
          pane.setAttribute('data-z-index', topZIndex.toString());
          pane.setAttribute('data-forced-top', 'true');
        }
        if (backdrop) {
          backdrop.style.zIndex = (topZIndex + 1).toString();
        }
      }
    }, 0);
  }

  /**
   * Obtiene todos los toasts activos
   * @returns Array de elementos de toast activos
   */
  getActiveToasts(): HTMLElement[] {
    return Array.from(document.querySelectorAll('.cdk-overlay-pane[data-dialog-type="toast"]'));
  }

  /**
   * Cierra todos los toasts activos
   */
  closeAllToasts(): void {
    const toasts = this.getActiveToasts();
    toasts.forEach(toast => {
      const closeButton = toast.querySelector('[mat-dialog-close], .toast-close-button');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    });
  }

  /**
   * Obtiene el número de toasts activos
   * @returns Número de toasts actualmente visibles
   */
  getActiveToastCount(): number {
    return this.getActiveToasts().length;
  }
}
