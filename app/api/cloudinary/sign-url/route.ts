import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import buildCloudinaryUrl from '@/lib/cloudinary';
// Do not reconfigure cloudinary here. Let the cloudinary library read
// credentials from process.env.CLOUDINARY_URL or explicit env vars.

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { publicId, type = 'image', width, height, extraTransforms } = body || {};

    if (!publicId) {
      return NextResponse.json({ error: 'publicId is required' }, { status: 400 });
    }

    // If server has credentials, use cloudinary to sign URL (sign_url: true)
    const hasSecret = !!(process.env.CLOUDINARY_URL || process.env.CLOUDINARY_API_SECRET);

    if (hasSecret) {
      try {
            // Cloudinary lib will read credentials from process.env.CLOUDINARY_URL automatically.
            // No need to clear or reconfigure here — clearing config results in invalid signature errors.
        const options: any = {
          resource_type: type === 'video' ? 'video' : 'image',
          type: 'upload',
          sign_url: true,
          secure: true,
        };
        const transformations: any = [];
        if (width || height) transformations.push({ width: width || undefined, height: height || undefined, crop: 'fill' });
        if (extraTransforms) options.transformation = extraTransforms;
        if (transformations.length) options.transformation = transformations;

        const url = cloudinary.v2.url(publicId, options);
        return NextResponse.json({ url });
      } catch (err) {
        // fall through to unsigned builder
      }
    }

    // fallback: unsigned URL via helper
    const url = buildCloudinaryUrl({ publicId, type: type as any, width, height, extraTransforms });
    return NextResponse.json({ url });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
