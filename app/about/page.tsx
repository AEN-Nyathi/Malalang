
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import OurMission from './components/OurMission';
import OurProcess from './components/OurProcess';
import OurGuarantee from './components/OurGuarantee';
import TheMalalangDifference from './components/TheMalalangDifference';
import OurTeam from './components/OurTeam';
import FeaturedProjects from './components/FeaturedProjects';
import OurCoreValues from './components/OurCoreValues';
import { WHATSAPP_LINK } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'About Malalang - Our Story, Mission, and Team',
  description: 'Learn about Malalang Pty Ltd, a Phalaborwa-based web design studio. Discover our unique trust-first approach, our mission to empower local businesses, and meet the team dedicated to your success.',
};

const AboutPage: React.FC = () => {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <OurMission />
      <OurProcess />
      <OurGuarantee />
      <TheMalalangDifference />
      <OurTeam />
      <FeaturedProjects />
      <OurCoreValues />
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
            <p className="text-lg text-slate-300 mb-4">Ready to start your project?</p>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
            >
              Get a Free Consultation
            </a>
            <p className="mt-4">
              <Link href="/pricing" className="text-brand-primary hover:underline">
                Or view our detailed pricing page &rarr;
              </Link>
            </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;