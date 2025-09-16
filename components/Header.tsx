import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../lib/constants/navigation';
import { WHATSAPP_LINK } from '../lib/constants/site';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-slate-300/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Malalang Pty Ltd Home">
            <img src="/logo.jpg" alt="Malalang Pty Ltd Logo" className="h-12 w-auto" />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(link => (
              <Link key={link.name} to={link.href} className="text-slate-300 hover:text-brand-primary transition-colors duration-300">
                {link.name}
              </Link>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
              Get a Free Quote
            </a>
          </nav>
          
          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map(link => (
                <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-center py-2 rounded-md bg-slate-800">
                  {link.name}
                </Link>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-center">
                Get a Free Quote
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;