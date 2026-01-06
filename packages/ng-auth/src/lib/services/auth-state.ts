// src/lib/services/auth-state.ts
import { Injectable, inject, signal, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, catchError, throwError } from 'rxjs';
import { AuthRepository } from '../domain/repositories/auth-repository';
import { AuthTokenRepositoryImpl } from '../repositories/auth-token-repository-impl';
import { AuthUrlRedirect } from './auth-url-redirect';
import { AuthTokens, UserData, DecodedToken } from '@acontplus/core';
import { ENVIRONMENT } from '@acontplus/ng-config';
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  MfaSetupResponse,
  VerifyMfaRequest,
  SocialLoginRequest,
  SocialProvider,
  SocialAuthUrl,
  DomainDiscoveryResponse,
  OAuthConfig,
  TenantConfig,
} from '../domain/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthState implements OnDestroy {
  private readonly authRepository = inject(AuthRepository);
  private readonly tokenRepository = inject(AuthTokenRepositoryImpl);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly urlRedirectService = inject(AuthUrlRedirect);
  private readonly environment = inject(ENVIRONMENT);

  // Authentication state signals
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _user = signal<UserData | null>(null);
  private readonly _mfaRequired = signal<boolean>(false);
  private readonly _emailVerified = signal<boolean>(true);

  // Public readonly signals
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly user = this._user.asReadonly();
  readonly mfaRequired = this._mfaRequired.asReadonly();
  readonly emailVerified = this._emailVerified.asReadonly();

  // Private refresh token timeout
  private refreshTokenTimeout?: number;
  private refreshInProgress$?: Observable<AuthTokens | null>;

  constructor() {
    this.initializeAuthentication();
  }

  // ============================================
  // Core Authentication
  // ============================================

  /**
   * Login with email and password
   */
  login(request: LoginRequest): Observable<AuthTokens> {
    this._isLoading.set(true);

    return this.authRepository.login(request).pipe(
      tap((tokens) => {
        this.setAuthenticated(tokens, request.rememberMe ?? false);
        this.urlRedirectService.redirectToIntendedUrl('/');
      }),
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Register a new user
   */
  register(request: RegisterRequest): Observable<AuthTokens> {
    this._isLoading.set(true);

    return this.authRepository.register(request).pipe(
      tap((tokens) => {
        this.setAuthenticated(tokens);
        this._emailVerified.set(false); // New users need email verification
        this.router.navigate(['/']);
      }),
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Logout user and clear all authentication data
   */
  logout(): Observable<void> {
    const userData = this.tokenRepository.getUserData();
    const refreshToken = this.tokenRepository.getRefreshToken();

    if (userData?.email && refreshToken && refreshToken.length > 0) {
      return this.authRepository.logout(userData.email, refreshToken).pipe(
        tap(() => this.performClientLogout()),
        catchError(() => {
          this.performClientLogout();
          return of(void 0);
        }),
      );
    }

    this.performClientLogout();
    return of(void 0);
  }

  /**
   * Refresh authentication tokens
   */
  refreshToken(): Observable<AuthTokens | null> {
    if (this.refreshInProgress$) {
      return this.refreshInProgress$;
    }

    const userData = this.tokenRepository.getUserData();
    const refreshToken = this.tokenRepository.getRefreshToken();

    if (!userData?.email || !refreshToken) {
      this.performClientLogout();
      return of(null);
    }

    this.refreshInProgress$ = this.authRepository
      .refreshToken({ email: userData.email, refreshToken })
      .pipe(
        tap((tokens) => {
          const rememberMe = this.tokenRepository.isRememberMeEnabled();
          this.setAuthenticated(tokens, rememberMe);
        }),
        catchError(() => {
          this.performClientLogout();
          return of(null);
        }),
        tap({
          complete: () => (this.refreshInProgress$ = undefined),
          error: () => (this.refreshInProgress$ = undefined),
        }),
      );

    return this.refreshInProgress$;
  }

  // ============================================
  // Password Management
  // ============================================

  /**
   * Request password reset email
   */
  forgotPassword(request: ForgotPasswordRequest): Observable<void> {
    this._isLoading.set(true);

    return this.authRepository.forgotPassword(request).pipe(
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Reset password with token
   */
  resetPassword(request: ResetPasswordRequest): Observable<void> {
    this._isLoading.set(true);

    return this.authRepository.resetPassword(request).pipe(
      tap(() => this.router.navigate([`/${this.environment.loginRoute}`])),
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Change password for authenticated user
   */
  changePassword(request: ChangePasswordRequest): Observable<void> {
    this._isLoading.set(true);

    return this.authRepository.changePassword(request).pipe(
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  // ============================================
  // Email Verification
  // ============================================

  /**
   * Verify email with token
   */
  verifyEmail(request: VerifyEmailRequest): Observable<void> {
    this._isLoading.set(true);

    return this.authRepository.verifyEmail(request).pipe(
      tap(() => this._emailVerified.set(true)),
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Resend verification email
   */
  resendVerificationEmail(request: ResendVerificationRequest): Observable<void> {
    this._isLoading.set(true);

    return this.authRepository.resendVerificationEmail(request).pipe(
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  // ============================================
  // MFA/2FA
  // ============================================

  /**
   * Setup MFA for authenticated user
   */
  setupMfa(): Observable<MfaSetupResponse> {
    this._isLoading.set(true);

    return this.authRepository.setupMfa().pipe(
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Verify MFA code and complete login
   */
  verifyMfa(request: VerifyMfaRequest): Observable<AuthTokens> {
    this._isLoading.set(true);

    return this.authRepository.verifyMfa(request).pipe(
      tap((tokens) => {
        this.setAuthenticated(tokens);
        this._mfaRequired.set(false);
        this.urlRedirectService.redirectToIntendedUrl('/');
      }),
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Disable MFA for authenticated user
   */
  disableMfa(code: string): Observable<void> {
    this._isLoading.set(true);

    return this.authRepository.disableMfa(code).pipe(
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  // ============================================
  // Social Login
  // ============================================

  /**
   * Get social authentication URL
   * @param provider - Social provider (google, microsoft, etc.)
   * @param config - Optional OAuth configuration with tenant/domain information
   */
  getSocialAuthUrl(
    provider: SocialProvider,
    config?: Partial<OAuthConfig>,
  ): Observable<SocialAuthUrl> {
    return this.authRepository.getSocialAuthUrl(provider, config);
  }

  /**
   * Complete social login with provider tokens
   */
  socialLogin(request: SocialLoginRequest): Observable<AuthTokens> {
    this._isLoading.set(true);

    return this.authRepository.socialLogin(request).pipe(
      tap((tokens) => {
        this.setAuthenticated(tokens, true);
        this.urlRedirectService.redirectToIntendedUrl('/');
      }),
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  // ============================================
  // Multi-Tenant / Domain Discovery
  // ============================================

  /**
   * Discover authentication method and tenant information based on email domain
   * This is useful for multi-tenant scenarios where different domains use different identity providers
   *
   * Example: User enters "user@acme.com" -> discovers it should use Google Workspace OAuth
   *
   * @param email - User's email address
   * @returns Discovery response with provider, tenant info, and authentication options
   */
  discoverDomain(email: string): Observable<DomainDiscoveryResponse> {
    this._isLoading.set(true);

    return this.authRepository.discoverDomain({ email }).pipe(
      tap({ finalize: () => this._isLoading.set(false) }),
      catchError((error) => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Get tenant configuration for OAuth setup
   *
   * @param tenantId - Unique tenant identifier
   * @returns Tenant configuration including OAuth client ID, issuer, allowed domains, etc.
   */
  getTenantConfig(tenantId: string): Observable<TenantConfig> {
    return this.authRepository.getTenantConfig(tenantId);
  }

  /**
   * List all configured tenants (useful for selecting tenant in login UI)
   *
   * @returns Array of available tenant configurations
   */
  listTenants(): Observable<TenantConfig[]> {
    return this.authRepository.listTenants();
  }

  /**
   * Start OAuth flow for multi-tenant authentication
   * This method redirects the user to the provider's OAuth consent screen
   *
   * Example usage for Google Workspace:
   * ```typescript
   * authState.discoverDomain('user@acme.com').subscribe(discovery => {
   *   if (discovery.requiresOAuth) {
   *     authState.startOAuthFlow({
   *       provider: discovery.provider!,
   *       tenantId: discovery.tenantId,
   *       domain: discovery.domain
   *     });
   *   }
   * });
   * ```
   *
   * @param config - OAuth configuration with provider, tenant, and domain information
   */
  startOAuthFlow(config: {
    provider: SocialProvider;
    tenantId?: string;
    domain?: string;
    redirectUri?: string;
  }): void {
    this._isLoading.set(true);

    this.getSocialAuthUrl(config.provider, config).subscribe({
      next: (authUrl) => {
        // Store OAuth state for callback verification
        if (authUrl.state) {
          sessionStorage.setItem('oauth_state', authUrl.state);
        }
        if (config.tenantId) {
          sessionStorage.setItem('oauth_tenant_id', config.tenantId);
        }
        if (config.domain) {
          sessionStorage.setItem('oauth_domain', config.domain);
        }

        // Redirect to provider OAuth consent screen
        window.location.href = authUrl.url;
      },
      error: (error) => {
        this._isLoading.set(false);
        console.error('Failed to get OAuth URL:', error);
      },
    });
  }

  /**
   * Handle OAuth callback after user returns from provider
   * Call this method in your OAuth callback component/route
   *
   * Example:
   * ```typescript
   * // In your callback component
   * ngOnInit() {
   *   const params = new URLSearchParams(window.location.search);
   *   const code = params.get('code');
   *   const state = params.get('state');
   *   const provider = 'google'; // or get from route params
   *
   *   if (code && state) {
   *     this.authState.handleOAuthCallback(provider, code, state).subscribe();
   *   }
   * }
   * ```
   *
   * @param provider - Social provider that initiated the OAuth flow
   * @param code - Authorization code from OAuth callback
   * @param state - State parameter for CSRF protection
   * @returns Observable with authentication tokens
   */
  handleOAuthCallback(
    provider: SocialProvider,
    code: string,
    state: string,
  ): Observable<AuthTokens> {
    this._isLoading.set(true);

    // Verify state to prevent CSRF attacks
    const storedState = sessionStorage.getItem('oauth_state');
    if (storedState !== state) {
      this._isLoading.set(false);
      return throwError(() => new Error('Invalid OAuth state - possible CSRF attack'));
    }

    // Get stored OAuth context
    const tenantId = sessionStorage.getItem('oauth_tenant_id') || undefined;
    const domain = sessionStorage.getItem('oauth_domain') || undefined;

    // Clear stored OAuth data
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('oauth_tenant_id');
    sessionStorage.removeItem('oauth_domain');

    // Complete social login
    return this.socialLogin({
      provider,
      code,
      state,
      tenantId,
      domain,
    });
  }

  // ============================================
  // State Management
  // ============================================

  /**
   * Set authentication state after successful login
   */
  setAuthenticated(tokens: AuthTokens, rememberMe = false): void {
    this.tokenRepository.saveTokens(tokens, rememberMe);
    this._isAuthenticated.set(true);
    const userData = this.tokenRepository.getUserData();
    this._user.set(userData);
    this.scheduleTokenRefresh();
  }

  /**
   * Check if user is authenticated
   */
  checkAuthentication(): boolean {
    const isAuthenticated = this.tokenRepository.isAuthenticated();
    this._isAuthenticated.set(isAuthenticated);

    if (!isAuthenticated) {
      this.performClientLogout();
    }

    return isAuthenticated;
  }

  // ============================================
  // Private Methods
  // ============================================

  private initializeAuthentication(): void {
    this._isLoading.set(true);

    try {
      const isAuthenticated = this.tokenRepository.isAuthenticated();
      this._isAuthenticated.set(isAuthenticated);

      if (isAuthenticated) {
        const userData = this.tokenRepository.getUserData();
        this._user.set(userData);
        this.scheduleTokenRefresh();
      }
    } catch {
      this.performClientLogout();
    } finally {
      this._isLoading.set(false);
    }
  }

  private scheduleTokenRefresh(): void {
    const accessToken = this.tokenRepository.getToken();
    if (!accessToken) {
      return;
    }

    try {
      const decodedToken = this.decodeToken(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = decodedToken.exp - currentTime;
      const refreshTime = Math.max((timeUntilExpiry - 300) * 1000, 1000);

      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
      }

      this.ngZone.runOutsideAngular(() => {
        this.refreshTokenTimeout = window.setTimeout(() => {
          this.ngZone.run(() => {
            if (this.tokenRepository.needsRefresh()) {
              this.refreshToken().subscribe();
            }
          });
        }, refreshTime);
      });
    } catch {
      // Silent fail - token might be invalid
    }
  }

  private stopTokenRefreshTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = undefined;
    }
  }

  private performClientLogout(): void {
    this.stopTokenRefreshTimer();
    this.tokenRepository.clearTokens();
    this._isAuthenticated.set(false);
    this._user.set(null);
    this._mfaRequired.set(false);
    this.router.navigate([`/${this.environment.loginRoute}`]);
  }

  private decodeToken(token: string): DecodedToken {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch {
      throw new Error('Invalid token format');
    }
  }

  ngOnDestroy(): void {
    this.stopTokenRefreshTimer();
  }
}
