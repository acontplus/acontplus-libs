# @acontplus/core

Core library for AcontPlus applications, providing essential utilities, domain models,
clean architecture patterns, internationalization infrastructure, and business logic
components following Domain-Driven Design (DDD) principles.

## Installation

```bash
npm install @acontplus/core
# or
pnpm add @acontplus/core
```

## Features

- **Internationalization**: Language enum (20 languages), BCP47 mapping, browser language
  detection, localized API error codes and application messages
- **API Response Handling**: `ApiResponse<T>` envelope, `ApiError` model, functional response
  helpers (`mapSuccess`, `flatMap`, `matchResponse`)
- **Clean Architecture**: Ports and adapters pattern for external integrations
- **Domain Models**: Base entities, value objects, and domain-specific models
- **Pricing Engine**: Comprehensive pricing calculations with discount, tax, profit, and line
  item calculators
- **Use Cases**: Base use case pattern for business logic encapsulation
- **Value Objects**: Money, EntityId, IdentificationNumber, and AuthTokens value objects
- **Environment Configuration**: Type-safe environment configuration interfaces
- **Constants**: Application constants including SRI document types
- **Type Definitions**: Comprehensive TypeScript type definitions for pricing and business logic
- **Environment Configuration**: Type-safe environment configuration interfaces
- **Type Definitions**: Comprehensive TypeScript type definitions for pricing and business logic

## Architecture

This library follows Clean Architecture principles with clear separation of concerns:

- **Enums**: Language codes, API error codes, application message keys
- **Ports**: Interfaces for external dependencies
- **Models**: Domain entities and data transfer objects
- **Helpers**: Functional response transformation utilities
- **Value Objects**: Immutable objects representing domain concepts
- **Types**: TypeScript definitions for type safety

## Usage

### Internationalization

The library provides a `Language` enum with 20 languages matching the .NET backend
`Acontplus.Core.Enums.Language` enum, plus browser detection and BCP47 tag mapping.

```typescript
import {
  Language,
  languageToBcp47,
  bcp47ToLanguage,
  detectBrowserLanguage,
  detectBrowserLanguages,
} from '@acontplus/core';

const lang = detectBrowserLanguage();
console.log(languageToBcp47(lang));
// e.g. 'es' for Spanish (Ecuador), 'en' for English, 'fr' for French

console.log(bcp47ToLanguage('zh-TW'));
// Language.ChineseTraditional (8) — respects zh-cn vs zh-tw regions

const browserLangs = detectBrowserLanguages();
// ['es-EC', 'en-US', 'fr'] — from navigator.languages
```

#### `Language` enum values

| Value                               | BCP47     | Language                |
| ----------------------------------- | --------- | ----------------------- |
| `Language.English` (1)              | `en`      | English                 |
| `Language.Spanish` (2)              | `es`      | Spanish (Spain)         |
| `Language.SpanishLatinAmerica` (20) | `es-419`  | Spanish (Latin America) |
| `Language.French` (3)               | `fr`      | French                  |
| `Language.German` (4)               | `de`      | German                  |
| `Language.Italian` (5)              | `it`      | Italian                 |
| `Language.Portuguese` (6)           | `pt`      | Portuguese              |
| `Language.ChineseSimplified` (7)    | `zh-Hans` | Chinese (Simplified)    |
| `Language.ChineseTraditional` (8)   | `zh-Hant` | Chinese (Traditional)   |
| `Language.Japanese` (9)             | `ja`      | Japanese                |
| `Language.Korean` (10)              | `ko`      | Korean                  |
| `Language.Russian` (11)             | `ru`      | Russian                 |
| `Language.Arabic` (12)              | `ar`      | Arabic                  |
| `Language.Dutch` (13)               | `nl`      | Dutch                   |
| `Language.Swedish` (14)             | `sv`      | Swedish                 |
| `Language.Norwegian` (15)           | `nb`      | Norwegian               |
| `Language.Danish` (16)              | `da`      | Danish                  |
| `Language.Finnish` (17)             | `fi`      | Finnish                 |
| `Language.Polish` (18)              | `pl`      | Polish                  |
| `Language.Hindi` (19)               | `hi`      | Hindi                   |

### Localized API Error Codes

`ApiErrorCode` enum maps server error codes to human-readable, translated messages.
Supports all 20 languages with fallback to English for unsupported languages.

```typescript
import {
  ApiErrorCode,
  getLocalizedErrorMessage,
  hasLocalizedMessage,
  Language,
} from '@acontplus/core';

const message = getLocalizedErrorMessage(ApiErrorCode.NOT_FOUND, Language.Spanish);
// 'Recurso no encontrado'

const esMessage = getLocalizedErrorMessage('UNHANDLED_ERROR', Language.Spanish);
// 'Ha ocurrido un error inesperado'

const unknown = getLocalizedErrorMessage('CUSTOM_APP_CODE', Language.Spanish, 'Fallback text');
// 'Fallback text' — returns the fallback when no translation exists

if (hasLocalizedMessage('BAD_REQUEST')) {
  // code has a known translation
}
```

**Supported error codes** (matching the .NET `ApiExceptionMiddleware`):

| Code                  | English                  | Spanish                    |
| --------------------- | ------------------------ | -------------------------- |
| `BAD_REQUEST`         | Invalid request          | Solicitud inválida         |
| `UNAUTHORIZED`        | Authentication required  | Autenticación requerida    |
| `FORBIDDEN`           | Access denied            | Acceso denegado            |
| `NOT_FOUND`           | Resource not found       | Recurso no encontrado      |
| `CONFLICT`            | Conflict occurred        | Conflicto detectado        |
| `METHOD_NOT_ALLOWED`  | Method not allowed       | Método no permitido        |
| `VALIDATION_ERROR`    | Validation failed        | Validación fallida         |
| `RATE_LIMITED`        | Too many requests        | Demasiadas solicitudes     |
| `INTERNAL_ERROR`      | Internal server error    | Error interno del servidor |
| `SERVICE_UNAVAILABLE` | Service unavailable      | Servicio no disponible     |
| `TIMEOUT`             | Request timeout          | Tiempo de espera agotado   |
| `NETWORK_ERROR`       | Network connection error | Error de conexión de red   |
| `UNHANDLED_ERROR`     | Unexpected error         | Error inesperado           |

### Localized Application Messages

`AppMessageKey` provides translated UI strings for success notifications, error
titles, and common actions. Used by `apiInterceptor` and `NotificationService`.

```typescript
import { AppMessageKey, getLocalizedAppMessage, Language } from '@acontplus/core';

const msg = getLocalizedAppMessage(AppMessageKey.DATA_SAVED, Language.Spanish);
// 'Datos guardados exitosamente'

const title = getLocalizedAppMessage(AppMessageKey.CONNECTION_ERROR, Language.French);
// 'Erreur de connexion'
```

**Available message keys**:

| Key                        | English                          | Category |
| -------------------------- | -------------------------------- | -------- |
| `OPERATION_COMPLETED`      | Operation completed successfully | Success  |
| `DATA_SAVED`               | Data saved successfully          | Success  |
| `DATA_UPDATED`             | Data updated successfully        | Success  |
| `ITEM_DELETED`             | Item deleted successfully        | Success  |
| `ITEM_CREATED`             | Item created successfully        | Success  |
| `UPLOADED`                 | File uploaded successfully       | Success  |
| `SYNCED`                   | Data synchronized successfully   | Success  |
| `FAILED_SAVE`              | Failed to save data              | Error    |
| `FAILED_DELETE`            | Failed to delete item            | Error    |
| `FAILED_UPDATE`            | Failed to update data            | Error    |
| `FAILED_UPLOAD`            | Failed to upload file            | Error    |
| `UNEXPECTED_ERROR`         | An unexpected error occurred     | Error    |
| `CONNECTION_ERROR`         | Connection Error                 | Title    |
| `SERVER_ERROR`             | Server Error                     | Title    |
| `ERROR`                    | Error                            | Title    |
| `NETWORK_UNAVAILABLE`      | Unable to connect to server      | Error    |
| `VALIDATION_ERROR_MESSAGE` | Validation error                 | Error    |
| `UNAUTHORIZED_ACCESS`      | Unauthorized access              | Error    |
| `UNSAVED_CHANGES`          | You have unsaved changes         | Warning  |
| `SESSION_EXPIRING`         | Your session is about to expire  | Warning  |
| `LOADING`                  | Loading data...                  | Info     |
| `PROCESSING`               | Processing request...            | Info     |

Pre-built translations exist for: English, Spanish, Spanish (Latin America),
French, German, Italian, and Portuguese. Other languages fall back to English.

### API Response Handling

#### Response Envelope

```typescript
import { ApiResponse, ApiError } from '@acontplus/core';

interface ApiResponse<T> {
  status: 'success' | 'error' | 'warning';
  code: string;
  data?: T;
  message?: string;
  errors?: ApiError[];
  warnings?: ApiError[];
  metadata?: Record<string, unknown>;
  correlationId?: string;
  traceId?: string;
  timestamp: string;
}

interface ApiError {
  code: string;
  message: string;
  target?: string;
  details?: Record<string, unknown>;
  severity?: string;
  category?: string;
  helpUrl?: string;
  suggestedAction?: string;
  traceId?: string;
}
```

#### Response Helpers

Functional utilities for transforming `ApiResponse<T>` envelopes, inspired by the
backend `Result<TValue, TError>` monad and `ResultApiExtensions`.

```typescript
import {
  mapSuccess,
  flatMap,
  matchResponse,
  extractData,
  extractErrors,
  firstErrorMessage,
  hasErrorCode,
  toApiError,
  successResponse,
  errorResponse,
  singleErrorResponse,
} from '@acontplus/core';

const response = successResponse(user);
const mapped = mapSuccess(response, user => user.name);
// ApiResponse<string> with data = user.name

const result = flatMap(getUser(1), user => successResponse(user.profile));
// chains two ApiResponse operations

const msg = matchResponse(
  getData(),
  data => `Got ${data}`,
  err => `Failed: ${firstErrorMessage(err)}`,
);

const data = extractData(response);
// T | undefined

const errors = extractErrors(errorResponse);
// ApiError[]

if (hasErrorCode(response, 'NOT_FOUND')) {
  /* ... */
}
```

#### Envelope Factories

```typescript
const success = successResponse({ id: 1 }, 'Created');
// { status: 'success', code: '200', data: { id: 1 }, message: 'Created', ... }

const errors = [toApiError('VAL_001', 'Name is required')];
const failure = errorResponse(errors, '422', 'Validation failed');
// { status: 'error', code: '422', errors: [...], message: 'Validation failed', ... }

const single = singleErrorResponse('NF', 'Not found', '404');
// Convenience for single-error responses
```

### Domain Models

```typescript
import { BaseEntity, ApiResponse, PagedResult } from '@acontplus/core';

class Customer extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
  ) {
    super();
  }
}

const paginated: PagedResult<Customer> = {
  items: customers,
  totalCount: 100,
  pageIndex: 1,
  pageSize: 10,
  totalPages: 10,
  hasPreviousPage: false,
  hasNextPage: true,
};
```

### Pricing Calculations

```typescript
import {
  DiscountCalculator,
  TaxCalculator,
  PricingCalculator,
  ProfitCalculator,
  LineItemCalculator,
} from '@acontplus/core';

const discountCalc = new DiscountCalculator();
const discount = discountCalc.calculate(100, 10);

const taxCalc = new TaxCalculator();
const tax = taxCalc.calculate(100, 0.12);

const profitCalc = new ProfitCalculator();
const profit = profitCalc.calculate(cost, sellingPrice);

const lineItemCalc = new LineItemCalculator();
const lineTotal = lineItemCalc.calculate(quantity, unitPrice, discount, tax);

const pricingCalc = new PricingCalculator();
const finalPrice = pricingCalc.calculateTotal(items, discounts, taxes);
```

### Value Objects

```typescript
import { MoneyVo, EntityIdVo, IdentificationNumberVo, AuthTokens } from '@acontplus/core';

const price = new MoneyVo(99.99, 'USD');
const discountedPrice = price.subtract(new MoneyVo(10.0, 'USD'));

const customerId = new EntityIdVo('12345');

const ecuadorianId = new IdentificationNumberVo('1234567890');

const tokens = new AuthTokens('access_token', 'refresh_token');
```

### Use Cases

```typescript
import { UseCase } from '@acontplus/core';
import { Observable } from 'rxjs';

class CreateCustomerUseCase implements UseCase<CreateCustomerRequest, Customer> {
  constructor(private customerRepository: CustomerRepository) {}

  execute(request: CreateCustomerRequest): Observable<Customer> {
    this.validateRequest(request);
    return this.customerRepository.create(request);
  }

  private validateRequest(request: CreateCustomerRequest): void {
    if (!request.name?.trim()) {
      throw new Error('Customer name is required');
    }
  }
}
```

### Constants

```typescript
import {
  SRI_DOCUMENT_TYPE,
  SRI_DOCUMENT_TYPE_CUSTOM,
  SEPARATOR_KEY_CODE,
  SEPARADORES_REGEX,
} from '@acontplus/core';

const invoiceType = SRI_DOCUMENT_TYPE.FACTURA;
const customType = SRI_DOCUMENT_TYPE_CUSTOM.PROFORMA;
const separatorCode = SEPARATOR_KEY_CODE.DASH;
const separatorPattern = SEPARADORES_REGEX;
```

### Environment Configuration

```typescript
import { Environment } from '@acontplus/core';

const environment: Environment = {
  apiBaseUrl: 'https://api.example.com',
  isProduction: false,
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  clientId: 'your-client-id',
  loginRoute: 'login',
};
```
