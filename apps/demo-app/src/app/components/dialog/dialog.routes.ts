import { Routes } from '@angular/router';
import { DialogOverview } from './dialog-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: DialogOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
