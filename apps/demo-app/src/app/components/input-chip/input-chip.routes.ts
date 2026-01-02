import { Routes } from '@angular/router';
import { InputChipOverview } from './input-chip-overview';
import { InputChipExamples } from './input-chip-examples';
import { InputChipApi } from './input-chip-api';
import { InputChipStyling } from './input-chip-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: InputChipOverview },
  { path: 'examples', component: InputChipExamples },
  { path: 'api', component: InputChipApi },
  { path: 'styling', component: InputChipStyling },
  { path: '**', redirectTo: 'overview' },
];
