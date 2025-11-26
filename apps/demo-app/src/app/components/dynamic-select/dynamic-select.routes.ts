import { Routes } from '@angular/router';
import { DynamicSelectOverview } from './dynamic-select-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: DynamicSelectOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
