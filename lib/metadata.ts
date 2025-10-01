
import { Metadata } from 'next';

const metadata: Metadata = {
  title: {
    default: 'Malalang - Web Development Solutions',
    template: '%s | Malalang',
  },
  description: 'Malalang offers professional web development services, specializing in creating fast, responsive, and SEO-friendly websites for businesses of all sizes.',
  openGraph: {
    title: 'Malalang - Web Development Solutions',
    description: 'Professional web development services to elevate your online presence.',
    url: 'https://malalang.vercel.app',
    siteName: 'Malalang',
    images: [
      {
        url: 'https://malalang.vercel.app/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malalang - Web Development Solutions',
    description: 'Professional web development services to elevate your online presence.',
    creator: '@malalang',
    images: ['https://malalang.vercel.app/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://malalang.vercel.app',
    types: {
      'application/rss+xml': 'https://malalang.vercel.app/rss.xml',
    },
  },
};

export default metadata;
