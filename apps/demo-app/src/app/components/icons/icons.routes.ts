import { Routes } from '@angular/router';
import { IconsOverview } from './icons-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: IconsOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
