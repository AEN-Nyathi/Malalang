"use server";
/**
 * @fileOverview Generates initial script segments for a video based on a topic.
 *
 * - generateInitialScriptSegments - A function that generates script segments with video search queries.
 * - GenerateInitialScriptSegmentsInput - The input type for the generateInitialScriptSegments function.
 * - GenerateInitialScriptSegmentsOutput - The return type for the generateInitialScriptSegments function.
 */
import { ai } from "@/ai/genkit";
import { z } from "genkit";
const GenerateInitialScriptSegmentsInputSchema = z.object({
  topic: z
    .string()
    .describe("The topic for which to generate script segments."),
});
export type GenerateInitialScriptSegmentsInput = z.infer<
  typeof GenerateInitialScriptSegmentsInputSchema
>;
const SegmentSchema = z.object({
  text: z.string().describe("The text of the script segment."),
  videoSearchQuery: z
    .string()
    .describe(
      "A concise search query for a stock video that visually represents the segment text."
    ),
});
const GenerateInitialScriptSegmentsOutputSchema = z.object({
  segments: z
    .array(SegmentSchema)
    .describe(
      "An array of script segments, each with text and a video search query."
    ),
});
export type GenerateInitialScriptSegmentsOutput = z.infer<
  typeof GenerateInitialScriptSegmentsOutputSchema
>;
export async function generateInitialScriptSegments(
  input: GenerateInitialScriptSegmentsInput
): Promise<GenerateInitialScriptSegmentsOutput> {
  return generateInitialScriptSegmentsFlow(input);
}
const prompt = ai.definePrompt({
  name: "generateInitialScriptSegmentsPrompt",
  input: { schema: GenerateInitialScriptSegmentsInputSchema },
  output: { schema: GenerateInitialScriptSegmentsOutputSchema },
  prompt: `You are a script writer for video content.
  Generate a list of script segments based on the following topic:
  {{topic}}
  Each segment should be concise and focus on a specific subtopic.
  For each segment, also provide a short, effective search query (3-5 words) for finding a relevant stock video.
  Return the segments as a list of objects, each containing the text and the videoSearchQuery.
  `,
});
const generateInitialScriptSegmentsFlow = ai.defineFlow(
  {
    name: "generateInitialScriptSegmentsFlow",
    inputSchema: GenerateInitialScriptSegmentsInputSchema,
    outputSchema: GenerateInitialScriptSegmentsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
