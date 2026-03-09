import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ApiResponse } from '@acontplus/core';
import { CustomerSri, CustomerSriRequest } from '../models/customer-sri.model';
import { CUSTOMER_API, EcuadorIdType } from '..';
import { EcuadorIdValidator } from './../../utils';

@Injectable({
  providedIn: 'root',
})
export class CustomerSriHttp {
  private http = inject(HttpClient);

  private get url(): string {
    return `${CUSTOMER_API.BILLING}/Consultas/`;
  }

  getByIdentification(request: CustomerSriRequest): Observable<ApiResponse<CustomerSri>> {
    const id = request.identificationNumber.trim();

    if (!EcuadorIdValidator.isValid(id)) {
      throw new Error('Número de identificación inválido');
    }

    const type = EcuadorIdValidator.getType(id);

    const endpoint = type === EcuadorIdType.RUC ? 'GetRucSRI' : 'GetCedulaSri';

    // Creamos HttpParams y agregamos sriOnly si viene
    let params = new HttpParams().set('Ruc', id);
    if (request.sriOnly !== undefined) {
      params = params.set('SriOnly', String(request.sriOnly));
    }

    return this.http.get<any>(`${this.url}${endpoint}`, { params }).pipe(
      map(response => {
        let idCard: string;
        let businessName: string;
        let address: string | undefined;
        let phone: string | undefined;
        let email: string | undefined;

        if (response.contribuyente) {
          // caso sriOnly = true
          idCard = response.contribuyente.numeroRuc;
          businessName = response.contribuyente.razonSocial;
          address = response.contribuyente.direccion;
          // si necesitas otros campos como phone/email, puede que no existan en SRI
          phone = undefined;
          email = undefined;
        } else {
          // caso normal
          idCard = response.numeroRuc ?? response.identificacion;
          businessName = response.razonSocial ?? response.nombreCompleto;
          address = response.direccion;
          phone = response.telefono;
          email = response.email;
        }

        const data: CustomerSri = {
          idCard,
          businessName,
          address,
          phone,
          email,
        };

        return {
          status: response.error ? 'warning' : 'success',
          code: response.error ? 'EXTERNAL_API_ERROR' : 'SUCCESS',
          data,
          message: response.error ?? 'External API call completed',
          timestamp: new Date().toISOString(),
        } as ApiResponse<CustomerSri>;
      }),
    );
  }
}
