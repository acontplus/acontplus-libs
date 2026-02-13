import { Observable } from 'rxjs';
import { CompanyCustomerFormDataResult } from '../models';

export interface ICompanyCustomerHttp {
  getFormData(): Observable<any>;
  list(params: any): Observable<{ data: any[]; pagination: { totalRecords: number } }>;
  create(customer: any): Observable<any>;
  update(id: string, customer: any): Observable<any>;
  getById(id: string): Observable<any>;
  search(term: string): Observable<any[]>;
  validate?(customer: any): Record<string, any> | null;
}

export interface ICompanyCustomerMapper {
  toModelFormData(dto: any): CompanyCustomerFormDataResult;
  toModel(dto: any): any;
  toModelList(dtos: any[]): { data: any[]; pagination: { totalRecords: number } };
  toCreateDTO(customer: any): any;
  toUpdateDTO(customer: any): any;
}
