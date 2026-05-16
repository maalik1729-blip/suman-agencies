import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Suman Tech Automation — Premium Furniture & Electronics",
    template: "%s | Suman Tech Automation",
  },
  description:
    "Discover Suman Tech Automation's curated collection of premium furniture and smart electronics. Elevate your living space with timeless design and cutting-edge technology.",
  keywords: [
    "premium furniture",
    "smart electronics",
    "luxury home decor",
    "OLED TV",
    "designer sofa",
    "home interiors",
    "Suman Tech Automation",
  ],
  authors: [{ name: "Suman Tech Automation" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Suman Tech Automation",
    title: "Suman Tech Automation — Premium Furniture & Electronics",
    description:
      "Elevate your living space with Suman Tech Automation's premium furniture and smart electronics collection.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suman Tech Automation — Premium Furniture & Electronics",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a6fa5",
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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
