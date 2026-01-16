import { InjectionToken } from '@angular/core';
import { ReportPort } from '../contracts/report.port';

export const REPORT_PORT = new InjectionToken<ReportPort>('REPORT_PORT');
