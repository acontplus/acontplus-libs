import { Directive, inject } from '@angular/core';
import { AcpNavAccordionItem } from './nav-accordion-item';

@Directive({
  selector: '[acpNavAccordionToggle]',
  exportAs: 'acpNavAccordionToggle',
  host: {
    '[attr.aria-expanded]': 'item.expanded()',
    '(click)': 'item.toggle()',
  },
})
export class AcpNavAccordionToggle {
  protected readonly item = inject(AcpNavAccordionItem);
}
