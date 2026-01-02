import { ComponentViewer } from '../pages/component-viewer/component-viewer';

export const routes = [
  {
    path: '',
    component: ComponentViewer,
    children: [
      // Form Controls
      {
        path: 'autocomplete',
        loadChildren: () => import('./autocomplete/autocomplete.routes').then(m => m.routes),
      },
      {
        path: 'input-chip',
        loadChildren: () => import('./input-chip/input-chip.routes').then(m => m.routes),
      },
      {
        path: 'dynamic-select',
        loadChildren: () => import('./dynamic-select/dynamic-select.routes').then(m => m.routes),
      },

      // Buttons & Indicators
      {
        path: 'button',
        loadChildren: () => import('./button/button.routes').then(m => m.routes),
      },
      {
        path: 'icons',
        loadChildren: () => import('./icons/icons.routes').then(m => m.routes),
      },
      {
        path: 'spinner',
        loadChildren: () => import('./spinner/spinner.routes').then(m => m.routes),
      },

      // Layout
      {
        path: 'cards',
        loadChildren: () => import('./cards/cards.routes').then(m => m.routes),
      },
      {
        path: 'dialog',
        loadChildren: () => import('./dialog/dialog.routes').then(m => m.routes),
      },

      // Data Tables
      {
        path: 'data-grid',
        loadChildren: () => import('./data-grid/data-grid').then(m => m.routes),
      },
      {
        path: 'tabulator-table',
        loadChildren: () => import('./tabulator-table/tabulator-table.routes').then(m => m.routes),
      },

      // Theming
      {
        path: 'theme-toggle',
        loadChildren: () => import('./theme-toggle/theme-toggle.routes').then(m => m.routes),
      },
    ],
  },
];
