import React from 'react';
import { PORTFOLIO_ITEMS } from '/lib/constants/portfolio.ts';
import type { PortfolioItem } from '/lib/types.ts';

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-slate-900">
        <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{item.category}</span>
            <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
            <p className="text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden">{item.description}</p>
        </div>
    </div>
);


const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Work</h2>
          <p className="mt-4 text-lg text-slate-400">
            We are proud to have helped local businesses establish a strong online presence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PORTFOLIO_ITEMS.map((item) => (
                <PortfolioCard key={item.title} item={item} />
            ))}
        </div>

        <div className="text-center mt-12">
            <a href="https://abrameltonntsako.web.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                View Founder's Full Portfolio
            </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;