import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import fetch from "node-fetch";
import LanguageDetect from "languagedetect";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const lngDetector = new (LanguageDetect as any)();

const languageMap: { [key: string]: string } = {
  english: "en",
  german: "de",
  french: "fr",
  spanish: "es",
  italian: "it",
};

export async function POST(req: NextRequest) {
  const {
    audioURL,
    model = "whisper-large-v3",
    language = "auto",
  } = await req.json();

  if (!audioURL) {
    return NextResponse.json(
      { error: "Audio URL is required" },
      { status: 400 }
    );
  }

  try {
    const audioResponse = await fetch(audioURL);
    if (!audioResponse.ok) {
      throw new Error("Failed to fetch audio file");
    }
    const audioBuffer = await audioResponse.buffer();

    const file = new File([audioBuffer], "audio.mp3", { type: "audio/mpeg" });

    const response = await groq.audio.transcriptions.create({
      file,
      model,
      language: language === "auto" ? undefined : languageMap[language] || "en",
    });

    let detectedLanguage = "en";
    if (language === "auto") {
      const detectedLangs = lngDetector.detect(response.text);
      detectedLanguage = detectedLangs[0]?.[0] || "english";
    } else {
      detectedLanguage = language;
    }

    const mappedLanguage = languageMap[detectedLanguage.toLowerCase()] || "en";

    return NextResponse.json({
      transcription: response.text,
      detectedLanguage: mappedLanguage,
    });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
