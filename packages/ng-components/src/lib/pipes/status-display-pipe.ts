import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';

type StatusGender = 'male' | 'female' | 'neutral';

interface StatusOptions {
  gender?: StatusGender;
  showIcon?: boolean;
  customActiveText?: string;
  customInactiveText?: string;
  textClass?: string;
  iconClass?: string;
}

type TranslationKey =
  | 'status.active'
  | 'status.inactive'
  | 'status.active.male'
  | 'status.active.female'
  | 'status.inactive.male'
  | 'status.inactive.female';

@Pipe({
  name: 'statusDisplay',
})
export class StatusDisplayPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly transloco = inject(TranslocoService, { optional: true });

  transform(isActive: boolean, options: StatusOptions = {}): SafeHtml {
    const {
      gender = 'neutral',
      showIcon = true,
      customActiveText,
      customInactiveText,
      textClass = '',
      iconClass = '',
    } = options;

    const text = this.getStatusText(isActive, gender, customActiveText, customInactiveText);
    const icon = isActive ? 'check_circle' : 'cancel';
    const colorClass = isActive ? 'text-green-500' : 'text-red-500';
    const sanitizedIconClass = this.sanitizeClassName(iconClass);
    const sanitizedTextClass = this.sanitizeClassName(textClass);
    const combinedIconClass = `${colorClass} align-middle mr-1 ${sanitizedIconClass}`.trim();
    const combinedTextClass = `align-middle ${sanitizedTextClass}`.trim();

    let html = '';

    if (showIcon) {
      html += `<mat-icon class="${combinedIconClass}" fontIcon="${icon}"></mat-icon>`;
    }

    html += `<span class="${combinedTextClass}">${text}</span>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private getStatusText(
    isActive: boolean,
    gender: StatusGender,
    customActive?: string,
    customInactive?: string,
  ): string {
    if (customActive && isActive) {
      return this.sanitizer.sanitize(SecurityContext.HTML, customActive) || customActive;
    }
    if (customInactive && !isActive) {
      return this.sanitizer.sanitize(SecurityContext.HTML, customInactive) || customInactive;
    }
    if (!this.transloco) return this.getFallbackText(isActive, gender);

    const translationKey = this.getTranslationKey(isActive, gender);
    const translation = this.transloco.translate(translationKey);

    return translation === translationKey ? this.getFallbackText(isActive, gender) : translation;
  }

  private getTranslationKey(isActive: boolean, gender: StatusGender): TranslationKey {
    const base = isActive ? 'status.active' : 'status.inactive';
    return gender === 'neutral'
      ? (base as TranslationKey)
      : (`${base}.${gender}` as TranslationKey);
  }

  private getFallbackText(isActive: boolean, gender: StatusGender): string {
    const lang = this.transloco?.getActiveLang() || 'en';
    const isSpanish = lang.startsWith('es');

    if (!isSpanish) {
      return isActive ? 'Active' : 'Inactive';
    }

    if (isActive) {
      return gender === 'female' ? 'Activa' : 'Activo';
    } else {
      return gender === 'female' ? 'Inactiva' : 'Inactivo';
    }
  }

  private sanitizeClassName(className: string): string {
    // Only allow alphanumeric characters, hyphens, underscores, and spaces
    // This prevents CSS injection through class names
    return className.replace(/[^a-zA-Z0-9_-\s]/g, '');
  }
}
