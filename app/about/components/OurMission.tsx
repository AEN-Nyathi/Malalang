import React from 'react';

const OurMission: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
          <blockquote className="max-w-4xl mx-auto border-l-4 border-brand-primary pl-6 md:pl-8 text-left">
              <p className="text-2xl md:text-3xl italic text-slate-200 leading-tight">
              To provide local businesses with affordable, high-quality websites through a transparent, collaborative, and risk-free process, enabling them to compete and grow in the digital economy.
              </p>
          </blockquote>
      </div>
    </section>
  );
};

export default OurMission;
