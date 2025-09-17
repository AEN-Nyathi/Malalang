import React from 'react';
import Hero from '/app/home/components/Hero.tsx';
import About from '/app/home/components/About.tsx';
import Services from '/app/home/components/Services.tsx';
import Process from '/app/home/components/Process.tsx';
import Portfolio from '/app/home/components/Portfolio.tsx';
import Guarantee from '/app/home/components/Guarantee.tsx';
import Testimonials from '/app/home/components/Testimonials.tsx';
import RecentPosts from '/app/home/components/RecentPosts.tsx';
import Faq from '/app/home/components/Faq.tsx';

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