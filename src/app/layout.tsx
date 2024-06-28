import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoxScribe",
  description:
    "VoxScribe - an AI powered transcription app that turns audio into perfectly-formatted text.",
  openGraph: {
    title: "VoxScribe",
    description:
      "AI-powered transcription app that turns audio into perfectly-formatted text.",
    images: [
      {
        url: "https://voxscribe-ai.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoxScribe Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoxScribe",
    description:
      "AI-powered transcription app that turns audio into perfectly-formatted text.",
    images: ["https://voxscribe-ai.vercel.app/og-image.png"],
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
