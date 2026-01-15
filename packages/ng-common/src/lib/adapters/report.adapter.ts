import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportPort, ReportOptions } from '../contracts/report.port';
import { API_PATHS } from '../constants/api-paths';
import { FileMapperUtil } from '../utils/file-mapper.util';

@Injectable()
export class ReportAdapter implements ReportPort {
  private readonly http = inject(HttpClient);

  generate<T>(options: ReportOptions<T>): Observable<HttpResponse<Blob>> | void {
    const {
      data,
      format = 'pdf',
      useV1Api = false,
      forceDownload = false,
      returnBlob = false,
    } = options;

    const reportVersionPath = useV1Api ? '/v1/' : '/v2/';
    const fullPath = `${API_PATHS.REPORTS}${reportVersionPath}download`;

    const requestOptions = {
      observe: 'response' as const,
      responseType: 'blob' as const,
    };

    if (returnBlob) {
      return this.http.post(fullPath, data, requestOptions);
    }

    this.http.post(fullPath, data, requestOptions).subscribe({
      next: (response) => this.saveFile(response, format, forceDownload),
      error: (err) => {
        console.error('Error al descargar el reporte:', err);
      },
    });

    return;
  }

  getFileName(response: any): string {
    return FileMapperUtil.extractFileName(response);
  }

  saveFile(response: any, format?: string, forceDownload = false): void {
    const fileName = this.getFileName(response);

    if (!response.body) return;

    if (format === 'pdf' && !forceDownload && !FileMapperUtil.isLegacyBrowser()) {
      // Abrir PDF en nueva ventana para navegadores modernos
      FileMapperUtil.openFile(response.body, fileName);
    } else {
      // Descargar archivo (Excel, Word, o PDF forzado)
      FileMapperUtil.downloadFile(response.body, fileName);
    }
  }
}
