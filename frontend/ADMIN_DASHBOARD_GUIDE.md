# Admin Dashboard UI Guide

## Overview
The Admin Dashboard is a modern, responsive Next.js application built with Tailwind CSS for managing e-commerce products. It includes protected routes, product management, and real-time API integration.

## Features

### 1. Protected Dashboard Layout
- **Authentication Check**: Uses `isAdmin()` utility to verify admin role
- **Automatic Redirect**: Non-admin users are redirected to `/login`
- **Sidebar Navigation**: Quick access to different dashboard sections
- **Logout Button**: Secure session termination

### 2. Product Management Page (`/dashboard/products`)

#### Product Table
- **Columns**: Name, Price, Stock, Category, Rating, Actions
- **Status Indicators**: Stock levels color-coded (green/yellow/red)
- **Responsive Design**: Horizontal scroll on mobile devices
- **Pagination**: Support for 100+ products with "Load More" capability

#### Add Product Modal
- **Fields**: Name, Description, Price, Stock, Category, SKU, Image URL
- **Validation**: Required field indicators and format validation
- **Category Dropdown**: Pre-loaded from API
- **Success Notification**: Toast alert on creation

#### Edit Product Modal
- **Pre-filled Form**: Auto-populated with current product data
- **Same Fields**: Matches "Add Product" for consistency
- **PUT Integration**: Updates via `/api/products/admin/products/:id`
- **Error Handling**: Displays validation errors

#### Delete Confirmation Modal
- **Safety**: Requires explicit confirmation
- **Warning**: Clear warning message
- **Soft Delete**: Marks product as inactive (not permanently removed)

### 3. API Integration

#### Endpoints Used
```typescript
// GET products
GET /api/products?limit=100

// Create product (admin)
POST /api/products/admin/products
Headers: Authorization: Bearer <token>
Body: { name, description, price, stock_quantity, category_id, sku, image_url }

// Update product (admin)
PUT /api/products/admin/products/:id
Headers: Authorization: Bearer <token>
Body: { ...updates }

// Delete product (admin)
DELETE /api/products/admin/products/:id
Headers: Authorization: Bearer <token>
```

#### Error Handling
- **Network Errors**: "Failed to load products"
- **401 Unauthorized**: Redirects to login
- **403 Forbidden**: "Admin access required"
- **409 Conflict**: "Email/SKU already exists"
- **Server Errors**: Generic error message with toast notification

### 4. Toast Notifications

#### Types
- **Success** (green): Product created/updated/deleted
- **Error** (red): API failures, validation errors
- **Info** (blue): General messages

#### Auto-dismiss
- Toasts automatically close after 4 seconds
- Multiple toasts stack vertically
- Can be manually dismissed

## UI Components

### DashboardLayout
- Wraps all dashboard pages
- Checks admin authorization
- Shows loading spinner during auth check
- Provides sidebar navigation

### ProductTable
- Displays all products in tabular format
- Price formatting with currency
- Stock status indicators
- Edit/Delete action buttons
- Empty state when no products

### AddProductModal / EditProductModal
- Form-based component
- Input validation
- Category selection
- Submit/Cancel actions
- Loading state during submission

### DeleteConfirmModal
- Confirmation dialog
- Product name display
- Warning message
- Confirm/Cancel buttons

### Modal (Base Component)
- Reusable modal wrapper
- Backdrop click handling
- Close button (X)
- Scrollable content
- Prevents body scroll when open

### Toast
- Auto-hiding notification
- Icon based on type
- Bottom-right positioning
- Smooth slide-in animation

## Styling

### Tailwind CSS Features Used
- **Layout**: flexbox, grid, absolute positioning
- **Spacing**: p-*, m-*, gap-*
- **Colors**: Semantic color names (blue-600, red-600, gray-900)
- **Responsive**: sm:, md:, lg: breakpoints
- **States**: hover:, focus:, disabled:
- **Animations**: Custom slide-in, spin loader

### Color Scheme
- **Primary**: Blue (#3B82F6) - Buttons, links
- **Secondary**: Gray (#1F2937) - Text, backgrounds
- **Success**: Green (#10B981) - Stock indicators, success toasts
- **Warning**: Yellow (#F59E0B) - Low stock
- **Error**: Red (#EF4444) - Errors, delete actions

## Responsive Design

### Desktop (1024px+)
- Full sidebar navigation
- Table displays all columns
- Standard modal size

### Tablet (768px - 1023px)
- Sidebar may collapse
- Table scrolls horizontally
- Modal is responsive

### Mobile (< 768px)
- Hamburger menu (future implementation)
- Scrollable table
- Full-width modal
- Touch-friendly buttons

## File Structure

```
frontend/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx          # Protected dashboard layout
│   │   └── products/
│   │       └── page.tsx         # Products management page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── dashboard/
│   │   ├── DashboardNav.tsx    # Sidebar navigation
│   │   ├── ProductTable.tsx    # Products table
│   │   └── modals/
│   │       ├── AddProductModal.tsx
│   │       ├── EditProductModal.tsx
│   │       └── DeleteConfirmModal.tsx
│   ├── Modal.tsx               # Base modal component
│   └── Toast.tsx               # Toast notification
├── lib/
│   └── auth.ts                 # Auth utilities (existing)
├── types/
│   └── index.ts                # TypeScript interfaces
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
├── package.json
└── Dockerfile
```

## Future Enhancements

1. **Category Management**: Add/edit/delete categories
2. **Bulk Actions**: Select multiple products for batch operations
3. **Search & Filter**: Advanced product filtering
4. **Pagination**: Proper pagination UI instead of "Load More"
5. **Image Upload**: Direct image upload instead of URL input
6. **Inventory Alerts**: Real-time low-stock notifications
7. **Audit Trail**: Track product changes and who made them
8. **Multi-language**: i18n support for different regions
9. **Dark Mode**: Theme toggle
10. **Mobile Menu**: Hamburger menu for mobile navigation
