import { Provider } from '@angular/core';
import { ColumnResizeNotifier, ColumnResizeNotifierSource } from '../column-resize-notifier';
import { HeaderRowEventDispatcher } from '../event-dispatcher';
import {
  TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER,
  FLEX_RESIZE_STRATEGY_PROVIDER,
} from '../resize-strategy';
import { _COALESCED_STYLE_SCHEDULER, _CoalescedStyleScheduler } from '../coalesced-style-scheduler';

const PROVIDERS: Provider[] = [
  ColumnResizeNotifier,
  HeaderRowEventDispatcher,
  ColumnResizeNotifierSource,
  { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
];

export const TABLE_PROVIDERS: Provider[] = [
  ...PROVIDERS,
  TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER,
];
export const FLEX_PROVIDERS: Provider[] = [...PROVIDERS, FLEX_RESIZE_STRATEGY_PROVIDER];
