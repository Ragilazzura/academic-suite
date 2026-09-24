import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Inisialisasi SDK Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const systemInstruction = "You are an expert Indonesian curriculum designer. Generate a highly structured 'Modul Ajar' (lesson plan) strictly aligned with the Merdeka Curriculum framework for the SMA (Sekolah Menengah Atas) level. Include specific learning objectives (Capaian Pembelajaran), core materials, interactive activities, and a final assessment rubric. Provide the output in Markdown format.";

    // Memanggil model Gemini 3.1 Flash Lite
    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Create a Modul Ajar for the following topic: ${topic}`,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Failed to generate lesson plan" }, { status: 500 });
  }
}