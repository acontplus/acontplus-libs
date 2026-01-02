// src/lib/data/repositories/auth-http-repository.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth-repository';
import {
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
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
  DomainDiscoveryRequest,
  DomainDiscoveryResponse,
  OAuthConfig,
  TenantConfig,
} from '../../domain/models/auth';
import { AuthTokens } from '@acontplus/core';
import { AUTH_API } from '@acontplus/ng-config';

function getDeviceInfo(): string {
  return `${navigator.platform ?? 'Unknown'} - ${navigator.userAgent}`;
}

@Injectable({
  providedIn: 'root',
})
export class AuthHttpRepository extends AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly URL = `${AUTH_API.AUTH}`;

  // Core Authentication
  login(request: LoginRequest): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.URL}login`, request, {
      headers: { 'Device-Info': getDeviceInfo() },
      withCredentials: true,
    });
  }

  register(request: RegisterRequest): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.URL}register`, request, {
      headers: { 'Device-Info': getDeviceInfo() },
      withCredentials: true,
    });
  }

  refreshToken(request: RefreshTokenRequest): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.URL}refresh`, request, {
      headers: { 'Device-Info': getDeviceInfo() },
      withCredentials: true,
    });
  }

  logout(email: string, refreshToken: string): Observable<void> {
    return this.http.post<void>(
      `${this.URL}logout`,
      { email, refreshToken: refreshToken || undefined },
      { withCredentials: true },
    );
  }

  // Password Management
  forgotPassword(request: ForgotPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.URL}forgot-password`, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.URL}reset-password`, request);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.URL}change-password`, request, {
      withCredentials: true,
    });
  }

  // Email Verification
  verifyEmail(request: VerifyEmailRequest): Observable<void> {
    return this.http.post<void>(`${this.URL}verify-email`, request);
  }

  resendVerificationEmail(request: ResendVerificationRequest): Observable<void> {
    return this.http.post<void>(`${this.URL}resend-verification`, request);
  }

  // MFA/2FA
  setupMfa(): Observable<MfaSetupResponse> {
    return this.http.post<MfaSetupResponse>(`${this.URL}mfa/setup`, null, {
      withCredentials: true,
    });
  }

  verifyMfa(request: VerifyMfaRequest): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.URL}mfa/verify`, request, {
      headers: { 'Device-Info': getDeviceInfo() },
      withCredentials: true,
    });
  }

  disableMfa(code: string): Observable<void> {
    return this.http.post<void>(`${this.URL}mfa/disable`, { code }, { withCredentials: true });
  }

  // Social Login
  getSocialAuthUrl(
    provider: SocialProvider,
    config?: Partial<OAuthConfig>,
  ): Observable<SocialAuthUrl> {
    const params: Record<string, string> = {};
    if (config?.tenantId) params['tenantId'] = config.tenantId;
    if (config?.domain) params['domain'] = config.domain;
    if (config?.redirectUri) params['redirectUri'] = config.redirectUri;

    const queryString =
      Object.keys(params).length > 0 ? '?' + new URLSearchParams(params).toString() : '';

    return this.http.get<SocialAuthUrl>(`${this.URL}social/${provider}/url${queryString}`);
  }

  socialLogin(request: SocialLoginRequest): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.URL}social/${request.provider}/callback`, request, {
      headers: { 'Device-Info': getDeviceInfo() },
      withCredentials: true,
    });
  }

  // Multi-Tenant / Domain Discovery
  discoverDomain(request: DomainDiscoveryRequest): Observable<DomainDiscoveryResponse> {
    return this.http.post<DomainDiscoveryResponse>(`${this.URL}domain-discovery`, request);
  }

  getTenantConfig(tenantId: string): Observable<TenantConfig> {
    return this.http.get<TenantConfig>(`${this.URL}tenants/${tenantId}`);
  }

  listTenants(): Observable<TenantConfig[]> {
    return this.http.get<TenantConfig[]>(`${this.URL}tenants`);
  }
}
