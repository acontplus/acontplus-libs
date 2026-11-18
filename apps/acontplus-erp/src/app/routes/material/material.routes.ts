import { Routes } from '@angular/router';

import { ButtonPage } from './button/button';
import { CardPage } from './card/card';
import { DialogPage } from './dialog/dialog';
import { LogoPage } from './logo/logo';
import { Toolbar } from './toolbar/toolbar';
import { TooltipPage } from './tooltip/tooltip';

export const routes: Routes = [
  { path: 'button', component: ButtonPage },
  { path: 'card', component: CardPage },
  { path: 'dialog', component: DialogPage },
  { path: 'logo', component: LogoPage },
  { path: 'toolbar', component: Toolbar },
  { path: 'tooltip', component: TooltipPage },
];
