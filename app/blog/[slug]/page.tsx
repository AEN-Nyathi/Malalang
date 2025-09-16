import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, AUTHORS } from '../../../lib/constants';
import SocialShareButtons from './components/SocialShareButtons';
import CommentsSection from './components/CommentsSection';
import type { BlogPost } from '../../../lib/types';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const author = post ? AUTHORS.find(a => a.id === post.authorId) : undefined;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post || !author) {
    return (
      <div className="py-20 bg-brand-dark min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link to="/blog" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const getRelatedPosts = () => {
    const allOtherPosts = BLOG_POSTS.filter(p => p.slug !== slug);
    let candidates = new Set<BlogPost>();

    // 1. By Tags
    if (post.tags && post.tags.length > 0) {
      allOtherPosts.forEach(p => {
        if (p.tags && p.tags.some(tag => post.tags.includes(tag))) {
          candidates.add(p);
        }
      });
    }
    
    // If not enough candidates, check by author
    if (candidates.size < 2) {
         allOtherPosts.forEach(p => {
            if (p.authorId === post.authorId) {
                candidates.add(p);
            }
        });
    }

    // If still not enough, fill with most recent
    if (candidates.size < 2) {
        allOtherPosts.forEach(p => candidates.add(p));
    }

    return Array.from(candidates).slice(0, 2);
  };

  const relatedPosts = getRelatedPosts();
  const postUrl = window.location.href;

  return (
    <main className="bg-slate-900 py-12 md:py-20">
      <article className="container mx-auto px-6 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-slate-400">
            By <span className="font-semibold text-brand-primary">{author.name}</span> on {post.date}
          </p>
        </header>
        
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" />
        
        <div className={`
          text-slate-300 text-lg leading-relaxed
          [&_p]:mb-6
          [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-4
          [&_blockquote]:border-l-4 [&_blockquote]:border-brand-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-slate-400 [&_blockquote]:my-8
          [&_ul]:list-disc [&_ul]:list-inside [&_ul]:my-6 [&_ul]:pl-2 [&_ul]:space-y-2
          [&_li]:mb-2
          [&_pre]:bg-slate-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:text-sm [&_pre]:overflow-x-auto [&_pre]:my-8
          [&_code]:font-mono [&_code]:text-amber-300
        `}>
          {post.content}
        </div>

        <div className="mt-12 p-6 bg-brand-dark rounded-lg flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 border border-slate-800">
          <img src={author.imageUrl} alt={author.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-wider">Written by</p>
            <h3 className="text-2xl font-bold text-white mt-1">{author.name}</h3>
            <p className="text-slate-400 mt-2 text-base leading-relaxed">{author.bio}</p>
          </div>
        </div>

        <CommentsSection />
        
        <hr className="my-12 border-slate-700" />
        
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <SocialShareButtons postUrl={postUrl} title={post.title} />
          <Link to="/blog" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
            &larr; Back to Blog
          </Link>
        </footer>
        
        {relatedPosts.length > 0 && (
          <section className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">You Might Also Like</h2>
              <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.map(relatedPost => (
                      <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="block bg-brand-dark rounded-lg overflow-hidden shadow-lg group">
                          <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                          <div className="p-6">
                              <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300">{relatedPost.title}</h3>
                          </div>
                      </Link>
                  ))}
              </div>
          </section>
        )}

      </article>
    </main>
  );
};

export default BlogPostPage;
