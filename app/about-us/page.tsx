import React from 'react';
import { AUTHORS } from '../../lib/constants/blog';

const values = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    title: 'Trust First',
    description: 'Our \'no deposit\' policy is the cornerstone of our business. We build your website first, ensuring you are 100% happy before any payment is made. Your success is our success.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Local Partnership',
    description: 'We\'re not just a service provider; we\'re your local partner in Phalaborwa. We believe in face-to-face meetings and a collaborative process to truly understand your business.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    title: 'Uncompromising Quality',
    description: 'We are committed to delivering modern, high-performance, and visually appealing websites that are not just beautiful, but also effective tools for business growth.',
  },
   {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.743-5.743z" /></svg>,
    title: 'Genuine Accessibility',
    description: 'We demystify the web development process. Our goal is to make professional websites accessible and affordable for every small business in our community.',
  },
];

const malalangDifference = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 21a12.02 12.02 0 009-8.056c.32-1.178.524-2.41.524-3.676 0-3.322-1.34-6.32-3.524-8.516z" /></svg>,
        title: "Risk-Free Model",
        description: "We reverse the financial risk completely. You see your finished website and are 100% satisfied before paying a cent. Our success is directly tied to your happiness."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        title: "Hyper-Local Partnership",
        description: "We're part of the Phalaborwa community. We meet you face-to-face to understand your business and the local market in a way no remote agency ever could."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
        title: "Simplicity & Clarity",
        description: "We provide a jargon-free, guided process with simple, fixed-price packages. No hidden fees, no technical headaches—just a professional website that works."
    }
];

const teamMembers = [
  {
    ...AUTHORS.find(a => a.id === 'abram-ntsako'),
    title: 'Founder & Managing Director',
    bio: 'Leads the overall strategy, business development, sales, and is the lead developer on all projects.',
  },
  {
    name: 'Virtual Assistant',
    title: 'Operations (Future Hire)',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bio: 'Will handle administrative tasks, scheduling, and lead follow-up to streamline our operations.',
  },
  {
    name: 'Junior Web Developer',
    title: 'Development (Future Hire)',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2c65a449769b?q=80&w=400&auto=format&fit=crop',
    bio: 'Will increase our project capacity and assist in bringing client visions to life under expert guidance.',
  },
];


const AboutPage: React.FC = () => {
  return (
    <main>
      <section className="py-20 md:py-28 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About Malalang Pty Ltd</h1>
          <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
            Your dedicated digital partner in Phalaborwa, committed to empowering local businesses through trust, quality, and accessible web solutions.
          </p>
        </div>
      </section>

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
      
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <blockquote className="max-w-4xl mx-auto border-l-4 border-brand-primary pl-6 md:pl-8 text-left">
                <p className="text-2xl md:text-3xl italic text-slate-200 leading-tight">
                To provide local businesses with affordable, high-quality websites through a transparent, collaborative, and risk-free process, enabling them to compete and grow in the digital economy.
                </p>
            </blockquote>
        </div>
      </section>
      
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">The Malalang Difference</h2>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">What sets us apart from DIY builders and distant agencies.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {malalangDifference.map(item => (
                    <div key={item.title} className="bg-slate-900 p-8 rounded-lg text-center border-t-4 border-brand-secondary/50">
                        <div className="inline-block bg-brand-secondary/10 p-4 rounded-full mb-4">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-slate-400">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Team</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              The people dedicated to bringing your digital vision to life.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-brand-dark rounded-lg p-6 text-center border border-slate-800 transform transition duration-500 hover:-translate-y-2 hover:border-brand-primary/50">
                <img 
                  src={member.imageUrl} 
                  alt={`Photo of ${member.name}`} 
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 ring-4 ring-slate-700"
                />
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-brand-primary font-semibold mb-3">{member.title}</p>
                <p className="text-slate-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Values</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
              These principles are the promises we make to every client. They guide every decision we make.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-slate-900 p-6 rounded-lg text-center transform transition duration-500 hover:-translate-y-2 hover:bg-slate-800">
                <div className="text-brand-primary inline-block p-4 bg-brand-primary/10 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;