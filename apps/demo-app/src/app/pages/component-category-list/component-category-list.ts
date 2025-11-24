import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { COMPONENTS_MENU } from '../component-nav/component-nav';
import { ComponentPageTitleService } from '../../shared/services/page-title';
import { NavigationFocus } from '../../shared/directives/navigation-focus';

@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrl: './component-category-list.scss',
  imports: [NavigationFocus, RouterLink],
})
export class ComponentCategoryList implements OnInit, OnDestroy {
  _componentPageTitle = inject(ComponentPageTitleService);
  private _route = inject(ActivatedRoute);

  params!: Observable<Params>;
  routeParamSubscription!: Subscription;
  _categoryListSummary: string | undefined;

  list = COMPONENTS_MENU;

  ngOnInit() {
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign,
    );

    this.routeParamSubscription = this.params.subscribe(() => {
      this._componentPageTitle.title = 'components';
    });
  }

  ngOnDestroy() {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }
}
