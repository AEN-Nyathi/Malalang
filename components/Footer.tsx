import React from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants/navigation';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = FOOTER_LINKS.filter(link => link.name !== 'Home');

  return (
    <footer className="bg-slate-900 border-t border-slate-300/10" role="contentinfo">
      <div className="container mx-auto px-6 py-8 text-center text-slate-300">
        <div className="mb-6">
          <Link href="/" aria-label="Malalang Pty Ltd - Return to homepage">
            <img src="/logo.jpg" alt="Malalang Pty Ltd - Professional Web Development" className="h-16 w-auto mx-auto" />
          </Link>
        </div>
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6" aria-label="Footer navigation">
            {footerLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:rounded px-2 py-1"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
        <p>&copy; {currentYear} Malalang Pty Ltd. All Rights Reserved.</p>
        <p className="text-sm mt-1">
          Your Trusted Web Development Partner in Phalaborwa, Limpopo.
        </p>
      </div>
    </footer>
  );
};

export default Footer;