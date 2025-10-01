import React from 'react';
import { TESTIMONIALS } from '@/lib/constants/testimonials';
import type { Testimonial } from '@/lib/types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-brand-dark p-8 rounded-lg border border-slate-800 flex flex-col h-full">
        <div className="text-brand-primary mb-4">
             <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        </div>
        <blockquote className="text-slate-300 italic text-lg flex-grow">"{testimonial.quote}"</blockquote>
        <footer className="mt-6">
            <p className="font-bold text-white">{testimonial.author}</p>
            <p className="text-sm text-slate-400">{testimonial.company}</p>
        </footer>
    </div>
)

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-slate-400">
            We're proud to be a trusted partner for businesses in our community.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial: Testimonial, index: number) => (
                <TestimonialCard key={index} testimonial={testimonial} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;