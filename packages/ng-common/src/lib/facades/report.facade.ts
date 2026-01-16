import { Injectable, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { REPORT_PORT } from '../tokens/report.token';
import { ReportOptions } from '../contracts/report.port';
import { FileMapperUtil } from '../utils/file-mapper.util';

/**
 * Facade para generación de reportes
 *
 * Proporciona una API de alto nivel para generar reportes con manejo automático de archivos.
 * Todos los métodos devuelven Observables - el consumidor debe hacer subscribe().
 *
 * @example
 * ```typescript
 * // Control total del blob
 * this.reportFacade.generate(options).subscribe(response => {
 *   const blob = response.body;
 *   // Procesar blob manualmente
 * });
 *
 * // Descarga automática
 * this.reportFacade.download(options).subscribe();
 *
 * // Abrir PDF automáticamente
 * this.reportFacade.open(options).subscribe();
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ReportFacade {
  private readonly reportPort = inject(REPORT_PORT);

  /**
   * Genera un reporte y devuelve el Observable con el blob
   *
   * Este método proporciona control total sobre el blob generado.
   * No realiza ninguna acción automática (descarga/apertura).
   * Útil cuando necesitas procesar el blob manualmente (enviar por WhatsApp, guardar en servidor, etc.)
   *
   * @template T - Tipo de datos del reporte
   * @param options - Opciones de generación del reporte
   * @param options.data - Datos del reporte (usar ReportParamsBuilder.build())
   * @param options.format - Formato del reporte: 'pdf' | 'excel' | 'word'
   * @param options.useV1Api - Si debe usar la API v1 (por defecto false)
   * @returns Observable con la respuesta HTTP que contiene el blob
   *
   * @example
   * ```typescript
   * const options = ReportParamsBuilder.build(
   *   { codDoc: ELECTRONIC_DOCUMENT_CODE.FV, id: 123 },
   *   'pdf'
   * );
   *
   * this.reportFacade.generate(options).subscribe({
   *   next: (response) => {
   *     const blob = response.body;
   *     const fileName = FileMapperUtil.extractFileName(response);
   *     // Procesar blob según necesidad
   *   },
   *   error: (err) => console.error('Error:', err)
   * });
   * ```
   */
  generate<T>(options: ReportOptions<T>): Observable<HttpResponse<Blob>> {
    return this.reportPort.generate(options);
  }

  /**
   * Genera un reporte y lo descarga automáticamente
   *
   * Extrae el nombre del archivo desde los headers HTTP y descarga el archivo automáticamente.
   * Funciona para cualquier formato (PDF, Excel, Word).
   * El Observable se completa después de iniciar la descarga.
   *
   * @template T - Tipo de datos del reporte
   * @param options - Opciones de generación del reporte
   * @returns Observable que se completa después de iniciar la descarga
   *
   * @example
   * ```typescript
   * // Con formato dinámico
   * const options = ReportParamsBuilder.build(
   *   { codDoc: SALE_CODE_REPORT.FG },
   *   this.selectedFormat // 'pdf' | 'excel' | 'word'
   * );
   * this.reportFacade.download(options).subscribe();
   *
   * // Con formato fijo
   * const options = ReportParamsBuilder.build(
   *   { codDoc: INVENTORY_CODE_REPORT.RCD },
   *   'excel'
   * );
   * this.reportFacade.download(options).subscribe();
   * ```
   */
  download<T>(options: ReportOptions<T>): Observable<HttpResponse<Blob>> {
    return this.reportPort.generate(options).pipe(
      tap((response) => {
        const fileName = FileMapperUtil.extractFileName(response);
        if (response.body) {
          FileMapperUtil.downloadFile(response.body, fileName);
        }
      }),
    );
  }

  /**
   * Genera un reporte y lo abre en nueva ventana (o descarga en navegadores legacy)
   *
   * Comportamiento inteligente según el navegador:
   * - Navegadores modernos: Abre el archivo en nueva ventana/pestaña
   * - Navegadores legacy (IE, Edge antiguo): Descarga el archivo
   *
   * Ideal para PDFs que el usuario quiere visualizar inmediatamente.
   * También funciona con Excel/Word pero la experiencia puede variar según el navegador.
   *
   * @template T - Tipo de datos del reporte
   * @param options - Opciones de generación del reporte
   * @returns Observable que se completa después de abrir/descargar el archivo
   *
   * @example
   * ```typescript
   * // Abrir PDF
   * const options = ReportParamsBuilder.build(
   *   { codDoc: ELECTRONIC_DOCUMENT_CODE.FV, id: 123 },
   *   'pdf'
   * );
   * this.reportFacade.open(options).subscribe();
   *
   * // Con formato dinámico
   * const format = this.isPDF ? 'pdf' : 'excel';
   * const options = ReportParamsBuilder.build({ codDoc: code }, format);
   * this.reportFacade.open(options).subscribe();
   * ```
   */
  open<T>(options: ReportOptions<T>): Observable<HttpResponse<Blob>> {
    return this.reportPort.generate(options).pipe(
      tap((response) => {
        const fileName = FileMapperUtil.extractFileName(response);
        if (response.body) {
          if (FileMapperUtil.isLegacyBrowser()) {
            FileMapperUtil.downloadFile(response.body, fileName);
          } else {
            FileMapperUtil.openFile(response.body, fileName);
          }
        }
      }),
    );
  }

  /**
   * Genera un PDF y lo abre automáticamente (shortcut)
   *
   * Método de conveniencia para el caso común de generar y abrir PDFs.
   * Equivalente a llamar open() con format: 'pdf'.
   *
   * @template T - Tipo de datos del reporte
   * @param data - Datos del reporte (resultado de ReportParamsBuilder.build().data)
   * @param useV1Api - Si debe usar la API v1 (por defecto false)
   * @returns Observable que se completa después de abrir el PDF
   *
   * @example
   * ```typescript
   * const reportOptions = ReportParamsBuilder.build(
   *   { codDoc: ELECTRONIC_DOCUMENT_CODE.FV, id: 123 },
   *   'pdf'
   * );
   *
   * // Forma corta
   * this.reportFacade.openPDF(
   *   reportOptions.data,
   *   reportOptions.useV1Api
   * ).subscribe();
   * ```
   */
  openPDF<T>(data: T, useV1Api = false): Observable<HttpResponse<Blob>> {
    return this.open({
      data,
      format: 'pdf',
      useV1Api,
    });
  }

  /**
   * Genera un Excel y lo descarga automáticamente (shortcut)
   *
   * Método de conveniencia para el caso común de generar y descargar archivos Excel.
   * Equivalente a llamar download() con format: 'excel'.
   *
   * @template T - Tipo de datos del reporte
   * @param data - Datos del reporte (resultado de ReportParamsBuilder.build().data)
   * @param useV1Api - Si debe usar la API v1 (por defecto false)
   * @returns Observable que se completa después de iniciar la descarga
   *
   * @example
   * ```typescript
   * const reportOptions = ReportParamsBuilder.build(
   *   { codDoc: SALE_CODE_REPORT.FG, fechaInicio: '2024-01-01' },
   *   'excel'
   * );
   *
   * // Forma corta
   * this.reportFacade.downloadExcel(
   *   reportOptions.data,
   *   reportOptions.useV1Api
   * ).subscribe();
   * ```
   */
  downloadExcel<T>(data: T, useV1Api = false): Observable<HttpResponse<Blob>> {
    return this.download({
      data,
      format: 'excel',
      useV1Api,
    });
  }

  /**
   * Genera un Word y lo descarga automáticamente (shortcut)
   *
   * Método de conveniencia para el caso común de generar y descargar archivos Word.
   * Equivalente a llamar download() con format: 'word'.
   *
   * @template T - Tipo de datos del reporte
   * @param data - Datos del reporte (resultado de ReportParamsBuilder.build().data)
   * @param useV1Api - Si debe usar la API v1 (por defecto false)
   * @returns Observable que se completa después de iniciar la descarga
   *
   * @example
   * ```typescript
   * const reportOptions = ReportParamsBuilder.build(
   *   { codDoc: CUSTOMER_CODE_REPORT.RCL },
   *   'word'
   * );
   *
   * // Forma corta
   * this.reportFacade.downloadWord(
   *   reportOptions.data,
   *   reportOptions.useV1Api
   * ).subscribe();
   * ```
   */
  downloadWord<T>(data: T, useV1Api = false): Observable<HttpResponse<Blob>> {
    return this.download({
      data,
      format: 'word',
      useV1Api,
    });
  }
}
