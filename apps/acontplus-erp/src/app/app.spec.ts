import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { PreloaderService } from '@core';
import { App } from './app';

describe('App', () => {
  const preloader = { hide: vi.fn() };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: PreloaderService, useValue: preloader }],
    }).compileComponents();
  });

  it('hides the preloader', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(preloader.hide).toHaveBeenCalledOnce();
  });
});
