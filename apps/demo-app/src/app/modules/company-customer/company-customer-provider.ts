import { Provider } from '@angular/core';
import {
  // COMPANY_CUSTOMER_FORM_CONFIG,
  // COMPANY_CUSTOMER_MAPPER,
  // POS_COMPANY_CUSTOMER_CONFIG,
  COMPANY_CUSTOMER_HTTP_TOKEN,
  CompanyCustomerHttp,
} from '@acontplus/ng-customer';
// import { PosCompanyCustomerService } from './pos-company-customer-service';
// import { CompanyCustomerCustomMapper } from './company-customer-custom-mapper';

export const companyCustomerProvider: Provider[] = [
  // {
  //   provide: COMPANY_CUSTOMER_FORM_CONFIG,
  //   useValue: POS_COMPANY_CUSTOMER_CONFIG,
  // },
  {
    provide: COMPANY_CUSTOMER_HTTP_TOKEN,
    useClass: CompanyCustomerHttp,
  },
  //mappers custom
  // { provide: COMPANY_CUSTOMER_MAPPER, useClass: CompanyCustomerCustomMapper }
];
