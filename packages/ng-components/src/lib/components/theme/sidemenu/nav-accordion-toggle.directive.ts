import { Directive, inject } from '@angular/core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';

@Directive({
  selector: '[acpNavAccordionToggle]',
  exportAs: 'acpNavAccordionToggle',
  host: {
    '(click)': 'onClick()',
  },
})
export class NavAccordionToggleDirective {
  private readonly navItem = inject(NavAccordionItemDirective);

  onClick() {
    this.navItem.toggle();
  }
}
