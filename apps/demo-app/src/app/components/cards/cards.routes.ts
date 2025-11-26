import { Routes } from '@angular/router';
import { CardsOverview } from './cards-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: CardsOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
