export interface CustomerInfoCredit {
  maritalStatusId?: number | null;
  conyugeNombre?: string | null;
  conyugeTel?: string | null;
  refFamNombre?: string | null;
  refFamTel?: string | null;
  housingTypeId?: number | null;
  dirVivienda?: string | null;
  refDomicilio?: string | null;
  sector?: string | null;
  barrio?: string | null;
  calle?: string | null;
}

export interface Customer {
  // IDs
  id?: string;
  idCliente?: number;
  idEmpresa?: number;
  idCargo?: number;
  idFormaPagoSri?: number;
  idTipoClienteProveedor?: number;
  idTipoIdentificacion?: number;
  idSubContribuyente?: number;
  idTiempoCredito?: number;
  idCiudad?: number;
  idEmpleado?: number;

  // Datos básicos
  numeroIdentificacion: string;
  nombreFiscal: string;
  nombreComercial?: string;
  direccion?: string;
  correo?: string;
  telefono?: string;
  placa?: string;
  nota?: string;

  // Fechas y estados
  birthDate?: Date | null;
  estado?: boolean;
  validationSri?: boolean;
  configValorBruto?: boolean;

  // Información de crédito (anidada)
  dataInfoCred?: CustomerInfoCredit;

  // DEPRECATED: Campos antiguos para compatibilidad
  /** @deprecated Use numeroIdentificacion */
  idCard?: string;
  /** @deprecated Use nombreFiscal */
  name?: string;
  /** @deprecated Use nombreComercial */
  lastName?: string;
  /** @deprecated Use correo */
  email?: string;
  /** @deprecated Use telefono */
  phone?: string;
  /** @deprecated Use direccion */
  address?: string;
  /** @deprecated Use idCiudad */
  city?: string;
  dateOfBirth?: Date;
  notes?: string;
}
