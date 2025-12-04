import { ICompanyCustomerMapper } from '@acontplus/ng-customer';

export class CompanyCustomerDefaultMapper implements ICompanyCustomerMapper {
  toModel(dto: any): any {
    return {
      name: `Esto de mapper default - ${dto.name}`,
      id: dto.id,
      idCliente: dto.id_cliente,
      idEmpresa: dto.id_empresa,
      idCargo: dto.id_cargo,
      idFormaPagoSri: dto.id_forma_pago_sri,
      idTipoClienteProveedor: dto.id_tipo_cliente_proveedor,
      idTipoIdentificacion: dto.id_tipo_identificacion,
      idSubContribuyente: dto.id_sub_contribuyente,
      idTiempoCredito: dto.id_tiempo_credito,
      idCiudad: dto.id_ciudad,
      idEmpleado: dto.id_empleado,

      numeroIdentificacion: dto.numero_identificacion,
      nombreFiscal: dto.nombre_fiscal,
      nombreComercial: dto.nombre_comercial,
      direccion: dto.direccion,
      correo: dto.correo,
      telefono: dto.telefono,
      placa: dto.placa,
      nota: dto.nota,
      birthDate: dto.birth_date ? new Date(dto.birth_date) : null,

      estado: dto.estado,
      validationSri: dto.validation_sri,
      configValorBruto: dto.config_valor_bruto,

      dataInfoCred: dto.data_info_cred
        ? {
            maritalStatusId: dto.data_info_cred.marital_status_id,
            conyugeNombre: dto.data_info_cred.conyuge_nombre,
            conyugeTel: dto.data_info_cred.conyuge_tel,
            refFamNombre: dto.data_info_cred.ref_fam_nombre,
            refFamTel: dto.data_info_cred.ref_fam_tel,
            housingTypeId: dto.data_info_cred.housing_type_id,
            dirVivienda: dto.data_info_cred.dir_vivienda,
            refDomicilio: dto.data_info_cred.ref_domicilio,
            sector: dto.data_info_cred.sector,
            barrio: dto.data_info_cred.barrio,
            calle: dto.data_info_cred.calle,
          }
        : undefined,
    };
  }

  toModelList(dtos: any[]): any[] {
    return dtos.map(dto => this.toModel(dto));
  }

  toCreateDTO(customer: any): any {
    return {
      id_tipo_identificacion: customer.idTipoIdentificacion,
      numero_identificacion: customer.numeroIdentificacion,
      nombre_fiscal: customer.nombreFiscal,
      nombre_comercial: customer.nombreComercial,
      direccion: customer.direccion,
      correo: customer.correo,
      telefono: customer.telefono,
      placa: customer.placa,
      nota: customer.nota,
      birth_date: customer.birthDate?.toISOString(),
      estado: customer.estado,
      validation_sri: customer.validationSri,
      config_valor_bruto: customer.configValorBruto,

      id_forma_pago_sri: customer.idFormaPagoSri,
      id_tipo_cliente_proveedor: customer.idTipoClienteProveedor,
      id_sub_contribuyente: customer.idSubContribuyente,
      id_tiempo_credito: customer.idTiempoCredito,
      id_ciudad: customer.idCiudad,
      id_cargo: customer.idCargo,
      id_empleado: customer.idEmpleado,

      data_info_cred: customer.dataInfoCred
        ? {
            marital_status_id: customer.dataInfoCred.maritalStatusId,
            conyuge_nombre: customer.dataInfoCred.conyugeNombre,
            conyuge_tel: customer.dataInfoCred.conyugeTel,
            ref_fam_nombre: customer.dataInfoCred.refFamNombre,
            ref_fam_tel: customer.dataInfoCred.refFamTel,
            housing_type_id: customer.dataInfoCred.housingTypeId,
            dir_vivienda: customer.dataInfoCred.dirVivienda,
            ref_domicilio: customer.dataInfoCred.refDomicilio,
            sector: customer.dataInfoCred.sector,
            barrio: customer.dataInfoCred.barrio,
            calle: customer.dataInfoCred.calle,
          }
        : null,
    };
  }

  toUpdateDTO(customer: any): any {
    return {
      id: customer.id,
      ...this.toCreateDTO(customer),
    };
  }
}
