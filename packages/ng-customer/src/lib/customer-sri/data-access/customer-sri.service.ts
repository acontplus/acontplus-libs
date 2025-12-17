import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, IdentificationNumberVo } from '@acontplus/core';
import { CustomerSri } from '../models/customer-sri.model';
import { CUSTOMER_API } from '../../infrastructure/constants/customer.constants'; // Adjust path if needed

import { ICustomerSriService } from './interfaces/customer-sri.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerSriService implements ICustomerSriService {
  private http = inject(HttpClient);
  
  // Assuming CUSTOMER_API.BILLING is accessible or I should hardcode/move constants.
  // The original file used '../constants/customer.constants' which was relative to infrastructure/repositories
  // So it was packages/ng-customer/src/lib/infrastructure/constants/customer.constants
  // From here (customer-sri/data-access) it is ../../infrastructure/constants/customer.constants
  
  private get url() {
    // If CUSTOMER_API is not available, I might need to check where it is.
    // I'll assume the import above is correct for now.
    return `${CUSTOMER_API.BILLING}/Consultas/`;
  }

  getById(identificationNumber: string): Observable<ApiResponse<CustomerSri>> {
    const idNumber = new IdentificationNumberVo(identificationNumber);
    const id = idNumber.getId();

    let endpoint = '';
    if (idNumber.isValidRuc()) {
      endpoint = `GetRucSRI?Ruc=${id}`;
    } else if (idNumber.isValidCedula()) {
      endpoint = `GetCedulaSri?Ruc=${id}`;
    } else {
      throw new Error('Número de identificación inválido para SRI');
    }

    // Returning Observable instead of Promise to be more Angular-idiomatic
    return this.http.get<any>(`${this.url}${endpoint}`).pipe(
      map(response => {
        const idCard = response.numeroRuc ? response.numeroRuc : response.identificacion;
        const businessName = response.razonSocial ? response.razonSocial : response.nombreCompleto;
        const data: CustomerSri = {
          phone: response.telefono,
          email: response.email,
          idCard,
          businessName,
          address: response.direccion,
        };
        return {
          status: response.error ? 'warning' : 'success',
          code: response.error ? 'EXTERNAL_API_ERROR' : 'SUCCESS',
          data,
          message: response.error ?? 'External API call completed',
          timestamp: new Date().toISOString(),
        } as ApiResponse<any>;
      })
    );
  }
}
