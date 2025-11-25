import { Routes } from '@angular/router';
import { ThemeToggleOverview } from './theme-toggle-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: ThemeToggleOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
