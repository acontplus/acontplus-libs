import { Component, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Subject, startWith } from 'rxjs';
import { ComponentPageTitleService } from '../../shared/services/page-title';
import { NavigationFocus } from '../../shared/directives/navigation-focus';

@Component({
  selector: 'app-component-viewer',
  template: `
    <div class="docs-component-viewer">
      <nav
        mat-tab-nav-bar
        mat-stretch-tabs="false"
        class="docs-component-viewer-tabbed-content"
        aria-label="Documentation Sections"
        id="component-viewer"
        focusOnNavigation
        [tabPanel]="panel"
      >
        @for (section of sections; track section) {
          <a
            mat-tab-link
            class="docs-component-viewer-section-tab"
            [routerLink]="componentId + '/' + section.toLowerCase()"
            routerLinkActive
            #rla="routerLinkActive"
            [active]="rla.isActive"
          >
            {{ section }}
          </a>
        }
      </nav>

      <mat-tab-nav-panel #panel class="docs-component-viewer-content">
        <router-outlet></router-outlet>
      </mat-tab-nav-panel>
    </div>
  `,
  styles: `
    @use '../../../styles/constants';

    guide-viewer,
    app-component-viewer {
      color: var(--mat-sys-on-surface);
    }

    app-component-viewer {
      width: calc(
        100% - #{constants.$sidenav-width + 1} - #{constants.$content-padding-sidenav * 2}
      );
      font-weight: 400;
      line-height: 1.5;

      // spacing for the component viewer
      padding: 20px constants.$content-padding-sidenav;

      // Sidenav is hidden
      @media (max-width: constants.$small-breakpoint-width) {
        width: calc(100% - #{constants.$content-padding-sidenav * 2});
      }
      @media (width <= 599px) {
        width: calc(100% - #{constants.$content-padding-side-xs * 2});
        padding-left: constants.$content-padding-side-xs;
        padding-right: constants.$content-padding-side-xs;
      }

      .docs-component-viewer-section-tab {
        min-width: 160px;
        text-transform: uppercase;
      }
    }

    .docs-component-viewer-tabbed-content {
      margin-bottom: 25px;
    }

    .docs-component-viewer-content {
      position: relative;
      min-height: 500px;

      // Display outlet components with toc as flex and switch to
      // vertical direction on small screens
      component-overview,
      component-api {
        display: flex;
        align-items: flex-start;
        overflow: visible;

        @media (max-width: constants.$small-breakpoint-width) {
          flex-direction: column;
        }
      }

      table-of-contents {
        top: 35px;
        position: sticky;

        @media (max-width: constants.$small-breakpoint-width) {
          order: -1;
          position: inherit;
          width: auto;
          padding-left: 0;
        }
      }
    }

    .docs-component-view-text-content {
      flex-grow: 1;
      width: 100%;
    }

    .docs-component-api,
    .docs-component-overview {
      width: 80%;

      @media (max-width: constants.$small-breakpoint-width) {
        width: 100%;
        margin-right: 0;
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  imports: [MatTabsModule, NavigationFocus, RouterLinkActive, RouterLink, RouterOutlet],
})
export class ComponentViewer implements OnDestroy {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _componentPageTitle = inject(ComponentPageTitleService);

  sections = new Set<string>(['overview', 'api']);
  private _destroyed = new Subject<void>();

  componentId = '';

  constructor() {
    const routeAndParentParams = [this._route.params];
    if (this._route.parent) {
      routeAndParentParams.push(this._route.parent.params);
    }

    this._router.events.pipe(startWith(this._router)).subscribe(s => {
      if (s instanceof Router || s instanceof NavigationEnd) {
        const fragments = s.url.split('/');
        this.componentId = fragments[2] ?? fragments[1];
        this._componentPageTitle.title = this.componentId;
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
