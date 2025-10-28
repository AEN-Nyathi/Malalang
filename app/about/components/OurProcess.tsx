import React from 'react';
import { PROCESS_STEPS } from '@/lib/constants/process';

const OurProcess: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Client-Friendly Process</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            A structured, transparent journey from idea to launch. We guide you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div 
              key={step.step} 
              className="p-8 text-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-slate-900 border border-slate-700"
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-6 bg-brand-primary/10 text-brand-primary rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
