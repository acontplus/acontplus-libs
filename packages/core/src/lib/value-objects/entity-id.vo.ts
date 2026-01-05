import { BaseVo } from './base.vo';

/**
 * Generates a UUID v4 using cryptographically secure methods.
 * 1. crypto.randomUUID() (Node.js 19+, modern browsers)
 * 2. crypto.getRandomValues() (Node.js 15+, all modern browsers)
 */
function generateUUID(): string {
  // Modern browsers and Node.js 19+
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Modern browsers and Node.js 15+
  const cryptoObj =
    typeof crypto !== 'undefined'
      ? crypto
      : (typeof globalThis !== 'undefined' && globalThis.crypto) ||
        (typeof window !== 'undefined' && window.crypto) ||
        null;

  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const array = new Uint8Array(1);
      cryptoObj.getRandomValues(array);
      const r = array[0] % 16;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  throw new Error('Crypto API not available - modern environment required');
}

export class EntityIdVo extends BaseVo<string> {
  constructor(value: string) {
    super(value);
  }

  static generate(): EntityIdVo {
    return new EntityIdVo(generateUUID());
  }

  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('EntityIdVo cannot be empty');
    }
  }
}
