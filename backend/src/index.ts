import 'dotenv/config';
import { createApp } from './app';
import { getPool } from './db';

/**
 * Local / containerized server entry point.
 * On Vercel, this file is NOT executed; `api/index.ts` exports the handler instead.
 */

const pool = getPool();

// Lightweight startup connectivity check (does NOT exit on failure so
// the process can come up and serve a /health endpoint useful for diagnostics).
pool
  .query('SELECT NOW()')
  .then((res) => {
    console.log('Database connected:', res.rows[0]);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

const app = createApp(pool);

const PORT = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check:    http://localhost:${PORT}/health`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down gracefully...`);
  pool
    .end()
    .then(() => {
      console.log('Database pool closed');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error closing pool:', err);
      process.exit(1);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
