import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pimp My SVG — AI-Powered SVG Logo Generation",
  description:
    "Generate professional SVG logos instantly with AI. Choose from battle-tested styles, describe your brand, get a pixel-perfect vector. Pay per request with x402.",
  keywords: [
    "SVG logo",
    "logo generation",
    "AI logo",
    "vector logo",
    "x402",
    "pimpmysvg",
    "API-first",
  ],
  openGraph: {
    title: "Pimp My SVG — AI-Powered SVG Logo Generation",
    description:
      "Professional SVG logos in seconds. Battle-tested styles, pay-per-request with x402.",
    type: "website",
    url: "https://pimpmysvg.xyz",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
