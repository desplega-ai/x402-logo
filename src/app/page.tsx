const LOGO_PRICE = "$0.30";
const BATCH_PRICE = "$2.40";
const BATCH_COUNT = 10;

const STYLES = [
  {
    name: "Geometric Minimal",
    description: "Clean shapes, bold simplicity. Think Airbnb, Mastercard.",
    rating: 0,
    ratingCount: 0,
    color: "from-blue-500 to-cyan-400",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect
          x="10"
          y="10"
          width="60"
          height="60"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle cx="40" cy="40" r="18" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="40" r="10" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Lettermark Bold",
    description: "Typography-driven marks. Think HBO, IBM, NASA.",
    rating: 0,
    ratingCount: 0,
    color: "from-violet-500 to-purple-400",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <text
          x="40"
          y="55"
          textAnchor="middle"
          fontSize="40"
          fontWeight="900"
          fill="currentColor"
        >
          Ab
        </text>
      </svg>
    ),
  },
  {
    name: "Abstract Gradient",
    description: "Fluid forms with depth. Think Instagram, Firefox.",
    rating: 0,
    ratingCount: 0,
    color: "from-pink-500 to-orange-400",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="35" r="20" fill="url(#grad1)" />
        <circle cx="50" cy="45" r="20" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Line Art",
    description: "Elegant continuous strokes. Think Squarespace, Medium.",
    rating: 0,
    ratingCount: 0,
    color: "from-emerald-500 to-teal-400",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
        <path
          d="M15 60 Q40 10 65 60"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M25 55 Q40 25 55 55"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    name: "Emblem Classic",
    description: "Badge-style authority. Think Porsche, Starbucks.",
    rating: 0,
    ratingCount: 0,
    color: "from-amber-500 to-yellow-400",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle
          cx="40"
          cy="40"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text
          x="40"
          y="46"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="currentColor"
        >
          ★
        </text>
      </svg>
    ),
  },
  {
    name: "Wordmark Modern",
    description: "Custom type, unforgettable. Think Google, Spotify.",
    rating: 0,
    ratingCount: 0,
    color: "from-rose-500 to-red-400",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <text
          x="40"
          y="48"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="currentColor"
          letterSpacing="-1"
        >
          logo
        </text>
        <line
          x1="15"
          y1="56"
          x2="65"
          y2="56"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
        />
      </svg>
    ),
  },
];

const API_SNIPPET = `// 1. List available styles
const styles = await fetch("https://api.x402.logo/styles", {
  headers: { "X-402-Payment": payment_token }
});

// 2. Generate your logo
const res = await fetch("https://api.x402.logo/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-402-Payment": payment_token
  },
  body: JSON.stringify({
    style: "geometric-minimal",
    brand: "My Startup",
    voice: "modern, bold, tech-forward"
  })
});

const { svg, token } = await res.json();
// token lets you re-download or leave a review later

// 3. Re-download anytime
const asset = await fetch(\`https://api.x402.logo/asset/\${token}\`);

// 4. Review & earn up to 30% back
await fetch("https://api.x402.logo/rate", {
  method: "POST",
  body: JSON.stringify({ token, rating: 5, feedback: "Perfect!" })
});`;

function StarRating({
  rating,
  ratingCount,
}: {
  rating: number;
  ratingCount: number;
}) {
  if (!rating || rating === 0 || !ratingCount || ratingCount === 0) {
    return null;
  }
  return (
    <span className="inline-flex items-center gap-1 text-sm text-amber-500 font-medium">
      {"★".repeat(Math.floor(rating))}
      <span className="text-gray-400 ml-1">
        {rating} ({ratingCount})
      </span>
    </span>
  );
}

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
              x402<span className="text-brand-500">.logo</span>
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
            Instant SVG Logos
            <br />
            <span className="bg-gradient-to-r from-brand-500 via-accent-500 to-brand-600 bg-clip-text text-transparent">
              via API
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional vector logos in seconds. Choose from battle-tested
            industry styles, describe your brand, and get a pixel-perfect SVG.
            Pay per request — no signup, no subscription.
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

          {/* Hero visual — animated SVG showcase */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-200 via-accent-200 to-brand-200 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-gray-950 rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-gray-500 text-sm font-mono">
                  response.svg
                </span>
              </div>
              <div className="flex items-center justify-center py-8">
                <svg
                  viewBox="0 0 200 80"
                  className="w-full max-w-md"
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="heroGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="2"
                    y="10"
                    width="60"
                    height="60"
                    rx="14"
                    fill="url(#heroGrad)"
                  />
                  <text
                    x="32"
                    y="50"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="800"
                    fill="white"
                  >
                    X
                  </text>
                  <text
                    x="80"
                    y="52"
                    fontSize="32"
                    fontWeight="800"
                    fill="white"
                    letterSpacing="-1"
                  >
                    acme
                  </text>
                  <text
                    x="80"
                    y="66"
                    fontSize="10"
                    fill="#6b7280"
                    letterSpacing="3"
                  >
                    INDUSTRIES
                  </text>
                </svg>
              </div>
              <div className="text-center text-gray-500 text-sm font-mono">
                &lt;svg&gt; — 2.4 KB — Generated in 1.2s
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Three Steps to Your Logo
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg">
            No accounts. No waiting. Just logos.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose a Style",
                description:
                  "Browse our curated collection of battle-tested logo styles inspired by the world's top brands.",
                gradient: "from-brand-500 to-blue-400",
              },
              {
                step: "02",
                title: "Describe Your Brand",
                description:
                  "Tell us your brand name and voice — modern, playful, corporate, minimal. We handle the rest.",
                gradient: "from-accent-500 to-purple-400",
              },
              {
                step: "03",
                title: "Get Your SVG",
                description:
                  "Receive a production-ready SVG logo instantly. Scales infinitely, works everywhere.",
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
            Battle-Tested Styles
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg max-w-2xl mx-auto">
            Every style is inspired by logos that built billion-dollar brands.
            Choose one and make it yours.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STYLES.map((style) => (
              <div
                key={style.name}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-full aspect-square rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center text-white mb-5`}
                >
                  {style.icon}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{style.name}</h3>
                  <span className="text-sm font-mono font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    {LOGO_PRICE}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3">
                  {style.description}
                </p>
                <StarRating
                  rating={style.rating}
                  ratingCount={style.ratingCount}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / x402 */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Pay Per Logo. That&apos;s It.
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg max-w-2xl mx-auto">
            No subscriptions. No credits to buy. Just pay for each logo with
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
                <div className="text-gray-500">per logo, any style</div>
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
              <h3 className="text-xl font-bold mb-3">Batch — {BATCH_COUNT} Logos</h3>
              <div className="text-center py-6">
                <div className="text-5xl font-extrabold text-gray-900 mb-1">
                  {BATCH_PRICE}
                </div>
                <div className="text-gray-500">
                  for {BATCH_COUNT} logos ({`$${(2.40 / BATCH_COUNT).toFixed(2)}`}/each)
                </div>
              </div>
              <div className="mt-4 p-4 bg-brand-50 rounded-xl border border-brand-200">
                <p className="text-sm font-semibold text-brand-800">
                  Save 20% on bulk
                </p>
                <p className="text-sm text-brand-600 mt-1">
                  Generate {BATCH_COUNT} variations in one API call. Same quality, lower price.
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
            Five endpoints. Here&apos;s everything you need.
          </p>

          {/* Endpoints summary */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              {
                method: "GET",
                path: "/styles",
                desc: "List all styles",
              },
              {
                method: "POST",
                path: "/generate",
                desc: "Generate a logo",
              },
              {
                method: "POST",
                path: "/generate/batch",
                desc: "Batch generate",
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
            Your feedback makes our logos better. Leave a review on any logo
            you generate and get up to 30% back on your spend. Every review
            helps us improve — and puts money back in your pocket.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Generate a logo",
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
            Your Next Logo is One
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
            Get Your Logo Now
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
              x402<span className="text-brand-500">.logo</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Built with x402 protocol. Pay-per-use SVG logo generation.
          </p>
        </div>
      </footer>
    </div>
  );
}
