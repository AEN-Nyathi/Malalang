"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Video, Volume2, Download, RefreshCcw } from "lucide-react"; // Added Volume2 for a potential audio icon
import type { ScriptSegment } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MediaSelectionDialog from "./media-selection-dialog";
import Link from "next/link";

type ScriptSegmentItemProps = {
  segment: ScriptSegment;
  index: number;
  setSegments: React.Dispatch<React.SetStateAction<ScriptSegment[]>>;
  topic: string;
};

export default function ScriptSegmentItem({
  segment,
  index,
  setSegments,
  topic,
}: ScriptSegmentItemProps) {
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setSegments((prev) => {
      const newSegments = [...prev];
      newSegments[index].text = newText;
      return newSegments;
    });
  };

  const handleDelete = () => {
    setSegments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectVisual = (visualSrc: string) => {
    setSegments((prev) => {
      const newSegments = [...prev];
      newSegments[index].visualSrc = visualSrc;
      return newSegments;
    });
    setIsMediaDialogOpen(false);
  };

  const isVideo =
    segment.visualSrc &&
    (segment.visualSrc.includes(".mp4") ||
      segment.visualSrc.includes("pexels.com"));

  return (
    <div className="p-4 rounded-lg border bg-brand-primary/10 space-y-3 relative group/segment">
      <div className="flex justify-between items-center ">
        <span className="text-sm font-bold text-primary pt-2">
          {index + 1}.
        </span>
        {/* --- Delete Button (moved and styled slightly) --- */}
        <div className="opacity-0 group-hover/segment:opacity-100 transition-opacity flex">
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground   "
            onClick={handleDelete}
            aria-label="Delete segment"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground   "
          >
            <Link
              href={segment.visualSrc || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground inline-flex items-center"
            > <Download/></Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* --- Media Preview Dialog Trigger --- */}

       
        <span className="sr-only">download video</span>

        <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
          <DialogTrigger asChild>
            <div
              className="aspect-video w-full md:w-48 bg-primary rounded-md overflow-hidden relative group/preview cursor-pointer"
              onMouseEnter={() => videoRef.current?.play().catch(() => {})}
              onMouseLeave={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                }
              }}
            >
              {segment.visualSrc ? (
                isVideo ? (
                  <video
                    ref={videoRef}
                    key={segment.visualSrc}
                    src={segment.visualSrc}
                    className="object-cover w-full h-full"
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={segment.visualSrc}
                    alt={`Visual for segment ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Pencil />
                  <span className="sr-only">Edit video</span>
                </Button>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Select Media</DialogTitle>
            </DialogHeader>
            <MediaSelectionDialog
              onSelect={handleSelectVisual}
              initialSearchQuery={segment.videoSearchQuery}
              topic={topic}
            />
          </DialogContent>
        </Dialog>
        <div className="font-code text-sm flex-1 w-full">
          {/* --- Text Area --- */}

          <Textarea
            value={segment.text}
            onChange={handleTextChange}
            className="font-code text-sm flex-1 bg-card w-full"
            rows={4}
          />
          {segment.audioSrc ? (
            <div className="flex items-center mt-2 gap-2 text-sm text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <span className="font-medium">Voiceover Preview:</span>
              <audio
                key={segment.audioSrc} // Key is important to force re-render/reload when src changes
                src={segment.audioSrc}
                controls
                className="w-full max-w-xs h-8"
                preload="metadata" // Load metadata to show duration quickly
              >
                Your browser does not support the audio element.
              </audio>
              <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground opacity-0 group-hover/segment:opacity-100 transition-opacity"
            onClick={handleDelete}
            aria-label="Delete segment"
          >
          
              <RefreshCcw/>
          </Button>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">
              Audio source is not yet available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
