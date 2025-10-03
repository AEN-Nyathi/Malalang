import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-primary focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-bold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-secondary"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
