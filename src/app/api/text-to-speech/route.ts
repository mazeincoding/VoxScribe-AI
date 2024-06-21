import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fetch from "node-fetch"; // Ensure you have node-fetch installed

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { audioURL } = await req.json();

  if (!audioURL) {
    return NextResponse.json(
      { error: "Audio URL is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the audio file from the URL
    const audioResponse = await fetch(audioURL);
    if (!audioResponse.ok) {
      throw new Error("Failed to fetch audio file");
    }
    const audioBuffer = await audioResponse.buffer();

    // Create a file-like object from the buffer
    const file = new File([audioBuffer], "audio.mp3", { type: "audio/mpeg" });

    const response = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
    });

    return NextResponse.json({ transcription: response.text });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
