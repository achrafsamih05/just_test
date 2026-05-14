import { Pool } from 'pg';
import { Category } from '../types';

interface CategoryInput {
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export class CategoryModel {
  constructor(private pool: Pool) {}

  /**
   * Get all categories
   */
  async getAll(): Promise<Category[]> {
    const result = await this.pool.query(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    return result.rows;
  }

  /**
   * Get category by ID
   */
  async getById(id: string): Promise<Category | null> {
    const result = await this.pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Get category by slug
   */
  async getBySlug(slug: string): Promise<Category | null> {
    const result = await this.pool.query(
      'SELECT * FROM categories WHERE slug = $1',
      [slug]
    );
    return result.rows[0] || null;
  }

  /**
   * Create category
   */
  async create(input: CategoryInput): Promise<Category> {
    const { name, slug, description, image_url } = input;

    // Check if slug already exists
    const existing = await this.getBySlug(slug);
    if (existing) {
      const error = new Error('Category slug already exists');
      (error as any).status = 409;
      throw error;
    }

    const result = await this.pool.query(
      `INSERT INTO categories (name, slug, description, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, slug, description || null, image_url || null]
    );

    return result.rows[0];
  }
}
