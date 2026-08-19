import { Directive, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';

@Directive({
  selector: '[acpNavAccordion]',
  exportAs: 'acpNavAccordion',
})
export class NavAccordionDirective {
  private readonly router = inject(Router);

  private navItems: NavAccordionItemDirective[] = [];

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.checkOpenedItems());
  }

  addItem(item: NavAccordionItemDirective) {
    this.navItems.push(item);
  }

  removeItem(item: NavAccordionItemDirective) {
    const index = this.navItems.indexOf(item);
    if (index !== -1) {
      this.navItems.splice(index, 1);
    }
  }

  closeOtherItems(openedItem: NavAccordionItemDirective) {
    this.navItems.forEach(item => {
      if (item !== openedItem) {
        item.setExpanded(false);
      }
    });
  }

  checkOpenedItems() {
    this.navItems.forEach(item => {
      const route = item.route();
      if (route && this.router.url.split('/').includes(route)) {
        item.setExpanded(true);
        this.closeOtherItems(item);
      }
    });
  }
}
