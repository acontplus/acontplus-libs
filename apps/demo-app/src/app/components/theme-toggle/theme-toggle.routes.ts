import { Routes } from '@angular/router';
import { ThemeToggleOverview } from './theme-toggle-overview';
import { ThemeToggleExamples } from './theme-toggle-examples';
import { ThemeToggleApi } from './theme-toggle-api';
import { ThemeToggleStyling } from './theme-toggle-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: ThemeToggleOverview },
  { path: 'examples', component: ThemeToggleExamples },
  { path: 'api', component: ThemeToggleApi },
  { path: 'styling', component: ThemeToggleStyling },
  { path: '**', redirectTo: 'overview' },
];
