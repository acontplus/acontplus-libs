import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, InjectionToken, OnDestroy, TemplateRef } from '@angular/core';
import { defer, Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AcpDrawerConfig } from './drawer-config';
import { AcpDrawerContainer } from './drawer-container';
import { AcpDrawerRef } from './drawer-ref';

/** Injection token that can be used to access the data that was passed in to a drawer. */
export const ACP_DRAWER_DATA = new InjectionToken<any>('AcpDrawerData');

/** Injection token that can be used to specify default drawer options. */
export const ACP_DRAWER_DEFAULT_OPTIONS = new InjectionToken<AcpDrawerConfig>(
  'acp-drawer-default-options',
);

/** Counter for unique drawer ids. */
let uniqueId = 0;

/**
 * Service to trigger ACP drawer components.
 *
 * The AcpDrawer service provides methods to open, manage, and dismiss drawer panels
 * that slide in from any side of the screen. It's built on top of Angular CDK Dialog
 * and provides a flexible way to display additional content without navigating away
 * from the current page.
 *
 * @example
 * ```typescript
 * constructor(private drawer: AcpDrawer) {}
 *
 * openDrawer() {
 *   const drawerRef = this.drawer.open(MyDrawerComponent, {
 *     position: 'right',
 *     width: '400px',
 *     data: { message: 'Hello from drawer!' }
 *   });
 *
 *   drawerRef.afterDismissed().subscribe(result => {
 *     console.log('Drawer closed with result:', result);
 *   });
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class AcpDrawer implements OnDestroy {
  private _overlay = inject(Overlay);
  private _parentDrawer = inject(AcpDrawer, { optional: true, skipSelf: true });
  private _defaultOptions = inject<AcpDrawerConfig>(ACP_DRAWER_DEFAULT_OPTIONS, { optional: true });

  private readonly _openDrawersAtThisLevel: AcpDrawerRef<any>[] = [];
  private readonly _afterAllDismissedAtThisLevel = new Subject<void>();
  private readonly _afterOpenedAtThisLevel = new Subject<AcpDrawerRef<any>>();
  private _dialog = inject(Dialog);

  /** Keeps track of the currently-open dialogs. */
  get openDrawers(): AcpDrawerRef<any>[] {
    return this._parentDrawer ? this._parentDrawer.openDrawers : this._openDrawersAtThisLevel;
  }

  /** Stream that emits when a drawer has been opened. */
  get afterOpened(): Subject<AcpDrawerRef<any>> {
    return this._parentDrawer ? this._parentDrawer.afterOpened : this._afterOpenedAtThisLevel;
  }

  /**
   * Gets the subject for tracking when all drawers are dismissed.
   * @returns Subject that emits when all drawers at this level are closed
   */
  private _getAfterAllDismissed(): Subject<void> {
    const parent = this._parentDrawer;
    return parent ? parent._getAfterAllDismissed() : this._afterAllDismissedAtThisLevel;
  }

  /**
   * Stream that emits when all open drawer have finished closing.
   * Will emit on subscribe if there are no open drawers to begin with.
   */
  readonly afterAllDismissed: Observable<void> = defer(() =>
    this.openDrawers.length
      ? this._getAfterAllDismissed()
      : this._getAfterAllDismissed().pipe(startWith(undefined)),
  ) as Observable<any>;

  /**
   * Opens a drawer containing the given component.
   * @param component Type of the component to load into the drawer.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened drawer.
   */
  open<T, D = any, R = any>(
    component: ComponentType<T>,
    config?: AcpDrawerConfig<D>,
  ): AcpDrawerRef<T, R>;

  /**
   * Opens a drawer containing the given template.
   * @param template TemplateRef to instantiate as the drawer content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened drawer.
   */
  open<T, D = any, R = any>(
    template: TemplateRef<T>,
    config?: AcpDrawerConfig<D>,
  ): AcpDrawerRef<T, R>;

  open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: AcpDrawerConfig<D>,
  ): AcpDrawerRef<T, R> {
    let drawerRef!: AcpDrawerRef<T, R>;

    const _config = { ...(this._defaultOptions || new AcpDrawerConfig()), ...config };
    _config.id = _config.id || `acp-drawer-${uniqueId++}`;

    if (_config.fullScreen) {
      _config.width = '100vw';
      _config.height = '100vh';
    } else {
      _config.width =
        _config.position === 'left' || _config.position === 'right'
          ? coerceCssPixelValue(_config.width)
          : '100vw';

      _config.height =
        _config.position === 'top' || _config.position === 'bottom'
          ? coerceCssPixelValue(_config.height)
          : '100vh';
    }

    this._dialog.open<R, D, T>(componentOrTemplateRef, {
      ..._config,
      // Disable closing since we need to sync it up to the animation ourselves.
      disableClose: true,
      // Disable closing on detachments so that we can sync up the animation.
      closeOnOverlayDetachments: false,
      container: {
        type: AcpDrawerContainer,
        providers: () => [
          // Provide our config as the CDK config as well since it has the same interface as the
          // CDK one, but it contains the actual values passed in by the user for things like
          // `disableClose` which we disable for the CDK dialog since we handle it ourselves.
          { provide: AcpDrawerConfig, useValue: _config },
          { provide: DialogConfig, useValue: _config },
        ],
      },
      scrollStrategy: _config.scrollStrategy || this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().global()[_config.position!]('0'),
      templateContext: () => ({ drawerRef }),
      providers: (cdkRef, _cdkConfig, container) => {
        drawerRef = new AcpDrawerRef(cdkRef, _config, container as AcpDrawerContainer);
        return [
          { provide: AcpDrawerRef, useValue: drawerRef },
          { provide: ACP_DRAWER_DATA, useValue: _config.data },
        ];
      },
    });

    this.openDrawers.push(drawerRef);
    this.afterOpened.next(drawerRef);

    drawerRef.afterDismissed().subscribe(() => {
      const index = this.openDrawers.indexOf(drawerRef);

      if (index > -1) {
        this.openDrawers.splice(index, 1);

        if (!this.openDrawers.length) {
          this._getAfterAllDismissed().next();
        }
      }
    });

    return drawerRef;
  }

  /**
   * Dismisses all of the currently-open drawers.
   * This will close all drawers at the current level and emit the afterAllDismissed event.
   */
  dismissAll(): void {
    this._dismissDrawers(this.openDrawers);
  }

  /**
   * Finds an open drawer by its id.
   * @param id ID to use when looking up the drawer.
   * @returns The drawer reference if found, undefined otherwise.
   */
  getDrawerById(id: string): AcpDrawerRef<any> | undefined {
    return this.openDrawers.find(drawer => drawer.id === id);
  }

  /**
   * Lifecycle hook that is called when the service is destroyed.
   * Dismisses all drawers at this level and completes observables.
   */
  ngOnDestroy() {
    // Only dismiss the drawers at this level on destroy
    // since the parent service may still be active.
    this._dismissDrawers(this._openDrawersAtThisLevel);
    this._afterAllDismissedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
  }

  /**
   * Dismisses multiple drawers.
   * @param drawers Array of drawer references to dismiss
   */
  private _dismissDrawers(drawers: AcpDrawerRef<any>[]) {
    let i = drawers.length;

    while (i--) {
      drawers[i].dismiss();
    }
  }
}
