import {
  SALE_CODE_REPORT,
  PURCHASE_CODE_REPORT,
  ACCOUNTING_CODE_REPORT,
  CUSTOMER_CODE_REPORT,
  INVENTORY_CODE_REPORT,
  ELECTRONIC_DOCUMENT_CODE,
} from '../constants/report-codes';

export interface ReportDocumentData {
  codDoc: string;
  codEstab?: string;
  id?: number;
  serie?: string;
  // Campos adicionales para reportes personalizados
  [key: string]: any;
}

export interface ReportParams {
  hasService?: boolean;
  reportParams: string;
  dataParams: string;
}

interface ReportConfig {
  codigo: string;
  hasService: boolean;
  useV1Api: boolean;
  idField: string;
  extraDataParams?: Record<string, any>;
  includeEstabInData?: boolean;
  includeCodigoInData?: boolean;
  hasParams?: boolean;
}

/**
 * Builder para construir parámetros de reportes
 * Clase utilitaria con métodos estáticos
 */
export class ReportParamsBuilder {
  private static readonly reportConfigs: Record<string, ReportConfig> = {
    // Documentos electrónicos
    [ELECTRONIC_DOCUMENT_CODE.FV]: {
      codigo: ELECTRONIC_DOCUMENT_CODE.FV,
      hasService: true,
      useV1Api: true,
      idField: 'id',
      includeEstabInData: true,
      includeCodigoInData: true,
      hasParams: true,
    },
    [ELECTRONIC_DOCUMENT_CODE.NE]: {
      codigo: ELECTRONIC_DOCUMENT_CODE.NE,
      hasService: true,
      useV1Api: true,
      idField: 'id',
      extraDataParams: { tipo: 1 },
      hasParams: true,
    },
    [ELECTRONIC_DOCUMENT_CODE.NORMAL]: {
      codigo: 'OR',
      hasService: false,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [ELECTRONIC_DOCUMENT_CODE.NC]: {
      codigo: ELECTRONIC_DOCUMENT_CODE.NC,
      hasService: true,
      useV1Api: true,
      idField: 'id',
      includeEstabInData: true,
      hasParams: true,
    },
    [ELECTRONIC_DOCUMENT_CODE.ND]: {
      codigo: ELECTRONIC_DOCUMENT_CODE.ND,
      hasService: true,
      useV1Api: true,
      idField: 'id',
      includeEstabInData: true,
      hasParams: true,
    },
    [ELECTRONIC_DOCUMENT_CODE.GR]: {
      codigo: ELECTRONIC_DOCUMENT_CODE.GR,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: true,
    },

    // Reportes de ventas
    [SALE_CODE_REPORT.SRR]: {
      codigo: SALE_CODE_REPORT.SRR,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [SALE_CODE_REPORT.SRRC]: {
      codigo: SALE_CODE_REPORT.SRRC,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [SALE_CODE_REPORT.FG]: {
      codigo: SALE_CODE_REPORT.FG,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },

    // Reportes de compras
    [PURCHASE_CODE_REPORT.RCNH]: {
      codigo: PURCHASE_CODE_REPORT.RCNH,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: true,
    },
    [PURCHASE_CODE_REPORT.RLC]: {
      codigo: PURCHASE_CODE_REPORT.RLC,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },

    // Reportes de contabilidad
    [ACCOUNTING_CODE_REPORT.RCEGR]: {
      codigo: ACCOUNTING_CODE_REPORT.RCEGR,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [ACCOUNTING_CODE_REPORT.ACEDFP]: {
      codigo: ACCOUNTING_CODE_REPORT.ACEDFP,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [ACCOUNTING_CODE_REPORT.ACELC]: {
      codigo: ACCOUNTING_CODE_REPORT.ACELC,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },

    // Reportes de clientes
    [CUSTOMER_CODE_REPORT.RCL]: {
      codigo: CUSTOMER_CODE_REPORT.RCL,
      hasService: false,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },

    // Reportes de inventario
    [INVENTORY_CODE_REPORT.RK]: {
      codigo: INVENTORY_CODE_REPORT.RK,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: true,
    },
    [INVENTORY_CODE_REPORT.CDAA]: {
      codigo: INVENTORY_CODE_REPORT.CDAA,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [INVENTORY_CODE_REPORT.CDA]: {
      codigo: INVENTORY_CODE_REPORT.CDA,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [INVENTORY_CODE_REPORT.STOCK_VALORACION]: {
      codigo: INVENTORY_CODE_REPORT.STOCK_VALORACION,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [INVENTORY_CODE_REPORT.ARTICULO_PVP]: {
      codigo: INVENTORY_CODE_REPORT.ARTICULO_PVP,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [INVENTORY_CODE_REPORT.RAF]: {
      codigo: INVENTORY_CODE_REPORT.RAF,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [INVENTORY_CODE_REPORT.RCAA]: {
      codigo: INVENTORY_CODE_REPORT.RCAA,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [INVENTORY_CODE_REPORT.RASR]: {
      codigo: INVENTORY_CODE_REPORT.RASR,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: false,
    },
    [INVENTORY_CODE_REPORT.RCD]: {
      codigo: INVENTORY_CODE_REPORT.RCD,
      hasService: false,
      useV1Api: false,
      idField: 'id',
      hasParams: true,
    },
    [INVENTORY_CODE_REPORT.RTB]: {
      codigo: INVENTORY_CODE_REPORT.RTB,
      hasService: true,
      useV1Api: false,
      idField: 'id',
      hasParams: true,
    },
  };

  /**
   * Construye los parámetros de reporte según el tipo de documento
   */
  static buildParams(
    docData: ReportDocumentData,
    format: 'pdf' | 'excel' | 'word' = 'pdf',
  ): ReportParams {
    const config = this.getReportConfig(docData.codDoc);

    return {
      hasService: config.hasService,
      reportParams: this.buildReportParams(docData, config, format),
      dataParams: this.buildDataParams(docData, config, format),
    };
  }

  /**
   * Determina si debe usar la API v1 según el tipo de documento
   */
  static shouldUseV1Api(codDoc: string): boolean {
    const config = this.getReportConfig(codDoc);
    return config.useV1Api;
  }

  /**
   * Obtiene la configuración para un tipo de documento
   */
  private static getReportConfig(codDoc: string): ReportConfig {
    const config = this.reportConfigs[codDoc];
    if (!config) {
      throw new Error(
        `Tipo de documento no soportado: ${codDoc}. Tipos disponibles: ${Object.keys(this.reportConfigs).join(', ')}`,
      );
    }
    return config;
  }

  /**
   * Construye los parámetros del reporte
   */
  private static buildReportParams(
    docData: ReportDocumentData,
    config: ReportConfig,
    format: string,
  ): string {
    const params: any = {
      codigo: config.codigo,
      format,
    };

    // Agregar hasParams según configuración
    if (config.hasParams !== undefined) {
      params.hasParams = config.hasParams;
    }

    // Agregar codEstab si existe
    if (docData.codEstab) {
      params.codEstab = docData.codEstab;
    }

    // Solo agregar aditionalParams si hasService es true y hasParams es true
    if (config.hasService && config.hasParams) {
      params.aditionalParams = [];
    }

    return JSON.stringify(params);
  }

  /**
   * Construye los parámetros de datos
   */
  private static buildDataParams(
    docData: ReportDocumentData,
    config: ReportConfig,
    format: string,
  ): string {
    const params: any = {};

    // Agregar ID si existe el campo configurado
    if (config.idField && docData[config.idField]) {
      params.id = docData[config.idField];
    }

    // Agregar parámetros adicionales según configuración
    if (config.includeEstabInData && docData.codEstab) {
      params.codEstab = docData.codEstab;
    }

    if (config.includeCodigoInData) {
      params.codigo = config.codigo;
    }

    if (config.hasService && config.hasParams) {
      params.hasParams = true;
      if (config.includeCodigoInData) {
        params.format = format;
      }
    }

    // Agregar parámetros extra específicos del tipo
    if (config.extraDataParams) {
      Object.assign(params, config.extraDataParams);
    }

    // Agregar cualquier parámetro adicional del docData
    Object.keys(docData).forEach((key) => {
      if (!['codDoc', 'codEstab', 'id', 'serie'].includes(key) && docData[key] !== undefined) {
        params[key] = docData[key];
      }
    });

    return JSON.stringify(params);
  }

  /**
   * Construye las opciones completas para generar un reporte
   */
  static build(
    docData: ReportDocumentData,
    format: 'pdf' | 'excel' | 'word' = 'pdf',
    returnBlob = false,
  ) {
    return {
      data: this.buildParams(docData, format),
      format,
      useV1Api: this.shouldUseV1Api(docData.codDoc),
      returnBlob,
    };
  }

  /**
   * Obtiene la lista de tipos de documento soportados
   */
  static getSupportedDocumentTypes(): string[] {
    return Object.keys(this.reportConfigs);
  }

  /**
   * Verifica si un tipo de documento está soportado
   */
  static isDocumentTypeSupported(codDoc: string): boolean {
    return codDoc in this.reportConfigs;
  }

  /**
   * Registra un nuevo tipo de reporte dinámicamente
   */
  static registerReportType(codDoc: string, config: ReportConfig): void {
    this.reportConfigs[codDoc] = config;
  }
}
