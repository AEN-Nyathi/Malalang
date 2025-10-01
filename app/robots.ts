
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/questionnaire/', '/privacy-policy/'],
    },
    sitemap: 'https://malalang.vercel.app/sitemap.xml',
  };
}
