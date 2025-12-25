import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationFocusService } from '../../shared/services/navigation-focus.service';
import { ComponentPageHeader } from '../component-page-header/component-page-header';
import { ModuleNav } from '../module-nav/module-nav';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'app-module-sidenav',
  templateUrl: 'module-sidenav.html',
  styleUrl: 'module-sidenav.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [MatSidenavModule, ModuleNav, ComponentPageHeader, RouterOutlet, AsyncPipe],
})
export class ModuleSidenav implements OnInit, OnDestroy {
  private _route = inject(ActivatedRoute);
  private _navigationFocusService = inject(NavigationFocusService);

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  params: Observable<Params> | undefined;
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;

  private _urlFragment = '';
  private subscriptions = new Subscription();

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
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign,
    );

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
