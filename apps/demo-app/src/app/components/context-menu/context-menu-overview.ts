import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AcpContextMenu, AcpContextMenuDirective } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-context-menu-overview',
  imports: [
    AcpContextMenu,
    AcpContextMenuDirective,
    MatCardModule,
    DocHeading,
    CodeExample,
  ],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Context Menu</app-doc-heading>

      <p class="docs-component-description">
        A flexible context menu component that can be attached to any element. Supports nested menus,
        icons, badges, keyboard shortcuts, and custom actions. Can be used declaratively with the
        directive or programmatically with the service.
      </p>

      <h2>Basic Context Menu</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="basicMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Context Menu with Icons</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="iconMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Context Menu with Badges</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="badgeMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Context Menu with Shortcuts</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="shortcutMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Context Menu with Separators</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="separatorMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Context Menu with Nested Items</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="nestedMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Context Menu with Disabled Items</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="disabledMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Context Menu with Danger Items</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div
            class="context-menu-target"
            [acpContextMenu]="dangerMenuItems"
            (contextMenuItemSelected)="onItemSelected($event)"
          >
            Right-click me
          </div>
        </mat-card-content>
      </mat-card>

      <h2>Declarative Component Usage</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div #trigger class="context-menu-target">
            Right-click me
          </div>
          <acp-contextmenu
            #cm
            [model]="basicMenuItems"
            [target]="trigger"
            (itemSelected)="onItemSelected($event)"
          />
        </mat-card-content>
      </mat-card>

      @if (selectedItem) {
        <p class="selection-log">Selected: {{ selectedItem.label }}</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 32px;
        color: var(--mat-sys-on-surface-variant);
      }

      h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 32px 0 16px;
        color: var(--mat-sys-on-surface);
      }

      .docs-example-card {
        margin-bottom: 16px;
      }

      .context-menu-target {
        padding: 16px 24px;
        background-color: var(--mat-sys-surface-container);
        border-radius: 8px;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        color: var(--mat-sys-on-surface);
        border: 1px solid var(--mat-sys-outline);
        transition: background-color 0.2s ease;
      }

      .context-menu-target:hover {
        background-color: var(--mat-sys-surface-container-highest);
      }

      .selection-log {
        margin-top: 16px;
        padding: 12px 16px;
        background-color: var(--mat-sys-primary-container);
        color: var(--mat-sys-on-primary-container);
        border-radius: 8px;
        font-size: 14px;
      }
    `,
  ],
})
export class ContextMenuOverview {
  selectedItem: any = null;

  basicMenuItems = [
    {
      label: 'View Details',
      icon: 'visibility',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Edit',
      icon: 'edit',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Delete',
      icon: 'delete',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
  ];

  iconMenuItems = [
    {
      label: 'Add',
      icon: 'add',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Edit',
      icon: 'edit',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Delete',
      icon: 'delete',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Save',
      icon: 'save',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Download',
      icon: 'download',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
  ];

  badgeMenuItems = [
    {
      label: 'Notifications',
      icon: 'notifications',
      badge: 5,
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Messages',
      icon: 'message',
      badge: 12,
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Tasks',
      icon: 'task',
      badge: '3',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
  ];

  shortcutMenuItems = [
    {
      label: 'Copy',
      icon: 'content_copy',
      shortcut: 'Ctrl+C',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Paste',
      icon: 'content_paste',
      shortcut: 'Ctrl+V',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Cut',
      icon: 'content_cut',
      shortcut: 'Ctrl+X',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Select All',
      icon: 'select_all',
      shortcut: 'Ctrl+A',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
  ];

  separatorMenuItems = [
    {
      label: 'New',
      icon: 'add',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Open',
      icon: 'folder_open',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      separator: true,
    },
    {
      label: 'Save',
      icon: 'save',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Save As',
      icon: 'save_as',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      separator: true,
    },
    {
      label: 'Exit',
      icon: 'exit_to_app',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
  ];

  nestedMenuItems = [
    {
      label: 'File',
      icon: 'folder',
      children: [
        {
          label: 'New',
          icon: 'add',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
        {
          label: 'Open',
          icon: 'folder_open',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
        {
          label: 'Save',
          icon: 'save',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
      ],
    },
    {
      label: 'Edit',
      icon: 'edit',
      children: [
        {
          label: 'Undo',
          icon: 'undo',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
        {
          label: 'Redo',
          icon: 'redo',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
        {
          separator: true,
        },
        {
          label: 'Cut',
          icon: 'content_cut',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
        {
          label: 'Copy',
          icon: 'content_copy',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
        {
          label: 'Paste',
          icon: 'content_paste',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
      ],
    },
    {
      label: 'View',
      icon: 'visibility',
      children: [
        {
          label: 'Zoom In',
          icon: 'zoom_in',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
        {
          label: 'Zoom Out',
          icon: 'zoom_out',
          command: (ctx: any) => this.onItemSelected(ctx),
        },
      ],
    },
  ];

  disabledMenuItems = [
    {
      label: 'Enabled Item',
      icon: 'check',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Disabled Item',
      icon: 'block',
      disabled: true,
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Another Enabled',
      icon: 'check_circle',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
  ];

  dangerMenuItems = [
    {
      label: 'Archive',
      icon: 'archive',
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Delete',
      icon: 'delete',
      danger: true,
      command: (ctx: any) => this.onItemSelected(ctx),
    },
    {
      label: 'Remove',
      icon: 'remove_circle',
      danger: true,
      command: (ctx: any) => this.onItemSelected(ctx),
    },
  ];

  onItemSelected(context: any) {
    this.selectedItem = context.item;
    console.log('Selected item:', context.item);
  }
}
