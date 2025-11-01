import { Button } from "@/components/ui/button";
import type { ScriptSegment } from "@/lib/types";
import { PlayCircle, PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { toast } from "sonner";
import VideoPreviewPlayer from "./video-preview-player";
import { createFinalVideoAction } from "@/lib/Cloudinary/actions";

interface ScriptFooterProps {
  setSegments: Dispatch<SetStateAction<ScriptSegment[]>>;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  Segments: ScriptSegment[];
  isPreview: boolean;
}
export default function ScriptFooter({
  setIsPreview,
  setSegments,
  Segments,
  isPreview,
}: ScriptFooterProps) {
  const [combinedAudioUrl, setCombinedAudioUrl] = useState<string | null>(null);
  const [combinedVideoUrl, setCombinedVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  // Handler to add a new segment
  const handleAddSegment = useCallback(() => {
    const newSegment: ScriptSegment = {
      id: `seg-${Date.now()}`,
      text: "New segment text...",
      audioSrc: null,
      visualSrc: null,
      duration: 3, // default duration
      videoSearchQuery: "business",
    };
    setSegments((prev: ScriptSegment[]) => [...prev, newSegment]);
  }, [setSegments]);

  // Handler for preview generation
  // ScriptFooter.tsx

  // ScriptFooter.tsx

  // ScriptFooter.tsx

  // Handler for preview generation
  const handlePreview = async () => {
    setIsGenerating(false);
    toast.info("Generating video preview...", { duration: 5000 });
    // ... (Your data preparation/cleanup logic to get a cleanSegments array)
    const segmentsToSend = Segments.map((segment) => ({
      // Ensure you only send necessary, serializable data
      id: segment.id,
      text: segment.text,
      audioSrc: segment.audioSrc,
      visualSrc: segment.visualSrc,
      duration: segment.duration,
      videoSearchQuery: segment.videoSearchQuery,
    })).filter((s) => s.audioSrc && s.visualSrc); // Filter out incomplete segments

    if (segmentsToSend.length === 0) {
      toast.error("No complete segments to generate video.");
      setIsGenerating(false);
      return;
    }

    try {
      // 🔑 FIX: Use the standard Fetch API to call the new API Route
      const response = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Pass the segments array in the request body
        body: JSON.stringify({ segments: segmentsToSend }),
      });
      // const url = "https://hooks.mediaflows.cloudinary.com/v3/2fec0b33-05be-4d85-a7a9-b1f3ee83c08c/d197438f-ccf2-45c6-8964-92cd9973fcac"
      //  const response = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   // Pass the segments array in the request body
      //   body: JSON.stringify({ segments: segmentsToSend }),
      // });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS: Response body contains { url: finalUrl }
        const finalUrl = data.url;
        setCombinedVideoUrl(finalUrl);
        console.log("Final video URL received:", finalUrl);
        setIsPreview(true);
        setIsGenerating(false);
        toast.success("Video Preview Ready!");
      } else {
        // FAILURE: Response body contains { error: errorMessage }
        console.error("API Error:", data.error);
        toast.error(`Video generation failed: ${data.error}`);
      }
      setIsPreview(true);
    } catch (error) {
      console.error("Network or JSON parsing error:", error);
      toast.error("An unexpected error occurred while contacting the server.");
    }
  };

  return (
    <div className="pt-4 flex gap-2 sticky bottom-0 bg-gray-900 z-10 p-2 -mx-2 border-t">
      <Button variant="outline" className="flex-1" onClick={handleAddSegment}>
        <PlusCircle className="mr-2 h-5 w-5" />
        <span>Add Segment</span>
      </Button>
      <Button
        className="flex-1"
        onClick={() => handlePreview()}
        disabled={Segments.length === 0 && isGenerating}
      >
        <PlayCircle className="mr-2 h-5 w-5" />
        <span>{"Preview Video"}</span>
      </Button>
      {combinedVideoUrl && (
        <video
          // ref={videoRef}
          className="w-full h-full object-cover absolute inset-0"
          src={combinedVideoUrl}
        />
      )}
    </div>
  );
}
// <VideoPreviewPlayer
//   combinedAudioUrl={combinedAudioUrl}
//   combinedVideoUrl={combinedVideoUrl}
//   onExit={() => {
//     setIsPreview(false);
//     setCombinedAudioUrl(null);
//     setCombinedVideoUrl(null);
//   }}
// />
