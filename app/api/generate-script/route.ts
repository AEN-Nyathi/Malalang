import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateInitialScriptSegments } from '@/ai/flows/generate-initial-script-segments';
import { createClient } from 'pexels';
import type { ScriptSegment } from '@/lib/types';

const schema = z.object({ topic: z.string().min(3) });

const getBestVideoFile = (video: any) => {
  const mp4File = video.video_files.find((f: any) => (f.file_type as string) === 'video/mp4' && f.quality !== 'hls');
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

    if (!process.env.PEXELS_API_KEY) {
      console.error('Pexels API key missing');
    }

    const pexelsClient = process.env.PEXELS_API_KEY ? createClient(process.env.PEXELS_API_KEY) : null;

    const newSegments: ScriptSegment[] = await Promise.all(
      result.segments.map(async (segment: any, index: number) => {
        let visualSrc: string | null = null;
        let initialDuration = Math.ceil(segment.text.length / 15) || 3;
        try {
          if (pexelsClient) {
            const videoSearch = await pexelsClient.videos.search({ query: segment.videoSearchQuery, per_page: 1 });
            if (!('error' in videoSearch) && videoSearch.videos.length > 0) {
              const bestFile = getBestVideoFile(videoSearch.videos[0]);
              if (bestFile) visualSrc = bestFile.link;
            }
          }
        } catch (e) {
          console.error('Pexels lookup failed', e);
        }

        return {
          id: `new-seg-${Date.now()}-${index}`,
          text: segment.text,
          visualSrc,
          audioSrc: null,
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

