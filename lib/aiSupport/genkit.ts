import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
});

export const enhanceAnswerFlow = ai.defineFlow(
  {
    name: 'enhanceAnswerFlow',
    inputSchema: z.object({
      question: z.string(),
      answer: z.string(),
      businessName: z.string(),
      userName: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ question, answer, businessName, userName }) => {
    const prompt = `As an expert copywriter, enhance the following answer for a questionnaire.
      The user's name is ${userName} and their business is called ${businessName}.
      Question: "${question}"
      User's Answer: "${answer}"
      Enhanced Answer:`;

    const llmResponse = await ai.generate({
      model: gemini15Flash,
      prompt: prompt,
      config: {
        temperature: 0.5,
      },
    });

    return llmResponse.text || answer;
  }
);

export const suggestAnswerFlow = ai.defineFlow(
  {
    name: 'suggestAnswerFlow',
    inputSchema: z.object({
      question: z.string(),
      businessName: z.string(),
      userName: z.string(),
    }),
    outputSchema: z.array(z.string()),
  },
  async ({ question, businessName, userName }) => {
    const prompt = `As an expert business consultant, suggest 3-5 concise and creative answers for the following questionnaire question.
    The user's name is ${userName} and their business is called ${businessName}.
    Question: "${question}"
    Suggestions (comma-separated):`;

    const llmResponse = await ai.generate({
      model: gemini15Flash,
      prompt: prompt,
      config: {
        temperature: 0.8,
      },
    });

    return (
      llmResponse.text
        ?.split(',')
        .map((s: string) => s.trim()) || []
    );
  }
);
