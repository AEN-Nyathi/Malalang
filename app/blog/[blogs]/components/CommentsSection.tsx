'use client';

import React from 'react';

const CommentsSection: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">Leave a Comment</h2>
      <form className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300" />
        </div>
        <textarea placeholder="Your Comment" rows={5} className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300"></textarea>
        <div className="text-right">
          <button type="submit" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsSection;