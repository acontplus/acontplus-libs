// src/lib/presentation/components/login/login.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  computed,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthState } from '../../services/auth-state';
import { LoggingService } from '@acontplus/ng-infrastructure';
import { DomainDiscoveryResponse, SocialProvider } from '../../domain/models/auth';
import { DEFAULT_ICONS } from '@acontplus/ui-kit';

@Component({
  selector: 'acp-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatLabel,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatIcon,
    MatButton,
    MatCardFooter,
    MatAnchor,
    MatCheckbox,
    MatDivider,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Login implements OnInit {
  title = input<string>('Login');
  showRegisterButton = input<boolean>(true);
  showRememberMe = input<boolean>(true);
  enableDomainDiscovery = input<boolean>(false); // Enable multi-tenant domain discovery
  showSocialLogin = input<boolean>(true); // Show social login buttons

  // Additional form controls that can be passed from parent components
  additionalSigninControls = input<Record<string, AbstractControl>>({});
  additionalSignupControls = input<Record<string, AbstractControl>>({});

  // Additional field templates
  additionalSigninFields = input<TemplateRef<unknown> | null>(null);
  additionalSignupFields = input<TemplateRef<unknown> | null>(null);

  // Footer content template
  footerContent = input<TemplateRef<unknown> | null>(null);

  // Computed signal to check if footer content exists
  hasFooterContent = computed(() => this.footerContent() !== null);

  private readonly fb = inject(FormBuilder);
  private readonly authState = inject(AuthState);
  private readonly loggingService = inject(LoggingService);
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  // Angular 20+ signals
  isLoginMode = signal(true);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  discoveryResult = signal<DomainDiscoveryResponse | null>(null);
  showPasswordLogin = signal(true);

  signinForm: FormGroup;
  signupForm: FormGroup;

  constructor() {
    // Register social login icons
    this.registerSocialIcons();

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false], // Default to false (unchecked)
    });

    this.signupForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private registerSocialIcons(): void {
    const socialIconNames = ['google', 'microsoft', 'github', 'facebook', 'apple', 'linkedin'];
    socialIconNames.forEach((name) => {
      const icon = DEFAULT_ICONS.find((i) => i.name === name);
      if (icon) {
        this.iconRegistry.addSvgIconLiteral(
          name,
          this.sanitizer.bypassSecurityTrustHtml(icon.data),
        );
      }
    });
  }

  ngOnInit(): void {
    // Handle rememberMe control based on showRememberMe input
    if (!this.showRememberMe()) {
      // Remove rememberMe control if not needed
      this.signinForm.removeControl('rememberMe');
    }

    // Add additional controls to signin form
    Object.entries(this.additionalSigninControls()).forEach(([key, control]) => {
      this.signinForm.addControl(key, control);
    });

    // Add additional controls to signup form
    Object.entries(this.additionalSignupControls()).forEach(([key, control]) => {
      this.signupForm.addControl(key, control);
    });

    // Set up domain discovery on email change if enabled
    if (this.enableDomainDiscovery()) {
      this.signinForm.get('email')?.valueChanges.subscribe((email: string) => {
        if (email && this.isValidEmail(email)) {
          this.checkDomain(email);
        }
      });
    }
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private checkDomain(email: string): void {
    this.authState.discoverDomain(email).subscribe({
      next: (result) => {
        this.discoveryResult.set(result);
        this.showPasswordLogin.set(result.allowPasswordLogin);

        // If domain requires OAuth and doesn't allow password login, hide password field
        if (result.requiresOAuth && !result.allowPasswordLogin) {
          this.signinForm.get('password')?.disable();
        } else {
          this.signinForm.get('password')?.enable();
        }
      },
      error: (err) => {
        // Silently handle discovery errors - fallback to standard login
        this.loggingService.warn('Domain discovery failed', { error: err });
        this.discoveryResult.set(null);
        this.showPasswordLogin.set(true);
      },
    });
  }

  switchMode(): void {
    this.isLoginMode.set(!this.isLoginMode());
    this.errorMessage.set(null);
  }

  signIn(): void {
    if (this.signinForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      // Prepare login request with rememberMe handling
      const loginRequest = {
        ...this.signinForm.value,
        // If showRememberMe is false, default rememberMe to false
        rememberMe: this.showRememberMe() ? (this.signinForm.value.rememberMe ?? false) : false,
      };

      this.authState.login(loginRequest).subscribe({
        next: () => {
          this.isLoading.set(false);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set('Error al iniciar sesión. Verifique sus credenciales.');
          this.loggingService.error('Login failed', { error });
        },
      });
    }
  }

  registerUser(): void {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authState.register(this.signupForm.value).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.signupForm.reset();
          this.isLoginMode.set(true);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set('Error al registrar usuario. Intente nuevamente.');
          this.loggingService.error('Register error', { error });
        },
      });
    }
  }

  /**
   * Start OAuth flow for discovered provider or specified provider
   */
  loginWithProvider(provider?: SocialProvider): void {
    const discovery = this.discoveryResult();
    const finalProvider = provider || discovery?.provider;

    if (!finalProvider) {
      this.errorMessage.set('No authentication provider configured');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authState.startOAuthFlow({
      provider: finalProvider,
      tenantId: discovery?.tenantId,
      domain: discovery?.domain,
    });
  }

  /**
   * Handle direct social login button clicks
   */
  socialLogin(provider: SocialProvider): void {
    this.loginWithProvider(provider);
  }
}
