import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// 1. Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Good practice to force HTTPS
});

// 2. Export the configured cloudinary object for use in other files
export { cloudinary };

// 3. Fix the upload function
export const uploadVideo = async ({ mp4Url }: { mp4Url: string }) => {
  try {
    // 4. Use the configured 'cloudinary' object
    const result = await cloudinary.uploader.upload(mp4Url, {
      resource_type: "video",
    });
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

// Function to merge a video with an audio track using Cloudinary transformations.
export const mergeVideoAndAudio = async (
  videoPublicId: string,
  audioPublicId: string,
  mergedPublicId: string
) => {
  try {
    // The transformation uses the 'videoPublicId' as the base asset,
    // and layers the 'audioPublicId' onto it.
    const result = await cloudinary.uploader.upload(videoPublicId, {
      resource_type: "video",
      public_id: mergedPublicId,
      // Apply the audio overlay transformation
      transformation: [
        {
          // 'l_audio:' + audioPublicId creates an audio layer
          overlay: "audio:" + audioPublicId,
          // 'fl_layer_apply' applies the layer
          flags: "layer_apply",
          // The 'e_volume' effect sets the base video's volume to 0 (mute)
          // to ensure only the overlaid audio is heard.
          effect: "volume:0", 
        },
      ],
      // Use 'overwrite: true' if you are testing and want to reuse the public_id
      overwrite: true,
      // Ensure the output format is a common video type
      format: "mp4", 
    });

    return result;
  } catch (error) {
    console.error("Merge failed:", error);
    throw error;
  }
};


// Concatenates two pre-merged videos (which already have audio) into a single video URL.

export const concatenateMergedVideos = (
  video1Id: string,
  video2Id: string,
  width: number,
  height: number
): string => {
  const videoResize: any = {
    height,
    width,
    crop: "fill", // Ensure both videos match dimensions
  };

  return cloudinary.url(video1Id, {
    resource_type: "video",
    transformation: [
      // 1. Resize the BASE video (Video 1)
      videoResize,
      // 2. Prepare the SPLICED video (Video 2)
      {
        flags: "splice",
        overlay: "video:" + video2Id,
        // Apply the same resize transformation to the spliced video
        ...videoResize,
      },
      // 3. Apply the layer transformation (performs the concatenation)
      { flags: "layer_apply" },
    ],
  });
};