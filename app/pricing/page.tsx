import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICE_PACKAGES, ADDON_CATEGORIES, LAUNCH_PACK_SERVICES, RECURRING_SERVICE } from '@/lib/constants/services';
import { FAQ_ITEMS } from '@/lib/constants/faqs';
import type { ServicePackage, AddonCategory, AddonService, FaqItem } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Website Pricing in Phalaborwa | Malalang Packages',
  description: 'Transparent pricing for web design in Phalaborwa. Explore our packages, from the Starter Site to the Advanced Business Solution. Find the perfect fit for your budget and business goals.',
};

const CheckIcon = () => (
    <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const ServiceDetail: React.FC<{ servicePackage: ServicePackage }> = ({ servicePackage }) => (
    <div id={servicePackage.serviceUrl} className="bg-background p-8 rounded-lg border border-slate-700/50 mb-12 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-3xl font-bold text-white">{servicePackage.title}</h3>
                <p className="text-5xl font-extrabold text-brand-primary my-4">{servicePackage.price}</p>
                <p className="text-slate-300 mb-4">{servicePackage.longDescription}</p>
                {servicePackage.isCombo && servicePackage.savingsNote && (
                    <p className="text-green-400 font-bold mb-4">{servicePackage.savingsNote}</p>
                )}
                <Link 
                    href={`/services/${servicePackage.serviceUrl}/${servicePackage.serviceUrl}`}
                    className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 mt-4"
                >
                    Get Started
                </Link>
            </div>
            <div>
                <h4 className="text-xl font-semibold text-white mb-2">What's Included:</h4>
                <ul className="space-y-3 text-slate-300">
                    {servicePackage.features.map(feature => (
                        <li key={feature} className="flex items-start">
                            <CheckIcon />
                            <span className="ml-3">{feature}</span>
                        </li>
                    ))}
                </ul>
                 <div className="mt-6 bg-slate-800/50 p-4 rounded-lg">
                    <p className="font-semibold text-slate-200">Ideal for: <span className="font-normal text-slate-400">{servicePackage.idealFor}</span></p>
                </div>
            </div>
        </div>
    </div>
);

const PricingPage: React.FC = () => {
  return (
    <main>
        <section className="py-20 md:py-28 bg-slate-900">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Pricing & Packages</h1>
                <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
                    Clear, upfront pricing for every stage of your business. Let's build something great together.
                </p>
            </div>
        </section>

        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                {SERVICE_PACKAGES.filter(p => !p.isCombo).map(servicePackage => (
                    <ServiceDetail key={servicePackage.title} servicePackage={servicePackage} />
                ))}
            </div>
        </section>

        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Special Combo Package</h2>
                </div>
                {SERVICE_PACKAGES.filter(p => p.isCombo).map(servicePackage => (
                    <ServiceDetail key={servicePackage.title} servicePackage={servicePackage} />
                ))}
            </div>
        </section>

        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Enhance Your Website</h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Add extra functionality to any package with our à la carte services.</p>
                </div>
                
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Service Add-ons</h3>
                         <div className="space-y-8">
                            {ADDON_CATEGORIES.map(category => (
                            <div key={category.name} className="bg-background p-6 rounded-lg border border-slate-700/50">
                                <h4 className="text-xl font-semibold text-brand-primary mb-4">{category.name}</h4>
                                <ul className="space-y-4">
                                {category.addons.map(addon => (
                                    <li key={addon.title} className="flex justify-between items-start text-slate-300 border-t border-slate-800 pt-4 first:pt-0 first:border-t-0">
                                    <span className="flex-1 pr-4">{addon.title}</span>
                                    <span className="font-bold text-white text-right whitespace-nowrap">{addon.price}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4 sticky top-24">
                        <div className="bg-slate-800 p-6 rounded-lg border border-brand-secondary/50">
                             <div className="text-center border-b border-slate-700 pb-4 mb-4">
                                <h3 className="text-2xl font-bold text-brand-secondary">The Complete Launch Pack</h3>
                                <p className="font-bold text-white text-4xl">R900 <span className="text-lg font-normal text-slate-400">(Save R200)</span></p>
                            </div>
                            <p className="text-slate-400 text-center text-sm mb-4">Bundle our most essential launch services for the best value.</p>
                            <ul className="space-y-3">
                                {LAUNCH_PACK_SERVICES.map(service => (
                                    <li key={service.title} className="flex justify-between items-center text-slate-300">
                                        <span>{service.title}</span>
                                        <span className="font-bold text-white text-sm bg-slate-700 px-2 py-1 rounded">{service.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="mt-8 bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30 text-center">
                            <h3 className="text-2xl font-bold text-white">Web Care Plan</h3>
                             <p className="text-3xl font-bold text-white my-2">{RECURRING_SERVICE.price}</p>
                             <p className="text-slate-400">Includes hosting, security, backups, and 30 mins of monthly updates. Total peace of mind.</p>
                             <Link href="#" className="text-brand-primary hover:underline mt-3 inline-block font-semibold">Learn more &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

         <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {FAQ_ITEMS.map((faq: FaqItem, index: number) => (
                        <details key={index} className="bg-slate-900 p-4 rounded-lg cursor-pointer open:bg-slate-800 transition-colors">
                            <summary className="font-semibold text-lg text-white list-none flex justify-between items-center">
                                {faq.question}
                                <svg className="w-5 h-5 transition-transform transform rotate-0 open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </summary>
                            <div className="mt-3 text-slate-300">
                                <p>{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    </main>
  );
};

export default PricingPage;
