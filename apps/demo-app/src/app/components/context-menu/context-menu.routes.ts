import { Routes } from '@angular/router';
import { ContextMenuOverview } from './context-menu-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: ContextMenuOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
