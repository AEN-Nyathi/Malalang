import React from 'react';
import { projects } from '@/lib/constants/about';

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map(project => (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" key={project.name} className="bg-slate-900 rounded-lg">
                      <img src={project.image} alt={project.name} className="rounded-t-lg w-full" />
                      <div className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                          <p className="text-slate-400">{project.description}</p>
                      </div>
                  </a>
              ))}
          </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
