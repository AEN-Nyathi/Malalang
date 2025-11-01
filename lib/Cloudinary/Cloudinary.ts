import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { ScriptSegment } from "../types";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const createFinalVideo = async (segments: ScriptSegment[]) => {
  try {
    // Step 1: Upload all assets
    console.log("Uploading assets to Cloudinary...");
    const uploadedAssets = await Promise.all(
      segments.map(async (seg) => {
        const videoUpload = await cloudinary.uploader.upload(seg.visualSrc, {
          resource_type: "video",
          public_id: `video_${seg.id}`,
        });
        const audioUpload = await cloudinary.uploader.upload(seg.audioSrc, {
          resource_type: "video",
          public_id: `audio_${seg.id}`,
        });
        return {
          id: seg.id,
          transcribed: seg.text,
          uploadedAudioUrl: audioUpload.secure_url,
          uploadedVideoUrl: videoUpload.secure_url,
          videoPublic_id: videoUpload.public_id,
          audioPublic_id: audioUpload.public_id,
          duration: seg.duration,
        };
      })
    );
    console.log("All assets uploaded:", uploadedAssets);
    // Step 2: Merge video and audio for each segment
    
    // Step 2: Create resized video assets with audio overlay
const mergedAssets = await Promise.all(
  uploadedAssets.map(async (asset) => {
    // Create actual resized video with audio overlay
    const resizedVideo = await cloudinary.uploader.upload(
      asset.uploadedVideoUrl,
      {
        resource_type: "video",
        public_id: `resized_${asset.id}`,
        transformation: [
          { width: 1920, height: 1080, crop: "fill" },
          {
            overlay: `video:${asset.audioPublic_id}`,
            flags: "layer_apply"
          },
          { duration: asset.duration }
        ],
        format: "mp4"
      }
    );

    return {
      id: asset.id,
      transcribed: asset.transcribed,
      mergedVideoPublic_id: resizedVideo.public_id,
      duration: asset.duration,
      mergedVideoUrl: resizedVideo.secure_url
    };
  })
);

    // Step 3: Concatenate all merged video segments
    // Build the transformation string for concatenation
    console.log("Merging all segments into final video...", mergedAssets);
    let concatTransformation = [];
    for (let i = 1; i < mergedAssets.length; i++) {
      concatTransformation.push({
        overlay: `video:${mergedAssets[i].mergedVideoPublic_id}`,
        flags: "splice",
        
      });
    }

    // The first video is the base, others are spliced in order
    console.log("Final concatenation transformation:", concatTransformation);
    const finalPublicId = `final/video-full-${Date.now()}`;

    const finalVideo = await cloudinary.uploader.upload(
      mergedAssets[0].mergedVideoUrl, // Use the actual URL
      {
        resource_type: "video",
        public_id: finalPublicId,
        transformation: concatTransformation,
        format: "mp4",
      }
    );
    console.log("Final video URL generated:", finalVideo.secure_url);
    return finalVideo.secure_url;
  } catch (error) {
    console.error("Error in createFinalVideo:", error);
    throw error;
  }
};
