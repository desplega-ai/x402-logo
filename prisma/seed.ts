import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const STYLES = [
  {
    name: "Pixel Icons",
    shortDescription:
      "Chunky, retro pixel-art icons with vivid diagonal gradients on a black canvas.",
    systemPrompt: `Generate a {insert shape / object name} vector icons displayed on a solid black background. Each icon should be designed with the following rules:

Shape: Bold, chunky, and fully filled solid shapes with heavily rounded corners and smooth curves. No thin lines or fine details. All internal details are created using negative space cutouts, not strokes or outlines.
Color: Each icon has its own unique vivid diagonal gradient using 2–3 color stops. Use a wide range of saturated color combinations across the set — for example yellow-to-green, pink-to-purple, cyan-to-teal, orange-to-red, blue-to-violet. The gradients should flow from one corner of the icon to the opposite corner.
Style: Strictly flat design. No drop shadows, no glows, no borders, no outlines, no strokes of any kind. Only gradient-filled solid paths.
Background: Solid black. No cards, panels, or containers behind the icons.
Size & legibility: Each icon must be clearly recognizable at small sizes. Keep shapes simple and avoid unnecessary complexity.
Cohesion: All icons share the same visual weight, corner radius, and canvas size so they feel like a unified icon family.
Please generate icons for the following: [replace with your list — e.g. microphone, folder, brain, globe, settings gear, chat bubble, camera, lock, heart, search]`,
    svgExamples: [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" fill="#EBEBEB"/><rect x="50" y="70" width="10" height="10" fill="#000000"/> <rect x="60" y="70" width="10" height="10" fill="#000000"/> <rect x="70" y="70" width="10" height="10" fill="#000000"/> <rect x="80" y="70" width="10" height="10" fill="#000000"/> <rect x="90" y="70" width="10" height="10" fill="#000000"/> <rect x="40" y="80" width="10" height="10" fill="#000000"/> <rect x="50" y="80" width="10" height="10" fill="#000000"/> <rect x="60" y="80" width="10" height="10" fill="#000000"/> <rect x="70" y="80" width="10" height="10" fill="#000000"/> <rect x="80" y="80" width="10" height="10" fill="#000000"/> <rect x="90" y="80" width="10" height="10" fill="#000000"/> <rect x="100" y="80" width="10" height="10" fill="#000000"/> <rect x="40" y="90" width="10" height="10" fill="#000000"/> <rect x="50" y="90" width="10" height="10" fill="#000000"/> <rect x="60" y="90" width="10" height="10" fill="#000000"/> <rect x="70" y="90" width="10" height="10" fill="#000000"/> <rect x="80" y="90" width="10" height="10" fill="#000000"/> <rect x="90" y="90" width="10" height="10" fill="#000000"/> <rect x="100" y="90" width="10" height="10" fill="#000000"/> <rect x="40" y="100" width="10" height="10" fill="#000000"/> <rect x="50" y="100" width="10" height="10" fill="#000000"/> <rect x="60" y="100" width="10" height="10" fill="#000000"/> <rect x="70" y="100" width="10" height="10" fill="#000000"/> <rect x="80" y="100" width="10" height="10" fill="#000000"/> <rect x="90" y="100" width="10" height="10" fill="#000000"/> <rect x="100" y="100" width="10" height="10" fill="#000000"/> <rect x="50" y="110" width="10" height="10" fill="#000000"/> <rect x="60" y="110" width="10" height="10" fill="#000000"/> <rect x="70" y="110" width="10" height="10" fill="#000000"/> <rect x="80" y="110" width="10" height="10" fill="#000000"/> <rect x="90" y="110" width="10" height="10" fill="#000000"/> <rect x="100" y="80" width="10" height="10" fill="#000000"/> <rect x="110" y="80" width="10" height="10" fill="#000000"/> <rect x="120" y="90" width="10" height="10" fill="#000000"/> <rect x="120" y="100" width="10" height="10" fill="#000000"/> <rect x="110" y="110" width="10" height="10" fill="#000000"/> <rect x="100" y="110" width="10" height="10" fill="#000000"/> <rect x="60" y="30" width="10" height="10" fill="#000000"/> <rect x="60" y="40" width="10" height="10" fill="#000000"/> <rect x="70" y="20" width="10" height="10" fill="#000000"/> <rect x="70" y="30" width="10" height="10" fill="#000000"/> <rect x="80" y="30" width="10" height="10" fill="#000000"/> <rect x="80" y="40" width="10" height="10" fill="#000000"/> </svg>`,
    ],
  },
  {
    name: "Neon Solid",
    shortDescription:
      "Bold gradient-filled icons with negative-space details on solid black.",
    systemPrompt: `Generate a set of {enter list here, e.g. shape, objet etc} flat vector icons displayed on a solid black background. Each icon should be designed with the following rules:
Shape: Bold, chunky, and fully filled solid shapes with heavily rounded corners and smooth curves. No thin lines or fine details. All internal details are created using negative space cutouts, not strokes or outlines.
Color: Each icon has its own unique vivid diagonal gradient using 2–3 color stops. Use a wide range of saturated color combinations across the set — for example yellow-to-green, pink-to-purple, cyan-to-teal, orange-to-red, blue-to-violet. The gradients should flow from one corner of the icon to the opposite corner.
Style: Strictly flat design. No drop shadows, no glows, no borders, no outlines, no strokes of any kind. Only gradient-filled solid paths.
Background: Solid black. No cards, panels, or containers behind the icons.
Size & legibility: Each icon must be clearly recognizable at small sizes. Keep shapes simple and avoid unnecessary complexity.
Cohesion: All icons share the same visual weight, corner radius, and canvas size so they feel like a unified icon family.`,
    svgExamples: [],
  },
  {
    name: "Minimalist Two-Tone",
    shortDescription:
      "Bold circles with graphic cutout symbols in a single saturated color on black.",
    systemPrompt: `Generate a {insert name of object} SVG vector icon in a bold, graphic, two-tone style with the following specifications:

Structure: Each icon consists of a large filled circle as the base shape, with a single bold graphic symbol cut out from the center using negative space. The cutout is black, revealing the dark background through the shape.
Color: The circle and symbol use a single flat solid color — no gradients, no shading, no transparency. Choose one strong, saturated color for the entire set (e.g. electric lime, hot pink, cobalt blue, bright orange, vivid red, neon purple). The background is solid black.
Symbol style: The cutout symbols inside each circle are bold, geometric, and high-contrast. Examples include 4-pointed stars, sunbursts, asterisks, flowers, arrows, lightning bolts, and abstract shapes. Symbols should be thick and simple — no fine lines or intricate detail.
Style rules: Strictly flat and two-tone. No gradients, no shadows, no outlines, no strokes, no textures. Just solid color circles with black negative space cutouts.
Weight & proportion: The circle should take up most of the canvas. The cutout symbol should be large and centered, leaving a bold ring of color around the edges.
Cohesion: All icons share the same circle size, visual weight, and color so they feel like a tight, unified set.
Background: Solid black only.

Please generate icons for the following symbols inside the circles: [replace with your list — e.g. star, flower, sunburst, asterisk, lightning bolt, arrow, cross, moon, etc.]`,
    svgExamples: [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" fill="none"><rect width="1000" height="300" fill="#000000"/><defs><style>.base-circle { fill: #CCFF00; } .cutout { fill: #000000; } </style></defs><g transform="translate(50, 50)"><circle class="base-circle" cx="100" cy="100" r="100"/><path class="cutout" d="M100,10 Q105,95 190,100 Q105,105 100,190 Q95,105 10,100 Q95,95 100,10Z"/></g><g transform="translate(290, 50)"><circle class="base-circle" cx="100" cy="100" r="100"/><path class="cutout" d="M130,20 L50,110 L100,110 L70,180 L150,90 L100,90 Z"/></g><g transform="translate(530, 50)"><circle class="base-circle" cx="100" cy="100" r="100"/><path class="cutout" d="M140,30 A75,75 0 1,0 140,170 A60,60 0 1,1 140,30Z"/></g><g transform="translate(770, 50)"><circle class="base-circle" cx="100" cy="100" r="100"/><path class="cutout" d="M65,30 H135 V65 H170 V135 H135 V170 H65 V135 H30 V65 H65 Z"/></g></svg>`,
    ],
  },
  {
    name: "FUI",
    shortDescription:
      "Sci-fi HUD-style icons with technical arcs, crosshairs, and angular stroke geometry.",
    systemPrompt: `Generate a single SVG icon in a strict FUI (Fictional User Interface) style — the kind seen in sci-fi films, military HUDs, and futuristic dashboards. Output clean, valid SVG code only. Follow every rule below exactly:

Structure: The icon is built from geometric technical shapes — arcs, partial rings, corner brackets, tick marks, crosshairs, segmented bars, and angular frames. Shapes feel like they belong to a scanning or targeting interface. Nothing is decorative — every element suggests function and data.
Color: Use a single accent color in two intensities — a bright fully saturated version for primary strokes and active elements (e.g. #00FFD1, #00AAFF, #7FFF00, #FF4500) and a dim 20–30% opacity version of the same color for secondary rings, background arcs, and inactive elements. Background is always transparent or pure black (#000000).
Construction: Built entirely from strokes — no filled shapes. All elements use thin to medium stroke widths (stroke-width between 1 and 2.5). Use stroke-linecap="square" or "butt" for sharp technical ends. Corners are sharp and angular — no rounded corners anywhere.
Details: Include at least two or three of the following FUI elements to add technical depth — corner bracket markers, a partial arc or ring segment, a small crosshair or center dot, tick marks or graduation lines, a segmented or dashed arc, small rectangular notches, or a scanning sweep line.
Viewbox & size: viewBox="0 0 64 64". All shapes must sit comfortably within the canvas with even padding. The icon must read clearly at 32×32px.
SVG output rules: Output only clean valid SVG code. Use only <circle>, <path>, <line>, <rect>, <polyline>, and <polygon> elements. No embedded CSS classes, no JavaScript, no external fonts, no <image> tags, no filters, no blur effects. All styling via inline SVG attributes only (stroke, fill, opacity, stroke-width, stroke-dasharray).
Style: The overall feel is cold, precise, and technical — like a readout from a targeting computer, radar system, or sci-fi medical scanner. Minimal, sharp, and data-driven.
No extras: No background rectangle, no drop shadows, no glow filters, no decorative flourishes, no text or labels inside the SVG.

Generate a single FUI SVG icon for: [replace with your subject — e.g. target lock, radar sweep, biometric scan, power core, shield system, navigation compass, data uplink, etc.]`,
    svgExamples: [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none"><circle cx="32" cy="32" r="26" stroke="#00FFD1" stroke-width="1" stroke-dasharray="2, 4" opacity="0.3" /><path d="M12 4H4v8M52 4h8v8M12 60H4v-8M52 60h8v-8" stroke="#00FFD1" stroke-width="1.5" stroke-linecap="square" /><path d="M32 12 A20 20 0 0 1 52 32" stroke="#00FFD1" stroke-width="2" stroke-linecap="butt" /><path d="M32 52 A20 20 0 0 1 12 32" stroke="#00FFD1" stroke-width="2" stroke-linecap="butt" /><circle cx="32" cy="32" r="14" stroke="#00FFD1" stroke-width="1" stroke-dasharray="8, 3" opacity="0.6" /><line x1="32" y1="28" x2="32" y2="36" stroke="#00FFD1" stroke-width="1.5" /><line x1="28" y1="32" x2="36" y2="32" stroke="#00FFD1" stroke-width="1.5" /><line x1="32" y1="8" x2="32" y2="10" stroke="#00FFD1" stroke-width="1.5" /><line x1="32" y1="54" x2="32" y2="56" stroke="#00FFD1" stroke-width="1.5" /><line x1="8" y1="32" x2="10" y2="32" stroke="#00FFD1" stroke-width="1.5" /><line x1="54" y1="32" x2="56" y2="32" stroke="#00FFD1" stroke-width="1.5" /><polyline points="22,22 32,32 42,22" stroke="#00FFD1" stroke-width="1" opacity="0.8" /></svg>`,
    ],
  },
  {
    name: "Dotmatrix",
    shortDescription:
      "Retro LED-style icons built entirely from uniform dot grids on dark charcoal.",
    systemPrompt: `Generate a single icon in a strict dot-matrix style. Output as SVG or image. Follow every rule below exactly and do not deviate:

Construction: The entire icon is built exclusively from a uniform grid of small filled circles (dots). Every dot is identical in size and perfectly spaced on a fixed grid. The icon shape is formed by which dots are present or absent — like a dot-matrix LED display or a punched card pattern. No lines, no strokes, no paths, no filled shapes of any kind. Only dots.
Dot style: Each dot is a small, crisp, solid white filled circle with a slight soft edge — not perfectly hard but not blurry. The dots should look like illuminated LED bulbs or pearls on a dark surface. All dots are exactly the same size throughout the entire icon.
Spacing: The gap between each dot is consistent and equal — approximately the same width as the dot itself. The grid spacing never varies. Dots are never touching or overlapping.
Color: All dots are white or very bright white-grey. The background is a deep dark charcoal or near-black (#1a1a1a or #222222) — not pure black. No other colors anywhere. No gradients, no shading, no colored dots.
Rendering: The icon reads as a recognizable silhouette formed entirely by the presence and absence of dots on the grid. Both filled areas and outline-only areas can be used — some icons use solid dot fills for the whole shape, others use only the outer edge dots to suggest the outline. Choose whichever reads most clearly for the subject.
Background: Deep dark charcoal, flat and uniform. No panels, no containers, no frames, no vignette.
Padding: The icon sits centered on a square canvas with generous even padding on all sides so the dot grid never touches the edges.
No extras: No labels, no text, no outlines around the icon, no drop shadows, no glow effects, no background shapes behind individual icons. Dots and dark background only.
Style feel: The overall aesthetic is retro-digital, clinical, and precise — like a vintage LED scoreboard, an airport departure board, or an early computer display. Simple, graphic, and instantly readable.

Generate a single Dotmatrix style icon for: [replace with your subject — e.g. a thumbs up, a house, a heart, a warning triangle, a smiley face, etc.]`,
    svgExamples: [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" fill="#1a1a1a"/><defs><filter id="soft-dot" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="blurred"/><feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" /><feComposite in="SourceGraphic" in2="gooey" operator="atop"/></filter></defs><g filter="url(#soft-dot)" fill="#FFFFFF"><circle cx="55" cy="25" r="3.5" /> <circle cx="65" cy="25" r="3.5" /> <circle cx="95" cy="25" r="3.5" /> <circle cx="105" cy="25" r="3.5" /> <circle cx="45" cy="35" r="3.5" /> <circle cx="55" cy="35" r="3.5" /> <circle cx="65" cy="35" r="3.5" /> <circle cx="75" cy="35" r="3.5" /> <circle cx="85" cy="35" r="3.5" /> <circle cx="95" cy="35" r="3.5" /> <circle cx="105" cy="35" r="3.5" /> <circle cx="115" cy="35" r="3.5" /> <circle cx="45" cy="45" r="3.5" /> <circle cx="55" cy="45" r="3.5" /> <circle cx="65" cy="45" r="3.5" /> <circle cx="75" cy="45" r="3.5" /> <circle cx="85" cy="45" r="3.5" /> <circle cx="95" cy="45" r="3.5" /> <circle cx="105" cy="45" r="3.5" /> <circle cx="115" cy="45" r="3.5" /> <circle cx="55" cy="55" r="3.5" /> <circle cx="65" cy="55" r="3.5" /> <circle cx="75" cy="55" r="3.5" /> <circle cx="85" cy="55" r="3.5" /> <circle cx="95" cy="55" r="3.5" /> <circle cx="105" cy="55" r="3.5" /> <circle cx="55" cy="65" r="3.5" /> <circle cx="65" cy="65" r="3.5" /> <circle cx="75" cy="65" r="3.5" /> <circle cx="85" cy="65" r="3.5" /> <circle cx="95" cy="65" r="3.5" /> <circle cx="105" cy="65" r="3.5" /> <circle cx="65" cy="75" r="3.5" /> <circle cx="75" cy="75" r="3.5" /> <circle cx="85" cy="75" r="3.5" /> <circle cx="95" cy="75" r="3.5" /> <circle cx="65" cy="85" r="3.5" /> <circle cx="75" cy="85" r="3.5" /> <circle cx="85" cy="85" r="3.5" /> <circle cx="95" cy="85" r="3.5" /> <circle cx="75" cy="95" r="3.5" /> <circle cx="85" cy="95" r="3.5" /> <circle cx="75" cy="105" r="3.5" /> <circle cx="85" cy="105" r="3.5" /> </g></svg>`,
    ],
  },
  {
    name: "Colorblock Badge",
    shortDescription:
      "Bold flat icons on vivid color-blocked square backgrounds with strong contrast.",
    systemPrompt: `Generate a single icon displayed as a bold flat colorblock badge. Follow every rule below exactly and do not deviate:

Layout: The icon is presented as a perfectly square canvas filled edge-to-edge with a single flat background color. The icon symbol sits centered within the square with generous even padding on all sides. No rounded corners on the square canvas — hard edges only.
Icon symbol: The symbol is rendered in a single flat solid color that contrasts strongly against the background. The symbol uses only two colors total — the background color and the icon color. No gradients, no shadows, no outlines, no strokes, no textures of any kind.
Color pairing: The background and icon color are always a high-contrast complementary or bold pairing. Examples: bright blue background with white icon, sage green background with dark maroon icon, pale pink background with cornflower blue icon, deep navy background with golden yellow icon, golden yellow background with cobalt blue icon, dark maroon background with light grey icon, powder blue background with crimson red icon, bright orange background with silver grey icon. Each variation uses a completely different color pair — no two badges share the same combination.
Style: Completely flat design. No drop shadows, no glows, no gradients, no borders, no outlines, no depth, no texture of any kind. Two flat colors per badge — background and icon — nothing else.
Symbol construction: The icon symbol itself is bold, geometric, and simple. Built from clean flat filled shapes only. No fine detail, no thin lines, no strokes. Must read instantly at a small size.
Variations: Generate 8 variations of the same icon symbol, each using a completely different bold color pair. Arrange them in a 4×2 grid with no gaps or spacing between the squares — the colored panels sit flush against each other edge to edge like a color swatch sheet.
No extras: No labels, no text, no frames, no outer background, no drop shadows, no decorative elements of any kind. Flat colored squares with centered flat icons only.

Generate 8 Colorblock Badge variations of this icon symbol: [replace with your subject — e.g. a star, a lightning bolt, a heart, a house, an arrow, a shield, etc.]`,
    svgExamples: [
      `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="48" height="40" rx="10" fill="#A0C4FF" fill-opacity="0.2"/><path d="M32 12H46C51.5228 12 56 16.4772 56 22V42C56 47.5228 51.5228 52 46 52H32V12Z" fill="#A0C4FF" fill-opacity="0.15"/><path d="M32 8C32 8 48 12 48 24V38C48 46 32 54 32 54C32 54 16 46 16 38V24C16 12 32 8 32 8Z" stroke="#A0C4FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 31L30 36L39 27" stroke="#A0C4FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    ],
  },
  {
    name: "Glassmorphism",
    shortDescription:
      "Frosted-glass layered icons with translucent panels and soft rounded strokes.",
    systemPrompt: `Generate a single SVG icon in a Glassmorphism Line style. Output clean valid SVG code only. Follow every rule below exactly:

Construction: The icon is built from a combination of thin strokes and selectively transparent filled shapes. Overlapping elements use reduced opacity (0.2 to 0.5) to simulate the layered depth of frosted glass. No blur filters, no CSS, no JavaScript — the glass effect is achieved purely through SVG opacity and shape layering.
Strokes: Primary icon strokes use stroke-width between 1.2 and 2. All strokes use stroke-linecap="round" and stroke-linejoin="round". No sharp corners anywhere.
Color: Use a single accent color for all strokes (e.g. #FFFFFF, #A0C4FF, #B8FFE0). Background is transparent or deep dark (#0D0D1A). Overlapping fill shapes use the same accent color at 15–30% opacity to suggest glass panels sitting behind the strokes.
Layering: Include at least one background shape (circle, rounded rect, or organic form) filled at very low opacity (0.15–0.25) to act as the frosted glass base panel. The stroke icon sits on top of this panel.
SVG output rules: Output only clean valid SVG code. Use only <circle>, <path>, <rect>, <line>, <polyline>, and <polygon> elements. All styling via inline SVG attributes only. No embedded CSS, no JavaScript, no external fonts, no filters, no <image> tags.
Viewbox: viewBox="0 0 64 64". All elements within the canvas with even padding.
No extras: No drop shadows, no blur, no glow, no labels, no background rectangle unless it is the frosted glass panel itself.

Generate a single Glassmorphism Line SVG icon for: [replace with your subject]`,
    svgExamples: [
      `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#0F1118"/><circle cx="20" cy="44" r="10" fill="#3D4A70" fill-opacity="0.06"/><rect x="8" y="8" width="48" height="48" rx="10" fill="#FFFFFF" fill-opacity="0.15" stroke="#C0D8FF" stroke-width="1.2" stroke-opacity="0.6"/><rect x="12" y="12" width="40" height="40" rx="8" fill="#FFFFFF" fill-opacity="0.08"/><rect x="14" y="10" width="36" height="2" rx="1" fill="#FFFFFF" fill-opacity="0.12"/><path d="M32 25C28.134 25 25 28.134 25 32C25 35.866 28.134 39 32 39C35.866 39 39 35.866 39 32C39 28.134 35.866 25 32 25ZM32 19L32 22M32 42L32 45M41.1924 22.8076L39.0711 24.9289M24.9289 39.0711L22.8076 41.1924M45 32H42M22 32H19M41.1924 41.1924L39.0711 39.0711M24.9289 24.9289L22.8076 22.8076" stroke="#A8CFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    ],
  },
  {
    name: "Neon Glow / Cyberpunk",
    shortDescription:
      "Vivid neon-tube stroke icons with glowing halos on deep black backgrounds.",
    systemPrompt: `Generate a single SVG icon in a Neon Glow style. Output clean valid SVG code only. Follow every rule below exactly:

Construction: The icon is built entirely from thin bright strokes on a dark background. The neon glow effect is achieved using an SVG <filter> element containing feGaussianBlur and feComposite or feMerge to create a soft luminous halo around each stroke. The filter must be defined inside the SVG <defs> block and applied via filter="url(#glow)" on the relevant elements.
Strokes: Primary strokes use stroke-width between 1.5 and 2.5. All strokes use stroke-linecap="round" and stroke-linejoin="round". No filled shapes. The bright stroke sits on top of its own blurred glow copy to create the neon tube effect.
Glow construction: Inside <defs>, define a filter with feGaussianBlur stdDeviation="3" applied to the stroke, then use feMerge to composite the blurred glow layer beneath the sharp original stroke. This creates a bright crisp center line with a soft colored halo around it.
Color: Use a single vivid neon accent color for all strokes — e.g. electric cyan (#00FFD1), hot pink (#FF00AA), acid green (#7FFF00), or electric blue (#00AAFF). Background is pure black (#000000) or very deep dark (#050510). No other colors anywhere.
SVG output rules: Output only clean valid SVG code. Use <circle>, <path>, <rect>, <line>, <polyline>, <polygon>, <filter>, <feGaussianBlur>, <feMerge>, and <feMergeNode> elements only. All styling via inline SVG attributes only. No embedded CSS classes, no JavaScript, no external fonts, no <image> tags.
Viewbox: viewBox="0 0 64 64". All elements within the canvas with even padding. Include a <rect width="64" height="64" fill="#050510"/> as the first element for the dark background.
No extras: No filled shapes, no gradients on strokes, no drop shadows separate from the glow filter, no labels, no decorative elements.

Generate a single Neon Glow SVG icon for: [replace with your subject]`,
    svgExamples: [
      `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="64" height="64" fill="#050510"/><g filter="url(#glow)" stroke="#00AAFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="32" cy="32" r="28" /><circle cx="32" cy="32" r="1" /><path d="M 32,8 L 40,32 L 32,56 L 24,32 Z" /><line x1="10" y1="10" x2="16" y2="16" /><line x1="54" y1="10" x2="48" y2="16" /><line x1="10" y1="54" x2="16" y2="48" /><line x1="54" y1="54" x2="48" y2="48" /></g></svg>`,
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

  console.log("Seeding Tam's styles...");
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
