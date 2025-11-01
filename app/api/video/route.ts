import { NextResponse } from "next/server";
import type { ScriptSegment } from "@/lib/types";
import { createFinalVideo } from "@/lib/Cloudinary/Cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const segments: ScriptSegment[] = body.segments;

    if (!segments || !Array.isArray(segments)) {
      return NextResponse.json(
        { error: "Invalid request body: 'segments' array is required." },
        { status: 400 }
      );
    }
    console.log("Received segments for video generation:", segments);
    console.log("API Route called: Triggering MediaFlows...");

    const response = await createFinalVideo(segments);
   
    const result = response;
    console.log("MediaFlows Complete: Video generation succeeded.", result);
    console.log("Final video URL:", result);
    return NextResponse.json({ url: result }, { status: 200 });
  } catch (e) {
    console.error("Video Generation API Failed:", e);

    let errorMessage =
      "Video generation failed due to an internal server error.";
    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === "string") {
      errorMessage = e;
    }

    return NextResponse.json(
      { error: `Video Generation Failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
