const LOGO_PRICE = "$0.30";
const BATCH_PRICE = "$2.40";
const BATCH_COUNT = 10;

const STYLES = [
  {
    name: "Pixel Icons",
    description:
      "Chunky, retro pixel-art icons with vivid diagonal gradients on a black canvas.",
    color: "from-pink-500 to-orange-400",
    bgColor: "#EBEBEB",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" class="w-full h-full"><rect width="160" height="160" fill="#EBEBEB"/><rect x="50" y="70" width="10" height="10" fill="#000"/><rect x="60" y="70" width="10" height="10" fill="#000"/><rect x="70" y="70" width="10" height="10" fill="#000"/><rect x="80" y="70" width="10" height="10" fill="#000"/><rect x="90" y="70" width="10" height="10" fill="#000"/><rect x="40" y="80" width="10" height="10" fill="#000"/><rect x="50" y="80" width="10" height="10" fill="#000"/><rect x="60" y="80" width="10" height="10" fill="#000"/><rect x="70" y="80" width="10" height="10" fill="#000"/><rect x="80" y="80" width="10" height="10" fill="#000"/><rect x="90" y="80" width="10" height="10" fill="#000"/><rect x="100" y="80" width="10" height="10" fill="#000"/><rect x="40" y="90" width="10" height="10" fill="#000"/><rect x="50" y="90" width="10" height="10" fill="#000"/><rect x="60" y="90" width="10" height="10" fill="#000"/><rect x="70" y="90" width="10" height="10" fill="#000"/><rect x="80" y="90" width="10" height="10" fill="#000"/><rect x="90" y="90" width="10" height="10" fill="#000"/><rect x="100" y="90" width="10" height="10" fill="#000"/><rect x="40" y="100" width="10" height="10" fill="#000"/><rect x="50" y="100" width="10" height="10" fill="#000"/><rect x="60" y="100" width="10" height="10" fill="#000"/><rect x="70" y="100" width="10" height="10" fill="#000"/><rect x="80" y="100" width="10" height="10" fill="#000"/><rect x="90" y="100" width="10" height="10" fill="#000"/><rect x="100" y="100" width="10" height="10" fill="#000"/><rect x="50" y="110" width="10" height="10" fill="#000"/><rect x="60" y="110" width="10" height="10" fill="#000"/><rect x="70" y="110" width="10" height="10" fill="#000"/><rect x="80" y="110" width="10" height="10" fill="#000"/><rect x="90" y="110" width="10" height="10" fill="#000"/><rect x="110" y="80" width="10" height="10" fill="#000"/><rect x="120" y="90" width="10" height="10" fill="#000"/><rect x="120" y="100" width="10" height="10" fill="#000"/><rect x="110" y="110" width="10" height="10" fill="#000"/><rect x="100" y="110" width="10" height="10" fill="#000"/><rect x="60" y="30" width="10" height="10" fill="#000"/><rect x="60" y="40" width="10" height="10" fill="#000"/><rect x="70" y="20" width="10" height="10" fill="#000"/><rect x="70" y="30" width="10" height="10" fill="#000"/><rect x="80" y="30" width="10" height="10" fill="#000"/><rect x="80" y="40" width="10" height="10" fill="#000"/></svg>`,
  },
  {
    name: "Neon Solid",
    description:
      "Bold gradient-filled icons with negative-space details on solid black.",
    color: "from-yellow-400 to-green-400",
    bgColor: "#000000",
    svgHtml: null,
  },
  {
    name: "Minimalist Two-Tone",
    description:
      "Bold circles with graphic cutout symbols in a single saturated color on black.",
    color: "from-lime-400 to-lime-300",
    bgColor: "#000000",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="w-full h-full"><rect width="250" height="250" fill="#000000"/><g transform="translate(25, 25)"><circle cx="100" cy="100" r="100" fill="#CCFF00"/><path d="M100,10 Q105,95 190,100 Q105,105 100,190 Q95,105 10,100 Q95,95 100,10Z" fill="#000000"/></g></svg>`,
  },
  {
    name: "FUI",
    description:
      "Sci-fi HUD-style icons with technical arcs, crosshairs, and angular stroke geometry.",
    color: "from-cyan-400 to-teal-300",
    bgColor: "#000000",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full h-full" fill="none"><rect width="64" height="64" fill="#000"/><circle cx="32" cy="32" r="26" stroke="#00FFD1" stroke-width="1" stroke-dasharray="2, 4" opacity="0.3" /><path d="M12 4H4v8M52 4h8v8M12 60H4v-8M52 60h8v-8" stroke="#00FFD1" stroke-width="1.5" stroke-linecap="square" /><path d="M32 12 A20 20 0 0 1 52 32" stroke="#00FFD1" stroke-width="2" stroke-linecap="butt" /><path d="M32 52 A20 20 0 0 1 12 32" stroke="#00FFD1" stroke-width="2" stroke-linecap="butt" /><circle cx="32" cy="32" r="14" stroke="#00FFD1" stroke-width="1" stroke-dasharray="8, 3" opacity="0.6" /><line x1="32" y1="28" x2="32" y2="36" stroke="#00FFD1" stroke-width="1.5" /><line x1="28" y1="32" x2="36" y2="32" stroke="#00FFD1" stroke-width="1.5" /><line x1="32" y1="8" x2="32" y2="10" stroke="#00FFD1" stroke-width="1.5" /><line x1="32" y1="54" x2="32" y2="56" stroke="#00FFD1" stroke-width="1.5" /><line x1="8" y1="32" x2="10" y2="32" stroke="#00FFD1" stroke-width="1.5" /><line x1="54" y1="32" x2="56" y2="32" stroke="#00FFD1" stroke-width="1.5" /><polyline points="22,22 32,32 42,22" stroke="#00FFD1" stroke-width="1" opacity="0.8" /></svg>`,
  },
  {
    name: "Dotmatrix",
    description:
      "Retro LED-style icons built entirely from uniform dot grids on dark charcoal.",
    color: "from-gray-200 to-gray-400",
    bgColor: "#1a1a1a",
    svgHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" class="w-full h-full"><rect width="160" height="160" fill="#1a1a1a"/><g fill="#FFFFFF"><circle cx="55" cy="25" r="3.5" /><circle cx="65" cy="25" r="3.5" /><circle cx="95" cy="25" r="3.5" /><circle cx="105" cy="25" r="3.5" /><circle cx="45" cy="35" r="3.5" /><circle cx="55" cy="35" r="3.5" /><circle cx="65" cy="35" r="3.5" /><circle cx="75" cy="35" r="3.5" /><circle cx="85" cy="35" r="3.5" /><circle cx="95" cy="35" r="3.5" /><circle cx="105" cy="35" r="3.5" /><circle cx="115" cy="35" r="3.5" /><circle cx="45" cy="45" r="3.5" /><circle cx="55" cy="45" r="3.5" /><circle cx="65" cy="45" r="3.5" /><circle cx="75" cy="45" r="3.5" /><circle cx="85" cy="45" r="3.5" /><circle cx="95" cy="45" r="3.5" /><circle cx="105" cy="45" r="3.5" /><circle cx="115" cy="45" r="3.5" /><circle cx="55" cy="55" r="3.5" /><circle cx="65" cy="55" r="3.5" /><circle cx="75" cy="55" r="3.5" /><circle cx="85" cy="55" r="3.5" /><circle cx="95" cy="55" r="3.5" /><circle cx="105" cy="55" r="3.5" /><circle cx="55" cy="65" r="3.5" /><circle cx="65" cy="65" r="3.5" /><circle cx="75" cy="65" r="3.5" /><circle cx="85" cy="65" r="3.5" /><circle cx="95" cy="65" r="3.5" /><circle cx="105" cy="65" r="3.5" /><circle cx="65" cy="75" r="3.5" /><circle cx="75" cy="75" r="3.5" /><circle cx="85" cy="75" r="3.5" /><circle cx="95" cy="75" r="3.5" /><circle cx="65" cy="85" r="3.5" /><circle cx="75" cy="85" r="3.5" /><circle cx="85" cy="85" r="3.5" /><circle cx="95" cy="85" r="3.5" /><circle cx="75" cy="95" r="3.5" /><circle cx="85" cy="95" r="3.5" /><circle cx="75" cy="105" r="3.5" /><circle cx="85" cy="105" r="3.5" /></g></svg>`,
  },
  {
    name: "Colorblock Badge",
    description:
      "Bold flat icons on vivid color-blocked square backgrounds with strong contrast.",
    color: "from-blue-500 to-indigo-400",
    bgColor: "#A0C4FF",
    svgHtml: `<svg viewBox="0 0 64 64" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#1e40af"/><path d="M32 14C32 14 46 18 46 28V38C46 44 32 50 32 50C32 50 18 44 18 38V28C18 18 32 14 32 14Z" fill="#fff"/><path d="M26 33L30 37L38 29" stroke="#1e40af" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: "Glassmorphism",
    description:
      "Frosted-glass layered icons with translucent panels and soft rounded strokes.",
    color: "from-blue-300 to-purple-300",
    bgColor: "#0F1118",
    svgHtml: `<svg viewBox="0 0 64 64" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#0F1118"/><circle cx="20" cy="44" r="10" fill="#3D4A70" fill-opacity="0.06"/><rect x="8" y="8" width="48" height="48" rx="10" fill="#FFFFFF" fill-opacity="0.15" stroke="#C0D8FF" stroke-width="1.2" stroke-opacity="0.6"/><rect x="12" y="12" width="40" height="40" rx="8" fill="#FFFFFF" fill-opacity="0.08"/><rect x="14" y="10" width="36" height="2" rx="1" fill="#FFFFFF" fill-opacity="0.12"/><path d="M32 25C28.134 25 25 28.134 25 32C25 35.866 28.134 39 32 39C35.866 39 39 35.866 39 32C39 28.134 35.866 25 32 25ZM32 19L32 22M32 42L32 45M41.1924 22.8076L39.0711 24.9289M24.9289 39.0711L22.8076 41.1924M45 32H42M22 32H19M41.1924 41.1924L39.0711 39.0711M24.9289 24.9289L22.8076 22.8076" stroke="#A8CFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: "Neon Glow / Cyberpunk",
    description:
      "Vivid neon-tube stroke icons with glowing halos on deep black backgrounds.",
    color: "from-blue-400 to-cyan-300",
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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-lg">
              Pimp My <span className="text-brand-500">SVG</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#styles" className="hover:text-gray-900 transition-colors">
              Styles
            </a>
            <a
              href="#pricing"
              className="hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a href="#api" className="hover:text-gray-900 transition-colors">
              API
            </a>
            <a
              href="#api"
              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-sm font-medium text-brand-700 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Powered by x402 micropayments
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Instant SVG Icons
            <br />
            <span className="bg-gradient-to-r from-brand-500 via-accent-500 to-brand-600 bg-clip-text text-transparent">
              via API
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional vector icons in seconds. Choose from 8 hand-crafted
            styles — pixel art, neon glow, FUI, glassmorphism, and more. Pay per
            request with x402 micropayments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#api"
              className="px-8 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-500/25 text-lg"
            >
              Try the API
            </a>
            <a
              href="#styles"
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-lg"
            >
              Browse Styles
            </a>
          </div>

          {/* Hero visual — style grid preview */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-200 via-accent-200 to-brand-200 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-gray-950 rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-gray-500 text-sm font-mono">
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
                      <div
                        className={`w-full h-full bg-gradient-to-br ${style.color} flex items-center justify-center`}
                      >
                        <span className="text-white/60 text-xs font-mono">
                          {style.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-gray-500 text-sm font-mono">
                Hand-crafted by Tam &mdash; 8 unique icon styles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Three Steps to Your Icon
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg">
            No accounts. No waiting. Just icons.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose a Style",
                description:
                  "Browse 8 hand-crafted icon styles — from retro pixel art to futuristic HUD interfaces.",
                gradient: "from-brand-500 to-blue-400",
              },
              {
                step: "02",
                title: "Describe Your Icon",
                description:
                  "Tell us what you need — a rocket, a shield, a brain. Our AI generates it in your chosen style.",
                gradient: "from-accent-500 to-purple-400",
              },
              {
                step: "03",
                title: "Get Your SVG",
                description:
                  "Receive a production-ready SVG icon instantly. Scales infinitely, works everywhere.",
                gradient: "from-emerald-500 to-teal-400",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-colors hover:shadow-lg"
              >
                <div
                  className={`text-5xl font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent mb-4`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">
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
            8 Hand-Crafted Styles
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg max-w-2xl mx-auto">
            Each style has its own personality and system prompt. Pick the vibe
            that fits your brand.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLES.map((style) => (
              <div
                key={style.name}
                className="group relative bg-white rounded-2xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-xl transition-all"
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
                    <div
                      className={`w-full h-full bg-gradient-to-br ${style.color} flex items-center justify-center`}
                    >
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
                  <span className="text-xs font-mono font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    {LOGO_PRICE}
                  </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / x402 */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Pay Per Icon. That&apos;s It.
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg max-w-2xl mx-auto">
            No subscriptions. No credits to buy. Just pay for each icon with
            x402 micropayments and get instant access.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* x402 Explainer */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-brand-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">What is x402?</h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                x402 is an open protocol for HTTP-native micropayments. Instead
                of API keys and billing, you pay per request with crypto —
                instantly, programmatically, and without accounts.
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  "No signup or API keys required",
                  "Pay exactly what you use",
                  "Instant settlement on every request",
                  "Works with any HTTP client",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-emerald-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Simple Flat Pricing</h3>
              <div className="text-center py-6">
                <div className="text-5xl font-extrabold text-gray-900 mb-1">
                  {LOGO_PRICE}
                </div>
                <div className="text-gray-500">per icon, any style</div>
              </div>
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-800">
                  We pay for your opinion
                </p>
                <p className="text-sm text-emerald-600 mt-1">
                  Leave a review and get up to 30% back on your spend.
                </p>
              </div>
            </div>

            {/* Batch Pricing */}
            <div className="bg-white rounded-2xl border-2 border-brand-200 p-8 relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-600 text-white text-xs font-bold rounded-full">
                BEST VALUE
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-brand-600"
                  fill="none"
                  stroke="currentColor"
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
                <div className="text-5xl font-extrabold text-gray-900 mb-1">
                  {BATCH_PRICE}
                </div>
                <div className="text-gray-500">
                  for {BATCH_COUNT} icons (
                  {`$${(2.4 / BATCH_COUNT).toFixed(2)}`}
                  /each)
                </div>
              </div>
              <div className="mt-4 p-4 bg-brand-50 rounded-xl border border-brand-200">
                <p className="text-sm font-semibold text-brand-800">
                  Save 20% on bulk
                </p>
                <p className="text-sm text-brand-600 mt-1">
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
            Dead Simple API
          </h2>
          <p className="text-gray-500 text-center mb-12 text-lg">
            Four endpoints. Here&apos;s everything you need.
          </p>

          {/* Endpoints summary */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                method: "GET",
                path: "/styles",
                desc: "List all styles",
              },
              {
                method: "POST",
                path: "/generate",
                desc: "Generate an icon",
              },
              {
                method: "GET",
                path: "/asset/:token",
                desc: "Re-download SVG",
              },
              {
                method: "POST",
                path: "/rate",
                desc: "Review & earn reward",
              },
            ].map((ep) => (
              <div
                key={ep.path}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      ep.method === "GET"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-brand-100 text-brand-700"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs text-gray-700">
                    {ep.path}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{ep.desc}</p>
              </div>
            ))}
          </div>

          {/* Code block */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-200 via-accent-200 to-brand-200 rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-gray-500 text-sm font-mono">
                  example.ts
                </span>
              </div>
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                <code className="text-gray-300 font-mono">{API_SNIPPET}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Review Reward */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            We Pay for Your Opinion
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Your feedback makes our icons better. Leave a review on any icon you
            generate and get up to 30% back on your spend. Every review helps us
            improve — and puts money back in your pocket.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Generate an icon",
              "Leave a review (1-5 stars)",
              "Get up to 30% back",
            ].map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-200 text-sm font-medium"
              >
                <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
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
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Your Next Icon is One
            <br />
            <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
              API Call Away
            </span>
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            No signup. No credit card. Just x402 and your creativity.
          </p>
          <a
            href="#api"
            className="inline-flex px-10 py-5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-500/25 text-lg"
          >
            Get Your Icon Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-sm">
              Pimp My <span className="text-brand-500">SVG</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Built with x402 protocol. Pay-per-use SVG icon generation.
          </p>
        </div>
      </footer>
    </div>
  );
}
