import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  input,
  output,
  ViewEncapsulation,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { debounceTime, filter, tap } from 'rxjs';
import { AcpTopmenuPanel } from './topmenu-panel';
import type { AcpTopmenuChildItem, AcpTopmenuItem } from './topmenu.types';

@Component({
  selector: 'acp-topmenu',
  templateUrl: './topmenu.html',
  styleUrl: './topmenu.scss',
  host: {
    class: 'acp-topmenu',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    NgxPermissionsModule,
    AcpTopmenuPanel,
  ],
})
export class AcpTopmenu {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly items = input.required<AcpTopmenuItem[]>();
  readonly buildRoute = input<(routeArr: string[]) => string>(routeArr =>
    routeArr
      .filter(item => item?.trim())
      .map(item => '/' + item.replace(/^\/+|\/+$/g, ''))
      .join(''),
  );

  readonly routeChange = output<{
    rla: RouterLinkActive;
    item: AcpTopmenuItem | AcpTopmenuChildItem;
  }>();

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

  onRouteChange(rla: RouterLinkActive, menuItem: AcpTopmenuItem) {
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
