## The Mission
Your goal is to build an asynchronous function, createFinalVideo, that takes a list of video/audio segments and combines them into one single, permanent, downloadable .mp4 movie using the Cloudinary Node.js SDK.
## The Goal
The primary objective is to take a sequence of separate video and audio segments (defined in the segments array) and stitch them together into a single, permanent, downloadable .mp4 video file using Cloudinary's powerful video transformation features.

The Input Data (segments)
You will be processing an array of segment objects. Each object provides the necessary URLs for the visual and audio content, along with the required duration.

The structure of the segments is defined by the following TypeScript interface, which outlines the properties for each individual piece of video content the system processes:

## 📐 Segment Structure (`ScriptSegment`)

Each segment is an object that contains data necessary for content generation, timing, and asset retrieval:

* **`id`**: `string`
    * A unique identifier for the segment (e.g., `new-seg-1761913548055-0-1761913559033`).
* **`text`**: `string`
    * The transcribed. (e.g., Ready to grow your local business and attract more customers?)
* **`audioSrc`**: `string | null`
    * The URL for the corresponding **audio/voiceover** file (e.g.,https://unreal-synthesis-expire-in-90-days.s3-us-west-2.amazonaws.com/27e0108a-134c-4181-a5a5-db8180e720e2-0.mp3).
* **`visualSrc`**: `string | null`
    * The URL for the base video that will be shown during this segment.(e.g 'https://videos.pexels.com/video-files/7287305/7287305-uhd_3840_2160_25fps.mp4')
* **`duration`**: `number`
    * The intended length of the segment, measured in **seconds**.
* **`videoSearchQuery`**: `string`
    * The search term used to find the visual content from stock for this segment (e.g., Small business growth).

This structure ensures that each segment is self-contained, linking the written script, the audio file, the visual clip, and the necessary timing/identification data.
(e.g., segments = [
  {
    id: 'new-seg-1761994560763-0',
    text: 'Ready to grow your local business and attract more customers?',
    audioSrc: 'https://unreal-synthesis-expire-in-90-days.s3-us-west-2.amazonaws.com/27e0108a-134c-4181-a5a5-db8180e720e2-0.mp3',
    visualSrc: 'https://videos.pexels.com/video-files/7287305/7287305-uhd_3840_2160_25fps.mp4',
    duration: 5,
    videoSearchQuery: 'Small business growth'
  },
  {
    id: 'new-seg-1761994560404-1',
    text: 'A professional website is key to establishing your online presence and credibility.',
    audioSrc: 'https://unreal-synthesis-expire-in-90-days.s3-us-west-2.amazonaws.com/b67ee4a7-a499-4827-be67-7b7a94652417-0.mp3',
    visualSrc: 'https://videos.pexels.com/video-files/4828605/4828605-sd_426_226_25fps.mp4',
    duration: 6,
    videoSearchQuery: 'Professional website development'
  },
  {
    id: 'new-seg-1761994560946-2',
    text: 'The best part? You can get started with no deposit required!',
    audioSrc: 'https://unreal-synthesis-expire-in-90-days.s3-us-west-2.amazonaws.com/34241dda-95d9-44ab-9918-f227426df7a7-0.mp3',
    visualSrc: 'https://videos.pexels.com/video-files/6282378/6282378-sd_540_960_30fps.mp4',
    duration: 4,
    videoSearchQuery: 'No upfront cost'
  },
  {
    id: 'new-seg-1761994560620-3',
    text: 'Malalang is the ultimate platform to create stunning websites easily.',
    audioSrc: 'https://unreal-synthesis-expire-in-90-days.s3-us-west-2.amazonaws.com/ddb85056-41ba-45d1-a6ef-a5288fb150da-0.mp3',
    visualSrc: 'https://videos.pexels.com/video-files/4988847/4988847-hd_1280_720_30fps.mp4',
    duration: 5,
    videoSearchQuery: 'Malalang platform interface'
  },
  {
    id: 'new-seg-1761994560670-4',
    text: 'Build an impressive online storefront, even without technical skills.',
    audioSrc: 'https://unreal-synthesis-expire-in-90-days.s3-us-west-2.amazonaws.com/2bcfe78a-5493-4b6e-8355-dc0010084b01-0.mp3',
    visualSrc: 'https://videos.pexels.com/video-files/5585988/5585988-sd_540_960_30fps.mp4',
    duration: 5,
    videoSearchQuery: 'Easy website builder'
  },
  {
    id: 'new-seg-1761994560676-5',
    text: 'Showcase your business with a beautiful and functional website today!',
    audioSrc: 'https://unreal-synthesis-expire-in-90-days.s3-us-west-2.amazonaws.com/bb2d81a1-3879-4011-b62c-27c815ebb574-0.mp3',
    visualSrc: 'https://videos.pexels.com/video-files/5082599/5082599-uhd_2160_4096_25fps.mp4',
    duration: 5,
    videoSearchQuery: 'Stunning website display'
  }
])

## The Task: Build the createFinalVideo Function
Your task is to write a single asynchronous function, createFinalVideo, that executes the following three main steps.

#### Step 1: Upload all raw assets (Audio and Video)

Action: Upload every remote visualSrc (as a video resource) and every audioSrc (as a raw resource) to Cloudinary.

Output: An array of objects (uploadedAssets) where each item contains the Cloudinary public_id for both the video and audio file.

interface uploadedAssets {
  id: string;
  transcribed: string;
  uploadedAudioUrl: string;
  uploadedVideoUrl: string;
  VideoPublic_id: string;
  audioPublic_id: string;
  duration: number; // in seconds
}

#### Step 2: Merge the assets (Audio and Video)
Action: Combine the dedicated video file and its corresponding audio file for each segment. Use Cloudinary's audio overlay transformation to attach the audio to the video for the exact duration of the segment.

Output: An array of objects (mergedAssets) containing the Cloudinary public IDs of these new, synchronized video/audio clips.

interface mergedAssets {
  id: string;
  transcribed: string;
  mergedAudioUrl: string;
  mergedVideoUrl: string;
  mergedVideoPublic_id: string;
  mergedaudioPublic_id: string;
  duration: number; // in seconds
}
### Step 3: Combine All Segments and Finalize the Video
Action: Take all the videos from the mergedAssets array and concatenate them into one continuous, single video file.

Save this final video permanently using the type: "upload" and the eager: true options with a simple public ID (e.g., final/video-full-123).

Ensure the final output format is .mp4.

Final Result: The function must return the secure URL of the final, merged, and permanent .mp4 video file.

import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { ScriptSegment } from "../types";


// 1. Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Good practice to force HTTPS
});


// Define the async function to execute the pipeline
const createFinalVideo = async (segments) => {
    // 💡 Implement Step 1: Upload and Prepare All Assets
    const uploadedAssets = await // ... logic here

    // 💡 Implement Step 2: Merge Video and Audio for Each Segment
    const mergedAssets = await // ... logic here

    // 💡 Implement Step 3: Combine All Segments and Finalize the Video
    // ... logic here

    return finalVideoSecureUrl;
};

