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

// --- The full video generation pipeline ---
export const generateFinalVideo = async (
  segments: ScriptSegment[]
): Promise<string> => {
  if (segments.length === 0) {
    throw new Error("No segments provided for video generation.");
  } // 1. Check for missing source assets before starting (Your check is good)
  for (const segment of segments) {
    if (!segment.visualSrc || !segment.audioSrc) {
      throw new Error(
        `Segment ${segment.id} is missing source assets (visualSrc or audioSrc).`
      );
    }
  }

  let mergedSegmentIds: string[] = []; // 🔑 CHANGE: Store URLs, not public IDs // --- STEP 1: Uploading individual segment assets (Audio + Video) ---

  console.log("Step 1/4: Starting parallel upload of all raw assets...");

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
  console.log(`Step 1/4 Complete. ${uploadedAssets.length} segments uploaded.`); // --- STEP 2: Generating Merged URLs for each segment ---

  console.log("Step 2/4: Starting parallel Audio/Video URL generation..."); // 🔑 FIX: Instead of attempting to merge and save a new public_id, // we generate the URL for the merged asset.

  const mergeUrls = uploadedAssets.map((asset) => {
    return getMergedVideoUrl(
      asset.videoId,
      asset.audioId,
      ASSET_WIDTH,
      ASSET_HEIGHT
    );
  }); // 🔑 IMPORTANT: To use concatenateSegmentsSequentially (which expects public IDs), // --- Simplified Merged ID Generation (We use the base video ID and rely on the full chain) --- // --- CORRECTED STEP 2: Explicitly Creating Derived Merged Assets ---

  // we must get the public IDs from the merged URLs. This requires an extra step.
  // The simplest way to proceed is to explicitly create the derived assets here,
  // but let's stick to the most serverless approach:
  // We'll generate the full URL chain at the end, eliminating the need to save temporary merged public IDs.

  // To avoid complex chaining issues when combining audio/video merge and segment concatenation,
  // we must first derive the merged assets using the 'eager' property or the 'explicit' method
  // to get a persistent public ID for the segment.
  // However, since we want to keep it simple and serverless:

  // Let's modify the entire pipeline to use the final concatenation URL as the one true transformation.

  // For the next step to work, we need public IDs that *represent* the merged segments.
  // The simplest (though slightly less efficient) way is to use the original video ID and
  // assume the audio is layered on in the final concatenation step.

  // However, the original structure is better: merge first, then concatenate.
  // Since `getMergedVideoUrl` only returns a URL, we need to save the merged asset to Cloudinary
  // to get a public ID for the next step.

  // ➡️ REVERTING: We need to use `uploader.explicit` to generate a DERIVED asset
  // and get a new public ID.

  console.log(
    "Step 2/4: Explicitly creating derived Merged Assets (to get Public IDs)..."
  );

  // Corrected Step 2 implementation (check asset.videoId)
const explicitMergePromises = uploadedAssets.map((asset) => {
    // If the folder is 'segment_uploads', the asset.videoId returned 
    // from Step 1 is already 'segment_uploads/raw-vid-...'
    
    // We want the new merged asset to also be in that folder.
    const mergedId = `merged-${asset.videoId}`; // 🛑 ERROR PRONE: This adds "merged-" to the full path.

    // Let's ensure the original asset ID is clean before we use it:
    const baseVideoPublicId = asset.videoId; // This is e.g., 'segment_uploads/raw-vid-...'

    // We define the new ID without the folder, and let Cloudinary handle the folder via the API call
    const newMergedPublicId = `merged-${Date.now()}-${asset.videoId.split('/').pop()}`;
    
    // Use explicit() to generate a derived asset from an existing public ID
    return cloudinary.uploader.explicit(baseVideoPublicId, { // Use the full Public ID
        type: 'upload', 
        resource_type: "video",
        public_id: newMergedPublicId, // The ID of the NEW derived asset
        folder: "segment_uploads/merged", // OPTIONAL: Save the merged asset to a new subfolder
        // ... rest of the transformations ...
    }).then(result => result.public_id);
});

  mergedSegmentIds = await Promise.all(explicitMergePromises);
  console.log(
    `Step 2/4 Complete. ${mergedSegmentIds.length} derived assets created.`
  ); // --- STEP 3: Concatenation of all merged segments ---

  console.log("Step 3/4: Generating final concatenation URL...");

  const finalVideoUrl = concatenateSegmentsSequentially(
    mergedSegmentIds, // Use the new public IDs
    ASSET_WIDTH,
    ASSET_HEIGHT
  );

  console.log(`Step 3/4 Complete. Final URL generated.`); // --- STEP 4: Finalize by returning a full merged video url ---

  return finalVideoUrl;
};
