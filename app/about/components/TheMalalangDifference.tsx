import React from 'react';
import { malalangDifference } from '@/lib/constants/about';

const TheMalalangDifference: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-dark">
      <div className="container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">The Malalang Difference</h2>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">What sets us apart from DIY builders and distant agencies.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {malalangDifference.map(item => (
                  <div 
                    key={item.title} 
                    className="bg-slate-900 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-700"
                  >
                      <div className="flex items-center justify-center h-16 w-16 mb-6 bg-brand-secondary/10 text-brand-secondary rounded-full">
                          {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
              ))}
          </div>
      </div>
    </section>
  );
};

export default TheMalalangDifference;
