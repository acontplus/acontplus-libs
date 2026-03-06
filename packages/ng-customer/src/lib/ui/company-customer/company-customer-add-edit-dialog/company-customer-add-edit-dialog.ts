import { Component, inject, signal } from '@angular/core';
import { CompanyCustomerForm } from './../company-customer-form';
import { MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Button } from '@acontplus/ng-components';

@Component({
  selector: 'acp-company-customer-add-edit-dialog',
  imports: [CompanyCustomerForm, MatDialogContent, MatDialogActions, Button],
  templateUrl: './company-customer-add-edit-dialog.html',
})
export class CompanyCustomerAddEditDialog {
  formId = signal('companyCustomerFormId');
  private dgRef = inject(MatDialogRef<CompanyCustomerAddEditDialog>);
  onCustomerCreated(customer: any): void {
    console.log('Cliente creado:', customer);
    // Mostrar notificación de éxito
  }

  onCancel(): void {
    this.dgRef.close();
  }
}
