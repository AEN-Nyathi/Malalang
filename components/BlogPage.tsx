import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, AUTHORS } from '../constants';

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
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Blog</h1>
            <p className="text-xl text-brand-primary font-semibold">
              Insights and tips for local businesses.
            </p>
          </div>

          <div className="mb-8 max-w-lg mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search blog posts"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                !selectedTag 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  selectedTag === tag 
                    ? 'bg-brand-primary text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const author = authorsById[post.authorId];
                return (
                  <div key={post.slug} className="bg-brand-dark rounded-lg overflow-hidden shadow-lg flex flex-col group">
                    <Link to={`/blog/${post.slug}`} className="block">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                    </Link>
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-sm text-slate-400">{post.date} &bull; {author?.name || 'Unknown Author'}</p>
                      <h2 className="text-2xl font-bold text-white mt-2 mb-3 group-hover:text-brand-primary transition-colors duration-300">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-slate-300 flex-grow">{post.excerpt}</p>
                      <div className="mt-4">
                        <Link to={`/blog/${post.slug}`} className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
                          Read More &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
             <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-white">No Results Found</h2>
                <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default BlogPage;