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
  const [combinedVideoUrl, setCombinedVideoUrl] = useState<string | null>(null);
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
    toast.info('Preparing preview...', { description: 'Please wait while we generate audio, merge videos and prepare the preview.' });
    try {
      // Request a merged (stored) preview from Cloudinary so we can play a single combined video.
      const resp = await fetch('/api/create-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ segments: currentSegments, storeMerged: true }),
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

      // create-script returns { mergedUrl } when storeMerged=true
      if (json && json.mergedUrl) {
        // merged video (stored on Cloudinary) is ready
        setCombinedAudioUrl(null);
        setCombinedVideoUrl(json.mergedUrl);
        setIsPreviewing(true);
        toast.success('Preview ready!', { description: 'Merged video is ready to play.' });
        return;
      }
      if (json && json.transformedUrls) {
        // Server returned per-segment transformed URLs (no stored merged asset).
        const newSegments = currentSegments.map((s, i) => ({
          ...s,
          visualSrc: json.transformedUrls[i] || s.visualSrc,
          audioSrc: (json.audioUrls && json.audioUrls[i]) || s.audioSrc,
        }));
        setSegmentsFn(newSegments);
        setIsPreviewing(false);
        toast.success('Per-segment transforms ready. To preview a single merged video, click Export to store a merged asset.');
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
        {isPreviewing && (
          <VideoPreviewPlayer
            combinedAudioUrl={combinedAudioUrl}
            combinedVideoUrl={combinedVideoUrl}
            onExit={() => {
              setIsPreviewing(false);
              setCombinedAudioUrl(null);
              setCombinedVideoUrl(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}