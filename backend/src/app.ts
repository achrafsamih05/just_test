import express, { Application, Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import { Pool } from 'pg';
import { createAuthRoutes } from './routes/authRoutes';
import { createProductRoutes } from './routes/productRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

function buildCorsOptions(): CorsOptions {
  const raw = process.env.FRONTEND_URL || 'http://localhost:3000';
  // Allow comma-separated list, e.g. "https://app.example.com,https://staging.example.com"
  const allowed = raw.split(',').map((s) => s.trim()).filter(Boolean);

  return {
    origin: (origin, callback) => {
      // Same-origin / curl / server-to-server requests have no Origin header.
      if (!origin) return callback(null, true);
      if (allowed.includes('*') || allowed.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  };
}

export function createApp(pool: Pool): Application {
  const app = express();

  // Trust proxy headers (required behind Vercel / load balancers)
  app.set('trust proxy', 1);

  // ==================== MIDDLEWARE ====================
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(buildCorsOptions()));

  // Lightweight request logger (skipped in tests)
  if (process.env.NODE_ENV !== 'test') {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
      next();
    });
  }

  // ==================== ROUTES ====================
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', createAuthRoutes(pool));
  app.use('/api/products', createProductRoutes(pool));

  // ==================== ERROR HANDLING ====================
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
