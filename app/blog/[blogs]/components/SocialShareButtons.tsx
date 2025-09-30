'use client';

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface SocialShareButtonsProps {
  postUrl: string;
  title: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ postUrl, title }) => {
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', icon: <FaTwitter />, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` },
    { name: 'WhatsApp', icon: <FaWhatsapp />, url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}` }
  ];

  return (
    <div className="flex items-center gap-3">
      <p className="text-slate-300 font-semibold">Share:</p>
      {socialLinks.map(social => (
        <a 
          key={social.name}
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-400 hover:text-brand-primary transition-colors duration-300"
          aria-label={`Share on ${social.name}`}
        >
          {React.cloneElement(social.icon, { size: 24 })}
        </a>
      ))}
    </div>
  );
};

export default SocialShareButtons;
