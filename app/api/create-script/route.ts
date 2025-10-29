import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import buildCloudinaryUrl from '@/lib/cloudinary';

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

// Configure cloudinary with credentials if present. Prefer parsing CLOUDINARY_URL.
const _cfg = parseCloudinaryUrl(process.env.CLOUDINARY_URL);
if (_cfg) {
  cloudinary.v2.config({ cloud_name: _cfg.cloud_name, api_key: _cfg.api_key, api_secret: _cfg.api_secret });
} else if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  cloudinary.v2.config({ cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
} // else: do not call config({}) with empty object — let the SDK read process.env or remain unconfigured for unsigned ops

type SegmentIn = {
  id: string;
  text: string;
  visualSrc?: string | null;
  visualPublicId?: string | null; // optional cloudinary id
  audioSrc?: string | null;
  duration?: number | null;
  caption?: string | null;
};

function parseCloudNameFromEnv(): string | null {
  const env = process.env.CLOUDINARY_URL || (process.env as any).NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!env) return null;
  // If CLOUDINARY_URL like cloudinary://key:secret@cloudname
  const m = String(env).match(/@([\w-]+)/);
  if (m) return m[1];
  // If only cloud name provided
  if (!env.includes('://')) return String(env);
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const segments: SegmentIn[] = body.segments || [];
    const storeMerged = !!body.storeMerged;

    if (!Array.isArray(segments) || segments.length === 0) {
      return NextResponse.json({ error: 'segments required' }, { status: 400 });
    }

  const transformedUrls: string[] = [];
  const audioUrls: string[] = [];
  const mergedPublicIds: string[] = [];

    // For each segment: call /api/merge-video-and-audio which will TTS the text and merge into the visual, returning a stored merged asset
    for (const seg of segments) {
      try {
        const origin = new URL(req.url).origin;
        const videoSource = (seg as any).visualPublicId || seg.visualSrc;
        if (!videoSource) throw new Error('Segment has no visual source');

        const mergeResp = await fetch(`${origin}/api/merge-video-and-audio`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoUrl: videoSource, text: seg.text }),
        });
        const mergeText = await mergeResp.text();
        let mergeJson: any = null;
        try {
          mergeJson = mergeText ? JSON.parse(mergeText) : null;
        } catch (e) {
          mergeJson = null;
        }
        if (!mergeResp.ok) {
          const errmsg = (mergeJson && (mergeJson.error || mergeJson.message)) || mergeText || `merge-video-and-audio failed with status ${mergeResp.status}`;
          throw new Error(errmsg);
        }
        const mergedUrl = mergeJson?.mergedUrl || null;
        const mergedPublicId = mergeJson?.mergedPublicId || null;
        if (!mergedUrl || !mergedPublicId) throw new Error('merge-video-and-audio did not return mergedUrl/publicId');

        // Store per-segment merged asset info
        transformedUrls.push(mergedUrl);
        mergedPublicIds.push(mergedPublicId);
        audioUrls.push(null as any);
      } catch (e: any) {
        console.error('[create-script] merge-video-and-audio error for segment', { segId: seg.id, message: String(e?.message || e) });
        throw e;
      }
    }

    // If storeMerged requested: create stored transformed segments and then ask Cloudinary to merge them
    if (storeMerged) {
      // For each transformed (dynamic) URL, request Cloudinary to fetch & store it as a new video asset
      const storedIds: string[] = [];
      console.error('[create-script] storing transformed segments count=', transformedUrls.length);
      for (const url of transformedUrls) {
        try {
          console.error('[create-script] uploading transformed segment ->', url);
          const uploaded = await cloudinary.v2.uploader.upload(url, { resource_type: 'video' });
          console.error('[create-script] upload result:', uploaded && { public_id: uploaded.public_id, url: uploaded.secure_url, http_code: (uploaded as any).http_code });
          if (!uploaded || !uploaded.public_id) {
            console.error('[create-script] upload missing public_id', uploaded);
            throw new Error('Failed to store transformed segment on Cloudinary');
          }
          storedIds.push(uploaded.public_id);
        } catch (uerr: any) {
          console.error('[create-script] error uploading transformed segment', { url, message: String(uerr?.message || uerr), stack: uerr?.stack });
          throw uerr;
        }
      }

      if (storedIds.length === 0) return NextResponse.json({ error: 'No stored segments' }, { status: 500 });

      // Build dynamic splice transformation using the Cloudinary SDK (safer than manual string concatenation).
      const cloudName = parseCloudNameFromEnv() || (process.env as any).NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) return NextResponse.json({ error: 'Cloudinary cloud name missing' }, { status: 500 });

      // Start with the first stored segment as the base.
      const basePublicId = storedIds[0];
      // Validate that each stored public id exists as a video resource in Cloudinary before attempting to concat.
      for (const sid of storedIds) {
        try {
          console.error('[create-script] validating stored id exists:', sid);
          const res = await cloudinary.v2.api.resource(sid, { resource_type: 'video' });
          console.error('[create-script] resource check result:', { public_id: res.public_id, resource_type: res.resource_type, size: res.bytes });
        } catch (verr: any) {
          console.error('[create-script] stored id validation failed', { sid, message: String(verr?.message || verr), stack: verr?.stack });
          return NextResponse.json({ error: 'Stored segment missing or inaccessible on Cloudinary', publicId: sid, details: String(verr?.message || verr) }, { status: 500 });
        }
      }
      const transforms: any[] = [];
      // For each subsequent stored segment, add a splice overlay and then apply the layer.
      for (const sid of storedIds.slice(1)) {
        transforms.push({ flags: 'splice', overlay: `video:${sid}` });
        transforms.push({ flags: 'layer_apply' });
      }

      // Create a dynamic (derived) URL for the concatenated video using the SDK
      const concatUrl = cloudinary.v2.url(basePublicId, {
        resource_type: 'video',
        transformation: transforms,
        format: 'mp4',
        secure: true,
      });

      console.error('[create-script] concat transform built', { cloudName, basePublicId, storedIds, transforms, concatUrl });

      // Ask Cloudinary to fetch the dynamic concat URL and store it as a new video asset
      let merged: any = null;
      try {
        merged = await cloudinary.v2.uploader.upload(concatUrl, { resource_type: 'video' });
        console.error('[create-script] merged upload result:', merged && { public_id: merged.public_id, url: merged.secure_url, http_code: merged.http_code });
      } catch (merr: any) {
        console.error('[create-script] error uploading merged concat URL', { concatUrl, message: String(merr?.message || merr), stack: merr?.stack, details: merr?.http_code || merr });
        // Return a structured JSON error so the client receives details instead of a network-level failure.
        return NextResponse.json({ error: 'Cloudinary merged upload failed', details: String(merr?.message || merr) }, { status: 500 });
      }
      if (!merged || !merged.secure_url) {
        console.error('[create-script] merged response missing secure_url', merged);
        return NextResponse.json({ error: 'Failed to create merged video in Cloudinary', details: merged }, { status: 500 });
      }
      return NextResponse.json({ mergedUrl: merged.secure_url, transformedUrls, mergedPublicId: merged.public_id });
    }

  // else return per-segment transformed urls (dynamic) along with audioUrls for client-side sync
  return NextResponse.json({ transformedUrls, audioUrls });
  } catch (err: any) {
     console.error(err);
     const msg = String(err?.message || err);
     // Improve message for common Cloudinary signature error
     if (msg.includes('Invalid Signature') || msg.includes('http_code: 401')) {
      return NextResponse.json({ error: 'Cloudinary upload/signature failed. Check CLOUDINARY_URL/api credentials on the server.' }, { status: 500 });
     }
     return NextResponse.json({ error: msg }, { status: 500 });
  }
}
