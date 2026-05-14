import type { IncomingMessage, ServerResponse } from 'http';
import { createApp } from '../src/app';
import { getPool } from '../src/db';

/**
 * Vercel serverless entry point for the Express backend.
 *
 * Vercel turns this file into a single Lambda. The Express `app` is a normal
 * `(req, res) => void` request handler, so it works as a Vercel handler with
 * zero adapter code. Routing inside the app (e.g. `/api/auth/login`) takes
 * care of dispatching individual endpoints.
 *
 * The DB pool is cached on `globalThis` (see `src/db.ts`) so warm invocations
 * reuse the existing connection pool instead of creating a new one each call.
 */

const app = createApp(getPool());

export default function handler(req: IncomingMessage, res: ServerResponse): void {
  // `app` is `(req, res, next?) => void` — matches Vercel's expected signature.
  (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
}
