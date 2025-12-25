import { Observable } from 'rxjs';
import { ApiResponse } from '@acontplus/core';
import { CustomerSri } from '../../models/customer-sri.model';

export interface ICustomerSriService {
  getById(identificationNumber: string): Observable<ApiResponse<CustomerSri>>;
}
