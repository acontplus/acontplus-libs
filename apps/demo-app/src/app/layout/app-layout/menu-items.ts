import { Type } from '@angular/core';
import { DashboardComponent } from '../../ui/dashboard/dashboard.component';
import { AutocompleteComponent } from '../../ui/autocomplete/autocomplete.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { Buttons } from '../../ui/buttons/buttons';

export interface MenuItemList {
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItemList[];
  component?: Type<unknown>;
}

export const menuItems: MenuItemList[] = [
  { icon: 'dashboard', label: 'Dashboard', route: 'dashboard', component: DashboardComponent },
  { icon: 'menu', label: 'Buttons', route: 'buttons', component: Buttons },
  { icon: 'card', label: 'Cards', route: 'cards', component: CardsComponent },
  {
    icon: 'search',
    label: 'Autocomplete',
    route: 'autocomplete',
    component: AutocompleteComponent,
  },
];
