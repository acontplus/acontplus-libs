import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { PreloaderService, SettingsService } from '@core';
import { App } from './app';

describe('App', () => {
  const settings = {
    setDirection: vi.fn(),
    setTheme: vi.fn(),
    setThemeColor: vi.fn(),
  };
  const preloader = { hide: vi.fn() };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: SettingsService, useValue: settings },
        { provide: PreloaderService, useValue: preloader },
      ],
    }).compileComponents();
  });

  it('initializes settings and hides the preloader', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(settings.setDirection).toHaveBeenCalledOnce();
    expect(settings.setTheme).toHaveBeenCalledOnce();
    expect(settings.setThemeColor).toHaveBeenCalledOnce();
    expect(preloader.hide).toHaveBeenCalledOnce();
  });
});
