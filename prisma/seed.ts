import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const STYLES = [
  {
    name: "Classic",
    shortDescription: "The original ghost silhouette",
    systemPrompt: `Generate a single icon in a strict Classic Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
  <ellipse cx="80" cy="95" rx="14" ry="17" fill="#000000" />
  <ellipse cx="120" cy="95" rx="14" ry="17" fill="#000000" />
</svg>

Construction: The entire icon is a single filled silhouette — a smooth dome top curving into straight sides, ending in a rhythmic row of evenly-spaced pointed scallops along the bottom. The scallops are the signature element: uniform V-shaped notches, 4 of them, perfectly symmetrical. The shape is clean and consistent — no wobble, no organic variation.
Eyes: Two vertical ellipses sit symmetrically in the upper body, slightly above center. They are filled with the background color, reading as cut-outs from the ghost body. No mouth, no brows, no expression — eyes only.
Style: Flat and fully filled. A single solid color for the body. Optional thin stroke outline of the same or darker hue. No gradients, no shading, no textures, no drop shadows.
Color: Ghost body is one solid color. Background is a flat contrasting color. Two colors total maximum.
Rendering: Legible at small sizes. Centered on a square canvas with even padding. Should feel at home in an app icon set or UI library.
No extras: No labels, no frames, no glow. Ghost silhouette and background only.
Adaptation rule: Aim to keep the structural logic — dome top, straight sides, scalloped bottom, two elliptical eye cut-outs — but replace the ghost body shape with the target subject. The scallop count and eye proportions should scale naturally to the new shape.

Generate a single Classic Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z" fill="#ffffff" stroke="#000000" stroke-width="2" /><ellipse cx="80" cy="95" rx="14" ry="17" fill="#000000" /><ellipse cx="120" cy="95" rx="14" ry="17" fill="#000000" /></svg>`,
    ],
  },
  {
    name: "Chubby",
    shortDescription: "Extra soft and round ghost icon",
    systemPrompt: `Generate a single icon in a strict Chubby Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 230" fill="none">
  <path d="M100 18 C48 18 25 60 25 100 L25 192 Q25 200 33 196 L48 188 Q56 183 64 188 L80 197 Q88 202 96 197 L104 192 Q112 187 120 192 L136 201 Q144 206 152 201 L167 192 Q175 187 175 192 L175 100 C175 60 152 18 100 18Z" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
  <ellipse cx="80" cy="100" rx="16" ry="19" fill="#000000" />
  <ellipse cx="120" cy="100" rx="16" ry="19" fill="#000000" />
</svg>

Construction: The icon is a single filled silhouette — a wide, generously rounded dome top that flows into a broad, inflated body. The sides belly outward rather than dropping straight, giving a soft, pillowy feel. The bottom edge ends in a series of smooth, rounded lobes connected by gentle quadratic curves — not sharp scallops, but soft wave-like bumps that feel almost like a ruffle or a plush toy's hem. The overall shape is wider and rounder than Classic, with more mass everywhere.
Eyes: Two large vertical ellipses sit symmetrically in the upper body, slightly bigger relative to the body than in Classic. They are filled with the background color, reading as cut-outs. No mouth, no brows — eyes only. The oversized eyes reinforce the soft, cartoonish proportions.
Style: Flat and fully filled. One solid color for the body. Optional thin stroke. No gradients, no shading, no textures, no drop shadows. The roundness does all the expressive work — no detail needed.
Color: Ghost body is one solid color. Background is a flat contrasting color. Two colors total maximum.
Rendering: Centered on a square canvas with even padding. Should feel friendly and approachable — like a children's sticker or a plush toy rendered flat.
No extras: No labels, no frames, no glow. Silhouette and background only.
Adaptation rule: Aim to maintain the same structural logic without jeopardizing the natural shape — wide rounded dome, inflated sides, soft lobed bottom edge, two large elliptical eye cut-outs — but apply it to the target subject. Every corner, edge and terminus should be maximally rounded. When in doubt, make it rounder.

Generate a single Chubby Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 230" fill="none"><path d="M100 18 C48 18 25 60 25 100 L25 192 Q25 200 33 196 L48 188 Q56 183 64 188 L80 197 Q88 202 96 197 L104 192 Q112 187 120 192 L136 201 Q144 206 152 201 L167 192 Q175 187 175 192 L175 100 C175 60 152 18 100 18Z" fill="#FFFFFF" stroke="#000000" stroke-width="2" /><ellipse cx="80" cy="100" rx="16" ry="19" fill="#000000" /><ellipse cx="120" cy="100" rx="16" ry="19" fill="#000000" /></svg>`,
    ],
  },
  {
    name: "Outline",
    shortDescription: "Clean line art ghost icon",
    systemPrompt: `Generate a single icon in a strict Outline Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 220" fill="none">
  <path d="M100 22 C56 22 32 58 32 97 L32 183 L52 163 L72 183 L92 163 L112 183 L132 163 L152 183 L168 163 L168 97 C168 58 144 22 100 22Z" fill="none" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" />
  <ellipse cx="80" cy="96" rx="13" ry="16" fill="#ffffff" />
  <ellipse cx="120" cy="96" rx="13" ry="16" fill="#ffffff" />
  <ellipse cx="78" cy="93" rx="4" ry="5" fill="#000000" />
  <ellipse cx="118" cy="93" rx="4" ry="5" fill="#000000" />
</svg>

Construction: The icon is drawn entirely as a thick stroked outline — no filled body whatsoever. The ghost silhouette (dome top, straight sides, scalloped bottom) exists only as a continuous stroke path. The inside of the shape is fully transparent, revealing the background. The stroke has rounded joins and rounded caps everywhere, giving it a clean, friendly line-art quality. Stroke weight should be bold enough to read clearly at small sizes — never hairline thin.
Eyes: The eyes are the one exception to the outline-only rule. Each eye is a solid filled ellipse in the stroke color, with a smaller ellipse cut into it (filled with the background color) to create a highlight or pupil. This makes the eyes pop as the only filled elements in the composition, creating a natural focal point against the transparent body.
Style: Line art only. One stroke color throughout. The interior of all shapes is empty. No filled regions except the eyes. No gradients, no shading, no textures, no drop shadows. Crisp and graphic.
Color: One stroke color (white, black, or a single accent). Background is flat and contrasting. The stroke color is reused for the eye fills. Two colors total maximum.
Rendering: Centered on a square canvas with even padding. Should feel at home in an icon font, a wireframe UI kit, or as a badge outline. Legible at small sizes.
No extras: No labels, no frames, no glow. Outline stroke and background only.
Adaptation rule: Keep the same structural logic — the entire subject is rendered as a continuous thick outline stroke with rounded caps and joins, interior fully transparent, with any key focal detail (equivalent to the eyes) rendered as small solid filled shapes for contrast.

Generate a single Outline Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 220" fill="none"><path d="M100 22 C56 22 32 58 32 97 L32 183 L52 163 L72 183 L92 163 L112 183 L132 163 L152 183 L168 163 L168 97 C168 58 144 22 100 22Z" fill="none" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" /><ellipse cx="80" cy="96" rx="13" ry="16" fill="#ffffff" /><ellipse cx="120" cy="96" rx="13" ry="16" fill="#ffffff" /><ellipse cx="78" cy="93" rx="4" ry="5" fill="#000000" /><ellipse cx="118" cy="93" rx="4" ry="5" fill="#000000" /></svg>`,
    ],
  },
  {
    name: "Dot",
    shortDescription: "Halftone dot matrix ghost icon",
    systemPrompt: `Generate clean SVG code for a ghost icon using a halftone dot matrix style. Follow every rule below exactly and do not deviate:

Reference example SVG (dot positions on a 14x16 grid, R=5.2, G=13):
<svg viewBox="0 0 182 208" fill="none">
  <g>
    <circle cx="58.5" cy="6.5" r="5.2" fill="#ffffff" />
    <circle cx="71.5" cy="6.5" r="5.2" fill="#ffffff" />
    <circle cx="84.5" cy="6.5" r="5.2" fill="#ffffff" />
    <circle cx="97.5" cy="6.5" r="5.2" fill="#ffffff" />
    <circle cx="110.5" cy="6.5" r="5.2" fill="#ffffff" />
    <circle cx="123.5" cy="6.5" r="5.2" fill="#ffffff" />
    <!-- ... remaining body dots following the 14x16 grid mask ... -->
  </g>
  <!-- Eye dots override with bg color -->
  <circle cx="45.5" cy="84.5" r="5.2" fill="#000000" />
  <circle cx="58.5" cy="84.5" r="5.2" fill="#000000" />
  <circle cx="123.5" cy="84.5" r="5.2" fill="#000000" />
  <circle cx="136.5" cy="84.5" r="5.2" fill="#000000" />
</svg>

Canvas: viewBox="0 0 200 220" with fill="none". No background rectangle.
Grid system: All dots sit on a strict 13px grid — meaning every dot's cx and cy must follow the pattern offset + (col * 13) where the grid is centered on the canvas. Use offsetX = (200 - COLS * 13) / 2 and offsetY = (220 - ROWS * 13) / 2 to center the grid.
Dots: Each dot is a <circle> with r="5.2". Dots should not overlap — at 13px spacing with r=5.2 there is a 2.6px gap between each dot. All body dots share one flat fill color. No gradients, no strokes, no outlines on any dot.
Grid dimensions: Design your shape on a 14-column x 16-row grid (COLS=14, ROWS=16). This gives you a 182x208px active area centered inside the 200x220 canvas.
Shape construction: Think of the grid as a stencil. For each of the 16 rows, decide which of the 14 column positions fall inside the icon silhouette.
Internal details: Eyes, cutouts, or key interior features are represented by overriding specific grid positions with the background color. Never remove dots for interior details — always replace their color.
Code structure: Group all primary body dots inside a single <g> element. Place eye/detail override circles outside the group after it.

Generate a single Dot Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 182 208" fill="none"><circle cx="58.5" cy="6.5" r="5.2" fill="#ffffff"/><circle cx="71.5" cy="6.5" r="5.2" fill="#ffffff"/><circle cx="84.5" cy="6.5" r="5.2" fill="#ffffff"/><circle cx="97.5" cy="6.5" r="5.2" fill="#ffffff"/><circle cx="110.5" cy="6.5" r="5.2" fill="#ffffff"/><circle cx="123.5" cy="6.5" r="5.2" fill="#ffffff"/></svg>`,
    ],
  },
  {
    name: "Pixel",
    shortDescription: "8-bit retro pixel ghost icon",
    systemPrompt: `Generate a single icon in a strict Pixel Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 180 216" fill="none" shapeRendering="crispEdges">
  <rect x="36" y="0" width="18" height="18" fill="#ffffff"/>
  <rect x="54" y="0" width="18" height="18" fill="#ffffff"/>
  <rect x="72" y="0" width="18" height="18" fill="#ffffff"/>
  <rect x="90" y="0" width="18" height="18" fill="#ffffff"/>
  <rect x="108" y="0" width="18" height="18" fill="#ffffff"/>
  <rect x="126" y="0" width="18" height="18" fill="#ffffff"/>
  <!-- ... remaining grid rows ... -->
  <rect x="54" y="54" width="18" height="18" fill="#000000"/>
  <rect x="72" y="54" width="18" height="18" fill="#000000"/>
  <rect x="108" y="54" width="18" height="18" fill="#000000"/>
  <rect x="126" y="54" width="18" height="18" fill="#000000"/>
</svg>

Construction: The entire icon is built from a strict uniform grid of equal-sized filled squares — like an 8-bit sprite or a pixel art game asset. Every square is identical in size. Every square is perfectly aligned to the grid. The icon shape is formed entirely by which squares are filled and which are empty — no curves, no diagonals, no anti-aliasing. Edges are always perfectly horizontal or vertical. The shapeRendering="crispEdges" rule is mandatory — no smoothing of any kind.
Grid logic: The grid should be coarse enough to feel retro and deliberate — approximately 10x12 to 14x16 cells for the icon area. Not so fine that it loses the pixelated character, not so coarse that the subject becomes unrecognizable. The subject silhouette is approximated in this grid, stairstepping where curves would otherwise be.
Eyes / details: Key internal details (eyes, symbols, cutouts) are represented by squares filled with the background color, punched into the body of the icon. No sub-pixel detail — every detail must occupy at least a 2x2 block of cells to be legible.
Style: Flat, hard-edged, zero smoothing. Each square is a single solid color. No gradients, no strokes on individual squares, no drop shadows, no textures. The aesthetic is NES sprite, Game Boy icon, or vintage LED matrix display.
Color: Icon squares are one solid color. Background squares are empty (background color shows through). Two colors total maximum.
Rendering: Centered on a square canvas with even padding. shapeRendering="crispEdges" must be set on the SVG element. Should feel like it belongs in a retro game, a chiptune album cover, or an 8-bit UI.
No extras: No labels, no frames, no glow, no anti-aliased edges. Pixel grid and background only.
Adaptation rule: Reduce the target subject to its most essential silhouette, then approximate that silhouette on the pixel grid using only filled and empty squares. Embrace the stairstepping — it is the style, not a flaw. Internal details should be suggested with 2x2 or larger blocks of background-colored cells.

Generate a single Pixel Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 180 216" fill="none" shapeRendering="crispEdges"><rect x="36" y="0" width="18" height="18" fill="#ffffff"/><rect x="54" y="0" width="18" height="18" fill="#ffffff"/><rect x="72" y="0" width="18" height="18" fill="#ffffff"/><rect x="90" y="0" width="18" height="18" fill="#ffffff"/><rect x="108" y="0" width="18" height="18" fill="#ffffff"/><rect x="126" y="0" width="18" height="18" fill="#ffffff"/><rect x="18" y="18" width="18" height="18" fill="#ffffff"/><rect x="36" y="18" width="18" height="18" fill="#ffffff"/><rect x="54" y="18" width="18" height="18" fill="#ffffff"/><rect x="72" y="18" width="18" height="18" fill="#ffffff"/><rect x="90" y="18" width="18" height="18" fill="#ffffff"/><rect x="108" y="18" width="18" height="18" fill="#ffffff"/><rect x="126" y="18" width="18" height="18" fill="#ffffff"/><rect x="144" y="18" width="18" height="18" fill="#ffffff"/><rect x="0" y="36" width="18" height="18" fill="#ffffff"/><rect x="18" y="36" width="18" height="18" fill="#ffffff"/><rect x="36" y="36" width="18" height="18" fill="#ffffff"/><rect x="54" y="36" width="18" height="18" fill="#ffffff"/><rect x="72" y="36" width="18" height="18" fill="#ffffff"/><rect x="90" y="36" width="18" height="18" fill="#ffffff"/><rect x="108" y="36" width="18" height="18" fill="#ffffff"/><rect x="126" y="36" width="18" height="18" fill="#ffffff"/><rect x="144" y="36" width="18" height="18" fill="#ffffff"/><rect x="162" y="36" width="18" height="18" fill="#ffffff"/><rect x="0" y="54" width="18" height="18" fill="#ffffff"/><rect x="18" y="54" width="18" height="18" fill="#ffffff"/><rect x="72" y="54" width="18" height="18" fill="#ffffff"/><rect x="90" y="54" width="18" height="18" fill="#ffffff"/><rect x="144" y="54" width="18" height="18" fill="#ffffff"/><rect x="162" y="54" width="18" height="18" fill="#ffffff"/><rect x="36" y="54" width="18" height="18" fill="#000000"/><rect x="54" y="54" width="18" height="18" fill="#000000"/><rect x="108" y="54" width="18" height="18" fill="#000000"/><rect x="126" y="54" width="18" height="18" fill="#000000"/><rect x="0" y="72" width="18" height="18" fill="#ffffff"/><rect x="18" y="72" width="18" height="18" fill="#ffffff"/><rect x="72" y="72" width="18" height="18" fill="#ffffff"/><rect x="90" y="72" width="18" height="18" fill="#ffffff"/><rect x="144" y="72" width="18" height="18" fill="#ffffff"/><rect x="162" y="72" width="18" height="18" fill="#ffffff"/><rect x="36" y="72" width="18" height="18" fill="#000000"/><rect x="54" y="72" width="18" height="18" fill="#000000"/><rect x="108" y="72" width="18" height="18" fill="#000000"/><rect x="126" y="72" width="18" height="18" fill="#000000"/><rect x="0" y="90" width="18" height="18" fill="#ffffff"/><rect x="18" y="90" width="18" height="18" fill="#ffffff"/><rect x="36" y="90" width="18" height="18" fill="#ffffff"/><rect x="54" y="90" width="18" height="18" fill="#ffffff"/><rect x="72" y="90" width="18" height="18" fill="#ffffff"/><rect x="90" y="90" width="18" height="18" fill="#ffffff"/><rect x="108" y="90" width="18" height="18" fill="#ffffff"/><rect x="126" y="90" width="18" height="18" fill="#ffffff"/><rect x="144" y="90" width="18" height="18" fill="#ffffff"/><rect x="162" y="90" width="18" height="18" fill="#ffffff"/><rect x="0" y="108" width="18" height="18" fill="#ffffff"/><rect x="18" y="108" width="18" height="18" fill="#ffffff"/><rect x="36" y="108" width="18" height="18" fill="#ffffff"/><rect x="54" y="108" width="18" height="18" fill="#ffffff"/><rect x="72" y="108" width="18" height="18" fill="#ffffff"/><rect x="90" y="108" width="18" height="18" fill="#ffffff"/><rect x="108" y="108" width="18" height="18" fill="#ffffff"/><rect x="126" y="108" width="18" height="18" fill="#ffffff"/><rect x="144" y="108" width="18" height="18" fill="#ffffff"/><rect x="162" y="108" width="18" height="18" fill="#ffffff"/><rect x="0" y="126" width="18" height="18" fill="#ffffff"/><rect x="18" y="126" width="18" height="18" fill="#ffffff"/><rect x="54" y="126" width="18" height="18" fill="#ffffff"/><rect x="72" y="126" width="18" height="18" fill="#ffffff"/><rect x="90" y="126" width="18" height="18" fill="#ffffff"/><rect x="108" y="126" width="18" height="18" fill="#ffffff"/><rect x="144" y="126" width="18" height="18" fill="#ffffff"/><rect x="162" y="126" width="18" height="18" fill="#ffffff"/><rect x="0" y="144" width="18" height="18" fill="#ffffff"/><rect x="54" y="144" width="18" height="18" fill="#ffffff"/><rect x="72" y="144" width="18" height="18" fill="#ffffff"/><rect x="90" y="144" width="18" height="18" fill="#ffffff"/><rect x="108" y="144" width="18" height="18" fill="#ffffff"/><rect x="162" y="144" width="18" height="18" fill="#ffffff"/><rect x="0" y="162" width="18" height="18" fill="#ffffff"/><rect x="18" y="162" width="18" height="18" fill="#ffffff"/><rect x="36" y="162" width="18" height="18" fill="#ffffff"/><rect x="54" y="162" width="18" height="18" fill="#ffffff"/><rect x="72" y="162" width="18" height="18" fill="#ffffff"/><rect x="90" y="162" width="18" height="18" fill="#ffffff"/><rect x="108" y="162" width="18" height="18" fill="#ffffff"/><rect x="126" y="162" width="18" height="18" fill="#ffffff"/><rect x="144" y="162" width="18" height="18" fill="#ffffff"/><rect x="162" y="162" width="18" height="18" fill="#ffffff"/><rect x="0" y="180" width="18" height="18" fill="#ffffff"/><rect x="36" y="180" width="18" height="18" fill="#ffffff"/><rect x="54" y="180" width="18" height="18" fill="#ffffff"/><rect x="108" y="180" width="18" height="18" fill="#ffffff"/><rect x="126" y="180" width="18" height="18" fill="#ffffff"/><rect x="162" y="180" width="18" height="18" fill="#ffffff"/><rect x="36" y="198" width="18" height="18" fill="#ffffff"/><rect x="54" y="198" width="18" height="18" fill="#ffffff"/><rect x="108" y="198" width="18" height="18" fill="#ffffff"/><rect x="126" y="198" width="18" height="18" fill="#ffffff"/></svg>`,
    ],
  },
  {
    name: "Sharp",
    shortDescription: "Angular, geometric ghost icon",
    systemPrompt: `Generate a single icon in a strict Sharp Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 220" fill="none">
  <path d="M100 20 L40 65 L35 185 L55 160 L75 185 L100 160 L125 185 L145 160 L165 185 L165 65 Z" fill="#ffffff" stroke="#000000" stroke-width="2" stroke-linejoin="miter" />
  <polygon points="75,80 88,115 62,115" fill="#000000" />
  <polygon points="125,80 138,115 112,115" fill="#000000" />
</svg>

Construction: The entire icon is built from straight lines and hard angles only — no curves, no rounded joins, no bezier paths whatsoever. The silhouette is a geometric, faceted approximation of the subject. Where Classic uses a smooth dome, Sharp uses a pointed apex. Where Classic uses curved sides, Sharp uses straight angled edges meeting at defined vertices. The bottom edge ends in sharp pointed V-notches, not rounded scallops. Every joint is a hard miter. The overall feel is crystalline, angular, and architectural.
Eyes / details: Internal details are rendered as triangles or sharp polygons — never circles or ellipses. The ghost uses downward-pointing triangles for eyes. Whatever the subject, its key internal details should be reduced to the sharpest, most geometric polygon that still communicates the idea.
Style: Flat and fully filled. Hard miter joins everywhere — stroke-linejoin="miter" is mandatory. No rounded caps, no soft edges, no gradients, no shading, no textures, no drop shadows. The aesthetic is geometric abstraction, angular logo design, or low-poly illustration.
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
    shortDescription: "Melting, dripping ghost icon",
    systemPrompt: `Generate a single icon in a strict Drip Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 240" fill="none">
  <path d="M100 18 C55 18 28 58 28 98 L28 170 Q30 180 38 178 Q46 175 48 185 Q50 195 58 193 Q66 190 68 200 Q70 210 78 207 L90 200 Q98 196 106 200 L118 207 Q126 210 128 200 Q130 190 138 193 Q146 195 148 185 Q150 175 158 178 Q166 180 168 170 L172 98 C172 58 145 18 100 18Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
  <ellipse cx="82" cy="97" rx="14" ry="17" fill="#000000" />
  <ellipse cx="118" cy="97" rx="14" ry="17" fill="#000000" />
</svg>

Construction: The icon is a single filled silhouette that appears to be slowly melting or dripping downward. The top and sides follow the general shape of the subject, but the bottom edge dissolves into a series of irregular drips and runs — elongated teardrop-like protrusions of varying lengths that hang downward unevenly. The drips are organic and asymmetric: some long and thin, some short and fat, some barely started. The key is that they feel like liquid caught mid-fall — gravity is visibly at work. The bottom of the shape never has a clean edge.
Drip anatomy: Each drip begins as a widening at the base of the body, then narrows as it extends downward, ending in a rounded teardrop tip. Drips vary in length and width. They are connected to the main body with smooth curves using quadratic bezier joints — no hard angles where drips meet the body. Adjacent drips are separated by shallow upward curves, like the space between hanging icicles.
Eyes / details: Standard elliptical eye cut-outs, filled with the background color, sitting in the upper portion of the body well above the drip zone. The dripping happens below the main mass — the upper body remains relatively clean and recognizable.
Style: Flat and fully filled. One solid color for the entire shape including the drips. Optional thin stroke. No gradients, no shading, no textures, no drop shadows. The silhouette alone communicates the melting — no rendering tricks needed.
Color: Icon body and drips are one solid color. Background is flat and contrasting. Two colors total maximum.
Rendering: The canvas should be taller than wide to accommodate the drips extending downward. Centered with even padding. Should feel at home in a horror-adjacent UI, a street art context, or a playful Halloween aesthetic.
No extras: No labels, no frames, no glow, no puddle at the bottom. Dripping silhouette and background only.
Adaptation rule: Take the target subject, render its recognizable upper silhouette cleanly, then let the bottom third dissolve into 4-7 drips of varying lengths. The subject should still be identifiable from its top and sides alone — the drips are an addition, not a replacement.

Generate a single Drip Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 240" fill="none"><path d="M100 18 C55 18 28 58 28 98 L28 170 Q30 180 38 178 Q46 175 48 185 Q50 195 58 193 Q66 190 68 200 Q70 210 78 207 L90 200 Q98 196 106 200 L118 207 Q126 210 128 200 Q130 190 138 193 Q146 195 148 185 Q150 175 158 178 Q166 180 168 170 L172 98 C172 58 145 18 100 18Z" fill="#ffffff" stroke="#000000" stroke-width="2" /><ellipse cx="82" cy="97" rx="14" ry="17" fill="#000000" /><ellipse cx="118" cy="97" rx="14" ry="17" fill="#000000" /></svg>`,
    ],
  },
  {
    name: "Minimal",
    shortDescription: "Ultra simplified ghost icon",
    systemPrompt: `Generate a single icon in a strict Minimal Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 210" fill="none">
  <path d="M100 30 C62 30 42 62 42 92 L42 175 Q57 155 72 175 Q87 155 100 175 Q113 155 128 175 Q143 155 158 175 L158 92 C158 62 138 30 100 30Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
  <circle cx="82" cy="90" r="11" fill="#000000" />
  <circle cx="118" cy="90" r="11" fill="#000000" />
</svg>

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
  {
    name: "Haunted",
    shortDescription: "Expressive ghost with face",
    systemPrompt: `Generate a single icon in a strict Haunted Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 230" fill="none">
  <path d="M100 15 C50 15 25 58 25 100 L25 190 L45 168 L65 190 L85 168 L100 182 L115 168 L135 190 L155 168 L175 190 L175 100 C175 58 150 15 100 15Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
  <line x1="62" y1="78" x2="88" y2="88" stroke="#000000" stroke-width="5" stroke-linecap="round" />
  <line x1="138" y1="78" x2="112" y2="88" stroke="#000000" stroke-width="5" stroke-linecap="round" />
  <ellipse cx="80" cy="100" rx="13" ry="16" fill="#000000" />
  <ellipse cx="120" cy="100" rx="13" ry="16" fill="#000000" />
  <path d="M78 130 Q90 145 100 138 Q110 145 122 130" stroke="#000000" stroke-width="4" stroke-linecap="round" fill="none" />
</svg>

Construction: The icon follows the same general silhouette as Classic — dome top, straight sides, scalloped bottom — but the body is slightly taller and wider, with more presence and weight. The shape feels imposing rather than friendly. The bottom scallops are more jagged and uneven than Classic, slightly irregular, as if the ghost is agitated.
Expression: This is the only style in the set that has a full facial expression. Three elements work together to create it: angled brow lines slashing inward above each eye (conveying menace or anguish), solid filled elliptical eyes (wide and alarmed), and a curved mouth stroke below the eyes — either a grimace, a scowl, or a wide open scream depending on the subject. All three expression elements are mandatory. The brows are thick stroked lines, not filled shapes. The mouth is an open curved stroke, not a filled shape.
Eyes: Solid filled ellipses, slightly larger than Classic, sitting center-mass in the upper body. Filled with the body stroke/detail color. The brow lines sit above and diagonal to each eye, angled sharply inward toward the center — left brow runs down-right, right brow runs down-left, creating a furrowed angry or terrified look.
Style: Flat and fully filled body. Bold expressive strokes for the face details. Rounded stroke caps throughout. No gradients, no shading, no textures, no drop shadows. The expression is everything — the face should read clearly even at small sizes.
Color: Icon body is one solid color. Background is flat and contrasting. Face details (brows, mouth) are stroked in the background color. Two colors total maximum.
Rendering: Centered on a square canvas with even padding. Should feel at home in a Halloween context, a horror game UI, or anywhere that needs a ghost with genuine personality and menace.
No extras: No labels, no frames, no glow, no additional decorative elements. Silhouette, eyes, brows, mouth and background only.
Adaptation rule: Take the target subject, render its silhouette in the Classic style, then layer on the three expression elements but their face should have a clear emotional expression, lean towards a positive and playful yet coy expression. They are kids misbehaving and inciting you. Lean into the emotion.

Generate a single Haunted Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 230" fill="none"><path d="M100 15 C50 15 25 58 25 100 L25 190 L45 168 L65 190 L85 168 L100 182 L115 168 L135 190 L155 168 L175 190 L175 100 C175 58 150 15 100 15Z" fill="#ffffff" stroke="#000000" stroke-width="2" /><line x1="62" y1="78" x2="88" y2="88" stroke="#000000" stroke-width="5" stroke-linecap="round" /><line x1="138" y1="78" x2="112" y2="88" stroke="#000000" stroke-width="5" stroke-linecap="round" /><ellipse cx="80" cy="100" rx="13" ry="16" fill="#000000" /><ellipse cx="120" cy="100" rx="13" ry="16" fill="#000000" /><path d="M78 130 Q90 145 100 138 Q110 145 122 130" stroke="#000000" stroke-width="4" stroke-linecap="round" fill="none" /></svg>`,
    ],
  },
  {
    name: "Pencil",
    shortDescription: "Single continuous line drawing ghost",
    systemPrompt: `Generate a single icon in a strict Pencil Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 220" fill="none">
  <path d="M100 22 C100 22 138 24 158 52 C174 74 172 100 172 118 L172 175 C172 178 168 176 165 172 C160 165 156 160 152 168 C148 176 145 180 140 174 C135 168 130 163 125 170 C120 177 115 180 110 175 C105 170 100 167 95 172 C90 177 86 178 82 173 C78 168 73 163 68 170 C63 177 58 176 56 172 C53 168 50 165 48 168 C44 171 40 176 36 172 L28 165 L28 118 C28 100 28 74 44 52 C60 28 100 22 100 22Z" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="80" cy="95" r="14" fill="none" stroke="#ffffff" stroke-width="1.8" />
  <circle cx="120" cy="95" r="14" fill="none" stroke="#ffffff" stroke-width="1.8" />
  <circle cx="80" cy="95" r="8" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5" />
  <circle cx="120" cy="95" r="8" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5" />
  <path d="M28 168 C24 172 20 178 24 183 C28 188 34 184 32 178" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" />
</svg>

Construction: The entire icon is drawn as a single continuous outline stroke — as if sketched in one unbroken motion by a pencil or fine pen, never lifting from the page. The path winds around the full silhouette of the subject and loops back to where it started. The stroke is thin and consistent throughout, with a slightly hand-drawn, imperfect quality. No filled areas anywhere in the composition. The line does all the work.
The continuous line rule: The main silhouette must read as one unbroken path. Where the line needs to suggest interior details — like eyes — it loops into a circular detour and continues, rather than lifting and starting a new path. The result feels like a blind contour drawing or a one-line illustration. Secondary strokes are permitted only for essential interior details that cannot be incorporated into the main path.
Eyes / details: Eyes are drawn as outlined circles — one outer circle at full opacity, one inner concentric circle at reduced opacity (around 50%), suggesting depth and a sketch-like observation of form. No fills. The inner circle is the only place where opacity varies. All other strokes are full opacity.
Stroke character: Thin, consistent weight throughout — approximately 1.5 to 2px at the icon's native scale. Rounded caps and joins everywhere. Slightly imperfect path closure is acceptable and even desirable — it reinforces the hand-drawn feel. Never mechanically perfect.
Style: Line art only, zero fills, zero solid shapes. No gradients, no shading, no textures, no drop shadows. The entire aesthetic lives in the single wandering line. Think technical illustration, architectural sketch, or artist's quick study.
Color: One stroke color only. Background is flat and contrasting. Two colors total maximum. The stroke color should feel like chalk on a blackboard, ink on paper, or pencil on cartridge.
Rendering: Centered on a square canvas with even padding. Should feel at home in an editorial illustration, a notebook doodle elevated to icon status, or a sketchbook-aesthetic UI.
No extras: No labels, no frames, no glow, no filled regions. One continuous line and background only.
Adaptation rule: Take the target subject and trace its silhouette as a single unbroken path. Where the path needs to describe an interior detail, route it inward, loop around the detail, and continue outward. Concentric inner circles at reduced opacity can be added for key circular details. The fewer the total paths, the better — ideally the entire icon is one or two strokes maximum.

Generate a single Pencil Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 220" fill="none"><path d="M100 22 C100 22 138 24 158 52 C174 74 172 100 172 118 L172 175 C172 178 168 176 165 172 C160 165 156 160 152 168 C148 176 145 180 140 174 C135 168 130 163 125 170 C120 177 115 180 110 175 C105 170 100 167 95 172 C90 177 86 178 82 173 C78 168 73 163 68 170 C63 177 58 176 56 172 C53 168 50 165 48 168 C44 171 40 176 36 172 L28 165 L28 118 C28 100 28 74 44 52 C60 28 100 22 100 22Z" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /><circle cx="80" cy="95" r="14" fill="none" stroke="#ffffff" stroke-width="1.8" /><circle cx="120" cy="95" r="14" fill="none" stroke="#ffffff" stroke-width="1.8" /><circle cx="80" cy="95" r="8" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5" /><circle cx="120" cy="95" r="8" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5" /><path d="M28 168 C24 172 20 178 24 183 C28 188 34 184 32 178" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" /></svg>`,
    ],
  },
  {
    name: "Wiggly",
    shortDescription: "Wobbly cartoon ghost icon",
    systemPrompt: `Generate a single icon in a strict Wiggly Ghost style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Reference example SVG:
<svg viewBox="0 0 200 230" fill="none">
  <path d="M100 22 C58 22 30 60 30 100 C30 110 32 120 30 130 C28 140 32 150 30 160 C28 170 36 175 44 168 C52 161 56 172 64 178 C72 184 80 174 88 178 C96 182 104 180 112 176 C120 172 128 182 136 176 C144 170 150 160 158 168 C166 176 172 170 170 160 C168 150 172 140 170 130 C168 120 170 110 170 100 C170 60 142 22 100 22Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
  <ellipse cx="80" cy="97" rx="13" ry="15" fill="#000000" />
  <ellipse cx="120" cy="97" rx="13" ry="15" fill="#000000" />
</svg>

Construction: The icon is a single filled silhouette where no edge is perfectly straight or smoothly curved — every contour wobbles, undulates, and breathes. The top dome is slightly lopsided. The sides ripple in and out rather than dropping cleanly. The bottom edge is a series of irregular wave-like bumps that alternate between shallow and deep, giving the impression the shape is trembling or caught mid-wobble. The overall silhouette is immediately recognizable but feels alive and slightly unstable, like jelly or a cartoon character mid-bounce.
The wobble rule: Every edge of the silhouette should have at least one unexpected deviation from the ideal smooth path — a subtle inward pinch, an outward bulge, a slightly uneven rhythm in the bottom bumps. The wobbles should feel organic and lively, not random or chaotic. Think of a friendly cartoon character drawn with confident but loose brushwork — the imperfection is intentional and controlled.
Sides: Unlike Classic where the sides drop straight, here the sides breathe — gently pinching inward at the waist and then flaring slightly before meeting the bottom bumps. This gives the shape a sense of motion even when static, as if it just landed or is about to bounce.
Eyes: Standard vertical ellipses, symmetrically placed in the upper body, filled with the background color as cut-outs. Slightly uneven sizing or placement is acceptable and encouraged — one eye can be fractionally larger or higher than the other, reinforcing the wobbly character.
Style: Flat and fully filled. One solid color for the body. Optional thin stroke. No gradients, no shading, no textures, no drop shadows. The energy comes entirely from the silhouette contour — not from surface detail.
Color: Icon body is one solid color. Background is flat and contrasting. Two colors total maximum.
Rendering: Centered on a square canvas with even padding. Should feel at home in a cartoon UI, a children's app, a playful brand identity, or a sticker pack. The icon should look like it has a personality.
No extras: No labels, no frames, no glow, no motion lines. Wobbly silhouette and background only.
Adaptation rule: Take the target subject and render its general silhouette, then introduce deliberate, controlled wobble to every edge. Straighten nothing. Perfect nothing. Every contour should feel like it was drawn quickly with a brush by someone who knew exactly what they were doing but didn't want it to look like they did.

Generate a single Wiggly Ghost style icon for: [replace with your subject — e.g. a house, a shield, a cloud, a bell, a key, etc.]`,
    svgExamples: [
      `<svg viewBox="0 0 200 230" fill="none"><path d="M100 22 C58 22 30 60 30 100 C30 110 32 120 30 130 C28 140 32 150 30 160 C28 170 36 175 44 168 C52 161 56 172 64 178 C72 184 80 174 88 178 C96 182 104 180 112 176 C120 172 128 182 136 176 C144 170 150 160 158 168 C166 176 172 170 170 160 C168 150 172 140 170 130 C168 120 170 110 170 100 C170 60 142 22 100 22Z" fill="#ffffff" stroke="#000000" stroke-width="2" /><ellipse cx="80" cy="97" rx="13" ry="15" fill="#000000" /><ellipse cx="120" cy="97" rx="13" ry="15" fill="#000000" /></svg>`,
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

  console.log(`Seeding all ${STYLES.length} ghost styles...`);
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
