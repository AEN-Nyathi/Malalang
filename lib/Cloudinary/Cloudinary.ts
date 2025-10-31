import { v2 as cloudinary, TransformationOptions } from "cloudinary";
import "dotenv/config";
import { ScriptSegment } from "../types";

// 1. Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Good practice to force HTTPS
});

// 2. Export the configured cloudinary object for use in other files
export { cloudinary };

// --- Configuration Constants ---
const ASSET_WIDTH = 640;
const ASSET_HEIGHT = 480;

// 🔑 FIX: This function should only generate a URL for the merged asset,
// not attempt a new upload operation on the base video ID.
// The new merged asset will be created by the Cloudinary CDN when the URL is first requested.
export const getMergedVideoUrl = (
  videoPublicId: string,
  audioPublicId: string,
  width: number,
  height: number
): string => {
  // Use cloudinary.url() to generate the URL with the transformation.
  return cloudinary.url(videoPublicId, {
    resource_type: "video",
    transformation: [
      { width, height, crop: "fill" }, // Resize the base video first
      {
        // Overlay the audio track
        overlay: "audio:" + audioPublicId,
        flags: "layer_apply", // Mute the original video track
        effect: "volume:0",
      },
    ],
    format: "mp4",
  });
};

// Generic function to upload a file from a URL to Cloudinary.
export const uploadAssetFromUrl = async (
  url: string,
  resourceType: "video" | "raw",
  publicIdPrefix: string
): Promise<string> => {
  try {
    // This function is correct: it uploads a remote URL.
    const result = await cloudinary.uploader.upload(url, {
      resource_type: resourceType,
      public_id: `${publicIdPrefix}-${Date.now()}`,
      folder: "segment_uploads",
    });
    return result.public_id;
  } catch (error) {
    console.error(`Upload failed for ${resourceType} at ${url}:`, error);
    throw error;
  }
};

/**
 * Chains multiple video public IDs together using chained transformations on the URL.
 * (This logic is correct for concatenation via URL transformations)
 */
export const concatenateSegmentsSequentially = (
  videoIds: string[],
  width: number,
  height: number
): string => {
  if (videoIds.length === 0) return "";
  if (videoIds.length === 1) {
    return cloudinary.url(videoIds[0], {
      resource_type: "video",
      transformation: [{ width, height, crop: "fill" }],
    });
  }

  const baseVideoId = videoIds[0];
  const splicedIds = videoIds.slice(1);

  const transformationChain: TransformationOptions[] = [
    {
      height: height,
      width: width,
      crop: "fill",
    },
  ];

  for (const splicedId of splicedIds) {
    transformationChain.push({
      flags: "splice",
      overlay: "video:" + splicedId,
      height: height,
      width: width,
      crop: "fill",
    });
    transformationChain.push({ flags: "layer_apply" });
  }

  return cloudinary.url(baseVideoId, {
    resource_type: "video",
    transformation: transformationChain,
  });
};



const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const generateFinalVideo = async (
  segments: ScriptSegment[]
): Promise<string> => {
  if (segments.length === 0) {
    throw new Error("No segments provided for video generation.");
  } // 1. Check for missing source assets before starting

  for (const segment of segments) {
    if (!segment.visualSrc || !segment.audioSrc) {
      throw new Error(
        `Segment ${segment.id} is missing source assets (visualSrc or audioSrc).`
      );
    }
  }

  let mergedSegmentIds: string[] = []; // --- STEP 1: Uploading individual segment assets (Audio + Video) ---

  console.log("Step 1/4: Starting parallel upload of all raw assets..."); // 🔑 FIX: uploadPromises must be defined here

  const uploadPromises = segments.map(async (segment) => {
    const videoUrl = segment.visualSrc!;
    const audioUrl = segment.audioSrc!;

    const [videoId, audioId] = await Promise.all([
      uploadAssetFromUrl(videoUrl, "video", `raw-vid-${segment.id}`),
      uploadAssetFromUrl(audioUrl, "raw", `raw-aud-${segment.id}`),
    ]);
    return { videoId, audioId };
  });

  const uploadedAssets = await Promise.all(uploadPromises);
  console.log(`Step 1/4 Complete. ${uploadedAssets.length} segments uploaded.`); // 🔑 FIX: Wait 1 to 2 seconds to allow Cloudinary's indexing to catch up.

  console.log("Waiting 2 seconds for Cloudinary indexing...");
  await delay(2000); // Wait 2000 milliseconds (2 seconds) // --- STEP 2: Explicitly Creating Derived Merged Assets ---

  console.log(
    "Step 2/4: Explicitly creating derived Merged Assets (to get Public IDs)..."
  );
  const MERGED_FOLDER = "segment_uploads/merged";

 // In Cloudinary.ts, inside generateFinalVideo

// ...

const explicitMergePromises = uploadedAssets.map((asset) => {
    
    // 1. Define the base asset reference as an object
    // This explicitly tells Cloudinary the resource_type and type of the source asset.
   const baseAssetRef = {
        public_id: asset.videoId,
        resource_type: 'video', // The type of the SOURCE asset
        type: 'upload',         // The storage type of the SOURCE asset
    };
    
    // 2. The rest of your variables remain the same (they are correct)
    const baseVideoPublicId = asset.videoId; 
    const cleanAudioPublicId = asset.audioId.replace(/\.(mp3|wav|ogg|m4a)$/i, ''); 
    const MERGED_FOLDER = "segment_uploads/merged";
    const newMergedPublicId = `${MERGED_FOLDER}/merged-${Date.now()}-${baseVideoPublicId.split('/').pop()}`;

    // 3. Call explicit using the object reference
    return cloudinary.uploader
        .explicit(baseAssetRef as any, { // <-- FIX: Assert type as 'any'
            // Note: The options below are for the *NEW DERIVED* asset
            type: "upload",
            resource_type: "video",
            public_id: newMergedPublicId,
            
            // Eager transformation logic is correct
            eager: [
                {
                    overlay: "audio:" + cleanAudioPublicId, 
                    flags: "layer_apply",
                    effect: "volume:0",
                    width: ASSET_WIDTH,
                    height: ASSET_HEIGHT,
                    crop: "fill",
                    format: "mp4",
                },
            ],
        })
        .then((result) => result.public_id);
});

// ...

  mergedSegmentIds = await Promise.all(explicitMergePromises);
  console.log(
    `Step 2/4 Complete. ${mergedSegmentIds.length} derived assets created.`
  ); // --- STEP 3: Concatenation of all merged segments ---

  console.log("Step 3/4: Generating final concatenation URL...");

  const finalVideoUrl = concatenateSegmentsSequentially(
    mergedSegmentIds,
    ASSET_WIDTH,
    ASSET_HEIGHT
  );

  console.log(`Step 3/4 Complete. Final URL generated.`); // --- STEP 4: Finalize by returning a full merged video url ---

  return finalVideoUrl;
};
