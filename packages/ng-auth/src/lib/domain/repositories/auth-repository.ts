// src/lib/domain/repositories/auth-repository.ts
import { Observable } from 'rxjs';
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
} from '../models/auth';
import { AuthTokens } from '@acontplus/core';

export abstract class AuthRepository {
  // Core Authentication
  abstract login(request: LoginRequest): Observable<AuthTokens>;
  abstract register(request: RegisterRequest): Observable<AuthTokens>;
  abstract refreshToken(request: RefreshTokenRequest): Observable<AuthTokens>;
  abstract logout(email: string, refreshToken: string): Observable<void>;

  // Password Management
  abstract forgotPassword(request: ForgotPasswordRequest): Observable<void>;
  abstract resetPassword(request: ResetPasswordRequest): Observable<void>;
  abstract changePassword(request: ChangePasswordRequest): Observable<void>;

  // Email Verification
  abstract verifyEmail(request: VerifyEmailRequest): Observable<void>;
  abstract resendVerificationEmail(request: ResendVerificationRequest): Observable<void>;

  // MFA/2FA
  abstract setupMfa(): Observable<MfaSetupResponse>;
  abstract verifyMfa(request: VerifyMfaRequest): Observable<AuthTokens>;
  abstract disableMfa(code: string): Observable<void>;

  // Social Login
  abstract getSocialAuthUrl(
    provider: SocialProvider,
    config?: Partial<OAuthConfig>,
  ): Observable<SocialAuthUrl>;
  abstract socialLogin(request: SocialLoginRequest): Observable<AuthTokens>;

  // Multi-Tenant / Domain Discovery
  abstract discoverDomain(request: DomainDiscoveryRequest): Observable<DomainDiscoveryResponse>;
  abstract getTenantConfig(tenantId: string): Observable<TenantConfig>;
  abstract listTenants(): Observable<TenantConfig[]>;
}
