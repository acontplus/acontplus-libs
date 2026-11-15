import { Directive, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { AcpNavAccordion } from './nav-accordion';

@Directive({
  selector: '[acpNavAccordionItem]',
  exportAs: 'acpNavAccordionItem',
  host: { '[class.expanded]': 'expanded()' },
})
export class AcpNavAccordionItem implements OnInit, OnDestroy {
  private readonly accordion = inject(AcpNavAccordion);

  readonly route = input('');
  readonly expanded = signal(false);

  ngOnInit(): void {
    this.accordion.addItem(this);
  }

  ngOnDestroy(): void {
    this.accordion.removeItem(this);
  }

  toggle(): void {
    this.expanded.update(expanded => !expanded);
    if (this.expanded()) this.accordion.closeOtherItems(this);
  }

  setExpanded(expanded: boolean): void {
    this.expanded.set(expanded);
  }
}
