import { NextRequest, NextResponse } from "next/server";
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { text, model = "llama3-70b-8192" } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const instructions = "Generate a concise and descriptive title for the following text. Do not use any emojis or quotes/double quotes. Only have the title in your response.";

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Do not use any emojis in your responses.",
        },
        { role: "user", content: `${instructions}\n\n${text}` },
      ],
      model,
      temperature: 0.7,
      max_tokens: 50,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return NextResponse.json({
      title: chatCompletion.choices[0]?.message?.content?.trim() || "Untitled",
    });
  } catch (error) {
    console.error("Error generating title:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
