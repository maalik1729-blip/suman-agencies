import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Suman Agency — Premium Furniture & Electronics",
    template: "%s | Suman Agency",
  },
  description:
    "Discover Suman Agency's curated collection of premium furniture and smart electronics. Elevate your living space with timeless design and cutting-edge technology.",
  keywords: [
    "premium furniture",
    "smart electronics",
    "luxury home decor",
    "OLED TV",
    "designer sofa",
    "home interiors",
    "Suman Agency",
  ],
  authors: [{ name: "Suman Agency" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Suman Agency",
    title: "Suman Agency — Premium Furniture & Electronics",
    description:
      "Elevate your living space with Suman Agency's premium furniture and smart electronics collection.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suman Agency — Premium Furniture & Electronics",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
