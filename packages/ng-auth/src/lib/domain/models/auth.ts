// src/lib/domain/models/auth.ts

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  displayName: string;
  password: string;
}

export interface RefreshTokenRequest {
  email: string;
  refreshToken: string;
}

// Password Reset
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Email Verification
export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

// MFA/2FA
export interface MfaSetupResponse {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface VerifyMfaRequest {
  code: string;
  email: string;
}

export interface LoginWithMfaRequest extends LoginRequest {
  mfaCode?: string;
}

// Social Login
export type SocialProvider = 'google' | 'microsoft' | 'github' | 'facebook' | 'apple' | 'linkedin';

export interface SocialLoginRequest {
  provider: SocialProvider;

  // OAuth 2.0 Authorization Code Flow
  code?: string; // Authorization code from OAuth callback
  state?: string; // CSRF state verification

  // Legacy Token-based Flow (for direct token exchange)
  accessToken?: string;
  idToken?: string;

  // Multi-tenant context
  domain?: string; // For multi-tenant scenarios
  tenantId?: string; // For Azure AD, Google Workspace
}

export interface SocialAuthUrl {
  url: string;
  state: string;
}

// Multi-Tenant OAuth / Domain-based Auth
export interface TenantConfig {
  tenantId: string;
  domain: string;
  displayName: string;
  provider: SocialProvider;
  clientId?: string;
  issuer?: string; // OIDC issuer URL
  allowedDomains?: string[]; // Email domains allowed for this tenant
  customParameters?: Record<string, string>;
}

export interface DomainDiscoveryRequest {
  email: string;
}

export interface DomainDiscoveryResponse {
  provider?: SocialProvider;
  tenantId?: string;
  domain?: string;
  discoveryUrl?: string;
  requiresOAuth: boolean;
  allowPasswordLogin: boolean;
}

export interface OAuthConfig {
  provider: SocialProvider;
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: 'code' | 'token' | 'id_token' | 'code id_token';
  responseMode?: 'query' | 'fragment' | 'form_post';
  tenantId?: string; // Azure AD, Google Workspace tenant
  domain?: string; // Domain hint
  prompt?: 'none' | 'login' | 'consent' | 'select_account';
  loginHint?: string; // Email hint
  state?: string;
  nonce?: string;
  additionalParams?: Record<string, string>;
}

export interface OAuthCallbackParams {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
  id_token?: string;
  access_token?: string;
}

// Auth Status
export interface AuthStatus {
  isAuthenticated: boolean;
  mfaRequired: boolean;
  emailVerified: boolean;
}
