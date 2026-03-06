# @acontplus/ng-config

Angular configuration library providing dependency injection tokens, repository
interfaces, and configuration constants for AcontPlus applications.

## Installation

```bash
# Using npm
npm install @acontplus/ng-config

# Using pnpm
pnpm add @acontplus/ng-config
```

## Features

- **Injection Tokens**: Type-safe DI tokens for environment, core config, and
  authentication
- **Repository Interfaces**: Base repository patterns and auth token repository
  contracts
- **Configuration Constants**: Authentication and application configuration
  constants
- **Base Repository**: Abstract base repository with common CRUD operations
- **TypeScript Support**: Full type safety with comprehensive interfaces

## Quick Start

### 1. Provide Environment Configuration

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { ENVIRONMENT } from '@acontplus/ng-config';
import { Environment } from '@acontplus/core';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [{ provide: ENVIRONMENT, useValue: environment }],
};
```

```typescript
// environments/environment.ts
import { Environment } from '@acontplus/core';

export const environment: Environment = {
  isProduction: false,
  apiBaseUrl: 'http://localhost:3000/api/',
  tokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  clientId: 'my-app',
  loginRoute: 'login',
};
```

### 2. Inject and Use Environment

```typescript
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@acontplus/ng-config';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private environment = inject(ENVIRONMENT);

  getApiUrl(): string {
    return this.environment.apiBaseUrl;
  }

  isProduction(): boolean {
    return this.environment.isProduction;
  }
}
```

## API Reference

### ENVIRONMENT Token

Injection token for environment configuration with default factory.

**Type:** `InjectionToken<Environment>`

**Default Value:**

```typescript
{
  isProduction: false,
  apiBaseUrl: 'http://localhost:4200/api/',
  tokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  clientId: 'angular-app',
  loginRoute: 'auth',
}
```

**Environment Interface:**

```typescript
interface Environment {
  apiBaseUrl: string; // Base URL for API requests
  isProduction: boolean; // Production mode flag
  tokenKey: string; // Storage key for access token
  refreshTokenKey: string; // Storage key for refresh token
  clientId: string; // Application client identifier
  loginRoute: string; // Route path for login page
}
```

**Usage:**

```typescript
import { inject } from '@angular/core';
import { ENVIRONMENT } from '@acontplus/ng-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private env = inject(ENVIRONMENT);

  getTokenKey(): string {
    return this.env.tokenKey;
  }

  getLoginRoute(): string {
    return this.env.loginRoute;
  }
}
```

### CORE_CONFIG Token

Injection token for core application configuration.

**Type:** `InjectionToken<CoreConfig>`

**Usage:**

```typescript
import { inject } from '@angular/core';
import { CORE_CONFIG } from '@acontplus/ng-config';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config = inject(CORE_CONFIG);

  getApiTimeout(): number {
    return this.config.apiTimeout;
  }
}
```

### AUTH_TOKEN Token

Injection token for authentication token configuration.

**Type:** `InjectionToken<string>`

**Usage:**

```typescript
import { inject } from '@angular/core';
import { AUTH_TOKEN } from '@acontplus/ng-config';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokenKey = inject(AUTH_TOKEN);

  getStorageKey(): string {
    return this.tokenKey;
  }
}
```

## Repository Interfaces

### AuthTokenRepository

Interface for authentication token storage and retrieval.

```typescript
export interface AuthTokenRepository {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
  getRefreshToken(): string | null;
  setRefreshToken(token: string): void;
  removeRefreshToken(): void;
}
```

**Usage:**

```typescript
import { AuthTokenRepository } from '@acontplus/ng-config';

@Injectable({ providedIn: 'root' })
export class LocalStorageTokenRepository implements AuthTokenRepository {
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  removeRefreshToken(): void {
    localStorage.removeItem('refresh_token');
  }
}
```

### BaseRepository

Interface for common CRUD operations.

```typescript
export interface BaseRepository<TEntity = any, TId = number> {
  findById(id: TId): Observable<TEntity>;
  findAll(): Observable<TEntity[]>;
  create(entity: Omit<TEntity, 'id'>): Observable<TEntity>;
  update(id: TId, entity: Partial<TEntity>): Observable<TEntity>;
  delete(id: TId): Observable<void>;
}
```

**Usage:**

```typescript
import { BaseRepository } from '@acontplus/ng-config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserRepository implements BaseRepository<User, number> {
  constructor(private http: HttpClient) {}

  findById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  create(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }
}
```

## Configuration Constants

### Authentication API

```typescript
import { AUTH_API } from '@acontplus/ng-config';

// Authentication API paths
const authPath = AUTH_API.AUTH; // 'auth/'
```

### Default Configuration

```typescript
import { DEFAULT_CONFIG } from '@acontplus/ng-config';

// Full application defaults
const apiTimeout = DEFAULT_CONFIG.apiTimeout; // 30000
const retryAttempts = DEFAULT_CONFIG.retryAttempts; // 2
const enableCorrelationTracking = DEFAULT_CONFIG.enableCorrelationTracking; // true
```
