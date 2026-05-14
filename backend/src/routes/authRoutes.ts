import { Router } from 'express';
import { Pool } from 'pg';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

export function createAuthRoutes(pool: Pool): Router {
  const router = Router();
  const authController = new AuthController(pool);

  /**
   * POST /api/auth/register
   * Register a new user (customer role by default)
   */
  router.post('/register', (req, res) => authController.register(req, res));

  /**
   * POST /api/auth/login
   * Login and receive JWT token with role
   */
  router.post('/login', (req, res) => authController.login(req, res));

  /**
   * GET /api/auth/profile
   * Get current user profile (requires authentication)
   */
  router.get('/profile', authenticateToken, (req, res) => authController.getProfile(req, res));

  return router;
}
