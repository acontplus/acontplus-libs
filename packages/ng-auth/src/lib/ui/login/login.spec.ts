// src/lib/ui/login/login.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Login } from './login';
import { AuthState } from '../../services/auth-state';
import { LoggingService } from '@acontplus/ng-infrastructure';
import { DomainDiscoveryResponse, SocialProvider } from '../../domain/models/auth';
import { AuthTokens } from '@acontplus/core';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authState: jest.Mocked<AuthState>;
  let loggingService: jest.Mocked<LoggingService>;

  const mockDiscoveryResponse: DomainDiscoveryResponse = {
    domain: 'example.com',
    tenantId: 'tenant-123',
    requiresOAuth: true,
    allowPasswordLogin: false,
    provider: 'google' as SocialProvider,
  };

  beforeEach(async () => {
    const authStateMock = {
      login: jest.fn(),
      register: jest.fn(),
      discoverDomain: jest.fn(),
      startOAuthFlow: jest.fn(),
    };

    const loggingServiceMock = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: AuthState, useValue: authStateMock },
        { provide: LoggingService, useValue: loggingServiceMock },
      ],
    }).compileComponents();

    authState = TestBed.inject(AuthState) as jest.Mocked<AuthState>;
    loggingService = TestBed.inject(LoggingService) as jest.Mocked<LoggingService>;
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with login mode', () => {
      expect(component.isLoginMode()).toBe(true);
    });

    it('should create signin and signup forms', () => {
      expect(component.signinForm).toBeDefined();
      expect(component.signupForm).toBeDefined();
    });

    it('should initialize signin form with required controls', () => {
      expect(component.signinForm.get('email')).toBeDefined();
      expect(component.signinForm.get('password')).toBeDefined();
      expect(component.signinForm.get('rememberMe')).toBeDefined();
    });

    it('should initialize signup form with required controls', () => {
      expect(component.signupForm.get('displayName')).toBeDefined();
      expect(component.signupForm.get('email')).toBeDefined();
      expect(component.signupForm.get('password')).toBeDefined();
    });

    it('should remove rememberMe control when showRememberMe is false', () => {
      // Arrange
      fixture.componentRef.setInput('showRememberMe', false);

      // Act
      component.ngOnInit();

      // Assert
      expect(component.signinForm.get('rememberMe')).toBeNull();
    });

    it('should add additional signin controls from input', () => {
      // Arrange
      const additionalControls = {
        customField: new FormControl('', Validators.required),
      };
      fixture.componentRef.setInput('additionalSigninControls', additionalControls);

      // Act
      component.ngOnInit();

      // Assert
      expect(component.signinForm.get('customField')).toBeDefined();
    });

    it('should add additional signup controls from input', () => {
      // Arrange
      const additionalControls = {
        phoneNumber: new FormControl('', Validators.required),
      };
      fixture.componentRef.setInput('additionalSignupControls', additionalControls);

      // Act
      component.ngOnInit();

      // Assert
      expect(component.signupForm.get('phoneNumber')).toBeDefined();
    });
  });

  describe('Sign In', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should call authState.login with correct credentials on valid signin', (done) => {
      // Arrange
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      };
      authState.login.mockReturnValue(of(new AuthTokens('token', 'refresh')));
      component.signinForm.patchValue(credentials);

      // Act
      component.signIn();

      // Assert
      expect(authState.login).toHaveBeenCalledWith(credentials);
      expect(component.isLoading()).toBe(false);
      expect(component.errorMessage()).toBeNull();
      done();
    });

    it('should set loading state during signin', () => {
      // Arrange
      authState.login.mockReturnValue(of(new AuthTokens('token', 'refresh')));
      component.signinForm.patchValue({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      });

      // Act
      component.isLoading.set(false);
      component.signIn();

      // Assert - loading is set to true during call, then false after
      expect(component.isLoading()).toBe(false);
    });

    it('should default rememberMe to false when showRememberMe is false', () => {
      // Arrange
      fixture.componentRef.setInput('showRememberMe', false);
      component.ngOnInit();
      authState.login.mockReturnValue(of(new AuthTokens('token', 'refresh')));
      component.signinForm.patchValue({
        email: 'test@example.com',
        password: 'password123',
      });

      // Act
      component.signIn();

      // Assert
      expect(authState.login).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          password: 'password123',
          rememberMe: false,
        }),
      );
    });

    it('should handle signin error', (done) => {
      // Arrange
      const error = new Error('Invalid credentials');
      authState.login.mockReturnValue(throwError(() => error));
      component.signinForm.patchValue({
        email: 'test@example.com',
        password: 'wrongpassword',
        rememberMe: false,
      });

      // Act
      component.signIn();

      // Assert
      setTimeout(() => {
        expect(component.isLoading()).toBe(false);
        expect(component.errorMessage()).toBe(
          'Error al iniciar sesión. Verifique sus credenciales.',
        );
        expect(loggingService.error).toHaveBeenCalledWith('Login failed', { error });
        done();
      }, 0);
    });

    it('should not call authState.login when form is invalid', () => {
      // Arrange
      component.signinForm.patchValue({
        email: 'invalid-email',
        password: '',
      });

      // Act
      component.signIn();

      // Assert
      expect(authState.login).not.toHaveBeenCalled();
    });

    it('should clear error message before signin', () => {
      // Arrange
      authState.login.mockReturnValue(of(new AuthTokens('token', 'refresh')));
      component.errorMessage.set('Previous error');
      component.signinForm.patchValue({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      });

      // Act
      component.signIn();

      // Assert
      expect(component.errorMessage()).toBeNull();
    });
  });

  describe('Register', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should call authState.register with correct data on valid registration', (done) => {
      // Arrange
      const registerData = {
        displayName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      authState.register.mockReturnValue(of(new AuthTokens('token', 'refresh')));
      component.signupForm.patchValue(registerData);

      // Act
      component.registerUser();

      // Assert
      setTimeout(() => {
        expect(authState.register).toHaveBeenCalledWith(registerData);
        expect(component.isLoading()).toBe(false);
        expect(component.errorMessage()).toBeNull();
        expect(component.isLoginMode()).toBe(true);
        done();
      }, 0);
    });

    it('should reset signup form after successful registration', (done) => {
      // Arrange
      authState.register.mockReturnValue(of(new AuthTokens('token', 'refresh')));
      component.signupForm.patchValue({
        displayName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      // Act
      component.registerUser();

      // Assert
      setTimeout(() => {
        expect(component.signupForm.value).toEqual({
          displayName: null,
          email: null,
          password: null,
        });
        done();
      }, 0);
    });

    it('should switch to login mode after successful registration', (done) => {
      // Arrange
      authState.register.mockReturnValue(of(new AuthTokens('token', 'refresh')));
      component.isLoginMode.set(false);
      component.signupForm.patchValue({
        displayName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      // Act
      component.registerUser();

      // Assert
      setTimeout(() => {
        expect(component.isLoginMode()).toBe(true);
        done();
      }, 0);
    });

    it('should handle registration error', (done) => {
      // Arrange
      const error = new Error('Email already exists');
      authState.register.mockReturnValue(throwError(() => error));
      component.signupForm.patchValue({
        displayName: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      });

      // Act
      component.registerUser();

      // Assert
      setTimeout(() => {
        expect(component.isLoading()).toBe(false);
        expect(component.errorMessage()).toBe('Error al registrar usuario. Intente nuevamente.');
        expect(loggingService.error).toHaveBeenCalledWith('Register error', { error });
        done();
      }, 0);
    });

    it('should not call authState.register when form is invalid', () => {
      // Arrange
      component.signupForm.patchValue({
        displayName: '',
        email: 'invalid-email',
        password: '123', // Too short
      });

      // Act
      component.registerUser();

      // Assert
      expect(authState.register).not.toHaveBeenCalled();
    });

    it('should require password with minimum length of 6', () => {
      // Arrange
      component.signupForm.patchValue({
        displayName: 'Test User',
        email: 'test@example.com',
        password: '12345', // Only 5 characters
      });

      // Assert
      expect(component.signupForm.valid).toBe(false);
      expect(component.signupForm.get('password')?.hasError('minlength')).toBe(true);
    });
  });

  describe('Mode Switching', () => {
    it('should switch from login to register mode', () => {
      // Arrange
      component.isLoginMode.set(true);

      // Act
      component.switchMode();

      // Assert
      expect(component.isLoginMode()).toBe(false);
    });

    it('should switch from register to login mode', () => {
      // Arrange
      component.isLoginMode.set(false);

      // Act
      component.switchMode();

      // Assert
      expect(component.isLoginMode()).toBe(true);
    });

    it('should clear error message when switching modes', () => {
      // Arrange
      component.errorMessage.set('Some error');

      // Act
      component.switchMode();

      // Assert
      expect(component.errorMessage()).toBeNull();
    });
  });

  describe('Domain Discovery', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('enableDomainDiscovery', true);
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should trigger domain discovery on valid email input', (done) => {
      // Arrange
      authState.discoverDomain.mockReturnValue(of(mockDiscoveryResponse));

      // Act
      component.signinForm.get('email')?.setValue('user@example.com');

      // Assert
      setTimeout(() => {
        expect(authState.discoverDomain).toHaveBeenCalledWith('user@example.com');
        expect(component.discoveryResult()).toEqual(mockDiscoveryResponse);
        done();
      }, 100);
    });

    it('should disable password field when OAuth is required and password login is not allowed', (done) => {
      // Arrange
      authState.discoverDomain.mockReturnValue(of(mockDiscoveryResponse));

      // Act
      component.signinForm.get('email')?.setValue('user@example.com');

      // Assert
      setTimeout(() => {
        expect(component.showPasswordLogin()).toBe(false);
        expect(component.signinForm.get('password')?.disabled).toBe(true);
        done();
      }, 100);
    });

    it('should enable password field when password login is allowed', (done) => {
      // Arrange
      const discoveryWithPassword: DomainDiscoveryResponse = {
        ...mockDiscoveryResponse,
        allowPasswordLogin: true,
      };
      authState.discoverDomain.mockReturnValue(of(discoveryWithPassword));

      // Act
      component.signinForm.get('email')?.setValue('user@example.com');

      // Assert
      setTimeout(() => {
        expect(component.showPasswordLogin()).toBe(true);
        expect(component.signinForm.get('password')?.disabled).toBe(false);
        done();
      }, 100);
    });

    it('should handle domain discovery error gracefully', (done) => {
      // Arrange
      const error = new Error('Discovery failed');
      authState.discoverDomain.mockReturnValue(throwError(() => error));

      // Act
      component.signinForm.get('email')?.setValue('user@example.com');

      // Assert
      setTimeout(() => {
        expect(loggingService.warn).toHaveBeenCalledWith('Domain discovery failed', { error });
        expect(component.discoveryResult()).toBeNull();
        expect(component.showPasswordLogin()).toBe(true);
        done();
      }, 100);
    });

    it('should not trigger discovery for invalid email', (done) => {
      // Arrange
      authState.discoverDomain.mockReturnValue(of(mockDiscoveryResponse));

      // Act
      component.signinForm.get('email')?.setValue('invalid-email');

      // Assert
      setTimeout(() => {
        expect(authState.discoverDomain).not.toHaveBeenCalled();
        done();
      }, 100);
    });
  });

  describe('OAuth and Social Login', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should start OAuth flow with discovered provider', () => {
      // Arrange
      component.discoveryResult.set(mockDiscoveryResponse);

      // Act
      component.loginWithProvider();

      // Assert
      expect(authState.startOAuthFlow).toHaveBeenCalledWith({
        provider: 'google',
        tenantId: 'tenant-123',
        domain: 'example.com',
      });
    });

    it('should start OAuth flow with specified provider', () => {
      // Arrange
      component.discoveryResult.set(null);

      // Act
      component.loginWithProvider('github' as SocialProvider);

      // Assert
      expect(authState.startOAuthFlow).toHaveBeenCalledWith({
        provider: 'github',
        tenantId: undefined,
        domain: undefined,
      });
    });

    it('should set loading state when starting OAuth flow', () => {
      // Arrange
      component.discoveryResult.set(mockDiscoveryResponse);
      component.isLoading.set(false);

      // Act
      component.loginWithProvider();

      // Assert
      expect(component.isLoading()).toBe(true);
    });

    it('should clear error message when starting OAuth flow', () => {
      // Arrange
      component.discoveryResult.set(mockDiscoveryResponse);
      component.errorMessage.set('Some error');

      // Act
      component.loginWithProvider();

      // Assert
      expect(component.errorMessage()).toBeNull();
    });

    it('should show error when no provider is configured', () => {
      // Arrange
      component.discoveryResult.set(null);

      // Act
      component.loginWithProvider();

      // Assert
      expect(component.errorMessage()).toBe('No authentication provider configured');
      expect(authState.startOAuthFlow).not.toHaveBeenCalled();
    });

    it('should handle social login button clicks', () => {
      // Arrange
      const provider = 'google' as SocialProvider;

      // Act
      component.socialLogin(provider);

      // Assert
      expect(authState.startOAuthFlow).toHaveBeenCalledWith({
        provider: 'google',
        tenantId: undefined,
        domain: undefined,
      });
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should require email in signin form', () => {
      // Arrange
      component.signinForm.get('email')?.setValue('');

      // Assert
      expect(component.signinForm.get('email')?.hasError('required')).toBe(true);
    });

    it('should validate email format in signin form', () => {
      // Arrange
      component.signinForm.get('email')?.setValue('invalid-email');

      // Assert
      expect(component.signinForm.get('email')?.hasError('email')).toBe(true);
    });

    it('should require password in signin form', () => {
      // Arrange
      component.signinForm.get('password')?.setValue('');

      // Assert
      expect(component.signinForm.get('password')?.hasError('required')).toBe(true);
    });

    it('should require displayName in signup form', () => {
      // Arrange
      component.signupForm.get('displayName')?.setValue('');

      // Assert
      expect(component.signupForm.get('displayName')?.hasError('required')).toBe(true);
    });

    it('should require email in signup form', () => {
      // Arrange
      component.signupForm.get('email')?.setValue('');

      // Assert
      expect(component.signupForm.get('email')?.hasError('required')).toBe(true);
    });

    it('should validate email format in signup form', () => {
      // Arrange
      component.signupForm.get('email')?.setValue('invalid-email');

      // Assert
      expect(component.signupForm.get('email')?.hasError('email')).toBe(true);
    });

    it('should require password in signup form', () => {
      // Arrange
      component.signupForm.get('password')?.setValue('');

      // Assert
      expect(component.signupForm.get('password')?.hasError('required')).toBe(true);
    });

    it('should enforce minimum password length in signup form', () => {
      // Arrange
      component.signupForm.get('password')?.setValue('12345');

      // Assert
      expect(component.signupForm.get('password')?.hasError('minlength')).toBe(true);
    });
  });

  describe('Input Signals', () => {
    it('should use custom title', () => {
      // Arrange
      fixture.componentRef.setInput('title', 'Custom Login Title');

      // Assert
      expect(component.title()).toBe('Custom Login Title');
    });

    it('should hide register button when showRegisterButton is false', () => {
      // Arrange
      fixture.componentRef.setInput('showRegisterButton', false);

      // Assert
      expect(component.showRegisterButton()).toBe(false);
    });

    it('should hide social login when showSocialLogin is false', () => {
      // Arrange
      fixture.componentRef.setInput('showSocialLogin', false);

      // Assert
      expect(component.showSocialLogin()).toBe(false);
    });

    it('should disable domain discovery by default', () => {
      // Assert
      expect(component.enableDomainDiscovery()).toBe(false);
    });

    it('should compute hasFooterContent correctly when footer is null', () => {
      // Arrange
      fixture.componentRef.setInput('footerContent', null);

      // Assert
      expect(component.hasFooterContent()).toBe(false);
    });
  });
});
