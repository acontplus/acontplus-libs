import { Routes } from '@angular/router';

import { CardPage } from './card/card';
import { LogoPage } from './logo/logo';
import { Toolbar } from './toolbar/toolbar';

export const routes: Routes = [
  { path: 'card', component: CardPage },
  { path: 'logo', component: LogoPage },
  { path: 'toolbar', component: Toolbar },
];
