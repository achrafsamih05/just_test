import { Response } from 'express';
import { Pool } from 'pg';
import { AuthRequest } from '../middleware/auth';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';

export class ProductController {
  private productModel: ProductModel;
  private categoryModel: CategoryModel;

  constructor(private pool: Pool) {
    this.productModel = new ProductModel(pool);
    this.categoryModel = new CategoryModel(pool);
  }

  /**
   * Get all products (public)
   * GET /api/products
   * Query: category_id, limit, offset
   */
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { category_id, limit = 20, offset = 0 } = req.query;

      const { products, total } = await this.productModel.getAll({
        category_id: category_id as string | undefined,
        is_active: true,
        limit: Math.min(parseInt(limit as string) || 20, 100),
        offset: Math.max(parseInt(offset as string) || 0, 0),
      });

      res.json({
        data: products,
        pagination: {
          total,
          limit: Math.min(parseInt(limit as string) || 20, 100),
          offset: Math.max(parseInt(offset as string) || 0, 0),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  /**
   * Get product by ID (public)
   * GET /api/products/:id
   */
  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productModel.getById(id);

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json({ product });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  /**
   * Create product (admin only)
   * POST /api/admin/products
   */
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, description, price, stock_quantity, category_id, image_url, sku } = req.body;

      // Validation
      if (!name || !description || price === undefined || stock_quantity === undefined || !category_id) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      if (price < 0 || stock_quantity < 0) {
        res.status(400).json({ error: 'Price and stock quantity must be non-negative' });
        return;
      }

      // Verify category exists
      const category = await this.categoryModel.getById(category_id);
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      // Check SKU uniqueness
      if (sku && await this.productModel.skuExists(sku)) {
        res.status(409).json({ error: 'SKU already exists' });
        return;
      }

      const product = await this.productModel.create({
        name,
        description,
        price: parseFloat(price),
        stock_quantity: parseInt(stock_quantity),
        category_id,
        image_url,
        sku,
      });

      res.status(201).json({ product });
    } catch (error: any) {
      console.error('Create product error:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  /**
   * Update product (admin only)
   * PUT /api/admin/products/:id
   */
  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, price, stock_quantity, category_id, image_url, sku } = req.body;

      // Check if product exists
      const existing = await this.productModel.getById(id);
      if (!existing) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      // Validation
      if (price !== undefined && price < 0) {
        res.status(400).json({ error: 'Price must be non-negative' });
        return;
      }

      if (stock_quantity !== undefined && stock_quantity < 0) {
        res.status(400).json({ error: 'Stock quantity must be non-negative' });
        return;
      }

      // If category is being changed, verify it exists
      if (category_id && category_id !== existing.category_id) {
        const category = await this.categoryModel.getById(category_id);
        if (!category) {
          res.status(404).json({ error: 'Category not found' });
          return;
        }
      }

      // Check SKU uniqueness
      if (sku && sku !== existing.sku && await this.productModel.skuExists(sku, id)) {
        res.status(409).json({ error: 'SKU already exists' });
        return;
      }

      const product = await this.productModel.update(id, {
        name,
        description,
        price: price !== undefined ? parseFloat(price) : undefined,
        stock_quantity: stock_quantity !== undefined ? parseInt(stock_quantity) : undefined,
        category_id,
        image_url,
        sku,
      });

      res.json({ product });
    } catch (error: any) {
      console.error('Update product error:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  /**
   * Delete product (admin only)
   * DELETE /api/admin/products/:id
   */
  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const product = await this.productModel.getById(id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      await this.productModel.delete(id);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}
