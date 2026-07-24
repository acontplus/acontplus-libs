import { Routes } from '@angular/router';
import { CardOverview } from './card-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: CardOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
