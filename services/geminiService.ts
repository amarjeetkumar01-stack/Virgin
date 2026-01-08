
import { GoogleGenAI, Type } from "@google/genai";
import { MemeResult, Classification } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzePersona(username: string): Promise<MemeResult> {
  const prompt = `
    You are a dark, cynical, crypto-degenerate meme generator for "VirginChecker".
    Classify the persona "@${username}" into ONLY ONE of these categories: 'VIRGIN', 'NON-VIRGIN', or 'TRANSGENDER'.
    
    Rules for output:
    1. Language: 
       - 'roast': Exactly ONE short, brutal, hilarious line in ENGLISH focused on CRYPTO CULTURE, WEB3, and DEGEN habits. Use slang like 'Rugged', 'Down bad', 'Paper hands', 'Exit liquidity', 'Gas fees', 'Faded'.
       - 'verdict': Exactly ONE short, sharp, sarcastic final verdict in ENGLISH (e.g., "Your portfolio is a graveyard").
    2. Tone: Dystopian, dark internet humor, crypto-native sarcasm. No hate, no slurs.
    3. STRICT: No numbers, no percentages, no stats, no mention of data.
    
    Output JSON:
    - category: The classification string ('VIRGIN', 'NON-VIRGIN', or 'TRANSGENDER').
    - roast: The English crypto roast line.
    - verdict: The English final verdict.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            roast: { type: Type.STRING },
            verdict: { type: Type.STRING }
          },
          required: ["category", "roast", "verdict"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    const categoryUpper = result.category?.toUpperCase() || 'VIRGIN';
    let finalCategory: Classification = 'VIRGIN';
    if (categoryUpper === 'NON-VIRGIN') finalCategory = 'NON-VIRGIN';
    else if (categoryUpper === 'TRANSGENDER') finalCategory = 'TRANSGENDER';

    const memeImages = {
      VIRGIN: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=400&auto=format&fit=crop", // Retro PC mess
        "https://images.unsplash.com/photo-1590483734724-3881744a3030?q=80&w=600&h=400&auto=format&fit=crop"  // Dark silhouette
      ],
      "NON-VIRGIN": [
        "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&h=400&auto=format&fit=crop", // Golden Bitcoin abstract
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=600&h=400&auto=format&fit=crop"  // Blockchain abstract
      ],
      TRANSGENDER: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&h=400&auto=format&fit=crop", // Glitch art
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&h=400&auto=format&fit=crop"  // Cyberpunk red/blue
      ]
    };
    
    const pool = memeImages[finalCategory] || memeImages.VIRGIN;
    const memeUrl = pool[Math.floor(Math.random() * pool.length)];

    return {
      category: finalCategory,
      roast: result.roast || "You look like you're still waiting for a 2021 rug to moon.",
      verdict: result.verdict || "Certified exit liquidity.",
      memeUrl
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      category: 'VIRGIN',
      roast: "The blockchain rejected your cringe attempt at relevance.",
      verdict: "Liquidated on arrival.",
      memeUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&h=400&auto=format&fit=crop"
    };
  }
}
