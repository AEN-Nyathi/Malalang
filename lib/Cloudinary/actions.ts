

"use server"; // Must be at the top

import { generateFinalVideo } from "@/lib/Cloudinary/Cloudinary";
import type { ScriptSegment } from "@/lib/types";

/**
 * Server Action that executes video generation.
 * @param {ScriptSegment[]} segments - Clean, serializable segments array.
 * @returns {Promise<string>} The final video URL on success.
 * @throws {string} A simple string message on failure.
 */
export async function createFinalVideoAction(segments: ScriptSegment[]): Promise<string> {
    try {
        console.log("Server Action called: Starting video generation...");
        
        // This is where your Cloudinary logic runs
        const finalUrl = await generateFinalVideo(segments);
        
        // Success: Return a primitive string URL
        return finalUrl;
        
    } catch (e) {
        console.error("Server Action Execution Failed (Cloudinary/API Error):", e);

        // 🔑 FIX: Guarantee only a simple string is thrown.
        // The client will receive this as a rejected promise with a simple string error.
        let errorMessage = "Video generation failed due to a server-side error.";
        if (e && typeof e === 'object' && 'message' in e) {
            errorMessage = String(e.message);
        } else if (typeof e === 'string') {
            errorMessage = e;
        }

        // Re-throw the error as a simple string primitive
        throw new Error(`[Server Action Error] ${errorMessage}`);
    }
}