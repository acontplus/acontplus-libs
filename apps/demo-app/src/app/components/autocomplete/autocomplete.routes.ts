import { Routes } from '@angular/router';
import { AutocompleteOverview } from './autocomplete-overview';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: AutocompleteOverview,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'overview' },
];
