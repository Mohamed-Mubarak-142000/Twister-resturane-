import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "تويستر كريبس وبيتزا | Twister Crepes & Pizza",
    template: "%s | تويستر كريبس وبيتزا",
  },
  description:
    "أشهى البيتزا والكريبات في مصر — توصيل سريع، مكونات طازجة، طعم خرافي. اطلب دلوقتي!",
  keywords: [
    "بيتزا",
    "كريبات",
    "برجر",
    "توصيل أكل",
    "مصر",
    "pizza",
    "crepes",
    "delivery",
  ],
  authors: [{ name: "Twister Crepes & Pizza" }],
  creator: "Twister Crepes & Pizza",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://twisterpizza.vercel.app",
    siteName: "تويستر كريبس وبيتزا",
    title: "تويستر كريبس وبيتزا | طعم خرافي في كل لقمة",
    description: "أشهى البيتزا والكريبات في مصر — توصيل سريع، مكونات طازجة",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Twister Crepes & Pizza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تويستر كريبس وبيتزا",
    description: "أشهى البيتزا والكريبات في مصر",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#D62828",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0F0F0F] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
