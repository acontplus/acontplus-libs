import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CompanyCustomerForm } from '@acontplus/ng-customer';
import { MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Button } from '@acontplus/ng-components';

@Component({
  selector: 'app-company-customer-create',
  imports: [CompanyCustomerForm, MatDialogContent, MatDialogActions, Button],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './company-customer-create.html',
})
export class CompanyCustomerCreate {
  formId = signal('companyCustomerFormId');
  private readonly dgRef = inject(MatDialogRef<CompanyCustomerCreate>);
  onCustomerCreated(customer: { test: string }): void {
    alert(customer);
  }

  onCancel(): void {
    this.dgRef.close();
  }
}
