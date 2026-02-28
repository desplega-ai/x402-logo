import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const STYLES = [
  {
    name: "Pixel",
    shortDescription:
      "8-bit retro pixel ghost icon",
    systemPrompt: `Generate a single icon in a strict Pixel Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Construction: The entire icon is built from a strict uniform grid of equal-sized filled squares — like an 8-bit sprite or a pixel art game asset. Every square is identical in size. Every square is perfectly aligned to the grid. The icon shape is formed entirely by which squares are filled and which are empty — no curves, no diagonals, no anti-aliasing. Edges are always perfectly horizontal or vertical. The shapeRendering="crispEdges" rule is mandatory — no smoothing of any kind.
Grid logic: The grid should be coarse enough to feel retro and deliberate — approximately 10×12 to 14×16 cells for the icon area. Not so fine that it loses the pixelated character, not so coarse that the subject becomes unrecognizable. The subject silhouette is approximated in this grid, stairstepping where curves would otherwise be.
Eyes / details: Key internal details (eyes, symbols, cutouts) are represented by squares filled with the background color, punched into the body of the icon. No sub-pixel detail — every detail must occupy at least a 2×2 block of cells to be legible.
Style: Flat, hard-edged, zero smoothing. Each square is a single solid color. No gradients, no strokes on individual squares, no drop shadows, no textures. The aesthetic is NES sprite, Game Boy icon, or vintage LED matrix display.
Color: Icon squares are one solid color. Background squares are empty (background color shows through). Two colors total maximum.
Rendering: Centered on a square canvas with even padding. shapeRendering="crispEdges" must be set on the SVG element. Should feel like it belongs in a retro game, a chiptune album cover, or an 8-bit UI.
No extras: No labels, no frames, no glow, no anti-aliased edges. Pixel grid and background only.
Adaptation rule: Reduce the target subject to its most essential silhouette, then approximate that silhouette on the pixel grid using only filled and empty squares. Embrace the stairstepping — it is the style, not a flaw. Internal details should be suggested with 2×2 or larger blocks of background-colored cells.

Generate a single Pixel Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 180 216" fill="none" shapeRendering="crispEdges"><rect x="36" y="0" width="18" height="18" fill="#ffffff"/><rect x="54" y="0" width="18" height="18" fill="#ffffff"/><rect x="72" y="0" width="18" height="18" fill="#ffffff"/><rect x="90" y="0" width="18" height="18" fill="#ffffff"/><rect x="108" y="0" width="18" height="18" fill="#ffffff"/><rect x="126" y="0" width="18" height="18" fill="#ffffff"/><rect x="18" y="18" width="18" height="18" fill="#ffffff"/><rect x="36" y="18" width="18" height="18" fill="#ffffff"/><rect x="54" y="18" width="18" height="18" fill="#ffffff"/><rect x="72" y="18" width="18" height="18" fill="#ffffff"/><rect x="90" y="18" width="18" height="18" fill="#ffffff"/><rect x="108" y="18" width="18" height="18" fill="#ffffff"/><rect x="126" y="18" width="18" height="18" fill="#ffffff"/><rect x="144" y="18" width="18" height="18" fill="#ffffff"/><rect x="0" y="36" width="18" height="18" fill="#ffffff"/><rect x="18" y="36" width="18" height="18" fill="#ffffff"/><rect x="36" y="36" width="18" height="18" fill="#ffffff"/><rect x="54" y="36" width="18" height="18" fill="#ffffff"/><rect x="72" y="36" width="18" height="18" fill="#ffffff"/><rect x="90" y="36" width="18" height="18" fill="#ffffff"/><rect x="108" y="36" width="18" height="18" fill="#ffffff"/><rect x="126" y="36" width="18" height="18" fill="#ffffff"/><rect x="144" y="36" width="18" height="18" fill="#ffffff"/><rect x="162" y="36" width="18" height="18" fill="#ffffff"/><rect x="0" y="54" width="18" height="18" fill="#ffffff"/><rect x="18" y="54" width="18" height="18" fill="#ffffff"/><rect x="72" y="54" width="18" height="18" fill="#ffffff"/><rect x="90" y="54" width="18" height="18" fill="#ffffff"/><rect x="144" y="54" width="18" height="18" fill="#ffffff"/><rect x="162" y="54" width="18" height="18" fill="#ffffff"/><rect x="36" y="54" width="18" height="18" fill="#000000"/><rect x="54" y="54" width="18" height="18" fill="#000000"/><rect x="108" y="54" width="18" height="18" fill="#000000"/><rect x="126" y="54" width="18" height="18" fill="#000000"/><rect x="0" y="72" width="18" height="18" fill="#ffffff"/><rect x="18" y="72" width="18" height="18" fill="#ffffff"/><rect x="72" y="72" width="18" height="18" fill="#ffffff"/><rect x="90" y="72" width="18" height="18" fill="#ffffff"/><rect x="144" y="72" width="18" height="18" fill="#ffffff"/><rect x="162" y="72" width="18" height="18" fill="#ffffff"/><rect x="36" y="72" width="18" height="18" fill="#000000"/><rect x="54" y="72" width="18" height="18" fill="#000000"/><rect x="108" y="72" width="18" height="18" fill="#000000"/><rect x="126" y="72" width="18" height="18" fill="#000000"/><rect x="0" y="90" width="18" height="18" fill="#ffffff"/><rect x="18" y="90" width="18" height="18" fill="#ffffff"/><rect x="36" y="90" width="18" height="18" fill="#ffffff"/><rect x="54" y="90" width="18" height="18" fill="#ffffff"/><rect x="72" y="90" width="18" height="18" fill="#ffffff"/><rect x="90" y="90" width="18" height="18" fill="#ffffff"/><rect x="108" y="90" width="18" height="18" fill="#ffffff"/><rect x="126" y="90" width="18" height="18" fill="#ffffff"/><rect x="144" y="90" width="18" height="18" fill="#ffffff"/><rect x="162" y="90" width="18" height="18" fill="#ffffff"/><rect x="0" y="108" width="18" height="18" fill="#ffffff"/><rect x="18" y="108" width="18" height="18" fill="#ffffff"/><rect x="36" y="108" width="18" height="18" fill="#ffffff"/><rect x="54" y="108" width="18" height="18" fill="#ffffff"/><rect x="72" y="108" width="18" height="18" fill="#ffffff"/><rect x="90" y="108" width="18" height="18" fill="#ffffff"/><rect x="108" y="108" width="18" height="18" fill="#ffffff"/><rect x="126" y="108" width="18" height="18" fill="#ffffff"/><rect x="144" y="108" width="18" height="18" fill="#ffffff"/><rect x="162" y="108" width="18" height="18" fill="#ffffff"/><rect x="0" y="126" width="18" height="18" fill="#ffffff"/><rect x="18" y="126" width="18" height="18" fill="#ffffff"/><rect x="54" y="126" width="18" height="18" fill="#ffffff"/><rect x="72" y="126" width="18" height="18" fill="#ffffff"/><rect x="90" y="126" width="18" height="18" fill="#ffffff"/><rect x="108" y="126" width="18" height="18" fill="#ffffff"/><rect x="144" y="126" width="18" height="18" fill="#ffffff"/><rect x="162" y="126" width="18" height="18" fill="#ffffff"/><rect x="0" y="144" width="18" height="18" fill="#ffffff"/><rect x="54" y="144" width="18" height="18" fill="#ffffff"/><rect x="72" y="144" width="18" height="18" fill="#ffffff"/><rect x="90" y="144" width="18" height="18" fill="#ffffff"/><rect x="108" y="144" width="18" height="18" fill="#ffffff"/><rect x="162" y="144" width="18" height="18" fill="#ffffff"/><rect x="0" y="162" width="18" height="18" fill="#ffffff"/><rect x="18" y="162" width="18" height="18" fill="#ffffff"/><rect x="36" y="162" width="18" height="18" fill="#ffffff"/><rect x="54" y="162" width="18" height="18" fill="#ffffff"/><rect x="72" y="162" width="18" height="18" fill="#ffffff"/><rect x="90" y="162" width="18" height="18" fill="#ffffff"/><rect x="108" y="162" width="18" height="18" fill="#ffffff"/><rect x="126" y="162" width="18" height="18" fill="#ffffff"/><rect x="144" y="162" width="18" height="18" fill="#ffffff"/><rect x="162" y="162" width="18" height="18" fill="#ffffff"/><rect x="0" y="180" width="18" height="18" fill="#ffffff"/><rect x="36" y="180" width="18" height="18" fill="#ffffff"/><rect x="54" y="180" width="18" height="18" fill="#ffffff"/><rect x="108" y="180" width="18" height="18" fill="#ffffff"/><rect x="126" y="180" width="18" height="18" fill="#ffffff"/><rect x="162" y="180" width="18" height="18" fill="#ffffff"/><rect x="36" y="198" width="18" height="18" fill="#ffffff"/><rect x="54" y="198" width="18" height="18" fill="#ffffff"/><rect x="108" y="198" width="18" height="18" fill="#ffffff"/><rect x="126" y="198" width="18" height="18" fill="#ffffff"/></svg>`,
    ],
  },
  {
    name: "Sharp",
    shortDescription:
      "Angular, geometric ghost icon",
    systemPrompt: `Generate a single icon in a strict Sharp Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Construction: The entire icon is built from straight lines and hard angles only — no curves, no rounded joins, no bezier paths whatsoever. The silhouette is a geometric, faceted approximation of the subject. Where Classic uses a smooth dome, Sharp uses a pointed apex. Where Classic uses curved sides, Sharp uses straight angled edges meeting at defined vertices. The bottom edge ends in sharp pointed V-notches, not rounded scallops. Every joint is a hard miter. The overall feel is crystalline, angular, and architectural.
Eyes / details: Internal details are rendered as triangles or sharp polygons — never circles or ellipses. The ghost uses downward-pointing triangles for eyes. Whatever the subject, its key internal details should be reduced to the sharpest, most geometric polygon that still communicates the idea.
Style: Flat and fully filled. Hard miter joins everywhere — strokeLinejoin="miter" is mandatory. No rounded caps, no soft edges, no gradients, no shading, no textures, no drop shadows. The aesthetic is geometric abstraction, angular logo design, or low-poly illustration.
Color: Icon body is one solid color. Background is a flat contrasting color. Internal detail polygons are filled with the background color. Two colors total maximum.
Rendering: Centered on a square canvas with even padding. Should feel at home in a geometric icon set, a metal band logo, or a brutalist UI.
No extras: No labels, no frames, no glow. Angular silhouette and background only.
Adaptation rule: Take the target subject and strip it down to its sharpest possible geometric interpretation. Replace every curve with a straight edge. Replace every rounded corner with a pointed vertex. Replace every circular detail with a triangle or diamond. The more angular and faceted, the better.

Generate a single Sharp Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 220" fill="none"><path d="M100 20 L40 65 L35 185 L55 160 L75 185 L100 160 L125 185 L145 160 L165 185 L165 65 Z" fill="#ffffff" stroke="#000000" stroke-width="2" stroke-linejoin="miter" /><polygon points="75,80 88,115 62,115" fill="#000000" /><polygon points="125,80 138,115 112,115" fill="#000000" /></svg>`,
    ],
  },
  {
    name: "Drip",
    shortDescription:
      "Melting, dripping ghost icon",
    systemPrompt: `Generate a single icon in a strict Drip Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Construction: The icon is a single filled silhouette that appears to be slowly melting or dripping downward. The top and sides follow the general shape of the subject, but the bottom edge dissolves into a series of irregular drips and runs — elongated teardrop-like protrusions of varying lengths that hang downward unevenly. The drips are organic and asymmetric: some long and thin, some short and fat, some barely started. The key is that they feel like liquid caught mid-fall — gravity is visibly at work. The bottom of the shape never has a clean edge.
Drip anatomy: Each drip begins as a widening at the base of the body, then narrows as it extends downward, ending in a rounded teardrop tip. Drips vary in length and width. They are connected to the main body with smooth curves using quadratic bezier joints — no hard angles where drips meet the body. Adjacent drips are separated by shallow upward curves, like the space between hanging icicles.
Eyes / details: Standard elliptical eye cut-outs, filled with the background color, sitting in the upper portion of the body well above the drip zone. The dripping happens below the main mass — the upper body remains relatively clean and recognizable.
Style: Flat and fully filled. One solid color for the entire shape including the drips. Optional thin stroke. No gradients, no shading, no textures, no drop shadows. The silhouette alone communicates the melting — no rendering tricks needed.
Color: Icon body and drips are one solid color. Background is flat and contrasting. Two colors total maximum.
Rendering: The canvas should be taller than wide to accommodate the drips extending downward. Centered with even padding. Should feel at home in a horror-adjacent UI, a street art context, or a playful Halloween aesthetic.
No extras: No labels, no frames, no glow, no puddle at the bottom. Dripping silhouette and background only.
Adaptation rule: Take the target subject, render its recognizable upper silhouette cleanly, then let the bottom third dissolve into 4–7 drips of varying lengths. The subject should still be identifiable from its top and sides alone — the drips are an addition, not a replacement.

Generate a single Drip Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 240" fill="none"><path d="M100 18 C55 18 28 58 28 98 L28 170 Q30 180 38 178 Q46 175 48 185 Q50 195 58 193 Q66 190 68 200 Q70 210 78 207 L90 200 Q98 196 106 200 L118 207 Q126 210 128 200 Q130 190 138 193 Q146 195 148 185 Q150 175 158 178 Q166 180 168 170 L172 98 C172 58 145 18 100 18Z" fill="#ffffff" stroke="#000000" stroke-width="2" /><ellipse cx="82" cy="97" rx="14" ry="17" fill="#000000" /><ellipse cx="118" cy="97" rx="14" ry="17" fill="#000000" /></svg>`,
    ],
  },
  {
    name: "Minimal",
    shortDescription:
      "Ultra simplified ghost icon",
    systemPrompt: `Generate a single icon in a strict Minimal Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Construction: The icon is reduced to the absolute bare minimum number of paths needed to communicate the subject. Every element that can be removed has been removed. Every curve that can be simplified has been simplified. The silhouette is clean and tight — no decorative bottom edge treatment, no scallops, no drips, no texture. The bottom of the ghost simply ends in shallow, almost imperceptible waves — just enough to suggest the classic ghost skirt without committing to it. The overall shape is compact and confident.
Eyes / details: Perfect circles only — no ellipses, no polygons, no irregular shapes. Two equal circles, symmetrically placed, filled with the background color. Nothing else. No pupils, no highlights, no brows. If the subject has a defining internal detail, it is represented by the simplest possible geometric primitive: a circle, a line, or a rectangle. One detail maximum.
Style: Flat and fully filled. The fewer the paths the better — ideally the entire icon is two elements: one filled shape and one or two circles. No stroke required — if used, it should be very thin and the same color as the fill. No gradients, no shading, no textures, no drop shadows. Restraint is the entire point.
Color: One solid color for the body. Background is flat and contrasting. Two colors total, no exceptions. The icon should work as a single-color stamp or favicon.
Rendering: Centered on a square canvas with generous even padding. Should feel at home in a monochrome icon set, a terminal UI, a minimal brand identity, or a favicon at 16x16.
No extras: No labels, no frames, no glow, no decorative elements of any kind. If you are unsure whether to include something, leave it out.
Adaptation rule: Take the target subject and ask: what is the single most essential shape that makes this recognizable? Use only that. Strip every secondary element. If the result feels too empty, you have probably done it right. The icon should feel like it was designed by someone who was charged per path node.

Generate a single Minimal Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 210" fill="none"><path d="M100 30 C62 30 42 62 42 92 L42 175 Q57 155 72 175 Q87 155 100 175 Q113 155 128 175 Q143 155 158 175 L158 92 C158 62 138 30 100 30Z" fill="#ffffff" stroke="#000000" stroke-width="2" /><circle cx="82" cy="90" r="11" fill="#000000" /><circle cx="118" cy="90" r="11" fill="#000000" /></svg>`,
    ],
  },
];

async function main() {
  console.log("Clearing existing styles...");
  // Delete in order to respect FK constraints
  await prisma.generationJob.deleteMany({});
  await prisma.asset.deleteMany({});
  await prisma.rate.deleteMany({});
  await prisma.style.deleteMany({});

  console.log("Seeding ghost styles (batch 2: Pixel, Sharp, Drip, Minimal)...");
  for (const style of STYLES) {
    await prisma.style.create({ data: style });
    console.log(`  Created style: ${style.name}`);
  }

  console.log(`Seeding complete. ${STYLES.length} styles created.`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
