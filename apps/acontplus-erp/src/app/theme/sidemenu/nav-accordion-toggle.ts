import { Directive, inject } from '@angular/core';
import { NavAccordionItem } from './nav-accordion-item';

@Directive({
  selector: '[appNavAccordionToggle]',
  exportAs: 'acpNavAccordionToggle',
  host: {
    '(click)': 'onClick()',
  },
})
export class NavAccordionToggle {
  private readonly navItem = inject(NavAccordionItem);

  onClick() {
    this.navItem.toggle();
  }
}
