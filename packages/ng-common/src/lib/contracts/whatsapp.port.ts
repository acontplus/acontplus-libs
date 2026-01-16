import { Observable } from 'rxjs';
import {
  WhatsAppTextRequest,
  WhatsAppTextTemplateRequest,
  WhatsAppDocumentRequest,
  WhatsAppDocumentTemplateRequest,
  WhatsAppResponse,
  WhatsAppStatusResponse,
} from '../models/whatsapp.model';

/**
 * Puerto para proveedores de WhatsApp
 * Define la interfaz que deben implementar todos los adaptadores (Meta, Green, etc.)
 */
export interface WhatsAppMessagingPort {
  // Métodos que coinciden con tu API real
  sendText(request: WhatsAppTextRequest): Observable<WhatsAppResponse>;
  sendTextTemplate(request: WhatsAppTextTemplateRequest): Observable<WhatsAppResponse>;
  sendDocument(request: WhatsAppDocumentRequest): Observable<WhatsAppResponse>;
  sendDocumentTemplate(request: WhatsAppDocumentTemplateRequest): Observable<WhatsAppResponse>;
  getStatus(): Observable<WhatsAppStatusResponse>;
}
