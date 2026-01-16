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

/**
 * Adaptador para Green API (legacy)
 * Implementa la interfaz WhatsApp usando Green API
 */
@Injectable()
export class GreenWhatsAppAdapter implements WhatsAppMessagingPort {
  private readonly http = inject(HttpClient);

  // Implementación para Green API - mapea los métodos de WhatsApp a Green
  sendText(request: WhatsAppTextRequest): Observable<WhatsAppResponse> {
    // Mapear a Green API call
    return this.http.post<WhatsAppResponse>('/api/green/send-text', {
      chatId: request.to,
      message: request.message,
    });
  }

  sendTextTemplate(request: WhatsAppTextTemplateRequest): Observable<WhatsAppResponse> {
    // Green API no soporta templates, enviar como texto simple
    return this.http.post<WhatsAppResponse>('/api/green/send-text', {
      chatId: request.to,
      message: `Template: ${request.templateName}`,
    });
  }

  sendDocument(request: WhatsAppDocumentRequest): Observable<WhatsAppResponse> {
    return this.http.post<WhatsAppResponse>('/api/green/send-file', {
      chatId: request.to,
      fileUrl: request.documentUrl,
      caption: request.caption,
    });
  }

  sendDocumentTemplate(request: WhatsAppDocumentTemplateRequest): Observable<WhatsAppResponse> {
    // Green API - enviar archivo con template como caption
    const formData = new FormData();
    formData.append('chatId', request.to);
    formData.append('file', request.file);
    formData.append('caption', `Template: ${request.templateName}`);

    return this.http.post<WhatsAppResponse>('/api/green/send-file-upload', formData);
  }

  getStatus(): Observable<WhatsAppStatusResponse> {
    return this.http.get<WhatsAppStatusResponse>('/api/green/status');
  }
}
