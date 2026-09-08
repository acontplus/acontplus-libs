import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { firstValueFrom, map } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { DialogSize, DialogWrapperConfig, MatCustomDialogConfig } from './dialog.interfaces';
import { DialogWrapper } from '../../components/dialog-wrapper/dialog-wrapper';
import { DialogZIndexService } from './dialog-z-index.service';

@Injectable({
  providedIn: 'root',
})
export class AdvancedDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly overlay = inject(Overlay);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly zIndexService = inject(DialogZIndexService);

  // An observable that emits true if the viewport matches mobile dimensions.
  private readonly isMobile$ = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
    .pipe(map(result => result.matches));

  /**
   * Main method to open any component in a dialog.
   * This provides maximum flexibility.
   * @param component The component to render.
   * @param config The detailed configuration for the dialog.
   * @returns A MatDialogRef instance.
   */
  async open<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config: MatCustomDialogConfig<D> = {},
  ): Promise<MatDialogRef<T, R>> {
    const dialogConfig = await this.buildDialogConfig(config);
    const dialogRef = this.dialog.open<T, D, R>(component, dialogConfig);

    this.wireCloseBehavior(dialogRef, config);

    // Apply centralized z-index
    this.zIndexService.applyZIndex(dialogRef);

    return dialogRef;
  }

  /**
   * A powerful helper to open a component inside our standard, branded "wrapper".
   * This provides maximum consistency.
   * @param wrapperConfig Configuration for the title, icon, and the content component.
   * @param matDialogConfig Standard MatDialog configuration (size, position, etc.).
   * @returns A MatDialogRef instance pointing to the wrapper.
   */
  async openInWrapper<T, R = unknown>(
    wrapperConfig: DialogWrapperConfig<T>,
    matDialogConfig: MatCustomDialogConfig<T> = {},
  ): Promise<MatDialogRef<DialogWrapper, R>> {
    // Package the wrapper config into the `data` property for the DialogWrapper to consume.
    const configWithWrapperData: MatCustomDialogConfig<DialogWrapperConfig<T>> = {
      ...matDialogConfig,
      data: wrapperConfig,
    } as MatCustomDialogConfig<DialogWrapperConfig<T>>;
    const dialogConfig = await this.buildDialogConfig(configWithWrapperData);
    const dialogRef = this.dialog.open<DialogWrapper, DialogWrapperConfig<T>, R>(
      DialogWrapper,
      dialogConfig,
    );

    this.wireCloseBehavior(dialogRef, matDialogConfig);

    // Apply centralized z-index
    this.zIndexService.applyZIndex(dialogRef);

    return dialogRef;
  }

  /**
   * Helper to open a dialog and only get an observable of the result.
   */
  async openAndGetResult<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config: MatCustomDialogConfig<D> = {},
  ): Promise<R | undefined> {
    const dialogRef = await this.open(component, config);
    return firstValueFrom(dialogRef.afterClosed()) as Promise<R | undefined>;
  }

  /**
   * Closes all currently open dialogs.
   */
  closeAll(): void {
    this.dialog.closeAll();
  }

  // --- Private Configuration Builder ---

  private async buildDialogConfig<D>(
    config: MatCustomDialogConfig<D>,
  ): Promise<MatDialogConfig<D>> {
    const dialogConfig = new MatDialogConfig<D>();
    const basePanelClasses: string[] = [];

    // Asynchronously check for mobile state to prevent memory leaks from dangling subscriptions.
    const isMobile = await firstValueFrom(this.isMobile$);

    // Apply fullscreen if 'full' size is set OR if mobile fullscreen is enabled on a mobile device.
    if (config.size === 'full' || (config.isMobileFullScreen && isMobile)) {
      this.applyFullScreenConfig(dialogConfig);
      basePanelClasses.push('full-screen-dialog');
    } else {
      this.applyStandardConfig(dialogConfig, config);
    }

    // Apply all other common configurations.
    this.applyCommonConfig(dialogConfig, config, basePanelClasses);

    return dialogConfig;
  }

  private applyFullScreenConfig(dialogConfig: MatDialogConfig): void {
    dialogConfig.width = '100vw';
    dialogConfig.height = '100vh';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
  }

  private applyStandardConfig<D>(
    dialogConfig: MatDialogConfig<D>,
    config: MatCustomDialogConfig<D>,
  ): void {
    const width = config.width ?? this.getDialogWidth(config.size);
    dialogConfig.width = width;
    dialogConfig.height = config.height;
    dialogConfig.minWidth = config.minWidth;
    dialogConfig.minHeight = config.minHeight;
    const maxWidth = config.maxWidth ?? '95vw';
    dialogConfig.maxWidth = maxWidth;
    const maxHeight = config.maxHeight ?? 'auto';
    dialogConfig.maxHeight = maxHeight;
    dialogConfig.position = config.position;
  }

  private applyCommonConfig<D>(
    dialogConfig: MatDialogConfig<D>,
    config: MatCustomDialogConfig<D>,
    basePanelClasses: string[] = [],
  ): void {
    dialogConfig.data = config.data;
    dialogConfig.hasBackdrop = config.hasBackdrop ?? true;
    dialogConfig.backdropClass = config.backdropClass;

    const panelClasses = [...basePanelClasses];
    if (Array.isArray(config.panelClass)) {
      panelClasses.push(...config.panelClass);
    } else if (config.panelClass) {
      panelClasses.push(config.panelClass);
    }
    if (config.size) {
      panelClasses.push(`dialog-${config.size}`);
    }
    dialogConfig.panelClass = panelClasses;

    // MatDialog's `disableClose` blocks both the backdrop click and the Escape key.
    // When only one of them should be disabled, `disableClose` is set and the
    // allowed gesture is re-enabled in `wireCloseBehavior`.
    dialogConfig.disableClose =
      !(config.backdropClickClosable ?? true) || !(config.escapeKeyClosable ?? true);
    dialogConfig.autoFocus = config.autoFocus ?? 'first-tabbable';
    dialogConfig.restoreFocus = config.restoreFocus ?? true;
    dialogConfig.scrollStrategy = config.scrollStrategy ?? this.overlay.scrollStrategies.block();
    dialogConfig.enterAnimationDuration = config.enterAnimationDuration ?? '300ms';
    dialogConfig.exitAnimationDuration = config.exitAnimationDuration ?? '200ms';
    dialogConfig.ariaLabel = config.ariaLabel;
    dialogConfig.ariaLabelledBy = config.ariaLabelledBy;
    dialogConfig.ariaDescribedBy = config.ariaDescribedBy;
    dialogConfig.role = config.role;
  }

  /**
   * Re-enables a single close gesture (backdrop click or Escape) when the other
   * one is disabled, since MatDialog's `disableClose` blocks both at once.
   */
  private wireCloseBehavior<T, R>(
    dialogRef: MatDialogRef<T, R>,
    config: MatCustomDialogConfig,
  ): void {
    const backdropClosable = config.backdropClickClosable ?? true;
    const escapeClosable = config.escapeKeyClosable ?? true;

    if (backdropClosable === escapeClosable) {
      return;
    }

    if (escapeClosable) {
      dialogRef.keydownEvents().subscribe(event => {
        if (event.key === 'Escape') {
          dialogRef.close();
        }
      });
    } else {
      dialogRef.backdropClick().subscribe(() => dialogRef.close());
    }
  }

  private getDialogWidth(size: DialogSize = 'md'): string {
    const sizeMap: Record<DialogSize, string> = {
      xs: '320px',
      sm: '450px',
      md: '600px',
      lg: '800px',
      xl: '1000px',
      xxl: '1280px',
      full: '100vw',
    };
    return sizeMap[size];
  }
}
