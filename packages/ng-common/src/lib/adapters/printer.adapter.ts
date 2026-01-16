import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrinterPort, PrintParams, ApiResponse } from '../contracts/printer.port';
import { API_PATHS, DOCUMENT_TYPES } from '../constants/api-paths';

@Injectable()
export class PrinterAdapter implements PrinterPort {
  private readonly http = inject(HttpClient);

  askToPrint(obj: PrintParams): void {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('¿Desea Imprimir este comprobante?');
      if (confirmed) {
        this.getPrintConfig(obj).subscribe();
      }
    }
  }

  getPrintConfig(obj: PrintParams): Observable<ApiResponse> {
    const json = JSON.stringify({
      codDoc: obj.codDoc,
      getUrlPrintServer: true,
      id: obj.id,
      codEstab: obj.codEstab,
    });

    return new Observable((observer) => {
      const url = `${API_PATHS.CONFIG}Print/?json=${json}`;
      this.http.get<ApiResponse>(url).subscribe({
        next: (response) => {
          if (response.code === '0') {
            console.warn(response.message);
          }
          if (response.code === '1') {
            this.print(response.payload as string, obj).subscribe();
          }
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          console.error(err);
          observer.error(err);
        },
      });
    });
  }

  print(urlPrinter: string, paramsToPrint: PrintParams): Observable<ApiResponse> {
    return new Observable((observer) => {
      this.http.post<ApiResponse>(`${urlPrinter}/Print`, paramsToPrint).subscribe({
        next: (response) => {
          console.log({
            type: response.code === '1' ? 'success' : 'warning',
            message: response.message,
          });
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          console.error(err);
          observer.error(err);
        },
      });
    });
  }

  createPrintOrder(id: number): void {
    this.getPrintConfig({
      id,
      documentoId: 0,
      tipo: 5,
      codDoc: DOCUMENT_TYPES.NORMAL,
    }).subscribe();
  }

  createPrintCommanda(id: number): void {
    this.getPrintConfig({
      id,
      documentoId: 0,
      tipo: 6,
      codDoc: DOCUMENT_TYPES.NORMAL,
    }).subscribe();
  }

  createPrintOrderWithCommanda(id: number): void {
    this.getPrintConfig({
      id,
      documentoId: 0,
      tipo: 2,
      codDoc: DOCUMENT_TYPES.NORMAL,
    }).subscribe();
  }

  createInvoicePrint(id: number, documentoId: number): void {
    this.getPrintConfig({
      id,
      documentoId,
      tipo: 3,
      codDoc: DOCUMENT_TYPES.FACTURA,
    }).subscribe();
  }

  createNotaEntregaPrint(id: number, documentoId: number): void {
    this.getPrintConfig({
      id,
      documentoId,
      tipo: 4,
      codDoc: DOCUMENT_TYPES.NOTA_ENTREGA,
    }).subscribe();
  }
}
