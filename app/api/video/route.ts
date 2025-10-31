import { NextResponse } from 'next/server';
import { generateFinalVideo } from "@/lib/Cloudinary/Cloudinary";
import type { ScriptSegment } from "@/lib/types";

// The Route Handler function for POST requests
// It must be named 'POST' (or GET, PUT, etc.)
export async function POST(request: Request) {
    try {
        // 1. Get and validate the request body
        const body = await request.json();
        
        // Ensure segments exist and are an array
        const segments: ScriptSegment[] = body.segments;

        if (!segments || !Array.isArray(segments)) {
            return NextResponse.json(
                { error: "Invalid request body: 'segments' array is required." },
                { status: 400 }
            );
        }

        console.log("API Route called: Starting video generation...");

        // 2. Execute the server-side logic
        // The generateFinalVideo function (which uses Cloudinary) runs safely here.
        const finalUrl = await generateFinalVideo(segments);

        // 3. Success: Return the final URL
        return NextResponse.json(
            { url: finalUrl },
            { status: 200 }
        );

    } catch (e) {
        // 4. Handle errors and return a clean, serializable error response
        console.error("Video Generation API Failed:", e);

        let errorMessage = "Video generation failed due to an internal server error.";
        if (e instanceof Error) {
            errorMessage = e.message;
        } else if (typeof e === 'string') {
            errorMessage = e;
        }

        return NextResponse.json(
            { error: `Video Generation Failed: ${errorMessage}` },
            { status: 500 }
        );
    }
}