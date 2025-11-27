import { InjectionToken } from '@angular/core';
import { CompanyCustomerFormConfig } from '../shared/form-config.model';

export const COMPANY_CUSTOMER_FORM_CONFIG = new InjectionToken<CompanyCustomerFormConfig>(
  'COMPANY_CUSTOMER_FORM_CONFIG',
);

export const COMPANY_CUSTOMER_SERVICE = new InjectionToken<any>('COMPANY_CUSTOMER_SERVICE');
