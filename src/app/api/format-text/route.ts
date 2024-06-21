import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text, rephrase } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const instructions = `
    Format the following text to make it easier to read with bold text, headings, bullet points, numbered lists, etc.
    ${
      rephrase
        ? "Rephrase the text to improve clarity."
        : "Keep the text the exact same as the original. Your role is only to format the text."
    }
    Format the text.

    Do not include emojis.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `${instructions}\n\n${text}` },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return NextResponse.json({
      formattedText: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error formatting text:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
