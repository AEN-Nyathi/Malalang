import React from 'react';
import { SERVICE_PACKAGES, ADDON_CATEGORIES, LAUNCH_PACK_SERVICES, RECURRING_SERVICE } from '../../lib/constants/services';
import type { ServicePackage } from '../../lib/types';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const ServiceCard: React.FC<{ packageInfo: ServicePackage }> = ({ packageInfo }) => {
    const cardClasses = packageInfo.isFeatured 
        ? 'bg-slate-800 border-2 border-brand-primary transform md:scale-105'
        : 'bg-brand-dark border border-slate-700';

    return (
        <div className={`p-8 rounded-lg ${cardClasses} flex flex-col transition-all duration-300 relative`}>
            {packageInfo.isFeatured && (
                <div className="absolute top-0 right-0 -mt-3 mr-3 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
            )}
            <h3 className="text-2xl font-bold text-white text-center">{packageInfo.title}</h3>
            <p className="text-4xl font-extrabold text-white text-center my-4">{packageInfo.price}</p>
            <p className="text-slate-400 text-center mb-6 min-h-[4.5rem]">{packageInfo.description}</p>
            <ul className="space-y-3 text-slate-300 flex-grow">
                {packageInfo.features.map(feature => (
                    <li key={feature} className="flex items-center">
                        <CheckIcon />
                        <span className="ml-3">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PricingPage: React.FC = () => {
  return (
    <main>
      <section id="pricing" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-xl text-brand-primary font-semibold">Fixed-price packages designed for local businesses. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {SERVICE_PACKAGES.map(pkg => (
              <ServiceCard key={pkg.title} packageInfo={pkg} />
            ))}
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">À La Carte Add-ons</h3>
                <div className="space-y-6">
                  {ADDON_CATEGORIES.map(category => (
                    <div key={category.name} className="bg-brand-dark p-6 rounded-lg border border-slate-700">
                      <h4 className="text-xl font-semibold text-brand-primary mb-4">{category.name}</h4>
                      <ul className="space-y-3">
                        {category.addons.map(addon => (
                          <li key={addon.title} className="flex justify-between items-start text-slate-300 border-t border-slate-800 pt-3 first:border-t-0 first:pt-0">
                            <span className="flex-1 pr-2">{addon.title}</span>
                            <span className="font-bold text-white text-right">{addon.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Post-Launch & Growth</h3>
                  <div className="bg-brand-dark p-6 rounded-lg border border-brand-secondary/50">
                      <div className="text-center border-b border-slate-700 pb-4 mb-4">
                          <h4 className="text-xl font-semibold text-brand-secondary">The Complete Launch Pack</h4>
                          <p className="font-bold text-white text-2xl">R900 <span className="text-sm font-normal text-slate-400">(Save R200)</span></p>
                      </div>
                      <ul className="space-y-4">
                          {LAUNCH_PACK_SERVICES.map(service => (
                              <li key={service.title} className="flex justify-between items-center text-slate-300">
                                  <span>{service.title}</span>
                                  <span className="font-bold text-white">{service.price}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
          
          <div className="mt-16 text-center bg-brand-primary/10 border border-brand-primary/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Ongoing Support & Maintenance</h3>
              <p className="text-slate-300 mb-4">Focus on your business, we'll handle the website.</p>
              <div className="inline-block bg-brand-dark px-6 py-3 rounded-lg">
                  <span className="text-lg text-slate-200">{RECURRING_SERVICE.title}: </span>
                  <span className="text-xl font-bold text-white">{RECURRING_SERVICE.price}</span>
              </div>
              <p className="text-sm text-slate-400 mt-3">Includes hosting, backups, security monitoring, and 30 minutes of minor monthly changes.</p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default PricingPage;