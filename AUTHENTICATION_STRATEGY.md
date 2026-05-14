# Authentication Strategy

## Overview
This e-commerce platform uses JWT (JSON Web Tokens) for stateless, secure authentication. Role-based access control (RBAC) ensures that only users with the 'admin' role can access the admin dashboard.

## Architecture

### 1. User Registration & Login Flow

```
┌─────────────────┐
│  User Input     │
│ (Email/Pass)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Validate Credentials            │
│ (Email exists, Password correct)│
└────────┬────────────────────────┘
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    ▼         ▼
 Generate   Return Error
  Token     (401)
    │
    ▼
  JWT Token + User Data
  (sent to client)
```

### 2. Database User Roles

Users are stored in the `users` table with a `role` column:
- **'admin'**: Full access to admin dashboard, product management, order management
- **'customer'**: Access to customer features only (browsing, shopping, orders)

```sql
CREATE TYPE user_role AS ENUM ('admin', 'customer');

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    ...
);
```

### 3. JWT Token Structure

When a user logs in, a JWT token is generated containing:

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "admin" | "customer",
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Token Flow:**
1. User logs in → Backend verifies credentials
2. Backend generates JWT token with user info & role
3. Token sent to frontend and stored in localStorage/cookies
4. Client includes token in Authorization header for all API requests
5. Backend verifies token before processing requests

### 4. Admin Dashboard Protection

**Backend Protection (Express Middleware):**

```typescript
// 1. Authenticate token
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// 2. Check admin role
export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Usage in routes
router.post('/admin/products', authenticateToken, requireAdmin, createProduct);
```

**Frontend Protection (Next.js Middleware):**

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;
    
    if (!token || role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}
```

### 5. Request Flow with Authentication

```
┌──────────────────────┐
│  Authenticated       │
│  API Request         │
│  (with JWT token)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────┐
│ authenticateToken middleware │
│ - Extract token              │
│ - Verify JWT signature       │
│ - Extract user data          │
└──────────┬───────────────────┘
           │
    ┌──────┴──────┐
    │             │
 Valid?        Invalid?
    │             │
    ▼             ▼
   OK          403/401
    │           Error
    ▼
┌──────────────────────────────┐
│  requireAdmin middleware     │
│  - Check user.role === admin │
└──────────┬───────────────────┘
           │
    ┌──────┴──────┐
    │             │
 Admin?      Not Admin?
    │             │
    ▼             ▼
  Allow        403
  Request      Error
    │             │
    └─────┬───────┘
          ▼
    Process Request
```

### 6. Security Best Practices Implemented

1. **Password Security**
   - Passwords hashed with bcryptjs (10 rounds)
   - Never stored in plain text
   - Never sent in JWT token

2. **Token Security**
   - Tokens expire after 7 days (configurable)
   - Stored securely in httpOnly cookies (not localStorage for security)
   - Verified on every protected endpoint

3. **Authorization**
   - Role-based checks on every admin operation
   - Cannot be bypassed by manipulating frontend
   - Backend always verifies role before processing

4. **CORS Protection**
   - Only frontend URL allowed
   - Prevents unauthorized API access from other origins

5. **Environment Variables**
   - JWT_SECRET never exposed in code
   - Different for each environment (dev/staging/prod)

## Implementation Checklist

- [x] Database schema with role column
- [x] Password hashing utility (bcryptjs)
- [x] JWT token generation/verification
- [x] Backend authentication middleware
- [x] Backend admin authorization middleware
- [x] Frontend auth utilities
- [x] Frontend route protection middleware
- [ ] Refresh token implementation (for long sessions)
- [ ] Two-factor authentication (optional enhancement)
- [ ] Audit logging for admin actions

## Testing the Authentication

### 1. Create Admin User
```bash
# Via API or database
INSERT INTO users (email, password_hash, role, full_name)
VALUES ('admin@example.com', bcrypt('password123'), 'admin', 'Admin User');
```

### 2. Login as Admin
```bash
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 3. Access Admin Dashboard
```bash
# Frontend automatically includes token in header
GET /dashboard → Middleware checks token + role → Access Granted

# Customer trying to access
GET /dashboard → Middleware checks token + role → Access Denied (403)
```

## Error Handling

- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Valid token but insufficient permissions
- **400 Bad Request**: Invalid input data
- **500 Server Error**: Server-side issues
