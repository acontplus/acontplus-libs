import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompanyCustomerService } from '../interfaces/company-customer';

@Injectable({
  providedIn: 'root',
})
export class CompanyCustomerService implements ICompanyCustomerService {
  private apiUrl = '/api/customers';
  private http = inject(HttpClient);

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
