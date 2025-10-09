'use client';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { generateScriptAction, generateAudioForSegmentsAction } from '../../../lib/actions';
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
  segments: ScriptSegment[];
  setSegments: (segments: ScriptSegment[] | ((prev: ScriptSegment[]) => ScriptSegment[])) => void;
  topic: string;
  setTopic: (topic: string) => void;
};
const initialState = {
  message: null,
  errors: null,
  segments: null,
};
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <LoaderCircle className="animate-spin" /> : <WandSparkles />}
      <span>Generate Script</span>
    </Button>
  );
}
export default function ScriptPanel({
  segments,
  setSegments,
  topic,
  setTopic,
}: ScriptPanelProps) {
  const [state, formAction] = useActionState(generateScriptAction, initialState);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isGeneratingAudio, startAudioGenerationTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const prevStateSegments = useRef<ScriptSegment[] | null>(null);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast.error(state.message);
      } else if (state.segments) {
        toast.success(state.message);
      }
    }

    if (
      state.segments &&
      state.segments.length > 0 &&
      JSON.stringify(state.segments) !== JSON.stringify(prevStateSegments.current)
    ) {
      setSegments(state.segments);
      setIsPreviewing(false);
      prevStateSegments.current = state.segments;
    }
  }, [state, setSegments]);

  useEffect(() => {
    if (segments.length > 0 && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [segments.length]);

  const handleAddSegment = () => {
    const newSegment: ScriptSegment = {
        id: `seg-${Date.now()}`,
        text: 'New segment text...',
        audioSrc: null,
        visualSrc: null,
        duration: 3, // default duration
        videoSearchQuery: topic,
    };
    setSegments(prev => [...prev, newSegment]);
  }

  const handlePreview = () => {
    startAudioGenerationTransition(async () => {
        toast.info('Generating audio...', { description: 'Please wait while we prepare your preview.' });
        try {
            const audioResults = await generateAudioForSegmentsAction(segments);
            console.log("audioResults", audioResults)
            if (audioResults.error) {
                throw new Error(audioResults.error);
            }
            if (audioResults.segmentsWithAudio) {
                 setSegments(audioResults.segmentsWithAudio);
                 setIsPreviewing(true);
                 toast.success('Audio ready!', { description: 'Your video preview is ready to play.' });
            }
        } catch (error: any) {
            toast.error('Audio Generation Failed', { description: error.message });
        }
    });
  }

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
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="topic"
              name="topic"
              placeholder="e.g., 'The Future of Renewable Energy'"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            {state?.errors?.topic && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.topic[0]}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>
        {isPreviewing && segments.length > 0 && (
          <VideoPreviewPlayer segments={segments} onExit={() => setIsPreviewing(false)} />
        )}
        
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {segments.map((segment, index) => (
                <ScriptSegmentItem
                  key={segment.id}
                  segment={segment}
                  index={index}
                  setSegments={setSegments}
                  topic={topic}
                />
              ))}
               <div className="pt-4 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleAddSegment}>
                        <PlusCircle />
                        <span>Add Segment</span>
                    </Button>
                    <Button className="flex-1" onClick={handlePreview} disabled={isGeneratingAudio}>
                        {isGeneratingAudio ? <LoaderCircle className="animate-spin" /> : <PlayCircle />}
                        <span>Preview</span>
                    </Button>
                </div>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}