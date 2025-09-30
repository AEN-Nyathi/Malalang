'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, AUTHORS } from '@/lib/constants/blog';

const BlogPostPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  const post = BLOG_POSTS.find(p => p.slug === slug);
  const author = post ? AUTHORS.find(a => a.id === post.authorId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post || !author) {
    return (
      <div className="py-20 bg-brand-dark min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link href="/blog" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug && (p.tags?.some(tag => post.tags?.includes(tag)) || p.authorId === post.authorId)).slice(0, 2);

  return (
    <main>
      <article className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <header className="max-w-4xl mx-auto mb-12 text-center">
            <div className="mb-4">
              <Link href="/blog" className="text-brand-primary hover:text-brand-secondary transition-colors duration-300 font-semibold">
                &larr; Back to all posts
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{post.title}</h1>
            <div className="flex items-center justify-center text-slate-400">
              <img src={author.avatarUrl} alt={author.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-white">{author.name}</p>
                <p>{post.date}</p>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto mb-12">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>

          <div className="max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed space-y-6">
            <p>{post.excerpt}</p>
            {/* In a real app, this would be where the full markdown/HTML content of the post would be rendered */}
            <p>This is a placeholder for the full content of the blog post. In a real-world application, this content would likely be fetched from a CMS and rendered from Markdown or a similar format. It would contain various paragraphs, headings, images, and other elements to provide a rich reading experience.</p>
            <p>For now, please imagine a detailed and insightful article here, expanding on the concepts introduced in the excerpt and providing valuable information to the reader.</p>
             <div className="bg-brand-dark p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-white text-xl mb-2">Key Takeaway</h3>
                <p>This is where a key insight or summary of the post's main point would be highlighted to grab the reader's attention.</p>
            </div>
            <p>The rest of the article would continue here, diving deeper into sub-topics, providing examples, and concluding with a summary or call-to-action.</p>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <div className="flex flex-wrap gap-3">
              {post.tags?.map(tag => (
                <span key={tag} className="bg-slate-700 text-slate-300 text-sm font-semibold px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

        </div>
      </article>

      {relatedPosts.length > 0 && (
        <aside className="py-20 bg-brand-dark">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map(relatedPost => {
                const relatedAuthor = AUTHORS.find(a => a.id === relatedPost.authorId);
                return (
                  <div key={relatedPost.slug} className="bg-slate-900 rounded-lg overflow-hidden shadow-lg group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                    </Link>
                    <div className="p-6">
                      <p className="text-sm text-slate-400">{relatedPost.date} &bull; {relatedAuthor?.name || 'Unknown Author'}</p>
                      <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-brand-primary transition-colors duration-300">
                        <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </h3>
                      <p className="text-slate-300 text-base">{relatedPost.excerpt}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      )}
    </main>
  );
};

export default BlogPostPage;