"use client";

import { useState, useEffect } from "react";
import GhostStudio from "./ghost-studio";

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

const API_SNIPPET = `// 1. List available ghost styles
const styles = await fetch("https://api.omghost.xyz/styles");

// 2. Generate your ghost SVG
const res = await fetch("https://api.omghost.xyz/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-402-Payment": payment_token
  },
  body: JSON.stringify({
    style: "classic",
    brand: "My Startup",
    voice: "modern, bold, tech-forward"
  })
});

const { svg, token } = await res.json();
// token lets you re-download or leave a review later

// 3. Re-download anytime
const asset = await fetch(\`https://api.omghost.xyz/asset/\${token}\`);

// 4. Review & earn up to 30% back
await fetch("https://api.omghost.xyz/rate", {
  method: "POST",
  body: JSON.stringify({ token, rating: 5, feedback: "Perfect!" })
});`;

function GhostLogo({ color, size = 32 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" width={size} height={size}>
      <path
        d="M100 12 C60 12 28 42 28 85 L28 155 C28 162 32 165 36 160 Q44 148 52 156 Q60 164 68 156 Q76 148 84 156 Q92 164 100 156 Q108 164 116 156 Q124 148 132 156 Q140 164 148 156 Q156 148 164 160 C168 165 172 162 172 155 L172 85 C172 42 140 12 100 12Z"
        fill={color}
      />
      <ellipse cx="76" cy="88" rx="16" ry="20" fill="black" />
      <ellipse cx="124" cy="88" rx="16" ry="20" fill="black" />
    </svg>
  );
}

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
          <div className="flex items-center gap-3">
            <GhostLogo color={fg} size={28} />
            <span className="font-black text-lg tracking-tight">
              Oh My Ghost
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div
              className="hidden sm:flex items-center gap-6 text-sm font-medium"
              style={{ color: `${fg}99` }}
            >
              <a
                href="#studio"
                className="hover:opacity-100 transition-opacity"
              >
                Studio
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

          {/* Hero ghost logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div
                className="absolute inset-0 blur-3xl opacity-20 rounded-full"
                style={{ backgroundColor: fg }}
              />
              <GhostLogo color={fg} size={140} />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            Oh My Ghost
          </h1>

          <p
            className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: `${fg}80` }}
          >
            Generate custom ghost SVGs instantly. 10 unique styles to choose
            from — classic, pixel, drip, haunted, and more. Design your perfect
            ghost in the studio or generate via API.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#studio"
              className="px-8 py-4 font-bold rounded-xl text-black text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: fg }}
            >
              Open Ghost Studio
            </a>
            <a
              href="#api"
              className="px-8 py-4 font-bold rounded-xl border text-lg transition-opacity hover:opacity-80"
              style={{ borderColor: `${fg}30`, color: `${fg}99` }}
            >
              View API
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ backgroundColor: `${fg}05` }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Three Steps. Zero Hassle.
          </h2>
          <p
            className="text-center mb-16 text-lg"
            style={{ color: `${fg}70` }}
          >
            No accounts. No waiting. Just ghosts.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Pick Your Style",
                description:
                  "Choose from 10 ghost styles — classic, pixel, drip, haunted, minimal, and more.",
              },
              {
                step: "02",
                title: "Customize It",
                description:
                  "Use the Ghost Studio to pick colors, adjust strokes, and preview your ghost in real time.",
              },
              {
                step: "03",
                title: "Generate & Download",
                description:
                  "Generate production-ready SVG ghosts via API. Scales infinitely, works everywhere.",
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

      {/* Ghost Studio */}
      <section id="studio" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Ghost Studio
          </h2>
          <p
            className="text-center mb-12 text-lg max-w-2xl mx-auto"
            style={{ color: `${fg}70` }}
          >
            Design your perfect ghost. Pick a style, choose your colors, and see
            it come to life in real time.
          </p>
          <GhostStudio accentColor={fg} />
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
            No subscriptions. No credits to buy. Just pay for each ghost with
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
                <div style={{ color: `${fg}70` }}>per ghost, any style</div>
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
                Batch — {BATCH_COUNT} Ghosts
              </h3>
              <div className="text-center py-6">
                <div className="text-5xl font-extrabold mb-1">
                  {BATCH_PRICE}
                </div>
                <div style={{ color: `${fg}70` }}>
                  for {BATCH_COUNT} ghosts (
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
                desc: "Browse ghost styles",
              },
              {
                method: "POST",
                path: "/generate",
                desc: "Create your ghost",
              },
              {
                method: "GET",
                path: "/asset/:token",
                desc: "Download again",
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
            Your feedback makes our ghosts better. Leave a review on any ghost
            you generate and get up to 30% back on your spend. Every review
            helps us improve — and puts money back in your pocket.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Get your ghost",
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
          <div className="flex justify-center mb-8">
            <GhostLogo color={fg} size={80} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Your Next Ghost is One
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
            Generate Ghosts Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-12 px-6"
        style={{ borderColor: `${fg}15` }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GhostLogo color={fg} size={20} />
            <span className="font-bold text-sm">Oh My Ghost</span>
          </div>
          <p className="text-sm" style={{ color: `${fg}40` }}>
            omghost.xyz — Pay-per-use ghost SVG generation via x402.
          </p>
        </div>
      </footer>
    </div>
  );
}
