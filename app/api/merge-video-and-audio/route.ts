import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Parse CLOUDINARY_URL (cloudinary://API_KEY:API_SECRET@CLOUD_NAME) into config
function parseCloudinaryUrl(env?: string) {
  if (!env) return null;
  try {
    const m = String(env).match(/cloudinary:\/\/(.+?):(.+?)@([\w-]+)/);
    if (!m) return null;
    return { api_key: m[1], api_secret: m[2], cloud_name: m[3] };
  } catch (err) {
    return null;
  }
}

const _cfg = parseCloudinaryUrl(process.env.CLOUDINARY_URL);
if (_cfg) {
  cloudinary.v2.config({ cloud_name: _cfg.cloud_name, api_key: _cfg.api_key, api_secret: _cfg.api_secret });
} else if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  cloudinary.v2.config({ cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const videoUrl = body?.videoUrl;
    const text = body?.text;
    if (!videoUrl || !text) {
      return NextResponse.json({ error: 'videoUrl and text required' }, { status: 400 });
    }

    // Call /api/generate-audio to get audioUrl
    let audioUrl: string | null = null;
    try {
      const origin = new URL(req.url).origin;
      const ttsResp = await fetch(`${origin}/api/generate-audio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const ttsText = await ttsResp.text();
      let ttsJson: any = null;
      try {
        ttsJson = ttsText ? JSON.parse(ttsText) : null;
      } catch (e) {
        ttsJson = null;
      }
      if (!ttsResp.ok) {
        const errmsg = (ttsJson && (ttsJson.error || ttsJson.message)) || ttsText || `generate-audio failed with status ${ttsResp.status}`;
        throw new Error(errmsg);
      }
      audioUrl = ttsJson?.audioUrl || null;
      if (!audioUrl) throw new Error('generate-audio did not return audioUrl');
    } catch (e: any) {
      console.error('[merge-video-and-audio] generate-audio error', { message: String(e?.message || e) });
      return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
    }

    // Upload video to Cloudinary if it's not already a Cloudinary public_id
    let videoPublicId = videoUrl;
    if (!/^([\w\-]+\/[\w\-]+)$/.test(videoUrl)) {
      const uploadedVideo = await cloudinary.v2.uploader.upload(videoUrl, { resource_type: 'video' });
      if (!uploadedVideo || !uploadedVideo.public_id) {
        return NextResponse.json({ error: 'Failed to upload video to Cloudinary' }, { status: 500 });
      }
      videoPublicId = uploadedVideo.public_id;
    }

    // Upload audio to Cloudinary if it's not already a Cloudinary public_id
    let audioPublicId = audioUrl;
    if (!/^([\w\-]+\/[\w\-]+)$/.test(audioUrl)) {
      const uploadedAudio = await cloudinary.v2.uploader.upload(audioUrl, { resource_type: 'video' });
      if (!uploadedAudio || !uploadedAudio.public_id) {
        return NextResponse.json({ error: 'Failed to upload audio to Cloudinary' }, { status: 500 });
      }
      audioPublicId = uploadedAudio.public_id;
    }

    // Build transformed video URL that replaces audio using ac_none + l_audio + fl_layer_apply
    const transform = `ac_none,l_audio:${audioPublicId},e_volume:100/fl_layer_apply`;
    const mergedUrl = cloudinary.v2.url(videoPublicId, {
      resource_type: 'video',
      transformation: transform,
      format: 'mp4',
      secure: true,
    });

    // Optionally, persist the merged video as a new asset
    let storedMerged = null;
    try {
      storedMerged = await cloudinary.v2.uploader.upload(mergedUrl, { resource_type: 'video' });
    } catch (err: any) {
      return NextResponse.json({ error: 'Failed to store merged video', details: String(err?.message || err) }, { status: 500 });
    }
    if (!storedMerged || !storedMerged.secure_url) {
      return NextResponse.json({ error: 'Cloudinary did not return secure_url for merged video', details: storedMerged }, { status: 500 });
    }
    return NextResponse.json({ mergedUrl: storedMerged.secure_url, mergedPublicId: storedMerged.public_id });
  } catch (err: any) {
    console.error('[merge-video-and-audio] unexpected error', err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
