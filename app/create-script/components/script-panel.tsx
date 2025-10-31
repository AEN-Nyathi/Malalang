"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardContent } from "@/components/ui/card";
import {
  WandSparkles,
  LoaderCircle,
  PlusCircle,
  PlayCircle,
} from "lucide-react";
import { toast } from "sonner";
import ScriptSegmentItem from "./script-segment-item";
import VideoPreviewPlayer from "./video-preview-player";
import type { ScriptSegment } from "@/lib/types";
import ScriptGeneratorForm from "./ScriptGeneratorForm";



export default function ScriptPanel() {
  // We'll call API endpoints via fetch instead of using Server Actions


  const [internalSegments, setInternalSegments] = useState<ScriptSegment[]>([]
  );



  const [isPreviewing, setIsPreviewing] = useState(false);

  const [combinedAudioUrl, setCombinedAudioUrl] = useState<string | null>(null);
  const [combinedVideoUrl, setCombinedVideoUrl] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll effect remains the same
  useEffect(() => {
    if (internalSegments.length > 0 && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
        }, 100);
      }
    }
  }, [internalSegments.length]);

  // Handler to add a new segment
  const handleAddSegment = useCallback(() => {
    const newSegment: ScriptSegment = {
      id: `seg-${Date.now()}`,
      text: "New segment text...",
      audioSrc: null,
      visualSrc: null,
      duration: 3, // default duration
      videoSearchQuery: 'business',
    };
    setInternalSegments((prev: ScriptSegment[]) => [...prev, newSegment]);
  }, [ setInternalSegments]);


  // Handler for preview generation
  const handlePreview = async (force = false) => {
    if (!internalSegments || internalSegments.length === 0) {
      toast.error("No segments to generate audio for.");
      return;
    }

    toast.info("Preparing preview...", {
      description:
        "Please wait while we generate audio, merge videos and prepare the preview.",
    });
    try {
      // Request a merged (stored) preview from Cloudinary so we can play a single combined video.
      const resp = await fetch("/api/create-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segments: internalSegments, storeMerged: true }),
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

        const errMsg =
          (json && (json.error || json.message)) ||
          text ||
          "Audio generation failed";
        throw new Error(errMsg);
      }

      // create-script returns { mergedUrl } when storeMerged=true
      if (json && json.mergedUrl) {
        // merged video (stored on Cloudinary) is ready
        setCombinedAudioUrl(null);
        setCombinedVideoUrl(json.mergedUrl);
        setIsPreviewing(true);
        toast.success("Preview ready!", {
          description: "Merged video is ready to play.",
        });
        return;
      }
      if (json && json.transformedUrls) {
        // Server returned per-segment transformed URLs (no stored merged asset).
        const newSegments = internalSegments.map((s, i) => ({
          ...s,
          visualSrc: json.transformedUrls[i] || s.visualSrc,
          audioSrc: (json.audioUrls && json.audioUrls[i]) || s.audioSrc,
        }));
        setInternalSegments(newSegments);
        setIsPreviewing(false);
        toast.success(
          "Per-segment transforms ready. To preview a single merged video, click Preview again after all segments have visual/audio sources."
        );
      }
    } catch (error: any) {
      console.error("Audio Generation Failed", error);
      toast.error("Audio Generation Failed", { description: error?.message });
    }
  };

  return (
    <CardContent className="flex flex-col gap-4 flex-1 overflow-hidden">
      <ScriptGeneratorForm setIsPreviewing={setIsPreviewing} setInternalSegments={setInternalSegments}  />

      <div className="flex-1 overflow-auto min-h-0">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {internalSegments.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                Start by entering a topic above, or click "Add Segment" below.
              </p>
            )}
            {internalSegments.map((segment, index) => (
              <ScriptSegmentItem
                key={segment.id}
                segment={segment}
                index={index}
                setSegments={setInternalSegments}
                topic={segment.videoSearchQuery}
              />
            ))}
            <div className="pt-4 flex gap-2 sticky bottom-0 bg-gray-900 z-10 p-2 -mx-2 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleAddSegment}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                <span>Add Segment</span>
              </Button>
              <Button
                className="flex-1"
                onClick={() => handlePreview(false)}
                disabled={internalSegments.length === 0}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                <span>{"Preview Video"}</span>
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
  );
}
