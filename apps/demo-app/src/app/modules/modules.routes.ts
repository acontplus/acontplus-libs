import { Routes } from '@angular/router';
import { ComponentViewer } from '../pages/component-viewer/component-viewer';

export const routes: Routes = [
  {
    path: '',
    component: ComponentViewer,
    children: [
      {
        path: 'company-customers',
        loadChildren: () => import('./company-customer/company-customer').then(m => m.routes),
      },
    ],
  },
];
