import { a as e } from './chunk-QO52LJYQ.js';
import './chunk-EL47QAQT.js';
import './chunk-ZTXRY76I.js';
import './chunk-4JMGPBNX.js';
import './chunk-57Q2UAVZ.js';
import './chunk-GV4MRAZ3.js';
var r = [
  {
    path: '',
    component: e,
    children: [
      {
        path: 'autocomplete',
        loadChildren: () => import('./chunk-MCBSRM47.js').then((t) => t.routes),
      },
      {
        path: 'input-chip',
        loadChildren: () => import('./chunk-VWAQYUYI.js').then((t) => t.routes),
      },
      {
        path: 'dynamic-select',
        loadChildren: () => import('./chunk-HJAL6LFZ.js').then((t) => t.routes),
      },
      {
        path: 'date-range-picker',
        loadChildren: () => import('./chunk-JOFLYXXH.js').then((t) => t.routes),
      },
      { path: 'button', loadChildren: () => import('./chunk-7VDHQAYX.js').then((t) => t.routes) },
      { path: 'icons', loadChildren: () => import('./chunk-NX7FBHLN.js').then((t) => t.routes) },
      { path: 'spinner', loadChildren: () => import('./chunk-WH3EUEO3.js').then((t) => t.routes) },
      { path: 'cards', loadChildren: () => import('./chunk-IRY7CLBG.js').then((t) => t.routes) },
      { path: 'dialog', loadChildren: () => import('./chunk-XTQNCBGK.js').then((t) => t.routes) },
      {
        path: 'data-grid',
        loadChildren: () => import('./chunk-U6AFY6C6.js').then((t) => t.routes),
      },
      {
        path: 'tabulator-table',
        loadChildren: () => import('./chunk-JTEMRR4Z.js').then((t) => t.routes),
      },
      { path: 'drawer', loadChildren: () => import('./chunk-652XW73P.js').then((t) => t.routes) },
      { path: 'popover', loadChildren: () => import('./chunk-6IPITHAW.js').then((t) => t.routes) },
      {
        path: 'alert-dialog',
        loadComponent: () => import('./chunk-H4TTOU72.js').then((t) => t.AlertDialogComponent),
      },
      {
        path: 'theme-toggle',
        loadChildren: () => import('./chunk-363V2QXN.js').then((t) => t.routes),
      },
    ],
  },
];
export { r as routes };
