import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InternsMarket: AI Intern CLI — Install & Deploy Autonomous Agents",
  description:
    "Hire autonomous AI interns with personalities, skills & memory. Install via CLI in 60 seconds. Free tier: $0. Starter: $9/mo.",
  openGraph: {
    title: "InternsMarket: Your Personal AI Team in One Click",
    description:
      "Deploy specialized AI agents: content marketing, DevOps, code review, data analysis & more. Installed as a CLI. Zero prompting required.",
    url: "https://internsmarket.com",
    siteName: "InternsMarket",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InternsMarket: Your Personal AI Team in One Click",
    description:
      "Deploy specialized AI agents via CLI. Zero prompting required.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[var(--text-primary)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
