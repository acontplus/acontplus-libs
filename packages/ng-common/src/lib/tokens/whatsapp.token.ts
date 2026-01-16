import { InjectionToken } from '@angular/core';
import { WhatsAppMessagingPort } from '../contracts/whatsapp.port';

export const WHATSAPP_MESSAGING_PORT = new InjectionToken<WhatsAppMessagingPort>(
  'WHATSAPP_MESSAGING_PORT',
);
