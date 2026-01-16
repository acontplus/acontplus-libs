/**
 * Códigos de reportes de ventas
 */
export enum SALE_CODE_REPORT {
  /**
   * SALE REPORT RENTABILIDAD
   */
  SRR = 'SRR',

  /**
   * SALE REPORT RENTABILIDAD CUSTOM
   */
  SRRC = 'SRRC',

  /**
   * SALE REPORT INVOICE GENERAL
   */
  FG = 'FG',
}

/**
 * Códigos de reportes de compras
 */
export enum PURCHASE_CODE_REPORT {
  /**
   * REPORTE COMPRAS NOTA HIDDEN
   */
  RCNH = 'RCNH',

  /**
   * REPORTE LIQUIDACION COMPRA
   */
  RLC = 'RLC',
}

/**
 * Códigos de reportes de contabilidad
 */
export enum ACCOUNTING_CODE_REPORT {
  /**
   * REPORTE CONTABLE ESTADO GENERAL RESULTADO
   */
  RCEGR = 'RCEGR',

  /**
   * ASIENTO CONTABLE ESTADO DE FLUJO DE PAGO
   */
  ACEDFP = 'ACEDFP',

  /**
   * ASIENTO CONTABLE ESTADO LIBRO CAJA
   */
  ACELC = 'ACELC',
}

/**
 * Códigos de reportes de clientes
 */
export enum CUSTOMER_CODE_REPORT {
  /**
   * REPORTE CLIENTE LISTADO
   */
  RCL = 'RCL',
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
 * Formatos de reporte disponibles
 */
export enum REPORT_FORMAT {
  PDF = 'pdf',
  EXCEL = 'excel',
  WORD = 'word',
}
