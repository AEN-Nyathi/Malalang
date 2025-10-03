import React from 'react';

const OurStory: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
              alt="Team collaborating on a project"
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </div>
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story: A Local Solution for Local Businesses</h2>
            <div className="text-slate-300 text-lg space-y-4 leading-relaxed">
              <p>
                Malalang Pty Ltd was born from a simple observation: local businesses in Phalaborwa needed a better way to get online. Founder Abram Ntsako saw entrepreneurs in key sectors like tourism, security, and retail being underserved by expensive, complicated web solutions from distant agencies. He decided to create a studio that operated differently.
              </p>
              <p>
                The name "Malalang" comes from the Sepedi word for thatching reed. It symbolizes our approach: using local understanding and foundational strength to build something protective and essential for your business—your online home.
              </p>
               <p>
                Our entire model is built to remove the traditional barriers of cost and risk. We invest our time and expertise in your project first, building a relationship on trust and a shared goal: your complete satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
