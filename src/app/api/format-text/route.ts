import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { text, model = "llama3-70b-8192", language = "en" } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const instructions = `
    Format the following text to make it easier to read with bold text, headings, bullet points, numbered lists, etc.
    Keep the text in its original language (${language}).
    Your role is only to format the text. Do not translate or change any words.
    Formatting is only line break, bold, and all the others I don't want to have to mention again.
    Format the text while keeping it exactly as before with the same exact words, and no additional words unless strictly necessary.
    Do not include emojis. Only include the formatted text in your response. Do not include any additional text.
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `${instructions}\n\n${text}` },
      ],
      model,
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return NextResponse.json({
      formattedText: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Error formatting text:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
