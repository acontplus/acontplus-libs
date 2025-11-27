import { AdvancedDialogService, Button, DataGrid, DataGridColumn } from '@acontplus/ng-components';
import { Component, inject } from '@angular/core';
import { CompanyCustomerCreate } from '../company-customer-create/company-customer-create';

@Component({
  selector: 'app-company-customer-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DataGrid, Button],
})
export class App {
  dgSvc = inject(AdvancedDialogService);

  add() {
    this.dgSvc.open(CompanyCustomerCreate, {
      size: 'lg',
    });
  }

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

  trackByName(index: number, item: any) {
    return item.name;
  }
}
