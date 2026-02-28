# x402-logo

API-first SVG logo generation service using Vercel Workflow + OpenRouter.

## Quick Start

```bash
pnpm install
pnpm dev
```

## Environment Setup

The project uses Vercel for hosting and env management. To pull environment variables:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Authenticate (interactive)
vercel login

# Or use a token (non-interactive / CI)
export VERCEL_TOKEN=vcp_xxx

# Full setup: link project, pull env, install deps, push schema, seed DB
pnpm test:setup

# Or manually:
vercel link --yes --scope desplega-ai
vercel env pull .env.local --yes
```

### Required Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Vercel Postgres / Neon) |
| `OPENROUTER_API_KEY` | OpenRouter API key for LLM-based SVG generation |
| `OPENROUTER_MODEL` | Optional. Default: `google/gemini-3.1-flash-image-preview` |

## Database

Uses Prisma 7 with the `@prisma/adapter-pg` driver adapter.

```bash
pnpm db:generate   # Generate Prisma client
pnpm db:push       # Push schema to database (requires DATABASE_URL exported)
pnpm db:seed       # Seed with 8 hand-crafted styles
pnpm db:studio     # Open Prisma Studio
```

**Note:** For Prisma CLI commands (`db:push`, `db:migrate`), the `DATABASE_URL` must be available
via `dotenv/config` (loaded from `.env` or `.env.local`). The `prisma.config.ts` reads it from
`process.env.DATABASE_URL`.

## Architecture

### SVG Generation Flow

1. `POST /api/generate` — Creates a GenerationJob, starts a durable Vercel Workflow
2. Workflow step `callOpenRouter` — Calls OpenRouter API with structured JSON output
3. Workflow step `storeAsset` — Stores SVG via internal API (Prisma unavailable in workflow sandbox)
4. `GET /api/generate/{jobId}/status` — Poll for completion (pending → completed/failed)
5. `GET /api/asset/{token}` — Retrieve the generated SVG by token

### Key Constraint

Prisma 7 uses `node:path` and `node:url` internally, which are not available in Vercel Workflow's
sandboxed step execution. All DB operations from workflow steps go through internal HTTP endpoints:
- `POST /api/internal/store-asset`
- `POST /api/internal/fail-job`

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/styles` | List available styles |
| `POST` | `/api/generate` | Start SVG generation (body: `{styleName, brandName?, brandVoice?}`) |
| `GET` | `/api/generate/{jobId}/status` | Poll generation job status |
| `GET` | `/api/asset/{token}` | Retrieve generated SVG asset |
| `POST` | `/api/rate` | Rate a generated asset (body: `{token, rating, styleName, text?}`) |

## Testing

### E2E Tests

Run the full end-to-end test suite against a running server:

```bash
# Start the dev server first
pnpm dev

# In another terminal, run E2E tests
pnpm test:e2e

# Or against a deployed URL
BASE_URL=https://x402-logo.vercel.app pnpm test:e2e
```

The E2E script (`scripts/e2e-test.sh`) tests:
1. Style listing (`GET /api/styles`)
2. SVG generation with valid style (`POST /api/generate`)
3. 404 for unknown style
4. 400 for invalid request body
5. Job status polling until completion
6. Asset retrieval by token
7. 404 for unknown asset token
8. 404 for unknown job ID

### First-Time Setup for Testing

```bash
# One-command setup (installs deps, pulls env, pushes schema, seeds DB)
pnpm test:setup
```

## Build

```bash
pnpm build   # Runs prisma generate + next build
```

## Commands Reference

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm test:e2e     # Run E2E tests (requires running server)
pnpm test:setup   # Full environment setup
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
pnpm db:seed      # Seed styles
pnpm db:studio    # Open Prisma Studio
```
