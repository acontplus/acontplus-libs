import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ICompanyCustomerService } from '../interfaces/company-customer';
import { COMPANY_CUSTOMER_MAPPER } from '../../../tokens';
import { CompanyCustomerDefaultMapper } from '../mappers/company-customer-default-mapper';

@Injectable({
  providedIn: 'root',
})
export class CompanyCustomerService implements ICompanyCustomerService {
  private apiUrl = '/FactElect/CompanyCustomer/';
  private http = inject(HttpClient);
  private mapper =
    inject(COMPANY_CUSTOMER_MAPPER, { optional: true }) ?? new CompanyCustomerDefaultMapper();

  list(params: any): Observable<any> {
    console.log(params);
    const json = JSON.stringify({
      pageIndex: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
      tipo: 1,
    });
    return this.http
      .get<any>(`${this.apiUrl}?json=${json}`)
      .pipe(map(dtos => this.mapper.toModelList(dtos)));
  }

  list(params: any): Observable<any> {
    console.log(params, 'params test customer service');
    return of([
      {
        name: '<NAME>',
        weight: 70,
        gender: 'male',
        mobile: '0123456789',
        city: 'Madrid',
        date: '2020-01-01',
      },
      {
        name: '<NAME>',
        weight: 65,
        gender: 'female',
        mobile: '0987654321',
        city: 'Barcelona',
        date: '2020-02-02',
      },
      {
        name: '<NAME>',
        weight: 80,
        gender: 'male',
        mobile: '0123456789',
        city: 'Madrid',
        date: '2020-03-03',
      },
      {
        name: '<NAME>',
        weight: 75,
        gender: 'female',
        mobile: '0987654321',
        city: 'Barcelona',
        date: '2020-04-04',
      },
    ]);
  }

  create(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  update(id: string, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  search(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${term}`);
  }

  // Validación completa para app principal
  validate(customer: any): Record<string, any> | null {
    const errors: Record<string, any> = {};

    if (!customer.email || !this.isValidEmail(customer.email)) {
      errors['email'] = 'Email inválido';
    }

    if (customer.phone && !this.isValidPhone(customer.phone)) {
      errors['phone'] = 'Teléfono inválido';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    return /^\d{10}$/.test(phone.replace(/\D/g, ''));
  }
}
