"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const GhostStudio = dynamic(() => import("./ghost-studio"), { ssr: false });

const ACCENT_COLORS = [
  "#e8ff4f",
  "#ff4f9a",
  "#4FAAFF",
  "#00e5a0",
  "#6B5CE7",
  "#FF8C00",
];

/* ── Ghost SVGs for Marquee ─────────────────────────── */
const MARQUEE_STYLES = [
  { name: "Classic", desc: "Original silhouette", color: "#e8ff4f", svg: (c: string) => `<svg viewBox="0 0 200 220" fill="none" width="100%" height="100%"><path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z" fill="${c}"/><ellipse cx="80" cy="95" rx="14" ry="17" fill="#080808"/><ellipse cx="120" cy="95" rx="14" ry="17" fill="#080808"/></svg>` },
  { name: "Chubby", desc: "Soft and round", color: "#4FAAFF", svg: (c: string) => `<svg viewBox="0 0 200 230" fill="none" width="100%" height="100%"><path d="M100 18 C48 18 25 60 25 100 L25 192 Q25 200 33 196 L48 188 Q56 183 64 188 L80 197 Q88 202 96 197 L104 192 Q112 187 120 192 L136 201 Q144 206 152 201 L167 192 Q175 187 175 192 L175 100 C175 60 152 18 100 18Z" fill="${c}"/><ellipse cx="80" cy="100" rx="16" ry="19" fill="#080808"/><ellipse cx="120" cy="100" rx="16" ry="19" fill="#080808"/></svg>` },
  { name: "Outline", desc: "Line art", color: "#FF69B4", svg: (c: string) => `<svg viewBox="0 0 200 220" fill="none" width="100%" height="100%"><path d="M100 22 C56 22 32 58 32 97 L32 183 L52 163 L72 183 L92 163 L112 183 L132 163 L152 183 L168 163 L168 97 C168 58 144 22 100 22Z" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="80" cy="96" rx="13" ry="16" fill="${c}"/><ellipse cx="120" cy="96" rx="13" ry="16" fill="${c}"/><ellipse cx="78" cy="93" rx="4" ry="5" fill="#080808"/><ellipse cx="118" cy="93" rx="4" ry="5" fill="#080808"/></svg>` },
  { name: "Pixel", desc: "8-bit retro", color: "#00e5a0", svg: (c: string) => { const S = 18; const grid = [[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,1,0,1,1],[1,0,0,1,1,1,1,0,0,1],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,1,1,0,1],[0,0,1,1,0,0,1,1,0,0]]; const eyes = new Set([[2,3],[3,3],[2,4],[3,4],[6,3],[7,3],[6,4],[7,4]].map(([col,row]) => `${row}-${col}`)); let rects = ''; grid.forEach((row, r) => row.forEach((cell, col) => { if (!cell) return; const isEye = eyes.has(`${r}-${col}`); rects += `<rect x="${col*S}" y="${r*S}" width="${S}" height="${S}" fill="${isEye ? '#080808' : c}"/>`; })); return `<svg viewBox="0 0 ${10*S} ${12*S}" fill="none" shape-rendering="crispEdges" width="100%" height="100%">${rects}</svg>`; } },
  { name: "Sharp", desc: "Geometric", color: "#FF5733", svg: (c: string) => `<svg viewBox="0 0 200 220" fill="none" width="100%" height="100%"><path d="M100 20 L40 65 L35 185 L55 160 L75 185 L100 160 L125 185 L145 160 L165 185 L165 65 Z" fill="${c}" stroke-linejoin="miter"/><polygon points="75,80 88,115 62,115" fill="#080808"/><polygon points="125,80 138,115 112,115" fill="#080808"/></svg>` },
  { name: "Drip", desc: "Melting vibes", color: "#6B5CE7", svg: (c: string) => `<svg viewBox="0 0 200 240" fill="none" width="100%" height="100%"><path d="M100 18 C55 18 28 58 28 98 L28 170 Q30 180 38 178 Q46 175 48 185 Q50 195 58 193 Q66 190 68 200 Q70 210 78 207 L90 200 Q98 196 106 200 L118 207 Q126 210 128 200 Q130 190 138 193 Q146 195 148 185 Q150 175 158 178 Q166 180 168 170 L172 98 C172 58 145 18 100 18Z" fill="${c}"/><ellipse cx="82" cy="97" rx="14" ry="17" fill="#080808"/><ellipse cx="118" cy="97" rx="14" ry="17" fill="#080808"/></svg>` },
  { name: "Minimal", desc: "Ultra clean", color: "#FFD700", svg: (c: string) => `<svg viewBox="0 0 200 210" fill="none" width="100%" height="100%"><path d="M100 30 C62 30 42 62 42 92 L42 175 Q57 155 72 175 Q87 155 100 175 Q113 155 128 175 Q143 155 158 175 L158 92 C158 62 138 30 100 30Z" fill="${c}"/><circle cx="82" cy="90" r="11" fill="#080808"/><circle cx="118" cy="90" r="11" fill="#080808"/></svg>` },
  { name: "Haunted", desc: "Scary ghost", color: "#ff4f4f", svg: (c: string) => `<svg viewBox="0 0 200 230" fill="none" width="100%" height="100%"><path d="M100 15 C50 15 25 58 25 100 L25 190 L45 168 L65 190 L85 168 L100 182 L115 168 L135 190 L155 168 L175 190 L175 100 C175 58 150 15 100 15Z" fill="${c}"/><line x1="62" y1="78" x2="88" y2="88" stroke="#080808" stroke-width="5" stroke-linecap="round"/><line x1="138" y1="78" x2="112" y2="88" stroke="#080808" stroke-width="5" stroke-linecap="round"/><ellipse cx="80" cy="100" rx="13" ry="16" fill="#080808"/><ellipse cx="120" cy="100" rx="13" ry="16" fill="#080808"/><path d="M78 130 Q90 145 100 138 Q110 145 122 130" stroke="#080808" stroke-width="4" stroke-linecap="round" fill="none"/></svg>` },
  { name: "Dot", desc: "Halftone matrix", color: "#00BFFF", svg: (c: string) => { const R = 5.2, G = 13, COLS = 14, ROWS = 16; const mask = [[0,0,0,0,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,2,2,1,1,1],[1,1,1,2,2,1,1,1,1,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,1,1,1,0,0,1,1],[1,0,0,0,1,1,1,1,1,1,0,0,0,1],[0,0,0,0,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]]; let circles = ''; mask.forEach((row, r) => row.forEach((cell, col) => { if (!cell) return; circles += `<circle cx="${col*G+G/2}" cy="${r*G+G/2}" r="${R}" fill="${cell === 2 ? '#080808' : c}"/>`; })); return `<svg viewBox="0 0 ${COLS*G} ${ROWS*G}" fill="none" width="100%" height="100%">${circles}</svg>`; } },
  { name: "Pencil", desc: "Line drawing", color: "#FF8C00", svg: (c: string) => `<svg viewBox="0 0 200 220" fill="none" width="100%" height="100%"><path d="M100 22 C100 22 138 24 158 52 C174 74 172 100 172 118 L172 175 C172 178 168 176 165 172 C160 165 156 160 152 168 C148 176 145 180 140 174 C135 168 130 163 125 170 C120 177 115 180 110 175 C105 170 100 167 95 172 C90 177 86 178 82 173 C78 168 73 163 68 170 C63 177 58 176 56 172 C53 168 50 165 48 168 C44 171 40 176 36 172 L28 165 L28 118 C28 100 28 74 44 52 C60 28 100 22 100 22Z" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="80" cy="95" r="14" fill="none" stroke="${c}" stroke-width="2"/><circle cx="120" cy="95" r="14" fill="none" stroke="${c}" stroke-width="2"/><circle cx="80" cy="95" r="8" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/><circle cx="120" cy="95" r="8" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/></svg>` },
  { name: "Wiggly", desc: "Cartoon", color: "#DC143C", svg: (c: string) => `<svg viewBox="0 0 200 230" fill="none" width="100%" height="100%"><path d="M100 22 C58 22 30 60 30 100 C30 110 32 120 30 130 C28 140 32 150 30 160 C28 170 36 175 44 168 C52 161 56 172 64 178 C72 184 80 174 88 178 C96 182 104 180 112 176 C120 172 128 182 136 176 C144 170 150 160 158 168 C166 176 172 170 170 160 C168 150 172 140 170 130 C168 120 170 110 170 100 C170 60 142 22 100 22Z" fill="${c}"/><ellipse cx="80" cy="97" rx="13" ry="15" fill="#080808"/><ellipse cx="120" cy="97" rx="13" ry="15" fill="#080808"/></svg>` },
];

function ColorSwitcher({ colors, active, onChange }: { colors: string[]; active: string; onChange: (c: string) => void }) {
  return (
    <div className="color-switcher">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className="color-dot"
          style={{
            backgroundColor: color,
            outline: active === color ? `2px solid ${color}` : "none",
            outlineOffset: "2px",
          }}
          aria-label={`Switch to ${color} accent`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [accent, setAccent] = useState(ACCENT_COLORS[0]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  const marqueeCards = [...MARQUEE_STYLES, ...MARQUEE_STYLES];

  return (
    <>
      {/* Squiggly SVG filters for ghost title */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="squiggle-a" x="-5%" y="-20%" width="110%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.028 0.012" numOctaves={3} seed={1} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={4} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="squiggle-b" x="-5%" y="-20%" width="110%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.028 0.012" numOctaves={3} seed={5} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={5} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="squiggle-c" x="-5%" y="-20%" width="110%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.028 0.012" numOctaves={3} seed={9} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={3.5} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── NAV ────────────────────────────────────── */}
      <nav className="omg-nav">
        <div className="nav-logo">
          <svg className="logo-ghost" viewBox="0 0 200 220" fill="none">
            <path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z" fill={accent} />
            <ellipse cx="80" cy="95" rx="14" ry="17" fill="#0e0e0e" />
            <ellipse cx="120" cy="95" rx="14" ry="17" fill="#0e0e0e" />
          </svg>
          OMGHOST
          <span className="nav-badge">Beta</span>
        </div>
        <ul className="nav-links">
          <li><a href="/docs">API</a></li>
          <li><a href="#styles">Styles</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#studio">Studio</a></li>
          <li><a href="/docs">Docs</a></li>
        </ul>
        <ColorSwitcher colors={ACCENT_COLORS} active={accent} onChange={setAccent} />
      </nav>

      {/* ── HERO ───────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-kicker">oh my ghost</div>
        <h1 className="hero-title">
          Instant SVG Icons<br /><span className="accent-word">via API</span>
        </h1>
        <p className="hero-subtitle">
          Professional vector icons in seconds. Choose from 11 hand-crafted ghost styles.
          Pay $0.10 per image with x402 micropayments. No subscriptions, no accounts.
        </p>
        <div className="hero-actions">
          <a href="#studio" className="btn-primary">Open Studio →</a>
          <a href="/docs" className="btn-secondary">View API Docs</a>
        </div>
        <div className="hero-stat-row">
          <div className="hero-stat">
            <div className="hero-stat-num">11<span>+</span></div>
            <div className="hero-stat-label">Ghost Styles</div>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num"><span>$</span>0.10</div>
            <div className="hero-stat-label">Per Image</div>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">SVG</div>
            <div className="hero-stat-label">Vector Output</div>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">x402</div>
            <div className="hero-stat-label">Micropayments</div>
          </div>
        </div>
      </section>

      {/* ── STYLES MARQUEE ─────────────────────────── */}
      <div className="styles-section" id="styles">
        <div className="styles-label">11 hand-crafted ghost styles</div>
        <div style={{ overflow: "hidden" }}>
          <div className="styles-track">
            {marqueeCards.map((s, i) => (
              <div className="style-card" key={`${s.name}-${i}`}>
                <div className="style-card-icon" dangerouslySetInnerHTML={{ __html: s.svg(s.color) }} />
                <div className="style-card-name">{s.name}</div>
                <div className="style-card-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── API SECTION ────────────────────────────── */}
      <section id="api" style={{ background: "var(--offblack)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "100px 48px" }}>
        <div className="api-section">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-kicker">Simple Integration</div>
              <h2 className="section-title">One request.<br />Any icon.</h2>
              <p className="section-body">
                Hit our REST endpoint with a style name and optional brand details. Get back a production-ready SVG.
                No subscriptions &mdash; pay $0.10 per image with x402 micropayments baked into the protocol.
              </p>
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 28 }}>
                <div className="api-feature">
                  <div className="api-feature-icon">⚡</div>
                  <div>
                    <div className="api-feature-title">AI-powered generation</div>
                    <div className="api-feature-body">Describe your brand, pick a style. Our AI generates a unique SVG icon tailored to your needs.</div>
                  </div>
                </div>
                <div className="api-feature">
                  <div className="api-feature-icon">💳</div>
                  <div>
                    <div className="api-feature-title">x402 micropayments</div>
                    <div className="api-feature-body">Pay per image with HTTP 402. No API keys, no quotas, no billing portals. $0.10 per request.</div>
                  </div>
                </div>
                <div className="api-feature">
                  <div className="api-feature-icon">🎨</div>
                  <div>
                    <div className="api-feature-title">11 unique styles</div>
                    <div className="api-feature-body">Classic, pixel, sharp, drip, minimal, haunted, and more. Each style has its own AI system prompt for consistent results.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="code-filename">generate-icon.js</span>
                <span />
              </div>
              <div className="code-body">
                <div><span className="c-comment">// 1. Generate an icon</span></div>
                <div><span className="c-key">const</span> <span className="c-obj">res</span> = <span className="c-key">await</span> <span className="c-method">fetch</span>(<span className="c-str">&apos;https://omghost.xyz/api/generate&apos;</span>, {"{"}</div>
                <div>&nbsp;&nbsp;<span className="c-key">method</span>: <span className="c-str">&apos;POST&apos;</span>,</div>
                <div>&nbsp;&nbsp;<span className="c-key">headers</span>: {"{"} <span className="c-str">&apos;Content-Type&apos;</span>: <span className="c-str">&apos;application/json&apos;</span> {"}"},</div>
                <div>&nbsp;&nbsp;<span className="c-key">body</span>: <span className="c-method">JSON.stringify</span>({"{"}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-key">styleName</span>: <span className="c-str">&quot;neon-glow&quot;</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-key">brandName</span>: <span className="c-str">&quot;My Startup&quot;</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-key">brandVoice</span>: <span className="c-str">&quot;modern, bold&quot;</span>,</div>
                <div>&nbsp;&nbsp;{"}"})</div>
                <div>{"}"});</div>
                <div>&nbsp;</div>
                <div><span className="c-key">const</span> {"{"} <span className="c-obj">jobId</span> {"}"} = <span className="c-key">await</span> <span className="c-obj">res</span>.<span className="c-method">json</span>();</div>
                <div>&nbsp;</div>
                <div><span className="c-comment">// 2. Poll for completion</span></div>
                <div><span className="c-key">const</span> <span className="c-obj">status</span> = <span className="c-key">await</span> <span className="c-method">fetch</span>(</div>
                <div>&nbsp;&nbsp;<span className="c-str">{"`"}https://omghost.xyz/api/generate/${"{"}<span className="c-obj">jobId</span>{"}"}/<span className="c-obj">status</span>{"`"}</span></div>
                <div>);</div>
                <div><span className="c-key">const</span> {"{"} <span className="c-obj">svg</span>, <span className="c-obj">token</span> {"}"} = <span className="c-key">await</span> <span className="c-obj">status</span>.<span className="c-method">json</span>();</div>
                <div><span className="c-comment">// → svg: &quot;&lt;svg viewBox=...&quot;</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GHOST STUDIO ─────────────────────────── */}
      <div className="studio-section" id="studio">
        <div className="studio-header">
          <div className="section-kicker">Ghost Studio</div>
          <h2 className="section-title">Design your icon.<br />Export the code.</h2>
          <p className="section-body" style={{ margin: "0 auto", textAlign: "center" }}>
            Explore all 11 styles, mix custom colors, adjust strokes &mdash; then copy the API call to drop into your project.
          </p>
        </div>
        <div className="studio-embed">
          <GhostStudio />
        </div>
      </div>

      {/* ── PRICING ────────────────────────────────── */}
      <section id="pricing" style={{ padding: "100px 48px" }}>
        <div className="pricing-section">
          <div className="section-kicker" style={{ textAlign: "center" }}>Pricing</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Pay for what<br />you use.</h2>
          <p className="section-body" style={{ margin: "0 auto", textAlign: "center", maxWidth: 480 }}>
            No subscriptions. No annual commitments. x402 micropayments mean you pay exactly per image generated.
          </p>

          <div className="pricing-grid" style={{ maxWidth: 420, margin: "0 auto" }}>
            <div className="pricing-card featured">
              <div className="pricing-tag">Simple Pricing</div>
              <div className="pricing-tier">Per Image</div>
              <div className="pricing-price">$0.10<sub>/image</sub></div>
              <div className="pricing-detail">SVG &amp; PNG · Pay as you go</div>
              <ul className="pricing-features">
                <li>All 11 ghost styles</li>
                <li>AI-powered SVG generation</li>
                <li>Full color customization</li>
                <li>Production-ready SVG &amp; PNG output</li>
                <li>No accounts · No API keys</li>
                <li>x402 micropayments · Instant settlement</li>
              </ul>
              <a href="/docs" className="pricing-btn pricing-btn-filled">View API Docs</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer className="omg-footer">
        <div>
          <div className="footer-logo">
            <svg className="logo-ghost" viewBox="0 0 200 220" fill="none">
              <path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z" fill="var(--accent)" />
              <ellipse cx="80" cy="95" rx="14" ry="17" fill="#0e0e0e" />
              <ellipse cx="120" cy="95" rx="14" ry="17" fill="#0e0e0e" />
            </svg>
            OMGHOST
          </div>
          <div className="footer-tagline">Oh my ghost. SVG icons via API.</div>
        </div>
        <div className="footer-links">
          <a href="/docs">API Docs</a>
          <a href="https://github.com/desplega-ai/x402-logo">GitHub</a>
          <a href="#studio">Studio</a>
        </div>
        <div className="footer-copy">&copy; 2026 omghost &middot; Built with x402</div>
      </footer>
    </>
  );
}
