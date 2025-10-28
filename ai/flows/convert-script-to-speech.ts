'use server';
/**
 * @fileOverview Converts script segments into speech using the Google TTS API.
 *
 * - convertScriptToSpeech - A function that converts script segments to speech.
 * - ConvertScriptToSpeechInput - The input type for the convertScriptToSpeech function.
 * - ConvertScriptToSpeechOutput - The return type for the convertScriptToSpeech function.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
const ConvertScriptToSpeechInputSchema = z.object({
  scriptSegment: z
    .string()
    .describe('The script segment to convert to speech.'),
});
export type ConvertScriptToSpeechInput = z.infer<typeof ConvertScriptToSpeechInputSchema>;
const ConvertScriptToSpeechOutputSchema = z.object({
  media: z
    .string()
    .describe('The audio data of the converted script segment in WAV format as a data URI.'),
  duration: z.number().describe('The duration of the audio in seconds.'),
});
export type ConvertScriptToSpeechOutput = z.infer<typeof ConvertScriptToSpeechOutputSchema>;
export async function convertScriptToSpeech(
  input: ConvertScriptToSpeechInput
): Promise<ConvertScriptToSpeechOutput> {
  return convertScriptToSpeechFlow(input);
}
const convertScriptToSpeechFlow = ai.defineFlow(
  {
    name: 'convertScriptToSpeechFlow',
    inputSchema: ConvertScriptToSpeechInputSchema,
    outputSchema: ConvertScriptToSpeechOutputSchema,
  },
  async (input) => {
    const {media, usage} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: input.scriptSegment,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavData = await toWav(audioBuffer);
    // duration is available in the usage metadata for TTS models
    const duration = usage.custom?.durationSeconds || 0;
    return {
      media: 'data:audio/wav;base64,' + wavData,
      duration,
    };
  }
);
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });
    const bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });
    writer.write(pcmData);
    writer.end();
  });
}