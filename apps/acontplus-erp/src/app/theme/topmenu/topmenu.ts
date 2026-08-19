import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AcpTopmenu } from '@acontplus/ng-components';
import { MenuService } from '@core';

@Component({
  selector: 'app-topmenu',
  standalone: true,
  imports: [AcpTopmenu],
  template: ` <acp-topmenu [items]="menuItems() || []" [buildRoute]="buildRoute" /> `,
})
export class Topmenu {
  private readonly menu = inject(MenuService);

  readonly menuItems = toSignal(this.menu.getAll());

  readonly buildRoute = (routeArr: string[]) => this.menu.buildRoute(routeArr);
}
