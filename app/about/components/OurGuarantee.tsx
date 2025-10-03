import React from 'react';

const OurGuarantee: React.FC = () => {
  return (
    <section id="guarantee" className="py-20 md:py-28 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="relative text-center bg-slate-900 rounded-2xl p-8 md:p-12 border-t-4 border-brand-primary shadow-2xl">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-primary h-16 w-16 rounded-full flex items-center justify-center border-4 border-brand-dark">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 21a12.02 12.02 0 009-8.056c.32-1.178.524-2.41.524-3.676 0-3.322-1.34-6.32-3.524-8.516z" />
                </svg>
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-8">Our 100% Satisfaction Guarantee</h2>
          <p className="text-xl md:text-2xl text-brand-primary font-semibold mt-4">
            You Don't Pay a Cent Until You're Completely Happy.
          </p>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            We are so confident in our ability to deliver a website you'll love that we operate on a trust-first model. We build your entire website on a private link for you to review. If you aren't 100% satisfied with the final result, you walk away with no questions asked and no payment required. We invest in you first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurGuarantee;
