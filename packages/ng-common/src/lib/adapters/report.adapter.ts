import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportPort, ReportOptions } from '../contracts/report.port';
import { API_PATHS } from '../constants/api-paths';

/**
 * Adapter para generación de reportes
 * Siempre devuelve Observable - el consumidor decide qué hacer con el blob
 */
@Injectable()
export class ReportAdapter implements ReportPort {
  private readonly http = inject(HttpClient);

  generate<T>(options: ReportOptions<T>): Observable<HttpResponse<Blob>> {
    const { data, useV1Api = false } = options;

    const reportVersionPath = useV1Api ? '/reporte/download' : '/v2/reporte/download';
    const fullPath = `${API_PATHS.REPORTS}${reportVersionPath}`;

    return this.http.post<Blob>(fullPath, data, {
      observe: 'response',
      responseType: 'blob' as 'json',
    });
  }
}
