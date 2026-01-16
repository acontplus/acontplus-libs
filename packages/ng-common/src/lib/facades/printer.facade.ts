import { Injectable, inject } from '@angular/core';
import { PRINTER_PORT } from '../tokens/printer.token';
import { PrintParams } from '../contracts/printer.port';

@Injectable({ providedIn: 'root' })
export class PrinterFacade {
  private readonly printerPort = inject(PRINTER_PORT);

  // Métodos de impresión
  askToPrint(params: PrintParams): void {
    this.printerPort.askToPrint(params);
  }

  printOrder(id: number): void {
    this.printerPort.createPrintOrder(id);
  }

  printCommanda(id: number): void {
    this.printerPort.createPrintCommanda(id);
  }

  printOrderWithCommanda(id: number): void {
    this.printerPort.createPrintOrderWithCommanda(id);
  }

  printInvoice(id: number, documentoId: number): void {
    this.printerPort.createInvoicePrint(id, documentoId);
  }

  printNotaEntrega(id: number, documentoId: number): void {
    this.printerPort.createNotaEntregaPrint(id, documentoId);
  }

  // Método para configurar automáticamente la impresión
  autoPrint(
    data: { printerAutomatic: boolean; orderId: number; idDocumento: number },
    codDoc: string,
  ): void {
    if (data.printerAutomatic) {
      if (codDoc === 'FACTURA') {
        this.printInvoice(data.orderId, data.idDocumento);
      }
      if (codDoc === 'NOTA_ENTREGA') {
        this.printNotaEntrega(data.orderId, data.idDocumento);
      }
    }
  }
}
