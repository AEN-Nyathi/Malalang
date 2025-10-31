'use server';
import {
  generateInitialScriptSegments,
  type GenerateInitialScriptSegmentsInput,
} from '@/ai/flows/generate-initial-script-segments';
// We'll use UnrealSpeech HTTP API directly for TTS instead of the previous convertScriptToSpeech flow.
// The API key can be provided via process.env.UNREAL_API_KEY; if not present we fall back to the
// user-provided key (kept here as a fallback for local/dev use).
import { createClient, type Videos, type Video } from 'pexels';
import { z } from 'zod';
import type { ScriptSegment } from './types';
const getBestVideoFile = (video: Video) => {
    // Prefer mp4 format if available
    const mp4File = video.video_files.find(f => (f.file_type as string) === 'video/mp4' && f.quality !== 'hls');
    if (mp4File) return mp4File;
    // Fallback to the first available video file
    return video.video_files[0];
};
const generateScriptSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
});
type GenerateScriptState = {
  message?: string | null;
  errors?: {
    topic?: string[] | undefined;
  } | null;
  segments?: ScriptSegment[] | null;
};
export async function generateScriptAction(
  prevState: GenerateScriptState,
  formData: FormData
): Promise<GenerateScriptState> {
  try {
    const validatedFields = generateScriptSchema.safeParse({
      topic: formData.get('topic'),
    });
    if (!validatedFields.success) {
      return {
        message: 'Invalid topic.',
        errors: validatedFields.error.flatten().fieldErrors,
        segments: null,
      };
    }
    const input: GenerateInitialScriptSegmentsInput = {
      topic: validatedFields.data.topic,
    };
    const result = await generateInitialScriptSegments(input);
    if (!process.env.PEXELS_API_KEY) {
        throw new Error('Pexels API key is not configured.');
    }
    const pexelsClient = createClient(process.env.PEXELS_API_KEY);
    const newSegments: ScriptSegment[] = await Promise.all(
        result.segments.map(async (segment, index) => {
            let visualSrc: string | null = null;
            let initialDuration = Math.ceil(segment.text.length / 15) || 3;
            try {
                const videoSearch = await pexelsClient.videos.search({ query: segment.videoSearchQuery, per_page: 1 });
                if (!('error' in videoSearch) && videoSearch.videos.length > 0) {
                    const bestFile = getBestVideoFile(videoSearch.videos[0]);
                    if (bestFile) {
                        visualSrc = bestFile.link;
                    }
                }
            } catch (e) {
                console.error(`Failed to fetch video for segment: ${segment.videoSearchQuery}`, e);
            }
            return {
                id: `new-seg-${Date.now()}-${index}`,
                text: segment.text,
                visualSrc: visualSrc,
                audioSrc: null,
                duration: initialDuration,
                videoSearchQuery: segment.videoSearchQuery,
            };
        })
    );
    return {
      message: 'Script generated successfully.',
      errors: null,
      segments: newSegments,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to generate script. Please try again.',
      errors: null,
      segments: null,
    };
  }
}


export async function generateAudioForSegmentsAction(segments: ScriptSegment[]): Promise<{segmentsWithAudio: ScriptSegment[] | null, error: string | null}> {
    try {
        const segmentsWithAudio = await Promise.all(
            segments.map(async (segment) => {
                if (segment.text.trim().length === 0) {
                    return { ...segment, audioSrc: null, duration: segment.duration || 0 };
                }
        // Call UnrealSpeech /stream endpoint for low-latency preview synthesis.
        const UNREAL_API_KEY = process.env.UNREAL_API_KEY || 'sjQyafkkpLiAO0QprRuClqeoQIRfFNNP4E55DgDIB2xZYLKzUpavyy';
        const UNREAL_VOICE_ID = process.env.UNREAL_VOICE_ID || 'Noah';
        const endpoint = 'https://api.v8.unrealspeech.com/stream';
        try {
          // Try both capitalized 'Text' and lowercase 'text' keys to be tolerant of API versions.
          const bodyKeys = ['Text', 'text'];
          let lastErr: any = null;
          let data: any = null;
          for (const key of bodyKeys) {
            const bodyObj: any = { VoiceId: UNREAL_VOICE_ID, Bitrate: '192k' };
            bodyObj[key] = segment.text;
            const resp = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${UNREAL_API_KEY}`,
              },
              body: JSON.stringify(bodyObj),
            });
            const text = await resp.text();
            if (!resp.ok) {
              // If provider says Missing "Text" key, try the alternate key in the next iteration
              if (/Missing\s+"Text"\s+key/i.test(text || '')) {
                lastErr = new Error(text || `UnrealSpeech error: ${resp.status}`);
                continue; // try the next key
              }
              // Other errors - propagate immediately
              throw new Error(text || `UnrealSpeech error: ${resp.status}`);
            }
            try {
              data = JSON.parse(text || '{}');
            } catch (e) {
              data = { audio: text };
            }
            // If we got audio, break the loop
            if (data && data.audio) {
              lastErr = null;
              break;
            }
            // otherwise, keep last error and try next key
            lastErr = new Error('No audio returned');
          }
          if (lastErr) {
            throw lastErr;
          }
          if (!data || !data.audio) {
            throw new Error('No audio returned from UnrealSpeech');
          }
          // UnrealSpeech /stream returns base64 audio. We'll assume MPEG/MP3 unless otherwise configured.
          const audioBase64 = data.audio as string;
          // Compute duration from timestamps if available
          let duration = segment.duration || 0;
          if (Array.isArray(data.timestamps) && data.timestamps.length > 0) {
            // timestamps likely contain per-word timing; take the last timestamp's end time if present
            const last = data.timestamps[data.timestamps.length - 1];
            if (last && typeof last.end === 'number') {
              duration = last.end;
            } else if (last && typeof last.time === 'number') {
              duration = last.time;
            }
          }
          return {
            ...segment,
            audioSrc: 'data:audio/mpeg;base64,' + audioBase64,
            duration,
          };
        } catch (e: any) {
          // Re-throw to let outer catch gather and return a useful error message
          throw new Error(`UnrealSpeech: ${e?.message || String(e)}`);
        }
            })
        );
        return { segmentsWithAudio, error: null };
    } catch (e: any) {
        console.error("Failed to generate audio for segments", e);
        return { segmentsWithAudio: null, error: e.message || 'An unknown error occurred during audio generation.' };
    }
}

export async function generateCombinedAudioForSegmentsAction(segments: ScriptSegment[]): Promise<{combinedAudioUrl: string | null, timestampsUrl?: string | null, taskId?: string | null, error: string | null}> {
  try {
    // Concatenate all segment texts into one long text for TTS.
    const combinedText = segments.map(s => s.text.trim()).filter(Boolean).join('\n\n');
    if (!combinedText) {
      return { combinedAudioUrl: null, timestampsUrl: null, taskId: null, error: 'No text to synthesize' };
    }
    const UNREAL_API_KEY = process.env.UNREAL_API_KEY || 'sjQyafkkpLiAO0QprRuClqeoQIRfFNNP4E55DgDIB2xZYLKzUpavyy';
    const UNREAL_VOICE_ID = process.env.UNREAL_VOICE_ID || 'Sierra';
    const endpoint = 'https://api.v8.unrealspeech.com/speech';
    const body = {
      Text: combinedText,
      VoiceId: UNREAL_VOICE_ID,
      Bitrate: process.env.UNREAL_BITRATE || '192k',
      AudioFormat: 'mp3',
      OutputFormat: 'uri',
      TimestampType: 'sentence',
      sync: true,
    } as any;
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${UNREAL_API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    const text = await resp.text();
    if (!resp.ok) {
      // Return the provider message for upstream handling
      return { combinedAudioUrl: null, timestampsUrl: null, taskId: null, error: text || `UnrealSpeech error: ${resp.status}` };
    }
    let data: any = null;
    try {
      data = JSON.parse(text || '{}');
    } catch (e) {
      return { combinedAudioUrl: null, timestampsUrl: null, taskId: null, error: 'Invalid response from UnrealSpeech' };
    }
    // If OutputUri is present, return it. If the API returns a TaskId, return it so caller can poll.
    const outputUri = data.OutputUri || data.audioUrl || null;
    const timestampsUri = data.TimestampsUri || data.timestampsUrl || null;
    const taskId = data.TaskId || null;
    return { combinedAudioUrl: outputUri, timestampsUrl: timestampsUri, taskId, error: null };
  } catch (e: any) {
    console.error('Failed to generate combined audio', e);
    return { combinedAudioUrl: null, timestampsUrl: null, taskId: null, error: e.message || 'Failed to generate combined audio' };
  }
}