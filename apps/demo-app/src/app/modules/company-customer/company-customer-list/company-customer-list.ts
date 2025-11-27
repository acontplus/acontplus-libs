import { Component } from '@angular/core';
import { CompanyCustomerFormComponent } from '@acontplus/ng-customer';

@Component({
  selector: 'app-company-customer-create',
  imports: [CompanyCustomerFormComponent],
  templateUrl: './company-customer-list.html',
})
export class CompanyCustomerList {
  onCustomerCreated(customer: any): void {
    console.log('Cliente creado:', customer);
    // Mostrar notificación de éxito
  }

  onCancel(): void {
    console.log('Cancelar');
  }
}
