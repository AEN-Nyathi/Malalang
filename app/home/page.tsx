import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Guarantee from './components/Guarantee';
import Testimonials from './components/Testimonials';
import RecentPosts from './components/RecentPosts';
import Faq from './components/Faq';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design in Phalaborwa | Malalang - Local Website Development',
  description: 'Looking for a web designer in Phalaborwa? Malalang builds affordable, professional websites for local businesses. We help you get online, attract more customers, and grow your business with a stunning, mobile-friendly site. Contact us for a free quote!',
};

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Guarantee />
      <Testimonials />
      <Services />
      <Process />
      <Portfolio />
      <RecentPosts />
      <Faq />
    </main>
  );
};

export default HomePage;
