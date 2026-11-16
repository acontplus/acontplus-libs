import { TestBed } from '@angular/core/testing';
import { ACP_LAYOUT_CONFIG } from './layout.config';
import { AcpLayoutSettings } from './layout-settings';

describe('AcpLayoutSettings', () => {
  const key = 'acp-layout-test';
  const html = document.documentElement;

  function create(defaults = {}) {
    TestBed.configureTestingModule({
      providers: [{ provide: ACP_LAYOUT_CONFIG, useValue: { storageKey: key, defaults } }],
    });
    const settings = TestBed.inject(AcpLayoutSettings);
    TestBed.tick();
    return settings;
  }

  afterEach(() => {
    localStorage.removeItem(key);
    html.className = '';
    html.removeAttribute('style');
  });

  it('merges the configured defaults with the stored options', () => {
    localStorage.setItem(key, JSON.stringify({ navPos: 'top', unknown: true }));
    const settings = create({ themeColor: 'pink' });

    expect(settings.options().navPos).toBe('top');
    expect(settings.options().themeColor).toBe('pink');
    expect('unknown' in settings.options()).toBe(false);
  });

  it('persists the changes and reflects them on <html>', () => {
    const settings = create();
    settings.set({ theme: 'dark', themeColor: 'green', boxed: true, dir: 'rtl', radius: 16 });
    TestBed.tick();

    expect(JSON.parse(localStorage.getItem(key)!).themeColor).toBe('green');
    expect(html.classList.contains('theme-green')).toBe(true);
    expect(html.classList.contains('theme-blue')).toBe(false);
    expect(html.classList.contains('theme-dark')).toBe(true);
    expect(html.classList.contains('acp-boxed')).toBe(true);
    expect(html.style.colorScheme).toBe('dark');
    expect(html.dir).toBe('rtl');
    expect(html.style.getPropertyValue('--acp-skin-radius')).toBe('16px');
  });

  it('reset restores the defaults and clears the storage', () => {
    const settings = create({ navPos: 'top' });
    settings.set({ navPos: 'side' });
    settings.reset();

    expect(settings.options().navPos).toBe('top');
    expect(localStorage.getItem(key)).toBeNull();
  });
});
