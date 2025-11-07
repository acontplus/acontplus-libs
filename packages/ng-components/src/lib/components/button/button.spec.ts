import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';
import { REPORT_FORMAT } from '../../enums';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Report Format Support', () => {
    it('should return correct icon for PDF report format', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.PDF);
      expect(component.getIcon()).toBe('picture_as_pdf');
    });

    it('should return correct icon for Excel report format', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.EXCEL);
      expect(component.getIcon()).toBe('table_view');
    });

    it('should return correct icon for Word report format', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.WORD);
      expect(component.getIcon()).toBe('description');
    });

    it('should return correct variant for PDF report format', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.PDF);
      expect(component.getVariant()).toBe('danger');
    });

    it('should return correct variant for Excel report format', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.EXCEL);
      expect(component.getVariant()).toBe('success');
    });

    it('should return correct variant for Word report format', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.WORD);
      expect(component.getVariant()).toBe('primary');
    });

    it('should prefer explicit icon over report format icon', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.PDF);
      fixture.componentRef.setInput('icon', 'custom_icon');
      expect(component.getIcon()).toBe('custom_icon');
    });

    it('should prefer explicit variant over report format variant', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.PDF);
      fixture.componentRef.setInput('variant', 'success');
      expect(component.getVariant()).toBe('success');
    });

    it('should return empty icon when no icon or reportFormat is set', () => {
      expect(component.getIcon()).toBe('');
    });

    it('should return default variant when no reportFormat is set', () => {
      expect(component.getVariant()).toBe('primary');
    });

    it('should append report format to title when both are provided', () => {
      fixture.componentRef.setInput('title', 'Export Report');
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.PDF);
      expect(component.getTitle()).toBe('Export Report - PDF');
    });

    it('should return only format name when reportFormat is set but no title', () => {
      fixture.componentRef.setInput('reportFormat', REPORT_FORMAT.EXCEL);
      expect(component.getTitle()).toBe('Excel');
    });

    it('should return title when no reportFormat is set', () => {
      fixture.componentRef.setInput('title', 'Custom Title');
      expect(component.getTitle()).toBe('Custom Title');
    });

    it('should return empty string when no title or reportFormat is set', () => {
      expect(component.getTitle()).toBe('');
    });
  });
});
