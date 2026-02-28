import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "omghost — Instant SVG Icons via API",
  description:
    "Professional vector icons in seconds. Choose from 11 hand-crafted styles. Pay per request with x402 micropayments. $0.10 per image.",
  keywords: [
    "SVG icons",
    "icon generation",
    "AI icons",
    "vector icons",
    "x402",
    "omghost",
    "API-first",
    "micropayments",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "omghost — Instant SVG Icons via API",
    description:
      "Professional SVG icons in seconds. 11 hand-crafted styles, pay-per-request with x402.",
    type: "website",
    url: "https://omghost.xyz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
