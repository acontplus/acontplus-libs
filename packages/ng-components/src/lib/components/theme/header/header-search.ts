import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * AcpHeaderSearch Component
 *
 * Search input component for the header.
 *
 * @example
 * ```html
 * <acp-header-search
 *   [placeholder]="'Search...'"
 *   (search)="onSearch($event)"
 * />
 * ```
 */
@Component({
  selector: 'acp-header-search',
  template: `
    <div class="acp-header__search" [class.acp-header__search--expanded]="expanded()">
      @if (!expanded()) {
        <button mat-icon-button (click)="toggleExpanded()">
          <mat-icon>search</mat-icon>
        </button>
      }
      <input
        type="text"
        class="acp-header__search-input"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
        (keyup.enter)="onSearch($event)"
        (blur)="onBlur()"
      />
      @if (value()) {
        <button mat-icon-button class="acp-header__search-clear" (click)="clear()">
          <mat-icon>close</mat-icon>
        </button>
      }
    </div>
  `,
  host: { class: 'acp-header-search' },
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  styles: [
    `
      .acp-header__search {
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background-color 0.2s ease;
      }

      .acp-header__search-toggle {
        color: rgba(255, 255, 255, 0.7);
      }

      .acp-header__search-toggle:hover {
        color: #fff;
      }

      .acp-header__search-input {
        width: 0;
        opacity: 0;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        outline: none;
        color: #fff;
        font-size: 14px;
        padding: 6px 12px;
        transition:
          width 0.3s ease,
          opacity 0.3s ease,
          background-color 0.2s ease;
      }

      .acp-header__search-input:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
      }

      .acp-header__search-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      .acp-header__search--expanded .acp-header__search-input {
        width: 200px;
        opacity: 1;
      }

      .acp-header__search-clear {
        width: 24px;
        height: 24px;
      }

      .acp-header__search-clear .mat-icon {
        font-size: 18px;
      }

      @media (max-width: 768px) {
        .acp-header__search--expanded .acp-header__search-input {
          width: 120px;
        }
      }
    `,
  ],
})
export class AcpHeaderSearch {
  readonly expanded = signal(false);

  /**
   * Placeholder text for the search input.
   * @default 'Search...'
   */
  readonly placeholder = input('Search...');

  /**
   * Current value of the search input.
   */
  readonly value = input('');

  /**
   * Event emitted when search is submitted.
   */
  readonly searchSubmit = output<string>();

  /**
   * Event emitted when input value changes.
   */
  readonly valueChange = output<string>();

  toggleExpanded() {
    this.expanded.set(!this.expanded());
    if (this.expanded()) {
      // Focus the input when expanded
      setTimeout(() => {
        const input = document.querySelector('.acp-header__search-input') as HTMLInputElement;
        if (input) {
          input.focus();
        }
      });
    }
  }

  onBlur() {
    // Collapse when input loses focus and is empty
    if (!this.value()) {
      this.expanded.set(false);
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubmit.emit(value);
  }

  clear() {
    this.searchSubmit.emit('');
  }
}
