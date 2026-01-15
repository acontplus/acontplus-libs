// Tipos base para WhatsApp - alineados con la API real
export interface WhatsAppTextRequest {
  to: string;
  message: string;
  previewUrl?: boolean;
}

export interface WhatsAppTextTemplateRequest {
  to: string;
  templateName: string;
  languageCode?: string;
  bodyParams?: string[];
}

export interface WhatsAppDocumentRequest {
  to: string;
  documentUrl: string;
  caption?: string;
  filename?: string;
}

export interface WhatsAppDocumentTemplateRequest {
  to: string;
  templateName: string;
  languageCode?: string;
  filename?: string;
  bodyParams?: string[];
  file: File;
}

export interface WhatsAppResponse {
  success: boolean;
  messageId?: string;
  phoneNumber?: string;
  error?: {
    code: number;
    message: string;
  };
}

export interface WhatsAppStatusResponse {
  enabled: boolean;
  provider: string;
}

// Tipos para casos de uso específicos
export interface DocumentDeliveryParams {
  phone: string;
  file: File;
  customerName: string;
  establishmentName: string;
  documentSeries: string;
  documentType: string;
}

// Alias para compatibilidad con nombres anteriores
export type WhatsAppTextMessage = WhatsAppTextRequest;
export type WhatsAppTemplateMessage = WhatsAppTextTemplateRequest;
export type WhatsAppDocumentMessage = WhatsAppDocumentRequest;
export type WhatsAppDocumentTemplateMessage = WhatsAppDocumentTemplateRequest;
export type WhatsAppMessageResponse = WhatsAppResponse;
export type WhatsAppProviderStatus = WhatsAppStatusResponse;
