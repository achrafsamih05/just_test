# Deploying to Vercel

This is a monorepo with two independently-deployable apps. **Create two Vercel projects from the same GitHub repository**, each pointing at a different subdirectory.

> Do **not** create a root `vercel.json`. Vercel detects each project's framework from the `package.json` at its **Root Directory**. Adding a root `vercel.json` with `"framework": "nextjs"` causes:
>
> ```
> Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies".
> ```
>
> ...because the repo root has no `package.json`.

## Project 1 — Frontend (Next.js)

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework Preset | Next.js (auto-detected) |
| Build Command | *(leave default)* |
| Install Command | *(leave default)* |
| Output Directory | *(leave default)* |

Environment variables:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://<your-backend-project>.vercel.app/api` |

## Project 2 — Backend (Express on Serverless Functions)

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Output Directory | *(leave empty)* |

The `backend/vercel.json` ships `api/index.ts` as a single serverless function and rewrites all paths to it, so `/api/auth/login`, `/health`, etc. all resolve through the Express app.

Environment variables:

| Name | Example |
|---|---|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db?sslmode=require` |
| `JWT_SECRET` | a long random string |
| `JWT_EXPIRE` | `7d` |
| `FRONTEND_URL` | `https://<your-frontend-project>.vercel.app` (comma-separated for multiple origins) |
| `BCRYPT_ROUNDS` | `10` |
| `NODE_ENV` | `production` (Vercel sets this automatically) |

## Local development

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (in another terminal)
cd frontend && npm install && npm run dev
```
