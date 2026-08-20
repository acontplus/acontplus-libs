import {
  Component,
  DestroyRef,
  input,
  output,
  viewChild,
  ViewEncapsulation,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { debounceTime, filter, tap } from 'rxjs';
import type { AcpTopmenuChildItem } from './topmenu.types';

@Component({
  selector: 'acp-topmenu-panel',
  templateUrl: './topmenu-panel.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatMenuModule, NgxPermissionsModule],
})
export class AcpTopmenuPanel {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly menuPanel = viewChild.required(MatMenu);

  readonly items = input.required<AcpTopmenuChildItem[]>();
  readonly parentRoute = input<string[]>([]);
  readonly level = input(1);
  readonly buildRoute = input<(routeArr: string[]) => string>(routeArr =>
    routeArr
      .filter(item => item?.trim())
      .map(item => '/' + item.replace(/^\/+|\/+$/g, ''))
      .join(''),
  );

  readonly routeChange = output<{ rla: RouterLinkActive; item: AcpTopmenuChildItem }>();

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.items().forEach(item => item.active?.set(false));
      });
  }

  onRouterLinkClick(rla: RouterLinkActive) {
    this.routeChange.emit({ rla, item: this.items()[0] });
  }

  onRouteChange(rla: RouterLinkActive, menuItem: AcpTopmenuChildItem) {
    this.routeChange.emit({ rla, item: menuItem });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => {
          this.items()
            .filter(m => m !== menuItem)
            .forEach(item => item.active?.set(false));
        }),
        debounceTime(10),
        tap(() => {
          menuItem.active?.set(rla.isActive);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
