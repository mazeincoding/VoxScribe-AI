"use client";

import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import Image from "next/image";

export default function OgImagePage() {
  const ogImageRef = useRef<HTMLDivElement>(null);

  const captureOgImage = async () => {
    if (ogImageRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(ogImageRef.current, {
          quality: 0.95,
        });

        // Create a temporary link element
        const link = document.createElement("a");
        link.download = "prettyspeech-og-image.png";
        link.href = dataUrl;

        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error capturing OG image:", error);
        alert("Failed to capture OG image. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={ogImageRef}
        className="w-[1200px] h-[630px] bg-white flex flex-col justify-start p-12"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.svg" width={40} height={40} alt="Logo" />
            <h1 className="text-4xl font-bold text-gray-900">PrettySpeech</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-between items-center flex-grow">
          {/* Left side: Text content */}
          <div className="max-w-[500px] space-y-6">
            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Speak Freely, <span className="text-primary">Read Easily</span>
            </h2>
            <p className="text-xl text-gray-600">
              Transform your speech into beautifully formatted text with
              AI-powered transcription.
            </p>
            <div className="flex space-x-4">
              <div className="bg-primary text-white px-8 py-3 rounded-lg font-semibold">
                Try Now
              </div>
            </div>
          </div>

          {/* Right side: Visual representation */}
          <div className="relative">
            <div className="absolute -top-16 -left-16 w-[400px] h-[250px] bg-gray-100 rounded-lg shadow-lg transform rotate-6"></div>
            <div className="relative w-[400px] h-[250px] bg-white rounded-lg shadow-xl p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Transcription Result
                </h3>
                <p className="text-gray-700">It's really important to:</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Focus on key project aspects</li>
                  <li>Hit all the right notes</li>
                </ul>
              </div>
              <div className="absolute bottom-4 left-6 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm text-gray-500">AI Powered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save OG Image Button */}
      <button
        className="mt-8 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        onClick={captureOgImage}
      >
        Save OG Image
      </button>
    </div>
  );
}
