/**
 * Type definitions for the application
 */

export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  image_url: string | null;
  sku: string | null;
  is_active: boolean;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password_hash'>;
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
}
