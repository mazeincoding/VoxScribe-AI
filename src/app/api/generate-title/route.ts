import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const instructions =
    "Generate a concise and descriptive title for the following text. Do not use any emojis or special characters:";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Do not use any emojis in your responses.",
        },
        { role: "user", content: `${instructions}\n\n${text}` },
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    return NextResponse.json({
      title: response.choices[0].message.content?.trim() || "Untitled",
    });
  } catch (error) {
    console.error("Error generating title:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
