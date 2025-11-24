import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Params, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';

export const COMPONENTS_MENU = [
  {
    id: 'data-grid',
    name: 'Data Grid',
    summary: 'A powerful data grid for Material table.',
  },
];

@Component({
  selector: 'app-component-nav',
  template: `<div class="docs-component-viewer-nav">
    <div class="docs-component-viewer-nav-content">
      <mat-nav-list>
        @for (component of menus; track component) {
          <a
            mat-list-item
            #link="routerLinkActive"
            [activated]="link.isActive"
            routerLinkActive="docs-component-viewer-sidenav-item-selected"
            [routerLink]="['/components/' + component.id]"
          >
            {{ component.name }}
          </a>
        }
      </mat-nav-list>
    </div>
  </div>`,
  imports: [MatListModule, RouterLinkActive, RouterLink],
})
export class ComponentNav {
  @Input() params: Observable<Params> | undefined;
  menus = COMPONENTS_MENU;
  constructor() {}
}
