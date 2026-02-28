"use client";

import { useState, useRef, useEffect, useCallback, TouchEvent as ReactTouchEvent } from "react";

/* ── Ghost SVG Styles ─────────────────────────────── */
const STYLES = [
  {
    id: "classic",
    name: "Classic",
    desc: "The original ghost silhouette",
    prompt: `Construction: The entire icon is a single filled silhouette — a smooth dome top curving into straight sides, ending in a rhythmic row of evenly-spaced pointed scallops along the bottom. The scallops are the signature element: uniform V-shaped notches, 4 of them, perfectly symmetrical. The shape is clean and consistent — no wobble, no organic variation.

Eyes: Two vertical ellipses sit symmetrically in the upper body, slightly above center. They are filled with the background color, reading as cut-outs from the ghost body. No mouth, no brows, no expression — eyes only.

Style: Flat and fully filled. A single solid color for the body. Optional thin stroke outline of the same or darker hue. No gradients, no shading, no textures, no drop shadows.

Color: Ghost body is one solid color. Background is a flat contrasting color. Two colors total maximum.

Rendering: Legible at small sizes. Centered on a square canvas with even padding. Should feel at home in an app icon set or UI library.

No extras: No labels, no frames, no glow. Ghost silhouette and background only.

Adaptation rule: Aim to keep the structural logic — dome top, straight sides, scalloped bottom, two elliptical eye cut-outs — but replace the ghost body shape with the target subject. The scallop count and eye proportions should scale naturally to the new shape.`,
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z" fill={fill} stroke={stroke} strokeWidth={sw} />
        <ellipse cx="80" cy="95" rx="14" ry="17" fill={bg} />
        <ellipse cx="120" cy="95" rx="14" ry="17" fill={bg} />
      </svg>
    ),
  },
  {
    id: "rounded",
    name: "Chubby",
    desc: "Extra soft and round",
    prompt: `Construction: The icon is a single filled silhouette — a wide, generously rounded dome top that flows into a broad, inflated body. The sides belly outward rather than dropping straight, giving a soft, pillowy feel. The bottom edge ends in a series of smooth, rounded lobes connected by gentle quadratic curves — not sharp scallops, but soft wave-like bumps that feel almost like a ruffle or a plush toy's hem. The overall shape is wider and rounder than Classic, with more mass everywhere.

Eyes: Two large vertical ellipses sit symmetrically in the upper body, slightly bigger relative to the body than in Classic. They are filled with the background color, reading as cut-outs. No mouth, no brows — eyes only. The oversized eyes reinforce the soft, cartoonish proportions.

Style: Flat and fully filled. One solid color for the body. Optional thin stroke. No gradients, no shading, no textures, no drop shadows. The roundness does all the expressive work — no detail needed.

Color: Ghost body is one solid color. Background is a flat contrasting color. Two colors total maximum.

Rendering: Centered on a square canvas with even padding. Should feel friendly and approachable — like a children's sticker or a plush toy rendered flat.

No extras: No labels, no frames, no glow. Silhouette and background only.

Adaptation rule: Aim to maintain the same structural logic without jeopardizing the natural shape — wide rounded dome, inflated sides, soft lobed bottom edge, two large elliptical eye cut-outs — but apply it to the target subject. Every corner, edge and terminus should be maximally rounded. When in doubt, make it rounder.`,
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 230" fill="none">
        <path d="M100 18 C48 18 25 60 25 100 L25 192 Q25 200 33 196 L48 188 Q56 183 64 188 L80 197 Q88 202 96 197 L104 192 Q112 187 120 192 L136 201 Q144 206 152 201 L167 192 Q175 187 175 192 L175 100 C175 60 152 18 100 18Z" fill={fill} stroke={stroke} strokeWidth={sw} />
        <ellipse cx="80" cy="100" rx="16" ry="19" fill={bg} />
        <ellipse cx="120" cy="100" rx="16" ry="19" fill={bg} />
      </svg>
    ),
  },
  {
    id: "outline",
    name: "Outline",
    desc: "Clean line art ghost",
    prompt: `Construction: The icon is drawn entirely as a thick stroked outline — no filled body whatsoever. The ghost silhouette (dome top, straight sides, scalloped bottom) exists only as a continuous stroke path. The inside of the shape is fully transparent, revealing the background. The stroke has rounded joins and rounded caps everywhere, giving it a clean, friendly line-art quality. Stroke weight should be bold enough to read clearly at small sizes — never hairline thin.

Eyes: The eyes are the one exception to the outline-only rule. Each eye is a solid filled ellipse in the stroke color, with a smaller ellipse cut into it (filled with the background color) to create a highlight or pupil. This makes the eyes pop as the only filled elements in the composition, creating a natural focal point against the transparent body.

Style: Line art only. One stroke color throughout. The interior of all shapes is empty. No filled regions except the eyes. No gradients, no shading, no textures, no drop shadows. Crisp and graphic.

Color: One stroke color (white, black, or a single accent). Background is flat and contrasting. The stroke color is reused for the eye fills. Two colors total maximum.

Rendering: Centered on a square canvas with even padding. Should feel at home in an icon font, a wireframe UI kit, or as a badge outline. Legible at small sizes.

No extras: No labels, no frames, no glow. Outline stroke and background only.

Adaptation rule: Keep the same structural logic — the entire subject is rendered as a continuous thick outline stroke with rounded caps and joins, interior fully transparent, with any key focal detail (equivalent to the eyes) rendered as small solid filled shapes for contrast.`,
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none">
        <path d="M100 22 C56 22 32 58 32 97 L32 183 L52 163 L72 183 L92 163 L112 183 L132 163 L152 183 L168 163 L168 97 C168 58 144 22 100 22Z" fill="none" stroke={fill} strokeWidth={Math.max(sw, 5)} strokeLinejoin="round" strokeLinecap="round" />
        <ellipse cx="80" cy="96" rx="13" ry="16" fill={fill} />
        <ellipse cx="120" cy="96" rx="13" ry="16" fill={fill} />
        <ellipse cx="78" cy="93" rx="4" ry="5" fill={bg} />
        <ellipse cx="118" cy="93" rx="4" ry="5" fill={bg} />
      </svg>
    ),
  },
  {
    id: "pixel",
    name: "Pixel",
    desc: "8-bit retro ghost",
    render: ({ fill, bg }: GhostProps) => {
      const S = 18;
      const grid = [
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 0, 0, 1, 1], [1, 1, 0, 0, 1, 1, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 0, 1, 1], [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 0, 1, 1, 0, 1], [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      ];
      const eyeCells: [number, number][] = [[2, 3], [3, 3], [2, 4], [3, 4], [6, 3], [7, 3], [6, 4], [7, 4]];
      return (
        <svg viewBox={`0 0 ${10 * S} ${12 * S}`} fill="none" shapeRendering="crispEdges">
          {grid.flatMap((row, r) => row.map((cell, c) => cell ? <rect key={`${r}-${c}`} x={c * S} y={r * S} width={S} height={S} fill={fill} /> : null))}
          {eyeCells.map(([c, r]) => <rect key={`e${c}${r}`} x={c * S} y={r * S} width={S} height={S} fill={bg} />)}
        </svg>
      );
    },
  },
  {
    id: "sharp",
    name: "Sharp",
    desc: "Angular, geometric ghost",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none">
        <path d="M100 20 L40 65 L35 185 L55 160 L75 185 L100 160 L125 185 L145 160 L165 185 L165 65 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="miter" />
        <polygon points="75,80 88,115 62,115" fill={bg} />
        <polygon points="125,80 138,115 112,115" fill={bg} />
      </svg>
    ),
  },
  {
    id: "drip",
    name: "Drip",
    desc: "Melting ghost vibes",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 240" fill="none">
        <path d="M100 18 C55 18 28 58 28 98 L28 170 Q30 180 38 178 Q46 175 48 185 Q50 195 58 193 Q66 190 68 200 Q70 210 78 207 L90 200 Q98 196 106 200 L118 207 Q126 210 128 200 Q130 190 138 193 Q146 195 148 185 Q150 175 158 178 Q166 180 168 170 L172 98 C172 58 145 18 100 18Z" fill={fill} stroke={stroke} strokeWidth={sw} />
        <ellipse cx="82" cy="97" rx="14" ry="17" fill={bg} />
        <ellipse cx="118" cy="97" rx="14" ry="17" fill={bg} />
      </svg>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Ultra simplified ghost",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 210" fill="none">
        <path d="M100 30 C62 30 42 62 42 92 L42 175 Q57 155 72 175 Q87 155 100 175 Q113 155 128 175 Q143 155 158 175 L158 92 C158 62 138 30 100 30Z" fill={fill} stroke={stroke} strokeWidth={sw} />
        <circle cx="82" cy="90" r="11" fill={bg} />
        <circle cx="118" cy="90" r="11" fill={bg} />
      </svg>
    ),
  },
  {
    id: "haunted",
    name: "Haunted",
    desc: "Scary ghost with expression",
    prompt: `Reference example SVG:
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

Adaptation rule: Take the target subject, render its silhouette in the Classic style, then layer on the three expression elements but their face should have a clear emotional expression, lean towards a positive and playful yet coy expression. They are kids misbehaving and inciting you. Lean into the emotion.`,
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 230" fill="none">
        <path d="M100 15 C50 15 25 58 25 100 L25 190 L45 168 L65 190 L85 168 L100 182 L115 168 L135 190 L155 168 L175 190 L175 100 C175 58 150 15 100 15Z" fill={fill} stroke={stroke} strokeWidth={sw} />
        <line x1="62" y1="78" x2="88" y2="88" stroke={bg} strokeWidth="5" strokeLinecap="round" />
        <line x1="138" y1="78" x2="112" y2="88" stroke={bg} strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="80" cy="100" rx="13" ry="16" fill={bg} />
        <ellipse cx="120" cy="100" rx="13" ry="16" fill={bg} />
        <path d="M78 130 Q90 145 100 138 Q110 145 122 130" stroke={bg} strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "dot",
    name: "Dot",
    desc: "Halftone dot matrix ghost",
    prompt: `Canvas: viewBox="0 0 200 220" with fill="none". No background rectangle.

Grid system: All dots sit on a strict 13px grid — every dot's cx and cy follow the pattern offset + (col × 13) where the grid is centered on the canvas. Use offsetX = (200 - COLS × 13) / 2 and offsetY = (220 - ROWS × 13) / 2 to center the grid.

Dots: Each dot is a <circle> with r="5.2". All body dots share one flat fill color. No gradients, no strokes, no outlines on any dot.

Grid dimensions: 14-column × 16-row grid (COLS=14, ROWS=16). 182×208px active area centered inside the 200×220 canvas.

Shape construction: Think of the grid as a stencil. For each of the 16 rows, decide which of the 14 column positions fall inside the icon silhouette.

Internal details: Eyes/cutouts are represented by overriding specific grid positions with bg color (value 2 in mask). Never remove dots for interior details — always replace their color.

Code structure: Group all primary body dots inside a single <g> element. Place eye/detail override circles outside the group after it.`,
    render: ({ fill, bg }: GhostProps) => {
      const R = 5.2, G = 13;
      const mask = [
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1], [1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1], [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      return (
        <svg viewBox={`0 0 ${14 * G} ${16 * G}`} fill="none">
          {mask.flatMap((row, r) => row.map((cell, c) => {
            if (cell === 0) return null;
            return <circle key={`${r}-${c}`} cx={c * G + G / 2} cy={r * G + G / 2} r={R} fill={cell === 2 ? bg : fill} />;
          }))}
        </svg>
      );
    },
  },
  {
    id: "pencil",
    name: "Pencil",
    desc: "Single continuous line drawing",
    prompt: `Reference example SVG:
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

Adaptation rule: Take the target subject and trace its silhouette as a single unbroken path. Where the path needs to describe an interior detail, route it inward, loop around the detail, and continue outward. Concentric inner circles at reduced opacity can be added for key circular details. The fewer the total paths, the better — ideally the entire icon is one or two strokes maximum.`,
    render: ({ fill, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none">
        <path d="M100 22 C100 22 138 24 158 52 C174 74 172 100 172 118 L172 175 C172 178 168 176 165 172 C160 165 156 160 152 168 C148 176 145 180 140 174 C135 168 130 163 125 170 C120 177 115 180 110 175 C105 170 100 167 95 172 C90 177 86 178 82 173 C78 168 73 163 68 170 C63 177 58 176 56 172 C53 168 50 165 48 168 C44 171 40 176 36 172 L28 165 L28 118 C28 100 28 74 44 52 C60 28 100 22 100 22Z" fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="80" cy="95" r="14" fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)} />
        <circle cx="120" cy="95" r="14" fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)} />
        <circle cx="80" cy="95" r="8" fill="none" stroke={fill} strokeWidth="1" opacity="0.5" />
        <circle cx="120" cy="95" r="8" fill="none" stroke={fill} strokeWidth="1" opacity="0.5" />
        <path d="M28 168 C24 172 20 178 24 183 C28 188 34 184 32 178" fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "wiggly",
    name: "Wiggly",
    desc: "Wobbly cartoon ghost",
    prompt: `Reference example SVG:
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

Adaptation rule: Take the target subject and render its general silhouette, then introduce deliberate, controlled wobble to every edge. Straighten nothing. Perfect nothing. Every contour should feel like it was drawn quickly with a brush by someone who knew exactly what they were doing but didn't want it to look like they did.`,
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 230" fill="none">
        <path d="M100 22 C58 22 30 60 30 100 C30 110 32 120 30 130 C28 140 32 150 30 160 C28 170 36 175 44 168 C52 161 56 172 64 178 C72 184 80 174 88 178 C96 182 104 180 112 176 C120 172 128 182 136 176 C144 170 150 160 158 168 C166 176 172 170 170 160 C168 150 172 140 170 130 C168 120 170 110 170 100 C170 60 142 22 100 22Z" fill={fill} stroke={stroke} strokeWidth={sw} />
        <ellipse cx="80" cy="97" rx="13" ry="15" fill={bg} />
        <ellipse cx="120" cy="97" rx="13" ry="15" fill={bg} />
      </svg>
    ),
  },
];

interface GhostProps {
  fill: string;
  stroke: string;
  bg: string;
  sw: number;
}

const PRESETS = [
  "#000000", "#ffffff", "#FF5733", "#FFD700", "#4FAAFF",
  "#6B5CE7", "#00C48C", "#FF69B4", "#FF8C00", "#e8ff4f",
  "#7CFC00", "#DC143C", "#8B4513", "#708090", "#00e5a0",
];

/* ── Hex Color Picker ─────────────────────────────── */
function HexColorPicker({ color, onChange, size = 200 }: { color: string; onChange: (c: string) => void; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);
  const brightnessVal = useRef(1);
  const [brightness, setBrightness] = useState(1);

  const drawWheel = useCallback((ctx: CanvasRenderingContext2D, brt: number) => {
    const cx = size / 2, cy = size / 2, r = size / 2 - 4;
    ctx.clearRect(0, 0, size, size);
    for (let angle = 0; angle < 360; angle++) {
      const start = (angle - 1) * Math.PI / 180;
      const end = (angle + 1) * Math.PI / 180;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, `hsla(${angle},0%,${brt * 100}%,1)`);
      grad.addColorStop(1, `hsla(${angle},100%,${brt * 50}%,1)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawWheel(canvas.getContext("2d")!, brightnessVal.current);
  }, [drawWheel]);

  const pickColor = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = size / rect.width, scaleY = size / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const cx = size / 2, cy = size / 2;
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    if (dist > size / 2 - 2) return;
    const pixel = canvas.getContext("2d")!.getImageData(Math.round(x), Math.round(y), 1, 1).data;
    onChange("#" + [pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, "0")).join(""));
  }, [size, onChange]);

  const hexToHSL = (hex: string): [number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return [h * 360, s];
  };

  const [h, s] = hexToHSL(color.length === 7 ? color : "#888888");
  const rad = (size / 2 - 4) * s;
  const mx = size / 2 + rad * Math.cos(h * Math.PI / 180);
  const my = size / 2 + rad * Math.sin(h * Math.PI / 180);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div
        style={{ position: "relative", width: size, height: size, cursor: "crosshair" }}
        onMouseDown={e => { dragging.current = true; pickColor(e); }}
        onMouseMove={e => { if (dragging.current) pickColor(e); }}
        onMouseUp={() => dragging.current = false}
        onMouseLeave={() => dragging.current = false}
      >
        <canvas ref={canvasRef} width={size} height={size} style={{ borderRadius: "50%", display: "block", width: size, height: size }} />
        <div style={{ position: "absolute", left: mx - 8, top: my - 8, width: 16, height: 16, borderRadius: "50%", border: "2.5px solid #fff", boxShadow: "0 0 0 1.5px rgba(0,0,0,0.4)", background: color, pointerEvents: "none" }} />
      </div>
      <div style={{ width: "100%", padding: "0 4px" }}>
        <div style={{ fontSize: 9, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 5, fontFamily: "'Inter',sans-serif" }}>BRIGHTNESS</div>
        <div style={{ position: "relative", height: 18 }}>
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%", height: 7, borderRadius: 4, background: `linear-gradient(to right, #000, ${color})` }} />
          <input
            type="range" min="0.1" max="1" step="0.01" value={brightness}
            onChange={e => {
              const val = parseFloat(e.target.value);
              setBrightness(val);
              brightnessVal.current = val;
              const canvas = canvasRef.current;
              if (canvas) drawWheel(canvas.getContext("2d")!, val);
            }}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── useIsMobile hook ─────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ── Ghost Studio App ─────────────────────────────── */
export default function GhostStudio() {
  const [styleIdx, setStyleIdx] = useState(0);
  const [ghostColor, setGhostColor] = useState("#e8ff4f");
  const [eyeColor, setEyeColor] = useState("#080808");
  const [bgColor, setBgColor] = useState("#0e0e0e");
  const [activeTarget, setActiveTarget] = useState<"ghost" | "eye" | "bg">("ghost");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [mobilePanel, setMobilePanel] = useState<"preview" | "controls">("preview");
  const isMobile = useIsMobile();

  const activeStyle = STYLES[styleIdx];
  const targetColors = { ghost: ghostColor, eye: eyeColor, bg: bgColor };
  const setTargetColor = { ghost: setGhostColor, eye: setEyeColor, bg: setBgColor };
  const activeColor = targetColors[activeTarget];
  const setActiveColor = (c: string) => setTargetColor[activeTarget](c);

  const randomizeColors = () => {
    const randHex = () => "#" + Array.from({ length: 3 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
    setGhostColor(randHex());
    setEyeColor(randHex());
    setBgColor(randHex());
    setStyleIdx(Math.floor(Math.random() * STYLES.length));
  };

  /* ── Touch swipe for mobile style navigation ──── */
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    // Only trigger if horizontal swipe > 40px and more horizontal than vertical
    if (absDx > 40 && absDx > absDy * 1.5) {
      if (dx < 0) setStyleIdx(i => (i + 1) % STYLES.length);
      else setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length);
      if (e.key === "ArrowRight") setStyleIdx(i => (i + 1) % STYLES.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const ghostProps: GhostProps = { fill: ghostColor, stroke: strokeWidth > 0 ? "#000000" : "none", bg: eyeColor, sw: strokeWidth };

  const labelStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#555", letterSpacing: "0.14em", textTransform: "uppercase" };

  /* ── Mobile Layout ─────────────────────────────── */
  if (isMobile) {
    return (
      <div style={{ background: "#0e0e0e", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
        <style>{`
          .gs-arrow-btn { width:36px; height:36px; border-radius:50%; border:1.5px solid #333; background:transparent; color:#888; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:all 0.18s; }
          .gs-arrow-btn:hover { border-color:#fff; color:#fff; }
          .gs-swatch { width:22px; height:22px; border-radius:5px; cursor:pointer; flex-shrink:0; transition:transform 0.15s; }
          .gs-target-btn { padding:6px 10px; border-radius:5px; border:1.5px solid transparent; cursor:pointer; font-family:'Inter', sans-serif; font-size:10px; font-weight:700; letter-spacing:0.06em; transition:all 0.18s; flex:1; background:transparent; color:#666; }
          .gs-target-btn.active { border-color:#fff; background:rgba(255,255,255,0.08); color:#fff; }
          .gs-target-btn:not(.active) { border-color:#2a2a2a; }
          .gs-style-dot { width:7px; height:7px; border-radius:50%; background:#333; cursor:pointer; transition:all 0.2s; flex-shrink:0; }
          .gs-style-dot.active { background:#fff; transform:scale(1.4); }
          @keyframes ghostIn { from { opacity:0; transform:scale(0.88) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
          .ghost-anim { animation:ghostIn 0.28s cubic-bezier(0.34,1.56,0.64,1); }
          .gs-panel input[type=range] { -webkit-appearance:none; appearance:none; background:transparent; }
          .gs-panel input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#fff; cursor:pointer; border:2px solid #333; }
          .gs-randomize { width:100%; padding:10px 14px; border-radius:8px; border:1.5px solid rgba(232,255,79,0.3); background:rgba(232,255,79,0.06); color:#e8ff4f; font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; }
          .gs-tab-btn { flex:1; padding:10px; border:none; font-family:'Inter',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
          .gs-tab-btn.active { background:rgba(232,255,79,0.08); color:#e8ff4f; border-bottom:2px solid #e8ff4f; }
          .gs-tab-btn:not(.active) { background:#0a0a0a; color:#555; border-bottom:2px solid transparent; }
        `}</style>

        {/* Header */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e1e1e", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0a0a0a" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.12em" }}>GHOST STUDIO</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5a0", boxShadow: "0 0 8px #00e5a0" }} />
            <span style={{ fontSize: 8, color: "#555", letterSpacing: "0.08em" }}>LIVE</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", borderBottom: "1px solid #1e1e1e" }}>
          <button className={`gs-tab-btn${mobilePanel === "preview" ? " active" : ""}`} onClick={() => setMobilePanel("preview")}>Preview</button>
          <button className={`gs-tab-btn${mobilePanel === "controls" ? " active" : ""}`} onClick={() => setMobilePanel("controls")}>Customize</button>
        </div>

        {mobilePanel === "preview" ? (
          <>
            {/* Preview — swipe left/right to change styles */}
            <div
              style={{ height: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: bgColor, position: "relative", transition: "background 0.3s", touchAction: "pan-y" }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
              <div key={styleIdx} className="ghost-anim" style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {activeStyle.render(ghostProps)}
              </div>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginTop: 10 }}>
                {activeStyle.name} &middot; {activeStyle.desc}
              </p>
            </div>

            {/* Style navigation */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #1e1e1e", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0c0c0c" }}>
              <button className="gs-arrow-btn" onClick={() => setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length)}>&lsaquo;</button>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>{activeStyle.name}</p>
                <p style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{styleIdx + 1} / {STYLES.length}</p>
              </div>
              <button className="gs-arrow-btn" onClick={() => setStyleIdx(i => (i + 1) % STYLES.length)}>&rsaquo;</button>
            </div>

            {/* Style dots */}
            <div style={{ padding: "10px 16px", display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", borderTop: "1px solid #1a1a1a", background: "#0c0c0c" }}>
              {STYLES.map((s, i) => (
                <div key={s.id} className={`gs-style-dot${i === styleIdx ? " active" : ""}`} onClick={() => setStyleIdx(i)} title={s.name} />
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ padding: "12px 16px", background: "#0c0c0c", borderTop: "1px solid #1a1a1a" }}>
              <button className="gs-randomize" onClick={randomizeColors}>
                <span style={{ fontSize: 16 }}>&#127922;</span>
                Randomize
              </button>
            </div>
          </>
        ) : (
          /* Controls panel — scrollable */
          <div className="gs-panel" style={{ overflowY: "auto", background: "#0c0c0c" }}>
            {/* Color target */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #1a1a1a" }}>
              <p style={{ ...labelStyle, marginBottom: 10 }}>EDIT COLOR</p>
              <div style={{ display: "flex", gap: 6 }}>
                {([
                  { id: "ghost" as const, label: "GHOST", color: ghostColor },
                  { id: "eye" as const, label: "EYES", color: eyeColor },
                  { id: "bg" as const, label: "BG", color: bgColor },
                ]).map(t => (
                  <button key={t.id} className={`gs-target-btn${activeTarget === t.id ? " active" : ""}`} onClick={() => setActiveTarget(t.id)}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color, margin: "0 auto 4px", border: "1px solid rgba(255,255,255,0.1)" }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color wheel */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #1a1a1a", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <HexColorPicker color={activeColor.length === 7 ? activeColor : "#888888"} onChange={setActiveColor} size={Math.min(280, typeof window !== "undefined" ? window.innerWidth - 64 : 280)} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, width: "100%" }}>
                <div style={{ width: 24, height: 24, borderRadius: 5, background: activeColor, border: "1px solid #333", flexShrink: 0 }} />
                <input
                  value={activeColor}
                  onChange={e => { const v = e.target.value; if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setActiveColor(v); }}
                  style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#fff", padding: "6px 10px", fontSize: 12, letterSpacing: "0.08em", outline: "none", borderRadius: 5, fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </div>

            {/* Presets */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a1a" }}>
              <p style={{ ...labelStyle, marginBottom: 8 }}>PRESETS</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PRESETS.map(p => (
                  <div
                    key={p} className="gs-swatch"
                    style={{ background: p, border: p === activeColor ? "2px solid #fff" : "2px solid #2a2a2a", width: 22, height: 22, borderRadius: 5 }}
                    onClick={() => setActiveColor(p)} title={p}
                  />
                ))}
              </div>
            </div>

            {/* Stroke */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a1a" }}>
              <p style={{ ...labelStyle, marginBottom: 10 }}>STROKE</p>
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 9, color: "#888" }}>Width</span>
                  <span style={{ fontSize: 9, color: "#fff" }}>{strokeWidth}px</span>
                </div>
                <input type="range" min="0" max="12" step="0.5" value={strokeWidth} onChange={e => setStrokeWidth(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#fff" }} />
              </div>
            </div>

            {/* Randomize */}
            <div style={{ padding: "12px 16px" }}>
              <button className="gs-randomize" onClick={randomizeColors}>
                <span style={{ fontSize: 16 }}>&#127922;</span>
                Randomize
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Desktop Layout (unchanged) ─────────────────── */
  return (
    <div style={{ height: 600, background: "#0e0e0e", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .gs-arrow-btn { width:36px; height:36px; border-radius:50%; border:1.5px solid #333; background:transparent; color:#888; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:all 0.18s; }
        .gs-arrow-btn:hover { border-color:#fff; color:#fff; }
        .gs-swatch { width:22px; height:22px; border-radius:5px; cursor:pointer; flex-shrink:0; transition:transform 0.15s; }
        .gs-swatch:hover { transform:scale(1.2); }
        .gs-target-btn { padding:6px 10px; border-radius:5px; border:1.5px solid transparent; cursor:pointer; font-family:'Inter', sans-serif; font-size:10px; font-weight:700; letter-spacing:0.06em; transition:all 0.18s; flex:1; background:transparent; color:#666; }
        .gs-target-btn.active { border-color:#fff; background:rgba(255,255,255,0.08); color:#fff; }
        .gs-target-btn:not(.active) { border-color:#2a2a2a; }
        .gs-style-dot { width:7px; height:7px; border-radius:50%; background:#333; cursor:pointer; transition:all 0.2s; flex-shrink:0; }
        .gs-style-dot.active { background:#fff; transform:scale(1.4); }
        .gs-style-row { border-radius:10px; overflow:hidden; cursor:pointer; border:1.5px solid; transition:all 0.18s; padding:10px 8px; display:flex; align-items:center; gap:10px; }
        @keyframes ghostIn { from { opacity:0; transform:scale(0.88) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .ghost-anim { animation:ghostIn 0.28s cubic-bezier(0.34,1.56,0.64,1); }
        .gs-panel input[type=range] { -webkit-appearance:none; appearance:none; background:transparent; }
        .gs-panel input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#fff; cursor:pointer; border:2px solid #333; }
        .gs-randomize { width:100%; padding:10px 14px; border-radius:8px; border:1.5px solid rgba(232,255,79,0.3); background:rgba(232,255,79,0.06); color:#e8ff4f; font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .gs-randomize:hover { background:rgba(232,255,79,0.15); border-color:rgba(232,255,79,0.6); transform:scale(1.02); }
        .gs-randomize:active { transform:scale(0.97); }
        @keyframes diceRoll { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .gs-randomize:active .dice-icon { animation:diceRoll 0.3s ease-out; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "14px 24px", borderBottom: "1px solid #1e1e1e", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0a0a0a" }}>
        <div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.12em" }}>GHOST STUDIO</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#555", marginLeft: 16, letterSpacing: "0.08em" }}>&larr; &rarr; to cycle &middot; {STYLES.length} styles</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e5a0", boxShadow: "0 0 8px #00e5a0" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#555", letterSpacing: "0.08em" }}>LIVE PREVIEW</span>
        </div>
      </div>

      {/* Body */}
      <div className="gs-panel" style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left Controls */}
        <div style={{ width: 250, borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column", overflowY: "auto", background: "#0c0c0c" }}>
          {/* Style selector */}
          <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #1a1a1a" }}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>STYLE &mdash; {styleIdx + 1}/{STYLES.length}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <button className="gs-arrow-btn" onClick={() => setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length)}>&lsaquo;</button>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>{activeStyle.name}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#666", marginTop: 2 }}>{activeStyle.desc}</p>
              </div>
              <button className="gs-arrow-btn" onClick={() => setStyleIdx(i => (i + 1) % STYLES.length)}>&rsaquo;</button>
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
              {STYLES.map((s, i) => (
                <div key={s.id} className={`gs-style-dot${i === styleIdx ? " active" : ""}`} onClick={() => setStyleIdx(i)} title={s.name} />
              ))}
            </div>
          </div>

          {/* Color target */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <p style={{ ...labelStyle, marginBottom: 10 }}>EDIT COLOR</p>
            <div style={{ display: "flex", gap: 6 }}>
              {([
                { id: "ghost" as const, label: "GHOST", color: ghostColor },
                { id: "eye" as const, label: "EYES", color: eyeColor },
                { id: "bg" as const, label: "BG", color: bgColor },
              ]).map(t => (
                <button key={t.id} className={`gs-target-btn${activeTarget === t.id ? " active" : ""}`} onClick={() => setActiveTarget(t.id)}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color, margin: "0 auto 4px", border: "1px solid rgba(255,255,255,0.1)" }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color wheel */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <HexColorPicker color={activeColor.length === 7 ? activeColor : "#888888"} onChange={setActiveColor} size={216} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 5, background: activeColor, border: "1px solid #333", flexShrink: 0 }} />
              <input
                value={activeColor}
                onChange={e => { const v = e.target.value; if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setActiveColor(v); }}
                style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#fff", padding: "6px 10px", fontSize: 12, letterSpacing: "0.08em", outline: "none", borderRadius: 5, fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Presets */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <p style={{ ...labelStyle, marginBottom: 8 }}>PRESETS</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {PRESETS.map(p => (
                <div
                  key={p} className="gs-swatch"
                  style={{ background: p, border: p === activeColor ? "2px solid #fff" : "2px solid #2a2a2a", width: 22, height: 22, borderRadius: 5 }}
                  onClick={() => setActiveColor(p)} title={p}
                />
              ))}
            </div>
          </div>

          {/* Randomize */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <button className="gs-randomize" onClick={randomizeColors}>
              <span className="dice-icon" style={{ fontSize: 16 }}>&#127922;</span>
              Randomize
            </button>
          </div>

          {/* Stroke */}
          <div style={{ padding: "12px 16px" }}>
            <p style={{ ...labelStyle, marginBottom: 10 }}>STROKE</p>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 9, color: "#888", fontFamily: "'Inter', sans-serif" }}>Width</span>
                <span style={{ fontSize: 9, color: "#fff", fontFamily: "'Inter', sans-serif" }}>{strokeWidth}px</span>
              </div>
              <input type="range" min="0" max="12" step="0.5" value={strokeWidth} onChange={e => setStrokeWidth(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#fff" }} />
            </div>
          </div>
        </div>

        {/* Center Preview */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: bgColor, position: "relative", transition: "background 0.3s" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
          <div key={styleIdx} className="ghost-anim" style={{ width: 230, height: 230, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {activeStyle.render(ghostProps)}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.15)", letterSpacing: "0.16em", textTransform: "uppercase" as const, marginTop: 16 }}>
            {activeStyle.name} &middot; {activeStyle.desc}
          </p>
          <div style={{ position: "absolute", bottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
            <button className="gs-arrow-btn" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.25)" }} onClick={() => setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length)}>&lsaquo;</button>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif" }}>
              {styleIdx + 1} / {STYLES.length}
            </span>
            <button className="gs-arrow-btn" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.25)" }} onClick={() => setStyleIdx(i => (i + 1) % STYLES.length)}>&rsaquo;</button>
          </div>
        </div>

        {/* Right: All Styles */}
        <div style={{ width: 190, borderLeft: "1px solid #1a1a1a", background: "#0c0c0c", overflowY: "auto" }}>
          <div style={{ padding: "16px 12px 10px", borderBottom: "1px solid #1a1a1a" }}>
            <p style={{ ...labelStyle }}>ALL STYLES</p>
          </div>
          <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 6 }}>
            {STYLES.map((s, i) => (
              <div
                key={s.id} className="gs-style-row" onClick={() => setStyleIdx(i)}
                style={{
                  borderColor: i === styleIdx ? "rgba(232,255,79,0.4)" : "rgba(255,255,255,0.04)",
                  background: i === styleIdx ? "rgba(232,255,79,0.05)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ width: 38, height: 38, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s.render({ fill: i === styleIdx ? ghostColor : "#555", stroke: "none", bg: i === styleIdx ? eyeColor : "#0c0c0c", sw: 0 })}
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, color: i === styleIdx ? "#e8ff4f" : "#555", letterSpacing: "0.06em" }}>{s.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: "#3a3a3a", marginTop: 2 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
