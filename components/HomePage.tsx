import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Process from './Process';
import Portfolio from './Portfolio';
import Guarantee from './Guarantee';
import Testimonials from './Testimonials';
import RecentPosts from './RecentPosts';
import Faq from './Faq';
import Cta from './Cta';

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
      <Cta />
    </main>
  );
};

export default HomePage;