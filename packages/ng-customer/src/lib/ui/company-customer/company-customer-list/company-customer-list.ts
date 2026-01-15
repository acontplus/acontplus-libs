import { Component, inject, input, signal, OnInit } from '@angular/core';
import { DataGridColumn, DataGrid, Button } from '@acontplus/ng-components';
import { isValidField } from '@acontplus/utils';
import { CompanyCustomerAddEditDirective } from './../../directives';
import { COMPANY_CUSTOMER_HTTP_TOKEN, CompanyCustomerListDto } from './../../../data';
import { PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'acp-company-customer-list',
  templateUrl: './company-customer-list.html',
  imports: [
    DataGrid,
    MatFormFieldModule,
    MatInputModule,
    Button,
    FormsModule,
    MatIcon,
    MatMenuModule,
    CompanyCustomerAddEditDirective,
  ],
})
export class CompanyCustomerList implements OnInit {
  http = inject(COMPANY_CUSTOMER_HTTP_TOKEN);

  canEdit = input(true);
  canAdd = input(true);
  canInactive = input(true);
  canGenerateReport = input(true);

  dataSearch = {
    textSearch: null as string | null,
  };
  dataSource = signal<CompanyCustomerListDto[]>([]);
  columnsDefs: DataGridColumn[] = [
    { field: 'index', header: '#' },
    { field: 'op', header: 'Op.' },
    { field: 'identificationType', header: 'Tipo' },
    { field: 'idCard', header: 'Nro. Identificación' },
    { field: 'tradeName', header: 'Razón Social' },
    { field: 'legalName', header: 'Nombre Comercial' },
    { field: 'address', header: 'Dirección' },
    { field: 'email', header: 'Correo' },
    { field: 'phone', header: 'Teléfono' },
    {
      field: 'sriValidation',
      header: 'Validación Sri',
      type: 'tag',
      tag: {
        true: { text: 'Si', color: 'text-danger' },
        false: { text: 'No', color: 'text-success' },
      },
    },
    {
      field: 'status',
      header: 'Estado',
      type: 'tag',
      tag: {
        true: { text: 'Activo', color: 'text-primary' },
        false: { text: 'Inactivo', color: 'text-success' },
      },
    },
  ];

  pageIndex = signal(0);
  pageSize = signal(10);
  pageCount = signal(0);

  refresh() {
    this.list();
  }

  private list() {
    const params = {
      pageIndex: this.pageIndex() + 1,
      pageSize: this.pageSize(),
      checkTextSearch: !!isValidField(this.dataSearch.textSearch),
      textSearch: isValidField(this.dataSearch.textSearch),
    };

    this.http.list(params).subscribe(response => {
      console.log(response);
      this.dataSource.set(response.data);
      this.pageCount.set(response.pagination.totalRecords);
    });
  }

  ngOnInit() {
    this.refresh();
  }

  handlePageEvent($event: PageEvent) {
    this.pageIndex.set($event.pageIndex);
    this.pageSize.set($event.pageSize);
    this.pageCount.set($event.length);
    this.refresh();
  }

  exportExcel() {
    /* empty */
  }

  exportPdf() {
    /* empty */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  askToDelete(data: CompanyCustomerListDto) {
    /* empty */
  }
}
