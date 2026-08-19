import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'acp-sidebar-toggle',
  template: `
    @if (showToggle()) {
      <mat-slide-toggle hideIcon [checked]="toggleChecked()" (change)="toggleCollapsed.emit()" />
    } @else {
      <button mat-icon-button (click)="closeSidenav.emit()">
        <mat-icon>close</mat-icon>
      </button>
    }
  `,
  styles: ``,
  imports: [MatSlideToggleModule, MatIconModule, MatButtonModule, MatToolbarModule],
})
export class AcpSidebarToggle {
  readonly showToggle = input(true);
  readonly toggleChecked = input(false);

  readonly toggleCollapsed = output<void>();
  readonly closeSidenav = output<void>();
}
