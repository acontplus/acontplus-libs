import { Component, inject } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { companyCustomerBasicExampleConfig } from './example';
import { AsyncPipe } from '@angular/common';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';

@Component({
  selector: 'app-company-customer',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
  templateUrl: './company-customer.html',
})
export class CompanyCustomer {
  route = inject(ActivatedRoute);

  examples: any[] = [];
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: CompanyCustomer,
    pathMatch: 'full',
    data: {
      examples: [companyCustomerBasicExampleConfig],
    },
  },

  { path: '**', redirectTo: 'overview' },
];
