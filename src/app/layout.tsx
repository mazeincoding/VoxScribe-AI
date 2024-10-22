import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrettySpeech",
  description:
    "PrettySpeech: Transform your speech into beautifully formatted text with AI-powered transcription.",
  openGraph: {
    title: "PrettySpeech",
    description:
      "PrettySpeech: Transform your speech into beautifully formatted text with AI-powered transcription.",
    images: [
      {
        url: "https://prettyspeech.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PrettySpeech Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrettySpeech",
    description:
      "AI-powered transcription app that turns audio into perfectly-formatted text.",
    images: ["https://prettyspeech.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
