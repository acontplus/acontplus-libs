import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    id: 'file-upload',
    name: 'File Upload',
    summary: 'File picker and uploader with drag and drop, previews, progress and validation.',
    category: 'Form Controls',
  },
  {
    id: 'search-select',
    name: 'Search Select',
    summary: 'Searchable select on mat-autocomplete with groups, forms and server-side search.',
    category: 'Form Controls',
  },
  {
    id: 'dynamic-select',
    name: 'Dynamic Select',
    summary: 'Dynamic select dropdown components.',
    category: 'Form Controls',
  },
  {
    id: 'date-range-input',
    name: 'Date Range Input',
    summary:
      'Comprehensive date range picker with predefined options and human-readable expressions.',
    category: 'Form Controls',
  },
  {
    id: 'vanilla-date-range-picker',
    name: 'Vanilla Date Range Picker',
    summary:
      'Date range picker wrapper around the vanilla JS library with dual calendars, time picker, and predefined ranges.',
    category: 'Form Controls',
  },

  // Buttons & Indicators
  {
    id: 'alert',
    name: 'Alert',
    summary: 'Flexible alert component with multiple types and dismissible option.',
    category: 'Buttons & Indicators',
  },
  {
    id: 'badge',
    name: 'Badge',
    summary:
      'Versatile badge and chip component built on Angular Material for status, labels, filters, and KPIs.',
    category: 'Buttons & Indicators',
  },
  {
    id: 'kpi-card',
    name: 'KPI Card',
    summary:
      'Professional KPI card component for displaying key performance indicators and metrics on dashboards.',
    category: 'Buttons & Indicators',
  },
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
  {
    id: 'context-menu',
    name: 'Context Menu',
    summary:
      'Flexible context menu component with nested menus, icons, badges, and keyboard shortcuts.',
    category: 'Buttons & Indicators',
  },
  {
    id: 'card',
    name: 'Card',
    summary:
      'Flexible, reusable card component based on Material Design 3 with multiple appearances and content projection.',
    category: 'Layout',
  },

  // Layout
  {
    id: 'dialog',
    name: 'Dialog',
    summary: 'Enhanced dialog wrapper with advanced features.',
    category: 'Layout',
  },
  {
    id: 'dialog-new',
    name: 'Dialog (New)',
    summary:
      'Reusable, strongly-typed dialog service with a single data channel, typed results and confirm/alert presets.',
    category: 'Layout',
  },

  // Data Tables
  {
    id: 'data-grid',
    name: 'Data Grid',
    summary:
      'Advanced data grid with Material table integration, signals, and modern Angular patterns.',
    category: 'Data Tables',
  },
  {
    id: 'drawer',
    name: 'Drawer',
    summary: 'Slide-out navigation drawer component with Material Design.',
    category: 'Layout',
  },
  {
    id: 'popover',
    name: 'Popover',
    summary: 'Contextual overlay component for displaying additional content.',
    category: 'Layout',
  },
  {
    id: 'notification-demo',
    name: 'Notification Service',
    summary:
      'Comprehensive notification system with multiple providers (SweetAlert2, Toastr, Snackbar).',
    category: 'Notifications & Alerts',
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

export const COMPONENT_CATEGORIES = [
  'Form Controls',
  'Buttons & Indicators',
  'Layout',
  'Data Tables',
  'Notifications & Alerts',
  'Theming',
] as const;

export interface ComponentGroup {
  category: string;
  components: ComponentCategory[];
}

/** Components grouped by category, in `COMPONENT_CATEGORIES` order and sorted by name. */
export const COMPONENT_GROUPS: ComponentGroup[] = COMPONENT_CATEGORIES.map(category => ({
  category,
  components: COMPONENTS_MENU.filter(c => c.category === category).sort((a, b) =>
    a.name.localeCompare(b.name),
  ),
})).filter(group => group.components.length > 0);

@Component({
  selector: 'app-component-nav',
  template: `
    <nav class="docs-component-viewer-nav" aria-label="Components">
      <div class="docs-component-viewer-nav-content">
        <a
          class="docs-nav-item"
          routerLink="/components/categories"
          routerLinkActive="docs-nav-item--active"
        >
          Overview
        </a>
        @for (group of groups; track group.category) {
          <h3 class="docs-nav-group">{{ group.category }}</h3>
          @for (component of group.components; track component.id) {
            <a
              class="docs-nav-item"
              [routerLink]="['/components', component.id]"
              routerLinkActive="docs-nav-item--active"
              ariaCurrentWhenActive="page"
            >
              {{ component.name }}
            </a>
          }
        }
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLinkActive, RouterLink],
})
export class ComponentNav {
  readonly groups = COMPONENT_GROUPS;
}
