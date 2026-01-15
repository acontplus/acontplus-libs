import { Injectable } from '@angular/core';
// import { SALE_CODE_REPORT } from '../constants';

export interface ReportDocumentData {
  codDoc: string;
  codEstab?: string;
  id?: number;
  serie?: string;
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
  idField: keyof ReportDocumentData;
  extraDataParams?: Record<string, any>;
  includeEstabInData?: boolean;
  includeCodigoInData?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReportParamsBuilder {
  private readonly reportConfigs: Record<string, ReportConfig> = {
    FV: {
      codigo: 'FV',
      hasService: true,
      useV1Api: true,
      idField: 'id',
      includeEstabInData: true,
      includeCodigoInData: true,
    },
    NE: {
      codigo: 'NE',
      hasService: true,
      useV1Api: true,
      idField: 'id',
      extraDataParams: { tipo: 1 },
    },
    NORMAL: {
      codigo: 'OR',
      hasService: false,
      useV1Api: false,
      idField: 'id',
    },
    // Fácil agregar nuevos tipos sin modificar código
    NC: {
      codigo: 'NC',
      hasService: true,
      useV1Api: true,
      idField: 'id',
      includeEstabInData: true,
    },
    ND: {
      codigo: 'ND',
      hasService: true,
      useV1Api: true,
      idField: 'id',
      includeEstabInData: true,
    },
    GR: {
      codigo: 'GR',
      hasService: true,
      useV1Api: false,
      idField: 'id',
    },
    // [SALE_CODE_REPORT.FG]: {
    //   codigo: SALE_CODE_REPORT.FG,
    //   hasService: true,
    //   useV1Api: false
    // }
  };

  /**
   * Construye los parámetros de reporte según el tipo de documento
   */
  buildParams(docData: ReportDocumentData, format: 'pdf' | 'excel' | 'word' = 'pdf'): ReportParams {
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
  shouldUseV1Api(codDoc: string): boolean {
    const config = this.getReportConfig(codDoc);
    return config.useV1Api;
  }

  /**
   * Obtiene la configuración para un tipo de documento
   */
  private getReportConfig(codDoc: string): ReportConfig {
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
  private buildReportParams(
    docData: ReportDocumentData,
    config: ReportConfig,
    format: string,
  ): string {
    const params: any = {
      codigo: config.codigo,
      codEstab: docData.codEstab,
      format,
    };

    // Solo agregar hasParams y aditionalParams si hasService es true
    if (config.hasService) {
      params.hasParams = true;
      params.aditionalParams = [];
    }

    return JSON.stringify(params);
  }

  /**
   * Construye los parámetros de datos
   */
  private buildDataParams(
    docData: ReportDocumentData,
    config: ReportConfig,
    format: string,
  ): string {
    const params: any = {
      id: docData[config.idField],
    };

    // Agregar parámetros adicionales según configuración
    if (config.includeEstabInData) {
      params.codEstab = docData.codEstab;
    }

    if (config.includeCodigoInData) {
      params.codigo = config.codigo;
    }

    if (config.hasService) {
      params.hasParams = true;
      if (config.includeCodigoInData) {
        params.format = format;
      }
    }

    // Agregar parámetros extra específicos del tipo
    if (config.extraDataParams) {
      Object.assign(params, config.extraDataParams);
    }

    return JSON.stringify(params);
  }

  /**
   * Método de conveniencia para generar reporte directamente
   */
  generateReportFor(
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
  getSupportedDocumentTypes(): string[] {
    return Object.keys(this.reportConfigs);
  }

  /**
   * Verifica si un tipo de documento está soportado
   */
  isDocumentTypeSupported(codDoc: string): boolean {
    return codDoc in this.reportConfigs;
  }
}
