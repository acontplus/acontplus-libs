import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompanyCustomerService } from '@acontplus/ng-customer';

@Injectable()
export class PosCustomerService implements ICompanyCustomerService {
  private apiUrl = '/api/pos/customers'; // Endpoint diferente para POS

  private http = inject(HttpClient);
  create(customer: any): Observable<any> {
    console.log(customer, 'customer test customer service');
    // En POS, crear cliente simplificado
    return this.http.post<any>(this.apiUrl, customer);
  }

  update(id: string, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  search(term: string): Observable<any[]> {
    // Búsqueda rápida solo por cédula o nombre
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${term}`);
  }

  // Validación MÍNIMA para POS
  validate(customer: any): { [key: string]: any } | null {
    const errors: { [key: string]: any } = {};

    // Solo validar que tenga cédula y nombre
    if (!customer.idCard || customer.idCard.length < 10) {
      errors['idCard'] = 'Cédula inválida';
    }

    if (!customer.name || customer.name.trim().length < 2) {
      errors['name'] = 'Nombre debe tener al menos 2 caracteres';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}
