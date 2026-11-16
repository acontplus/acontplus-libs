import { TestBed } from '@angular/core/testing';

import { AcpLogo } from './logo';
import { provideAcpLogo } from './logo.tokens';
import { ACP_LAYOUT_CONFIG } from '../layout/layout/layout.config';

const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2" width="10" height="2" onload="x()">' +
  '<script>x()</script><path style="fill: var(--acp-logo-color, red)" d="M0 0h10v2H0z"/></svg>';

async function render(inputs: Record<string, string>, src?: string) {
  TestBed.configureTestingModule({ providers: src ? [provideAcpLogo({ src })] : [] });
  const fixture = TestBed.createComponent(AcpLogo);
  for (const [key, value] of Object.entries(inputs)) fixture.componentRef.setInput(key, value);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('AcpLogo', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('inlines an SVG without scripts, handlers or fixed size', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(SVG)),
    );
    const host = await render({ label: 'Brand' }, '/logo.svg');

    const svg = host.querySelector('svg');
    expect(fetch).toHaveBeenCalledWith('/logo.svg', expect.anything());
    expect(host.getAttribute('aria-label')).toBe('Brand');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.hasAttribute('width')).toBe(false);
    expect(svg?.hasAttribute('onload')).toBe(false);
    expect(svg?.querySelector('script')).toBeNull();
    expect(svg?.querySelector('path')).not.toBeNull();
  });

  it('renders other formats as an image', async () => {
    vi.stubGlobal('fetch', vi.fn());
    const host = await render({ src: '/logo.png' });

    expect(host.querySelector('img')?.getAttribute('src')).toBe('/logo.png');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('falls back to an image when the SVG cannot be loaded', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('', { status: 404 })),
    );
    const host = await render({ src: '/missing.svg' });

    const img = host.querySelector('img');
    expect(img?.getAttribute('src')).toBe('/missing.svg');

    img?.dispatchEvent(new Event('error'));
    TestBed.tick();
    expect(host.querySelector('img')).toBeNull();
  });

  it('shows the branding name as text without an image', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ACP_LAYOUT_CONFIG, useValue: { branding: { name: 'AcontPlus' } } }],
    });
    const host = await render({});

    expect(host.querySelector('.acp-logo__text')?.textContent).toBe('AcontPlus');
    expect(host.getAttribute('aria-label')).toBe('AcontPlus');
  });
});
