import { Routes } from '@angular/router';
import { TabulatorTableOverview } from './tabulator-table-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: TabulatorTableOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
