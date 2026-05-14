# 🛍️ E-Commerce Store - Full Stack Application

> A modern, scalable full-stack e-commerce platform with an intuitive admin dashboard and customer-facing storefront. Built with Next.js, Node.js, PostgreSQL, and TypeScript for production-ready performance and security.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [Authentication Strategy](#authentication-strategy)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

E-Commerce Store is a comprehensive, production-ready e-commerce platform designed for businesses looking to establish an online presence. The platform features:

- **Admin Dashboard**: Intuitive product management with real-time updates
- **Public Storefront**: Fast, responsive shopping experience for customers
- **Secure Authentication**: Role-based access control with JWT tokens
- **Modern Architecture**: Microservices-ready design with clear separation of concerns

Whether you're a startup launching your first online store or an established retailer expanding your digital presence, E-Commerce Store provides the foundation you need.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- **JWT-Based Authentication**: Stateless, secure token-based user sessions
- **Role-Based Access Control (RBAC)**: Admin and customer roles with distinct permissions
- **Password Security**: bcryptjs hashing with 10 rounds of salting
- **Protected Routes**: Automatic redirection for unauthorized access
- **Session Persistence**: Token storage in secure, httpOnly cookies

### 📦 Product Management (Admin)

- ✅ **Full CRUD Operations**: Create, read, update, and delete products
- ✅ **Category Management**: Organize products into logical categories
- ✅ **Stock Tracking**: Real-time inventory management
- ✅ **SKU Management**: Unique product identifiers with duplicate detection
- ✅ **Image Support**: Upload product images with URLs
- ✅ **Advanced Filtering**: Filter by category, stock status, and more
- ✅ **Batch Operations**: Ready for bulk product imports

### 🛒 Public Storefront

- 🏪 **Product Discovery**: Browse products in a responsive grid layout
- 🔍 **Smart Search**: Full-text search across product names and descriptions
- 🏷️ **Category Filtering**: Quick filter by product categories
- 🛒 **Shopping Cart**: Persistent cart with localStorage backup
- ⭐ **Product Ratings**: View customer ratings and reviews
- 📱 **Mobile-Optimized**: Fully responsive design for all devices
- 🚀 **Fast Performance**: Optimized loading with lazy pagination

### 💳 Shopping Experience

- **Real-Time Cart Updates**: Zustand-powered state management
- **Quantity Management**: Increment/decrement quantities seamlessly
- **Price Calculation**: Automatic total and subtotal calculations
- **Persistent Storage**: Cart persists across browser sessions
- **Stock Validation**: Prevent overselling with real-time stock checks

### 🎨 User Interface

- **Minimalist Design**: Clean, modern aesthetic with Tailwind CSS
- **Dark Mode Ready**: Easy theme switching capability
- **Responsive Layout**: Perfect on mobile, tablet, and desktop
- **Accessibility**: WCAG 2.1 compliant (in progress)
- **Performance**: Optimized images and code splitting

---

## 🏗️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|----------|
| **Next.js** | 14+ | React framework with SSR and static generation |
| **React** | 18+ | UI library |
| **TypeScript** | 5.3+ | Type-safe JavaScript |
| **Tailwind CSS** | 3.3+ | Utility-first CSS framework |
| **Zustand** | 4.4+ | Lightweight state management |

### Backend

| Technology | Version | Purpose |
|-----------|---------|----------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.18+ | Web application framework |
| **TypeScript** | 5.3+ | Type-safe JavaScript |
| **PostgreSQL** | 14+ | Relational database |
| **jsonwebtoken** | 9.1+ | JWT token generation and verification |
| **bcryptjs** | 2.4+ | Password hashing |
| **pg** | 8.11+ | PostgreSQL client |

### DevOps & Tools

| Tool | Purpose |
|------|----------|
| **Docker** | Containerization for consistent environments |
| **Docker Compose** | Multi-container orchestration |
| **ESLint** | Code quality and linting |
| **Prettier** | Code formatting |
| **Jest** | Unit and integration testing |

---

## 📂 Project Structure

```
e-commerce-store/
│
├── 📁 frontend/                          # Next.js Frontend Application
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx               # Protected dashboard layout
│   │   │   ├── page.tsx                 # Dashboard home
│   │   │   └── products/
│   │   │       └── page.tsx             # Product management
│   │   ├── shop/
│   │   │   └── page.tsx                 # Public shop page
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx             # Product detail page
│   │   ├── layout.tsx                   # Root layout with navigation
│   │   ├── page.tsx                     # Home page
│   ���   └── globals.css                  # Global styles
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardNav.tsx         # Admin sidebar navigation
│   │   │   ├── ProductTable.tsx         # Products table
│   │   │   └── modals/
│   │   │       ├── AddProductModal.tsx
│   │   │       ├── EditProductModal.tsx
│   │   │       └── DeleteConfirmModal.tsx
│   │   ├── shop/
│   │   │   ├── StoreNav.tsx             # Public store header
│   │   │   ├── CartSidebar.tsx          # Shopping cart sidebar
│   │   │   └── ProductCard.tsx          # Product card component
│   │   ├── Modal.tsx                    # Reusable modal wrapper
│   │   └── Toast.tsx                    # Notification component
│   │
│   ├── lib/
│   │   ├── auth.ts                      # Authentication utilities
│   │   └── store.ts                     # Zustand cart store
│   │
│   ├── types/
│   │   └── index.ts                     # TypeScript type definitions
│   │
│   ├── middleware/
│   │   └── auth.ts                      # Route protection middleware
│   │
│   ├── public/                          # Static assets
│   ├── Dockerfile                       # Container configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── postcss.config.js
│
├── 📁 backend/                          # Express.js Backend API
│   ├── src/
│   │   ├── index.ts                     # Server entry point
│   │   ├── app.ts                       # Express app factory
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.ts            # Authentication endpoints
│   │   │   └── productRoutes.ts         # Product CRUD endpoints
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts        # Auth business logic
│   │   │   └── productController.ts     # Product business logic
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts                  # User data model
│   │   │   ├── Product.ts               # Product data model
│   │   │   └── Category.ts              # Category data model
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts                  # JWT verification & role checks
│   │   │   └── errorHandler.ts          # Centralized error handling
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts                   # Token generation/verification
│   │   │   └── password.ts              # Password hashing/comparison
│   │   │
│   │   └── types/
│   │       └── index.ts                 # TypeScript interfaces
│   │
│   ├── Dockerfile                       # Container configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── 📁 database/
│   └── schema.sql                       # PostgreSQL database schema
│
├── docker-compose.yml                   # Multi-container orchestration
├── .gitignore                           # Git ignore rules
├── README.md                            # This file
├── API_DOCUMENTATION.md                 # Detailed API reference
├── AUTHENTICATION_STRATEGY.md            # Auth implementation guide
├── ADMIN_DASHBOARD_GUIDE.md             # Admin UI documentation
├── PUBLIC_STOREFRONT_GUIDE.md           # Customer UI documentation
└── LICENSE                              # MIT License
```

---

## 🚀 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** for version control ([Download](https://git-scm.com/))
- **Docker** (optional, for containerized setup)

### Step 1: Clone the Repository

```bash
git clone https://github.com/achrafsamih05/just_test.git
cd just_test
git checkout ecommerce-setup
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

**Dependencies installed:**
- express (Web framework)
- pg (PostgreSQL client)
- jsonwebtoken (JWT handling)
- bcryptjs (Password hashing)
- cors (Cross-origin requests)
- dotenv (Environment variables)

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**Dependencies installed:**
- next (React framework)
- react (UI library)
- zustand (State management)
- tailwindcss (CSS framework)
- typescript (Type safety)

### Step 4: Set Up Environment Variables

#### Backend `.env` file

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Password Configuration
BCRYPT_ROUNDS=10

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### Frontend `.env.local` file

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=E-Store
```

---

## 🗄️ Database Setup

### Option 1: Using PostgreSQL CLI

#### 1. Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'ecommerce_password';
ALTER ROLE ecommerce_user SET client_encoding TO 'utf8';
ALTER ROLE ecommerce_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ecommerce_user SET default_transaction_deferrable TO on;
ALTER ROLE ecommerce_user SET default_timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

# Exit psql
\q
```

#### 2. Load Database Schema

```bash
psql -U ecommerce_user -d ecommerce_db -f database/schema.sql
```

You should see output confirming the creation of:
- ✅ Users table with role-based access
- ✅ Categories table
- ✅ Products table with indexes
- ✅ Orders and Order Items tables
- ✅ Shopping Cart table
- ✅ Reviews table
- ✅ Automatic timestamp triggers

### Option 2: Using Docker Compose (Recommended)

```bash
# Start PostgreSQL, Backend, and Frontend
docker-compose up -d

# The schema will be automatically loaded from database/schema.sql
```

### Verify Database Connection

```bash
# Test connection from backend
cd backend
npm run dev

# You should see: "✓ Database connected: [current timestamp]"
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

### Core Endpoints

#### Authentication Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register new user (customer role) |
| POST | `/auth/login` | ❌ | Login and receive JWT token |
| GET | `/auth/profile` | ✅ | Get authenticated user profile |

#### Product Endpoints (Public)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | ❌ | List all products with pagination |
| GET | `/products/:id` | ❌ | Get product details by ID |

**Query Parameters for GET `/products`:**
```
?category_id=uuid    # Filter by category
?limit=20            # Products per page (max 100)
?offset=0            # Pagination offset
```

#### Admin Product Management

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/products/admin/products` | ✅ | Admin | Create new product |
| PUT | `/products/admin/products/:id` | ✅ | Admin | Update product |
| DELETE | `/products/admin/products/:id` | ✅ | Admin | Delete product (soft delete) |

### Response Format

**Success Response:**
```json
{
  "data": { /* response data */ },
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0
  }
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

### Status Codes

| Code | Meaning |
|------|----------|
| 200 | ✅ OK - Request succeeded |
| 201 | ✅ Created - Resource created |
| 400 | ❌ Bad Request - Invalid input |
| 401 | ❌ Unauthorized - Missing/invalid token |
| 403 | ❌ Forbidden - Insufficient permissions |
| 404 | ❌ Not Found - Resource doesn't exist |
| 409 | ❌ Conflict - Resource already exists |
| 500 | ❌ Server Error - Internal error |

### Example API Calls

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "full_name": "John Doe",
    "password": "SecurePass123!",
    "password_confirm": "SecurePass123!"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "SecurePass123!"
  }'
```

**Get Products:**
```bash
curl http://localhost:5000/api/products?limit=10&offset=0
```

**Create Product (Admin):**
```bash
curl -X POST http://localhost:5000/api/products/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Premium noise-canceling headphones",
    "price": 199.99,
    "stock_quantity": 100,
    "category_id": "category-uuid",
    "sku": "WH-001"
  }'
```

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🔐 Environment Variables

### Backend Variables

```env
# Environment
NODE_ENV=development|production
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT
JWT_SECRET=your_secret_key_minimum_32_characters
JWT_EXPIRE=7d

# Security
BCRYPT_ROUNDS=10

# CORS
FRONTEND_URL=http://localhost:3000

# Optional: Payment Gateway
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx
```

### Frontend Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=E-Store
```

⚠️ **Important Security Notes:**

- Never commit `.env` files to version control
- Use strong JWT secrets (minimum 32 characters)
- Rotate secrets in production regularly
- Use environment-specific secrets for each deployment

---

## ▶️ Running the Application

### Development Mode

#### Terminal 1: Start PostgreSQL

```bash
# If using Docker
docker run -d \
  --name postgres \
  -e POSTGRES_USER=ecommerce_user \
  -e POSTGRES_PASSWORD=ecommerce_password \
  -e POSTGRES_DB=ecommerce_db \
  -p 5432:5432 \
  postgres:15-alpine

# Or start your local PostgreSQL service
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS
```

#### Terminal 2: Start Backend

```bash
cd backend
npm run dev

# Output:
# ✓ Database connected: 2026-05-14T10:00:00Z
# 🚀 Server running on http://localhost:5000
# 📊 Health check: http://localhost:5000/health
```

#### Terminal 3: Start Frontend

```bash
cd frontend
npm run dev

# Output:
# ▲ Next.js 14.0
# - Local: http://localhost:3000
# - Environments: .env.local
```

### Access the Application

- **Admin Dashboard**: http://localhost:3000/dashboard/products
- **Public Storefront**: http://localhost:3000/shop
- **API Documentation**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

### Production Build

#### Backend

```bash
cd backend
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm start
```

---

## 🐳 Docker Setup

### Using Docker Compose (All-in-One)

The easiest way to run the entire stack:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

This starts:
- ✅ PostgreSQL 15 on port 5432
- ✅ Backend API on port 5000
- ✅ Frontend on port 3000

### Individual Docker Builds

**Backend:**
```bash
cd backend
docker build -t ecommerce-api .
docker run -p 5000:5000 --env-file .env ecommerce-api
```

**Frontend:**
```bash
cd frontend
docker build -t ecommerce-store .
docker run -p 3000:3000 ecommerce-store
```

---

## 🔐 Authentication Strategy

### Overview

The platform uses JWT (JSON Web Tokens) for stateless authentication with role-based access control.

### Token Structure

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "admin" | "customer",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### User Roles

**Admin Role:**
- ✅ Full access to admin dashboard
- ✅ Create/update/delete products
- ✅ View all orders
- ✅ Manage categories
- ✅ View analytics

**Customer Role:**
- ✅ Browse products
- ✅ Search and filter
- ✅ Add to cart and checkout
- ✅ View own orders
- ✅ Leave reviews

### Security Features

- 🔒 **Password Hashing**: bcryptjs with 10 rounds
- 🔐 **JWT Expiration**: 7 days (configurable)
- 🛡️ **CORS Protection**: Whitelist frontend URL
- 🚫 **Rate Limiting**: Ready for implementation
- 📝 **Audit Logging**: Ready for implementation

For detailed authentication documentation, see [AUTHENTICATION_STRATEGY.md](AUTHENTICATION_STRATEGY.md)

---

## 🎯 Usage Examples

### As an Admin

1. **Login to Dashboard**
   - Visit http://localhost:3000/dashboard
   - Login with admin credentials
   - Dashboard redirects to product management

2. **Manage Products**
   - Click "Add Product"
   - Fill in product details
   - Submit to API
   - View in product table

3. **Edit/Delete Products**
   - Click "Edit" to modify
   - Click "Delete" to remove
   - Confirm action

### As a Customer

1. **Browse Products**
   - Visit http://localhost:3000/shop
   - Browse product grid
   - Filter by category
   - Search for products

2. **View Product Details**
   - Click on product card
   - See full description
   - Check stock status
   - View ratings

3. **Shopping Cart**
   - Click "Add to Cart"
   - Adjust quantity
   - Click cart icon to view
   - Continue shopping or checkout

---

## 📊 Database Schema

### Tables Overview

```sql
Users
├── id (UUID, Primary Key)
├── email (VARCHAR, Unique)
├── password_hash (VARCHAR)
├── full_name (VARCHAR)
├── role (ENUM: admin, customer)
└── created_at, updated_at (TIMESTAMP)

Categories
├── id (UUID, Primary Key)
├── name (VARCHAR, Unique)
├── slug (VARCHAR, Unique)
├── description (TEXT)
└── image_url (VARCHAR)

Products
├── id (UUID, Primary Key)
├── name (VARCHAR)
├── description (TEXT)
├── price (DECIMAL)
├── stock_quantity (INT)
├── category_id (FK -> Categories)
├── image_url (VARCHAR)
├── sku (VARCHAR, Unique)
├── is_active (BOOLEAN)
├── rating (DECIMAL)
└── created_at, updated_at (TIMESTAMP)

Orders
├── id (UUID, Primary Key)
├── user_id (FK -> Users)
├── status (ENUM: pending, processing, shipped, delivered, cancelled)
├── total_amount (DECIMAL)
├── shipping_address (TEXT)
├── billing_address (TEXT)
└── created_at, updated_at (TIMESTAMP)

OrderItems
├── id (UUID, Primary Key)
├── order_id (FK -> Orders)
├── product_id (FK -> Products)
├── quantity (INT)
├── price_at_purchase (DECIMAL)
└── created_at (TIMESTAMP)

CartItems
├── id (UUID, Primary Key)
├── user_id (FK -> Users)
├── product_id (FK -> Products)
├── quantity (INT)
└── created_at, updated_at (TIMESTAMP)

Reviews
├── id (UUID, Primary Key)
├── product_id (FK -> Products)
├── user_id (FK -> Users)
├── rating (INT: 1-5)
├── comment (TEXT)
└── created_at, updated_at (TIMESTAMP)
```

For complete schema details, see [database/schema.sql](database/schema.sql)

---

## 🚦 Getting Help

### Common Issues & Solutions

**Issue: Database connection refused**
```bash
# Verify PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check DATABASE_URL in .env
echo $DATABASE_URL
```

**Issue: Port already in use**
```bash
# Kill process on port 5000 (backend)
sudo lsof -i :5000
sudo kill -9 <PID>

# Kill process on port 3000 (frontend)
sudo lsof -i :3000
sudo kill -9 <PID>
```

**Issue: Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue: JWT secret not set**
```bash
# Verify .env file exists
ls -la backend/.env

# Check JWT_SECRET is defined
grep JWT_SECRET backend/.env
```

---

## 🗺️ Future Roadmap

### Phase 2: Enhanced Features (Q3 2026)

- [ ] **Payment Integration**
  - Stripe integration for credit/debit cards
  - PayPal integration
  - Cryptocurrency payment options
  - Invoice generation

- [ ] **Logistics & Shipping**
  - Real-time shipping rate calculation
  - Multi-carrier integration (UPS, FedEx, DHL)
  - Shipment tracking
  - Auto-generated shipping labels

- [ ] **Thermal Label Printing**
  - Direct printer integration
  - Batch label printing
  - Barcode generation
  - QR code support
  - Custom label templates

- [ ] **User Accounts**
  - User registration and profile
  - Order history
  - Saved addresses
  - Wishlist functionality
  - Email notifications

### Phase 3: Advanced Features (Q4 2026)

- [ ] **Analytics & Reporting**
  - Sales dashboard
  - Product performance metrics
  - Customer behavior analysis
  - Revenue reports
  - Inventory forecasting

- [ ] **Marketing Tools**
  - Email campaigns
  - Discount codes
  - Flash sales
  - Customer segmentation
  - Referral programs

- [ ] **Social Features**
  - Product reviews and ratings
  - Customer testimonials
  - Social media integration
  - Product recommendations
  - Wishlist sharing

### Phase 4: Enterprise Features (2027)

- [ ] **Multi-Vendor Marketplace**
  - Vendor registration and approval
  - Revenue sharing
  - Vendor analytics
  - Commission management

- [ ] **Inventory Management**
  - Real-time stock sync
  - Warehouse management
  - Low stock alerts
  - Auto-replenishment
  - Supplier integration

- [ ] **API & Integrations**
  - REST API for third-party apps
  - GraphQL endpoint
  - Webhooks
  - OAuth 2.0 support
  - ERP system integration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/just_test.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Coding Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### You are free to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Use privately

### You must:
- 📋 Include license and copyright notice

---

## 📞 Support

- 📧 **Email**: support@ecommerce-store.local
- 🐛 **Issues**: [GitHub Issues](https://github.com/achrafsamih05/just_test/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/achrafsamih05/just_test/discussions)
- 📚 **Documentation**: [Project Docs](./)

---

## 🙏 Acknowledgments

- **Next.js** community for excellent documentation
- **Express.js** team for the robust framework
- **Tailwind CSS** for the utility-first styling
- **PostgreSQL** for reliable data persistence
- All contributors and supporters

---

## 📈 Project Statistics

| Metric | Value |
|--------|-------|
| Frontend Components | 15+ |
| Backend Routes | 8+ |
| Database Tables | 7 |
| TypeScript Files | 50+ |
| Total Lines of Code | 5000+ |
| Test Coverage | 0% (In Progress) |
| Documentation Pages | 5 |

---

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Core authentication system
- ✅ Admin dashboard with product management
- ✅ Public storefront with shopping cart
- ✅ Search and category filtering
- ✅ JWT-based authorization
- ✅ PostgreSQL database schema

### v0.9.0 (Beta)
- 🔧 Initial project setup
- 🔧 Database schema design
- 🔧 API endpoint creation

---

<div align="center">

### Made with ❤️ by the E-Commerce Team

**[⬆ Back to Top](#-e-commerce-store---full-stack-application)**

</div>
