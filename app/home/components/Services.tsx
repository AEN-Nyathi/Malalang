import React from 'react';
import Link from 'next/link';
import { SERVICE_PACKAGES } from '@/lib/constants/services';
import type { ServicePackage } from '@/lib/types';

const ServiceCard: React.FC<{ packageInfo: ServicePackage }> = ({ packageInfo }) => {
    const cardClasses = packageInfo.isFeatured
        ? 'bg-slate-800 border-2 border-brand-primary'
        : 'bg-brand-dark border border-slate-700';

    return (
        <article className={`p-8 rounded-lg ${cardClasses} flex flex-col transition-all duration-300`}>
            <h3 className="text-2xl font-bold text-white text-center">{packageInfo.title}</h3>
            <p className="text-4xl font-extrabold text-white text-center my-4">{packageInfo.price}</p>
            <p className="text-slate-300 text-center mb-6 min-h-[4.5rem]">{packageInfo.description}</p>
            <Link href="/pricing" className="mt-auto text-center bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                Learn More
            </Link>
        </article>
    );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-900" aria-labelledby="services-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-slate-300">Fixed-price packages designed for local businesses. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.slice(0, 3).map((pkg: ServicePackage) => (
            <ServiceCard key={pkg.title} packageInfo={pkg} />
          ))}
        </div>
        
        <div className="text-center mt-16">
            <Link href="/pricing" className="text-brand-primary hover:underline text-lg font-semibold">
                View All Packages and Add-ons &rarr;
            </Link>
        </div>

      </div>
    </section>
  );
};

export default Services;
