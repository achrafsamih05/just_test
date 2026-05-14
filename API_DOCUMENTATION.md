# E-commerce API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Response Format

All responses are in JSON format:

```json
{
  "data": {...},
  "error": "...",
  "code": "..."
}
```

## Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **409**: Conflict (duplicate resource)
- **500**: Internal Server Error

---

## Authentication Endpoints

### Register User

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "full_name": "John Doe",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!"
}
```

**Password Requirements**:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (@$!%*?&)

**Response** (201):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "customer"
  }
}
```

**Error Responses**:
- `400`: Missing fields, password mismatch, or weak password
- `409`: Email already registered

---

### Login User

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "admin" | "customer"
  }
}
```

**Note**: The `role` field in the response indicates whether the user is an admin or customer.

**Error Responses**:
- `400`: Missing email or password
- `401`: Invalid credentials

---

### Get Current User Profile

**Endpoint**: `GET /auth/profile`

**Authentication**: Required

**Response** (200):
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "customer",
    "created_at": "2026-05-14T10:00:00Z"
  }
}
```

**Error Responses**:
- `401`: Not authenticated
- `404`: User not found

---

## Product Endpoints

### Get All Products

**Endpoint**: `GET /products`

**Query Parameters**:
- `category_id` (optional): Filter by category UUID
- `limit` (optional, default: 20, max: 100): Number of products per page
- `offset` (optional, default: 0): Pagination offset

**Example**:
```
GET /products?category_id=550e8400-e29b-41d4-a716-446655440000&limit=10&offset=0
```

**Response** (200):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "stock_quantity": 100,
      "category_id": "550e8400-e29b-41d4-a716-446655440000",
      "image_url": "https://...",
      "sku": "SKU-123",
      "is_active": true,
      "rating": 4.5,
      "created_at": "2026-05-14T10:00:00Z",
      "updated_at": "2026-05-14T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 10,
    "offset": 0
  }
}
```

---

### Get Product by ID

**Endpoint**: `GET /products/:id`

**Response** (200):
```json
{
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Product Name",
    "description": "Detailed description",
    "price": 29.99,
    "stock_quantity": 100,
    "category_id": "550e8400-e29b-41d4-a716-446655440000",
    "image_url": "https://...",
    "sku": "SKU-123",
    "is_active": true,
    "rating": 4.5,
    "created_at": "2026-05-14T10:00:00Z",
    "updated_at": "2026-05-14T10:00:00Z"
  }
}
```

**Error Responses**:
- `404`: Product not found

---

## Admin Product Management Endpoints

### Create Product (Admin Only)

**Endpoint**: `POST /products/admin/products`

**Authentication**: Required (admin role)

**Request Body**:
```json
{
  "name": "Product Name",
  "description": "Detailed product description",
  "price": 29.99,
  "stock_quantity": 100,
  "category_id": "550e8400-e29b-41d4-a716-446655440000",
  "image_url": "https://example.com/image.jpg",
  "sku": "SKU-123"
}
```

**Response** (201):
```json
{
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Product Name",
    "description": "Detailed product description",
    "price": 29.99,
    "stock_quantity": 100,
    "category_id": "550e8400-e29b-41d4-a716-446655440000",
    "image_url": "https://example.com/image.jpg",
    "sku": "SKU-123",
    "is_active": true,
    "rating": 0,
    "created_at": "2026-05-14T10:00:00Z",
    "updated_at": "2026-05-14T10:00:00Z"
  }
}
```

**Error Responses**:
- `400`: Missing required fields or invalid data
- `401`: Not authenticated
- `403`: Not an admin
- `404`: Category not found
- `409`: SKU already exists

---

### Update Product (Admin Only)

**Endpoint**: `PUT /products/admin/products/:id`

**Authentication**: Required (admin role)

**Request Body** (all fields optional):
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "price": 39.99,
  "stock_quantity": 150,
  "category_id": "550e8400-e29b-41d4-a716-446655440000",
  "image_url": "https://example.com/new-image.jpg",
  "sku": "SKU-456"
}
```

**Response** (200):
```json
{
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Updated Name",
    ...
  }
}
```

**Error Responses**:
- `400`: Invalid field values
- `401`: Not authenticated
- `403`: Not an admin
- `404`: Product or category not found
- `409`: SKU already exists

---

### Delete Product (Admin Only)

**Endpoint**: `DELETE /products/admin/products/:id`

**Authentication**: Required (admin role)

**Response** (200):
```json
{
  "message": "Product deleted successfully"
}
```

**Error Responses**:
- `401`: Not authenticated
- `403`: Not an admin
- `404`: Product not found

---

## Example cURL Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "full_name": "John Doe",
    "password": "SecurePass123!",
    "password_confirm": "SecurePass123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products?limit=10&offset=0
```

### Create Product (Admin)
```bash
curl -X POST http://localhost:5000/api/products/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 29.99,
    "stock_quantity": 100,
    "category_id": "550e8400-e29b-41d4-a716-446655440000",
    "sku": "SKU-123"
  }'
```

---

## Error Codes Reference

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid authentication token |
| FORBIDDEN | 403 | User lacks required permissions (admin role) |
| NOT_FOUND | 404 | Requested resource does not exist |
| CONFLICT | 409 | Resource already exists (duplicate email, SKU) |
| INVALID_INPUT | 400 | Invalid request parameters or body |
| INTERNAL_ERROR | 500 | Server-side error |
