import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { buildMenuRoute, type AcpMenuItem } from '../menu';
import { AcpNavAccordion } from './nav-accordion';
import { AcpNavAccordionItem } from './nav-accordion-item';
import { AcpNavAccordionToggle } from './nav-accordion-toggle';

/** Vertical accordion menu of `acp-layout`. */
@Component({
  selector: 'acp-sidemenu',
  template: `
    <ng-container
      [ngTemplateOutlet]="menuTpl"
      [ngTemplateOutletContext]="{ items: items(), parentRoute: [], level: 0 }"
    />

    <ng-template #menuTpl let-list="items" let-parentRoute="parentRoute" let-level="level">
      <ul acpNavAccordion class="acp-sidemenu level-{{ level }}" [class.submenu]="level > 0">
        @for (item of list; track $index) {
          <li class="menu-item" acpNavAccordionItem [route]="item.route" routerLinkActive="active">
            @switch (item.type) {
              @case ('link') {
                <a class="menu-heading" [routerLink]="route(parentRoute, item)" matRipple>
                  <ng-container
                    [ngTemplateOutlet]="headingTpl"
                    [ngTemplateOutletContext]="{ item, level }"
                  />
                </a>
              }
              @case ('sub') {
                <button
                  type="button"
                  acpNavAccordionToggle
                  class="menu-heading menu-toggle"
                  matRipple
                >
                  <ng-container
                    [ngTemplateOutlet]="headingTpl"
                    [ngTemplateOutletContext]="{ item, level }"
                  />
                </button>
                <ng-container
                  [ngTemplateOutlet]="menuTpl"
                  [ngTemplateOutletContext]="{
                    items: item.children ?? [],
                    parentRoute: parentRoute.concat([item.route]),
                    level: level + 1,
                  }"
                />
              }
              @default {
                <a
                  class="menu-heading"
                  [href]="item.route"
                  [attr.target]="item.type === 'extTabLink' ? '_blank' : null"
                  [attr.rel]="item.type === 'extTabLink' ? 'noopener' : null"
                  matRipple
                >
                  <ng-container
                    [ngTemplateOutlet]="headingTpl"
                    [ngTemplateOutletContext]="{ item, level }"
                  />
                </a>
              }
            }
          </li>
        }
      </ul>
    </ng-template>

    <ng-template #headingTpl let-item="item" let-level="level">
      @if (item.icon) {
        <mat-icon class="menu-icon" [class.submenu-icon]="level > 0">{{ item.icon }}</mat-icon>
      } @else {
        <span class="menu-icon" [class.submenu-icon]="level > 0">{{
          item.name | slice: 0 : 1
        }}</span>
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
    MatIconModule,
    MatRippleModule,
    AcpNavAccordion,
    AcpNavAccordionItem,
    AcpNavAccordionToggle,
  ],
})
export class AcpSidemenu {
  /** Menu items, already filtered by permission. */
  readonly items = input<AcpMenuItem[]>([]);

  protected route(parentRoute: string[], item: AcpMenuItem): string {
    return buildMenuRoute([...parentRoute, item.route]);
  }
}
