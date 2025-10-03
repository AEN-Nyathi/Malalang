import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About Malalang Pty Ltd</h1>
        <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
          Your dedicated digital partner in Phalaborwa, committed to empowering local businesses through trust, quality, and accessible web solutions.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
