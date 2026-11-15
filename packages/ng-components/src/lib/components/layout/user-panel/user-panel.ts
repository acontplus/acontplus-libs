import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

export interface AcpUserPanelDetail {
  icon: string;
  value: string;
  /** Shown on hover, e.g. "Default warehouse". */
  tooltip?: string;
}

/**
 * Session summary for the `acpSidebarUser` slot of `acp-layout`: avatar, title (user or company),
 * subtitle and optional details with icon. Fades out in the collapsed sidebar.
 */
@Component({
  selector: 'acp-user-panel',
  template: `
    @if (link()) {
      <a class="acp-user-panel acp-user-panel--link" [routerLink]="link()">
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <div class="acp-user-panel">
        <ng-container [ngTemplateOutlet]="content" />
      </div>
    }

    <ng-template #content>
      @if (avatar()) {
        <img class="acp-user-panel__avatar" [src]="avatar()" alt="" width="48" height="48" />
      }
      <div class="acp-user-panel__info">
        <h4 class="acp-user-panel__title">{{ title() }}</h4>
        @if (subtitle()) {
          <h5 class="acp-user-panel__subtitle">{{ subtitle() }}</h5>
        }
        @if (details().length) {
          <ul class="acp-user-panel__details">
            @for (detail of details(); track $index) {
              <li [matTooltip]="detail.tooltip ?? ''" matTooltipPosition="right">
                <mat-icon>{{ detail.icon }}</mat-icon><span>{{ detail.value }}</span>
              </li>
            }
          </ul>
        }
      </div>
    </ng-template>
  `,
  styleUrl: './user-panel.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, MatIconModule, MatTooltipModule],
})
export class AcpUserPanel {
  readonly title = input('');
  readonly subtitle = input<string>();
  readonly avatar = input<string | null>();
  readonly details = input<AcpUserPanelDetail[]>([]);
  /** Makes the panel a link (e.g. to the profile). */
  readonly link = input<string>();
}
