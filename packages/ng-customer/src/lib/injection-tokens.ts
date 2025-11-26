import { InjectionToken } from '@angular/core';
import { CustomerFormConfig } from './domain/models/form-config.model';

export const CUSTOMER_FORM_CONFIG = new InjectionToken<CustomerFormConfig>('CUSTOMER_FORM_CONFIG');

export const CUSTOMER_SERVICE = new InjectionToken<any>('CUSTOMER_SERVICE');
