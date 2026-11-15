import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import type { AcpNavAccordionItem } from './nav-accordion-item';

/** Accordion of the side menu: one expanded item per level, following the current route. */
@Directive({
  selector: '[acpNavAccordion]',
  exportAs: 'acpNavAccordion',
})
export class AcpNavAccordion {
  private readonly router = inject(Router);
  private readonly items: AcpNavAccordionItem[] = [];

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.expandActiveItems());
  }

  addItem(item: AcpNavAccordionItem): void {
    this.items.push(item);
  }

  removeItem(item: AcpNavAccordionItem): void {
    const index = this.items.indexOf(item);
    if (index !== -1) this.items.splice(index, 1);
  }

  closeOtherItems(openedItem: AcpNavAccordionItem): void {
    for (const item of this.items) {
      if (item !== openedItem) item.setExpanded(false);
    }
  }

  expandActiveItems(): void {
    const segments = this.router.url.split(/[?#]/)[0].split('/');
    for (const item of this.items) {
      const route = item.route();
      if (route && segments.includes(route)) {
        item.setExpanded(true);
        this.closeOtherItems(item);
      }
    }
  }
}
