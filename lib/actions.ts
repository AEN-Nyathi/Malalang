'use server';
import {
  generateInitialScriptSegments,
  type GenerateInitialScriptSegmentsInput,
} from '@/ai/flows/generate-initial-script-segments';
import {
  convertScriptToSpeech,
  type ConvertScriptToSpeechInput
} from '@/ai/flows/convert-script-to-speech';
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
const searchPexelsSchema = z.object({
  prompt: z.string().min(3, 'Prompt must be at least 3 characters long.'),
});
export async function searchPexelsVideosAction(prompt: string) {
  try {
    const validatedFields = searchPexelsSchema.safeParse({ prompt });
    if (!validatedFields.success) {
      return { success: false, videos: null, error: 'Invalid prompt.' };
    }
    if (!process.env.PEXELS_API_KEY) {
      throw new Error('Pexels API key is not configured.');
    }
    const client = createClient(process.env.PEXELS_API_KEY);
    const response = await client.videos.search({ query: validatedFields.data.prompt, per_page: 10 });
    if ('error' in response) {
      throw new Error(response.error);
    }
    return { success: true, videos: response.videos, error: null };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      videos: null,
      error: e.message || 'Failed to search for videos.',
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
                const input: ConvertScriptToSpeechInput = { scriptSegment: segment.text };
                const result = await convertScriptToSpeech(input);
                return {
                    ...segment,
                    audioSrc: result.media,
                    duration: result.duration,
                }
            })
        );
        return { segmentsWithAudio, error: null };
    } catch (e: any) {
        console.error("Failed to generate audio for segments", e);
        return { segmentsWithAudio: null, error: e.message || 'An unknown error occurred during audio generation.' };
    }
}