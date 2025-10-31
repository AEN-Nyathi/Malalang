"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardContent } from "@/components/ui/card";
import ScriptSegmentItem from "./script-segment-item";
import VideoPreviewPlayer from "./video-preview-player";
import type { ScriptSegment } from "@/lib/types";
import ScriptGeneratorForm from "./ScriptGeneratorForm";
import ScriptFooter from "./ScriptFooter";

export default function ScriptPanel() {
  const [Segments, setSegments] = useState<ScriptSegment[]>([]);

  const [isPreview, setIsPreview] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);


  return (
    <CardContent className="flex flex-col gap-4 flex-1 overflow-hidden">
      <ScriptGeneratorForm
        setIsPreview={setIsPreview}
        setSegments={setSegments}
      />

      <div className="flex-1 overflow-auto min-h-0 ">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {Segments.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                Start by entering a topic above, or click "Add Segment" below.
              </p>
            )}
            {Segments.map((segment, index) => (
              <ScriptSegmentItem
                key={segment.id}
                segment={segment}
                index={index}
                setSegments={setSegments}
                topic={segment.videoSearchQuery}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <ScriptFooter
        isPreview={isPreview}
        Segments={Segments}
        setIsPreview={setIsPreview}
        setSegments={setSegments}
      />
    </CardContent>
  );
}
