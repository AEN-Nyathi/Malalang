import React from 'react';
import { values } from '@/lib/constants/about';

const OurCoreValues: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Values</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            These principles are the promises we make to every client. They guide every decision we make.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="bg-slate-900 p-6 rounded-lg text-center transform transition duration-500 hover:-translate-y-2 hover:bg-slate-800">
              <div className="text-brand-primary inline-block p-4 bg-brand-primary/10 rounded-full mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCoreValues;
