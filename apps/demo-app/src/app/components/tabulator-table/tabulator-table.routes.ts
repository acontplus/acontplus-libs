import { Routes } from '@angular/router';
import { TabulatorTableOverview } from './tabulator-table-overview';
import { TabulatorTableExamples } from './tabulator-table-examples';
import { TabulatorTableApi } from './tabulator-table-api';
import { TabulatorTableStyling } from './tabulator-table-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: TabulatorTableOverview },
  { path: 'examples', component: TabulatorTableExamples },
  { path: 'api', component: TabulatorTableApi },
  { path: 'styling', component: TabulatorTableStyling },
  { path: '**', redirectTo: 'overview' },
];
