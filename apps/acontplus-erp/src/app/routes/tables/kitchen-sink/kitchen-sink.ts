import { Component, OnInit, inject, viewChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';

import { PageHeader } from '@shared';
import { TablesService } from '../tables.service';
import {
  DataGrid,
  DataGridColumn,
  AcpContextMenuItem,
  AcpContextMenu,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.html',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    DataGrid,
    PageHeader,
    AcpContextMenu,
  ],
})
export class TablesKitchenSink implements OnInit {
  private readonly tablesSrv = inject(TablesService);
  readonly sidebarTemplate = viewChild.required<TemplateRef<any>>('sidebarTemplate');
  readonly editSidenav = viewChild.required<MatSidenav>('editSidenav');
  readonly contextMenu = viewChild.required<AcpContextMenu>('cm');

  editingItem: any = null;

  columns: DataGridColumn[] = [
    {
      header: 'Position',
      field: 'position',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Name',
      field: 'name',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Weight',
      field: 'weight',
      minWidth: 100,
    },
    {
      header: 'Symbol',
      field: 'symbol',
      minWidth: 100,
    },
    {
      header: 'Gender',
      field: 'gender',
      minWidth: 100,
    },
    {
      header: 'Mobile',
      field: 'mobile',
      hide: true,
      minWidth: 120,
    },
    {
      header: 'Tele',
      field: 'tele',
      minWidth: 120,
      width: '120px',
    },
    {
      header: 'Birthday',
      field: 'birthday',
      minWidth: 180,
    },
    {
      header: 'City',
      field: 'city',
      minWidth: 120,
    },
    {
      header: 'Address',
      field: 'address',
      minWidth: 180,
      width: '200px',
    },
    {
      header: 'Company',
      field: 'company',
      minWidth: 120,
    },
    {
      header: 'Website',
      field: 'website',
      minWidth: 180,
    },
    {
      header: 'Email',
      field: 'email',
      minWidth: 180,
    },
    {
      header: 'Operation',
      field: 'operation',
      minWidth: 180,
      width: '180px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'Edit',
          click: (record) => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: 'Delete',
          pop: {
            title: 'Confirm Delete',
            closeText: 'Close',
            okText: 'OK',
          },
          click: (record) => this.delete(record),
        },
        {
          type: 'icon',
          icon: 'more_vert',
          tooltip: 'More Options',
          click: (record, event) => this.openContextMenu(record, event),
        },
      ],
    },
  ];
  list: any[] = [];
  isLoading = true;

  // Context Menu Items - Comprehensive Examples
  contextMenuItems: AcpContextMenuItem[] = [
    // View & Edit Section
    {
      label: 'View Details',
      icon: 'visibility',
      command: (ctx) => this.viewRow(ctx.data),
      tooltip: 'View full details of this row',
    },
    {
      label: 'Edit',
      icon: 'edit',
      command: (ctx) => this.edit(ctx.data),
      shortcut: 'Ctrl+E',
    },
    {
      label: 'Quick Edit',
      icon: 'edit_note',
      command: (ctx) => this.quickEdit(ctx.data),
      badge: 'New',
    },
    { separator: true },

    // Copy & Duplicate Section
    {
      label: 'Duplicate',
      icon: 'file_copy',
      command: (ctx) => this.duplicateRow(ctx.data),
      shortcut: 'Ctrl+D',
    },
    {
      label: 'Copy to Clipboard',
      icon: 'content_copy',
      command: (ctx) => this.copyToClipboard(ctx.data),
      shortcut: 'Ctrl+C',
    },
    { separator: true },

    // Export Section
    {
      label: 'Export',
      icon: 'download',
      children: [
        {
          label: 'Export as PDF',
          icon: 'picture_as_pdf',
          command: (ctx) => this.exportPDF(ctx.data),
        },
        {
          label: 'Export as Excel',
          icon: 'table_chart',
          command: (ctx) => this.exportExcel(ctx.data),
        },
        {
          label: 'Export as CSV',
          icon: 'description',
          command: (ctx) => this.exportCSV(ctx.data),
        },
      ],
    },

    // Share Section
    {
      label: 'Share',
      icon: 'share',
      children: [
        {
          label: 'Share via Email',
          icon: 'email',
          command: (ctx) => this.shareEmail(ctx.data),
        },
        {
          label: 'Share via Link',
          icon: 'link',
          command: (ctx) => this.shareLink(ctx.data),
          badge: 'Pro',
        },
        {
          label: 'Share to Team',
          icon: 'group',
          command: (ctx) => this.shareTeam(ctx.data),
        },
      ],
    },
    { separator: true },

    // Archive & Status Section
    {
      label: 'Archive',
      icon: 'archive',
      command: (ctx) => this.archiveRow(ctx.data),
    },
    {
      label: 'Mark as Complete',
      icon: 'check_circle',
      command: (ctx) => this.markComplete(ctx.data),
    },
    {
      label: 'Change Status',
      icon: 'assignment',
      children: [
        {
          label: 'Active',
          icon: 'check',
          command: (ctx) => this.changeStatus(ctx.data, 'active'),
        },
        {
          label: 'Inactive',
          icon: 'close',
          command: (ctx) => this.changeStatus(ctx.data, 'inactive'),
        },
        {
          label: 'Pending',
          icon: 'schedule',
          command: (ctx) => this.changeStatus(ctx.data, 'pending'),
        },
      ],
    },
    { separator: true },

    // Dangerous Actions Section
    {
      label: 'Delete',
      icon: 'delete',
      danger: true,
      command: (ctx) => this.deleteRow(ctx.data),
      shortcut: 'Delete',
    },
    {
      label: 'Permanently Delete',
      icon: 'delete_forever',
      danger: true,
      disabled: true,
      command: (ctx) => this.permanentlyDelete(ctx.data),
      tooltip: 'This action cannot be undone',
    },
  ];

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  showSidebar = false;

  ngOnInit() {
    this.list = this.tablesSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    this.editingItem = { ...value };
    this.editSidenav().open();
  }

  saveEdit() {
    const index = this.list.findIndex((item) => item.position === this.editingItem.position);
    if (index !== -1) {
      this.list[index] = { ...this.editingItem };
    }
    this.editingItem = null;
    this.editSidenav().close();
  }

  cancelEdit() {
    this.editingItem = null;
    this.editSidenav().close();
  }

  delete(value: any) {
    alert(value);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map((item) => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }

  // Context Menu Actions
  viewRow(row: any) {
    if (!row) {
      console.warn('Cannot view row: invalid row data');
      return;
    }
    console.log('Viewing row:', row);
    alert(`Viewing: ${row.name} (Position: ${row.position})`);
  }

  quickEdit(row: any) {
    if (!row) {
      console.warn('Cannot quick edit: invalid row data');
      return;
    }
    console.log('Quick editing row:', row);
    alert(`Quick editing: ${row.name}`);
  }

  duplicateRow(row: any) {
    console.log(row);
    if (!row || !row.position) {
      console.warn('Cannot duplicate row: invalid row data');
      return;
    }
    const newRow = { ...row, position: this.list.length + 1 };
    this.list = [...this.list, newRow];
    console.log('Row duplicated:', newRow);
  }

  copyToClipboard(row: any) {
    if (!row) {
      console.warn('Cannot copy: invalid row data');
      return;
    }
    const text = JSON.stringify(row);
    navigator.clipboard.writeText(text);
    console.log('Row copied to clipboard:', row);
    alert('Row data copied to clipboard');
  }

  exportPDF(row: any) {
    if (!row) {
      console.warn('Cannot export: invalid row data');
      return;
    }
    console.log('Exporting to PDF:', row);
    alert(`Exporting ${row.name} as PDF`);
  }

  exportExcel(row: any) {
    if (!row) {
      console.warn('Cannot export: invalid row data');
      return;
    }
    console.log('Exporting to Excel:', row);
    alert(`Exporting ${row.name} as Excel`);
  }

  exportCSV(row: any) {
    if (!row) {
      console.warn('Cannot export: invalid row data');
      return;
    }
    console.log('Exporting to CSV:', row);
    alert(`Exporting ${row.name} as CSV`);
  }

  shareEmail(row: any) {
    if (!row) {
      console.warn('Cannot share: invalid row data');
      return;
    }
    console.log('Sharing via email:', row);
    alert(`Sharing ${row.name} via email`);
  }

  shareLink(row: any) {
    if (!row) {
      console.warn('Cannot share: invalid row data');
      return;
    }
    console.log('Sharing via link:', row);
    alert(`Sharing ${row.name} via link`);
  }

  shareTeam(row: any) {
    if (!row) {
      console.warn('Cannot share: invalid row data');
      return;
    }
    console.log('Sharing to team:', row);
    alert(`Sharing ${row.name} with team`);
  }

  archiveRow(row: any) {
    if (!row) {
      console.warn('Cannot archive: invalid row data');
      return;
    }
    console.log('Archiving row:', row);
    alert(`Archived: ${row.name}`);
  }

  markComplete(row: any) {
    if (!row) {
      console.warn('Cannot mark complete: invalid row data');
      return;
    }
    console.log('Marking as complete:', row);
    alert(`Marked as complete: ${row.name}`);
  }

  changeStatus(row: any, status: string) {
    if (!row) {
      console.warn('Cannot change status: invalid row data');
      return;
    }
    console.log(`Changing status to ${status}:`, row);
    alert(`Status changed to ${status} for ${row.name}`);
  }

  deleteRow(row: any) {
    if (!row || !row.position) {
      console.warn('Cannot delete row: invalid row data', row);
      return;
    }
    this.list = this.list.filter((item) => item.position !== row.position);
    console.log('Row deleted:', row);
  }

  permanentlyDelete(row: any) {
    if (!row) {
      console.warn('Cannot permanently delete: invalid row data');
      return;
    }
    console.log('Permanently deleting row:', row);
    alert(`Permanently deleted: ${row.name}`);
  }

  onRowContextMenu(event: any) {
    console.log(event);
    const { event: mouseEvent, rowData, index } = event;

    if (mouseEvent) {
      mouseEvent.preventDefault();
      mouseEvent.stopPropagation();
    }

    console.log('Row context menu triggered:', { rowData, index });

    // Show context menu using declarative component
    this.contextMenu().show(mouseEvent || { clientX: 0, clientY: 0 }, rowData);
  }

  onHide() {
    console.log('Context menu hidden');
  }

  openContextMenu(row: any, event: any) {
    if (!row) {
      console.warn('Cannot open context menu: invalid row data');
      return;
    }
    // Show context menu using declarative component
    this.contextMenu().show(event, row);

    console.log('Context menu opened from button:', row);
  }
}
