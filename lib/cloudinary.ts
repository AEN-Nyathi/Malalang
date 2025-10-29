/**
 * Helper to build Cloudinary delivery URLs for images/videos.
 * Uses NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME when running in the browser.
 */
export type CloudinaryOptions = {
  cloudName?: string;
  publicId?: string; // path or public id in Cloudinary
  src?: string; // full URL fallback
  type?: 'image' | 'video';
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: string; // e.g. 'jpg', 'webp', 'mp4'
  extraTransforms?: string; // any additional transform string
};

function parseCloudinaryUrlEnv(env?: string): { cloudName?: string } {
  if (!env) return {};
  // expect format: cloudinary://{api_key}:{api_secret}@{cloud_name}
  try {
    const m = env.match(/@([\w-]+)/);
    if (m) return { cloudName: m[1] };
  } catch {}
  return {};
}

export function buildCloudinaryUrl(opts: CloudinaryOptions): string {
  // If a full src was provided and it already looks like a Cloudinary URL or is a full URL, prefer it
  if (opts.src && /^https?:\/\//.test(opts.src)) {
    return opts.src;
  }

  const cloudName = opts.cloudName || (typeof process !== 'undefined' && (process.env as any).NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) || (typeof process !== 'undefined' && parseCloudinaryUrlEnv((process.env as any).CLOUDINARY_URL).cloudName);
  if (!cloudName) {
    // No cloud name available — return src or publicId as-is
    return opts.src || String(opts.publicId || '');
  }

  const type = opts.type === 'video' ? 'video' : 'image';
  const base = `https://res.cloudinary.com/${cloudName}/${type}/upload`;

  const transforms: string[] = [];
  // quality
  if (opts.quality) transforms.push(typeof opts.quality === 'number' ? `q_${opts.quality}` : 'q_auto');
  else transforms.push('q_auto');
  // format
  if (opts.format) transforms.push(`f_${opts.format}`);
  else transforms.push('f_auto');
  // crop to fill by default so visuals cover the canvas
  transforms.push('c_fill');
  if (opts.width) transforms.push(`w_${opts.width}`);
  if (opts.height) transforms.push(`h_${opts.height}`);
  if (opts.extraTransforms) transforms.push(opts.extraTransforms);

  const transformPath = transforms.join(',');
  const publicId = String(opts.publicId || '').replace(/^\//, '');
  if (!publicId) return `${base}/${transformPath}/`;
  return `${base}/${transformPath}/${publicId}`;
}

export default buildCloudinaryUrl;
