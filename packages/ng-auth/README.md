# @acontplus/ng-auth

Angular authentication library with comprehensive auth features following Angular 21 best practices and clean architecture principles.

> **🚀 New Feature**: Multi-Tenant OAuth / Enterprise SSO  
> Support for Google Workspace, Microsoft 365, and Azure AD with automatic domain discovery.  
> Perfect for SaaS applications with enterprise customers.

## Installation

```bash
npm install @acontplus/ng-auth
# or
pnpm add @acontplus/ng-auth
```

## Features

- ✅ **Modern Angular 21 Patterns**: Signals, inject(), standalone components
- ✅ **Clean Architecture**: Domain → Data → Services (no use cases overhead)
- ✅ **AuthState Service**: Centralized auth state with reactive signals
- ✅ **Multi-Tenant OAuth**: Enterprise SSO with domain discovery (Google Workspace, Azure AD)
- ✅ **Route Guards**: Protection with automatic redirect handling
- ✅ **Token Management**: JWT storage, refresh, and validation
- ✅ **Auto Token Refresh**: Scheduled refresh before expiration
- ✅ **URL Redirection**: Returns users to intended page after login
- ✅ **Password Management**: Reset, change, forgot password flows
- ✅ **Email Verification**: Email verification with resend capability
- ✅ **MFA/2FA Support**: Setup, verify, and disable two-factor auth
- ✅ **Social Login**: Google, Microsoft, GitHub, Facebook, Apple, LinkedIn OAuth
- ✅ **Domain Discovery**: Automatic OAuth provider detection from email
- ✅ **CSRF Protection**: Built-in CSRF token management
- ✅ **Session Handling**: Auto-logout on expiry, 401 interceptor
- ✅ **Login Component**: Ready-to-use Material Design UI with OAuth support
- ✅ **TypeScript**: Full type safety with comprehensive types

## Quick Start

### 1. Install the package

```bash
pnpm add @acontplus/ng-auth
```

### 2. Configure providers

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authProviders, authRedirectInterceptor, csrfInterceptor } from '@acontplus/ng-auth';
import { ENVIRONMENT } from '@acontplus/ng-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authRedirectInterceptor, // Handles 401 errors
        csrfInterceptor, // CSRF protection
      ]),
    ),

    // Auth services
    ...authProviders,

    // Environment config
    {
      provide: ENVIRONMENT,
      useValue: {
        tokenKey: 'auth_token',
        refreshTokenKey: 'refresh_token',
        loginRoute: 'auth/login',
      },
    },
  ],
};
```

### 3. Protect routes

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@acontplus/ng-auth';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth').then((m) => m.AuthPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard], // 👈 Protected route
  },
];
```

### 4. Use AuthState service

```typescript
// dashboard.component.ts
import { Component, inject } from '@angular/core';
import { AuthState } from '@acontplus/ng-auth';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Welcome, {{ authState.user()?.displayName }}!</h1>
    <p>Email: {{ authState.user()?.email }}</p>

    @if (authState.isLoading()) {
      <p>Loading...</p>
    }

    <button (click)="logout()">Logout</button>
  `,
})
export class Dashboard {
  protected readonly authState = inject(AuthState);

  logout() {
    this.authState.logout().subscribe();
  }
}
```

## Core API

### AuthState Service

The main service for all authentication operations. Uses Angular signals for reactive state.

```typescript
import { inject } from '@angular/core';
import { AuthState } from '@acontplus/ng-auth';

const authState = inject(AuthState);

// Reactive state (signals)
authState.isAuthenticated(); // Signal<boolean>
authState.user(); // Signal<UserData | null>
authState.isLoading(); // Signal<boolean>
authState.mfaRequired(); // Signal<boolean>
authState.emailVerified(); // Signal<boolean>

// Authentication methods
authState.login({ email, password, rememberMe }).subscribe();
authState.register({ email, displayName, password }).subscribe();
authState.logout().subscribe();
authState.refreshToken().subscribe();

// Password management
authState.forgotPassword({ email }).subscribe();
authState.resetPassword({ token, newPassword }).subscribe();
authState.changePassword({ currentPassword, newPassword }).subscribe();

// Email verification
authState.verifyEmail({ token }).subscribe();
authState.resendVerificationEmail({ email }).subscribe();

// MFA/2FA
authState.setupMfa().subscribe(); // Returns QR code + backup codes
authState.verifyMfa({ code, email }).subscribe();
authState.disableMfa(code).subscribe();

// Social login
authState.getSocialAuthUrl('google').subscribe();
authState.socialLogin({ provider: 'google', accessToken, idToken }).subscribe();

// State checks
authState.checkAuthentication(); // Returns boolean
authState.setAuthenticated(tokens, rememberMe);
```

### Route Protection

```typescript
// app.routes.ts
import { authGuard } from '@acontplus/ng-auth';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [...],
  },
];
```

**How it works:**

1. User tries to access `/admin/settings`
2. `authGuard` checks authentication
3. If not authenticated: stores URL → redirects to login
4. After login: automatically redirects back to `/admin/settings`

### Token Repository

Low-level token storage operations (usually not needed directly):

```typescript
import { inject } from '@angular/core';
import { AuthTokenRepositoryImpl } from '@acontplus/ng-auth';

const tokenRepo = inject(AuthTokenRepositoryImpl);

// Token operations
tokenRepo.getToken(); // Get access token
tokenRepo.getRefreshToken(); // Get refresh token
tokenRepo.saveTokens(tokens, rememberMe);
tokenRepo.clearTokens();

// Validation
tokenRepo.isAuthenticated(); // Check if token is valid
tokenRepo.needsRefresh(); // Check if token needs refresh

// User data extraction from JWT
tokenRepo.getUserData(); // Returns UserData | null
tokenRepo.isRememberMeEnabled(); // Check storage location
```

### Interceptors

**Auth Redirect Interceptor** - Handles 401 errors:

```typescript
import { authRedirectInterceptor } from '@acontplus/ng-auth';

provideHttpClient(withInterceptors([authRedirectInterceptor]));
```

**CSRF Interceptor** - Adds CSRF tokens:

```typescript
import { csrfInterceptor } from '@acontplus/ng-auth';

provideHttpClient(withInterceptors([csrfInterceptor]));
```

## Login Component

Ready-to-use Material Design login/register UI.

### Basic Usage

```typescript
import { Login } from '@acontplus/ng-auth';

@Component({
  selector: 'app-auth',
  imports: [Login],
  template: `<acp-login />`,
})
export class AuthPage {}
```

### With Customization

```typescript
@Component({
  template: `
    <acp-login
      title="Welcome to MyApp"
      [showRegisterButton]="true"
      [showRememberMe]="true"
      [additionalSigninControls]="extraSigninFields"
      [additionalSignupControls]="extraSignupFields"
      [footerContent]="footer"
    />

    <ng-template #footer>
      <div class="text-center">
        <a href="/terms">Terms</a> |
        <a href="/privacy">Privacy</a>
      </div>
    </ng-template>
  `,
})
export class AuthPage {
  extraSigninFields = {
    companyId: new FormControl('', Validators.required),
  };

  extraSignupFields = {
    role: new FormControl('user', Validators.required),
  };
}
```

### Component Inputs

| Input                      | Type                              | Default   | Description               |
| -------------------------- | --------------------------------- | --------- | ------------------------- |
| `title`                    | `string`                          | `'Login'` | Card title                |
| `showRegisterButton`       | `boolean`                         | `true`    | Show register toggle      |
| `showRememberMe`           | `boolean`                         | `true`    | Show remember me checkbox |
| `additionalSigninControls` | `Record<string, AbstractControl>` | `{}`      | Extra login fields        |
| `additionalSignupControls` | `Record<string, AbstractControl>` | `{}`      | Extra signup fields       |
| `additionalSigninFields`   | `TemplateRef`                     | `null`    | Custom login template     |
| `additionalSignupFields`   | `TemplateRef`                     | `null`    | Custom signup template    |
| `footerContent`            | `TemplateRef`                     | `null`    | Custom footer             |

## Architecture

Following **Angular 21 style guide** and **clean architecture**:

```
ng-auth/
├── domain/
│   ├── models/                    # DTOs and interfaces
│   └── repositories/              # Abstract contracts
├── data/
│   └── repositories/              # HTTP implementations
├── repositories/                  # Token storage impl
├── services/
│   ├── auth-state.ts             # 👈 Main service
│   ├── auth-url-redirect.ts       # URL management
│   └── csrf-api.ts                # CSRF tokens
├── guards/
│   └── auth-guard.ts              # Route protection
├── interceptors/
│   ├── auth-redirect-interceptor.ts
│   └── csrf-interceptor.ts
├── providers/
│   └── auth-providers.ts          # DI providers
└── ui/
    └── login/                     # Login component
```

**Key decisions:**

- ❌ No use cases layer (unnecessary for a library)
- ✅ AuthState consolidates all auth operations
- ✅ Signals for reactive state
- ✅ Repository pattern for data abstraction
- ✅ No `.service.ts` suffix (Angular 21 style guide)

## Real-World Example

### Complete Auth Page

```typescript
// auth.page.ts
import { Component, inject } from '@angular/core';
import { Login, AuthState } from '@acontplus/ng-auth';

@Component({
  selector: 'app-auth',
  imports: [Login],
  template: `
    <div class="auth-container">
      <acp-login title="Welcome to Acontplus" />
    </div>
  `,
  styles: [
    `
      .auth-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
    `,
  ],
})
export class AuthPage {}
```

### Protected Dashboard

```typescript
// dashboard.page.ts
import { Component, inject } from '@angular/core';
import { AuthState } from '@acontplus/ng-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <header>
        <h1>Dashboard</h1>
        <div class="user-info">
          @if (user(); as userData) {
            <span>{{ userData.displayName }}</span>
            <button (click)="logout()">Logout</button>
          }
        </div>
      </header>

      <main>
        <p>Welcome back, {{ user()?.displayName }}!</p>
        <p>Email: {{ user()?.email }}</p>

        @if (user()?.roles?.includes('admin')) {
          <a routerLink="/admin">Admin Panel</a>
        }

        @if (!emailVerified()) {
          <div class="warning">
            Please verify your email
            <button (click)="resendVerification()">Resend</button>
          </div>
        }
      </main>
    </div>
  `,
})
export class Dashboard {
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  // Reactive state
  user = this.authState.user;
  emailVerified = this.authState.emailVerified;

  logout() {
    this.authState.logout().subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }

  resendVerification() {
    const email = this.user()?.email;
    if (email) {
      this.authState.resendVerificationEmail({ email }).subscribe();
    }
  }
}
```

## Migration from v1.x

If you're upgrading from the old version:

### ❌ Before (Use Cases)

```typescript
import { LoginUseCase, LogoutUseCase } from '@acontplus/ng-auth';

export class MyComponent {
  constructor(
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
  ) {}

  login() {
    this.loginUseCase.execute({ email, password }).subscribe();
  }
}
```

### ✅ After (AuthState)

```typescript
import { inject } from '@angular/core';
import { AuthState } from '@acontplus/ng-auth';

export class MyComponent {
  private authState = inject(AuthState);

  login() {
    this.authState.login({ email, password }).subscribe();
  }
}
```

## FAQ

**Q: Why no use cases layer?**  
A: For a library, use cases add unnecessary indirection. The `AuthState` service provides a clean facade with all operations.

**Q: Can I use constructor injection instead of inject()?**  
A: Yes, but `inject()` is the Angular 21 recommended approach.

**Q: How do I customize the login component?**  
A: Use the component inputs (`additionalSigninControls`, templates) or create your own using `AuthState` directly.

**Q: What about server-side rendering (SSR)?**  
A: The library is SSR-compatible. Token operations use `isPlatformBrowser` checks.

**Q: How to handle token expiry?**  
A: Token refresh is automatic. Use `authRedirectInterceptor` for 401 handling.

## Multi-Tenant OAuth / Enterprise SSO

The library includes comprehensive support for multi-tenant OAuth authentication, ideal for SaaS applications where different organizations use their own identity providers (like Google Workspace, Microsoft Azure AD, etc.).

### Features

- ✅ **Domain Discovery**: Automatically detect OAuth provider from email domain
- ✅ **Tenant Isolation**: Support multiple tenants with different OAuth configurations
- ✅ **SSO Integration**: Google Workspace, Microsoft 365, Azure AD, etc.
- ✅ **Flexible Authentication**: Allow both OAuth and password login per tenant
- ✅ **OAuth Callback Handling**: Built-in callback component with CSRF protection
- ✅ **State Management**: Secure OAuth state verification

### Use Cases

1. **Google Workspace Multi-Tenant**
   - Each company has their own Google Workspace domain
   - Users from `@acme.com` use Acme's Google Workspace
   - Users from `@techcorp.com` use TechCorp's Google Workspace

2. **Microsoft 365 / Azure AD**
   - Enterprise organizations with Azure AD
   - Single sign-on for employees
   - Optional password fallback for external users

3. **Hybrid Authentication**
   - OAuth for enterprise customers
   - Password login for individual users
   - Social login for public users

### Backend Requirements

Your backend needs to implement these endpoints:

```typescript
// Domain Discovery - Maps email domain to OAuth provider
POST /api/auth/domain-discovery
Request: { email: string }
Response: {
  provider?: 'google' | 'microsoft' | 'apple' | 'linkedin' | 'github',
  tenantId?: string,
  domain?: string,
  discoveryUrl?: string,
  requiresOAuth: boolean,
  allowPasswordLogin: boolean
}

// Get OAuth Authorization URL with tenant context
GET /api/auth/social/{provider}/url?tenantId=xxx&domain=xxx
Response: {
  url: string,    // OAuth authorization URL
  state: string   // CSRF state token
}

// OAuth Callback - Exchange code for tokens
POST /api/auth/social/{provider}/callback
Request: {
  provider: string,
  code: string,
  state: string,
  tenantId?: string,
  domain?: string
}
Response: {
  token: string,
  refreshToken: string
}

// Tenant Configuration (optional - for admin UI)
GET /api/auth/tenants
GET /api/auth/tenants/{tenantId}
```

### Setup: Domain Discovery in Login

Enable automatic domain discovery in the login component:

```typescript
// auth.page.ts
import { Component } from '@angular/core';
import { Login } from '@acontplus/ng-auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [Login],
  template: ` <acp-login [enableDomainDiscovery]="true" [showSocialLogin]="true" /> `,
})
export class AuthPage {}
```

**How it works:**

1. User types email: `user@acme.com`
2. Library calls `/api/auth/domain-discovery` with email
3. Backend responds with OAuth provider and tenant info
4. UI shows appropriate login method (OAuth button or password field)

### Setup: OAuth Callback Route

Register the OAuth callback component in your routes:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { OAuthCallbackComponent } from '@acontplus/ng-auth';

export const routes: Routes = [
  {
    path: 'auth/callback/:provider',
    component: OAuthCallbackComponent,
  },
  // ... other routes
];
```

Configure these redirect URIs in your OAuth provider:

- Google: `https://your-app.com/auth/callback/google`
- Microsoft: `https://your-app.com/auth/callback/microsoft`
- GitHub: `https://your-app.com/auth/callback/github`

### Programmatic OAuth Flow

For custom implementations, use the AuthState methods directly:

```typescript
import { Component, inject } from '@angular/core';
import { AuthState } from '@acontplus/ng-auth';

@Component({
  selector: 'app-custom-login',
  template: `
    <input #emailInput (blur)="checkDomain(emailInput.value)" />

    @if (discovery?.requiresOAuth) {
      <button (click)="loginWithOAuth()">Login with {{ discovery.provider }}</button>
    }

    @if (discovery?.allowPasswordLogin) {
      <input type="password" [(ngModel)]="password" />
      <button (click)="loginWithPassword()">Login</button>
    }
  `,
})
export class CustomLogin {
  private authState = inject(AuthState);

  email = '';
  password = '';
  discovery: DomainDiscoveryResponse | null = null;

  checkDomain(email: string) {
    this.email = email;
    this.authState.discoverDomain(email).subscribe({
      next: (result) => {
        this.discovery = result;
      },
    });
  }

  loginWithOAuth() {
    if (!this.discovery?.provider) return;

    // This redirects to OAuth provider
    this.authState.startOAuthFlow({
      provider: this.discovery.provider,
      tenantId: this.discovery.tenantId,
      domain: this.discovery.domain,
    });
  }

  loginWithPassword() {
    this.authState
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe();
  }
}
```

### Manual OAuth Callback Handling

If not using the provided callback component:

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthState } from '@acontplus/ng-auth';

@Component({
  selector: 'app-oauth-callback',
  template: '<p>Completing authentication...</p>',
})
export class MyOAuthCallback implements OnInit {
  private authState = inject(AuthState);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const provider = this.route.snapshot.paramMap.get('provider');
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');

    if (provider && code && state) {
      this.authState.handleOAuthCallback(provider as SocialProvider, code, state).subscribe({
        next: () => {
          // Success - AuthState redirects automatically
        },
        error: (err) => {
          console.error('OAuth failed:', err);
        },
      });
    }
  }
}
```

### Backend Implementation Example (Google Workspace)

Here's a Node.js/Express example for Google Workspace multi-tenant:

```typescript
// Domain discovery endpoint
app.post('/api/auth/domain-discovery', async (req, res) => {
  const { email } = req.body;
  const domain = email.split('@')[1];

  // Check if domain is configured for OAuth
  const tenant = await db.tenants.findOne({ domain });

  if (tenant?.oauthProvider === 'google') {
    return res.json({
      provider: 'google',
      tenantId: tenant.id,
      domain: tenant.domain,
      requiresOAuth: true,
      allowPasswordLogin: tenant.allowPasswordFallback,
    });
  }

  // Default to password login
  res.json({
    requiresOAuth: false,
    allowPasswordLogin: true,
  });
});

// Get OAuth URL
app.get('/api/auth/social/google/url', async (req, res) => {
  const { tenantId, domain } = req.query;

  const tenant = await db.tenants.findOne({ id: tenantId });
  const state = crypto.randomBytes(32).toString('hex');

  // Store state for verification
  await redis.set(`oauth:state:${state}`, tenantId, 'EX', 600);

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', tenant.googleClientId);
  authUrl.searchParams.set('redirect_uri', 'https://your-app.com/auth/callback/google');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('state', state);

  // Tenant hint for Google Workspace
  if (domain) {
    authUrl.searchParams.set('hd', domain);
  }

  res.json({
    url: authUrl.toString(),
    state,
  });
});

// OAuth callback
app.post('/api/auth/social/google/callback', async (req, res) => {
  const { code, state, tenantId } = req.body;

  // Verify state
  const storedTenantId = await redis.get(`oauth:state:${state}`);
  if (!storedTenantId) {
    return res.status(400).json({ error: 'Invalid state' });
  }

  const tenant = await db.tenants.findOne({ id: tenantId });

  // Exchange code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: tenant.googleClientId,
      client_secret: tenant.googleClientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'https://your-app.com/auth/callback/google',
    }),
  });

  const tokens = await tokenResponse.json();

  // Get user info
  const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  }).then((r) => r.json());

  // Verify domain matches tenant
  const userDomain = userInfo.email.split('@')[1];
  if (tenant.domain !== userDomain) {
    return res.status(403).json({ error: 'Domain mismatch' });
  }

  // Create or update user
  const user = await db.users.upsert({
    email: userInfo.email,
    displayName: userInfo.name,
    tenantId: tenant.id,
    emailVerified: userInfo.verified_email,
  });

  // Generate JWT
  const jwt = generateJWT(user);

  res.json({
    token: jwt,
    refreshToken: generateRefreshToken(user),
  });
});
```

### Configuration Example: Tenant Management

```typescript
// Tenant configuration for admin panel
interface TenantConfig {
  tenantId: string;
  domain: string; // e.g., "acme.com"
  displayName: string; // e.g., "Acme Corporation"
  provider: 'google' | 'microsoft';

  // OAuth credentials
  clientId: string;
  clientSecret: string; // Stored securely on backend
  issuer?: string; // For OIDC providers

  // Settings
  allowedDomains?: string[]; // Additional domains
  allowPasswordLogin: boolean;
  autoProvision: boolean; // Auto-create users on first login

  customParameters?: {
    hd?: string; // Google Workspace domain hint
    tenant?: string; // Azure AD tenant ID
  };
}
```

### Testing OAuth Locally

For local development, use these redirect URIs:

- `http://localhost:4200/auth/callback/google`
- `http://localhost:4200/auth/callback/microsoft`

Configure your OAuth apps with these URLs in development mode.

### OAuth Security Best Practices

1. **CSRF Protection**: Always verify the `state` parameter matches
2. **Domain Validation**: Verify user's email domain matches tenant configuration
3. **HTTPS Only**: Enforce HTTPS in production (OAuth providers require it)
4. **Secret Storage**: Encrypt OAuth client secrets at rest in your database
5. **Token Expiry**: Set reasonable expiry for OAuth state tokens (5-10 minutes)
6. **Scope Limitation**: Request only the minimum required OAuth scopes

### Database Schema for Multi-Tenant

```typescript
// Tenants table
interface Tenant {
  id: string;
  domain: string; // "acme.com"
  displayName: string; // "Acme Corporation"
  oauthProvider: 'google' | 'microsoft' | 'apple' | null;

  // OAuth credentials (encrypted at rest!)
  googleClientId?: string;
  googleClientSecret?: string;
  microsoftClientId?: string;
  microsoftClientSecret?: string;
  azureTenantId?: string; // For Azure AD

  // Settings
  allowPasswordLogin: boolean;
  autoProvisionUsers: boolean; // Auto-create users on first OAuth login
  requireEmailVerification: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// Users table
interface User {
  id: string;
  email: string;
  displayName: string;
  tenantId?: string; // Reference to tenant
  emailVerified: boolean;

  // Track which auth method they used
  authProvider: 'password' | 'google' | 'microsoft' | 'github' | 'apple';

  // OAuth user ID from provider
  oauthProviderId?: string;

  createdAt: Date;
  lastLoginAt: Date;
}
```

### OAuth Provider Setup Guides

<details>
<summary><b>Google Cloud Console Setup</b></summary>

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API** (or People API)
4. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. **Authorized redirect URIs**:
   - Production: `https://your-app.com/auth/callback/google`
   - Development: `http://localhost:4200/auth/callback/google`
7. Copy the **Client ID** and **Client Secret**
8. For Google Workspace:
   - Use the `hd` parameter to restrict to specific domain
   - Example: `authUrl.searchParams.set('hd', 'acme.com')`

**Scopes needed:**

- `openid` - Basic authentication
- `email` - User's email address
- `profile` - User's name and photo

</details>

<details>
<summary><b>Microsoft Azure AD Setup</b></summary>

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Name your application
5. **Supported account types**:
   - Single tenant: Only users in your organization
   - Multi-tenant: Users in any Azure AD directory
6. **Redirect URI**:
   - Platform: **Web**
   - URI: `https://your-app.com/auth/callback/microsoft`
7. After creation, go to **Certificates & secrets**
8. Create a **New client secret** and save it immediately
9. Go to **API permissions** → **Add a permission**
10. Select **Microsoft Graph** → **Delegated permissions**
11. Add: `openid`, `email`, `profile`

**For multi-tenant:**

- Use tenant-specific endpoint: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize`
- Or use common endpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`

</details>

<details>
<summary><b>GitHub OAuth App Setup</b></summary>

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in application details
4. **Authorization callback URL**: `https://your-app.com/auth/callback/github`
5. Copy **Client ID** and generate **Client Secret**

**Scopes needed:**

- `user:email` - Access user's email address
- `read:user` - Read user profile information

</details>

### Common Issues and Solutions

<details>
<summary><b>Error: "Invalid redirect URI"</b></summary>

**Cause**: The redirect URI in your OAuth request doesn't match what's configured in the provider's settings.

**Solutions**:

1. Ensure exact match including protocol (`http://` vs `https://`), port, and path
2. No trailing slash unless configured that way
3. Check for typos in domain name
4. For local dev, ensure `http://localhost:4200` is added to allowed URIs

</details>

<details>
<summary><b>Error: "Invalid state" or "State mismatch"</b></summary>

**Cause**: OAuth state token expired or doesn't match.

**Solutions**:

1. Increase Redis/storage TTL for state tokens (recommended: 600 seconds)
2. User may have taken too long to complete OAuth flow
3. Ensure state is properly stored before redirect
4. Check that state is being retrieved from the same storage

</details>

<details>
<summary><b>Error: "Domain mismatch" or "Wrong organization"</b></summary>

**Cause**: User authenticated with an account from a different organization.

**Solutions**:

1. For Google: Use `hd` parameter to force specific domain
2. Show clear error message explaining which domain is expected
3. Verify domain matching logic in backend before issuing JWT
4. Consider allowing multiple domains per tenant

</details>

<details>
<summary><b>Callback hangs or never completes</b></summary>

**Cause**: Frontend or backend error during token exchange.

**Solutions**:

1. Check browser console for JavaScript errors
2. Verify backend endpoint is responding
3. Check CORS configuration on backend
4. Ensure OAuth client secret is correct
5. Verify authorization code hasn't expired (valid for ~10 minutes)

</details>

### Testing Strategies

```typescript
// Mock domain discovery for testing
describe('OAuth Flow', () => {
  let authState: AuthState;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthState, ...authProviders],
    });

    authState = TestBed.inject(AuthState);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should discover Google Workspace tenant', (done) => {
    authState.discoverDomain('user@acme.com').subscribe((result) => {
      expect(result.provider).toBe('google');
      expect(result.tenantId).toBe('acme-123');
      expect(result.requiresOAuth).toBe(true);
      done();
    });

    const req = httpMock.expectOne('/api/auth/domain-discovery');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'user@acme.com' });

    req.flush({
      provider: 'google',
      tenantId: 'acme-123',
      requiresOAuth: true,
      allowPasswordLogin: false,
    });
  });

  it('should start OAuth flow with tenant context', () => {
    spyOn(window.location, 'href', 'set');

    authState.startOAuthFlow({
      provider: 'google',
      tenantId: 'acme-123',
      domain: 'acme.com',
    });

    const req = httpMock.expectOne((req) => req.url.includes('/api/auth/social/google/url'));

    req.flush({
      url: 'https://accounts.google.com/o/oauth2/v2/auth?...',
      state: 'test-state-token',
    });

    // Verify state stored in session storage
    expect(sessionStorage.getItem('oauth_state')).toBe('test-state-token');
    expect(sessionStorage.getItem('oauth_tenant_id')).toBe('acme-123');
  });
});
```

## License

MIT
