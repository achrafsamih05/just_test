# Public Storefront Guide

## Overview
The E-Store public storefront is a modern, mobile-first Next.js application for customers to browse, search, and purchase products. It features real-time cart management, product discovery, and a seamless shopping experience.

## Architecture

### State Management
**Zustand Cart Store** (`lib/store.ts`)
- Persistent cart storage (localStorage)
- Add/remove/update items
- Calculate totals
- Auto-save on changes

### Components

#### **StoreNav.tsx**
- Sticky navigation bar
- Logo and branding
- Navigation links (Home, Shop, About)
- Cart button with item count badge
- Opens CartSidebar on click

#### **CartSidebar.tsx**
- Slide-in sidebar (right side)
- Display cart items with images
- Quantity controls (+/−)
- Remove button for each item
- Total price calculation
- Checkout button
- Backdrop overlay

#### **ProductCard.tsx**
- Responsive product display
- Product image or placeholder
- In Stock / Out of Stock badge
- Rating with stars
- Price display
- Stock quantity
- Quantity selector (1-N)
- "Add to Cart" button with feedback
- "View Details" link
- Hover effects and animations

#### **ProductDetailPage** (`/products/[id]`)
- Dynamic routing with product ID
- Full product image
- Detailed description
- Full rating display
- Stock status
- SKU display
- Quantity selector
- "Add to Cart" with confirmation
- Trust badges (free shipping, guarantee, security)
- Back to Shop link

### Pages

#### **HomePage** (`/`)
- Hero section with CTA
- Features showcase
- Call-to-action section
- Links to shop

#### **ShopPage** (`/shop`)
- Product grid (responsive)
- Sidebar filters
- Search functionality
- Category filter
- Product count display
- Loading and empty states
- Results count

## Features

### 1. Product Grid
```typescript
GET /api/products?limit=100
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- ProductCard component for each item
- Hover effects
- Loading skeleton/spinner
- Empty state handling
```

### 2. Product Discovery
**Search**
- Real-time text search
- Searches product name and description
- Case-insensitive
- Instant filtering

**Category Filter**
- Fetches from API endpoint
- Single-select categories
- "All Products" default option
- Active state styling

### 3. Shopping Cart
**Zustand Store Features:**
```typescript
Actions:
- addItem(item) - Increments quantity if exists
- removeItem(id) - Deletes from cart
- updateQuantity(id, qty) - Updates or removes if qty ≤ 0
- clearCart() - Empty cart
- getTotalItems() - Sum of quantities
- getTotalPrice() - Sum of (price × qty)

Persistence:
- Stored in localStorage under 'cart-store'
- Survives page refresh
- Auto-synced on mount
```

**Cart UI:**
- Sidebar modal with overlay backdrop
- Slide-in/out animation
- Item counter on cart icon
- Quantity controls in cart
- Remove buttons
- Total price display
- Checkout CTA
- Continue Shopping button

### 4. Product Detail Page
- Dynamic route: `/products/[id]`
- Fetches single product from API
- Full description display
- Large product image
- Stock availability check
- Quantity selector with +/−
- Add to Cart button
- Trust badges
- Back link
- 404 handling

## Styling & Design

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#1F2937)
- **Success**: Green (#10B981)
- **Background**: Light Gray (#F3F4F6)
- **Borders**: Gray (#E5E7EB)

### Responsive Design
```
Mobile: < 768px
- Full-width layout
- Stacked sidebar below content
- Touch-friendly buttons
- Optimized images

Tablet: 768px - 1023px
- 2-column product grid
- Sidebar on left
- Scaled spacing

Desktop: 1024px+
- 3-column product grid
- Sticky sidebar
- Full navigation
```

### Animations
- Cart slide-in/out
- Product image hover zoom
- Button hover states
- Loading spinner
- Toast-like feedback on add to cart

## API Integration

### Endpoints Used
```typescript
// Get all products
GET /api/products?limit=100
Response: { data: Product[], pagination: {...} }

// Get single product
GET /api/products/:id
Response: { product: Product }

// Get categories (future)
GET /api/categories
Response: { data: Category[] }
```

### Error Handling
- Network errors logged to console
- Loading states during fetch
- Empty states when no results
- 404 page for missing products
- Graceful degradation

## File Structure

```
frontend/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout with StoreNav
│   ├── shop/
│   │   └── page.tsx               # Shop/Products page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx           # Product detail page
│   └── globals.css
│
├── components/
│   └── shop/
│       ├── StoreNav.tsx           # Navigation header
│       ├── CartSidebar.tsx        # Shopping cart modal
│       └── ProductCard.tsx        # Product card component
│
├── lib/
│   ├── store.ts                   # Zustand cart store
│   └── auth.ts                    # Auth utilities
│
├── types/
│   └── index.ts                   # TypeScript interfaces
│
└── STOREFRONT_GUIDE.md            # This file
```

## User Flows

### Browse Products
1. User visits `/shop`
2. Products load from API
3. Category sidebar renders
4. User can:
   - View all products (default)
   - Filter by category
   - Search by name/description
5. Products update in real-time

### View Product Details
1. User clicks product card or "View Details"
2. Navigates to `/products/[id]`
3. Product data fetches
4. Full details displayed
5. User can add to cart or go back

### Add to Cart
1. User selects quantity (1 default)
2. Clicks "Add to Cart"
3. Item added to Zustand store
4. Button shows "✓ Added" feedback
5. Cart count badge updates
6. Cart data persisted to localStorage

### View/Manage Cart
1. User clicks cart icon
2. CartSidebar slides in
3. Shows all items with images
4. User can:
   - Increase/decrease quantity
   - Remove items
   - See total price
   - Proceed to checkout
   - Continue shopping

## Performance Optimizations

- **Image Optimization**: Next.js Image component ready (use for /public images)
- **Code Splitting**: Dynamic page routes with lazy loading
- **State Persistence**: Zustand + localStorage for fast hydration
- **API Caching**: Browser cache headers respected
- **Responsive Images**: CSS media queries
- **Minimal Dependencies**: Zustand (5KB gzipped)

## Future Enhancements

1. **Product Reviews**: Display customer ratings and comments
2. **Wishlist**: Save favorite products
3. **Product Recommendations**: "You might also like" section
4. **Advanced Filters**: Price range, brand, ratings filters
5. **Sorting**: Sort by price, newest, popularity, rating
6. **Checkout Page**: Full checkout flow with payments
7. **User Accounts**: Login, order history, saved addresses
8. **Infinite Scroll**: Load more products as user scrolls
9. **Image Gallery**: Multiple product images with zoom
10. **Related Products**: Show related items on detail page
