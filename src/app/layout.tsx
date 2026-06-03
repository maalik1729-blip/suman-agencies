import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.brand} — Premium Furniture & Electronics`,
    template: `%s | ${site.brand}`,
  },
  description: site.tagline,
  keywords: [
    "premium furniture",
    "smart electronics",
    "home decor",
    "designer sofa",
    "OLED TV",
    "Tirunelveli",
    "Worldwide",
    site.brand,
  ],
  authors: [{ name: site.brand }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.brand,
    title: `${site.brand} — Premium Furniture & Electronics`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — Premium Furniture & Electronics`,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@500;600&display=swap"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
