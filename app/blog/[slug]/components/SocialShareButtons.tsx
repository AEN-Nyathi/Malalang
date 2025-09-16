import React from 'react';

interface SocialShareButtonsProps {
  postUrl: string;
  title: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ postUrl, title }) => {
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const socialButtons = [
    { name: 'Facebook', url: shareLinks.facebook, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Twitter', url: shareLinks.twitter, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.214 3.791 4.649-.469.127-.962.193-1.465.193-.304 0-.598-.03-.886-.084.613 1.882 2.383 3.253 4.493 3.29-1.621 1.272-3.663 2.03-5.88 2.03-.382 0-.76-.022-1.133-.067 2.099 1.353 4.594 2.143 7.29 2.143 8.742 0 13.522-7.243 13.522-13.522 0-.206-.005-.411-.013-.615a9.69 9.69 0 0 0 2.383-2.479z"/></svg>, color: 'bg-sky-500 hover:bg-sky-600' },
    { name: 'LinkedIn', url: shareLinks.linkedin, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>, color: 'bg-blue-700 hover:bg-blue-800' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <p className="font-semibold text-slate-300 mr-2">Share this post:</p>
      {socialButtons.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${social.name}`}
          className={`text-white p-2 rounded-full transition-colors duration-300 ${social.color}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialShareButtons;
