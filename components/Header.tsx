'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants/navigation';
import { WHATSAPP_LINK } from '@/lib/constants/site';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-slate-300/10" role="banner">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Malalang Pty Ltd - Return to homepage" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Malalang Pty Ltd - Professional Web Development" className="h-12 w-auto" />
            <span className="text-3xl  font-bold text-white">Malalang</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:rounded px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
            <Link href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              aria-label="Get a free quote via WhatsApp - Opens in a new window"
            >
              Get a Free Quote
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded p-2"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-center py-3 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[44px] flex items-center justify-center"
                >
                  {link.name}
                </Link>
              ))}
              <Link href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-center focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[44px] flex items-center justify-center"
                aria-label="Get a free quote via WhatsApp - Opens in a new window"
              >
                Get a Free Quote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;