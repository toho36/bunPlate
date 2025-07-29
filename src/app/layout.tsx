import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { env } from "@/lib/env";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: env.NEXT_PUBLIC_APP_NAME,
    template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Bun",
    "Vercel",
    "Web Application",
    "Boilerplate",
  ],
  authors: [
    {
      name: "BunPlate",
      url: env.NEXT_PUBLIC_APP_URL,
    },
  ],
  creator: "BunPlate",
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_APP_URL,
    title: env.NEXT_PUBLIC_APP_NAME,
    description: env.NEXT_PUBLIC_APP_DESCRIPTION,
    siteName: env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: env.NEXT_PUBLIC_APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: env.NEXT_PUBLIC_APP_NAME,
    description: env.NEXT_PUBLIC_APP_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@bunplate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}