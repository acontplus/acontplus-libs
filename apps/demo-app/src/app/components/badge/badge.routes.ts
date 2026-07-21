import { Routes } from '@angular/router';
import { BadgeOverview } from './badge-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: BadgeOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
