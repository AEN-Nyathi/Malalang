import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section 
      className="relative py-32 md:py-48 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          We Build Digital Experiences That Drive Results
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto">
          We are a team of passionate developers and designers dedicated to helping businesses succeed in the digital world.
        </p>
        <a 
          href="/contact" 
          className="mt-8 inline-block bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
        >
          Let's Work Together
        </a>
      </div>
    </section>
  );
};

export default AboutHero;
