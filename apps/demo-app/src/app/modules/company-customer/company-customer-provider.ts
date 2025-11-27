import { Provider } from '@angular/core';
import {
  COMPANY_CUSTOMER_FORM_CONFIG,
  COMPANY_CUSTOMER_SERVICE,
  POS_COMPANY_CUSTOMER_CONFIG,
} from '@acontplus/ng-customer';
import { PosCustomerService } from './pos-company-customer';

export const companyCustomerProvider: Provider[] = [
  {
    provide: COMPANY_CUSTOMER_FORM_CONFIG,
    useValue: POS_COMPANY_CUSTOMER_CONFIG,
  },
  {
    provide: COMPANY_CUSTOMER_SERVICE,
    useClass: PosCustomerService, // Usa implementación específica de POS
  },
];
