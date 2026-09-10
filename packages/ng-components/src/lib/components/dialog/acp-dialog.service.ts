import { inject, Injectable, TemplateRef, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AcpDialogContainer } from './acp-dialog-container';
import { AcpDialogRef } from './dialog-ref';
import { ACP_DIALOG_DEFAULT_OPTIONS } from './dialog.tokens';
import {
  AcpDialogActionClick,
  AcpDialogComponentLoader,
  AcpDialogConfig,
  AcpDialogContainerData,
  AcpDialogContentInput,
  AcpDialogResolvedContent,
  AcpDialogSize,
} from './dialog.interfaces';

const SIZES: Record<AcpDialogSize, string> = {
  xs: '320px',
  sm: '450px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  xxl: '1280px',
  full: '100vw',
};

/**
 * Reusable dialog service — a branded alternative to `MatDialog`. Every dialog
 * renders inside `AcpDialogContainer`, so content always works the same way:
 *
 * - read data with `inject(ACP_DIALOG_DATA)`,
 * - close the dialog with `inject(AcpDialogRef).close(result)`.
 *
 * Usage:
 * ```ts
 * private dialogs = inject(AcpDialogService);
 *
 * this.dialogs.open(UserForm, {
 *   title: 'Edit user',
 *   actions: [
 *     { text: 'Cancel' },
 *     { text: 'Save', color: 'success', result: user },
 *   ],
 *   size: 'lg',
 *   data: { userId: 5 },
 * }).afterClosed().subscribe(saved => {
 *   // handle result
 * });
 *
 * // or with a single config object:
 * this.dialogs.open({
 *   content: UserForm,
 *   title: 'Edit user',
 *   actions: [{ text: 'Save', color: 'success' }],
 *   data: { userId: 5 },
 * }).afterClosed().subscribe(saved => {
 *   // handle result
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class AcpDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly overlay = inject(Overlay);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly defaults = inject<AcpDialogConfig>(ACP_DIALOG_DEFAULT_OPTIONS, {
    optional: true,
  });

  /** Stream that emits when all open dialogs have finished closing. */
  get afterAllClosed(): Observable<void> {
    return this.dialog.afterAllClosed;
  }

  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Observable<MatDialogRef<unknown>> {
    return this.dialog.afterOpened;
  }

  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): MatDialogRef<unknown>[] {
    return this.dialog.openDialogs;
  }

  /**
   * Opens a dialog with a component class.
   * @param component The content component to render.
   * @param config Dialog configuration (merged over `provideAcpDialogDefaults`).
   * @returns An {@link AcpDialogRef}; subscribe to `ref.afterClosed()` for the result.
   */
  open<T, D = unknown, R = unknown>(
    component: Type<T>,
    config?: AcpDialogConfig<D>,
  ): AcpDialogRef<R>;
  /**
   * Opens a dialog with a `TemplateRef`.
   * @param template The inline template to render.
   * @param config Dialog configuration (merged over `provideAcpDialogDefaults`).
   * @returns An {@link AcpDialogRef}; subscribe to `ref.afterClosed()` for the result.
   */
  open<D = unknown, R = unknown>(
    template: TemplateRef<unknown>,
    config?: AcpDialogConfig<D>,
  ): AcpDialogRef<R>;
  /**
   * Opens a dialog from a single config object.
   * @param config Dialog configuration that includes the `content` to render.
   * @returns An {@link AcpDialogRef}; subscribe to `ref.afterClosed()` for the result.
   */
  open<D = unknown, R = unknown>(
    config: AcpDialogConfig<D> & { content: AcpDialogContentInput },
  ): AcpDialogRef<R>;
  open<D = unknown, R = unknown>(
    contentOrConfig:
      | Type<unknown>
      | TemplateRef<unknown>
      | (AcpDialogConfig<D> & { content: AcpDialogContentInput }),
    maybeConfig?: AcpDialogConfig<D>,
  ): AcpDialogRef<R> {
    if (contentOrConfig instanceof TemplateRef) {
      return this.openWithContent<R>(contentOrConfig, this.mergeDefaults(maybeConfig ?? {}));
    }
    if (typeof contentOrConfig === 'function' && isComponentClass(contentOrConfig)) {
      return this.openWithContent<R>(contentOrConfig, this.mergeDefaults(maybeConfig ?? {}));
    }
    const { content, ...rest } = contentOrConfig as AcpDialogConfig<D> & {
      content: AcpDialogContentInput;
    };
    return this.openWithContent<R>(content, this.mergeDefaults(rest));
  }

  /** Closes all currently open dialogs. */
  closeAll(): void {
    this.dialog.closeAll();
  }

  /** Finds an open dialog by its id. */
  getDialogById(id: string): AcpDialogRef | undefined {
    const matRef = this.dialog.getDialogById(id);
    return matRef ? new AcpDialogRef(matRef) : undefined;
  }

  // --- Internals ---

  private openWithContent<R>(
    content: AcpDialogContentInput,
    config: AcpDialogConfig,
  ): AcpDialogRef<R> {
    const resolved = this.resolveContent(content, config.data);
    const actionClicks = new Subject<AcpDialogActionClick<R>>();

    if (resolved instanceof Promise) {
      return new AcpDialogRef<R>(
        resolved.then(c => this.createMatRef(c, config, actionClicks)),
        actionClicks,
      );
    }

    return new AcpDialogRef<R>(this.createMatRef(resolved, config, actionClicks), actionClicks);
  }

  private createMatRef<R>(
    content: AcpDialogResolvedContent,
    config: AcpDialogConfig,
    actionClicks: Subject<AcpDialogActionClick<R>>,
  ): MatDialogRef<unknown, R> {
    const matRef = this.dialog.open(
      AcpDialogContainer,
      this.buildMatConfig(config, { content, config, actionClicks } as AcpDialogContainerData),
    );

    this.wireCloseGestures(matRef, config);

    return matRef as MatDialogRef<unknown, R>;
  }

  private resolveContent(
    content: AcpDialogContentInput,
    data?: unknown,
    depth = 0,
  ): AcpDialogResolvedContent | Promise<AcpDialogResolvedContent> {
    if (isTemplateRef(content)) {
      return content;
    }

    if (typeof content === 'string') {
      return content;
    }

    if (isComponentClass(content)) {
      return content;
    }

    if (isDialogComponentLoader(content)) {
      return content.loadComponent().then(c => this.resolveContent(c, data, depth));
    }

    if (typeof content === 'function') {
      if (depth > 5) {
        throw new Error('AcpDialog content factory nested too deeply');
      }
      const result = content(data);
      if (result && typeof (result as Promise<unknown>).then === 'function') {
        return (result as Promise<AcpDialogContentInput>).then(c =>
          this.resolveContent(c, data, depth + 1),
        );
      }
      return this.resolveContent(result as AcpDialogContentInput, data, depth + 1);
    }

    throw new Error(`Unsupported AcpDialog content: ${String(content)}`);
  }

  private mergeDefaults(config: AcpDialogConfig): AcpDialogConfig {
    const defaults = this.defaults as AcpDialogConfig | null;
    const { header, closeOn, ...rest } = config;
    return {
      ...defaults,
      ...rest,
      header: header ? { ...defaults?.header, ...header } : defaults?.header,
      closeOn: { ...defaults?.closeOn, ...closeOn },
    };
  }

  private buildMatConfig(
    config: AcpDialogConfig,
    data: AcpDialogContainerData,
  ): MatDialogConfig<AcpDialogContainerData> {
    const matConfig = new MatDialogConfig<AcpDialogContainerData>();
    matConfig.data = data;

    const fullScreen =
      config.size === 'full' ||
      (config.fullScreenOnMobile === true &&
        this.breakpointObserver.isMatched([
          Breakpoints.HandsetPortrait,
          Breakpoints.HandsetLandscape,
        ]));

    if (fullScreen) {
      matConfig.width = '100vw';
      matConfig.height = '100vh';
      matConfig.maxWidth = '100vw';
      matConfig.maxHeight = '100vh';
    } else {
      matConfig.width = this.toMatSize(config.width) ?? SIZES[config.size ?? 'md'];
      matConfig.height = this.toMatSize(config.height);
      matConfig.minWidth = this.toMatSize(config.minWidth);
      matConfig.minHeight = this.toMatSize(config.minHeight);
      matConfig.maxWidth = this.toMatSize(config.maxWidth) ?? '95vw';
      matConfig.maxHeight = this.toMatSize(config.maxHeight);
      matConfig.position = config.position;
    }

    matConfig.panelClass = [
      'acp-dialog',
      `acp-dialog-${config.size ?? 'md'}`,
      ...(fullScreen ? ['acp-dialog-full-screen'] : []),
      ...(Array.isArray(config.panelClass)
        ? config.panelClass
        : config.panelClass
          ? [config.panelClass]
          : []),
    ];

    matConfig.hasBackdrop = config.hasBackdrop ?? true;
    matConfig.backdropClass = config.backdropClass;

    const closeOn = this.normalizeCloseOn(config);
    matConfig.disableClose = closeOn.backdropClick === false || closeOn.escapeKey === false;

    matConfig.id = config.id;
    matConfig.injector = config.injector;
    matConfig.viewContainerRef = config.viewContainerRef;
    matConfig.closeOnNavigation = config.closeOnNavigation;
    matConfig.closePredicate = config.closePredicate as MatDialogConfig['closePredicate'];
    matConfig.direction = config.direction;
    matConfig.delayFocusTrap = config.delayFocusTrap;
    matConfig.ariaModal = config.ariaModal;

    matConfig.autoFocus = config.autoFocus ?? 'first-tabbable';
    matConfig.restoreFocus = config.restoreFocus ?? true;
    matConfig.scrollStrategy = this.resolveScrollStrategy(config.scrollStrategy);
    matConfig.enterAnimationDuration = config.enterAnimationDuration ?? '300ms';
    matConfig.exitAnimationDuration = config.exitAnimationDuration ?? '200ms';
    matConfig.ariaLabel = config.ariaLabel;
    matConfig.ariaLabelledBy = config.ariaLabelledBy;
    matConfig.ariaDescribedBy = config.ariaDescribedBy;
    matConfig.role = config.role ?? 'dialog';

    return matConfig;
  }

  private normalizeCloseOn(config: AcpDialogConfig): {
    backdropClick: boolean;
    escapeKey: boolean;
  } {
    if (config.disableClose === true) {
      return { backdropClick: false, escapeKey: false };
    }
    if (config.disableClose === false) {
      return { backdropClick: true, escapeKey: true };
    }
    return {
      backdropClick: config.closeOn?.backdropClick !== false,
      escapeKey: config.closeOn?.escapeKey !== false,
    };
  }

  private toMatSize(value: string | number | undefined): string | undefined {
    return typeof value === 'number' ? `${value}px` : value;
  }

  private resolveScrollStrategy(
    strategy: ScrollStrategy | 'block' | 'close' | 'noop' | undefined,
  ): ScrollStrategy {
    if (typeof strategy !== 'string') {
      return strategy ?? this.overlay.scrollStrategies.block();
    }

    const strategies = this.overlay.scrollStrategies;
    switch (strategy) {
      case 'block':
        return strategies.block();
      case 'close':
        return strategies.close();
      case 'noop':
        return strategies.noop();
      default:
        return strategies.block();
    }
  }

  private wireCloseGestures(matRef: MatDialogRef<unknown, unknown>, config: AcpDialogConfig): void {
    const closeOn = this.normalizeCloseOn(config);
    const backdropClick = closeOn.backdropClick;
    const escapeKey = closeOn.escapeKey;

    if (backdropClick === escapeKey) {
      return;
    }

    const closed$ = matRef.afterClosed();

    if (escapeKey) {
      matRef
        .keydownEvents()
        .pipe(takeUntil(closed$))
        .subscribe(event => {
          if (event.key === 'Escape') {
            matRef.close();
          }
        });
    } else {
      matRef
        .backdropClick()
        .pipe(takeUntil(closed$))
        .subscribe(() => matRef.close());
    }
  }
}

function isDialogComponentLoader(value: unknown): value is AcpDialogComponentLoader {
  return (
    typeof value === 'object' &&
    value !== null &&
    'loadComponent' in value &&
    typeof (value as { loadComponent: unknown }).loadComponent === 'function'
  );
}

function isTemplateRef(value: unknown): value is TemplateRef<unknown> {
  return value instanceof TemplateRef;
}

function isComponentClass(value: unknown): value is Type<unknown> {
  if (typeof value !== 'function') {
    return false;
  }
  const fn = value as unknown as Record<string, unknown>;
  return (
    !!fn['ɵcmp'] || !!fn['ɵfac'] || /^\s*class\s/.test(Function.prototype.toString.call(value))
  );
}
