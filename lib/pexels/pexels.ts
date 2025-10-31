'use server';
import { createClient } from "pexels";
import { z } from "zod";

const pexelsClient = createClient(
  "NhEmLCtLjsAqQNN6QRpJGrRRJ5wGUE5FbaFy0Hl829i9ooV6yC9362SN"
);

export const getVideo = async ({ query }: { query: string }) => {
  try {
    const videoSearch = await pexelsClient.videos.search({
      query,
      per_page: 1,
    });

    // 1. Check if the response has an error property (though Pexels tends to use HTTP status codes for errors)
    // 2. Check if the 'videos' array exists and has at least one video.
    if (
      !("error" in videoSearch) &&
      videoSearch.videos &&
      videoSearch.videos.length > 0
    ) {
      // **CORRECTION:** Access the video_files array from the first video object
      const firstVideo = videoSearch.videos[0];

      // Now you can safely search the video_files array of the first video
      const mp4File = firstVideo.video_files.find(
        (f: any) =>
          (f.file_type as string) === "video/mp4" && f.quality !== "hls"
      );

      if (mp4File) {
        return mp4File;
      }
    }
  } catch (e) {
    console.error("Pexels lookup failed", e);
  }
};
const searchPexelsSchema = z.object({
  prompt: z.string().min(1, "Prompt must be at least 3 characters long."),
});
export async function searchPexelsVideosAction(prompt: string) {
  try {
    const validatedFields = searchPexelsSchema.safeParse({ prompt });
    if (!validatedFields.success) {
      return { success: false, videos: null, error: "Invalid prompt." };
    }

    const response = await pexelsClient.videos.search({
      query: validatedFields.data.prompt,
      per_page: 10,
    });
    if ("error" in response) {
      throw new Error(response.error);
    }
    return { success: true, videos: response.videos, error: null };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      videos: null,
      error: e.message || "Failed to search for videos.",
    };
  }
}
