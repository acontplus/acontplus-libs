import { Directive, TemplateRef, inject } from '@angular/core';
import type { AcpSidePanelItem } from './side-panel-layout.types';

export interface AcpSidePanelItemContext<T = string | number> {
  $implicit: AcpSidePanelItem<T>;
  selected: boolean;
}

/**
 * Custom content of each item, inside the list item:
 * `<ng-template acpSidePanelItem let-item let-selected="selected">`.
 */
@Directive({ selector: 'ng-template[acpSidePanelItem]' })
export class AcpSidePanelItemTemplate<T = string | number> {
  readonly templateRef = inject<TemplateRef<AcpSidePanelItemContext<T>>>(TemplateRef);

  static ngTemplateContextGuard<T>(
    _dir: AcpSidePanelItemTemplate<T>,
    _ctx: unknown,
  ): _ctx is AcpSidePanelItemContext<T> {
    return true;
  }
}
