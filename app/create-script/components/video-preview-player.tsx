'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import type { ScriptSegment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, X, Eye, Keyboard } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

type VideoPreviewPlayerProps = {
  segments: ScriptSegment[];
  onExit: () => void;
  combinedAudioUrl?: string | null;
};
export default function VideoPreviewPlayer({
  segments,
  onExit,
  combinedAudioUrl,
}: VideoPreviewPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Double-buffered video refs for smooth swaps + a hidden third buffer for second-next preloading
  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);
  const videoRefC = useRef<HTMLVideoElement | null>(null); // hidden preloader for second-next
  const [activeVideoIsA, setActiveVideoIsA] = useState(true);
  const rafRef = useRef<number | null>(null);
  const supportsSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [usingSpeechFallback, setUsingSpeechFallback] = useState(false);
  const speechIndexRef = useRef(0);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakOne = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const seg = segments[index];
    if (!seg) return;
    const utter = new SpeechSynthesisUtterance(seg.text || '');
    utter.rate = 1;
    utter.onstart = () => {
      speechIndexRef.current = index;
      setActiveSegmentIndex(index);
      setIsPlaying(true);
    };
    utter.onend = () => {
      const next = index + 1;
      if (next < segments.length) {
        // small delay ensures video swap has time to prepare
        setTimeout(() => speakOne(next), 50);
      } else {
        setUsingSpeechFallback(false);
        setIsPlaying(false);
      }
    };
    utter.onerror = () => {
      setUsingSpeechFallback(false);
      setIsPlaying(false);
    };
    speechUtteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  const startSpeechFromIndex = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setUsingSpeechFallback(true);
    speechIndexRef.current = index;
    speakOne(index);
  };

  const stopSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    speechUtteranceRef.current = null;
    setUsingSpeechFallback(false);
    setIsPlaying(false);
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showControlsOverride, setShowControlsOverride] = useState(false);
  // Spacebar global handler: toggle play/pause when player is active and focus is not on an input.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ignore if focus is on an input, textarea or a content editable element
      const active = document.activeElement as HTMLElement | null;
      if (active) {
        const tag = active.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || active.isContentEditable) return;
      }
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        try {
          handlePlayPause();
        } catch (err) {
          // swallow
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // intentionally include handlePlayPause dependencies to keep logic up-to-date
  }, [isPlaying, activeSegmentIndex, currentTime, combinedAudioUrl, usingSpeechFallback]);
  const { segmentStartTimes, totalDuration } = useMemo(() => {
    let cumulativeDuration = 0;
    const segmentStartTimes = segments.map((seg) => {
      const startTime = cumulativeDuration;
      cumulativeDuration += seg.duration || 0;
      return startTime;
    });
    return {
      segmentStartTimes,
      totalDuration: cumulativeDuration,
    };
  }, [segments]);
  useEffect(() => {
    // Use double-buffer to preload the active segment visual and the next one.
    const activeVideo = activeVideoIsA ? videoRefA.current : videoRefB.current;
    const inactiveVideo = activeVideoIsA ? videoRefB.current : videoRefA.current;
    if (!activeVideo) return;
    const activeSegment = segments[activeSegmentIndex];
    // ensure activeVideo src is current segment
    if (activeSegment?.visualSrc && activeVideo.src !== activeSegment.visualSrc) {
      activeVideo.src = activeSegment.visualSrc;
      try {
        activeVideo.load();
      } catch {}
    }
    // Don't force-set video currentTime; letting the video play avoids costly seeks
    // which can cause gaps and increased memory usage on some devices.
    if (isPlaying) {
      activeVideo.play().catch(e => console.error('Active video play failed', e));
    } else {
      activeVideo.pause();
    }

    // Preload next segment into inactive video element to reduce gaps
    const nextIndex = Math.min(activeSegmentIndex + 1, segments.length - 1);
    const nextSeg = segments[nextIndex];
    if (inactiveVideo && nextSeg?.visualSrc && inactiveVideo.src !== nextSeg.visualSrc) {
      inactiveVideo.src = nextSeg.visualSrc;
      try {
        inactiveVideo.load();
        inactiveVideo.muted = true;
        inactiveVideo.currentTime = 0;
      } catch {}
    }
    // Preload second-next visual into hidden preloader (videoRefC)
    const secondNextIndex = Math.min(activeSegmentIndex + 2, segments.length - 1);
    const secondSeg = segments[secondNextIndex];
    if (videoRefC.current && secondSeg?.visualSrc && videoRefC.current.src !== secondSeg.visualSrc) {
      try {
        videoRefC.current.src = secondSeg.visualSrc;
        videoRefC.current.preload = 'auto';
        videoRefC.current.load();
        videoRefC.current.muted = true;
      } catch {}
    }

    // Release far-behind video srcs to reduce memory usage: clear src for segments
    // that are 3+ positions behind the active one.
    try {
      const releaseIndex = activeSegmentIndex - 3;
      if (releaseIndex >= 0) {
        // whichever buffer contained that segment previously can be cleared
        const shouldBeA = releaseIndex % 2 === 0;
        const refToClear = shouldBeA ? videoRefA.current : videoRefB.current;
        if (refToClear && refToClear.src) {
          refToClear.pause();
          refToClear.removeAttribute('src');
          try { refToClear.load(); } catch {}
        }
      }
    } catch {}
  }, [activeSegmentIndex, segments, segmentStartTimes, currentTime, isPlaying]);

  // When active segment changes, alternate which buffer is visible to create a crossfade effect
  useEffect(() => {
    setActiveVideoIsA((prev) => (activeSegmentIndex % 2 === 0));
  }, [activeSegmentIndex]);

  // Use the audio element's timeupdate event to sync visuals. This reduces CPU
  // and memory pressure compared to a RAF loop while still keeping visuals
  // in sync with audio.
  // `handleTimeUpdate` (attached to the audio element) performs the updates.
  
  // Cleanup on unmount: stop RAF, speech, and release media srcs to free memory
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      try {
        stopSpeech();
      } catch {}
      try {
        const a = audioRef.current;
        if (a) {
          a.pause();
          a.removeAttribute('src');
          try { a.load(); } catch {}
        }
      } catch {}
      [videoRefA.current, videoRefB.current, videoRefC.current].forEach((v) => {
        try {
          if (v) {
            v.pause();
            v.removeAttribute('src');
            try { v.load(); } catch {}
          }
        } catch {}
      });
    };
  }, []);

  // Keep audio element in sync. If `combinedAudioUrl` is provided use it as a single
  // full-length audio track; otherwise switch per-segment audio srcs.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (combinedAudioUrl) {
      if (audio.src !== combinedAudioUrl) {
        audio.src = combinedAudioUrl;
        audio.load();
      }
      // audio.currentTime is global in combined mode
      try { audio.currentTime = Math.max(0, Math.min(currentTime, totalDuration)); } catch {}
      if (isPlaying) audio.play().catch(() => {});
      return;
    }

    const seg = segments[activeSegmentIndex];
    if (!seg) return;
      if (seg.audioSrc) {
      if (audio.src !== seg.audioSrc) {
        audio.src = seg.audioSrc;
        audio.load();
      }
      const timeWithinSegment = currentTime - segmentStartTimes[activeSegmentIndex];
      // clamp
      try { audio.currentTime = Math.max(0, Math.min(timeWithinSegment, seg.duration || 0)); } catch {}
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    } else {
      // No audio for this segment: pause audio and if playing, advance to next segment.
      audio.pause();
      if (isPlaying) {
        setTimeout(() => {
          if (activeSegmentIndex < segments.length - 1) {
            setActiveSegmentIndex((i) => i + 1);
          } else {
            setIsPlaying(false);
          }
        }, 50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSegmentIndex, currentTime, isPlaying, combinedAudioUrl]);
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // If combined audio is used, audio.currentTime is the global time. Otherwise compute global time
    const globalTime = combinedAudioUrl ? audio.currentTime : (segmentStartTimes[activeSegmentIndex] + audio.currentTime);
    setCurrentTime(globalTime);
    const newSegmentIndex = segmentStartTimes.findIndex(
      (startTime, index) =>
        globalTime >= startTime &&
        (index === segments.length - 1 || globalTime < segmentStartTimes[index + 1])
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
      // pause speech if using fallback
      if (usingSpeechFallback && typeof window !== 'undefined' && window.speechSynthesis) {
      if (audio.src !== combinedAudioUrl) {
        audio.src = combinedAudioUrl!;
        try { audio.load(); } catch {}
      }
      if (isPlaying) audio.play().catch(() => {});
      }
      // If combined audio is provided, ensure audio.src points to it and position at global time
      if (combinedAudioUrl) {
        if (audio.src !== combinedAudioUrl) {
          audio.src = combinedAudioUrl;
          audio.load();
        }
        audio.currentTime = Math.max(0, Math.min(currentTime, totalDuration));
      } else {
        // If audio src is not set (e.g., first play), set it to the active segment
        if (!audio.src) {
          const seg = segments[activeSegmentIndex];
          if (seg?.audioSrc) {
            audio.src = seg.audioSrc;
            audio.load();
            audio.currentTime = Math.max(0, currentTime - segmentStartTimes[activeSegmentIndex]);
          }
        }
      }
      // If using speech fallback and no audio src available, resume speech
      if (usingSpeechFallback && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.resume();
      }
      audio.play().catch((e) => console.error('Audio play failed', e));
    }
    setIsPlaying(!isPlaying);
  };
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    // If using combined audio, seek the single audio track directly
    if (combinedAudioUrl) {
      if (audio.src !== combinedAudioUrl) {
        audio.src = combinedAudioUrl;
        audio.load();
      }
      audio.currentTime = Math.max(0, Math.min(newTime, totalDuration));
      setCurrentTime(newTime);
      const newIndex = segmentStartTimes.findIndex((s, i) => newTime >= s && (i === segments.length - 1 || newTime < segmentStartTimes[i + 1]));
      if (newIndex !== -1) setActiveSegmentIndex(newIndex);
      if (isPlaying) audio.play().catch(() => {});
      return;
    }

    // If using speech fallback, seeking isn't precise; cancel speech and jump to segment
    if (usingSpeechFallback && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const newIndex = segmentStartTimes.findIndex((s, i) => newTime >= s && (i === segments.length - 1 || newTime < segmentStartTimes[i + 1]));
      if (newIndex !== -1) {
        setActiveSegmentIndex(newIndex);
        // start speech from this index
        startSpeechFromIndex(newIndex);
      }
      setCurrentTime(newTime);
      return;
    }

    // determine which segment the newTime falls into
    const targetIndex = segmentStartTimes.reduce((acc, start, idx) => {
      if (newTime >= start) return idx;
      return acc;
    }, 0);
    const segIndex = Math.min(targetIndex, segments.length - 1);
    const segStart = segmentStartTimes[segIndex];
    const seg = segments[segIndex];
    if (!seg) return;
    const timeWithinSegment = Math.max(0, newTime - segStart);
    setActiveSegmentIndex(segIndex);
    // update audio src to target segment and set currentTime
    if (seg.audioSrc && audio.src !== seg.audioSrc) {
      audio.src = seg.audioSrc;
      audio.load();
      audio.currentTime = timeWithinSegment;
    } else if (seg.audioSrc) {
      audio.currentTime = timeWithinSegment;
    }
    setCurrentTime(newTime);
    if (isPlaying) {
      audio.play().catch(() => {});
    }
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
  // If no segments have audio, show an error
  const hasAnyAudio = combinedAudioUrl || segments.some((s) => s.audioSrc);
  if (!hasAnyAudio) {
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
      {/* Desktop control override toggle (visible on md+) - placed outside the overlay so
          users can always toggle controls even when overlay is hidden on hover. */}
      <div className="absolute top-3 right-12 hidden md:flex items-center gap-2 z-50">
        <Button
          size="sm"
          variant={showControlsOverride ? 'outline' : 'ghost'}
          className="text-white hover:bg-white/10"
          onClick={() => setShowControlsOverride((v) => !v)}
          aria-pressed={showControlsOverride}
          title={showControlsOverride ? 'Hide controls' : 'Show controls'}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <div className="hidden lg:flex items-center gap-2 text-white text-xs">
          <Keyboard className="w-3 h-3 opacity-80" />
          <span>Space to play/pause</span>
        </div>
      </div>

      {/* Double-buffered videos stacked; only active one is visible. Crossfade via transition-opacity. */}
      <div className="w-full h-full relative">
        <video
          ref={videoRefA}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-linear ${activeVideoIsA ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          preload="auto"
          playsInline
          muted
        />
        <video
          ref={videoRefB}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-linear ${!activeVideoIsA ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          preload="auto"
          playsInline
          muted
        />
        {/* Hidden preloader video for second-next visual */}
        <video ref={videoRefC} style={{ display: 'none' }} muted preload="auto" />
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          // When a segment audio ends, advance to the next segment and continue playback if any
          if (activeSegmentIndex < segments.length - 1) {
            setActiveSegmentIndex((i) => i + 1);
            // small delay to allow src switch in effect hook
            setTimeout(() => {
              const a = audioRef.current;
              if (a) a.play().catch(() => {});
            }, 50);
          } else {
            setIsPlaying(false);
          }
        }}
        muted={isMuted}
      />

      {/* Controls overlay: visible by default on small screens (touch devices).
          On md+ screens it's hover-only unless the desktop override toggle is set.
          showControlsOverride forces visibility on md+ screens. */}
      <div
        className={
          `absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity flex flex-col justify-between p-4 ` +
          (showControlsOverride
            ? 'opacity-100 md:opacity-100'
            : 'opacity-100 md:opacity-0 md:group-hover/player:opacity-100')
        }
      >
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