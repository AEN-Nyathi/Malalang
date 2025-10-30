import { NextResponse } from "next/server";
import { z } from "zod";
import { generateInitialScriptSegments } from "@/ai/flows/generate-initial-script-segments";
import { createClient } from "pexels";
import type { ScriptSegment } from "@/lib/types";
import { getVideo } from "@/lib/pexels/pexels";
import { getAudioUrl } from "@/lib/unrealspeech/unrealspeech";

const schema = z.object({ topic: z.string().min(3) });

const getBestVideoFile = (video: any) => {
  const mp4File = video.video_files.find(
    (f: any) => (f.file_type as string) === "video/mp4" && f.quality !== "hls"
  );
  if (mp4File) return mp4File;
  return video.video_files[0];
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ success: false, error: 'Invalid topic' }, { status: 400 });
        }

        const result = await generateInitialScriptSegments({ topic: parsed.data.topic });

        const newSegments: ScriptSegment[] = await Promise.all(
            result.segments.map(async (segment: any, index: number) => {
                let visualSrc: string | null = null;
                let audioSrc: string | null = null;
                let initialDuration = Math.ceil(segment.text.length / 15) || 3;

                // 1. Get Video Source
                const videoFilePromise = getVideo({ query: segment.videoSearchQuery });

                // 2. Get Audio Source
                // Note: We use segment.text as the input for the audio generation
                const audioUrlPromise = getAudioUrl(segment.text);

                // Wait for both promises to resolve concurrently
                const [videoFile, audioUrl] = await Promise.all([videoFilePromise, audioUrlPromise]);

                if (videoFile) {
                    visualSrc = videoFile.link;
                }

                if (audioUrl) {
                    audioSrc = audioUrl; 
                }

                return {
                    id: `new-seg-${Date.now()}-${index}`,
                    text: segment.text,
                    visualSrc,
                    audioSrc, // Include the audioSrc
                    duration: initialDuration,
                    videoSearchQuery: segment.videoSearchQuery,
                } as ScriptSegment;
            })
        );

        return NextResponse.json({ success: true, segments: newSegments });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ success: false, error: e.message || 'Failed to generate script' }, { status: 500 });
    }
}