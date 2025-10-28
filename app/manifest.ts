import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Malalang - Web Development Solutions',
    short_name: 'Malalang',
    description: 'Malalang offers professional web development services, specializing in creating fast, responsive, and SEO-friendly websites for businesses of all sizes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#0F172A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
    
      },
    ],
  }
}