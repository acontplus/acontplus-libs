import { Routes } from '@angular/router';
import { DynamicTableOverview } from './dynamic-table-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: DynamicTableOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
