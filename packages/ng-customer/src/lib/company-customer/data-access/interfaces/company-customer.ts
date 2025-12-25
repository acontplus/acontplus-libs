import { Observable } from 'rxjs';

export interface ICompanyCustomerService {
  list(params: any): Observable<any>;
  create(customer: any): Observable<any>;
  update(id: string, customer: any): Observable<any>;
  getById(id: string): Observable<any>;
  search(term: string): Observable<any[]>;
  validate?(customer: any): Record<string, any> | null;
}
