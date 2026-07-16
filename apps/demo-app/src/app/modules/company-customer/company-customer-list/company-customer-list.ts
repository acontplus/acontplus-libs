import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CompanyCustomerForm } from '@acontplus/ng-customer';

@Component({
  selector: 'app-company-customer-create',
  imports: [CompanyCustomerForm],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './company-customer-list.html',
})
export class CompanyCustomerList {
  onCustomerCreated(customer: { test: string }): void {
    // Mostrar notificación de éxito
    alert(customer);
  }

  onCancel(): void {
    alert('Cancelar');
  }
}
