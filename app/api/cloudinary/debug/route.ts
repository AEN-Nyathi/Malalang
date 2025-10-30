import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

export async function GET() {
  try {
    const cfg = (cloudinary && (cloudinary as any).v2 && (cloudinary as any).v2.config) ? (cloudinary as any).v2.config() : null;
    const hasApiKey = !!(cfg && cfg.api_key);
    const hasApiSecret = !!(cfg && cfg.api_secret);
    const cloudName = (cfg && cfg.cloud_name) || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || null;

    // Try to build a signed URL for a dummy public id to show whether signing is possible
    let signedUrl: string | null = null;
    try {
      signedUrl = cloudinary.v2.url('demo', { resource_type: 'image', type: 'upload', sign_url: true, secure: true });
    } catch (e) {
      // ignore
    }

    return NextResponse.json({ ok: true, cloudName, hasApiKey, hasApiSecret, signedUrl });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}
