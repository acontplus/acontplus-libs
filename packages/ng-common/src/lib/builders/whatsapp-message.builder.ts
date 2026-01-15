export interface DocumentDeliveryData {
  comprador: string;
  establecimiento: string;
  serie: string;
  tipo: string;
}

export interface WhatsAppMessages {
  main: string;
  promo: string;
}

/**
 * Builder para construir mensajes de WhatsApp
 * Clase utilitaria con métodos estáticos
 */
export class WhatsAppMessageBuilder {
  static buildDocumentDeliveryMessages(data: DocumentDeliveryData): WhatsAppMessages {
    const main = this.buildMainMessage(data);
    const promo = this.buildPromoMessage(data.establecimiento);

    return { main, promo };
  }

  static buildWelcomeMessage(customerName: string, establishmentName: string): string {
    return `¡Hola *${customerName}*! 👋\n\nBienvenido a *${establishmentName}*. Estamos aquí para ayudarte.`;
  }

  static buildOrderConfirmationMessage(orderNumber: string, customerName: string): string {
    return `Estimado(a) *${customerName}*,\n\n✅ Tu pedido #${orderNumber} ha sido confirmado.\n\nTe notificaremos cuando esté listo.`;
  }

  static buildPaymentReminderMessage(
    customerName: string,
    amount: number,
    dueDate: string,
  ): string {
    return `Estimado(a) *${customerName}*,\n\n💰 Recordatorio de pago:\nMonto: ${amount}\nVencimiento: ${dueDate}\n\nGracias por tu preferencia.`;
  }

  private static buildMainMessage(data: DocumentDeliveryData): string {
    const documentTypeDisplay = this.getDocumentTypeDisplay(data.tipo);

    return (
      `Estimado(a) *${data.comprador}*,\n\n` +
      `📄 Su ${documentTypeDisplay} ha sido generado exitosamente.\n\n` +
      `🏪 Establecimiento: *${data.establecimiento}*\n` +
      `📋 Serie: ${data.serie}\n\n` +
      `Adjunto encontrará el documento solicitado.`
    );
  }

  private static buildPromoMessage(establishmentName: string): string {
    return (
      `📱 Documento enviado por *${establishmentName}*\n` +
      `Powered by *Acontplus* 🚀\n\n` +
      `¿Necesita ayuda? Contáctenos.`
    );
  }

  private static getDocumentTypeDisplay(tipo: string): string {
    const types: Record<string, string> = {
      FACTURA: 'factura electrónica',
      NOTA_ENTREGA: 'nota de entrega',
      PROFORMA: 'proforma',
      COTIZACION: 'cotización',
      RECIBO: 'recibo',
    };

    return types[tipo] || 'documento';
  }
}
