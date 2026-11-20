import { Routes } from '@angular/router';

import { TablesKitchenSink } from './kitchen-sink/kitchen-sink';
import { TabulatorPage } from './tabulator/tabulator';

export const routes: Routes = [
  { path: 'kitchen-sink', component: TablesKitchenSink },
  { path: 'tabulator', component: TabulatorPage },
];
