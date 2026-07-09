import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { PageHeader } from '@shared';
import { TablesService } from '../tables.service';
import { DataGrid, DataGridColumn } from '@acontplus/ng-components';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.html',
  imports: [FormsModule, MatButtonModule, MatCheckboxModule, MatRadioModule, DataGrid, PageHeader],
})
export class TablesKitchenSink implements OnInit {
  private readonly tablesSrv = inject(TablesService);

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
      minWidth: 140,
      width: '140px',
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
      ],
    },
  ];
  list: any[] = [];
  isLoading = true;

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

  ngOnInit() {
    this.list = this.tablesSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    alert(value);
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
}
