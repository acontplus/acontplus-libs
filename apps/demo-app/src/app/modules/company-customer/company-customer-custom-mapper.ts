import { CompanyCustomerDefaultMapper } from '@acontplus/ng-customer';

export class CompanyCustomerCustomMapper extends CompanyCustomerDefaultMapper {
  override toModelList(dtos: any[]): any[] {
    console.log(dtos);
    return dtos.map(dto => {
      return {
        name: `Esto es de mapper custom - ${dto.name}`,
      };
    });
  }
}
