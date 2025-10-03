import React from 'react';
import { WHATSAPP_LINK } from '@/lib/constants/site';

const Cta: React.FC = () => {
  return (
    <section id="cta" className="py-20 bg-brand-primary/10" aria-labelledby="cta-heading">
      <div className="container mx-auto px-6 text-center">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Grow Your Business?
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Let's build a website that gets you results. Our process is risk-free, and our focus is on your success. Get in touch for a free, no-obligation consultation.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[56px]"
          aria-label="Get your free quote via WhatsApp - Opens in a new window"
        >
          Get My Free Quote
        </a>
      </div>
    </section>
  );
};

export default Cta;