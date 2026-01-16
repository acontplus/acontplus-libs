import {
  SALE_CODE_REPORT,
  PURCHASE_CODE_REPORT,
  ACCOUNTING_CODE_REPORT,
  CUSTOMER_CODE_REPORT,
  INVENTORY_CODE_REPORT,
  ELECTRONIC_DOCUMENT_CODE,
} from '../constants/report-codes';

/**
 * Tipo union con todos los códigos de reporte soportados
 */
export type ReportCode =
  | SALE_CODE_REPORT
  | PURCHASE_CODE_REPORT
  | ACCOUNTING_CODE_REPORT
  | CUSTOMER_CODE_REPORT
  | INVENTORY_CODE_REPORT
  | ELECTRONIC_DOCUMENT_CODE;

export interface ReportDocumentData {
  codDoc?: string; // Código del documento (puede ser dinámico en dataParams)
  codEstab?: string;
  id?: number;
  serie?: string;
  // Campos adicionales para reportes personalizados
  [key: string]: any;
}

/**
 * Opciones para construir un reporte
 */
export interface BuildReportOptions {
  codeReport: ReportCode | string; // Código del reporte (tipado o string para custom)
  data: ReportDocumentData; // Datos del documento
  format?: 'pdf' | 'excel' | 'word'; // Formato de salida
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
   *
   * @param codeReport - Código del reporte (FG, SRR, FV, RCNH, etc.)
   * @param docData - Datos del documento con parámetros adicionales
   * @param format - Formato del reporte: 'pdf' | 'excel' | 'word'
   * @returns Objeto con hasService, reportParams (string JSON) y dataParams (string JSON)
   *
   * @example
   * ```typescript
   * const params = ReportParamsBuilder.buildParams(
   *   SALE_CODE_REPORT.FG,
   *   { codDoc: '01', tipo: 2, codEstab: '001' },
   *   'pdf'
   * );
   * // Resultado:
   * // {
   * //   hasService: true,
   * //   reportParams: "{\"codigo\":\"FG\",\"format\":\"pdf\",\"hasParams\":false}",
   * //   dataParams: "{\"codDoc\":\"01\",\"tipo\":2,\"codEstab\":\"001\"}"
   * // }
   * ```
   */
  static buildParams(
    codeReport: ReportCode | string,
    docData: ReportDocumentData,
    format: 'pdf' | 'excel' | 'word' = 'pdf',
  ): ReportParams {
    const config = this.getReportConfig(codeReport);

    return {
      hasService: config.hasService,
      reportParams: this.buildReportParams(docData, config, format),
      dataParams: this.buildDataParams(docData, config),
    };
  }

  /**
   * Determina si debe usar la API v1 o v2 según el código de reporte
   *
   * Algunos reportes (como documentos electrónicos) usan API v1,
   * mientras que otros (reportes de ventas, inventario) usan API v2.
   *
   * @param codeReport - Código del reporte
   * @returns true para API v1, false para API v2
   *
   * @example
   * ```typescript
   * // Documentos electrónicos usan v1
   * const useV1 = ReportParamsBuilder.shouldUseV1Api(ELECTRONIC_DOCUMENT_CODE.FV);
   * console.log(useV1); // true
   *
   * // Reportes de ventas usan v2
   * const useV1Sales = ReportParamsBuilder.shouldUseV1Api(SALE_CODE_REPORT.FG);
   * console.log(useV1Sales); // false
   *
   * // Uso manual (normalmente no necesario, build() lo hace automáticamente)
   * const apiVersion = useV1 ? '/reporte/download' : '/v2/reporte/download';
   * ```
   */
  static shouldUseV1Api(codeReport: ReportCode | string): boolean {
    const config = this.getReportConfig(codeReport);
    return config.useV1Api;
  }

  /**
   * Obtiene la configuración para un tipo de documento
   *
   * @param codeReport - Código del reporte (FG, SRR, FV, etc.)
   * @returns Configuración del reporte
   * @throws Error si el tipo de documento no está soportado
   * @private
   */
  private static getReportConfig(codeReport: string): ReportConfig {
    const config = this.reportConfigs[codeReport];
    if (!config) {
      throw new Error(
        `Tipo de reporte no soportado: ${codeReport}. Tipos disponibles: ${Object.keys(this.reportConfigs).join(', ')}`,
      );
    }
    return config;
  }

  /**
   * Construye los parámetros del reporte (reportParams)
   *
   * Genera un string JSON con la configuración del reporte:
   * - codigo: Código del reporte
   * - format: Formato de salida (pdf, excel, word)
   * - hasParams: Si el reporte acepta parámetros adicionales
   * - codEstab: Código de establecimiento (si aplica)
   * - aditionalParams: Array vacío para parámetros adicionales (si aplica)
   *
   * @param docData - Datos del documento
   * @param config - Configuración del tipo de reporte
   * @param format - Formato de salida
   * @returns String JSON con los parámetros del reporte
   * @private
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
   * Construye los parámetros de datos (dataParams)
   *
   * Genera un string JSON con los datos específicos del reporte.
   * NO incluye hasParams ni configuración, solo datos puros.
   *
   * Incluye automáticamente:
   * - id: ID del documento (si existe)
   * - codEstab: Código de establecimiento (según configuración)
   * - codigo: Código del reporte (según configuración)
   * - Parámetros extra específicos del tipo (extraDataParams)
   * - Todos los parámetros adicionales del docData (excepto codEstab, id, serie)
   *
   * @param docData - Datos del documento con parámetros adicionales
   * @param config - Configuración del tipo de reporte
   * @returns String JSON con los datos del reporte (sin hasParams anidado)
   * @private
   *
   * @example
   * ```typescript
   * // Input:
   * docData = { codDoc: '01', tipo: 2, codEstab: '001', fechaInicio: '2024-01-01' }
   * config = { idField: 'id', includeEstabInData: false, ... }
   *
   * // Output:
   * "{\"codDoc\":\"01\",\"tipo\":2,\"fechaInicio\":\"2024-01-01\"}"
   * ```
   */
  private static buildDataParams(docData: ReportDocumentData, config: ReportConfig): string {
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

    // Agregar parámetros extra específicos del tipo
    if (config.extraDataParams) {
      Object.assign(params, config.extraDataParams);
    }

    // Agregar cualquier parámetro adicional del docData (incluyendo codDoc si existe)
    Object.keys(docData).forEach((key) => {
      if (!['codEstab', 'id', 'serie'].includes(key) && docData[key] !== undefined) {
        params[key] = docData[key];
      }
    });

    return JSON.stringify(params);
  }

  /**
   * Construye las opciones completas para generar un reporte
   *
   * @param codeReport - Código del reporte (FG, SRR, FV, RCNH, etc.) - REQUERIDO
   * @param docData - Datos del documento con parámetros adicionales (sin codeReport)
   * @param format - Formato del reporte: 'pdf' | 'excel' | 'word'
  /**
   * Construye las opciones completas para generar un reporte
   *
   * Método principal que acepta un objeto con opciones tipadas.
   * Proporciona IntelliSense y validación de tipos en tiempo de desarrollo.
   *
   * @param options - Opciones del reporte
   * @param options.codeReport - Código del reporte (tipado: SALE_CODE_REPORT, PURCHASE_CODE_REPORT, etc.)
   * @param options.data - Datos del documento (codDoc, tipo, fechas, etc.)
   * @param options.format - Formato de salida: 'pdf' | 'excel' | 'word' (opcional, por defecto 'pdf')
   * @returns Objeto con data, format y useV1Api para enviar a la facade
   *
   * @example
   * ```typescript
   * // Ejemplo 1: Reporte de ventas
   * const options = ReportParamsBuilder.build({
   *   codeReport: SALE_CODE_REPORT.FG,
   *   data: {
   *     tipo: 2,
   *     ckFecha: true,
   *     codEstab: 'ESTAB-000000216',
   *     fechaInicio: '2024-01-01',
   *     fechaFin: '2024-12-31',
   *     userRoleId: '307'
   *   },
   *   format: 'pdf'
   * });
   *
   * // Ejemplo 2: Documento electrónico con codDoc variable
   * const options2 = ReportParamsBuilder.build({
   *   codeReport: ELECTRONIC_DOCUMENT_CODE.FV,
   *   data: {
   *     id: 123,
   *     codDoc: '01',  // ← Variable, va a dataParams
   *     codEstab: '001'
   *   }
   *   // format es opcional, por defecto 'pdf'
   * });
   *
   * // Ejemplo 3: Reporte de inventario
   * const options3 = ReportParamsBuilder.build({
   *   codeReport: INVENTORY_CODE_REPORT.ARTICULO_PVP,
   *   data: {
   *     tipo: 2,
   *     stockStatusCode: 1,
   *     idTarifa: 3
   *   },
   *   format: 'excel'
   * });
   *
   * // Usar con facade
   * this.reportFacade.open(options).subscribe();
   * this.reportFacade.download(options2).subscribe();
   * ```
   */
  static build(options: BuildReportOptions) {
    const { codeReport, data, format = 'pdf' } = options;

    return {
      data: this.buildParams(codeReport, data, format),
      format,
      useV1Api: this.shouldUseV1Api(codeReport),
    };
  }

  /**
   * Obtiene la lista de códigos de reporte soportados
   *
   * Devuelve un array con todos los códigos de reporte configurados
   * en el builder (FV, NE, FG, SRR, RCNH, etc.)
   *
   * @returns Array con todos los códigos de reporte disponibles
   *
   * @example
   * ```typescript
   * const types = ReportParamsBuilder.getSupportedDocumentTypes();
   * console.log(types);
   * // ['FV', 'NE', 'NC', 'ND', 'GR', 'NORMAL', 'SRR', 'SRRC', 'FG',
   * //  'RCNH', 'RLC', 'RCEGR', 'ACEDFP', 'ACELC', 'RCL', 'RK', ...]
   *
   * // Usar para validación
   * if (types.includes(myCode)) {
   *   // Código válido
   * }
   * ```
   */
  static getSupportedDocumentTypes(): string[] {
    return Object.keys(this.reportConfigs);
  }

  /**
   * Verifica si un código de reporte está soportado
   *
   * Útil para validar códigos antes de generar reportes,
   * especialmente cuando el código viene dinámicamente.
   *
   * @param codeReport - Código del reporte a verificar
   * @returns true si el código está soportado, false en caso contrario
   *
   * @example
   * ```typescript
   * // Validación con enum
   * if (ReportParamsBuilder.isDocumentTypeSupported(SALE_CODE_REPORT.FG)) {
   *   console.log('Código FG soportado');
   * }
   *
   * // Validación con string dinámico
   * const dynamicCode = getUserSelectedCode();
   * if (ReportParamsBuilder.isDocumentTypeSupported(dynamicCode)) {
   *   const options = ReportParamsBuilder.build({
   *     codeReport: dynamicCode,
   *     data: {...}
   *   });
   * } else {
   *   console.error('Código no soportado:', dynamicCode);
   * }
   * ```
   */
  static isDocumentTypeSupported(codeReport: ReportCode | string): boolean {
    return codeReport in this.reportConfigs;
  }

  /**
   * Registra un nuevo tipo de reporte dinámicamente
   *
   * Permite agregar soporte para códigos de reporte personalizados
   * sin modificar el código fuente de la librería.
   * Útil para reportes específicos de cada aplicación.
   *
   * @param codeReport - Código único del reporte personalizado
   * @param config - Configuración completa del reporte
   *
   * @example
   * ```typescript
   * // Registrar un reporte personalizado
   * ReportParamsBuilder.registerReportType('MI_REPORTE_CUSTOM', {
   *   codigo: 'MI_REPORTE_CUSTOM',
   *   hasService: true,
   *   useV1Api: false,
   *   idField: 'id',
   *   hasParams: true,
   *   includeEstabInData: true,
   *   extraDataParams: {
   *     tipoCustom: 'especial',
   *     version: 2
   *   }
   * });
   *
   * // Ahora se puede usar como cualquier otro reporte
   * const options = ReportParamsBuilder.build({
   *   codeReport: 'MI_REPORTE_CUSTOM',
   *   data: { id: 123, codEstab: '001' },
   *   format: 'pdf'
   * });
   *
   * // Verificar si fue registrado
   * console.log(
   *   ReportParamsBuilder.isDocumentTypeSupported('MI_REPORTE_CUSTOM')
   * ); // true
   * ```
   */
  static registerReportType(codeReport: string, config: ReportConfig): void {
    this.reportConfigs[codeReport] = config;
  }
}
