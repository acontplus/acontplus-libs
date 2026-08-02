import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Workspace item interface
 */
export interface AcpWorkspaceItem {
  id: string;
  name: string;
  icon?: string;
  active?: boolean;
}

/**
 * AcpHeaderWorkspace Component
 *
 * Workspace selector for the header.
 *
 * @example
 * ```html
 * <acp-header-workspace
 *   [workspaces]="workspaces"
 *   [currentWorkspace]="currentWorkspace"
 *   (workspaceChange)="onWorkspaceChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'acp-header-workspace',
  template: `
    <button
      mat-button
      [matMenuTriggerFor]="menu"
      class="acp-header__workspace-button"
    >
      @if (currentWorkspace()?.icon) {
        <mat-icon>{{ currentWorkspace()!.icon }}</mat-icon>
      }
      <span>{{ currentWorkspace()?.name || 'Select Workspace' }}</span>
      <mat-icon>expand_more</mat-icon>
    </button>

    <mat-menu #menu="matMenu" class="acp-header__workspace-menu">
      @for (workspace of workspaces(); track workspace.id) {
        <button
          mat-menu-item
          [class.acp-header__workspace-item--active]="workspace.active"
          (click)="handleWorkspaceChange(workspace)"
        >
          @if (workspace.icon) {
            <mat-icon>{{ workspace.icon }}</mat-icon>
          }
          <span>{{ workspace.name }}</span>
          @if (workspace.active) {
            <mat-icon class="acp-header__workspace-check">check</mat-icon>
          }
        </button>
      }
    </mat-menu>
  `,
  host: { class: 'acp-header-workspace' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class AcpHeaderWorkspace {
  /**
   * Array of available workspaces.
   */
  readonly workspaces = input<AcpWorkspaceItem[]>([]);

  /**
   * Currently selected workspace.
   */
  readonly currentWorkspace = input<AcpWorkspaceItem>();

  /**
   * Event emitted when workspace is changed.
   */
  readonly workspaceChange = output<AcpWorkspaceItem>();

  handleWorkspaceChange(workspace: AcpWorkspaceItem) {
    this.workspaceChange.emit(workspace);
  }
}
