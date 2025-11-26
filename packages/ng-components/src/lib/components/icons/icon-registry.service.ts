import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { catchError, of, Observable, firstValueFrom } from 'rxjs';
import type { IconDefinition } from '@acontplus/ui-kit';

export interface IconRegistryConfig {
  /**
   * Fallback icon to show when requested icon is not found
   */
  fallbackIcon?: string;
  /**
   * Show console warnings when icons are not found
   */
  showWarnings?: boolean;
  /**
   * Base URL for loading icons from external sources
   */
  iconBaseUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly http = inject(HttpClient, { optional: true });
  private readonly registry = new Map<string, string>();
  private readonly pendingLoads = new Map<string, Observable<string | null>>();

  private config: IconRegistryConfig = {
    showWarnings: true,
  };

  /**
   * Configure the icon registry
   */
  configure(config: IconRegistryConfig): void {
    this.config = { ...this.config, ...config };

    // Register fallback icon if provided
    if (config.fallbackIcon && !this.registry.has('__fallback__')) {
      this.registerIcon('__fallback__', config.fallbackIcon);
    }
  }

  /**
   * Register a single icon
   */
  registerIcon(name: string, svgData: string): void {
    this.registry.set(name, svgData);
  }

  /**
   * Register multiple icons at once
   */
  registerIcons(icons: IconDefinition[]): void {
    icons.forEach(({ name, data }) => this.registerIcon(name, data));
  }

  /**
   * Load an icon from a URL
   */
  async loadIconFromUrl(name: string, url: string): Promise<boolean> {
    if (!this.http) {
      console.error('HttpClient not available. Did you provide it in your app config?');
      return false;
    }

    try {
      const svgData = await firstValueFrom(
        this.http.get(url, { responseType: 'text' }).pipe(
          catchError(error => {
            console.error(`Failed to load icon "${name}" from ${url}:`, error);
            return of(null);
          }),
        ),
      );

      if (svgData) {
        this.registerIcon(name, svgData);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error loading icon "${name}":`, error);
      return false;
    }
  }

  /**
   * Load multiple icons from URLs
   */
  async loadIconsFromUrls(icons: { name: string; url: string }[]): Promise<void> {
    const promises = icons.map(({ name, url }) => this.loadIconFromUrl(name, url));
    await Promise.all(promises);
  }

  /**
   * Get a sanitized icon by name
   * If icon is not found, attempts to load from configured base URL or returns fallback
   */
  getIcon(name: string): SafeHtml | null {
    // Check if icon exists in registry
    const svgData = this.registry.get(name);
    if (svgData) {
      return this.sanitizer.sanitize(1, svgData) as SafeHtml;
    }

    // Icon not found - show warning if enabled
    if (this.config.showWarnings) {
      console.warn(
        `Icon "${name}" not found in registry. ${
          this.config.fallbackIcon ? 'Using fallback icon.' : 'No fallback configured.'
        }`,
      );
    }

    // Return fallback icon if configured
    if (this.registry.has('__fallback__')) {
      const fallbackData = this.registry.get('__fallback__');
      return this.sanitizer.sanitize(1, fallbackData!) as SafeHtml;
    }

    // Return null if no fallback
    return null;
  }

  /**
   * Get icon with automatic online loading if not found
   */
  async getIconAsync(name: string): Promise<SafeHtml | null> {
    // Check if icon exists
    if (this.hasIcon(name)) {
      return this.getIcon(name);
    }

    // Try to load from base URL if configured
    if (this.config.iconBaseUrl && this.http) {
      const url = `${this.config.iconBaseUrl}/${name}.svg`;
      const loaded = await this.loadIconFromUrl(name, url);

      if (loaded) {
        return this.getIcon(name);
      }
    }

    // Return fallback or null
    return this.getIcon(name);
  }

  /**
   * Check if an icon exists in the registry
   */
  hasIcon(name: string): boolean {
    return this.registry.has(name);
  }

  /**
   * Get all registered icon names
   */
  getRegisteredIcons(): string[] {
    return Array.from(this.registry.keys()).filter(name => name !== '__fallback__');
  }

  /**
   * Clear all registered icons
   */
  clearRegistry(): void {
    this.registry.clear();
  }

  /**
   * Remove a specific icon from the registry
   */
  removeIcon(name: string): boolean {
    return this.registry.delete(name);
  }
}
