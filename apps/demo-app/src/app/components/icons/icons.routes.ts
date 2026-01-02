import { Routes } from '@angular/router';
import { IconsOverview } from './icons-overview';
import { IconsExamples } from './icons-examples';
import { IconsApi } from './icons-api';
import { IconsStyling } from './icons-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: IconsOverview },
  { path: 'examples', component: IconsExamples },
  { path: 'api', component: IconsApi },
  { path: 'styling', component: IconsStyling },
  { path: '**', redirectTo: 'overview' },
];
