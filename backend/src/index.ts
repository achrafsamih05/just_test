import 'dotenv/config';
import { Pool } from 'pg';
import { createApp } from './app';

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('✓ Database connected:', res.rows[0]);
  }
});

// Create Express app
const app = createApp(pool);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  pool.end((err) => {
    if (err) {
      console.error('Error closing pool:', err);
      process.exit(1);
    }
    console.log('Database pool closed');
    process.exit(0);
  });
});
