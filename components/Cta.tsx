import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_LINK } from '../lib/constants/site';

const Cta: React.FC = () => {
  return (
    <section id="cta" className="py-20 bg-brand-primary/10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Grow Your Business?
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Let's build a website that gets you results. Our process is risk-free, and our focus is on your success. Get in touch for a free, no-obligation consultation.
        </p>
        <a 
          href={WHATSAPP_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
        >
          Get My Free Quote
        </a>
      </div>
    </section>
  );
};

export default Cta;