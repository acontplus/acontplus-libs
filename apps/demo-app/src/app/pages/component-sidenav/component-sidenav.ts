import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDrawerToggleResult, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationFocusService } from '../../shared/services/navigation-focus.service';
import { ComponentNav } from '../component-nav/component-nav';
import { ComponentPageHeader } from '../component-page-header/component-page-header';
import { CdkScrollable } from '@angular/cdk/scrolling';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: 'component-sidenav.html',
  styleUrl: 'component-sidenav.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatSidenavModule,
    ComponentNav,
    ComponentPageHeader,
    RouterOutlet,
    AsyncPipe,
    CdkScrollable,
  ],
})
export class ComponentSidenav implements OnInit, OnDestroy {
  private readonly _route = inject(ActivatedRoute);
  private readonly _navigationFocusService = inject(NavigationFocusService);

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;

  private _urlFragment = '';
  private readonly subscriptions = new Subscription();

  constructor() {
    const breakpoints = inject(BreakpointObserver);

    this.isExtraScreenSmall = breakpoints
      .observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit() {
    this.subscriptions.add(
      this._navigationFocusService.navigationEndEvents
        .pipe(map(() => this.isScreenSmall))
        .subscribe(shouldCloseSideNav => {
          if (shouldCloseSideNav && this.sidenav) {
            this.sidenav.close();
          }
        }),
    );

    this._route.fragment.subscribe(fragment => {
      if (fragment != null) {
        this._urlFragment = fragment;

        setTimeout(() => {
          const target = document.getElementById(this._urlFragment);
          if (target) {
            target.scrollIntoView();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
    return sidenav.toggle();
  }
}
