import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const STYLES = [
  {
    name: "Geometric Minimal",
    slug: "geometric-minimal",
    description:
      "Clean shapes, bold simplicity. Think Airbnb, Mastercard.",
    priceUsd: 0.05,
    rating: 4.8,
    ratingCount: 124,
    color: "from-blue-500 to-cyan-400",
    iconSvg: `<svg viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="40" r="18" fill="currentColor" opacity="0.2"/><circle cx="40" cy="40" r="10" fill="currentColor"/></svg>`,
  },
  {
    name: "Lettermark Bold",
    slug: "lettermark-bold",
    description: "Typography-driven marks. Think HBO, IBM, NASA.",
    priceUsd: 0.08,
    rating: 4.9,
    ratingCount: 98,
    color: "from-violet-500 to-purple-400",
    iconSvg: `<svg viewBox="0 0 80 80"><text x="40" y="55" text-anchor="middle" font-size="40" font-weight="900" fill="currentColor">Ab</text></svg>`,
  },
  {
    name: "Abstract Gradient",
    slug: "abstract-gradient",
    description: "Fluid forms with depth. Think Instagram, Firefox.",
    priceUsd: 0.1,
    rating: 4.7,
    ratingCount: 87,
    color: "from-pink-500 to-orange-400",
    iconSvg: `<svg viewBox="0 0 80 80"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.3"/><stop offset="100%" stop-color="currentColor"/></linearGradient></defs><circle cx="30" cy="35" r="20" fill="url(#grad1)"/><circle cx="50" cy="45" r="20" fill="currentColor" opacity="0.5"/></svg>`,
  },
  {
    name: "Line Art",
    slug: "line-art",
    description: "Elegant continuous strokes. Think Squarespace, Medium.",
    priceUsd: 0.06,
    rating: 4.6,
    ratingCount: 72,
    color: "from-emerald-500 to-teal-400",
    iconSvg: `<svg viewBox="0 0 80 80" fill="none"><path d="M15 60 Q40 10 65 60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M25 55 Q40 25 55 55" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/></svg>`,
  },
  {
    name: "Emblem Classic",
    slug: "emblem-classic",
    description: "Badge-style authority. Think Porsche, Starbucks.",
    priceUsd: 0.12,
    rating: 4.8,
    ratingCount: 65,
    color: "from-amber-500 to-yellow-400",
    iconSvg: `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="40" r="22" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="40" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">&#9733;</text></svg>`,
  },
  {
    name: "Wordmark Modern",
    slug: "wordmark-modern",
    description: "Custom type, unforgettable. Think Google, Spotify.",
    priceUsd: 0.07,
    rating: 4.5,
    ratingCount: 54,
    color: "from-rose-500 to-red-400",
    iconSvg: `<svg viewBox="0 0 80 80"><text x="40" y="48" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor" letter-spacing="-1">logo</text><line x1="15" y1="56" x2="65" y2="56" stroke="currentColor" stroke-width="2" opacity="0.3"/></svg>`,
  },
];

async function main() {
  console.log("Seeding styles...");

  for (const style of STYLES) {
    await prisma.style.upsert({
      where: { slug: style.slug },
      update: {
        name: style.name,
        description: style.description,
        priceUsd: style.priceUsd,
        rating: style.rating,
        ratingCount: style.ratingCount,
        color: style.color,
        iconSvg: style.iconSvg,
      },
      create: style,
    });
    console.log(`  Upserted style: ${style.name}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
