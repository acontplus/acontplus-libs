import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { buildMenuRoute, isMenuItemActive, type AcpMenuItem } from '../menu';
import { injectCurrentPath } from './current-path';
import { AcpTopmenuPanel } from './topmenu-panel';

/** Horizontal menu of `acp-layout` (`navPos: 'top'`); `sub` items open a dropdown panel. */
@Component({
  selector: 'acp-topmenu',
  templateUrl: './topmenu.html',
  styleUrl: './topmenu.scss',
  host: { class: 'acp-topmenu' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    AcpTopmenuPanel,
  ],
})
export class AcpTopmenu {
  /** Menu items, already filtered by permission. */
  readonly items = input<AcpMenuItem[]>([]);

  protected readonly path = injectCurrentPath();
  protected readonly route = buildMenuRoute;
  protected readonly isActive = isMenuItemActive;
}
