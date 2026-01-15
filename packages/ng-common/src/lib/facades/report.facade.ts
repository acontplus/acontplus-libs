import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { REPORT_PORT } from '../tokens/report.token';
import { ReportOptions } from '../contracts/report.port';

@Injectable({ providedIn: 'root' })
export class ReportFacade {
  private readonly reportPort = inject(REPORT_PORT);

  // Método principal unificado
  generate<T>(options: ReportOptions<T>): Observable<any> | void {
    return this.reportPort.generate(options);
  }

  // Métodos de conveniencia para casos comunes
  generatePDF<T>(data: T, forceDownload = false): void {
    this.reportPort.generate({
      data,
      format: 'pdf',
      forceDownload,
    });
  }

  generateExcel<T>(data: T, forceDownload = false): void {
    this.reportPort.generate({
      data,
      format: 'excel',
      forceDownload,
    });
  }

  generateWord<T>(data: T, forceDownload = false): void {
    this.reportPort.generate({
      data,
      format: 'word',
      forceDownload,
    });
  }

  // Método para generar y retornar blob
  generateBlob<T>(data: T, format: 'pdf' | 'excel' | 'word' = 'pdf'): Observable<any> {
    return this.reportPort.generate({
      data,
      format,
      returnBlob: true,
    }) as Observable<any>;
  }
}
