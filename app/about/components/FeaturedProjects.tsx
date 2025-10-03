import React from 'react';
import { projects } from '@/lib/constants/about';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-dark">
      <div className="container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Work in Action</h2>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Take a look at some of the solutions we've delivered for local businesses.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {projects.map(project => (
                <div key={project.name} className="bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-slate-700 group">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative h-60 w-full bg-white">
                        <Image 
                            src={project.image} 
                            alt={project.name} 
                            layout="fill" 
                            objectFit="contain" 
                        />
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                        <p className="text-slate-400 mb-4">{project.description}</p>
                        <span className="font-semibold text-brand-primary group-hover:text-brand-accent transition-colors duration-300 flex items-center">
                            View Project <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                    </div>
                  </a>
                </div>
              ))}
          </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
