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