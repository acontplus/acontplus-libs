import { Routes } from '@angular/router';
import { ButtonOverview } from './button-overview';
import { ButtonExamples } from './examples/button-examples';
import { ButtonApi } from './button-api';
import { ButtonStyling } from './button-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: ButtonOverview,
    pathMatch: 'full',
  },
  {
    path: 'examples',
    component: ButtonExamples,
  },
  {
    path: 'api',
    component: ButtonApi,
  },
  {
    path: 'styling',
    component: ButtonStyling,
  },
  { path: '**', redirectTo: 'overview' },
];
