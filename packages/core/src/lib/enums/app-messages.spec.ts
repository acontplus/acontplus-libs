import { describe, it, expect } from 'vitest';
import { AppMessageKey, getLocalizedAppMessage, hasAppMessage } from './app-messages';
import { Language } from './language';

describe('AppMessageKey', () => {
  it('has exactly 22 message keys', () => {
    const keys = Object.keys(AppMessageKey).filter(k => isNaN(Number(k)));
    expect(keys.length).toBe(22);
  });

  it('covers all interceptor and notification messages', () => {
    const required = [
      'OPERATION_COMPLETED',
      'UNEXPECTED_ERROR',
      'CONNECTION_ERROR',
      'SERVER_ERROR',
      'ERROR',
      'NETWORK_UNAVAILABLE',
      'DATA_SAVED',
      'DATA_UPDATED',
      'ITEM_DELETED',
      'ITEM_CREATED',
      'UPLOADED',
      'SYNCED',
      'FAILED_SAVE',
      'FAILED_DELETE',
      'FAILED_UPDATE',
      'FAILED_UPLOAD',
      'UNSAVED_CHANGES',
      'SESSION_EXPIRING',
      'VALIDATION_ERROR_MESSAGE',
      'UNAUTHORIZED_ACCESS',
      'LOADING',
      'PROCESSING',
    ];
    required.forEach(key => {
      expect(AppMessageKey[key as keyof typeof AppMessageKey]).toBe(key);
    });
  });
});

describe('getLocalizedAppMessage', () => {
  it('returns English by default', () => {
    expect(getLocalizedAppMessage(AppMessageKey.OPERATION_COMPLETED)).toBe(
      'Operation completed successfully',
    );
    expect(getLocalizedAppMessage(AppMessageKey.DATA_SAVED)).toBe('Data saved successfully');
    expect(getLocalizedAppMessage(AppMessageKey.CONNECTION_ERROR)).toBe('Connection Error');
    expect(getLocalizedAppMessage(AppMessageKey.UNEXPECTED_ERROR)).toBe(
      'An unexpected error occurred',
    );
  });

  it('returns Spanish messages', () => {
    expect(getLocalizedAppMessage(AppMessageKey.OPERATION_COMPLETED, Language.Spanish)).toBe(
      'Operación completada exitosamente',
    );
    expect(getLocalizedAppMessage(AppMessageKey.DATA_SAVED, Language.Spanish)).toBe(
      'Datos guardados exitosamente',
    );
    expect(getLocalizedAppMessage(AppMessageKey.CONNECTION_ERROR, Language.Spanish)).toBe(
      'Error de conexión',
    );
    expect(getLocalizedAppMessage(AppMessageKey.ERROR, Language.Spanish)).toBe('Error');
    expect(getLocalizedAppMessage(AppMessageKey.UNSAVED_CHANGES, Language.Spanish)).toBe(
      'Tiene cambios sin guardar',
    );
  });

  it('returns French messages', () => {
    expect(getLocalizedAppMessage(AppMessageKey.OPERATION_COMPLETED, Language.French)).toBe(
      'Opération terminée avec succès',
    );
    expect(getLocalizedAppMessage(AppMessageKey.SERVER_ERROR, Language.French)).toBe(
      'Erreur du serveur',
    );
    expect(getLocalizedAppMessage(AppMessageKey.LOADING, Language.French)).toBe(
      'Chargement des données...',
    );
  });

  it('returns German messages', () => {
    expect(getLocalizedAppMessage(AppMessageKey.DATA_UPDATED, Language.German)).toBe(
      'Daten erfolgreich aktualisiert',
    );
    expect(getLocalizedAppMessage(AppMessageKey.NETWORK_UNAVAILABLE, Language.German)).toBe(
      'Keine Verbindung zum Server möglich. Bitte überprüfen Sie Ihre Netzwerkverbindung.',
    );
  });

  it('returns Italian messages', () => {
    expect(getLocalizedAppMessage(AppMessageKey.ITEM_DELETED, Language.Italian)).toBe(
      'Elemento eliminato con successo',
    );
    expect(getLocalizedAppMessage(AppMessageKey.SESSION_EXPIRING, Language.Italian)).toBe(
      'La sessione sta per scadere',
    );
  });

  it('returns Portuguese messages', () => {
    expect(getLocalizedAppMessage(AppMessageKey.ITEM_CREATED, Language.Portuguese)).toBe(
      'Item criado com sucesso',
    );
    expect(getLocalizedAppMessage(AppMessageKey.PROCESSING, Language.Portuguese)).toBe(
      'Processando solicitação...',
    );
  });

  it('returns the key itself for unknown AppMessageKey', () => {
    expect(getLocalizedAppMessage('UNKNOWN_KEY' as AppMessageKey)).toBe('UNKNOWN_KEY');
  });

  it('falls back to English for unsupported languages', () => {
    expect(getLocalizedAppMessage(AppMessageKey.OPERATION_COMPLETED, Language.Japanese)).toBe(
      'Operation completed successfully',
    );
    expect(getLocalizedAppMessage(AppMessageKey.ERROR, Language.Korean)).toBe('Error');
  });

  it('has complete translations for all defined languages', () => {
    const definedLangs = [
      Language.English,
      Language.Spanish,
      Language.SpanishLatinAmerica,
      Language.French,
      Language.German,
      Language.Italian,
      Language.Portuguese,
    ];
    const keys = Object.values(AppMessageKey);

    for (const lang of definedLangs) {
      for (const key of keys) {
        const message = getLocalizedAppMessage(key, lang);
        expect(message).toBeTruthy();
        expect(typeof message).toBe('string');
        expect(message).not.toBe(key);
      }
    }
  });

  it('all messages are non-empty and unique within each language', () => {
    const definedLangs = [
      Language.English,
      Language.Spanish,
      Language.French,
      Language.German,
      Language.Italian,
      Language.Portuguese,
    ];

    for (const lang of definedLangs) {
      const values = Object.values(AppMessageKey).map(key =>
        getLocalizedAppMessage(key as AppMessageKey, lang),
      );
      expect(values.every(v => v.length > 0)).toBe(true);
      expect(new Set(values).size).toBe(values.length);
    }
  });
});

describe('hasAppMessage', () => {
  it('returns true for known keys', () => {
    expect(hasAppMessage(AppMessageKey.OPERATION_COMPLETED)).toBe(true);
    expect(hasAppMessage(AppMessageKey.NETWORK_UNAVAILABLE)).toBe(true);
    expect(hasAppMessage(AppMessageKey.PROCESSING)).toBe(true);
  });

  it('returns false for unknown keys', () => {
    expect(hasAppMessage('FAKE_KEY' as AppMessageKey)).toBe(false);
  });
});
