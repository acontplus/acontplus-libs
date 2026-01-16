import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReportOptions<T = any> {
  data: T;
  format?: 'pdf' | 'excel' | 'word';
  useV1Api?: boolean;
}

/**
 * Puerto para generación de reportes
 * Solo se encarga de generar reportes, no de impresión
 */
export interface ReportPort {
  /**
   * Genera un reporte y devuelve el Observable
   * El consumidor decide si descargar, abrir o procesar el blob
   */
  generate<T>(options: ReportOptions<T>): Observable<HttpResponse<Blob>>;
}
