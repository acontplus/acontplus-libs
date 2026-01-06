import { Routes } from '@angular/router';
import { DialogOverview } from './dialog-overview';
import { DialogExamples } from './dialog-examples';
import { DialogApi } from './dialog-api';
import { DialogStyling } from './dialog-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: DialogOverview },
  { path: 'examples', component: DialogExamples },
  { path: 'api', component: DialogApi },
  { path: 'styling', component: DialogStyling },
  { path: '**', redirectTo: 'overview' },
];
