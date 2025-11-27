import { Component, inject } from '@angular/core';
import { CompanyCustomerFormComponent } from '@acontplus/ng-customer';
import { MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Button } from '@acontplus/ng-components';

@Component({
  selector: 'app-company-customer-create',
  imports: [CompanyCustomerFormComponent, MatDialogContent, MatDialogActions, Button],
  templateUrl: './company-customer-create.html',
})
export class CompanyCustomerCreate {
  private dgRef = inject(MatDialogRef<CompanyCustomerCreate>);
  onCustomerCreated(customer: any): void {
    console.log('Cliente creado:', customer);
    // Mostrar notificación de éxito
  }

  onCancel(): void {
    console.log('Cancelar');
  }
}
