import React from 'react';
import Image from 'next/image';

const OurMission: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          <div className="md:w-5/12 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center md:text-left">
              Our Mission
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              To empower local businesses with affordable, high-quality websites through a transparent, collaborative, and risk-free process. We aim to be a catalyst for their growth in the digital economy.
            </p>
          </div>

          <div className="md:w-6/12">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
              alt="Our Mission - A team collaborating"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurMission;
