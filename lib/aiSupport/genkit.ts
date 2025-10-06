// lib/genkit.ts
import { genkit  } from "genkit";
import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

export const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // lightweight, good for real-time form AI
});
