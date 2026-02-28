# omghost

API-first SVG icon generation service. Generate unique, AI-crafted ghost-style vector icons via a simple REST API, paid per request with [x402](https://x402.org) micropayments.

**Live:** [omghost.xyz](https://omghost.xyz)

## How It Works

1. **Choose a style** from the available ghost icon styles
2. **POST to `/api/generate`** with your style and optional brand context
3. **Poll `/api/generate/{jobId}/status`** until the icon is ready
4. **Get your SVG** — a unique, production-ready vector icon

Behind the scenes: OpenRouter (Gemini) generates a PNG logo, Runware vectorizes it to SVG, and the result is stored and served via a unique token.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** PostgreSQL via Prisma 7 (`@prisma/adapter-pg`)
- **Workflow:** Vercel Workflow SDK (durable async generation)
- **Image Gen:** OpenRouter API (Gemini `google/gemini-3.1-flash-image-preview`)
- **Vectorization:** Runware API (PNG → SVG)
- **Payments:** x402 micropayment protocol (`@x402/next`)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL database (Vercel Postgres, Neon, or local)

### Setup

```bash
# Clone the repo
git clone https://github.com/desplega-ai/x402-logo.git
cd x402-logo

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env with your actual values (see Environment Variables below)

# Run migrations
pnpm db:migrate

# Seed the database with icon styles
pnpm db:seed

# Start the dev server
pnpm dev
```

The app runs at `http://localhost:3000`.

### Vercel Setup (alternative)

If you have access to the Vercel project:

```bash
npm i -g vercel
vercel login
vercel link --yes --scope desplega-ai
vercel env pull .env.local --yes
pnpm install
pnpm db:push
pnpm db:seed
pnpm dev
```

Or use the one-command setup: `pnpm test:setup`

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `OPENROUTER_API_KEY` | Yes | OpenRouter API key for Gemini image generation |
| `RUNWARE_API_KEY` | Yes | Runware API key for PNG-to-SVG vectorization |
| `X402_WALLET_ADDRESS` | Yes | Wallet address to receive x402 payments |
| `X402_FACILITATOR_URL` | No | x402 facilitator URL (default: `https://www.x402.org/facilitator`) |
| `X402_NETWORK` | No | x402 network (default: `eip155:84532` Base Sepolia testnet) |
| `OPENROUTER_MODEL` | No | Override AI model (default: `google/gemini-3.1-flash-image-preview`) |

## API Endpoints

All endpoints are served at the app's base URL (e.g., `https://omghost.xyz`).

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/styles` | None | List available icon styles |
| `POST` | `/api/generate` | x402 | Start icon generation |
| `GET` | `/api/generate/{jobId}/status` | None | Poll generation job status |
| `GET` | `/api/asset/{token}` | None | Retrieve generated SVG by token |
| `POST` | `/api/rate` | None | Rate a generated icon |

### Generate an Icon

```bash
# Start generation (x402 payment required)
curl -X POST https://omghost.xyz/api/generate \
  -H "Content-Type: application/json" \
  -d '{"styleName": "Pixel Icons", "brandName": "Acme"}'

# Response: { "jobId": "...", "runId": "...", "status": "pending" }

# Poll until complete
curl https://omghost.xyz/api/generate/{jobId}/status

# Response (when done): { "status": "completed", "token": "...", "svg": "..." }
```

### Request Body (`POST /api/generate`)

| Field | Type | Required | Description |
|---|---|---|---|
| `styleName` | string | Yes | Name of the icon style (from `/api/styles`) |
| `brandName` | string | No | Brand or project name (max 100 chars) |
| `brandVoice` | string | No | Brand personality description (max 500 chars) |

## Database

Uses Prisma 7 with PostgreSQL. The schema defines four models:

- **Style** — Icon styles with system prompts and SVG examples
- **GenerationJob** — Tracks async generation requests
- **Asset** — Stores generated SVG and PNG assets
- **Rate** — User ratings for generated icons

### Commands

```bash
pnpm db:generate   # Generate Prisma client
pnpm db:migrate    # Run migrations (dev)
pnpm db:push       # Push schema directly (dev shortcut)
pnpm db:seed       # Seed styles
pnpm db:studio     # Open Prisma Studio
pnpm db:reset      # Reset database
```

For production deployments, use `prisma migrate deploy` instead of `db:push`.

## Architecture

### Generation Workflow

The generation pipeline uses Vercel's durable Workflow SDK:

1. **`generatePng`** — Calls OpenRouter (Gemini) to generate a PNG logo image
2. **`vectorizePng`** — Sends PNG to Runware API for SVG vectorization
3. **`storeAssets`** — Stores both PNG and SVG via internal HTTP endpoints
4. **`markJobFailed`** — Error handler that marks the job as failed

Prisma can't be used directly in workflow steps (Node.js modules unavailable in Vercel's sandbox), so DB operations go through internal API endpoints (`/api/internal/store-asset`, `/api/internal/fail-job`).

### x402 Payments

The `POST /api/generate` endpoint is gated by the x402 micropayment protocol via `@x402/next`. Clients must include a valid x402 payment header. The facilitator verifies payment before the request is processed.

## Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (prisma generate + next build)
pnpm start        # Start production server
pnpm test:e2e     # Run E2E tests (requires running server)
pnpm test:setup   # Full environment setup (Vercel)
```

## License

ISC
