import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPONENT_GROUPS } from '../component-nav/component-nav';
import { ComponentPageTitleService } from '../../shared/services/page-title';

@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrl: './component-category-list.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
})
export class ComponentCategoryList implements OnInit {
  private readonly _componentPageTitle = inject(ComponentPageTitleService);

  readonly groups = COMPONENT_GROUPS;

  ngOnInit() {
    this._componentPageTitle.title = 'components';
  }
}
