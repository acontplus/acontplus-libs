import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ButtonType, ButtonVariant, MaterialButtonStyle } from '../../types/button-type';
import { REPORT_FORMAT } from '../../enums';

@Component({
  selector: 'acp-button',
  imports: [
    MatButton,
    NgClass,
    MatIcon,
    MatMiniFabButton,
    MatIconButton,
    MatFabButton,
    NgTemplateOutlet,
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Button {
  variant = input<ButtonVariant>('primary');
  text = input<string>('');
  icon = input<string>('');
  disabled = input<boolean>(false);
  type = input<ButtonType>('button');
  matStyle = input<MaterialButtonStyle>('elevated');
  customClass = input<string | undefined>();

  // Report format support - automatically sets icon and variant based on report type
  reportFormat = input<REPORT_FORMAT | undefined>();

  extended = input<boolean>(false); // For extended FAB
  title = input<string>('');
  ariaLabel = input<string>('');
  name = input<string>('');
  id = input<string>('');
  form = input<string>('');
  tabIndex = input<number>(0);
  testId = input<string>('');

  handleClick = output<unknown>();

  /**
   * Gets the icon to display. If reportFormat is provided and no explicit icon is set,
   * returns the appropriate icon for the report format.
   */
  getIcon(): string {
    const explicitIcon = this.icon();
    if (explicitIcon) {
      return explicitIcon;
    }

    const format = this.reportFormat();
    if (format) {
      return this.getReportIcon(format);
    }

    return '';
  }

  /**
   * Gets the variant to use. If reportFormat is provided and variant is still 'primary' (default),
   * returns the appropriate variant for the report format.
   */
  getVariant(): ButtonVariant {
    const format = this.reportFormat();
    const currentVariant = this.variant();

    // Only auto-apply report variant if user hasn't explicitly set a variant
    if (format && currentVariant === 'primary') {
      return this.getReportVariant(format);
    }

    return currentVariant;
  }

  /**
   * Gets the title to display. If reportFormat is provided, automatically appends
   * the format name to the title (e.g., "Export PDF", "Download Excel").
   */
  getTitle(): string {
    const baseTitle = this.title();
    const format = this.reportFormat();

    if (format && baseTitle) {
      const formatName = this.getReportFormatName(format);
      return `${baseTitle} - ${formatName}`;
    }

    if (format && !baseTitle) {
      return this.getReportFormatName(format);
    }

    return baseTitle;
  }

  /**
   * Maps report format to appropriate icon
   */
  private getReportIcon(format: REPORT_FORMAT): string {
    switch (format) {
      case REPORT_FORMAT.PDF:
        return 'picture_as_pdf';
      case REPORT_FORMAT.EXCEL:
        return 'table_view';
      case REPORT_FORMAT.WORD:
        return 'description';
      case REPORT_FORMAT.IMAGE:
        return 'image';
      case REPORT_FORMAT.XML:
        return 'code';
      case REPORT_FORMAT.CSV:
        return 'grid_on';
      case REPORT_FORMAT.MHTML:
        return 'web';
      case REPORT_FORMAT.HTML:
        return 'html';
      default:
        return 'download';
    }
  }

  /**
   * Maps report format to appropriate button variant/color
   */
  private getReportVariant(format: REPORT_FORMAT): ButtonVariant {
    switch (format) {
      case REPORT_FORMAT.PDF:
        return 'danger';
      case REPORT_FORMAT.EXCEL:
      case REPORT_FORMAT.CSV:
        return 'success';
      case REPORT_FORMAT.WORD:
        return 'primary';
      case REPORT_FORMAT.IMAGE:
      case REPORT_FORMAT.HTML:
        return 'info';
      case REPORT_FORMAT.XML:
        return 'warning';
      case REPORT_FORMAT.MHTML:
        return 'secondary';
      default:
        return 'secondary';
    }
  }

  /**
   * Maps report format to human-readable name
   */
  private getReportFormatName(format: REPORT_FORMAT): string {
    switch (format) {
      case REPORT_FORMAT.PDF:
        return 'PDF';
      case REPORT_FORMAT.EXCEL:
        return 'Excel';
      case REPORT_FORMAT.WORD:
        return 'Word';
      case REPORT_FORMAT.IMAGE:
        return 'Image';
      case REPORT_FORMAT.XML:
        return 'XML';
      case REPORT_FORMAT.CSV:
        return 'CSV';
      case REPORT_FORMAT.MHTML:
        return 'MHTML';
      case REPORT_FORMAT.HTML:
        return 'HTML';
      default:
        return 'File';
    }
  }

  getButtonClasses(): Record<string, boolean> {
    const classes: Record<string, boolean> = {
      [`mat-btn-${this.getVariant()}`]: true,
    };
    const customClass = this.customClass();
    if (customClass) {
      classes[customClass] = true;
    }
    return classes;
  }

  getDisplayText(): string {
    const style = this.matStyle();
    if (style === 'icon' || style === 'fab' || style === 'mini-fab') {
      return '';
    }
    return this.text();
  }
}
