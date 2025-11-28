import { InjectionToken } from '@angular/core';
import { CompanyCustomerFormConfig } from '../shared/models/form-config.model';
import { ICompanyCustomerService } from '../company-customer';

export const COMPANY_CUSTOMER_FORM_CONFIG = new InjectionToken<CompanyCustomerFormConfig>(
  'COMPANY_CUSTOMER_FORM_CONFIG',
);

export const COMPANY_CUSTOMER_SERVICE = new InjectionToken<ICompanyCustomerService>(
  'COMPANY_CUSTOMER_SERVICE',
);
