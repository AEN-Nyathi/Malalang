import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/app/contact/components/ContactForm';
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Contact Malalang - Web Design in Phalaborwa',
  description: 'Contact Malalang for a free consultation on your web design project. We are a local web design company in Phalaborwa, ready to help your business succeed online. Reach out via our contact form, email, or WhatsApp.',
};

const ContactPage: React.FC = () => {
  return (
    <>
      <section className="py-20 bg-slate-900" aria-labelledby="contact-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 id="contact-heading" className="text-4xl md:text-5xl font-extrabold text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-2xl mx-auto">
              We're here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-brand-dark p-8 rounded-lg border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <h3 className="font-semibold text-white">Our Location</h3>
                    <p className="text-slate-300">Phalaborwa, 1390, Limpopo</p>
                    <p className="text-slate-300">South Africa</p>
                  </div>
                </div>
                 <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 text-brand-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.8-98.1-25.4l-7-4.2-72.5 19.1 19.4-70.6-4.6-7.4c-18.7-29.9-28.7-65.4-28.7-102.1 0-108.7 88.4-197.1 197.1-197.1 53.3 0 104.1 20.8 142.3 58.9 38.2 38.2 58.9 89 58.9 142.3 0 108.7-88.4 197.1-197.1 197.1zm105.9-161.5c-5.9-3-35.1-17.3-40.6-19.3s-9.7-3-13.7 3c-4 6-15.4 19.3-18.9 23.3-3.5 4-7 4.5-13 1.5-6-3-25.3-9.3-48.1-29.6-17.8-15.8-29.8-35.3-33.3-41.3s-.3-9.3 2.7-12.3c2.7-2.7 5.9-7 8.9-10.5 3-3.5 4-5.9 6-9.9s3-6 1.5-11.4c-1.5-5.4-13.7-33.1-18.8-45.3-5.1-12.2-10.2-10.5-13.7-10.7-3.3-.2-7.2-.2-11.2-.2-4 0-10.7 1.5-16.2 7.5-5.6 6-21.5 21-21.5 51.3s22 59.5 25 63.5c3 4 43.1 65.6 105.2 93.2 14.9 6.9 28.6 11.1 38.5 14.1 16.4 5.1 31.4 4.4 43.2 2.7 12.9-1.9 39.8-16.3 45.4-32.1 5.6-15.8 5.6-29.2 3.9-32.1-1.7-2.9-5.7-4.5-11.7-7.5z"/></svg>
                   <div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:underline"
                      aria-label="Contact us on WhatsApp - Opens in a new window"
                    >
                      {WHATSAPP_NUMBER}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <div>
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <a
                      href="mailto:info@malalang.co.za"
                      className="text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:underline"
                    >
                      info@malalang.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;