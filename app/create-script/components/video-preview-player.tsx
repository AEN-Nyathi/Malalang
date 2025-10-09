'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import type { ScriptSegment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';

type VideoPreviewPlayerProps = {
  segments: ScriptSegment[];
  onExit: () => void;
};
export default function VideoPreviewPlayer({
  segments,
  onExit,
}: VideoPreviewPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { fullAudioSrc, segmentStartTimes, totalDuration } = useMemo(() => {
    let cumulativeDuration = 0;
    const segmentStartTimes = segments.map((seg) => {
      const startTime = cumulativeDuration;
      cumulativeDuration += seg.duration;
      return startTime;
    });
    const fullAudioSrc = segments.some(s => s.audioSrc) 
      ? segments.map(s => s.audioSrc).join('') // This is a trick; proper concatenation is complex
      : null;
    // For simplicity, we just use the first segment's audio if available.
    // A proper implementation would concatenate all audio blobs.
    const firstAudio = segments.find(s => s.audioSrc)?.audioSrc ?? null;
    return {
      fullAudioSrc: firstAudio,
      segmentStartTimes,
      totalDuration: cumulativeDuration,
    };
  }, [segments]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const activeSegment = segments[activeSegmentIndex];
    if (activeSegment?.visualSrc !== video.src) {
        if (activeSegment?.visualSrc) {
            video.src = activeSegment.visualSrc;
            video.load();
        }
    }
    const timeWithinSegment = currentTime - segmentStartTimes[activeSegmentIndex];
    video.currentTime = timeWithinSegment;
    if (isPlaying) {
      video.play().catch(e => console.error("Video play failed", e));
    } else {
      video.pause();
    }
  }, [activeSegmentIndex, segments, segmentStartTimes, currentTime, isPlaying]);
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    const newSegmentIndex = segmentStartTimes.findIndex(
      (startTime, index) =>
        audio.currentTime >= startTime &&
        (index === segments.length - 1 ||
          audio.currentTime < segmentStartTimes[index + 1])
    );
    if (newSegmentIndex !== -1 && newSegmentIndex !== activeSegmentIndex) {
      setActiveSegmentIndex(newSegmentIndex);
    }
  };
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  if (!fullAudioSrc) {
    return (
        <div className="p-4 rounded-lg bg-destructive text-destructive-foreground">
            Error: Audio source is missing. Cannot play preview.
        </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className="aspect-video w-full bg-black rounded-lg overflow-hidden relative group/player"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        loop
        muted // Main audio is handled by the <audio> tag
      />
      <audio
        ref={audioRef}
        src={fullAudioSrc}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        muted={isMuted}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover/player:opacity-100 transition-opacity flex flex-col justify-between p-4">
        <div className="flex justify-between items-start">
            <h3 className="text-white font-bold text-lg">Preview</h3>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onExit}>
                <X />
                <span className="sr-only">Exit Preview</span>
            </Button>
        </div>
        <div>
          <Slider
            value={[currentTime]}
            max={totalDuration}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause /> : <Play />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleToggleMute}
              >
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>
              <span className="text-white text-xs font-mono">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}