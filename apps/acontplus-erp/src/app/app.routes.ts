import { Route } from '@angular/router';
import { AdminLayout } from './theme/admin-layout/admin-layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AdminLayout,
    // canActivate: [authGuard],
    // canActivateChild: [authGuard],
    children: [
      {
        path: 'tables',
        loadChildren: () => import('./routes/tables/tables.routes').then((m) => m.routes),
      },
      {
        path: 'material',
        loadChildren: () => import('./routes/material/material.routes').then((m) => m.routes),
      },
    ],
  },
];
