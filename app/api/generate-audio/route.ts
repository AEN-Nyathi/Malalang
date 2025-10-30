import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateAudioForSegmentsAction, generateCombinedAudioForSegmentsAction } from '@/lib/actions';

const segmentSchema = z.object({ id: z.string(), text: z.string(), videoSearchQuery: z.string().optional(), duration: z.number().optional(), audioSrc: z.string().nullable().optional(), visualSrc: z.string().nullable().optional() });
const schema = z.object({
  segments: z.array(segmentSchema),
  // mode: 'perSegment' (default) or 'combined' (produce a single audio file for all segments)
  mode: z.enum(['perSegment', 'combined']).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid segments' }, { status: 400 });
    }

    const segments = parsed.data.segments;
    const mode = parsed.data.mode || 'perSegment';
    if (mode === 'combined') {
      const result = await generateCombinedAudioForSegmentsAction(segments as any);
      if (result.error) {
        const err = (result.error || '').toString();
        const retryMatch = err.match(/Please retry in ([0-9.]+)s/i);
        if (retryMatch) {
          const seconds = Math.ceil(parseFloat(retryMatch[1]));
          return NextResponse.json({ success: false, error: err }, { status: 429, headers: { 'Retry-After': String(seconds) } });
        }
        return NextResponse.json({ success: false, error: result.error }, { status: 500 });
      }
      return NextResponse.json({ success: true, combinedAudioUrl: result.combinedAudioUrl, timestampsUrl: result.timestampsUrl, taskId: result.taskId });
    }

    const result = await generateAudioForSegmentsAction(segments as any);
    if (result.error) {
      // Detect quota / rate-limit messages and return 429 with Retry-After when possible
      const err = (result.error || '').toString();
      const retryMatch = err.match(/Please retry in ([0-9.]+)s/i);
      if (retryMatch) {
        const seconds = Math.ceil(parseFloat(retryMatch[1]));
        return NextResponse.json({ success: false, error: err }, { status: 429, headers: { 'Retry-After': String(seconds) } });
      }
      // Generic failure
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true, segments: result.segmentsWithAudio });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ success: false, error: e.message || 'Failed to generate audio' }, { status: 500 });
  }
}

