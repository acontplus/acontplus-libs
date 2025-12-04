export interface ICompanyCustomerMapper {
  toModel(dto: any): any;
  toModelList(dtos: any[]): any[];
  toCreateDTO(customer: any): any;
  toUpdateDTO(customer: any): any;
}
