export interface PhoneValidationResult {
  isValid: boolean;
  cleanPhone: string;
  errorMessage?: string;
}

/**
 * Utilidades para formateo y validación de números telefónicos
 */
export class PhoneFormatterUtil {
  /**
   * Limpia el teléfono removiendo todos los caracteres no numéricos
   */
  static cleanPhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  /**
   * Valida si un teléfono ecuatoriano es válido
   */
  static validateEcuadorianPhone(phone: string): PhoneValidationResult {
    const cleanPhone = this.cleanPhone(phone);

    if (!cleanPhone) {
      return {
        isValid: false,
        cleanPhone,
        errorMessage: 'El número de celular no puede estar vacío',
      };
    }

    if (cleanPhone.length < 10) {
      return {
        isValid: false,
        cleanPhone,
        errorMessage: 'El número de celular no puede ser menor a diez dígitos',
      };
    }

    if (cleanPhone.length > 10) {
      return {
        isValid: false,
        cleanPhone,
        errorMessage: 'El número de celular no puede ser mayor a diez dígitos',
      };
    }

    // Validar formato ecuatoriano (09xxxxxxxx) o internacional (593xxxxxxxxx)
    const isValidEcuadorian = /^09\d{8}$/.test(cleanPhone);
    const isValidInternational = /^593\d{9}$/.test(cleanPhone);

    if (!isValidEcuadorian && !isValidInternational) {
      return {
        isValid: false,
        cleanPhone,
        errorMessage: 'Formato inválido. Use: 09xxxxxxxx',
      };
    }

    return {
      isValid: true,
      cleanPhone,
    };
  }

  /**
   * Convierte número local ecuatoriano a formato internacional
   */
  static toInternationalFormat(phone: string): string {
    let cleanPhone = this.cleanPhone(phone);

    // Si empieza con 0, convertir a formato internacional ecuatoriano
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '593' + cleanPhone.slice(1);
    }

    return cleanPhone;
  }

  /**
   * Formatea teléfono para la API de WhatsApp Business (con @c.us)
   */
  static formatForWhatsAppApi(phone: string): string {
    const internationalPhone = this.toInternationalFormat(phone);

    if (!internationalPhone.endsWith('@c.us')) {
      return `${internationalPhone}@c.us`;
    }

    return internationalPhone;
  }

  /**
   * Formatea teléfono para WhatsApp Web (sin @c.us)
   */
  static formatForWhatsAppWeb(phone: string): string {
    return this.toInternationalFormat(phone);
  }

  /**
   * Formatea teléfono para mostrar al usuario (con espacios y +)
   */
  static formatForDisplay(phone: string): string {
    const cleanPhone = this.cleanPhone(phone);

    if (!cleanPhone) return '';

    // Si es número local ecuatoriano (09xxxxxxxx)
    if (/^09\d{8}$/.test(cleanPhone)) {
      return `+593 ${cleanPhone.slice(1, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6)}`;
    }

    // Si ya tiene formato internacional (593xxxxxxxxx)
    if (/^593\d{9}$/.test(cleanPhone)) {
      return `+593 ${cleanPhone.slice(3, 5)} ${cleanPhone.slice(5, 8)} ${cleanPhone.slice(8)}`;
    }

    // Para otros formatos internacionales
    if (cleanPhone.length > 10) {
      return `+${cleanPhone}`;
    }

    return phone;
  }

  /**
   * Validación general para teléfonos internacionales
   */
  static isValidInternationalPhone(phone: string): boolean {
    const cleanPhone = this.cleanPhone(phone);
    return /^\+?[1-9]\d{1,14}$/.test(cleanPhone);
  }

  /**
   * Genera el hint apropiado según el estado del teléfono
   */
  static getPhoneHint(phone: string): string {
    if (!phone) {
      return 'Ingrese número ecuatoriano (09xxxxxxxx)';
    }

    const validation = this.validateEcuadorianPhone(phone);

    if (validation.isValid) {
      return `Se enviará a: ${this.formatForDisplay(phone)}`;
    }

    return 'Formato: 09xxxxxxxx';
  }

  /**
   * Obtiene el placeholder para el campo de teléfono
   */
  static getPhonePlaceholder(): string {
    return 'Ej: 0987654321';
  }
}
