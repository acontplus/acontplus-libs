import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WhatsAppMessagingPort } from '../contracts/whatsapp.port';
import {
  WhatsAppTextRequest,
  WhatsAppTextTemplateRequest,
  WhatsAppDocumentRequest,
  WhatsAppDocumentTemplateRequest,
  WhatsAppResponse,
  WhatsAppStatusResponse,
} from '../models/whatsapp.model';
import { API_PATHS } from '../constants/api-paths';

@Injectable()
export class MetaWhatsAppAdapter implements WhatsAppMessagingPort {
  private readonly http = inject(HttpClient);

  // 1. Texto directo (requiere ventana 24h)
  sendText(request: WhatsAppTextRequest): Observable<WhatsAppResponse> {
    return this.http.post<WhatsAppResponse>(`${API_PATHS.WHATSAPP}/text`, request);
  }

  // 2. Texto con template (funciona siempre)
  sendTextTemplate(request: WhatsAppTextTemplateRequest): Observable<WhatsAppResponse> {
    return this.http.post<WhatsAppResponse>(`${API_PATHS.WHATSAPP}/text-template`, request);
  }

  // 3. Documento directo via URL (requiere ventana 24h)
  sendDocument(request: WhatsAppDocumentRequest): Observable<WhatsAppResponse> {
    return this.http.post<WhatsAppResponse>(`${API_PATHS.WHATSAPP}/document`, request);
  }

  // 4. Documento con template (funciona siempre)
  sendDocumentTemplate(request: WhatsAppDocumentTemplateRequest): Observable<WhatsAppResponse> {
    const formData = new FormData();

    // Usar nombres de campos que espera tu API (con mayúsculas)
    formData.append('To', request.to);
    formData.append('File', request.file);

    if (request.templateName) formData.append('TemplateName', request.templateName);
    if (request.languageCode) formData.append('LanguageCode', request.languageCode);
    if (request.filename) formData.append('Filename', request.filename);

    // Enviar bodyParams como array (formato que espera tu API)
    if (request.bodyParams && request.bodyParams.length > 0) {
      request.bodyParams.forEach((param, index) => {
        formData.append(`BodyParams[${index}]`, param);
      });
    }

    return this.http.post<WhatsAppResponse>(`${API_PATHS.WHATSAPP}/document-template`, formData);
  }

  getStatus(): Observable<WhatsAppStatusResponse> {
    return this.http.get<WhatsAppStatusResponse>(`${API_PATHS.WHATSAPP}/status`);
  }
}
