import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_LINK } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative text-white py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://picsum.photos/seed/ Phalaborwa/1920/1080')"}}>
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Professional Websites for Local Businesses.
        </h1>
        <p className="text-xl md:text-2xl text-brand-primary font-semibold mb-8">
          No Deposit Required. You Only Pay When You're 100% Satisfied.
        </p>
        <div className="flex justify-center space-x-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300">
            Start Your Project Today
          </a>
          <Link to="/pricing" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300">
            View Our Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;