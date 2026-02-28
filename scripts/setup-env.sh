#!/usr/bin/env bash
#
# Set up the local development environment for x402-logo.
# Pulls env vars from Vercel, installs deps, generates Prisma client,
# and pushes the DB schema.
#
# Prerequisites:
#   - Vercel CLI installed: npm i -g vercel
#   - Authenticated: vercel login (or VERCEL_TOKEN env var)
#   - pnpm installed
#
# Usage:
#   ./scripts/setup-env.sh
#   VERCEL_TOKEN=vcp_xxx ./scripts/setup-env.sh
#
set -euo pipefail

SCOPE="${VERCEL_SCOPE:-desplega-ai}"
TOKEN_FLAG=""
if [ -n "${VERCEL_TOKEN:-}" ]; then
  TOKEN_FLAG="--token $VERCEL_TOKEN"
fi

echo "==> Linking Vercel project..."
vercel link --yes $TOKEN_FLAG --scope "$SCOPE"

echo "==> Pulling environment variables..."
vercel env pull .env.local --yes $TOKEN_FLAG

echo "==> Installing dependencies..."
pnpm install

echo "==> Generating Prisma client..."
pnpm db:generate

echo "==> Pushing DB schema..."
# Load DATABASE_URL from .env.local for Prisma CLI
export DATABASE_URL=$(grep '^DATABASE_URL=' .env.local | cut -d= -f2- | tr -d '"')
pnpm db:push

echo "==> Seeding database..."
pnpm db:seed

echo ""
echo "Setup complete! Run 'pnpm dev' to start the dev server."
