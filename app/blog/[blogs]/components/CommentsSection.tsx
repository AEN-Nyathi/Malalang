'use client';

import React from 'react';

// This is a placeholder component for a comments section.
// In a real application, this would involve a service like Disqus, Commento, or a custom backend.
const CommentsSection: React.FC = () => {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">Comments</h2>
      <div className="bg-brand-dark p-8 rounded-lg text-center border border-slate-800">
        <p className="text-slate-400">Comments are not yet enabled on this blog.</p>
        <p className="text-slate-500 text-sm mt-2">Check back later!</p>
      </div>
    </div>
  );
};

export default CommentsSection;
