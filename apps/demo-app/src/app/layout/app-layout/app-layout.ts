import { Component, HostBinding, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ComponentPageTitleService } from '../../shared/services/page-title';

@Component({
  selector: 'app-homepage',
  templateUrl: './app-layout.html',
  styleUrls: ['./app-layout.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButtonModule, RouterLink],
})
export class AppLayout implements OnInit {
  private _componentPageTitle = inject(ComponentPageTitleService);

  @HostBinding('class.main-content') readonly mainContentClass = true;

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }
}
