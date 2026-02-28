import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const STYLES = [
  {
    name: "Geometric Minimal",
    shortDescription:
      "Clean shapes, bold simplicity. Think Airbnb, Mastercard.",
    systemPrompt:
      "Generate a minimalist SVG logo using clean geometric shapes — circles, rectangles, triangles. Use bold, simple forms with no gradients. Focus on negative space and symmetry. Output a single SVG element with viewBox='0 0 200 200'.",
    svgExamples: [
      `<svg viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="40" r="18" fill="currentColor" opacity="0.2"/><circle cx="40" cy="40" r="10" fill="currentColor"/></svg>`,
    ],
  },
  {
    name: "Lettermark Bold",
    shortDescription: "Typography-driven marks. Think HBO, IBM, NASA.",
    systemPrompt:
      "Generate an SVG lettermark logo using bold typography. Take the brand's initials and create a striking typographic mark. Use strong font weights and tight letter spacing. Output a single SVG element with viewBox='0 0 200 200'.",
    svgExamples: [
      `<svg viewBox="0 0 80 80"><text x="40" y="55" text-anchor="middle" font-size="40" font-weight="900" fill="currentColor">Ab</text></svg>`,
    ],
  },
  {
    name: "Abstract Gradient",
    shortDescription: "Fluid forms with depth. Think Instagram, Firefox.",
    systemPrompt:
      "Generate an SVG logo with abstract, fluid shapes and gradient fills. Use overlapping organic forms with linear or radial gradients. Create depth through layering and transparency. Output a single SVG element with viewBox='0 0 200 200'.",
    svgExamples: [
      `<svg viewBox="0 0 80 80"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.3"/><stop offset="100%" stop-color="currentColor"/></linearGradient></defs><circle cx="30" cy="35" r="20" fill="url(#grad1)"/><circle cx="50" cy="45" r="20" fill="currentColor" opacity="0.5"/></svg>`,
    ],
  },
  {
    name: "Line Art",
    shortDescription:
      "Elegant continuous strokes. Think Squarespace, Medium.",
    systemPrompt:
      "Generate an SVG logo using continuous line art. Create an elegant design with flowing strokes and minimal fills. Use stroke-linecap='round' and vary stroke widths for visual interest. Output a single SVG element with viewBox='0 0 200 200'.",
    svgExamples: [
      `<svg viewBox="0 0 80 80" fill="none"><path d="M15 60 Q40 10 65 60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M25 55 Q40 25 55 55" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/></svg>`,
    ],
  },
  {
    name: "Emblem Classic",
    shortDescription: "Badge-style authority. Think Porsche, Starbucks.",
    systemPrompt:
      "Generate an SVG emblem-style logo with a badge or shield shape. Include concentric borders, a central icon, and optional text along a path. Convey authority and tradition. Output a single SVG element with viewBox='0 0 200 200'.",
    svgExamples: [
      `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="40" r="22" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="40" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">&#9733;</text></svg>`,
    ],
  },
  {
    name: "Wordmark Modern",
    shortDescription: "Custom type, unforgettable. Think Google, Spotify.",
    systemPrompt:
      "Generate an SVG wordmark logo with custom modern typography. Style the full brand name with unique letterforms, custom kerning, and optional decorative elements like underlines or dots. Output a single SVG element with viewBox='0 0 200 200'.",
    svgExamples: [
      `<svg viewBox="0 0 80 80"><text x="40" y="48" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor" letter-spacing="-1">logo</text><line x1="15" y1="56" x2="65" y2="56" stroke="currentColor" stroke-width="2" opacity="0.3"/></svg>`,
    ],
  },
];

async function main() {
  console.log("Seeding styles...");

  for (const style of STYLES) {
    await prisma.style.upsert({
      where: { name: style.name },
      update: {
        shortDescription: style.shortDescription,
        systemPrompt: style.systemPrompt,
        svgExamples: style.svgExamples,
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
