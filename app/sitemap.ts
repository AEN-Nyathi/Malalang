
import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/constants/blog';
import { SERVICE_PACKAGES } from '@/lib/constants/services';

const BASE_URL = 'https://malalang.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/pricing',
    '/services',
    '/questionnaire',
    '/color-palette-generator',
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogPostRoutes = BLOG_POSTS.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceRoutes = SERVICE_PACKAGES.map(service => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogPostRoutes, ...serviceRoutes];
}
