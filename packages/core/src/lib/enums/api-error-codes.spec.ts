import { describe, it, expect } from 'vitest';
import { ApiErrorCode, getLocalizedErrorMessage, hasLocalizedMessage } from './api-error-codes';
import { Language } from './language';

describe('ApiErrorCode', () => {
  it('has all error codes matching the .NET backend middleware', () => {
    const expected = [
      'UNHANDLED_ERROR',
      'BAD_REQUEST',
      'UNAUTHORIZED',
      'FORBIDDEN',
      'NOT_FOUND',
      'CONFLICT',
      'METHOD_NOT_ALLOWED',
      'VALIDATION_ERROR',
      'RATE_LIMITED',
      'INTERNAL_ERROR',
      'SERVICE_UNAVAILABLE',
      'TIMEOUT',
      'NETWORK_ERROR',
    ];
    expected.forEach(code => {
      expect(ApiErrorCode[code as keyof typeof ApiErrorCode]).toBe(code);
    });
  });

  it('has exactly 13 error codes', () => {
    const codes = Object.keys(ApiErrorCode).filter(k => isNaN(Number(k)));
    expect(codes.length).toBe(13);
  });
});

describe('getLocalizedErrorMessage', () => {
  it('returns English messages by default', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.NOT_FOUND)).toBe('Resource not found');
    expect(getLocalizedErrorMessage(ApiErrorCode.BAD_REQUEST)).toBe('Invalid request');
    expect(getLocalizedErrorMessage(ApiErrorCode.INTERNAL_ERROR)).toBe('Internal server error');
    expect(getLocalizedErrorMessage(ApiErrorCode.NETWORK_ERROR)).toBe(
      'Unable to connect to the server. Please check your network connection.',
    );
  });

  it('returns Spanish messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.NOT_FOUND, Language.Spanish)).toBe(
      'Recurso no encontrado',
    );
    expect(getLocalizedErrorMessage(ApiErrorCode.UNAUTHORIZED, Language.Spanish)).toBe(
      'Autenticación requerida',
    );
    expect(getLocalizedErrorMessage(ApiErrorCode.SERVICE_UNAVAILABLE, Language.Spanish)).toBe(
      'Servicio no disponible',
    );
  });

  it('returns Spanish Latin America messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.CONFLICT, Language.SpanishLatinAmerica)).toBe(
      'Conflicto detectado',
    );
    expect(
      getLocalizedErrorMessage(ApiErrorCode.VALIDATION_ERROR, Language.SpanishLatinAmerica),
    ).toBe('Validación fallida');
  });

  it('returns French messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.FORBIDDEN, Language.French)).toBe('Accès refusé');
    expect(getLocalizedErrorMessage(ApiErrorCode.TIMEOUT, Language.French)).toBe('Délai dépassé');
  });

  it('returns German messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.INTERNAL_ERROR, Language.German)).toBe(
      'Interner Serverfehler',
    );
    expect(getLocalizedErrorMessage(ApiErrorCode.RATE_LIMITED, Language.German)).toBe(
      'Zu viele Anfragen',
    );
  });

  it('returns Portuguese messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.UNHANDLED_ERROR, Language.Portuguese)).toBe(
      'Ocorreu um erro inesperado',
    );
    expect(getLocalizedErrorMessage(ApiErrorCode.METHOD_NOT_ALLOWED, Language.Portuguese)).toBe(
      'Método não permitido',
    );
  });

  it('returns Japanese messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.SERVICE_UNAVAILABLE, Language.Japanese)).toBe(
      'サービス利用不可',
    );
  });

  it('returns Korean messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.UNAUTHORIZED, Language.Korean)).toBe(
      '인증이 필요합니다',
    );
  });

  it('returns Chinese Simplified messages', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.INTERNAL_ERROR, Language.ChineseSimplified)).toBe(
      '服务器内部错误',
    );
  });

  it('returns the error code itself when no translation exists', () => {
    expect(getLocalizedErrorMessage('CUSTOM_UNKNOWN_CODE', Language.English)).toBe(
      'CUSTOM_UNKNOWN_CODE',
    );
    expect(getLocalizedErrorMessage('CUSTOM_UNKNOWN_CODE', Language.Spanish)).toBe(
      'CUSTOM_UNKNOWN_CODE',
    );
  });

  it('falls back to English for unsupported language', () => {
    expect(getLocalizedErrorMessage(ApiErrorCode.NOT_FOUND, 999 as Language)).toBe(
      'Resource not found',
    );
  });

  it('has complete translations for all defined languages and error codes', () => {
    const languages = Object.values(Language).filter(v => typeof v === 'number') as Language[];
    const codes = Object.values(ApiErrorCode);

    for (const lang of languages) {
      for (const code of codes) {
        const message = getLocalizedErrorMessage(code, lang);
        expect(message).toBeTruthy();
        expect(typeof message).toBe('string');
      }
    }
  });
});

describe('hasLocalizedMessage', () => {
  it('returns true for known codes', () => {
    expect(hasLocalizedMessage(ApiErrorCode.BAD_REQUEST)).toBe(true);
    expect(hasLocalizedMessage(ApiErrorCode.UNAUTHORIZED)).toBe(true);
    expect(hasLocalizedMessage(ApiErrorCode.NETWORK_ERROR)).toBe(true);
  });

  it('returns false for unknown codes', () => {
    expect(hasLocalizedMessage('CUSTOM_CODE')).toBe(false);
    expect(hasLocalizedMessage('')).toBe(false);
  });
});
