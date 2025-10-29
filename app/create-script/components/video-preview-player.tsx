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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // We render merged visuals into a canvas; media refs preload per-segment videos/images.
  const rafRef = useRef<number | null>(null);
  const drawRafRef = useRef<number | null>(null);
  const mediaRefs = useRef<Array<{ video?: HTMLVideoElement; img?: HTMLImageElement; loaded?: boolean }>>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufferSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const combinedAudioBufferRef = useRef<AudioBuffer | null>(null);
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
  // Controls are always visible per user request; no override state needed.
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
  const { segmentStartTimes: _computedSegmentStartTimes, totalDuration: _computedTotalDuration } = useMemo(() => {
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

  // Keep start times static for this playback instance and allow the audio
  // element to override the total duration when metadata is available.
  const [segmentStartTimes] = useState<number[]>(_computedSegmentStartTimes);
  const [totalDuration, setTotalDuration] = useState<number>(_computedTotalDuration);
  // Preload media for canvas drawing and size the canvas to the container.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(16, Math.floor(rect.width));
      canvas.height = Math.max(16, Math.floor(rect.height));
    }

    // create offscreen media elements for each segment
    mediaRefs.current = segments.map((seg) => {
      const item: { video?: HTMLVideoElement; img?: HTMLImageElement; loaded?: boolean } = {};
      try {
        if (seg.visualSrc && (seg.visualSrc.endsWith('.mp4') || seg.visualSrc.includes('pexels.com'))) {
          const v = document.createElement('video');
          v.muted = true;
          v.playsInline = true;
          v.preload = 'auto';
          v.crossOrigin = 'anonymous';
          v.src = seg.visualSrc;
          v.load();
          item.video = v;
          v.oncanplay = () => { item.loaded = true; };
        } else if (seg.visualSrc) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = seg.visualSrc;
          img.onload = () => { item.loaded = true; };
          item.img = img;
        }
      } catch {
        // ignore
      }
      return item;
    });

    return () => {
      // cleanup
      mediaRefs.current.forEach((m) => {
        try {
          if (m.video) {
            m.video.pause();
            m.video.removeAttribute('src');
          }
        } catch {}
      });
      mediaRefs.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // No per-element video buffering needed with canvas rendering; mediaRefs handle preloads.

  // Canvas rendering draws the correct media for the active segment.

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
      // release any preloaded offscreen media
      mediaRefs.current.forEach((m) => {
        try {
          if (m.video) {
            m.video.pause();
            m.video.removeAttribute('src');
            try { m.video.load(); } catch {}
          }
          if (m.img) {
            // image cleanup not strictly necessary, but clear src
            try { (m.img as HTMLImageElement).src = ''; } catch {}
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

  // Draw loop: render active media into canvas synchronized to audio (either <audio> or AudioContext playback)
  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const draw = () => {
      try {
        if (!isMounted) return;
        if (!ctx || !canvas) {
          drawRafRef.current = requestAnimationFrame(draw);
          return;
        }
        // compute global time
        let globalTime = currentTime;
        // if we're using AudioContext source, estimate currentTime via ctx.currentTime
        if (!combinedAudioUrl && audioBufferSourceRef.current && audioCtxRef.current && audioCtxRef.current.state === 'running') {
          // we can't get exact playback head from BufferSource, so use audioCtx.currentTime anchored by when started
          // this is a best-effort; currentTime is already updated by handleTimeUpdate when using <audio>
        }

        // determine active segment
        const idx = segmentStartTimes.findIndex((s, i) => globalTime >= s && (i === segments.length - 1 || globalTime < segmentStartTimes[i + 1]));
        const segIndex = idx === -1 ? activeSegmentIndex : idx;
        const seg = segments[segIndex];

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const media = mediaRefs.current[segIndex];
        const drawMedia = () => {
          if (!media) return;
          // maintain aspect by drawing to cover
          const cw = canvas.width;
          const ch = canvas.height;
          if (media.video && media.video.readyState >= 2) {
            try {
              // ensure video is playing
              if (media.video.paused && isPlaying) {
                media.video.play().catch(() => {});
              }
              ctx.drawImage(media.video as CanvasImageSource, 0, 0, cw, ch);
            } catch {}
          } else if (media.img && media.img.complete) {
            try { ctx.drawImage(media.img, 0, 0, cw, ch); } catch {}
          } else {
            // fallback: draw black background
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        };

        drawMedia();
      } catch (err) {
        // swallow
      }
      drawRafRef.current = requestAnimationFrame(draw);
    };

    if (isPlaying) {
      drawRafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      isMounted = false;
      if (drawRafRef.current) {
        cancelAnimationFrame(drawRafRef.current);
        drawRafRef.current = null;
      }
    };
    // we intentionally include currentTime and isPlaying so drawing follows playback
  }, [isPlaying, currentTime, segmentStartTimes, segments, combinedAudioUrl]);
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      // Pause playback
      try { audio.pause(); } catch {}
      if (usingSpeechFallback && typeof window !== 'undefined' && window.speechSynthesis) {
        try { window.speechSynthesis.pause(); } catch {}
      }
      setIsPlaying(false);
      return;
    }

    // Start playback (user-initiated)
    // If combined audio is available, point the audio element at it and play.
    if (combinedAudioUrl) {
      if (audio.src !== combinedAudioUrl) {
        audio.src = combinedAudioUrl!;
        try { audio.load(); } catch {}
      }
      try {
        audio.play().catch((e) => console.error('Audio play failed', e));
      } catch {}
      setIsPlaying(true);
      return;
    }

    // No combined audio: try per-segment audio or fallback to speech synthesis.
    const seg = segments[activeSegmentIndex];
    const hasPerSegmentAudio = segments.some((s) => s.audioSrc);
    if (!hasPerSegmentAudio && supportsSpeech) {
      startSpeechFromIndex(activeSegmentIndex);
      return;
    }

    if (hasPerSegmentAudio) {
      // If we already built a combined AudioBuffer, schedule it via AudioContext.
      const startCombinedPlayback = async () => {
        try {
          if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          const ctx = audioCtxRef.current!;
          if (!combinedAudioBufferRef.current) {
            // build combined buffer
            const buffers: AudioBuffer[] = [];
            for (const s of segments) {
              if (!s.audioSrc) {
                // insert silence of segment.duration if provided
                if (s.duration && s.duration > 0) {
                  const sampleRate = ctx.sampleRate;
                  const length = Math.floor(s.duration * sampleRate);
                  const silence = ctx.createBuffer(1, length, sampleRate);
                  buffers.push(silence);
                }
                continue;
              }
              try {
                const resp = await fetch(s.audioSrc);
                const ab = await resp.arrayBuffer();
                const decoded = await ctx.decodeAudioData(ab);
                buffers.push(decoded);
              } catch (err) {
                // on error, fallback to silence for that segment length
                if (s.duration && s.duration > 0) {
                  const sampleRate = ctx.sampleRate;
                  const length = Math.floor(s.duration * sampleRate);
                  const silence = ctx.createBuffer(1, length, sampleRate);
                  buffers.push(silence);
                }
              }
            }
            // concatenate buffers into one
            const totalLength = buffers.reduce((acc, b) => acc + b.length, 0);
            const out = ctx.createBuffer(1, totalLength, ctx.sampleRate);
            let offset = 0;
            for (const b of buffers) {
              const data = b.getChannelData(0);
              out.getChannelData(0).set(data, offset);
              offset += b.length;
            }
            combinedAudioBufferRef.current = out;
            setTotalDuration(out.duration);
          }

          // create source and play
          if (audioBufferSourceRef.current) {
            try { audioBufferSourceRef.current.stop(); } catch {}
            audioBufferSourceRef.current.disconnect();
            audioBufferSourceRef.current = null;
          }
          const src = ctx.createBufferSource();
          src.buffer = combinedAudioBufferRef.current!;
          src.connect(ctx.destination);
          src.start(0);
          audioBufferSourceRef.current = src;
          setIsPlaying(true);
        } catch (err) {
          console.error('Combined audio playback failed', err);
          // fallback: try per-segment audio via <audio>
          if (seg?.audioSrc) {
            if (audio.src !== seg.audioSrc) {
              audio.src = seg.audioSrc;
              try { audio.load(); } catch {}
            }
            try { audio.play().catch(() => {}); } catch {}
            setIsPlaying(true);
          }
        }
      };
      startCombinedPlayback();
      return;
    }

    if (seg?.audioSrc) {
      if (audio.src !== seg.audioSrc) {
        audio.src = seg.audioSrc;
        try { audio.load(); } catch {}
      }
      try { audio.play().catch(() => {}); } catch {}
      setIsPlaying(true);
    }
  };
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    // If using combined audio, seeking is disabled — user controls only play/pause.
    if (combinedAudioUrl) {
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
          {/* Controls always visible — remove the desktop-only toggle that forced hover behavior. */}

      {/* Double-buffered videos stacked; only active one is visible. Crossfade via transition-opacity. */}
      <div className="w-full h-full relative">
        {/* Canvas for merged preview rendering */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
        {/* Canvas-only rendering; visuals are preloaded into offscreen mediaRefs and drawn into the canvas. */}
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={() => {
          try {
            const a = audioRef.current;
            if (a && a.duration && !Number.isNaN(a.duration) && a.duration > 0) {
              setTotalDuration(a.duration);
            }
          } catch {}
        }}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity flex flex-col justify-between p-4 opacity-100">
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
            disabled={!!combinedAudioUrl}
          />
          {combinedAudioUrl && (
            <div className="text-white text-xs mt-1">Seeking disabled while using combined audio preview. Use play/pause.</div>
          )}
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