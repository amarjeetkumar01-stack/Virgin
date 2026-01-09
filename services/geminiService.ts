
import { GoogleGenAI, Type } from "@google/genai";
import { MemeResult, Classification } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzePersona(username: string): Promise<MemeResult> {
  const prompt = `
    You are the "VirginChecker" Oracle, a satirical AI that audits Twitter/X souls based on their username: "@${username}".
    Your goal is to categorize them into one of three distinct internet archetypes:
    
    1. VIRGIN: The lurker, the anime pfp who never tweets, the paper hands who buys at the top, the "is this a scam?" asker, the one with 0 followers but 10k following.
    2. NON-VIRGIN: The early adopter, the high-conviction whale, the builder, the one who actually reads the whitepaper, the "absolute chad" of the timeline.
    3. TRANSGENDER: The glitch-core experimenter, the one who identifies as a smart contract, the multi-chain bridge-jumper, the avant-garde digital artist who exists in 4 dimensions.

    Rules for your roast:
    - Tone: High-octane, cynical, crypto-native, 4chan/X-tier sarcasm.
    - Style: Use brutal Web3 slang (Exit liquidity, Faded, Rugged, GM/GN, Cope, Seethe, Mid-curve).
    - Length: Short and punchy. ONE roast line, ONE verdict line.
    
    CRITICAL: Be objective based on the "vibe" of the username. Do not default to VIRGIN. Distribute your judgments fairly based on the energy of the handle.
    
    Output JSON:
    - category: EXACTLY one of ['VIRGIN', 'NON-VIRGIN', 'TRANSGENDER'].
    - roast: A brutal crypto-themed roast.
    - verdict: A sharp, sarcastic final verdict.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.9, // Higher temperature for more variety
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { 
              type: Type.STRING,
              description: "Must be VIRGIN, NON-VIRGIN, or TRANSGENDER"
            },
            roast: { type: Type.STRING },
            verdict: { type: Type.STRING }
          },
          required: ["category", "roast", "verdict"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    const categoryRaw = (result.category || '').toUpperCase().trim();
    let finalCategory: Classification = 'VIRGIN';
    
    if (categoryRaw.includes('NON-VIRGIN')) {
      finalCategory = 'NON-VIRGIN';
    } else if (categoryRaw.includes('TRANSGENDER')) {
      finalCategory = 'TRANSGENDER';
    } else {
      finalCategory = 'VIRGIN';
    }

    const memeImages = {
      VIRGIN: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=400&auto=format&fit=crop", // Retro PC mess
        "https://images.unsplash.com/photo-1590483734724-3881744a3030?q=80&w=600&h=400&auto=format&fit=crop", // Dark silhouette
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&h=400&auto=format&fit=crop", // Code matrix
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop", // Green circuit dark
        "https://images.unsplash.com/photo-1510511459019-5dee667ff88b?q=80&w=600&h=400&auto=format&fit=crop", // Dark terminal
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&h=400&auto=format&fit=crop"  // Dark gaming setup
      ],
      "NON-VIRGIN": [
        "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&h=400&auto=format&fit=crop", // Golden Bitcoin abstract
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=600&h=400&auto=format&fit=crop", // Blockchain abstract
        "https://images.unsplash.com/photo-1640344776474-9e8ff0c378c2?q=80&w=600&h=400&auto=format&fit=crop", // Cyber gold
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&h=400&auto=format&fit=crop", // Cyberpunk neon street
        "https://images.unsplash.com/photo-1614728263952-84ea206f25b1?q=80&w=600&h=400&auto=format&fit=crop", // Rocket launch energy
        "https://images.unsplash.com/photo-1634154830167-a88596acc996?q=80&w=600&h=400&auto=format&fit=crop"  // Abstract golden network
      ],
      TRANSGENDER: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&h=400&auto=format&fit=crop", // Glitch art
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&h=400&auto=format&fit=crop", // Cyberpunk red/blue
        "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=600&h=400&auto=format&fit=crop", // Abstract digital distortion
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&h=400&auto=format&fit=crop", // Intense abstract gradient
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&h=400&auto=format&fit=crop", // Abstract neural network
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&h=400&auto=format&fit=crop"  // Liquid metal glitch
      ]
    };
    
    const pool = memeImages[finalCategory] || memeImages.VIRGIN;
    const memeUrl = pool[Math.floor(Math.random() * pool.length)];

    return {
      category: finalCategory,
      roast: result.roast || "The blockchain couldn't even find a heartbeat in your portfolio.",
      verdict: result.verdict || "Standard-issue exit liquidity.",
      memeUrl
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      category: 'VIRGIN',
      roast: "The server crashed trying to process such low-level energy.",
      verdict: "Liquidated instantly.",
      memeUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&h=400&auto=format&fit=crop"
    };
  }
}
