import { Routes } from '@angular/router';
import { AutocompleteOverview } from './autocomplete-overview';
import { AutocompleteExamples } from './autocomplete-examples';
import { AutocompleteApi } from './autocomplete-api';
import { AutocompleteStyling } from './autocomplete-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: AutocompleteOverview },
  { path: 'examples', component: AutocompleteExamples },
  { path: 'api', component: AutocompleteApi },
  { path: 'styling', component: AutocompleteStyling },
  { path: '**', redirectTo: 'overview' },
];
