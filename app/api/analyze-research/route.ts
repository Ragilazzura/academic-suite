import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { textData, analysisType } = await req.json();

    let systemInstruction = "You are an expert academic research assistant.";
    
    if (analysisType === "thematic") {
      systemInstruction += " Analyze the provided interview transcript or qualitative data. Extract the main themes, provide bullet points of key findings, and format the output cleanly in Markdown.";
    } else {
      // Kita menambahkan instruksi larangan penggunaan simbol '—' di akhir kalimat ini
      systemInstruction += " Review the provided academic text. Refine the language to meet high-tier journal standards (Academic English), correct any grammatical issues, and explain briefly what was improved. Use Markdown format. Strictly DO NOT use the em-dash symbol ('—') or similar dash symbols anywhere in your output.";
    }

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: textData,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5, 
        }
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Failed to analyze research data" }, { status: 500 });
  }
}