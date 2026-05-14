# Full-Stack E-commerce Store

## Project Overview
A modern, full-stack e-commerce application with a customer-facing frontend and dedicated admin dashboard.

## Tech Stack

### Frontend
- **Next.js 14+**: React framework with App Router for optimized performance
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and caching
- **Zustand**: Lightweight state management

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **PostgreSQL**: Relational database
- **Supabase**: Backend-as-a-Service alternative (optional)
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing

### DevOps & Tools
- **Docker**: Containerization
- **Prisma**: ORM for database
- **Jest**: Testing framework
- **ESLint & Prettier**: Code quality

## Project Structure
```
.
├── frontend/               # Next.js frontend app
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── public/
├── backend/               # Node.js/Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── utils/
│   └── migrations/
├── database/              # Database schema & migrations
│   └── schema.sql
└── docker-compose.yml     # Local development setup
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend && npm install
   
   # Backend
   cd ../backend && npm install
   ```

3. Set up environment variables (see `.env.example` files)
4. Run migrations
5. Start development servers

## Database Schema
See `database/schema.sql` for the complete schema.

## Authentication
Role-based access control with JWT tokens. Admin dashboard requires 'admin' role.

## Key Features
- User authentication (JWT-based)
- Product catalog with categories
- Shopping cart and checkout
- Order management
- Admin dashboard for product & order management
- Responsive design
