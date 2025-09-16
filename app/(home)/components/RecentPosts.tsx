import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, AUTHORS } from '../../../lib/constants';

const RecentPosts: React.FC = () => {
  // Assuming the newest posts are at the beginning of the array
  const recentPosts = BLOG_POSTS.slice(0, 3);
  const authorsById = Object.fromEntries(AUTHORS.map(a => [a.id, a]));

  return (
    <section id="recent-posts" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Insights</h2>
          <p className="mt-4 text-lg text-slate-400">
            Check out the latest articles from our blog.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => {
            const author = authorsById[post.authorId];
            return (
              <div key={post.slug} className="bg-slate-900 rounded-lg overflow-hidden shadow-lg flex flex-col group">
                <Link to={`/blog/${post.slug}`} className="block">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-slate-400">{post.date} &bull; {author?.name || 'Unknown Author'}</p>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-brand-primary transition-colors duration-300">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-300 flex-grow text-base">{post.excerpt}</p>
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

        <div className="text-center mt-12">
            <Link to="/blog" className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                View All Posts
            </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
