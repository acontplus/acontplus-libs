import { AdvancedDialogService, Button, DataGrid, DataGridColumn } from '@acontplus/ng-components';
import { Component, inject, signal, OnInit } from '@angular/core';
import { CompanyCustomerCreate } from '../company-customer-create/company-customer-create';
import { COMPANY_CUSTOMER_SERVICE } from '@acontplus/ng-customer';

@Component({
  selector: 'app-company-customer-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DataGrid, Button],
})
export class App implements OnInit {
  dgSvc = inject(AdvancedDialogService);
  ccSvc = inject(COMPANY_CUSTOMER_SERVICE);

  list = [];
  add() {
    this.dgSvc.openInWrapper(
      {
        component: CompanyCustomerCreate,
        title: 'Nuevo Cliente',
        icon: 'add',
        showCloseButton: true,
        data: {},
      },
      {
        size: 'xxl',
      },
    );
  }

  columns: DataGridColumn[] = [
    { header: 'Client ID', field: 'clientId', type: 'number' },

    { header: 'Identification Number', field: 'identificationNumber' },

    { header: 'Identification Type', field: 'identificationType' },

    { header: 'Trade Name', field: 'tradeName', sortable: true },

    { header: 'Legal Name', field: 'legalName' },

    { header: 'Address', field: 'address' },

    { header: 'Phone', field: 'phone' },

    { header: 'Email', field: 'email' },

    {
      header: 'Final Consumer',
      field: 'finalConsumer',
      type: 'boolean',
    },

    {
      header: 'SRI Validation',
      field: 'sriValidation',
      type: 'boolean',
    },

    { header: 'Status', field: 'status', type: 'boolean' },
  ];

  totalRecords = signal(0);
  page = signal(0);
  pageSize = signal(25);

  trackByName(index: number) {
    return `${index}-`;
  }

  ngOnInit() {
    this.ccSvc.list({}).subscribe(response => {
      this.list = response.data;
      this.totalRecords.set(response.pagination.totalRecords);
    });
  }
}
