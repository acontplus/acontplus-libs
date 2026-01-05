import { BaseVo } from './base.vo';

/**
 * Generates a UUID v4 with fallback for environments where crypto.randomUUID() is not available.
 * Uses crypto.randomUUID() when available, falls back to manual UUID generation.
 */
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for older environments (Node.js < 19, older browsers)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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
