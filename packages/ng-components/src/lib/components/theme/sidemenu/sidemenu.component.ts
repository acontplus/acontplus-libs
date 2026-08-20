import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { Component, input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MenuItem } from './menu.interfaces';
import { NavAccordionDirective } from './nav-accordion.directive';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';
import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';

@Component({
  selector: 'acp-sidemenu',
  template: `
    <ng-container
      [ngTemplateOutlet]="menuTpl"
      [ngTemplateOutletContext]="{ menuList: menuItems(), parentRoute: [], level: 0 }"
    />

    <ng-template #menuTpl let-menuList="menuList" let-parentRoute="parentRoute" let-level="level">
      <ul acpNavAccordion class="acp-sidemenu level-{{ level }}" [class.submenu]="level > 0">
        @for (menuItem of menuList; track $index) {
          <ng-template
            [ngxPermissionsOnly]="menuItem.permissions?.only"
            [ngxPermissionsExcept]="menuItem.permissions?.except"
          >
            <li
              class="menu-item"
              acpNavAccordionItem
              [route]="menuItem.route"
              routerLinkActive="active"
            >
              @if (menuItem.type === 'link') {
                <a
                  class="menu-heading"
                  [routerLink]="buildRoute(parentRoute.concat([menuItem.route]))"
                  matRipple
                >
                  <ng-container
                    [ngTemplateOutlet]="linkTypeTpl"
                    [ngTemplateOutletContext]="{ item: menuItem, level: level }"
                  />
                </a>
              }
              @if (menuItem.type === 'extLink') {
                <a class="menu-heading" [href]="menuItem.route" matRipple>
                  <ng-container
                    [ngTemplateOutlet]="linkTypeTpl"
                    [ngTemplateOutletContext]="{ item: menuItem, level: level }"
                  />
                </a>
              }
              @if (menuItem.type === 'extTabLink') {
                <a class="menu-heading" [href]="menuItem.route" target="_blank" matRipple>
                  <ng-container
                    [ngTemplateOutlet]="linkTypeTpl"
                    [ngTemplateOutletContext]="{ item: menuItem, level: level }"
                  />
                </a>
              }
              @if (menuItem.type === 'sub') {
                <button acpNavAccordionToggle class="menu-heading menu-toggle" matRipple>
                  <ng-container
                    [ngTemplateOutlet]="linkTypeTpl"
                    [ngTemplateOutletContext]="{ item: menuItem, level: level }"
                  />
                </button>

                <ng-container
                  [ngTemplateOutlet]="menuTpl"
                  [ngTemplateOutletContext]="{
                    menuList: menuItem.children,
                    parentRoute: parentRoute.concat([menuItem.route]),
                    level: level + 1,
                  }"
                />
              }
            </li>
          </ng-template>
        }
      </ul>
    </ng-template>

    <ng-template #linkTypeTpl let-item="item" let-level="level">
      @if (item.icon) {
        <mat-icon class="menu-icon" [class.submenu-icon]="level > 0">{{ item.icon }}</mat-icon>
      } @else {
        <span class="menu-icon" [class.submenu-icon]="level > 0">
          {{ item.name | slice: 0 : 1 }}
        </span>
      }
      <span class="menu-name">{{ item.name }}</span>
      @if (item.label) {
        <span class="menu-label bg-{{ item.label.color }}">{{ item.label.value }}</span>
      }
      @if (item.badge) {
        <span class="menu-badge bg-{{ item.badge.color }}">{{ item.badge.value }}</span>
      }
      @if (item.type !== 'link') {
        <mat-icon class="menu-caret">{{
          item.type === 'sub' ? 'arrow_drop_down' : 'launch'
        }}</mat-icon>
      }
    </ng-template>
  `,
  styleUrl: './sidemenu.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SlicePipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgxPermissionsModule,
    MatIconModule,
    MatRippleModule,
    NavAccordionDirective,
    NavAccordionItemDirective,
    NavAccordionToggleDirective,
  ],
})
export class SidemenuComponent {
  readonly menuItems = input<MenuItem[]>([]);

  buildRoute(routeArr: string[]) {
    let route = '';
    routeArr.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }
}
