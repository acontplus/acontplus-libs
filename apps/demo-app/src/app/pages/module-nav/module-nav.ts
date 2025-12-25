import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Params, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';

export interface ModuleCategory {
  id: string;
  name: string;
  summary: string;
  category?: string;
}

export const MODULES_MENU: ModuleCategory[] = [
  {
    id: 'company-customers',
    name: 'Company Customer',
    summary: 'Enhanced company customer wrapper with custom functionality.',
    category: 'Customer',
  },
];

@Component({
  selector: 'app-module-nav',
  template: `<div class="docs-component-viewer-nav">
    <div class="docs-component-viewer-nav-content">
      <mat-nav-list>
        @for (component of menus; track $index) {
          <a
            mat-list-item
            #link="routerLinkActive"
            [activated]="link.isActive"
            routerLinkActive="docs-component-viewer-sidenav-item-selected"
            [routerLink]="['/modules/' + component.id]"
          >
            {{ component.name }}
          </a>
        }
      </mat-nav-list>
    </div>
  </div>`,
  imports: [MatListModule, RouterLinkActive, RouterLink],
})
export class ModuleNav {
  @Input() params: Observable<Params> | undefined;
  menus = MODULES_MENU;
  constructor() {
    console.log(this.menus);
  }
}
