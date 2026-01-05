import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Params, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCategory {
  id: string;
  name: string;
  summary: string;
  category?: string;
}

export const COMPONENTS_MENU: ComponentCategory[] = [
  // Form Controls
  {
    id: 'autocomplete',
    name: 'Autocomplete',
    summary: 'Enhanced autocomplete wrapper with custom functionality.',
    category: 'Form Controls',
  },
  {
    id: 'input-chip',
    name: 'Input Chip',
    summary: 'Chip input components for tag and chip selection.',
    category: 'Form Controls',
  },
  {
    id: 'dynamic-select',
    name: 'Dynamic Select',
    summary: 'Dynamic select dropdown components.',
    category: 'Form Controls',
  },
  {
    id: 'date-range-picker',
    name: 'Date Range Picker',
    summary: 'Modern TypeScript date range picker with @formkit/tempo integration.',
    category: 'Form Controls',
  },

  // Buttons & Indicators
  {
    id: 'button',
    name: 'Button',
    summary: 'Flexible buttons with Material Design variants and report format support.',
    category: 'Buttons & Indicators',
  },
  {
    id: 'icons',
    name: 'Icons',
    summary: 'Type-safe SVG icon system with registry and fallback support.',
    category: 'Buttons & Indicators',
  },
  {
    id: 'spinner',
    name: 'Spinner',
    summary: 'Loading spinner components for async operations.',
    category: 'Buttons & Indicators',
  },

  // Layout
  {
    id: 'cards',
    name: 'Cards',
    summary: 'Versatile card components with Angular Material integration.',
    category: 'Layout',
  },
  {
    id: 'dialog',
    name: 'Dialog',
    summary: 'Enhanced dialog wrapper with advanced features.',
    category: 'Layout',
  },

  // Data Tables
  {
    id: 'data-grid',
    name: 'Data Grid',
    summary: 'Advanced data grid with Material table integration.',
    category: 'Data Tables',
  },
  {
    id: 'dynamic-table',
    name: 'Dynamic Table',
    summary: 'Angular Material-based dynamic table with row selection and styling.',
    category: 'Data Tables',
  },
  {
    id: 'tabulator-table',
    name: 'Tabulator Table',
    summary: 'Advanced table with Tabulator.js integration and virtual scrolling.',
    category: 'Data Tables',
  },

  // Theming
  {
    id: 'theme-toggle',
    name: 'Theme Toggle',
    summary: 'Dark/light mode toggle for theme switching.',
    category: 'Theming',
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
