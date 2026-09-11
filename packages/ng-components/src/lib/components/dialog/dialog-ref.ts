import { ComponentRef } from '@angular/core';
import { MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { firstValueFrom, from, Observable, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import type { AcpDialogActionClick } from './dialog.interfaces';

/**
 * Reference to a dialog opened via `AcpDialogService`. Mirrors the public surface
 * of `MatDialogRef` so consumers can subscribe to `afterClosed()`, close manually,
 * inspect the component instance, etc.
 *
 * It is both the value returned by `AcpDialogService.open()` and an injectable
 * token: content components can `inject(AcpDialogRef)` to close themselves.
 */
export class AcpDialogRef<R = unknown> {
  /** Emits every time a configured dialog action is clicked, before it closes. */
  clickedResult: Subject<AcpDialogActionClick<R>>;

  /** Observable mirror of {@link clickedResult}. */
  get actionClicked$(): Observable<AcpDialogActionClick<R>> {
    return this.clickedResult.asObservable();
  }

  constructor(
    private readonly matDialogRef: MatDialogRef<unknown, R> | Promise<MatDialogRef<unknown, R>>,
    clickedResult?: Subject<AcpDialogActionClick<R>>,
  ) {
    this.clickedResult = clickedResult ?? new Subject<AcpDialogActionClick<R>>();
  }

  /** The instance of the component opened into the dialog. */
  get componentInstance(): unknown {
    return this.readRef(ref => ref.componentInstance);
  }

  /** `ComponentRef` of the component opened into the dialog. */
  get componentRef(): ComponentRef<unknown> | null {
    return this.readRef(ref => ref.componentRef) ?? null;
  }

  /** Whether the user is allowed to close the dialog. */
  get disableClose(): boolean | undefined {
    return this.readRef(ref => ref.disableClose);
  }

  /** Unique ID for the dialog. */
  get id(): string {
    return this.readRef(ref => ref.id) ?? '';
  }

  /** Gets an observable that is notified when the dialog is finished closing. */
  afterClosed(): Observable<R | undefined> {
    return this.fromRef(ref => ref.afterClosed());
  }

  /** Gets an observable that is notified when the dialog is finished opening. */
  afterOpened(): Observable<void> {
    return this.fromRef(ref => ref.afterOpened());
  }

  /** Gets an observable that is notified when the dialog has started closing. */
  beforeClosed(): Observable<R | undefined> {
    return this.fromRef(ref => ref.beforeClosed());
  }

  /** Gets an observable that emits when the overlay's backdrop has been clicked. */
  backdropClick(): Observable<MouseEvent> {
    return this.fromRef(ref => ref.backdropClick());
  }

  /** Gets an observable that emits when keydown events are targeted on the overlay. */
  keydownEvents(): Observable<KeyboardEvent> {
    return this.fromRef(ref => ref.keydownEvents());
  }

  /** Gets the current lifecycle state of the dialog. */
  getState(): MatDialogState | undefined {
    return this.readRef(ref => ref.getState());
  }

  /** Resolves with the result once the dialog finishes closing. */
  get closed(): Promise<R | undefined> {
    return firstValueFrom(this.afterClosed());
  }

  /** Observable that emits the result once the dialog finishes closing. */
  get closed$(): Observable<R | undefined> {
    return this.afterClosed();
  }

  /** Closes the dialog, optionally returning a result. */
  close(result?: R): void {
    this.withRef(ref => ref.close(result));
  }

  /** Updates the dialog's position. */
  updatePosition(position?: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  }): this {
    this.withRef(ref => ref.updatePosition(position));
    return this;
  }

  /** Updates the dialog's width and height. */
  updateSize(width = '', height = ''): this {
    this.withRef(ref => ref.updateSize(width, height));
    return this;
  }

  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes: string | string[]): this {
    this.withRef(ref => ref.addPanelClass(classes));
    return this;
  }

  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes: string | string[]): this {
    this.withRef(ref => ref.removePanelClass(classes));
    return this;
  }

  private fromRef<T>(fn: (ref: MatDialogRef<unknown, R>) => Observable<T>): Observable<T> {
    if (this.matDialogRef instanceof Promise) {
      return from(this.matDialogRef).pipe(take(1), switchMap(fn));
    }
    return fn(this.matDialogRef);
  }

  private readRef<T>(fn: (ref: MatDialogRef<unknown, R>) => T): T | undefined {
    if (this.matDialogRef instanceof Promise) {
      return undefined;
    }
    return fn(this.matDialogRef);
  }

  private withRef(fn: (ref: MatDialogRef<unknown, R>) => void): void {
    if (this.matDialogRef instanceof Promise) {
      this.matDialogRef.then(ref => fn(ref));
    } else {
      fn(this.matDialogRef);
    }
  }
}
