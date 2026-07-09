import { Routes } from '@angular/router';
import { AlertOverview } from './alert-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: AlertOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
