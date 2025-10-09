import React from 'react';
import Link from 'next/link';

const Guarantee: React.FC = () => {
  return (
    <section id="guarantee" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="bg-background rounded-lg p-8 md:p-12 border border-brand-primary/30 text-center">
            <div className="inline-block bg-brand-primary/10 text-brand-primary p-4 rounded-full mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 21a12.02 12.02 0 009-8.056c.32-1.178.524-2.41.524-3.676 0-3.322-1.34-6.32-3.524-8.516z" />
                </svg>
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our No-Risk Guarantee</h2>
          <p className="text-xl md:text-2xl text-brand-primary font-semibold mt-4">
            You Don't Pay a Cent Until You're 100% Satisfied.
          </p>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            We operate on a trust-first model. We build your website and you only pay when you are completely happy. This is our promise to you.
          </p>
          <div className="text-center mt-8">
            <Link href="/about#guarantee" className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300">
                Learn More About Our Guarantee
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
