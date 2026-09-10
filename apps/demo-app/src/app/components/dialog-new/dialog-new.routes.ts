import { Routes } from '@angular/router';
import { DialogNewOverview } from './dialog-new-overview';
import { DialogNewExamples } from './dialog-new-examples';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: DialogNewOverview },
  { path: 'examples', component: DialogNewExamples },
  { path: '**', redirectTo: 'overview' },
];
