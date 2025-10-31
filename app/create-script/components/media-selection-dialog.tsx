'use client';
import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import type { MediaAsset } from '@/lib/types';
import { initialProject } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';

import { LoaderCircle, Clapperboard, Video as VideoIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { Video } from 'pexels';
import { searchPexelsVideosAction } from '@/lib/pexels/pexels';
type MediaSelectionDialogProps = {
  onSelect: (src: string) => void;
  initialSearchQuery?: string;
  topic?: string;
};
const generateSuggestions = (topic?: string, initialQuery?: string) => {
    const baseSuggestions = ["abstract", "city", "nature", "tech", "business", "food", "travel", "art", "ai"];
    const suggestions = new Set<string>();
    if (topic) {
        topic.split(' ').forEach(word => suggestions.add(word.toLowerCase()));
    }
    if (initialQuery) {
        initialQuery.split(' ').forEach(word => suggestions.add(word.toLowerCase()));
    }
    baseSuggestions.forEach(s => suggestions.add(s));
    return Array.from(suggestions).slice(0, 10);
}
export default function MediaSelectionDialog({ onSelect, initialSearchQuery, topic }: MediaSelectionDialogProps) {
  // const mediaAssets: MediaAsset[] = initialProject.mediaAssets;
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const suggestionKeywords = generateSuggestions(topic, initialSearchQuery);
  const handleSearch = async (query: string) => {
    if (!query) return;
    setIsSearching(true);
    setSearchResults([]);
    try {
      const result = await searchPexelsVideosAction(query);
      if (result.success && result.videos) {
        setSearchResults(result.videos);
        if (result.videos.length === 0) {
            toast('No results', { description: 'Try a different search term.' });
        }
      } else {
        throw new Error(result.error || 'Failed to search for videos');
      }
    } catch (error: any) {
      toast.error('Search Failed', {
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setIsSearching(false);
    }
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchQuery);
  }
  useEffect(() => {
    if (initialSearchQuery) {
      handleSearch(initialSearchQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearchQuery]);
  const getBestVideoFile = (video: Video) => {
    // Prefer mp4 format if available
    const mp4File = video.video_files.find(f => (f.file_type as string) === 'video/mp4' && f.quality !== 'hls');
    if (mp4File) return mp4File;
    // Fallback to the first available video file
    return video.video_files[0];
  };
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="stock-media" className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-media">My Media</TabsTrigger>
          <TabsTrigger value="stock-media">Stock Video</TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-auto mt-4">
          <ScrollArea className="h-full pr-4">
            <TabsContent value="my-media">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* {mediaAssets.map(asset => (
                  <div key={asset.id} className="aspect-video relative rounded-md overflow-hidden group cursor-pointer" onClick={() => onSelect(asset.thumbnail)}>
                    <Image src={asset.thumbnail} alt={asset.name} fill className="object-cover" data-ai-hint={asset.hint} />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-xs font-bold text-center p-1">{asset.name}</p>
                    </div>
                  </div>
                ))} */}
              </div>
            </TabsContent>
            <TabsContent value="stock-media" className="space-y-4">
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <Input 
                  placeholder="e.g. 'A cat riding a skateboard'" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
                <Button type="submit" disabled={isSearching || !searchQuery}>
                  {isSearching ? <LoaderCircle className="animate-spin" /> : 'Search'}
                </Button>
              </form>
              <div className="flex flex-wrap gap-2">
                {suggestionKeywords.map(keyword => (
                    <Button 
                        key={keyword}
                        variant="outline"
                        size="sm"
                        className="rounded-full capitalize"
                        onClick={() => {
                            setSearchQuery(keyword);
                            handleSearch(keyword);
                        }}
                        disabled={isSearching}
                    >
                        {keyword}
                    </Button>
                ))}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {isSearching && (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center gap-2 text-muted-foreground animate-pulse">
                      <VideoIcon className="w-8 h-8" />
                    </div>
                  ))
                )}
                {searchResults.map((video) => {
                    const videoFile = getBestVideoFile(video);
                    return videoFile ? (
                        <div 
                          key={video.id} 
                          className="aspect-video relative rounded-md overflow-hidden group cursor-pointer bg-muted" 
                          onClick={() => onSelect(videoFile.link)}
                          onMouseEnter={() => videoRefs.current[video.id]?.play()}
                          onMouseLeave={() => {
                            const vid = videoRefs.current[video.id];
                            if (vid) {
                              vid.pause();
                              vid.currentTime = 0;
                            }
                          }}
                        >
                            <video 
                              ref={(el) => { videoRefs.current[video.id] = el; }}
                              src={videoFile.link} 
                              className="object-cover w-full h-full"
                              loop 
                              muted 
                              playsInline 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white text-xs font-bold text-center p-1">Select this video</p>
                            </div>
                        </div>
                    ) : null;
                })}
                {!isSearching && searchResults.length === 0 && (
                    <div className="aspect-video bg-muted/50 rounded-md flex flex-col items-center justify-center gap-2 text-muted-foreground col-span-full text-center p-4">
                        <Clapperboard className="w-10 h-10" />
                        <p className="text-sm">Search for stock videos</p>
                        <p className="text-xs">Enter a search term above to find videos from Pexels.</p>
                    </div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}