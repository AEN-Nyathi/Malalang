import React from 'react';
import Hero from '@/app/home/components/Hero';
import About from '@/app/home/components/About';
import Services from '@/app/home/components/Services';
import Process from '@/app/home/components/Process';
import Portfolio from '@/app/home/components/Portfolio';
import Guarantee from '@/app/home/components/Guarantee';
import Testimonials from '@/app/home/components/Testimonials';
import RecentPosts from '@/app/home/components/RecentPosts';
import Faq from '@/app/home/components/Faq';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <Guarantee />
      <Testimonials />
      <RecentPosts />
      <Faq />
    </main>
  );
};

export default HomePage;