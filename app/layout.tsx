import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cta from '@/components/Cta';
import SkipToContent from '@/components/SkipToContent';
import { WHATSAPP_LINK } from '@/lib/constants/site';

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
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: 'https://malalang.vercel.app',
    types: {
      'application/rss+xml': 'https://malalang.vercel.app/rss.xml',
    },
  },
};




const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Malalang',
    url: 'https://malalang.vercel.app',
    logo: 'https://malalang.vercel.app/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27 12 345 6789',
      contactType: 'customer service',
    },
  };

  return (
    <html lang="en">
      <body className="bg-brand-dark text-brand-light font-sans antialiased">
        <SkipToContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content" role="main">{children}</main>
        <Cta />
        <Footer />
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-110 z-50 focus:outline-none focus:ring-4 focus:ring-brand-secondary"
          aria-label="Contact us on WhatsApp - Opens in a new window"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.8-98.1-25.4l-7-4.2-72.5 19.1 19.4-70.6-4.6-7.4c-18.7-29.9-28.7-65.4-28.7-102.1 0-108.7 88.4-197.1 197.1-197.1 53.3 0 104.1 20.8 142.3 58.9 38.2 38.2 58.9 89 58.9 142.3 0 108.7-88.4 197.1-197.1 197.1zm105.9-161.5c-5.9-3-35.1-17.3-40.6-19.3s-9.7-3-13.7 3c-4 6-15.4 19.3-18.9 23.3-3.5 4-7 4.5-13 1.5-6-3-25.3-9.3-48.1-29.6-17.8-15.8-29.8-35.3-33.3-41.3s-.3-9.3 2.7-12.3c2.7-2.7 5.9-7 8.9-10.5 3-3.5 4-5.9 6-9.9s3-6 1.5-11.4c-1.5-5.4-13.7-33.1-18.8-45.3-5.1-12.2-10.2-10.5-13.7-10.7-3.3-.2-7.2-.2-11.2-.2-4 0-10.7 1.5-16.2 7.5-5.6 6-21.5 21-21.5 51.3s22 59.5 25 63.5c3 4 43.1 65.6 105.2 93.2 14.9 6.9 28.6 11.1 38.5 14.1 16.4 5.1 31.4 4.4 43.2 2.7 12.9-1.9 39.8-16.3 45.4-32.1 5.6-15.8 5.6-29.2 3.9-32.1-1.7-2.9-5.7-4.5-11.7-7.5z"/>
          </svg>
        </a>
      </body>
    </html>
  );
};

export default RootLayout;