import { Router } from 'express';
import { Pool } from 'pg';
import { ProductController } from '../controllers/productController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

export function createProductRoutes(pool: Pool): Router {
  const router = Router();
  const productController = new ProductController(pool);

  // ==================== PUBLIC ROUTES ====================

  /**
   * GET /api/products
   * Get all products with optional filters
   * Query: category_id, limit, offset
   */
  router.get('/', (req, res) => productController.getAll(req, res));

  /**
   * GET /api/products/:id
   * Get product details by ID
   */
  router.get('/:id', (req, res) => productController.getById(req, res));

  // ==================== ADMIN ROUTES ====================

  /**
   * POST /api/admin/products
   * Create a new product (admin only)
   */
  router.post('/admin/products', authenticateToken, requireAdmin, (req, res) =>
    productController.create(req, res)
  );

  /**
   * PUT /api/admin/products/:id
   * Update product (admin only)
   */
  router.put('/admin/products/:id', authenticateToken, requireAdmin, (req, res) =>
    productController.update(req, res)
  );

  /**
   * DELETE /api/admin/products/:id
   * Delete product (admin only)
   */
  router.delete('/admin/products/:id', authenticateToken, requireAdmin, (req, res) =>
    productController.delete(req, res)
  );

  return router;
}
