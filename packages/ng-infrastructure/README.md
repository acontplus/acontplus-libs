# @acontplus/ng-infrastructure

Angular infrastructure library providing HTTP interceptors with multi-language
support, repositories, adapters, and core services following clean architecture
patterns for robust enterprise applications.

## Installation

```bash
npm install @acontplus/ng-infrastructure
# or
pnpm add @acontplus/ng-infrastructure
```

## Peer Dependencies

- `@angular/common`: ^22.1.0
- `@angular/core`: ^22.1.0
- `@angular/router`: ^22.1.0
- `@acontplus/core`: ^1.2.0
- `@acontplus/ng-config`: ^1.1.0
- `@acontplus/ng-notifications`: ^1.0.0

## Features

- **HTTP Interceptors**: API request/response handling with localized error messages,
  `Accept-Language` header injection, HTTP context management, and loading indicators
- **Language Detection**: `LanguageInfo` service resolves language from JWT claims,
  session storage, and browser settings
- **Repository Pattern**: Base HTTP repository, generic repository, and
  repository factory
- **HTTP Adapters**: Angular HTTP client adapter for external service integration
- **Core Services**: Configuration, correlation tracking, language info, logging,
  and tenant management
- **Use Cases**: Base use case patterns with command and query separation (CQRS)
- **Clean Architecture**: Separation of concerns with infrastructure layer abstractions

## Quick Start

### Configure Interceptors

The recommended interceptor order is **httpContextInterceptor first**, then
apiInterceptor, then others:

```typescript
import {
  apiInterceptor,
  httpContextInterceptor,
  spinnerInterceptor,
  provideHttpContext,
} from '@acontplus/ng-infrastructure';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        httpContextInterceptor, // 1st: URL resolution, headers, Accept-Language, 401 refresh
        apiInterceptor, // 2nd: response normalization, localized toasts, Bearer tokens
        spinnerInterceptor, // 3rd: loading indicator
        // csrfInterceptor,       // 4th: CSRF tokens (from @acontplus/ng-auth)
      ]),
    ),
    provideHttpContext({
      enableLanguageHeader: true, // sends Accept-Language header
    }),
  ],
};
```

`provideHttpContext()` configures the `httpContextInterceptor`. Enable features
matching your backend contract:

```typescript
provideHttpContext({
  enableLanguageHeader: true, // add Accept-Language header (default: true)
  enableCorrelationTracking: true, // add Correlation-Id header (default: true)
  includeAuthToken: true, // add Authorization: Bearer header (default: true)
  baseUrlInjection: true, // prepend apiBaseUrl (default: true)
  refreshTokenCallback: () => authService.refreshToken(), // 401 refresh handler
  logoutCallback: () => authService.logout(), // failed refresh handler
});
```

## HTTP Interceptors

### API Interceptor

Handles API request/response transformation, **localized error messages**, and
notification display. Uses `@acontplus/core` `getLocalizedErrorMessage()` and
`getLocalizedAppMessage()` to show translated notifications based on the current
language.

```typescript
import { apiInterceptor } from '@acontplus/ng-infrastructure';

// Automatically handles:
// - Response standardization into ApiResponse envelope
// - Data unwrapping for success/warning responses
// - Localized toast notifications via LanguageInfo + AppMessageKey
// - Individual ApiError entries translated by error code
// - HTTP-level errors (0, 5xx) with localized titles and messages
// - SKIP_NOTIFICATION / SHOW_NOTIFICATIONS HttpContext tokens
```

#### HttpContext Tokens

```typescript
import { HttpContext } from '@angular/common/http';
import { SKIP_NOTIFICATION, SHOW_NOTIFICATIONS } from '@acontplus/ng-infrastructure';

// Suppress all toast notifications for this request
this.http.get('/api/health', { context: new HttpContext().set(SKIP_NOTIFICATION, true) });

// Force-show notifications even on GET requests or excluded URLs
this.http.get('/api/export', { context: new HttpContext().set(SHOW_NOTIFICATIONS, true) });
```

### HTTP Context Interceptor

Adds standard headers (`Correlation-Id`, `Tenant-Id`, `Request-Id`, `Accept-Language`,
`Client-Version`, `Client-Id`), resolves request URLs against `apiBaseUrl`, and
handles 401 token refresh, 403 forbidden, and 429 rate-limiting events.

```typescript
import { httpContextInterceptor } from '@acontplus/ng-infrastructure';

// Automatically adds:
// - Accept-Language: <bcp47 tag> (from LanguageInfo)
// - Correlation-Id, Request-Id, Timestamp
// - Tenant-Id (when multi-tenancy is enabled)
// - Client-Version, Client-Id
// - Authorization: Bearer (when auth token available)
// - Content-Type: application/json (for POST/PUT/PATCH with JSON body)
```

#### `Accept-Language` header

The interceptor resolves the current language from `LanguageInfo` (priority:
JWT `locale` claim → `sessionStorage` cache → browser `navigator.languages`)
and sends the corresponding BCP47 tag. Disable with `enableLanguageHeader: false`.

#### API base URL convention

Configure `Environment.apiBaseUrl` without a trailing slash. The interceptor safely joins it
with request paths, accepting paths with or without a leading slash.

```typescript
apiBaseUrl: 'https://api.example.com/gateway';
```

For example, both `auth/login` and `/auth/login` resolve to
`https://api.example.com/gateway/auth/login`. Absolute and protocol-relative URLs are left
unchanged. The interceptor deliberately does not use `new URL(path, baseUrl)`: it joins an API
prefix and endpoint rather than resolving an RFC 3986 relative reference, which could discard a
base path such as `/gateway`.

### Spinner Interceptor

Manages loading indicators during HTTP operations.

```typescript
import { spinnerInterceptor } from '@acontplus/ng-infrastructure';

// Automatically handles:
// - Loading state management
// - Spinner show/hide logic
// - Multiple concurrent request handling
// - Error state cleanup
```

## Repository Pattern

### Base HTTP Repository

Abstract base class for HTTP-based data access.

```typescript
import { BaseHttpRepository } from '@acontplus/ng-infrastructure';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryConfig } from '@acontplus/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserRepository extends BaseHttpRepository {
  protected override config: RepositoryConfig = {
    baseUrl: '/api',
    endpoint: 'users',
  };

  findAll(): Observable<User[]> {
    return this.get<User[]>();
  }
}
```

### Generic Repository

Generic repository implementation with type safety.

`GenericRepository` receives its `RepositoryConfig` through `REPOSITORY_CONFIG`.
For application services, prefer `RepositoryFactory` when a reusable CRUD
repository is sufficient.

### Repository Factory

Factory pattern for creating repository instances.

```typescript
import { RepositoryFactory } from '@acontplus/ng-infrastructure';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private repositoryFactory: RepositoryFactory) {}

  getUserRepository() {
    return this.repositoryFactory.create<User>({ baseUrl: '/api', endpoint: 'users' });
  }

  getCustomerRepository() {
    return this.repositoryFactory.create<Customer>({ baseUrl: '/api', endpoint: 'customers' });
  }
}
```

## HTTP Adapters

### Angular HTTP Adapter

Adapter for Angular HTTP client integration.

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AngularHttpAdapter } from '@acontplus/ng-infrastructure';

@Injectable({ providedIn: 'root' })
export class ExternalApiService {
  private readonly httpAdapter = new AngularHttpAdapter(
    inject(HttpClient),
    'https://api.example.com',
  );

  async fetchExternalData(): Promise<unknown> {
    return this.httpAdapter.get('data');
  }

  async postData(data: unknown): Promise<unknown> {
    return this.httpAdapter.post('data', data);
  }
}
```

## Core Services

### LanguageInfo Service

Detects and manages the current application language with a priority chain:
JWT `locale` claim → `sessionStorage` cache → browser `navigator.languages`.

```typescript
import { LanguageInfo } from '@acontplus/ng-infrastructure';
import { Language, languageToBcp47 } from '@acontplus/core';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  constructor(private languageInfo: LanguageInfo) {}

  getCurrentLanguage(): Language {
    return this.languageInfo.getCurrentLanguage();
  }

  getBcp47Tag(): string {
    return this.languageInfo.getBcp47Tag();
  }

  setLanguage(language: Language): void {
    this.languageInfo.setLanguage(language);
    // persists to sessionStorage automatically
  }
}
```

The `httpContextInterceptor` consumes `LanguageInfo` to set the `Accept-Language`
header on every request. The `apiInterceptor` uses it for localized toast
notifications.

**Signals**:

```typescript
const lang = this.languageInfo.language(); // Signal<Language>
const tag = this.languageInfo.bcp47Tag(); // Signal<string>
```

### Core Config Service

Manages application configuration and settings.

```typescript
import { CoreConfigService } from '@acontplus/ng-infrastructure';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private configService: CoreConfigService) {}

  getApiBaseUrl(): string {
    return this.configService.getConfig().apiBaseUrl;
  }

  getTimeout(): number | undefined {
    return this.configService.get('apiTimeout');
  }
}
```

### Correlation Service

Handles correlation IDs for distributed request tracing.

```typescript
import { CorrelationInfo } from '@acontplus/ng-infrastructure';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrackingService {
  constructor(private correlationInfo: CorrelationInfo) {}

  getCurrentCorrelationId(): string {
    return this.correlationInfo.getId();
  }

  resetCorrelationId(): void {
    this.correlationInfo.resetCorrelationId();
  }
}
```

### Logging Service

Structured logging with correlation tracking.

```typescript
import { LoggingService } from '@acontplus/ng-infrastructure';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  constructor(private logger: LoggingService) {}

  processOrder(order: Order): void {
    this.logger.info('Processing order', { orderId: order.id });

    try {
      // Business logic
      this.logger.info('Order processed successfully', { orderId: order.id });
    } catch (error) {
      this.logger.error('Order processing failed', error, {
        orderId: order.id,
      });
    }
  }
}
```

## Use Cases (CQRS Pattern)

### Base Use Case

Abstract base class for business logic encapsulation.

`Command` and `Query` capture `LoggingService` while Angular creates the
subclass. Register concrete subclasses with Angular DI; do not instantiate
them outside an injection context.

```typescript
import { BaseUseCase } from '@acontplus/ng-infrastructure';
import { Observable } from 'rxjs';

export class CreateUserUseCase extends BaseUseCase<CreateUserCommand, User> {
  constructor(
    private userRepository: UserRepository,
    private logger: LoggingService,
  ) {
    super();
  }

  execute(command: CreateUserCommand): Observable<User> {
    this.logger.info('Creating user', { email: command.email });

    // Validation
    this.validateCommand(command);

    // Business logic
    return this.userRepository.create({
      name: command.name,
      email: command.email,
    });
  }

  private validateCommand(command: CreateUserCommand): void {
    if (!command.email || !command.name) {
      throw new Error('Email and name are required');
    }
  }
}
```

### Commands and Queries

Separation of read and write operations.

```typescript
import { Command, Query } from '@acontplus/ng-infrastructure';
import { Observable } from 'rxjs';

// Command for write operations
export interface UpdateUserRequest {
  userId: number;
  name: string;
  email: string;
}

export class UpdateUserCommand extends Command<UpdateUserRequest, User> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  protected executeInternal(request: UpdateUserRequest): Observable<User> {
    return this.userRepository.update(request.userId, request);
  }
}

// Query for read operations
export class GetUserQuery extends Query<number, User> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  protected executeInternal(userId: number): Observable<User> {
    return this.userRepository.getById(userId);
  }
}
```
