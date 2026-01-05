// src/app/pages/oauth-demo/oauth-demo.page.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthState, DomainDiscoveryResponse, SocialProvider } from '@acontplus/ng-auth';
import { environment } from '../../../environments/environment';

/**
 * OAuth Multi-Tenant Demo Page
 *
 * Demonstrates how to implement multi-tenant OAuth authentication
 * with domain discovery and tenant-specific SSO.
 *
 * Features:
 * - Email domain discovery
 * - Tenant detection
 * - Dynamic OAuth provider selection
 * - Hybrid authentication (OAuth + Password)
 */
@Component({
  selector: 'app-oauth-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="oauth-demo-container">
      <mat-card>
        <mat-card-header>
          <h1>Multi-Tenant OAuth Demo</h1>
          <p class="subtitle">Experience domain-based authentication discovery</p>
        </mat-card-header>

        <mat-card-content>
          <!-- Example Domains Section -->
          <div class="example-section">
            <h3>Try These Example Domains:</h3>
            <div class="example-chips">
              <mat-chip-set>
                <mat-chip (click)="setEmail('user@acme.com')">
                  user@acme.com <small>(Google Workspace)</small>
                </mat-chip>
                <mat-chip (click)="setEmail('user@techcorp.com')">
                  user@techcorp.com <small>(Azure AD)</small>
                </mat-chip>
                <mat-chip (click)="setEmail('user@startup.io')">
                  user@startup.io <small>(Hybrid)</small>
                </mat-chip>
                <mat-chip (click)="setEmail('user@gmail.com')">
                  user@gmail.com <small>(Standard)</small>
                </mat-chip>
              </mat-chip-set>
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- Email Input Section -->
          <div class="input-section">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email Address</mat-label>
              <input
                matInput
                [(ngModel)]="email"
                (blur)="checkDomain()"
                placeholder="Enter your email to discover authentication method"
                type="email"
              />
              <mat-icon matPrefix>email</mat-icon>
            </mat-form-field>

            @if (isChecking()) {
              <div class="checking-status">
                <mat-spinner diameter="24"></mat-spinner>
                <span>Checking domain...</span>
              </div>
            }
          </div>

          <!-- Discovery Results -->
          @if (discovery() && !isChecking()) {
            <div class="discovery-results" [ngClass]="getResultClass()">
              <mat-icon class="result-icon">{{ getResultIcon() }}</mat-icon>

              <div class="result-content">
                <h3>{{ getResultTitle() }}</h3>

                @if (discovery()!.requiresOAuth) {
                  <div class="oauth-info">
                    <p><strong>Provider:</strong> {{ discovery()!.provider }}</p>
                    <p><strong>Tenant:</strong> {{ discovery()!.tenantId || 'N/A' }}</p>
                    <p><strong>Domain:</strong> {{ discovery()!.domain || 'N/A' }}</p>

                    @if (discovery()!.allowPasswordLogin) {
                      <mat-chip-set>
                        <mat-chip color="primary">OAuth SSO Available</mat-chip>
                        <mat-chip>Password Login Allowed</mat-chip>
                      </mat-chip-set>
                    } @else {
                      <mat-chip-set>
                        <mat-chip color="warn">OAuth SSO Required</mat-chip>
                      </mat-chip-set>
                    }
                  </div>
                } @else {
                  <p>Standard authentication available</p>
                  <mat-chip-set>
                    <mat-chip color="primary">Password Login</mat-chip>
                    <mat-chip>Social Login Options</mat-chip>
                  </mat-chip-set>
                }
              </div>
            </div>
          }

          <!-- Authentication Options -->
          @if (discovery() && !isChecking()) {
            <div class="auth-options">
              <!-- OAuth SSO Button -->
              @if (discovery()!.requiresOAuth && discovery()!.provider) {
                <button
                  mat-raised-button
                  color="accent"
                  class="auth-button oauth-button"
                  (click)="loginWithSSO()"
                >
                  <mat-icon>business</mat-icon>
                  Login with {{ discovery()!.provider | titlecase }} SSO
                </button>
              }

              <!-- Password Login -->
              @if (!discovery()!.requiresOAuth || discovery()!.allowPasswordLogin) {
                <div class="password-section">
                  @if (discovery()!.requiresOAuth) {
                    <mat-divider></mat-divider>
                    <p class="divider-text">Or use password (if enrolled)</p>
                  }

                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Password</mat-label>
                    <input
                      matInput
                      [(ngModel)]="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <mat-icon matPrefix>lock</mat-icon>
                  </mat-form-field>

                  <button
                    mat-raised-button
                    color="primary"
                    class="auth-button"
                    (click)="loginWithPassword()"
                    [disabled]="!password"
                  >
                    <mat-icon>login</mat-icon>
                    Login with Password
                  </button>
                </div>
              }

              <!-- Social Login Options -->
              @if (!discovery()!.requiresOAuth) {
                <mat-divider></mat-divider>
                <p class="divider-text">Or continue with</p>

                <div class="social-buttons">
                  <button
                    mat-stroked-button
                    class="social-button"
                    (click)="loginWithProvider('google')"
                  >
                    <mat-icon>account_circle</mat-icon>
                    Google
                  </button>

                  <button
                    mat-stroked-button
                    class="social-button"
                    (click)="loginWithProvider('microsoft')"
                  >
                    <mat-icon>corporate_fare</mat-icon>
                    Microsoft
                  </button>

                  <button
                    mat-stroked-button
                    class="social-button"
                    (click)="loginWithProvider('github')"
                  >
                    <mat-icon>code</mat-icon>
                    GitHub
                  </button>
                </div>
              }
            </div>
          }

          <!-- Information Section -->
          <div class="info-section">
            <mat-icon>info</mat-icon>
            <div>
              <p><strong>What is Multi-Tenant OAuth?</strong></p>
              <p>
                Based on your email domain, the system automatically detects which authentication
                method your organization uses (Google Workspace, Microsoft Azure AD, etc.) and
                directs you to the appropriate login flow.
              </p>
              <p><strong>Benefits:</strong></p>
              <ul>
                <li>Single Sign-On (SSO) for enterprise users</li>
                <li>No need to remember multiple passwords</li>
                <li>Centralized access management</li>
                <li>Enhanced security with MFA from your provider</li>
              </ul>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Code Example Card -->
      <mat-card class="code-card">
        <mat-card-header>
          <h2>Implementation Code</h2>
        </mat-card-header>
        <mat-card-content>
          <pre><code>{{ getCodeExample() }}</code></pre>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .oauth-demo-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      mat-card {
        padding: 2rem;
      }

      mat-card-header {
        margin-bottom: 2rem;

        h1 {
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .subtitle {
          color: #666;
          margin: 0;
        }
      }

      .example-section {
        margin-bottom: 2rem;

        h3 {
          margin-bottom: 1rem;
        }

        .example-chips {
          mat-chip {
            cursor: pointer;
            margin: 0.25rem;

            small {
              opacity: 0.7;
              margin-left: 0.5rem;
            }
          }
        }
      }

      .input-section {
        margin: 2rem 0;
        position: relative;
      }

      .full-width {
        width: 100%;
      }

      .checking-status {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 8px;
        margin-top: 1rem;
      }

      .discovery-results {
        display: flex;
        gap: 1.5rem;
        padding: 1.5rem;
        border-radius: 12px;
        margin: 2rem 0;

        &.oauth-required {
          background-color: #e8f5e9;
          border: 2px solid #4caf50;
        }

        &.hybrid-auth {
          background-color: #fff3e0;
          border: 2px solid #ff9800;
        }

        &.standard-auth {
          background-color: #e3f2fd;
          border: 2px solid #2196f3;
        }

        .result-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
        }

        .result-content {
          flex: 1;

          h3 {
            margin: 0 0 1rem 0;
          }

          .oauth-info {
            p {
              margin: 0.5rem 0;
            }

            mat-chip-set {
              margin-top: 1rem;
            }
          }
        }
      }

      .auth-options {
        margin-top: 2rem;
      }

      .auth-button {
        width: 100%;
        padding: 1rem;
        margin: 0.5rem 0;
        font-size: 1rem;

        mat-icon {
          margin-right: 0.5rem;
        }
      }

      .oauth-button {
        background-color: #4caf50;
        color: white;

        &:hover {
          background-color: #45a049;
        }
      }

      .password-section {
        margin-top: 1.5rem;
      }

      .divider-text {
        text-align: center;
        color: #666;
        margin: 1.5rem 0;
        font-size: 0.9rem;
      }

      .social-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }

      .social-button {
        flex: 1;
        padding: 0.75rem;

        mat-icon {
          margin-right: 0.5rem;
        }
      }

      .info-section {
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        background-color: #e3f2fd;
        border-radius: 8px;
        margin-top: 2rem;

        mat-icon {
          color: #2196f3;
          font-size: 24px;
          width: 24px;
          height: 24px;
        }

        p {
          margin: 0.5rem 0;
        }

        ul {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
      }

      .code-card {
        pre {
          background-color: #f5f5f5;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;

          code {
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
          }
        }
      }
    `,
  ],
})
export class OAuthDemoPage {
  private authState = inject(AuthState);
  private snackBar = inject(MatSnackBar);

  email = '';
  password = '';
  isChecking = signal(false);
  discovery = signal<DomainDiscoveryResponse | null>(null);

  setEmail(email: string) {
    this.email = email;
    this.checkDomain();
  }

  checkDomain() {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.discovery.set(null);
      return;
    }

    this.isChecking.set(true);

    // In production, use actual domain discovery service
    if (environment.isProduction) {
      this.authState.discoverDomain(this.email).subscribe({
        next: result => {
          this.discovery.set(result);
          this.isChecking.set(false);
        },
        error: () => {
          this.discovery.set({ requiresOAuth: false, allowPasswordLogin: true });
          this.isChecking.set(false);
        },
      });
      return;
    }

    // Demo mock responses - DEVELOPMENT ONLY
    setTimeout(() => {
      const emailParts = this.email.split('@');
      if (emailParts.length !== 2) {
        // Invalid email format - fallback to standard auth
        this.discovery.set({ requiresOAuth: false, allowPasswordLogin: true });
        this.isChecking.set(false);
        return;
      }

      const domain = emailParts[1];
      let result: DomainDiscoveryResponse;

      // Mock responses for demo purposes only
      if (domain === 'acme.com') {
        result = {
          provider: 'google',
          tenantId: 'acme-demo',
          domain: 'acme.com',
          requiresOAuth: true,
          allowPasswordLogin: false,
        };
      } else if (domain === 'techcorp.com') {
        result = {
          provider: 'microsoft',
          tenantId: 'techcorp-demo',
          domain: 'techcorp.com',
          requiresOAuth: true,
          allowPasswordLogin: false,
        };
      } else if (domain === 'startup.io') {
        result = {
          provider: 'google',
          tenantId: 'startup-demo',
          domain: 'startup.io',
          requiresOAuth: true,
          allowPasswordLogin: true,
        };
      } else {
        result = {
          requiresOAuth: false,
          allowPasswordLogin: true,
        };
      }

      this.discovery.set(result);
      this.isChecking.set(false);
    }, 1000);
  }

  loginWithSSO() {
    const disc = this.discovery();
    if (!disc?.provider) return;

    console.log('Starting OAuth flow:', disc);

    // In real app: this.authState.startOAuthFlow({ ... })
    this.showDemoMessage(
      `OAuth flow would redirect to ${disc.provider} for tenant: ${disc.tenantId}`,
    );
  }

  loginWithPassword() {
    console.log('Password login for:', this.email);

    // In real app: this.authState.login({ email, password })
    this.showDemoMessage(`Would login with password for: ${this.email}`);
  }

  loginWithProvider(provider: SocialProvider) {
    console.log('Social login with:', provider);

    // In real app: this.authState.startOAuthFlow({ provider })
    this.showDemoMessage(`Would login with ${provider}`);
  }

  /**
   * Shows demo messages using proper UI notification instead of alert()
   * to prevent accidental information disclosure in production
   */
  private showDemoMessage(message: string) {
    console.info('Demo:', message);
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getResultClass(): string {
    const disc = this.discovery();
    if (!disc) return '';

    if (disc.requiresOAuth && !disc.allowPasswordLogin) {
      return 'oauth-required';
    } else if (disc.requiresOAuth && disc.allowPasswordLogin) {
      return 'hybrid-auth';
    } else {
      return 'standard-auth';
    }
  }

  getResultIcon(): string {
    const disc = this.discovery();
    if (!disc) return '';

    if (disc.requiresOAuth && !disc.allowPasswordLogin) {
      return 'verified_user';
    } else if (disc.requiresOAuth && disc.allowPasswordLogin) {
      return 'security';
    } else {
      return 'login';
    }
  }

  getResultTitle(): string {
    const disc = this.discovery();
    if (!disc) return '';

    if (disc.requiresOAuth && !disc.allowPasswordLogin) {
      return 'Enterprise SSO Required';
    } else if (disc.requiresOAuth && disc.allowPasswordLogin) {
      return 'Hybrid Authentication Available';
    } else {
      return 'Standard Authentication';
    }
  }

  getCodeExample(): string {
    return `// Enable domain discovery in login component
<acp-login
  [enableDomainDiscovery]="true"
  [showSocialLogin]="true"
/>

// Or implement custom logic
checkDomain(email: string) {
  this.authState.discoverDomain(email).subscribe({
    next: (result) => {
      if (result.requiresOAuth) {
        this.showOAuthButton(result.provider);
      } else {
        this.showPasswordLogin();
      }
    }
  });
}

// Start OAuth flow
loginWithSSO() {
  this.authState.startOAuthFlow({
    provider: this.discovery.provider,
    tenantId: this.discovery.tenantId,
    domain: this.discovery.domain
  });
}`;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
