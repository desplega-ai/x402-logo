"use client";

import { useState, useEffect } from "react";

const COLORS = [
  "#EBEBEB",
  "#CCFF00",
  "#C283D7",
  "#FF8178",
  "#58FF05",
  "#759BDB",
];

const LOGO_PRICE = "$0.30";
const BATCH_PRICE = "$2.40";
const BATCH_COUNT = 10;

const STYLES = [
  {
    name: "Pixel Icons",
    description:
      "Chunky, retro pixel-art icons with vivid diagonal gradients on a black canvas.",
    bgColor: "#EBEBEB",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" class="w-full h-full"><rect width="160" height="160" fill="#EBEBEB"/><rect x="50" y="70" width="10" height="10" fill="#000"/><rect x="60" y="70" width="10" height="10" fill="#000"/><rect x="70" y="70" width="10" height="10" fill="#000"/><rect x="80" y="70" width="10" height="10" fill="#000"/><rect x="90" y="70" width="10" height="10" fill="#000"/><rect x="40" y="80" width="10" height="10" fill="#000"/><rect x="50" y="80" width="10" height="10" fill="#000"/><rect x="60" y="80" width="10" height="10" fill="#000"/><rect x="70" y="80" width="10" height="10" fill="#000"/><rect x="80" y="80" width="10" height="10" fill="#000"/><rect x="90" y="80" width="10" height="10" fill="#000"/><rect x="100" y="80" width="10" height="10" fill="#000"/><rect x="40" y="90" width="10" height="10" fill="#000"/><rect x="50" y="90" width="10" height="10" fill="#000"/><rect x="60" y="90" width="10" height="10" fill="#000"/><rect x="70" y="90" width="10" height="10" fill="#000"/><rect x="80" y="90" width="10" height="10" fill="#000"/><rect x="90" y="90" width="10" height="10" fill="#000"/><rect x="100" y="90" width="10" height="10" fill="#000"/><rect x="40" y="100" width="10" height="10" fill="#000"/><rect x="50" y="100" width="10" height="10" fill="#000"/><rect x="60" y="100" width="10" height="10" fill="#000"/><rect x="70" y="100" width="10" height="10" fill="#000"/><rect x="80" y="100" width="10" height="10" fill="#000"/><rect x="90" y="100" width="10" height="10" fill="#000"/><rect x="100" y="100" width="10" height="10" fill="#000"/><rect x="50" y="110" width="10" height="10" fill="#000"/><rect x="60" y="110" width="10" height="10" fill="#000"/><rect x="70" y="110" width="10" height="10" fill="#000"/><rect x="80" y="110" width="10" height="10" fill="#000"/><rect x="90" y="110" width="10" height="10" fill="#000"/><rect x="110" y="80" width="10" height="10" fill="#000"/><rect x="120" y="90" width="10" height="10" fill="#000"/><rect x="120" y="100" width="10" height="10" fill="#000"/><rect x="110" y="110" width="10" height="10" fill="#000"/><rect x="100" y="110" width="10" height="10" fill="#000"/><rect x="60" y="30" width="10" height="10" fill="#000"/><rect x="60" y="40" width="10" height="10" fill="#000"/><rect x="70" y="20" width="10" height="10" fill="#000"/><rect x="70" y="30" width="10" height="10" fill="#000"/><rect x="80" y="30" width="10" height="10" fill="#000"/><rect x="80" y="40" width="10" height="10" fill="#000"/></svg>`,
  },
  {
    name: "Neon Solid",
    description:
      "Bold gradient-filled icons with negative-space details on solid black.",
    bgColor: "#000000",
    svgHtml: null,
  },
  {
    name: "Minimalist Two-Tone",
    description:
      "Bold circles with graphic cutout symbols in a single saturated color on black.",
    bgColor: "#000000",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="w-full h-full"><rect width="250" height="250" fill="#000000"/><g transform="translate(25, 25)"><circle cx="100" cy="100" r="100" fill="#CCFF00"/><path d="M100,10 Q105,95 190,100 Q105,105 100,190 Q95,105 10,100 Q95,95 100,10Z" fill="#000000"/></g></svg>`,
  },
  {
    name: "FUI",
    description:
      "Sci-fi HUD-style icons with technical arcs, crosshairs, and angular stroke geometry.",
    bgColor: "#000000",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full h-full" fill="none"><rect width="64" height="64" fill="#000"/><circle cx="32" cy="32" r="26" stroke="#00FFD1" stroke-width="1" stroke-dasharray="2, 4" opacity="0.3" /><path d="M12 4H4v8M52 4h8v8M12 60H4v-8M52 60h8v-8" stroke="#00FFD1" stroke-width="1.5" stroke-linecap="square" /><path d="M32 12 A20 20 0 0 1 52 32" stroke="#00FFD1" stroke-width="2" stroke-linecap="butt" /><path d="M32 52 A20 20 0 0 1 12 32" stroke="#00FFD1" stroke-width="2" stroke-linecap="butt" /><circle cx="32" cy="32" r="14" stroke="#00FFD1" stroke-width="1" stroke-dasharray="8, 3" opacity="0.6" /><line x1="32" y1="28" x2="32" y2="36" stroke="#00FFD1" stroke-width="1.5" /><line x1="28" y1="32" x2="36" y2="32" stroke="#00FFD1" stroke-width="1.5" /><line x1="32" y1="8" x2="32" y2="10" stroke="#00FFD1" stroke-width="1.5" /><line x1="32" y1="54" x2="32" y2="56" stroke="#00FFD1" stroke-width="1.5" /><line x1="8" y1="32" x2="10" y2="32" stroke="#00FFD1" stroke-width="1.5" /><line x1="54" y1="32" x2="56" y2="32" stroke="#00FFD1" stroke-width="1.5" /><polyline points="22,22 32,32 42,22" stroke="#00FFD1" stroke-width="1" opacity="0.8" /></svg>`,
  },
  {
    name: "Dotmatrix",
    description:
      "Retro LED-style icons built entirely from uniform dot grids on dark charcoal.",
    bgColor: "#1a1a1a",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" class="w-full h-full"><rect width="160" height="160" fill="#1a1a1a"/><g fill="#FFFFFF"><circle cx="55" cy="25" r="3.5" /><circle cx="65" cy="25" r="3.5" /><circle cx="95" cy="25" r="3.5" /><circle cx="105" cy="25" r="3.5" /><circle cx="45" cy="35" r="3.5" /><circle cx="55" cy="35" r="3.5" /><circle cx="65" cy="35" r="3.5" /><circle cx="75" cy="35" r="3.5" /><circle cx="85" cy="35" r="3.5" /><circle cx="95" cy="35" r="3.5" /><circle cx="105" cy="35" r="3.5" /><circle cx="115" cy="35" r="3.5" /><circle cx="45" cy="45" r="3.5" /><circle cx="55" cy="45" r="3.5" /><circle cx="65" cy="45" r="3.5" /><circle cx="75" cy="45" r="3.5" /><circle cx="85" cy="45" r="3.5" /><circle cx="95" cy="45" r="3.5" /><circle cx="105" cy="45" r="3.5" /><circle cx="115" cy="45" r="3.5" /><circle cx="55" cy="55" r="3.5" /><circle cx="65" cy="55" r="3.5" /><circle cx="75" cy="55" r="3.5" /><circle cx="85" cy="55" r="3.5" /><circle cx="95" cy="55" r="3.5" /><circle cx="105" cy="55" r="3.5" /><circle cx="55" cy="65" r="3.5" /><circle cx="65" cy="65" r="3.5" /><circle cx="75" cy="65" r="3.5" /><circle cx="85" cy="65" r="3.5" /><circle cx="95" cy="65" r="3.5" /><circle cx="105" cy="65" r="3.5" /><circle cx="65" cy="75" r="3.5" /><circle cx="75" cy="75" r="3.5" /><circle cx="85" cy="75" r="3.5" /><circle cx="95" cy="75" r="3.5" /><circle cx="65" cy="85" r="3.5" /><circle cx="75" cy="85" r="3.5" /><circle cx="85" cy="85" r="3.5" /><circle cx="95" cy="85" r="3.5" /><circle cx="75" cy="95" r="3.5" /><circle cx="85" cy="95" r="3.5" /><circle cx="75" cy="105" r="3.5" /><circle cx="85" cy="105" r="3.5" /></g></svg>`,
  },
  {
    name: "Colorblock Badge",
    description:
      "Bold flat icons on vivid color-blocked square backgrounds with strong contrast.",
    bgColor: "#A0C4FF",
    svgHtml: `<svg viewBox="0 0 64 64" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#1e40af"/><path d="M32 14C32 14 46 18 46 28V38C46 44 32 50 32 50C32 50 18 44 18 38V28C18 18 32 14 32 14Z" fill="#fff"/><path d="M26 33L30 37L38 29" stroke="#1e40af" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: "Glassmorphism",
    description:
      "Frosted-glass layered icons with translucent panels and soft rounded strokes.",
    bgColor: "#0F1118",
    svgHtml: `<svg viewBox="0 0 64 64" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#0F1118"/><circle cx="20" cy="44" r="10" fill="#3D4A70" fill-opacity="0.06"/><rect x="8" y="8" width="48" height="48" rx="10" fill="#FFFFFF" fill-opacity="0.15" stroke="#C0D8FF" stroke-width="1.2" stroke-opacity="0.6"/><rect x="12" y="12" width="40" height="40" rx="8" fill="#FFFFFF" fill-opacity="0.08"/><rect x="14" y="10" width="36" height="2" rx="1" fill="#FFFFFF" fill-opacity="0.12"/><path d="M32 25C28.134 25 25 28.134 25 32C25 35.866 28.134 39 32 39C35.866 39 39 35.866 39 32C39 28.134 35.866 25 32 25ZM32 19L32 22M32 42L32 45M41.1924 22.8076L39.0711 24.9289M24.9289 39.0711L22.8076 41.1924M45 32H42M22 32H19M41.1924 41.1924L39.0711 39.0711M24.9289 24.9289L22.8076 22.8076" stroke="#A8CFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: "Neon Glow / Cyberpunk",
    description:
      "Vivid neon-tube stroke icons with glowing halos on deep black backgrounds.",
    bgColor: "#050510",
    svgHtml: `<svg viewBox="0 0 64 64" class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="64" height="64" fill="#050510"/><g filter="url(#glow)" stroke="#00AAFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="32" cy="32" r="28" /><circle cx="32" cy="32" r="1" /><path d="M 32,8 L 40,32 L 32,56 L 24,32 Z" /><line x1="10" y1="10" x2="16" y2="16" /><line x1="54" y1="10" x2="48" y2="16" /><line x1="10" y1="54" x2="16" y2="48" /><line x1="54" y1="54" x2="48" y2="48" /></g></svg>`,
  },
];

const API_SNIPPET = `// 1. List available styles
const styles = await fetch("https://api.pimpmysvg.xyz/styles");

// 2. Generate your SVG icon
const res = await fetch("https://api.pimpmysvg.xyz/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-402-Payment": payment_token
  },
  body: JSON.stringify({
    style: "fui",
    brand: "My Startup",
    voice: "modern, bold, tech-forward"
  })
});

const { svg, token } = await res.json();
// token lets you re-download or leave a review later

// 3. Re-download anytime
const asset = await fetch(\`https://api.pimpmysvg.xyz/asset/\${token}\`);

// 4. Review & earn up to 30% back
await fetch("https://api.pimpmysvg.xyz/rate", {
  method: "POST",
  body: JSON.stringify({ token, rating: 5, feedback: "Perfect!" })
});`;

function ColorSwitcher({
  colors,
  active,
  onChange,
}: {
  colors: string[];
  active: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className="w-3 h-3 rounded-sm transition-transform hover:scale-125"
          style={{
            backgroundColor: color,
            outline: active === color ? `2px solid ${color}` : "none",
            outlineOffset: "2px",
          }}
          aria-label={`Switch to ${color} theme`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [fg, setFg] = useState(COLORS[0]);

  useEffect(() => {
    document.documentElement.style.setProperty("--fg", fg);
  }, [fg]);

  return (
    <div className="min-h-screen" style={{ color: fg }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          borderColor: `${fg}15`,
          backgroundColor: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-black text-lg tracking-tight">
            Pimp My SVG
          </span>
          <div className="flex items-center gap-6">
            <div
              className="hidden sm:flex items-center gap-6 text-sm font-medium"
              style={{ color: `${fg}99` }}
            >
              <a
                href="#styles"
                className="hover:opacity-100 transition-opacity"
              >
                Styles
              </a>
              <a
                href="#pricing"
                className="hover:opacity-100 transition-opacity"
              >
                Pricing
              </a>
              <a href="#api" className="hover:opacity-100 transition-opacity">
                API
              </a>
              <a
                href="#api"
                className="px-4 py-1.5 rounded-lg text-black font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: fg }}
              >
                Get Started
              </a>
            </div>
            <ColorSwitcher colors={COLORS} active={fg} onChange={setFg} />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-sm font-medium mb-8"
            style={{ borderColor: `${fg}30`, color: `${fg}99` }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: fg }}
            />
            Powered by x402 micropayments
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            Instant SVG Icons
            <br />
            <span style={{ color: fg, opacity: 0.6 }}>via API</span>
          </h1>

          <p
            className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: `${fg}80` }}
          >
            Professional vector icons in seconds. Choose from 8 hand-crafted
            styles — pixel art, neon glow, FUI, glassmorphism, and more. Pay per
            request with x402 micropayments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#api"
              className="px-8 py-4 font-bold rounded-xl text-black text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: fg }}
            >
              Pimp My Icons
            </a>
            <a
              href="#styles"
              className="px-8 py-4 font-bold rounded-xl border text-lg transition-opacity hover:opacity-80"
              style={{ borderColor: `${fg}30`, color: `${fg}99` }}
            >
              See the Drip
            </a>
          </div>

          {/* Hero visual — style grid preview */}
          <div className="relative max-w-3xl mx-auto">
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-10"
              style={{ backgroundColor: fg }}
            />
            <div
              className="relative rounded-2xl p-6 sm:p-8 border"
              style={{ borderColor: `${fg}20`, backgroundColor: `${fg}08` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `${fg}40` }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `${fg}25` }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `${fg}15` }}
                />
                <span
                  className="ml-3 text-sm font-mono"
                  style={{ color: `${fg}50` }}
                >
                  8 styles available
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3 py-4">
                {STYLES.slice(0, 8).map((style) => (
                  <div
                    key={style.name}
                    className="aspect-square rounded-lg overflow-hidden"
                    style={{ backgroundColor: style.bgColor }}
                  >
                    {style.svgHtml ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: style.svgHtml }}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-green-400">
                        <span className="text-white/60 text-xs font-mono">
                          {style.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div
                className="text-center text-sm font-mono"
                style={{ color: `${fg}50` }}
              >
                Hand-crafted by Tam &mdash; 8 unique icon styles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ backgroundColor: `${fg}05` }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Three Steps. Zero Hassle. All Drip.
          </h2>
          <p
            className="text-center mb-16 text-lg"
            style={{ color: `${fg}70` }}
          >
            No accounts. No waiting. Just icons.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Pick Your Flavor",
                description:
                  "Browse 8 hand-crafted icon styles — from retro pixel art to futuristic HUD interfaces.",
              },
              {
                step: "02",
                title: "Tell Us What You Want",
                description:
                  "Tell us what you need — a rocket, a shield, a brain. Our AI generates it in your chosen style.",
              },
              {
                step: "03",
                title: "Grab Your SVG",
                description:
                  "Receive a production-ready SVG icon instantly. Scales infinitely, works everywhere.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-8 border transition-colors"
                style={{ borderColor: `${fg}15` }}
              >
                <div
                  className="text-5xl font-black mb-4"
                  style={{ color: `${fg}25` }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="leading-relaxed" style={{ color: `${fg}70` }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles Showcase */}
      <section id="styles" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            8 Styles. All Heat.
          </h2>
          <p
            className="text-center mb-16 text-lg max-w-2xl mx-auto"
            style={{ color: `${fg}70` }}
          >
            Each style has its own personality and system prompt. Pick the vibe
            that fits your brand.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLES.map((style) => (
              <div
                key={style.name}
                className="group rounded-2xl border p-4 transition-all hover:border-opacity-40"
                style={{ borderColor: `${fg}15` }}
              >
                <div
                  className="w-full aspect-square rounded-xl overflow-hidden mb-4"
                  style={{ backgroundColor: style.bgColor }}
                >
                  {style.svgHtml ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: style.svgHtml }}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-green-400 flex items-center justify-center">
                      <svg
                        viewBox="0 0 80 80"
                        className="w-16 h-16 text-white/80"
                      >
                        <rect
                          x="10"
                          y="10"
                          width="60"
                          height="60"
                          rx="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="15"
                          fill="currentColor"
                          opacity="0.4"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm">{style.name}</h3>
                  <span
                    className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${fg}15`, color: fg }}
                  >
                    {LOGO_PRICE}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: `${fg}60` }}>
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / x402 */}
      <section
        id="pricing"
        className="py-20 px-6"
        style={{ backgroundColor: `${fg}05` }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            No Subscriptions. No BS.
          </h2>
          <p
            className="text-center mb-16 text-lg max-w-2xl mx-auto"
            style={{ color: `${fg}70` }}
          >
            No subscriptions. No credits to buy. Just pay for each icon with
            x402 micropayments and get instant access.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* x402 Explainer */}
            <div
              className="rounded-2xl border p-8"
              style={{ borderColor: `${fg}15` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${fg}15` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke={fg}
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">What is x402?</h3>
              <p
                className="leading-relaxed mb-4"
                style={{ color: `${fg}70` }}
              >
                x402 is an open protocol for HTTP-native micropayments. Instead
                of API keys and billing, you pay per request with crypto —
                instantly, programmatically, and without accounts.
              </p>
              <ul className="space-y-2">
                {[
                  "Zero signup — just pay and go",
                  "Only pay for what you actually use",
                  "Instant settlement, every single time",
                  "Works with any HTTP client on earth",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: `${fg}80` }}
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={fg}
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Simple Pricing */}
            <div
              className="rounded-2xl border p-8"
              style={{ borderColor: `${fg}15` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${fg}15` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke={fg}
                  strokeWidth="2"
                >
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Straight-Up Pricing</h3>
              <div className="text-center py-6">
                <div className="text-5xl font-extrabold mb-1">
                  {LOGO_PRICE}
                </div>
                <div style={{ color: `${fg}70` }}>per icon, any style</div>
              </div>
              <div
                className="mt-4 p-4 rounded-xl border"
                style={{
                  borderColor: `${fg}25`,
                  backgroundColor: `${fg}08`,
                }}
              >
                <p className="text-sm font-semibold">
                  We pay for your opinion
                </p>
                <p className="text-sm mt-1" style={{ color: `${fg}70` }}>
                  Leave a review and get up to 30% back on your spend.
                </p>
              </div>
            </div>

            {/* Batch Pricing */}
            <div
              className="rounded-2xl border-2 p-8 relative"
              style={{ borderColor: `${fg}40` }}
            >
              <div
                className="absolute -top-3 left-6 px-3 py-0.5 text-black text-xs font-bold rounded-full"
                style={{ backgroundColor: fg }}
              >
                BEST VALUE
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${fg}15` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke={fg}
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Batch — {BATCH_COUNT} Icons
              </h3>
              <div className="text-center py-6">
                <div className="text-5xl font-extrabold mb-1">
                  {BATCH_PRICE}
                </div>
                <div style={{ color: `${fg}70` }}>
                  for {BATCH_COUNT} icons (
                  {`$${(2.4 / BATCH_COUNT).toFixed(2)}`}
                  /each)
                </div>
              </div>
              <div
                className="mt-4 p-4 rounded-xl border"
                style={{
                  borderColor: `${fg}25`,
                  backgroundColor: `${fg}08`,
                }}
              >
                <p className="text-sm font-semibold">Save 20% on bulk</p>
                <p className="text-sm mt-1" style={{ color: `${fg}70` }}>
                  Generate {BATCH_COUNT} variations in one API call. Same
                  quality, lower price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Docs Preview */}
      <section id="api" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            The API is Stupid Simple
          </h2>
          <p
            className="text-center mb-12 text-lg"
            style={{ color: `${fg}70` }}
          >
            Four endpoints. Here&apos;s everything you need.
          </p>

          {/* Endpoints summary */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                method: "GET",
                path: "/styles",
                desc: "Browse the drip",
              },
              {
                method: "POST",
                path: "/generate",
                desc: "Mint your icon",
              },
              {
                method: "GET",
                path: "/asset/:token",
                desc: "Grab it again",
              },
              {
                method: "POST",
                path: "/rate",
                desc: "Rate it, get paid",
              },
            ].map((ep) => (
              <div
                key={ep.path}
                className="rounded-xl p-4 border"
                style={{ borderColor: `${fg}15` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${fg}15`,
                      color: fg,
                    }}
                  >
                    {ep.method}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: `${fg}80` }}
                  >
                    {ep.path}
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: `${fg}60` }}>
                  {ep.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Code block */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-5"
              style={{ backgroundColor: fg }}
            />
            <div
              className="relative rounded-2xl border overflow-hidden"
              style={{ borderColor: `${fg}15` }}
            >
              <div
                className="flex items-center gap-2 px-6 py-3 border-b"
                style={{ borderColor: `${fg}10` }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `${fg}40` }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `${fg}25` }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `${fg}15` }}
                />
                <span
                  className="ml-3 text-sm font-mono"
                  style={{ color: `${fg}40` }}
                >
                  example.ts
                </span>
              </div>
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                <code className="font-mono" style={{ color: `${fg}80` }}>
                  {API_SNIPPET}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Review Reward */}
      <section className="py-20 px-6" style={{ backgroundColor: `${fg}05` }}>
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ backgroundColor: `${fg}15` }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
              stroke={fg}
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Paid to Have Opinions
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: `${fg}70` }}
          >
            Your feedback makes our icons better. Leave a review on any icon you
            generate and get up to 30% back on your spend. Every review helps us
            improve — and puts money back in your pocket.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Get your icon",
              "Drop a rating (be honest)",
              "Collect up to 30% back",
            ].map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium"
                style={{ borderColor: `${fg}15` }}
              >
                <span
                  className="w-6 h-6 text-black rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: fg }}
                >
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Your Next Icon is One
            <br />
            <span style={{ opacity: 0.6 }}>API Call Away</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: `${fg}70` }}>
            No signup. No credit card. Just x402 and your creativity.
          </p>
          <a
            href="#api"
            className="inline-flex px-10 py-5 font-bold rounded-xl text-black text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: fg }}
          >
            Pimp My Icons Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-12 px-6"
        style={{ borderColor: `${fg}15` }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-sm">Pimp My SVG</span>
          <p className="text-sm" style={{ color: `${fg}40` }}>
            pimpmysvg.xyz — Pay-per-use SVG icon generation via x402.
          </p>
        </div>
      </footer>
    </div>
  );
}
