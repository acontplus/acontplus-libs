import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Language item interface
 */
export interface AcpLanguageItem {
  code: string;
  name: string;
  flag?: string;
  active?: boolean;
}

/**
 * AcpHeaderLanguage Component
 *
 * Language selector for the header.
 *
 * @example
 * ```html
 * <acp-header-language
 *   [languages]="languages"
 *   [currentLanguage]="currentLanguage"
 *   (languageChange)="onLanguageChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'acp-header-language',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" class="acp-header__language-button">
      @if (currentLanguage()?.flag) {
        <span class="acp-header__language-flag">{{ currentLanguage()!.flag }}</span>
      } @else {
        <mat-icon>language</mat-icon>
      }
    </button>

    <mat-menu #menu="matMenu" class="acp-header__language-menu">
      @for (language of languages(); track language.code) {
        <button
          mat-menu-item
          [class.acp-header__language-item--active]="language.active"
          (click)="handleLanguageChange(language)"
        >
          @if (language.flag) {
            <span class="acp-header__language-flag">{{ language.flag }}</span>
          }
          <span>{{ language.name }}</span>
          @if (language.active) {
            <mat-icon class="acp-header__language-check">check</mat-icon>
          }
        </button>
      }
    </mat-menu>
  `,
  host: { class: 'acp-header-language' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class AcpHeaderLanguage {
  /**
   * Array of available languages.
   */
  readonly languages = input<AcpLanguageItem[]>([]);

  /**
   * Currently selected language.
   */
  readonly currentLanguage = input<AcpLanguageItem>();

  /**
   * Event emitted when language is changed.
   */
  readonly languageChange = output<AcpLanguageItem>();

  handleLanguageChange(language: AcpLanguageItem) {
    this.languageChange.emit(language);
  }
}
