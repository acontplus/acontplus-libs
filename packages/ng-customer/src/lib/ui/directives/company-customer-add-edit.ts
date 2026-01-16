import { Directive, HostListener, inject, input, output } from '@angular/core';
import { AdvancedDialogService } from '@acontplus/ng-components';
import { CompanyCustomerAddEditDialog } from '../company-customer';
@Directive({
  selector: '[acpCompanyCustomerAddEdit]',
})
export class CompanyCustomerAddEditDirective {
  private dgSvc = inject(AdvancedDialogService);

  companyCustomerSaved = output<any>();
  id = input(0);

  @HostListener('click', ['$event'])
  async onClick(event: MouseEvent) {
    event.stopPropagation();

    const isEdit = this.id() > 0;
    const ref = await this.dgSvc.openInWrapper(
      {
        component: CompanyCustomerAddEditDialog,
        title: isEdit ? 'Editar Cliente' : 'Nuevo Cliente',
        icon: isEdit ? 'edit' : 'add',
        showCloseButton: true,
        data: {
          id: this.id(),
        },
      },
      {
        size: 'xxl',
      },
    );

    ref.afterClosed().subscribe(result => {
      if (result && typeof result === 'object') {
        this.companyCustomerSaved.emit(result);
      }
    });
  }
}
