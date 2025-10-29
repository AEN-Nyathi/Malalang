'use client';
import { useEffect, useRef, useState } from 'react';
import type { ScriptSegment } from '../../../lib/types';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ScrollArea } from '../../../components/ui/scroll-area';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../../../components/ui/card';
import { WandSparkles, Bot, LoaderCircle, PlusCircle, Play, PlayCircle } from 'lucide-react';
import ScriptSegmentItem from './script-segment-item';
import { toast } from 'sonner';
import VideoPreviewPlayer from './video-preview-player';
type ScriptPanelProps = {
  // Controlled props (optional). If not provided, the component will manage its own state.
  segments?: ScriptSegment[];
  setSegments?: (segments: ScriptSegment[] | ((prev: ScriptSegment[]) => ScriptSegment[])) => void;
  topic?: string;
  setTopic?: (topic: string) => void;
  // Initial values for uncontrolled mode
  initialSegments?: ScriptSegment[];
  initialTopic?: string;
  // Server action state and form action will be handled locally via useActionState
};
function SubmitButton() {
  return (
    <Button type="submit" className="w-full">
      <WandSparkles />
      <span>Generate Script</span>
    </Button>
  );
}
export default function ScriptPanel({
  segments,
  setSegments,
  topic,
  setTopic,
  initialSegments,
  initialTopic,
}: ScriptPanelProps) {
  // We'll call API endpoints via fetch instead of using Server Actions
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  // Support both controlled (parent provides segments + setSegments) and uncontrolled modes
  const isControlled = typeof segments !== 'undefined' && typeof setSegments === 'function';
  const [internalSegments, setInternalSegments] = useState<ScriptSegment[]>(() => segments ?? initialSegments ?? []);
  const currentSegments = isControlled ? (segments as ScriptSegment[]) : internalSegments;
  const setSegmentsFn = isControlled ? (setSegments as (s: any) => void) : setInternalSegments;

  const isTopicControlled = typeof topic !== 'undefined' && typeof setTopic === 'function';
  const [internalTopic, setInternalTopic] = useState<string>(() => topic ?? initialTopic ?? '');
  const currentTopic = isTopicControlled ? (topic as string) : internalTopic;
  const setTopicFn = isTopicControlled ? (setTopic as (t: string) => void) : setInternalTopic;

  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [combinedAudioUrl, setCombinedAudioUrl] = useState<string | null>(null);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);
  const [retrySecondsLeft, setRetrySecondsLeft] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const prevStateSegments = useRef<ScriptSegment[] | null>(null);

  // No server action state — we'll call the API endpoints directly via fetch.

  useEffect(() => {
    if (currentSegments.length > 0 && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [currentSegments.length]);

  const handleAddSegment = () => {
        const newSegment: ScriptSegment = {
        id: `seg-${Date.now()}`,
        text: 'New segment text...',
        audioSrc: null,
        visualSrc: null,
        duration: 3, // default duration
        videoSearchQuery: currentTopic,
    };
  setSegmentsFn((prev: ScriptSegment[]) => [...prev, newSegment]);
  }

  const handlePreview = async (force = false) => {
    if (!currentSegments || currentSegments.length === 0) {
      toast.error('No segments to generate audio for.');
      return;
    }
    if (!force && rateLimitedUntil && Date.now() < rateLimitedUntil) {
      const secs = Math.ceil(((rateLimitedUntil || 0) - Date.now()) / 1000);
      toast.error(rateLimitMessage ? `${rateLimitMessage} Retry in ${secs}s.` : `Rate limited. Retry in ${secs}s.`);
      return;
    }

    setIsGeneratingAudio(true);
    toast.info('Generating audio...', { description: 'Please wait while we prepare your preview.' });
    try {
      const resp = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Request combined audio for preview so we get a single audio URL
        body: JSON.stringify({ segments: currentSegments, mode: 'combined' }),
      });
      // read text and attempt to parse JSON safely
      const text = await resp.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch (e) {
        json = null;
      }

      if (!resp.ok) {
        // Handle rate limit specifically
        if (resp.status === 429) {
          // try header first
          const retryAfter = resp.headers.get('retry-after');
          let seconds: number | undefined = undefined;
          if (retryAfter && !isNaN(Number(retryAfter))) {
            seconds = Math.ceil(Number(retryAfter));
          } else {
            // try parsing from message text
            const msg = (json && (json.error || json.message)) || text || '';
            const retryMatch = msg.match(/Please retry in\\s*([0-9.]+)s/i);
            if (retryMatch) seconds = Math.ceil(parseFloat(retryMatch[1]));
          }

          const message = (json && (json.error || json.message)) || text || 'Rate limited by TTS provider. Please try again later.';
          if (seconds) {
            const until = Date.now() + seconds * 1000;
            setRateLimitedUntil(until);
            setRateLimitMessage(message);
            setRetrySecondsLeft(seconds);
            toast.error(message + ` Retry in ${seconds}s.`);
          } else {
            setRateLimitMessage(message);
            toast.error(message);
          }
          return;
        }

        const errMsg = (json && (json.error || json.message)) || text || 'Audio generation failed';
        throw new Error(errMsg);
      }

      // Combined mode returns combinedAudioUrl (and optionally timestampsUrl/taskId).
      if (json && json.combinedAudioUrl) {
        setCombinedAudioUrl(json.combinedAudioUrl);
        // If provider returned timestampsUrl, fetch it and use it to compute accurate
        // per-segment durations so video switching aligns with the combined audio.
        if (json.timestampsUrl) {
          try {
            const tsResp = await fetch(json.timestampsUrl);
            if (tsResp.ok) {
              const tsJson = await tsResp.json();
              // Expect an array of { start, end, text } entries. We'll map these sequentially
              // to the segments by consuming timestamp entries until the accumulated text
              // length approximates the segment text length.
              const entries: Array<{ start: number; end: number; text: string }> = Array.isArray(tsJson)
                ? tsJson
                : tsJson.timestamps || [];
              const newSegments = currentSegments.map((s) => ({ ...s }));
              // Normalization helper to make substring matches more robust
              const normalize = (s: string) =>
                (s || '')
                  .replace(/[\s\n\r]+/g, ' ')
                  .replace(/[^\n\w\s]/g, '')
                  .trim()
                  .toLowerCase();

              let entryIndex = 0;
              // Build a rolling concatenation of timestamp texts to allow substring matching
              for (let i = 0; i < newSegments.length; i++) {
                const seg = newSegments[i];
                const target = normalize(seg.text || '');
                if (!target) {
                  // empty segment: keep or set default
                  if (!seg.duration || seg.duration <= 0) seg.duration = 1;
                  continue;
                }
                let acc = '';
                let accNorm = '';
                let firstStart: number | null = null;
                let lastEnd: number | null = null;
                let j = entryIndex;
                let found = false;
                while (j < entries.length) {
                  const e = entries[j];
                  if (firstStart === null && typeof e.start === 'number') firstStart = e.start;
                  if (typeof e.end === 'number') lastEnd = e.end;
                  acc = acc + ' ' + (e.text || '');
                  accNorm = normalize(acc);
                  // If acc contains the target as substring, we consider it a match
                  if (accNorm.indexOf(target) !== -1) {
                    found = true;
                    j++;
                    break;
                  }
                  j++;
                }
                if (found && firstStart !== null && lastEnd !== null) {
                  seg.duration = Math.max(0, lastEnd - firstStart);
                  entryIndex = j;
                } else {
                  // fallback: approximate using accumulated entries until length matches
                  let accLen = 0;
                  let segDuration = 0;
                  const targetLen = (seg.text || '').length;
                  while (entryIndex < entries.length && (accLen < targetLen || segDuration === 0)) {
                    const e = entries[entryIndex];
                    const textLen = (e.text || '').length;
                    accLen += textLen;
                    const dur = (typeof e.end === 'number' && typeof e.start === 'number') ? Math.max(0, e.end - e.start) : 0;
                    segDuration += dur;
                    entryIndex++;
                    if (targetLen === 0) break;
                  }
                  if (segDuration > 0) {
                    seg.duration = segDuration;
                  } else if (!seg.duration || seg.duration <= 0) {
                    seg.duration = Math.max(1, Math.ceil((seg.text || '').length / 15));
                  }
                }
              }
              setSegmentsFn(newSegments);
            }
          } catch (e) {
            // ignore timestamp failures — we'll continue with previous durations
            console.warn('Failed to fetch timestampsUrl', e);
          }
        }
        setIsPreviewing(true);
        toast.success('Audio ready!', { description: 'Your video preview is ready to play.' });
        return;
      }
      if (json && json.segments) {
        // fallback: per-segment audio updated
        setSegmentsFn(json.segments);
        setIsPreviewing(true);
        toast.success('Audio ready!', { description: 'Your video preview is ready to play.' });
      }
    } catch (error: any) {
      console.error('Audio Generation Failed', error);
      toast.error('Audio Generation Failed', { description: error?.message });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // countdown effect for rate limit
  useEffect(() => {
    if (!rateLimitedUntil) {
      setRetrySecondsLeft(null);
      return;
    }
    const update = () => {
      const left = Math.ceil((rateLimitedUntil - Date.now()) / 1000);
      if (left <= 0) {
        setRateLimitedUntil(null);
        setRateLimitMessage(null);
        setRetrySecondsLeft(null);
      } else {
        setRetrySecondsLeft(left);
      }
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, [rateLimitedUntil]);

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <CardTitle className="font-headline">Script & Preview</CardTitle>
        </div>
        <CardDescription>
          Enter a topic to create your script, then generate a full video preview.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1 overflow-hidden">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsGeneratingScript(true);
            try {
              const resp = await fetch('/api/generate-script', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: currentTopic }),
              });
              const json = await resp.json();
              if (!resp.ok || !json.success) {
                toast.error(json.error || 'Failed to generate script');
              } else if (json.segments) {
                setSegmentsFn(json.segments);
                toast.success('Script generated successfully.');
                setIsPreviewing(false);
              }
            } catch (err: any) {
              console.error(err);
              toast.error(err?.message || 'Failed to generate script');
            } finally {
              setIsGeneratingScript(false);
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Input
              id="topic"
              name="topic"
              placeholder="e.g., 'The Future of Renewable Energy'"
              required
              value={currentTopic}
              onChange={(e) => setTopicFn(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isGeneratingScript}>
            {isGeneratingScript ? <LoaderCircle className="animate-spin" /> : <WandSparkles />}
            <span>Generate Script</span>
          </Button>
        </form>
        {rateLimitedUntil && (
          <div className="mb-4 p-3 bg-amber-900/30 border border-amber-700 rounded-md text-amber-100 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{rateLimitMessage ?? 'Rate limited by TTS provider.'}</div>
              {retrySecondsLeft ? (
                <div className="text-xs">Retry in {retrySecondsLeft}s</div>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePreview(true)}
                disabled={isGeneratingAudio}
                className="text-amber-100 border-amber-700"
              >
                {isGeneratingAudio ? <LoaderCircle className="animate-spin" /> : <Play />}
                <span className="ml-2">Retry now</span>
              </Button>
            </div>
          </div>
        )}

        {isPreviewing && currentSegments.length > 0 && (
          <VideoPreviewPlayer
            segments={currentSegments}
            combinedAudioUrl={combinedAudioUrl}
            onExit={() => {
              setIsPreviewing(false);
              setCombinedAudioUrl(null);
            }}
          />
        )}
        
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {currentSegments.map((segment, index) => (
                <ScriptSegmentItem
                  key={segment.id}
                  segment={segment}
                  index={index}
                  setSegments={setSegmentsFn}
                  topic={currentTopic}
                />
              ))}
               <div className="pt-4 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleAddSegment}>
                        <PlusCircle />
                        <span>Add Segment</span>
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handlePreview(false)}
                      disabled={isGeneratingAudio || !!rateLimitedUntil}
                    >
                        {isGeneratingAudio ? <LoaderCircle className="animate-spin" /> : <PlayCircle />}
                        <span>{rateLimitedUntil ? `Preview (disabled)` : 'Preview'}</span>
                    </Button>
                </div>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}