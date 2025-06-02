// app/api/generate-message/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    return NextResponse.json(
      { error: "API key not configured." },
      { status: 500 }
    );
  }

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required." },
      { status: 400 }
    );
  }

  // ✅ Correct endpoint with Gemini 1.5 Flash (recommended for cost/speed)
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user", // 👈 Best practice to set role
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Gemini API error response:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch from Gemini API.", details: errorData.error?.message || errorData },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      return NextResponse.json({
        result: "No content generated or unexpected response structure.",
      });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in /api/generate-message:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
