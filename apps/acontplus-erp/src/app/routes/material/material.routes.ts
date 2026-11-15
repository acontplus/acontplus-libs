import { Routes } from '@angular/router';

import { CardPage } from './card/card';
import { Toolbar } from './toolbar/toolbar';

export const routes: Routes = [
  { path: 'card', component: CardPage },
  { path: 'toolbar', component: Toolbar },
];
