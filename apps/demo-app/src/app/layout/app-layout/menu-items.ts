import { Type } from '@angular/core';
import { DashboardComponent } from '../../ui/dashboard/dashboard.component';

export interface MenuItemList {
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItemList[];
  component?: Type<unknown>;
}

export const menuItems: MenuItemList[] = [
  { icon: 'dashboard', label: 'Dashboard', route: 'dashboard', component: DashboardComponent },
];
