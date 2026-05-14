import { Pool } from 'pg';
import { Product } from '../types';

interface ProductInput {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  image_url?: string;
  sku?: string;
}

interface ProductFilters {
  category_id?: string;
  is_active?: boolean;
  limit?: number;
  offset?: number;
}

export class ProductModel {
  constructor(private pool: Pool) {}

  /**
   * Create a new product
   */
  async create(input: ProductInput): Promise<Product> {
    const { name, description, price, stock_quantity, category_id, image_url, sku } = input;

    const result = await this.pool.query(
      `INSERT INTO products (name, description, price, stock_quantity, category_id, image_url, sku, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
       RETURNING *`,
      [name, description, price, stock_quantity, category_id, image_url || null, sku || null]
    );

    return result.rows[0];
  }

  /**
   * Get all products with filters
   */
  async getAll(filters: ProductFilters = {}): Promise<{ products: Product[]; total: number }> {
    const { category_id, is_active = true, limit = 20, offset = 0 } = filters;

    let query = 'SELECT * FROM products WHERE is_active = $1';
    const params: any[] = [is_active];
    let paramIndex = 2;

    if (category_id) {
      query += ` AND category_id = $${paramIndex}`;
      params.push(category_id);
      paramIndex++;
    }

    // Get total count
    const countResult = await this.pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*) as count'),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    // Get paginated results
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await this.pool.query(query, params);
    return { products: result.rows, total };
  }

  /**
   * Get product by ID
   */
  async getById(id: string): Promise<Product | null> {
    const result = await this.pool.query(
      'SELECT * FROM products WHERE id = $1 AND is_active = true',
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Update product
   */
  async update(id: string, input: Partial<ProductInput>): Promise<Product | null> {
    const allowedFields = ['name', 'description', 'price', 'stock_quantity', 'category_id', 'image_url', 'sku'];
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(input)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updates.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (updates.length === 0) {
      return this.getById(id);
    }

    values.push(id);
    const query = `
      UPDATE products
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.pool.query(query, values);
    return result.rows[0] || null;
  }

  /**
   * Delete product (soft delete)
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.pool.query(
      'UPDATE products SET is_active = false WHERE id = $1',
      [id]
    );
    return result.rowCount ? result.rowCount > 0 : false;
  }

  /**
   * Check if SKU exists
   */
  async skuExists(sku: string, excludeId?: string): Promise<boolean> {
    let query = 'SELECT COUNT(*) FROM products WHERE sku = $1';
    const params: any[] = [sku];

    if (excludeId) {
      query += ' AND id != $2';
      params.push(excludeId);
    }

    const result = await this.pool.query(query, params);
    return parseInt(result.rows[0].count) > 0;
  }
}
