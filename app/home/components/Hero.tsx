import React from 'react';
import Link from 'next/link';
import { WHATSAPP_LINK } from '@/lib/constants/site';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative py-32 md:py-48 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop')" }}
      aria-labelledby="hero-heading"
    >
       <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Grow Your Local Business with a Professional Website
        </h1>
        <p className="text-xl md:text-2xl text-brand-primary font-semibold mb-8">
          No Deposit Required. You Only Pay When You're 100% Satisfied.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4" role="group" aria-label="Call to action buttons">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[56px] flex items-center justify-center"
            aria-label="Start your project today via WhatsApp - Opens in a new window"
          >
            Start Your Project Today
          </a>
          <Link
            href="/about"
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[56px] flex items-center justify-center"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
