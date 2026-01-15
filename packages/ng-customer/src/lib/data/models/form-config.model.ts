export interface FieldConfig {
  name: string;
  required: boolean;
  visible: boolean;
  readonly?: boolean;
  label?: string;
  placeholder?: string;
  validators?: any[];
}

// Separar los campos de crédito en su propia interface
export interface CreditFieldsConfig {
  maritalStatusId: FieldConfig;
  conyugeNombre: FieldConfig;
  conyugeTel: FieldConfig;
  refFamNombre: FieldConfig;
  refFamTel: FieldConfig;
  housingTypeId: FieldConfig;
  dirVivienda: FieldConfig;
  refDomicilio: FieldConfig;
  sector: FieldConfig;
  barrio: FieldConfig;
  calle: FieldConfig;
}

export interface CompanyCustomerFormConfig {
  fields: {
    // IDs y referencias
    idTipoIdentificacion: FieldConfig;
    idFormaPagoSri: FieldConfig;
    idTipoClienteProveedor: FieldConfig;
    idSubContribuyente: FieldConfig;
    idTiempoCredito: FieldConfig;
    idCiudad: FieldConfig;
    idCargo: FieldConfig;
    idEmpleado: FieldConfig;

    // Datos principales
    numeroIdentificacion: FieldConfig;
    nombreFiscal: FieldConfig;
    nombreComercial: FieldConfig;
    direccion: FieldConfig;
    correo: FieldConfig;
    telefono: FieldConfig;
    placa: FieldConfig;
    nota: FieldConfig;
    birthDate: FieldConfig;

    // Estados
    estado: FieldConfig;
    validationSri: FieldConfig;
    configValorBruto: FieldConfig;
  };

  // Configuración de crédito separada
  showCreditInfo?: boolean;
  creditFields?: CreditFieldsConfig;

  submitButtonText?: string;
  cancelButtonText?: string;
}
