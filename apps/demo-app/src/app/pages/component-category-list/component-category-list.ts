import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { COMPONENTS_MENU, ComponentCategory } from '../component-nav/component-nav';
import { ComponentPageTitleService } from '../../shared/services/page-title';
import { CommonModule } from '@angular/common';

interface ComponentGroup {
  category: string;
  components: ComponentCategory[];
}

@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrl: './component-category-list.scss',
  imports: [RouterLink, CommonModule],
})
export class ComponentCategoryList implements OnInit, OnDestroy {
  _componentPageTitle = inject(ComponentPageTitleService);
  private _route = inject(ActivatedRoute);

  params!: Observable<Params>;
  routeParamSubscription!: Subscription;
  _categoryListSummary: string | undefined;

  list = COMPONENTS_MENU;
  groupedComponents: ComponentGroup[] = [];

  ngOnInit() {
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign,
    );

    this.routeParamSubscription = this.params.subscribe(() => {
      this._componentPageTitle.title = 'components';
    });

    // Group components by category
    this.groupComponents();
  }

  ngOnDestroy() {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }

  private groupComponents() {
    const groups = new Map<string, ComponentCategory[]>();

    this.list.forEach(component => {
      const category = component.category || 'Other';
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(component);
    });

    this.groupedComponents = Array.from(groups.entries()).map(([category, components]) => ({
      category,
      components,
    }));
  }
}
