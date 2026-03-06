/**
 * Códigos de reportes de ventas
 */
export enum SALE_CODE_REPORT {
  /**
   * REPORTE FACTURA
   */
  RF = 'RF',

  /**
   * FACTURA GENERAL
   */
  FG = 'FG',

  /**
   * REPORTE NOTA ENTREGA
   */
  RNE = 'RNE',

  /**
   * REPORTE NOTA CREDITO
   */
  RNC = 'RNCC',

  /**
   * REPORTE PROFORMA
   */
  PR = 'PR',

  /**
   * REPORTE RENTABILIDAD
   */
  SRR = 'SRR',

  /**
   * REPORTE RENTABILIDAD CUSTOM
   */
  SRRC = 'SRRC',
}

/**
 * Códigos de reportes de compras
 */
export enum PURCHASE_CODE_REPORT {
  /**
   * REPORTE LIQUIDACION COMPRA
   */
  RLC = 'RLC',

  /**
   * REPORTE COMPRA DETALLE
   */
  RCD = 'RCD',

  /**
   * REPORTE FACTURA COMPRA
   */
  RFC = 'RFC',

  /**
   * REPORTE COMPRAS NOTA HIDDEN (No Habitual)
   */
  RCNH = 'RCNH',

  /**
   * ORDEN COMPRA
   */
  ROC = 'ROC',

  /**
   * REPORTE COMPRAS
   */
  RCP = 'RCP',

  /**
   * REPORTE RECEPCION FACTURA
   */
  RRF = 'RRF',

  /**
   * RECEPCION NOTA CREDITO
   */
  RRNC = 'RRNC',

  /**
   * RECEPCION RETENCION GENERAL
   */
  RRG = 'RRG',

  /**
   * REPORTE RECEPCION NOTA DEBITO
   */
  RRND = 'RRND',
}

/**
 * Códigos de reportes de contabilidad
 */
export enum ACCOUNTING_CODE_REPORT {
  /**
   * REPORTE CONTROL CAJA
   */
  RCC = 'RCC',

  /**
   * CONTABILIDAD DETALLE CONTROL CAJA
   */
  CDCC = 'CDCC',

  /** Reporte Movimiento Caja (Caja / Anticipo) */
  RMC = 'RMC',

  /** Comprobante Caja por  */
  CCCR = 'CCCR',

  /** Comprobante Caja  */
  CCR = 'CCR',

  /** Reporte Movimiento por ID de Documento (Caja / Anticipo) */
  RMIE = 'RMIE',

  /** Resumen Movimiento Contable (Accounting Movement) */
  RAAM = 'RAAM',

  /** Reporte Comprobante de Egreso */
  RCEGR = 'RCEGR',

  /** Listado Comprobantes de Egreso (Accounting - Comprobante Egreso) */
  ACELC = 'ACELC',

  /** Detalles de formas de pago **/
  ACEDFP = 'ACEDFP',
}

/**
 * Códigos de reportes de clientes y cartera
 */
export enum CUSTOMER_CODE_REPORT {
  /**
   * REPORTE CLIENTE LISTADO
   */
  RCL = 'RCL',

  /**
   * CUENTA POR COBRAR
   */
  CCR = 'CCR',

  /**
   * CONTABILIDAD CARTERA PROVEEDOR
   */
  CCP = 'CCP',

  /**
   * CONTABILIDAD CARTERA PROVEEDOR CUOTA
   */
  CCPC = 'CCPC',

  /**
   * CONTABILIDAD COBROS POR CUOTAS
   */
  RCXC = 'RCXC',

  /**
   * CONTABILIDAD COBROS POR DOCUMENTOS
   */
  RCXD = 'RCXD',

  /**
   * CONTABILIDAD COBROS POR PAGOS
   */
  RCXP = 'RCXP',

  /**
   * REPORTE ANTICIPO
   */
  RA = 'RA',
}

/**
 * Códigos de reportes de inventario
 */
export enum INVENTORY_CODE_REPORT {
  /**
   * REPORTE KARDEX
   */
  RK = 'RK',

  /**
   * CONSOLIDADO DE ARTICULOS AGRUPADO
   */
  CDAA = 'CDAA',

  /**
   * CONSOLIDADO DE ARTICULOS
   */
  CDA = 'CDA',

  /**
   * INVENTARIO REPORTE VALORACION
   */
  STOCK_VALORACION = 'INVRV',

  /**
   * INVENTARIO ARTICULO TABLA
   */
  ARTICULO_PVP = 'INVAT',

  /**
   * REPORTE DE ARTICULOS FRACCIONADOS
   */
  RAF = 'RAF',

  /**
   * REPORTE DE CADUCIDAD DE ARTICULOS
   */
  RCAA = 'RCAA',

  /**
   * REPORTE DE ARTICULO STOCK VALORACION
   */
  RASR = 'RASR',

  /**
   * REPORTE CONSOLIDACION DETALLE
   */
  RCD = 'RCD',

  /**
   * REPORTE TRANSFERENCIA BODEGA
   */
  RTB = 'RTB',
}

/**
 * Códigos de documentos electrónicos
 */
export enum ELECTRONIC_DOCUMENT_CODE {
  /**
   * FACTURA
   */
  FV = 'FV',

  /**
   * NOTA DE ENTREGA
   */
  NE = 'NE',

  /**
   * NOTA DE CREDITO
   */
  NC = 'NC',

  /**
   * NOTA DE DEBITO
   */
  ND = 'ND',

  /**
   * GUIA DE REMISION
   */
  GR = 'GR',

  /**
   * ORDEN DE PEDIDO
   */
  NORMAL = 'NORMAL',
}

/**
 * Códigos de reporte de Facturación Electrónico
 */
export enum BILLING_CODE_REPORT {
  /**
   * FACTURACION ELECTRONICA GENERAL
   */
  FEG = 'FEG',

  /**
   * NOTA CREDITO REPORTE GENERAL
   */
  NCRG = 'NCRG',

  /**
   * FACTURACION RETENCION REPORTE GENERAL
   */
  FCRRG = 'FCRRG',

  /**
   * LIQUIDACION COMPRA REPORTE GENERAL
   */
  LCRG = 'LCRG',

  /**
   * REPORTE GUIA REMISION GENERAL
   */
  RGGR = 'RGGR',

  /**
   * REPORTE RETENCION
   */
  RRC = 'RRC',
}

/**
 * Códigos de aprobación de documentos
 */
export enum APPROVAL_CODE_REPORT {
  /**
   * APROBACION FACTURA
   */
  PRE_F = 'RAC',

  /**
   * APROBACION NOTA ENTREGA
   */
  P_NE = 'P-NE',
}

/**
 * Formatos de reporte disponibles
 */
export enum REPORT_FORMAT {
  PDF = 'pdf',
  EXCEL = 'excel',
  WORD = 'word',
}

/**
 * Códigos de soporte técnico
 */
export enum TECHNICAL_SUPPORT_CODE_REPORT {
  /**
   * REPORTE SOPORTE TECNICO
   */
  RTS = 'RTS',
}
