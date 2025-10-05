'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SERVICE_PACKAGES } from '@/lib/constants/services';

const ServiceDetailPage: React.FC = () => {
  const params = useParams();
  const ServiceName = params.service as string;
  const servicePackage = SERVICE_PACKAGES.find(s => s.serviceUrl === ServiceName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ServiceName]);

  if (!servicePackage) {
    return (
      <div className="py-20 bg-brand-dark min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-slate-400 mb-8">Sorry, we couldn't find the service package you're looking for.</p>
          <Link href="/services" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const CheckIcon = () => (
    <svg className="w-6 h-6 text-brand-secondary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{servicePackage.title}</h1>
            <p className="text-3xl text-brand-primary font-bold mb-4">{servicePackage.price}</p>
            <p className="text-lg text-slate-300">{servicePackage.description}</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-2 bg-brand-dark p-8 rounded-lg border border-slate-800">
              <h2 className="text-3xl font-bold text-white mb-6">Package Details</h2>
              <p className="text-slate-300 leading-relaxed mb-8">{servicePackage.longDescription}</p>

              <h3 className="text-2xl font-bold text-white mb-4">Key Features Included:</h3>
              <ul className="space-y-4">
                {servicePackage.features.map(feature => (
                  <li key={feature} className="flex items-start text-slate-200 text-lg">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-1 space-y-8">
              <div className="bg-brand-dark p-8 rounded-lg border border-slate-800">
                <h3 className="text-2xl font-bold text-white mb-4">Who is this for?</h3>
                <p className="text-slate-300 leading-relaxed">{servicePackage.idealFor}</p>
              </div>
              <div className="bg-brand-primary/10 p-8 rounded-lg border border-brand-primary/30 text-center">
                 <h3 className="text-2xl font-bold text-white mb-4">Ready to Start?</h3>
                 <p className="text-slate-300 mb-6">Let's get some details about your project.</p>
                 <Link
                    href={`/services/${servicePackage.serviceUrl}/${servicePackage.serviceUrl}`}
                    className="w-full block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                 >
                    Get Started
                 </Link>
              </div>
              <div className="text-center">
                <Link href="/services" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
                    &larr; Back to All Services
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
