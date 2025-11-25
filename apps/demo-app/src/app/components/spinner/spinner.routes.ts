import { Routes } from '@angular/router';
import { SpinnerOverview } from './spinner-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: SpinnerOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
