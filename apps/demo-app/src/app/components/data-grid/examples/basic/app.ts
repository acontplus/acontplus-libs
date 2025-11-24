import { DataGrid, DataGridColumn } from '@acontplus/ng-components';
import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';

@Component({
  selector: 'app-data-grid-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DataGrid],
})
export class App {
  columns: DataGridColumn[] = [
    { header: 'Name', field: 'name' },
    {
      header: 'Weight',
      field: 'weight',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.2-2',
      },
    },
    { header: 'Gender', field: 'gender' },
    { header: 'Mobile', field: 'mobile' },
    { header: 'City', field: 'city' },
    {
      header: 'Date',
      field: 'date',
      type: 'date',
      typeParameter: {
        format: 'yyyy-MM-dd',
      },
    },
  ];

  list = EXAMPLE_DATA;

  trackByName(index: number, item: any) {
    return item.name;
  }
}
