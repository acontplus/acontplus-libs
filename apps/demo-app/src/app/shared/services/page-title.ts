import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable({ providedIn: 'root' })
export class ComponentPageTitleService {
  private bodyTitle = inject(Title);

  _title = '';
  _originalTitle = 'AcontPlus Angular Material library';

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title && this.capitalizeTitle(title);
    if (title !== '') {
      title = `${this._title} | AcontPlus Angular Material `;
    } else {
      title = this._originalTitle;
    }
    this.bodyTitle.setTitle(title);
  }

  capitalizeTitle(title: string): string {
    return title
      .split('-')
      .join(' ')
      .replace(/\b\w+\b/g, word => word.substring(0, 1).toUpperCase() + word.substring(1));
  }
}
