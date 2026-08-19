import { Directive, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { NavAccordionDirective } from './nav-accordion.directive';

@Directive({
  selector: '[acpNavAccordionItem]',
  exportAs: 'acpNavAccordionItem',
  host: {
    '[class.expanded]': 'expanded()',
  },
})
export class NavAccordionItemDirective implements OnInit, OnDestroy {
  private readonly nav = inject(NavAccordionDirective);

  readonly route = input('');

  expanded = signal(false);

  ngOnInit() {
    this.nav.addItem(this);
  }

  ngOnDestroy() {
    this.nav.removeItem(this);
  }

  toggle() {
    this.expanded.update(v => !v);

    if (this.expanded()) {
      this.nav.closeOtherItems(this);
    }
  }

  setExpanded(value: boolean): void {
    if (this.expanded() !== value) {
      this.expanded.set(value);
    }
  }
}
