
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
// VideoPreviewPlayer now only plays a single merged Cloudinary video.
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

type VideoPreviewPlayerProps = {
  onExit: () => void;
  combinedAudioUrl?: string | null;
  combinedVideoUrl?: string | null;
  cloudName?: string;
};

export default function VideoPreviewPlayer({ onExit, combinedAudioUrl, combinedVideoUrl, cloudName }: VideoPreviewPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Note: `next-cloudinary` can be used here for a nicer Cloudinary player.
  // We intentionally avoid importing it directly to keep the bundle free of
  // optional deps. If you want to use `CldVideoPlayer`, install `next-cloudinary`
  // and replace the <video> below with the component.

  const [totalDuration, setTotalDuration] = useState<number>(0);

  // When combined video/audio url changes, load it into the video element.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const src = combinedVideoUrl || combinedAudioUrl || '';
    if (!src) return;
    if (v.src !== src) {
      v.src = src;
      try { v.load(); } catch {}
    }
  }, [combinedVideoUrl, combinedAudioUrl]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const global = v.currentTime || 0;
    setCurrentTime(global);
  };

  useEffect(() => {
    // set total duration when video metadata loads
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => { if (v.duration && !isNaN(v.duration)) setTotalDuration(v.duration); };
    v.addEventListener('loadedmetadata', onMeta);
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, []);

  // No per-segment visuals anymore — playback is driven by the merged Cloudinary video.

  // No separate audio element: playback uses the video element (merged or per-segment).

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
      return;
    }
    v.play().catch(() => {});
    setIsPlaying(true);
  };

  // No per-segment helpers; merged video plays from Cloudinary.

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    const v = videoRef.current;
    if (!v) return;
    try { v.currentTime = newTime; } catch {}
    setCurrentTime(newTime);
    if (isPlaying) v.play().catch(() => {});
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const hasAnyVideo = !!(combinedVideoUrl || combinedAudioUrl);
  if (!hasAnyVideo) {
    return <div className="p-4 rounded-lg bg-destructive text-destructive-foreground">Error: Preview source is missing. Cannot play preview.</div>;
  }
  const videoSrc = combinedVideoUrl || combinedAudioUrl || '';

  const downloadMerged = async () => {
    if (!combinedVideoUrl) return;
    // trigger browser download
    const a = document.createElement('a');
    a.href = combinedVideoUrl;
    a.download = 'preview.mp4';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative group/player">
      <video
        ref={videoRef}
        className="w-full h-full object-cover absolute inset-0"
        src={videoSrc}
        playsInline
        preload="auto"
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity flex flex-col justify-between p-4 opacity-100">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-bold text-lg">Preview</h3>
          <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onExit}>
            <X />
            <span className="sr-only">Exit Preview</span>
          </Button>
        </div>

        <div>
          <Slider value={[currentTime]} max={totalDuration} step={0.1} onValueChange={handleSeek} className="w-full" disabled={false} />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={handlePlayPause}>
                {isPlaying ? <Pause /> : <Play />}
              </Button>
              {combinedVideoUrl && (
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={downloadMerged}>
                  Download
                </Button>
              )}
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>
              <span className="text-white text-xs font-mono">{formatTime(currentTime)} / {formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}