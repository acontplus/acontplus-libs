import { Observable } from 'rxjs';

export interface PrintParams {
  id: number;
  documentoId: number;
  tipo: 1 | 2 | 3 | 4 | 5 | 6;
  codDoc: string;
  codEstab?: string;
}

export interface PrintConfig {
  codDoc: string;
  getUrlPrintServer: boolean;
  id: number;
  codEstab?: string;
}

export interface ApiResponse<T = any> {
  code: string;
  message: string;
  payload?: T;
}

/**
 * Puerto para impresión de documentos
 * Solo se encarga de impresión, no de generación de reportes
 */
export interface PrinterPort {
  askToPrint(params: PrintParams): void;
  getPrintConfig(params: PrintParams): Observable<ApiResponse>;
  print(urlPrinter: string, params: PrintParams): Observable<ApiResponse>;

  // Métodos específicos de impresión
  createPrintOrder(id: number): void;
  createPrintCommanda(id: number): void;
  createPrintOrderWithCommanda(id: number): void;
  createInvoicePrint(id: number, documentoId: number): void;
  createNotaEntregaPrint(id: number, documentoId: number): void;
}
