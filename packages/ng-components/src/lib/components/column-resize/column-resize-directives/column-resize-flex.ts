import { Directive, ElementRef, NgZone, inject } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';

import { ColumnResize } from '../column-resize';
import { ColumnResizeNotifier, ColumnResizeNotifierSource } from '../column-resize-notifier';
import { HeaderRowEventDispatcher } from '../event-dispatcher';
import { FLEX_PROVIDERS } from './constants';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'cdk-table[columnResize]',
  providers: [...FLEX_PROVIDERS, { provide: ColumnResize, useExisting: CdkColumnResizeFlex }],
})
export class CdkColumnResizeFlex extends ColumnResize {
  readonly columnResizeNotifier = inject(ColumnResizeNotifier);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly eventDispatcher = inject(HeaderRowEventDispatcher);
  protected readonly ngZone = inject(NgZone);
  protected readonly notifier = inject(ColumnResizeNotifierSource);
  protected readonly table = inject<CdkTable<unknown>>(CdkTable);
}
