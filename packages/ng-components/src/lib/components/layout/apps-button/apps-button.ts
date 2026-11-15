import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

export interface AcpAppShortcut {
  title: string;
  subtitle?: string;
  icon: string;
  /** Icon color; the tile uses a 15% tint of it. Defaults to the theme primary. */
  color?: string;
  /** Internal route; external apps use `href`. */
  route?: string;
  href?: string;
}

/** Header button with a dropdown grid of app shortcuts (MaterialPro "apps"). */
@Component({
  selector: 'acp-apps-button',
  template: `
    <button type="button" matIconButton [attr.aria-label]="title()" [matMenuTriggerFor]="menu">
      <mat-icon>{{ icon() }}</mat-icon>
    </button>

    <mat-menu #menu="matMenu" class="acp-apps-menu">
      <div class="acp-apps-menu__body">
        <h6 class="acp-apps-menu__heading">{{ title() }}</h6>
        <div class="acp-apps-menu__grid">
          @for (app of apps(); track app.title) {
            @if (app.href) {
              <a
                mat-menu-item
                class="acp-apps-menu__item"
                target="_blank"
                rel="noopener"
                [href]="app.href"
              >
                <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ app }" />
              </a>
            } @else {
              <a mat-menu-item class="acp-apps-menu__item" [routerLink]="app.route">
                <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ app }" />
              </a>
            }
          }
        </div>
      </div>
    </mat-menu>

    <ng-template #content let-app="app">
      <span class="acp-apps-menu__icon" [style.--acp-app-color]="app.color">
        <mat-icon>{{ app.icon }}</mat-icon>
      </span>
      <span class="acp-apps-menu__text">
        <span class="acp-apps-menu__title">{{ app.title }}</span>
        @if (app.subtitle) {
          <span class="acp-apps-menu__subtitle">{{ app.subtitle }}</span>
        }
      </span>
    </ng-template>
  `,
  styleUrl: './apps-button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
})
export class AcpAppsButton {
  readonly apps = input<AcpAppShortcut[]>([]);
  /** Heading of the dropdown and accessible name of the button. */
  readonly title = input('Aplicaciones');
  readonly icon = input('apps');
}
