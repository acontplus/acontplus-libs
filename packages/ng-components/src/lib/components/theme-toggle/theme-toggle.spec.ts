import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { ThemeToggle } from './theme-toggle';
import { ThemeSwitcher } from '../../services';

describe('ThemeToggle', () => {
  let component: ThemeToggle;
  let fixture: ComponentFixture<ThemeToggle>;
  let mockThemeSwitcher: jest.Mocked<ThemeSwitcher>;
  let isDarkModeSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isDarkModeSubject = new BehaviorSubject<boolean>(false);
    mockThemeSwitcher = {
      isDarkMode$: isDarkModeSubject.asObservable(),
      toggleDarkMode: jest.fn(),
    } as unknown as jest.Mocked<ThemeSwitcher>;

    await TestBed.configureTestingModule({
      imports: [ThemeToggle],
      providers: [{ provide: ThemeSwitcher, useValue: mockThemeSwitcher }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {
    it('should display dark mode icon when in light mode', () => {
      const icon = fixture.debugElement.query(By.css('mat-icon'));
      expect(icon.nativeElement.textContent.trim()).toBe('dark_mode');
    });

    it('should have correct aria-label when in light mode', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Switch to dark mode');
    });

    it('should have aria-pressed set to false when in light mode', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-pressed')).toBe('false');
    });
  });

  describe('dark mode state', () => {
    beforeEach(() => {
      isDarkModeSubject.next(true);
      fixture.detectChanges();
    });

    it('should display light mode icon when in dark mode', () => {
      const icon = fixture.debugElement.query(By.css('mat-icon'));
      expect(icon.nativeElement.textContent.trim()).toBe('light_mode');
    });

    it('should have correct aria-label when in dark mode', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Switch to light mode');
    });

    it('should have aria-pressed set to true when in dark mode', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('toggle functionality', () => {
    it('should call toggleDarkMode when button is clicked', () => {
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(mockThemeSwitcher.toggleDarkMode).toHaveBeenCalled();
    });
  });

  describe('custom inputs', () => {
    it('should use custom light mode icon', () => {
      isDarkModeSubject.next(true);
      fixture.componentRef.setInput('lightModeIcon', 'wb_sunny');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('mat-icon'));
      expect(icon.nativeElement.textContent.trim()).toBe('wb_sunny');
    });

    it('should use custom dark mode icon', () => {
      fixture.componentRef.setInput('darkModeIcon', 'nightlight');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('mat-icon'));
      expect(icon.nativeElement.textContent.trim()).toBe('nightlight');
    });

    it('should use custom light mode label', () => {
      isDarkModeSubject.next(true);
      fixture.componentRef.setInput('lightModeLabel', 'Modo claro');
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Modo claro');
    });

    it('should use custom dark mode label', () => {
      fixture.componentRef.setInput('darkModeLabel', 'Modo oscuro');
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Modo oscuro');
    });

    it('should add data-testid when provided', () => {
      fixture.componentRef.setInput('testId', 'theme-toggle-btn');
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('data-testid')).toBe('theme-toggle-btn');
    });

    it('should not add data-testid when not provided', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.hasAttribute('data-testid')).toBe(false);
    });
  });

  describe('host element', () => {
    it('should have acp-theme-toggle class on host', () => {
      expect(fixture.nativeElement.classList.contains('acp-theme-toggle')).toBe(true);
    });
  });
});
