import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentPageTitleService } from '../../shared/services/page-title';

@Component({
  selector: 'app-component-page-header',
  template: `<header class="docs-component-page-header">
    <button mat-button (click)="toggleSidenav.emit()">
      <mat-icon>menu</mat-icon>
      Menu
    </button>
  </header>`,
  styles: `
    .docs-component-page-header {
      display: none;
      justify-content: center;
      align-items: center;
      min-height: 60px;
      background: var(--mat-sys-primary-container);
    }
  `,
  imports: [MatButtonModule, MatIconModule],
})
export class ComponentPageHeader {
  private _componentPageTitle = inject(ComponentPageTitleService);

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}
