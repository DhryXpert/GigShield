import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI GigShield — Income Protection for Delivery Partners",
  description:
    "AI-powered parametric insurance that protects Blinkit delivery partners from income loss. Dynamic weekly pricing, automated claims, instant UPI payouts.",
  keywords: [
    "gig worker insurance",
    "parametric insurance",
    "Blinkit delivery partner",
    "income protection",
    "AI insurance",
    "GigShield",
  ],
  authors: [{ name: "DhryXpert" }],
  openGraph: {
    title: "AI GigShield — Income Protection for Delivery Partners",
    description:
      "AI-powered parametric insurance that protects gig workers from income loss due to weather, traffic, and disruptions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
