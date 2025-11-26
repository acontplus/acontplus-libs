import { Observable } from 'rxjs';

export interface ICustomerService {
  create(customer: any): Observable<any>;
  update(id: string, customer: any): Observable<any>;
  getById(id: string): Observable<any>;
  search(term: string): Observable<any[]>;
  validate?(customer: any): Record<string, any> | null;
}
