export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at?: Date;
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
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}
