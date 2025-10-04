'use client';
import React, { useState } from 'react';
import Link from 'next/link';
// import { Metadata } from 'next';
import { BLOG_POSTS, AUTHORS } from '@/lib/constants/blog';

// export const metadata: Metadata = {
//   title: 'Malalang Blog - Web Design Insights for Phalaborwa Businesses',
//   description: 'Explore the Malalang blog for articles on web design, SEO, and digital marketing, tailored for businesses in Phalaborwa. Get tips to improve your online presence.',
// };

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const authorsById = Object.fromEntries(AUTHORS.map(a => [a.id, a]));

  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags || []))).sort();

  const filteredPosts = BLOG_POSTS.filter(post => {
    const tagMatch = selectedTag ? post.tags?.includes(selectedTag) : true;
    const searchMatch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return tagMatch && searchMatch;
  });

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">The Malalang Blog</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
              Insights, tutorials, and stories on web development, design, and the digital world.
            </p>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-5 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${!selectedTag ? 'bg-brand-primary text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${selectedTag === tag ? 'bg-brand-primary text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-brand-dark rounded-lg overflow-hidden shadow-lg group">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="p-6">
                    <p className="text-sm text-slate-400 mb-2">{post.date} &bull; {authorsById[post.authorId]?.name || 'Unknown Author'}</p>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors duration-300">{post.title}</h3>
                    <p className="text-slate-400 text-base flex-grow">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-white font-semibold mb-4">No posts found</p>
              <p className="text-slate-400">Try adjusting your search or selecting a different tag.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;