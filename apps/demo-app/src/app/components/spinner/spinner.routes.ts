import { Routes } from '@angular/router';
import { SpinnerOverview } from './spinner-overview';
import { SpinnerExamples } from './spinner-examples';
import { SpinnerApi } from './spinner-api';
import { SpinnerStyling } from './spinner-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: SpinnerOverview },
  { path: 'examples', component: SpinnerExamples },
  { path: 'api', component: SpinnerApi },
  { path: 'styling', component: SpinnerStyling },
  { path: '**', redirectTo: 'overview' },
];
