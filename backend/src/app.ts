import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { createAuthRoutes } from './routes/authRoutes';
import { createProductRoutes } from './routes/productRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export function createApp(pool: Pool): express.Application {
  const app = express();

  // ==================== MIDDLEWARE ====================

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    })
  );

  // Request logging (basic)
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // ==================== ROUTES ====================

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Routes
  app.use('/api/auth', createAuthRoutes(pool));
  app.use('/api/products', createProductRoutes(pool));

  // ==================== ERROR HANDLING ====================

  // 404 handler (must be before global error handler)
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
}
