import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReportOptions<T = any> {
  data: T;
  format?: 'pdf' | 'excel' | 'word';
  useV1Api?: boolean;
  forceDownload?: boolean;
  returnBlob?: boolean;
}

/**
 * Puerto para generación de reportes
 * Solo se encarga de generar reportes, no de impresión
 */
export interface ReportPort {
  // Método principal con opciones completas
  generate<T>(options: ReportOptions<T>): Observable<HttpResponse<Blob>> | void;

  // Métodos de utilidad
  saveFile(response: any, format?: string, forceDownload?: boolean): void;
  getFileName(response: any): string;
}
