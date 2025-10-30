import { createClient } from "pexels";
if (!process.env.PEXELS_API_KEY) {
  console.error("Pexels API key missing");
}

const pexelsClient = process.env.PEXELS_API_KEY
  ? createClient(process.env.PEXELS_API_KEY)
  : null;

export const getVideo = async ({ query }: { query: string }) => {
  if (pexelsClient) {
    try {
      const videoSearch = await pexelsClient.videos.search({ query, per_page: 1 });

      // 1. Check if the response has an error property (though Pexels tends to use HTTP status codes for errors)
      // 2. Check if the 'videos' array exists and has at least one video.
      if (!('error' in videoSearch) && videoSearch.videos && videoSearch.videos.length > 0) {
        
        // **CORRECTION:** Access the video_files array from the first video object
        const firstVideo = videoSearch.videos[0];
        
        // Now you can safely search the video_files array of the first video
        const mp4File = firstVideo.video_files.find(
          (f: any) => (f.file_type as string) === 'video/mp4' && f.quality !== 'hls'
        );
        
        if (mp4File) {
          return mp4File;
        }
      }
    } catch (e) {
      console.error("Pexels lookup failed", e);
    }
  }
};
