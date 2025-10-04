
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Malalang - Web Development Solutions',
    short_name: 'Malalang',
    description: 'Malalang offers professional web development services, specializing in creating fast, responsive, and SEO-friendly websites for businesses of all sizes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a202c',
    theme_color: '#1a202c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo192.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: '/logo512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
  };
}
