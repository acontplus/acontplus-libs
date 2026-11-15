import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { buildMenuRoute, isMenuItemActive, type AcpMenuItem } from '../menu';
import { injectCurrentPath } from './current-path';

/** Dropdown of a `sub` item of `acp-topmenu`; nests itself for deeper levels. */
@Component({
  selector: 'acp-topmenu-panel',
  templateUrl: './topmenu-panel.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatMenuModule],
})
export class AcpTopmenuPanel {
  readonly items = input<AcpMenuItem[]>([]);
  readonly parentRoute = input<string[]>([]);

  readonly menuPanel = viewChild.required(MatMenu);

  protected readonly path = injectCurrentPath();

  protected route(item: AcpMenuItem): string {
    return buildMenuRoute([...this.parentRoute(), item.route]);
  }

  protected isActive(item: AcpMenuItem): boolean {
    return isMenuItemActive(item, this.path(), this.parentRoute());
  }
}
