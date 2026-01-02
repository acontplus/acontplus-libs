import { Routes } from '@angular/router';
import { DynamicSelectOverview } from './dynamic-select-overview';
import { DynamicSelectExamples } from './dynamic-select-examples';
import { DynamicSelectApi } from './dynamic-select-api';
import { DynamicSelectStyling } from './dynamic-select-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: DynamicSelectOverview },
  { path: 'examples', component: DynamicSelectExamples },
  { path: 'api', component: DynamicSelectApi },
  { path: 'styling', component: DynamicSelectStyling },
  { path: '**', redirectTo: 'overview' },
];
