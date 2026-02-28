import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oh My Ghost — AI-Powered Ghost SVG Generation",
  description:
    "Generate custom ghost SVGs instantly with AI. Choose from 10 unique styles, customize colors, and download production-ready vectors. Pay per request with x402.",
  keywords: [
    "ghost SVG",
    "SVG generation",
    "AI ghost",
    "vector ghost",
    "x402",
    "omghost",
    "API-first",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Oh My Ghost — AI-Powered Ghost SVG Generation",
    description:
      "Custom ghost SVGs in seconds. 10 unique styles, pay-per-request with x402.",
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
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
