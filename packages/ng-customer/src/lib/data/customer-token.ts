import { InjectionToken } from '@angular/core';
import {
  ICompanyCustomerService,
  ICustomerSriService,
  ICompanyCustomerMapper,
  CompanyCustomerFormConfig,
} from './index';

export const CUSTOMER_SRI_HTTP_TOKEN = new InjectionToken<ICustomerSriService>(
  'CUSTOMER_SRI_HTTP_TOKEN',
);

export const COMPANY_CUSTOMER_MAPPER = new InjectionToken<ICompanyCustomerMapper>(
  'COMPANY_CUSTOMER_MAPPER',
);

export const COMPANY_CUSTOMER_FORM_CONFIG = new InjectionToken<CompanyCustomerFormConfig>(
  'COMPANY_CUSTOMER_FORM_CONFIG',
);

export const COMPANY_CUSTOMER_HTTP_TOKEN = new InjectionToken<ICompanyCustomerService>(
  'COMPANY_CUSTOMER_HTTP_TOKEN',
);
