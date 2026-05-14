import { Pool, PoolConfig } from 'pg';

/**
 * Singleton PostgreSQL connection pool.
 *
 * In serverless environments (Vercel functions), each invocation may reuse a
 * "warm" container. We cache the pool on `globalThis` so we don't open a new
 * connection pool on every cold start, which would exhaust DB connections.
 */

declare global {
  // eslint-disable-next-line no-var
  var __PG_POOL__: Pool | undefined;
}

function buildPoolConfig(): PoolConfig {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL environment variable is not set. ' +
        'Please configure it in your environment (.env locally, Vercel project settings in production).'
    );
  }

  const isProduction = process.env.NODE_ENV === 'production';

  return {
    connectionString,
    // Managed Postgres providers (Neon, Supabase, RDS, Vercel Postgres) require TLS.
    // `rejectUnauthorized: false` is the standard setting for these providers.
    ssl: isProduction ? { rejectUnauthorized: false } : undefined,
    // Keep the pool small in serverless to avoid exhausting the database.
    max: isProduction ? 1 : 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  };
}

export function getPool(): Pool {
  if (!global.__PG_POOL__) {
    const pool = new Pool(buildPoolConfig());

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });

    global.__PG_POOL__ = pool;
  }

  return global.__PG_POOL__;
}
