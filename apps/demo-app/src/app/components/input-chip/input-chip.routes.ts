import { Routes } from '@angular/router';
import { InputChipOverview } from './input-chip-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: InputChipOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
