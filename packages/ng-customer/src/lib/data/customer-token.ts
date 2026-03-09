import { InjectionToken } from '@angular/core';
import { ICompanyCustomerHttp, ICompanyCustomerMapper, CompanyCustomerFormConfig } from './index';

export const COMPANY_CUSTOMER_MAPPER = new InjectionToken<ICompanyCustomerMapper>(
  'COMPANY_CUSTOMER_MAPPER',
);

export const COMPANY_CUSTOMER_FORM_CONFIG = new InjectionToken<CompanyCustomerFormConfig>(
  'COMPANY_CUSTOMER_FORM_CONFIG',
);

export const COMPANY_CUSTOMER_HTTP_TOKEN = new InjectionToken<ICompanyCustomerHttp>(
  'COMPANY_CUSTOMER_HTTP_TOKEN',
);
