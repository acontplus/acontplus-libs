# API Response Handling

How `@acontplus/ng-infrastructure` automatically standardizes all HTTP responses and handles user notifications across the application.

---

## Overview

The `apiInterceptor` in `@acontplus/ng-infrastructure` intercepts every HTTP request/response and:

1. **Standardizes** all responses to `ApiResponse<T>` format
2. **Extracts** the `data` field and returns it directly to repositories
3. **Shows toasts** automatically based on HTTP method and response status
4. **Handles errors** for 5xx and network failures globally
5. **Retries** failed requests up to 2 times with 1-second delay

No manual unwrapping needed in repositories or components.

---

## ApiResponse<T> Format

```typescript
interface ApiResponse<T = any> {
  status: 'success' | 'error' | 'warning';
  code: string; // e.g. "200", "400"
  message?: string;
  data?: T;
  errors?: ApiError[];
  warnings?: ApiWarning[];
  timestamp: string;
}
```

The interceptor handles all three backend response styles:

| Backend returns                  | Interceptor behavior                           |
| -------------------------------- | ---------------------------------------------- |
| Valid `ApiResponse<T>`           | Passes through, extracts `data` for repository |
| Raw data object `{ id, name }`   | Wraps in `ApiResponse`, extracts as-is         |
| Primitive value (string, number) | Wraps in `ApiResponse`                         |
| `null` / `undefined`             | Creates empty success `ApiResponse`            |

---

## Automatic Toast Notifications

### When toasts ARE shown

| HTTP Method                      | Condition                          | Toast type                             |
| -------------------------------- | ---------------------------------- | -------------------------------------- |
| `POST`, `PUT`, `PATCH`, `DELETE` | `status: "success"` with `message` | Success                                |
| Any                              | `status: "warning"`                | Warning (shows each `warnings[]` item) |
| Any                              | `status: "error"`                  | Error (shows each `errors[]` item)     |
| Any                              | HTTP 5xx or network error          | Critical error                         |

### When toasts are NOT shown

- `GET` requests — never show success toasts (prevents spam)
- URLs matching `/list`, `/search`, `/query`, `/health`
- Requests using `SKIP_NOTIFICATION` token (see below)

---

## Controlling Notifications

### Skip all notifications

```typescript
import { SKIP_NOTIFICATION } from '@acontplus/ng-infrastructure';
import { HttpContext } from '@angular/common/http';

this.http.post('/api/silent-operation', data, {
  context: new HttpContext().set(SKIP_NOTIFICATION, true),
});
```

### Force notification on GET

```typescript
import { SHOW_NOTIFICATIONS } from '@acontplus/ng-infrastructure';

this.http.get('/api/important-data', {
  context: new HttpContext().set(SHOW_NOTIFICATIONS, true),
});
```

---

## BaseRepository Pattern

Repositories extend `GenericRepository<T, TId>` from `@acontplus/ng-infrastructure`. The interceptor handles all response unwrapping — repositories stay simple:

```typescript
import { Injectable } from '@angular/core';
import { GenericRepository } from '@acontplus/ng-infrastructure';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserRepository extends GenericRepository<User, number> {
  constructor(http: HttpClient) {
    super(http, { baseUrl: '/api', endpoint: 'users' });
  }

  // Interceptor handles ApiResponse unwrapping automatically
  getAll(): Observable<User[]> {
    return this.get<User[]>('');
    // GET — no toast shown
    // Response extracted from ApiResponse.data automatically
  }

  create(user: Partial<User>): Observable<User> {
    return this.post<User>('', user);
    // POST — success toast shown if response includes message
    // Data extracted from ApiResponse.data automatically
  }
}
```

### What NOT to do

```typescript
// Incorrect — interceptor already unwraps ApiResponse
create(user: CreateUserDto): Observable<User> {
  return this.post<ApiResponse<User>>('', user).pipe(
    map(response => response.data)  // unnecessary — interceptor does this
  );
}
```

---

## Error Handling

### Global (handled by interceptor)

- HTTP 5xx: shows critical error toast
- Network error (offline): shows connection error toast

### Component-level (business logic)

```typescript
@Component({...})
export class UserFormComponent {
  onSubmit(userData: CreateUserDto) {
    this.createUserUseCase.execute(userData).subscribe({
      next: (user) => {
        // Success — notification already shown by interceptor
        this.router.navigate(['/users', user.id]);
      },
      error: (error) => {
        // Handle business logic errors (4xx)
        if (error.status === 400) {
          this.form.setErrors({ validation: error.message });
        }
        // 5xx errors already shown globally by interceptor
      }
    });
  }
}
```

---

## C# Backend Integration

The interceptor is designed to work with the `Acontplus.Core` `ApiResponse<T>` pattern from the .NET backend:

```csharp
// These are automatically handled by the interceptor on the Angular side
return ApiResponse<User>.Success(user);
return ApiResponse<User>.Success(user, "User created successfully");
return ApiResponse.Failure("Validation failed", errors);
```

| Backend returns                   | Angular interceptor | Toast shown           |
| --------------------------------- | ------------------- | --------------------- |
| `Success(data)` on POST           | Extracts `data`     | "Operation completed" |
| `Success(data, "Custom message")` | Extracts `data`     | "Custom message"      |
| `Failure("error")`                | Throws error        | Error toast           |

---

## Response Standardization Logic

```
Incoming HTTP response body
  ├─ isValidApiResponse(body)?  → pass through, extract data
  ├─ is object without status?  → wrap: { status: "success", data: body }
  ├─ is primitive?              → wrap: { status: "success", data: body }
  └─ is null/undefined?         → wrap: { status: "success" }
```
