// src/app/api/ai/idea/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo", // o gpt-4
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 300,
      })      
  })

  const data = await response.json()
  const text = data?.choices?.[0]?.message?.content?.trim() || "Sin respuesta"
  return NextResponse.json({ result: text })
}
