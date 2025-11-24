import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NavigationFocus } from '../../shared/directives/navigation-focus';
import { ComponentPageTitleService } from '../../shared/services/page-title';

@Component({
  selector: 'app-homepage',
  templateUrl: './app-layout.html',
  styleUrls: ['./app-layout.scss'],
  imports: [NavigationFocus, MatButtonModule, RouterLink],
})
export class AppLayout implements OnInit {
  private _componentPageTitle = inject(ComponentPageTitleService);

  @HostBinding('class.main-content') readonly mainContentClass = true;

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }
}
