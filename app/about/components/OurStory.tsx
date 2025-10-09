import React from 'react';
import Image from 'next/image';

const OurStory: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          
          <div className="md:w-6/12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center md:text-left">
              Our Story: A Local Solution for Local Businesses
            </h2>
            <div className="text-lg text-slate-300 space-y-4 leading-relaxed text-left">
              <p>
                Malalang Pty Ltd was born from a simple observation: local businesses in Phalaborwa needed a better way to get online. Founder Abram Ntsako saw entrepreneurs being underserved by expensive, complicated web solutions. He decided to create a studio that operated differently.
              </p>
              <p>
                The name "Malalang" comes from the Sepedi word for thatching reed. It symbolizes our approach: using local understanding and foundational strength to build something protective and essential for your business—your online home.
              </p>
               <p>
                Our model is built on trust and a shared goal: your complete satisfaction.
              </p>
            </div>
          </div>

          <div className="md:w-4/12 flex justify-center">
            <div className="relative text-center">
                <Image
                  src="/assets/profile.jpg"
                  alt="Abram Ntsako - Founder of Malalang"
                  width={300}
                  height={300}
                  className="rounded-full shadow-2xl object-cover mx-auto"
                />
                <div className="mt-4">
                    <p className="font-bold text-white text-xl">Abram Ntsako</p>
                    <p className="text-slate-400">Founder & Lead Developer</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;
