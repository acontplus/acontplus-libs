import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WHATSAPP_MESSAGING_PORT } from '../tokens/whatsapp.token';
import { WhatsAppResponse, DocumentDeliveryParams } from '../models/whatsapp.model';
import { WhatsAppMessageBuilder } from '../builders/whatsapp-message.builder';
import { PhoneFormatterUtil } from '../utils/phone-formatter.util';

@Injectable({ providedIn: 'root' })
export class WhatsAppMessagingFacade {
  private readonly messagingPort = inject(WHATSAPP_MESSAGING_PORT);

  // Métodos de alto nivel con lógica de negocio
  sendSimpleText(to: string, message: string, previewUrl = true): Observable<WhatsAppResponse> {
    const formattedPhone = PhoneFormatterUtil.formatForWhatsAppApi(to);
    return this.messagingPort.sendText({
      to: formattedPhone,
      message,
      previewUrl,
    });
  }

  sendTemplateText(
    to: string,
    templateName: string,
    params?: string[],
    languageCode = 'es_EC',
  ): Observable<WhatsAppResponse> {
    const formattedPhone = PhoneFormatterUtil.formatForWhatsAppApi(to);
    return this.messagingPort.sendTextTemplate({
      to: formattedPhone,
      templateName,
      languageCode,
      bodyParams: params,
    });
  }

  sendDocument(
    to: string,
    documentUrl: string,
    caption?: string,
    filename?: string,
  ): Observable<WhatsAppResponse> {
    const formattedPhone = PhoneFormatterUtil.formatForWhatsAppApi(to);
    return this.messagingPort.sendDocument({
      to: formattedPhone,
      documentUrl,
      caption,
      filename,
    });
  }

  // Caso de uso específico: Entrega de documentos
  deliverDocument(params: DocumentDeliveryParams): Observable<WhatsAppResponse> {
    const formattedPhone = PhoneFormatterUtil.formatForWhatsAppApi(params.phone);
    const messages = WhatsAppMessageBuilder.buildDocumentDeliveryMessages({
      comprador: params.customerName,
      establecimiento: params.establishmentName,
      serie: params.documentSeries,
      tipo: params.documentType,
    });

    return this.messagingPort.sendDocumentTemplate({
      to: formattedPhone,
      file: params.file,
      templateName: 'notificacion_documento',
      languageCode: 'es_EC',
      bodyParams: [messages.main, messages.promo],
    });
  }

  // Método mejorado para envío de documentos con template
  sendDocumentWithTemplate(params: {
    phone: string;
    file: File;
    templateName: string;
    bodyParams?: string[];
    languageCode?: string;
    filename?: string;
  }): Observable<WhatsAppResponse> {
    const formattedPhone = PhoneFormatterUtil.formatForWhatsAppApi(params.phone);

    return this.messagingPort.sendDocumentTemplate({
      to: formattedPhone,
      file: params.file,
      templateName: params.templateName,
      languageCode: params.languageCode || 'es_EC',
      bodyParams: params.bodyParams,
      filename: params.filename,
    });
  }

  // Método legacy para compatibilidad (pero mejorado)
  sendDocumentWithMessages(params: {
    phone: string;
    file: File;
    messages: { main: string; promo: string };
  }): Observable<WhatsAppResponse> {
    return this.sendDocumentWithTemplate({
      phone: params.phone,
      file: params.file,
      templateName: 'documento_generico',
      bodyParams: [params.messages.main, params.messages.promo],
    });
  }

  getProviderStatus(): Observable<any> {
    return this.messagingPort.getStatus();
  }

  // Métodos públicos que delegan a las utilidades estáticas
  isValidPhone(phone: string): boolean {
    return PhoneFormatterUtil.isValidInternationalPhone(phone);
  }

  toDisplayFormat(phone: string): string {
    return PhoneFormatterUtil.formatForDisplay(phone);
  }
}
