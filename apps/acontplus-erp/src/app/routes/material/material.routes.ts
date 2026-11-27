import { Routes } from '@angular/router';

import { ButtonPage } from './button/button';
import { CardPage } from './card/card';
import { DialogPage } from './dialog/dialog';
import { ExpansionPage } from './expansion/expansion';
import { LogoPage } from './logo/logo';
import { MenuPage } from './menu/menu';
import { RadioCardPage } from './radio-card/radio-card';
import { SelectPage } from './select/select';
import { SidePanelLayoutPage } from './side-panel-layout/side-panel-layout';
import { Toolbar } from './toolbar/toolbar';
import { TooltipPage } from './tooltip/tooltip';

export const routes: Routes = [
  { path: 'button', component: ButtonPage },
  { path: 'card', component: CardPage },
  { path: 'dialog', component: DialogPage },
  { path: 'expansion', component: ExpansionPage },
  { path: 'logo', component: LogoPage },
  { path: 'menu', component: MenuPage },
  { path: 'radio-card', component: RadioCardPage },
  { path: 'select', component: SelectPage },
  { path: 'side-panel-layout', component: SidePanelLayoutPage },
  { path: 'toolbar', component: Toolbar },
  { path: 'tooltip', component: TooltipPage },
];
