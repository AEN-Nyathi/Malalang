import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICE_PACKAGES } from '@/lib/constants/services';
import { WHATSAPP_LINK } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Web Development Services in Phalaborwa | Malalang',
  description: 'Explore our web development services. We offer tailored solutions to meet the unique needs of local businesses in Phalaborwa, from starter websites to advanced e-commerce platforms.',
};

const ServiceDetailCard: React.FC<{ service: typeof SERVICE_PACKAGES[0] }> = ({ service }) => (
  <div className="bg-brand-dark p-8 rounded-lg border border-slate-800 flex flex-col group hover:border-brand-primary/50 transition-colors duration-300">
    <h3 className="text-3xl font-bold text-brand-primary mb-4">{service.title}</h3>
    <p className="text-slate-400 text-lg mb-6 flex-grow">{service.description}</p>
    
    <div className="mb-6">
        <p className="text-slate-300">
            <span className="font-semibold text-white">Best for:</span> {service.bestFor}
        </p>
    </div>

    <div>
        <Link href={`/services/${service.slug}`} className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
          Learn More &rarr;
        </Link>
    </div>
  </div>
);

const ServicesPage: React.FC = () => {
  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Web Development Services</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
              We offer tailored solutions to meet the unique needs of local businesses in Phalaborwa. Explore our packages to find the perfect fit for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {SERVICE_PACKAGES.map(pkg => (
              <ServiceDetailCard key={pkg.title} service={pkg} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-slate-300 mb-4">Not sure which package is right for you?</p>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
            >
              Get a Free Consultation
            </a>
            <p className="mt-4">
              <Link href="/pricing" className="text-brand-primary hover:underline">
                Or view our detailed pricing page &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;