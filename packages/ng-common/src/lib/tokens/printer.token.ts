import { InjectionToken } from '@angular/core';
import { PrinterPort } from '../contracts/printer.port';

export const PRINTER_PORT = new InjectionToken<PrinterPort>('PRINTER_PORT');
