import { InjectionToken } from '@angular/core';
import { CompanyCustomerFormConfig } from '../company-customer/models/form-config.model';
import { ICompanyCustomerService } from '../company-customer';
import { ICompanyCustomerMapper } from '../company-customer/data-access/interfaces/company-customer-mapper';
import { ICustomerSriService } from '../customer-sri/data-access/interfaces/customer-sri.interface';

export const CUSTOMER_SRI_SERVICE = new InjectionToken<ICustomerSriService>('CUSTOMER_SRI_SERVICE');

export const COMPANY_CUSTOMER_MAPPER = new InjectionToken<ICompanyCustomerMapper>(
  'COMPANY_CUSTOMER_MAPPER',
);

export const COMPANY_CUSTOMER_FORM_CONFIG = new InjectionToken<CompanyCustomerFormConfig>(
  'COMPANY_CUSTOMER_FORM_CONFIG',
);

export const COMPANY_CUSTOMER_SERVICE = new InjectionToken<ICompanyCustomerService>(
  'COMPANY_CUSTOMER_SERVICE',
);
