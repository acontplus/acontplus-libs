import { Routes } from '@angular/router';
import { ComponentSidenav } from './pages/component-sidenav/component-sidenav';
import { ComponentCategoryList } from './pages/component-category-list/component-category-list';
import { ModuleSidenav } from './pages/module-sidenav/module-sidenav';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./layout/app-layout/app-layout').then(m => m.AppLayout),
  },
  { path: 'categories', redirectTo: '/components/categories' },
  {
    path: 'components',
    component: ComponentSidenav,
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        children: [{ path: '', component: ComponentCategoryList }],
      },
      {
        path: '',
        loadChildren: () => import('./components/components.routes').then(m => m.routes),
      },
      { path: '**', redirectTo: 'categories' },
    ],
  },
  {
    path: 'modules',
    component: ModuleSidenav,
    children: [
      { path: '', redirectTo: 'modules', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./modules/modules.routes').then(m => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
