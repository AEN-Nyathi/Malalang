import React from 'react';
import Link from 'next/link';
import { PROCESS_STEPS } from '@/lib/constants/process';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Client-Friendly Process</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            A structured, transparent journey from idea to launch. We guide you every step of the way.
          </p>
        </div>

        <div className="relative">
          {/* The connecting line */}
          <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-slate-700 hidden md:block"></div>

          {PROCESS_STEPS.slice(0, 3).map((step, index) => (
            <div key={step.step} className="mb-12 md:mb-0">
              <div className="flex flex-col md:flex-row items-center">
                
                {/* Content on Left */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3 md:text-right'}`}>
                   <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Step {step.step}: {step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                   </div>
                </div>

                {/* Icon in Middle */}
                <div className="md:w-2/12 flex justify-center my-4 md:my-0 md:order-2">
                  <div className="z-10">{step.icon}</div>
                </div>

                {/* Spacer on Right */}
                <div className="hidden md:block md:w-5/12 md:order-1"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
            <Link href="/about#process" className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300">
                See Our Full Process
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;