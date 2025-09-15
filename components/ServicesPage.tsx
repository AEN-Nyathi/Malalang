import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_PACKAGES, WHATSAPP_LINK } from '../constants';
import Cta from './Cta';

const ServiceDetailCard: React.FC<{ service: typeof SERVICE_PACKAGES[0] }> = ({ service }) => (
  <div className="bg-brand-dark p-8 rounded-lg border border-slate-800 transform transition duration-500 hover:scale-105 hover:border-brand-primary/50">
    <h3 className="text-3xl font-bold text-brand-primary mb-4">{service.title}</h3>
    <p className="text-slate-400 text-lg mb-6">{service.description}</p>
    
    <div className="mb-6">
        <h4 className="text-xl font-semibold text-white mb-3">Who is this for?</h4>
        <p className="text-slate-300">
            {
                service.title === 'Economic Package' ? 'Perfect for new startups, sole proprietors, or any business needing a simple, professional online brochure to establish legitimacy and provide essential information.' :
                service.title === 'Standard Package' ? 'Ideal for established businesses looking to make a significant impact with a custom-branded website that can grow with them.' :
                'Designed for businesses ready to sell products or services online. This is your all-in-one solution for launching a digital storefront.'
            }
        </p>
    </div>

    <div>
        <h4 className="text-xl font-semibold text-white mb-3">Key Features:</h4>
        <ul className="space-y-2 text-slate-300">
            {service.features.map(feature => (
                <li key={feature} className="flex items-center">
                    <svg className="w-5 h-5 text-brand-secondary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
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
              <Link to="/pricing" className="text-brand-primary hover:underline">
                Or view our detailed pricing page &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Cta />
    </main>
  );
};

export default ServicesPage;